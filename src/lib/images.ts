import fs from 'fs';
import path from 'path';

const JSDELIVR_ASSETS = 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/';

const resolved = new Map<string, string>();

/**
 * News and home banknote photos were mirrored from jsDelivr into `public/emissions`.
 * Article reference images were not, and stay on their original URL.
 */
export function localEmissionImage(url?: string | null): string | undefined {
  if (!url) return undefined;
  const cached = resolved.get(url);
  if (cached) return cached;

  let next = url;
  if (url.startsWith(JSDELIVR_ASSETS)) {
    const rel = decodeURIComponent(url.slice(JSDELIVR_ASSETS.length));
    if (!rel.includes('..') && !path.isAbsolute(rel)) {
      const file = path.join(process.cwd(), 'public', 'emissions', rel);
      if (fs.existsSync(file)) next = `/emissions/${rel}`;
    }
  }

  resolved.set(url, next);
  return next;
}
