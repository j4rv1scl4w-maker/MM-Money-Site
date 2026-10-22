import type { EmissionCard } from '@/lib/content';

export const NEWS_PAGE_SIZE = 24;

export interface NewsGroup<T extends EmissionCard = EmissionCard> {
  year: number;
  items: T[];
}

/** Same order the news list has always used: newest year, then id descending. */
export function newsYears(items: Pick<EmissionCard, 'year'>[]): number[] {
  return [...new Set(items.map((item) => item.year))].sort((a, b) => b - a);
}

export function sortNews<T extends EmissionCard>(items: T[]): T[] {
  const ordered: T[] = [];
  for (const year of newsYears(items)) {
    const group = items
      .filter((item) => item.year === year)
      .sort((a, b) => b.id.localeCompare(a.id, 'en', { numeric: true }));
    ordered.push(...group);
  }
  return ordered;
}

export function pageCount(total: number, size = NEWS_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(total / size));
}

export function pageSlice<T>(items: T[], page: number, size = NEWS_PAGE_SIZE): T[] {
  const start = (page - 1) * size;
  return items.slice(start, start + size);
}

/** Group an already-sorted slice so a page can open with a new year heading. */
export function groupInOrder<T extends EmissionCard>(items: T[]): NewsGroup<T>[] {
  const groups: NewsGroup<T>[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (!last || last.year !== item.year) groups.push({ year: item.year, items: [item] });
    else last.items.push(item);
  }
  return groups;
}

/** Page 1 is `/news/` or `/news/year/2026/`. Later pages use `/page/2/`. */
export function newsHref(page: number, year?: number): string {
  if (year) return page <= 1 ? `/news/year/${year}` : `/news/year/${year}/page/${page}`;
  return page <= 1 ? '/news' : `/news/page/${page}`;
}

export function parsePageParam(value: string): number | undefined {
  if (!/^[1-9]\d*$/.test(value)) return undefined;
  return Number(value);
}

export function newsSitemapPaths(items: EmissionCard[]): string[] {
  const ordered = sortNews(items);
  const paths: string[] = [];
  const allPages = pageCount(ordered.length);
  for (let page = 2; page <= allPages; page += 1) paths.push(newsHref(page));
  for (const year of newsYears(ordered)) {
    const total = ordered.filter((item) => item.year === year).length;
    const pages = pageCount(total);
    paths.push(newsHref(1, year));
    for (let page = 2; page <= pages; page += 1) paths.push(newsHref(page, year));
  }
  return paths;
}
