const MIN = 120;
const MAX = 155;

const STUBS = new Set(['remark', 'printer', 'n/a', 'na', 'none', '-', 'tbd', 'todo']);

const DANGLING = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'with', 'by', 'for', 'to', 'in', 'on', 'at', 'from', 'as',
  'its', 'is', 'are', 'was', 'were', 'be', 'this', 'that', 'which', 'who', 'than', 'into', 'over',
  'under', 'paired', 'again', 'also', 'their', 'his', 'her',
]);

export interface EmissionDescriptionInput {
  country: string;
  title: string;
  date: string;
  issuer: string;
  description?: string | null;
}

function clean(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function tidyEnd(value: string): string {
  const words = value.replace(/[.;,:—–-\s]+$/, '').split(' ');
  while (words.length > 4) {
    const last = words[words.length - 1].replace(/[^A-Za-z]/g, '');
    const dangling = DANGLING.has(last.toLowerCase()) || last.length === 1;
    if (!dangling) break;
    const next = words.slice(0, -1).join(' ');
    if (next.length < MIN) break;
    words.pop();
  }
  return words.join(' ');
}

/** Index of the last real sentence break. Skips initials such as "Manuel A. Roxas". */
function sentenceBreak(cut: string): number {
  let from = cut.length;
  while (from > MIN) {
    const dot = cut.lastIndexOf('. ', from - 1);
    const semi = cut.lastIndexOf('; ', from - 1);
    const idx = Math.max(dot, semi);
    if (idx < MIN) return -1;
    if (cut[idx] === ';') return idx;
    const word = cut.slice(0, idx).trim().split(' ').pop() ?? '';
    if (word.replace(/[^A-Za-z]/g, '').length === 1) {
      from = idx;
      continue;
    }
    return idx;
  }
  return -1;
}

/** Cut at a sentence or word boundary so the result stays inside the meta limit. */
function trimTo(value: string, maxLen: number): string {
  if (value.length <= maxLen) return tidyEnd(value.trim());
  const cut = value.slice(0, maxLen);
  const sentence = sentenceBreak(cut);
  if (sentence >= MIN) {
    const ended = cut[sentence] === '.';
    const base = cut.slice(0, sentence).trim();
    return ended ? `${base}.` : tidyEnd(base);
  }
  const comma = cut.lastIndexOf(', ');
  if (comma >= MIN) return tidyEnd(cut.slice(0, comma));
  const space = cut.lastIndexOf(' ');
  if (space >= MIN) return tidyEnd(cut.slice(0, space));
  return tidyEnd(cut);
}

function finish(value: string): string {
  let text = clean(value);
  if (text.length > MAX) text = trimTo(text, MAX);
  if (text && !/[.!?]$/.test(text)) {
    text = text.length + 1 <= MAX
      ? `${text}.`
      : `${text.slice(0, MAX - 1).replace(/[.,;:—–-\s]+$/, '')}.`;
  }
  return text;
}

/**
 * Meta description for an emission page. Aims for 120–155 characters so short
 * stubs ("Remark.") and long catalogue sentences both land in Google's range.
 */
export function emissionMetaDescription(emission: EmissionDescriptionInput): string {
  const country = clean(emission.country);
  const title = clean(emission.title);
  const date = clean(emission.date);
  const issuer = clean(emission.issuer);
  const shortIssuer = clean(issuer.split(' (')[0] ?? issuer);
  let detail = clean(emission.description || '');
  if (STUBS.has(detail.toLowerCase().replace(/\.+$/, '')) || detail.length < 12) detail = '';

  const lead = `${country} ${title} (${date})`;
  const prefix = `${country} ${title}`.toLowerCase();
  if (detail.toLowerCase().startsWith(prefix)) {
    detail = detail.slice(prefix.length).replace(/^[\s:—–,-]+/, '');
  }

  const candidates = [
    detail ? `${lead}. ${detail}` : '',
    detail ? `${country} ${title}, ${date}. ${detail}` : '',
    `${lead}, issued by ${shortIssuer}.`,
    `${country} issued the ${title} banknote on ${date} through ${shortIssuer}.`,
    `${lead}. Issued by ${shortIssuer}.`,
  ].filter(Boolean);

  let text = '';
  for (const raw of candidates) {
    const candidate = clean(raw);
    if (candidate.length >= MIN && candidate.length <= MAX) {
      text = candidate;
      break;
    }
    if (candidate.length > MAX) {
      const trimmed = trimTo(candidate, MAX);
      if (trimmed.length >= MIN) {
        text = trimmed;
        break;
      }
    } else if (candidate.length > text.length) {
      text = candidate;
    }
  }

  if (text.length < MIN) {
    const extras = [
      shortIssuer && !text.includes(shortIssuer) ? `Issued by ${shortIssuer}.` : '',
      detail && !text.includes(detail) ? detail : '',
      'Recent worldwide banknote issue for collectors.',
      'A new emission recorded for collectors.',
      'Shown here for collectors.',
    ].filter(Boolean);
    for (const extra of extras) {
      if (text.length >= MIN) break;
      const merged = clean(`${text} ${extra}`);
      if (merged.length <= MAX) text = merged;
    }
  }

  text = finish(text);
  if (text.length > MAX) text = finish(trimTo(text, MAX));
  if (text.length < MIN) {
    const filler = 'Worldwide banknote emission.';
    if (text.length + 1 + filler.length <= MAX) text = finish(`${text} ${filler}`);
  }
  if (text.length > MAX) {
    text = `${text.slice(0, MAX - 1).replace(/\s+\S*$/, '').replace(/[.,;:—–-\s]+$/, '')}.`;
  }
  return text;
}
