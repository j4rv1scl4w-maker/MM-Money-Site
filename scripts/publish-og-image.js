const fs = require('fs');
const path = require('path');

// Next writes the generated image as an extensionless file and points og:image at
// /opengraph-image?hash. GitHub Pages serves that as application/octet-stream.
// Copy a real PNG and point the meta tags at it so crawlers receive image/png.
const outDir = path.join(process.cwd(), 'out');
const target = path.join(outDir, 'og.png');

// The file is extensionless. At the app root it is `opengraph-image`. Inside a
// route-group root layout Next suffixes it (`opengraph-image-<id>`).
function findOpenGraphImage(dir) {
  const names = fs.readdirSync(dir).filter((name) => /^opengraph-image(?:-[a-z0-9]+)?$/.test(name));
  const files = names
    .map((name) => path.join(dir, name))
    .filter((file) => fs.statSync(file).isFile());
  if (files.length === 1) return files[0];
  return null;
}

const source = findOpenGraphImage(outDir);
if (!source) {
  console.error('publish-og-image: out/opengraph-image is missing');
  process.exit(1);
}

fs.copyFileSync(source, target);

// Hash is hex. Do not use a quote-based match: in flight payloads the URL is
// followed by an escaped quote (\"), and a greedy match would eat the backslash.
const from = /https:\/\/mmmoneybanknotes\.com\/opengraph-image(?:-[a-z0-9]+)?\?[a-f0-9]+/g;
const to = 'https://mmmoneybanknotes.com/og.png';
let files = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;
    const html = fs.readFileSync(full, 'utf8');
    if (!from.test(html)) {
      from.lastIndex = 0;
      continue;
    }
    from.lastIndex = 0;
    fs.writeFileSync(full, html.replace(from, to));
    files += 1;
  }
}

walk(outDir);
console.log(`publish-og-image: wrote og.png and updated ${files} html files`);
