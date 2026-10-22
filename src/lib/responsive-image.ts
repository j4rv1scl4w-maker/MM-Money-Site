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

function withinWidth(variants: Variant[], maxWidth?: number): Variant[] {
  if (!maxWidth) return variants;
  const within = variants.filter((variant) => variant.w <= maxWidth);
  if (within.length > 0) return within;
  return variants.slice(0, 1);
}

/**
 * Attach width, height, and srcset for a local emission photo.
 * External URLs and files the optimizer has not seen pass through unchanged.
 * `maxWidth` drops candidates the layout cannot use (news thumbs are 160px).
 */
export function responsiveSource(src?: string | null, maxWidth?: number): ResponsiveSource | undefined {
  if (!src) return undefined;
  const entry = manifest[src];
  if (!entry) return { src };
  return {
    src,
    width: entry.width,
    height: entry.height,
    avifSrcSet: srcSet(withinWidth(entry.avif, maxWidth)),
    webpSrcSet: srcSet(withinWidth(entry.webp, maxWidth)),
  };
}

/** CSS aspect-ratio that matches the file, or 2/1 when the size is unknown. */
export function noteAspectRatio(source?: ResponsiveSource): string {
  if (source?.width && source?.height) return `${source.width} / ${source.height}`;
  return '2 / 1';
}
