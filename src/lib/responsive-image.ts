import fs from 'fs';
import path from 'path';
import type { ResponsiveSource } from '@/components/NoteImage';

interface Variant {
  src: string;
  w: number;
}

interface ManifestEntry {
  width: number;
  height: number;
  avif: Variant[];
  webp: Variant[];
}

const MANIFEST_PATH = path.join(process.cwd(), 'src/generated/image-manifest.json');

function loadManifest(): Record<string, ManifestEntry> {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) as Record<string, ManifestEntry>;
  } catch {
    return {};
  }
}

const manifest = loadManifest();

function srcSet(variants: Variant[] | undefined): string | undefined {
  if (!variants || variants.length === 0) return undefined;
  return variants.map((variant) => `${variant.src} ${variant.w}w`).join(', ');
}

/**
 * Attach width, height, and srcset for a local emission photo.
 * External URLs and files the optimizer has not seen pass through unchanged.
 */
export function responsiveSource(src?: string | null): ResponsiveSource | undefined {
  if (!src) return undefined;
  const entry = manifest[src];
  if (!entry) return { src };
  return {
    src,
    width: entry.width,
    height: entry.height,
    avifSrcSet: srcSet(entry.avif),
    webpSrcSet: srcSet(entry.webp),
  };
}

/** CSS aspect-ratio that matches the file, or 2/1 when the size is unknown. */
export function noteAspectRatio(source?: ResponsiveSource): string {
  if (source?.width && source?.height) return `${source.width} / ${source.height}`;
  return '2 / 1';
}
