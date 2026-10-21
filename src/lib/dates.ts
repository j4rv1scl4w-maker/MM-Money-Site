const MONTHS: Record<string, number> = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11,
};

/**
 * Parse a content date into a UTC timestamp.
 * Exact days stay exact. A month and year uses the 1st of that month.
 * A year, range, or "ND (year)" uses 1 January of the latest year mentioned.
 * Returns undefined when the text has no year and no fallback year is given.
 */
export function parseContentDate(input?: string | null, fallbackYear?: number | null): Date | undefined {
  const text = input?.trim();
  if (text) {
    const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) {
      const year = Number(iso[1]);
      const month = Number(iso[2]) - 1;
      const day = Number(iso[3]);
      const date = new Date(Date.UTC(year, month, day));
      if (!Number.isNaN(date.getTime())) return date;
    }

    const monthYear = text.match(/\b([A-Za-z]{3,9})\s+((?:19|20)\d{2})\b/);
    if (monthYear) {
      const month = MONTHS[monthYear[1].toLowerCase()];
      if (month !== undefined) return new Date(Date.UTC(Number(monthYear[2]), month, 1));
    }

    const years = [...text.matchAll(/\b(?:19|20)\d{2}\b/g)].map((match) => Number(match[0]));
    if (years.length > 0) return new Date(Date.UTC(Math.max(...years), 0, 1));
  }

  if (fallbackYear && fallbackYear > 1900) return new Date(Date.UTC(fallbackYear, 0, 1));
  return undefined;
}
