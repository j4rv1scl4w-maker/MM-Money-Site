const NUMBER_LOCALE = 'en-GB';

/**
 * Group digits with a fixed locale. `toLocaleString()` with no locale follows
 * the server or browser default and mismatches during hydration (React #418).
 */
export function formatCount(value: number): string {
  return new Intl.NumberFormat(NUMBER_LOCALE).format(value);
}
