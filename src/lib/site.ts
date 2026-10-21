import { cache } from 'react';
import { getCatalog } from '@/lib/content';

export const SITE_URL = 'https://mmmoneybanknotes.com';

export const DELCAMPE_STORE = 'https://www.delcampe.net/en_GB/collectables/store/MM-Money';

/** Absolute page URL with a trailing slash, matching `trailingSlash: true`. */
export function pageUrl(pathname = '/'): string {
  if (!pathname || pathname === '/') return `${SITE_URL}/`;
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  return `${SITE_URL}/${clean}/`;
}

/** Absolute URL for an image or other file. Does not add a trailing slash. */
export function absoluteAsset(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export const catalogStats = cache(async () => {
  const items = await getCatalog();
  return {
    pieces: items.length,
    countries: new Set(items.map((item) => item.country)).size,
  };
});

export function catalogDescription(pieces: number, countries: number): string {
  const count = pieces.toLocaleString('en-GB');
  return `Over ${count} catalogued pieces from ${countries} countries. Rarities, overprints and specimens for discerning collectors.`;
}
