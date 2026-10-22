/**
 * Build-time derivatives for local banknote photos.
 *
 * Originals under public/emissions stay where they are, so existing URLs
 * (including jsDelivr mirrors of the same files) keep working. This writes
 * WebP and AVIF srcset candidates to public/img-opt and a manifest the
 * server reads at build time. There is no Next.js image server.
 *
 * Run: node scripts/optimize-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SOURCE_DIR = path.join(PUBLIC_DIR, 'emissions');
const OUT_DIR = path.join(PUBLIC_DIR, 'img-opt');
const MANIFEST_PATH = path.join(process.cwd(), 'src/generated/image-manifest.json');
const WIDTHS = [320, 480, 640];
const CONCURRENCY = 6;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function publicUrl(file) {
  const rel = path.relative(PUBLIC_DIR, file).split(path.sep).join('/');
  return `/${rel}`;
}

function variantPath(sourceFile, width, ext) {
  const rel = path.relative(PUBLIC_DIR, sourceFile).split(path.sep).join('/');
  const parsed = path.posix.parse(rel);
  return path.join(OUT_DIR, parsed.dir, `${parsed.name}-${width}.${ext}`);
}

function fresh(sourceFile, outputs) {
  const sourceTime = fs.statSync(sourceFile).mtimeMs;
  return outputs.every((file) => {
    if (!fs.existsSync(file)) return false;
    const stat = fs.statSync(file);
    return stat.size > 0 && stat.mtimeMs >= sourceTime;
  });
}

async function encode(sourceFile, width) {
  const avif = variantPath(sourceFile, width, 'avif');
  const webp = variantPath(sourceFile, width, 'webp');
  fs.mkdirSync(path.dirname(avif), { recursive: true });
  if (!fresh(sourceFile, [avif, webp])) {
    const pipeline = () => sharp(sourceFile).rotate().resize({ width, withoutEnlargement: true });
    await Promise.all([
      pipeline().avif({ quality: 45, effort: 4 }).toFile(avif),
      pipeline().webp({ quality: 72 }).toFile(webp),
    ]);
  }
  return {
    avif: { src: publicUrl(avif), w: width },
    webp: { src: publicUrl(webp), w: width },
  };
}

async function one(sourceFile) {
  const meta = await sharp(sourceFile).rotate().metadata();
  const width = meta.width;
  const height = meta.height;
  if (!width || !height) throw new Error(`No dimensions for ${sourceFile}`);
  const widths = [...new Set([...WIDTHS.filter((w) => w < width), width])].sort((a, b) => a - b);
  const variants = [];
  for (const w of widths) variants.push(await encode(sourceFile, w));
  return {
    key: publicUrl(sourceFile),
    value: {
      width,
      height,
      avif: variants.map((v) => v.avif),
      webp: variants.map((v) => v.webp),
    },
  };
}

async function pool(items, limit, fn) {
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await fn(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
}

const files = walk(SOURCE_DIR);
const manifest = {};
let done = 0;
const skipped = [];
await pool(files, CONCURRENCY, async (file) => {
  try {
    const { key, value } = await one(file);
    manifest[key] = value;
  } catch (error) {
    skipped.push(`${file}: ${error instanceof Error ? error.message : error}`);
  }
  done += 1;
  if (done % 50 === 0 || done === files.length) {
    console.log(`optimize-images: ${done}/${files.length}`);
  }
});
if (skipped.length > 0) {
  console.warn(`optimize-images: skipped ${skipped.length} unreadable file(s)`);
  for (const line of skipped) console.warn(`  ${line}`);
}

fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest));
console.log(`optimize-images: ${Object.keys(manifest).length} images → ${path.relative(process.cwd(), MANIFEST_PATH)}`);
