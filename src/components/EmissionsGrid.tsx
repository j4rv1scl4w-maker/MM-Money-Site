import Link from 'next/link';
import Banknote from './Banknote';
import NoteImage from './NoteImage';
import type { ResponsiveSource } from './NoteImage';
import type { EmissionCard } from '@/lib/content';
import { NEWS_PAGE_SIZE, newsHref, type NewsGroup } from '@/lib/news-pages';

type NewsCard = EmissionCard & { image?: ResponsiveSource };

interface Props {
  groups: NewsGroup<NewsCard>[];
  years: number[];
  activeYear?: number;
  page: number;
  pageCount: number;
  total: number;
}

function windowPages(page: number, pageCount: number): (number | 'gap')[] {
  const wanted = new Set([1, pageCount, page - 1, page, page + 1]);
  const pages = [...wanted].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);
  const out: (number | 'gap')[] = [];
  for (const n of pages) {
    const prev = out[out.length - 1];
    if (typeof prev === 'number' && n - prev > 1) out.push('gap');
    out.push(n);
  }
  return out;
}

const chip = (active: boolean): React.CSSProperties => ({
  font: '600 12px/1 Hanken Grotesk,sans-serif',
  padding: '8px 14px',
  borderRadius: 999,
  border: `1px solid ${active ? 'var(--news)' : 'var(--line)'}`,
  background: active ? 'var(--news)' : 'transparent',
  color: active ? '#0c1418' : 'var(--ink2)',
  textDecoration: 'none',
});

export default function EmissionsGrid({ groups, years, activeYear, page, pageCount, total }: Props) {
  const start = total === 0 ? 0 : (page - 1) * NEWS_PAGE_SIZE + 1;
  const end = Math.min(page * NEWS_PAGE_SIZE, total);
  const pages = windowPages(page, pageCount);

  return (
    <>
      <div className="pad-x" style={{ padding: '44px 56px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 9, height: 9, borderRadius: 99, background: 'var(--news)', boxShadow: '0 0 0 4px color-mix(in srgb, var(--news) 20%, transparent)', display: 'inline-block' }} />
          <span style={{ font: '700 12px/1 Hanken Grotesk,sans-serif', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--news)' }}>Banknotes News</span>
        </div>
        <h1 className="serif" style={{ fontWeight: 400, fontSize: 42, lineHeight: 1.05, margin: '0 0 12px' }}>New worldwide emissions</h1>
        <p style={{ font: '400 15px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)', maxWidth: 620, marginBottom: 22 }}>
          Upcoming and recent banknote issues from central banks around the world. Sorted by release date.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/news" aria-current={activeYear === undefined ? 'page' : undefined} style={chip(activeYear === undefined)}>
            All
          </Link>
          {years.map((year) => (
            <Link key={year} href={newsHref(1, year)} aria-current={activeYear === year ? 'page' : undefined} style={chip(activeYear === year)}>
              {year}
            </Link>
          ))}
        </div>
        <p style={{ font: '500 13px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', margin: '18px 0 0' }}>
          {start}–{end} of {total}
        </p>
      </div>

      <div className="pad-x" style={{ padding: '0 56px 28px' }}>
        {groups.map(({ year, items }) => (
          <div key={year}>
            <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--ink2)', padding: '28px 0 16px', borderTop: '2px solid var(--line)', marginTop: 8 }}>
              {year}
            </div>
            {items.map((e) => (
              <Link key={e.id} href={`/emissions/${e.slug}`} className="em-row">
                <div className="em-thumb" style={e.image?.width && e.image.height ? { aspectRatio: `${e.image.width} / ${e.image.height}` } : undefined}>
                  {e.image || e.imageUrl
                    ? <NoteImage source={e.image ?? { src: e.imageUrl! }} alt={e.title} fill sizes="160px" className="em-img" />
                    : <Banknote hue={e.hue} dark label={e.country} style={{ width: '100%', height: '100%' }} />
                  }
                </div>
                <div>
                  <div className="em-meta">
                    <span className="em-country">{e.country}</span>
                    <span className="em-dot" />
                    <span className="em-date">{e.date}</span>
                  </div>
                  <div className="serif em-title">{e.title}</div>
                  <div className="em-desc">{e.description}</div>
                  <div className="em-issuer">{e.issuer}</div>
                  {e.hasBody && <div className="em-more">Read more →</div>}
                </div>
              </Link>
            ))}
          </div>
        ))}

        {pageCount > 1 && (
          <nav aria-label="Pagination" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', padding: '28px 0 12px', borderTop: '2px solid var(--line)', marginTop: 8 }}>
            {page > 1 && <Link href={newsHref(page - 1, activeYear)} style={chip(false)}>Previous</Link>}
            {pages.map((entry, index) => entry === 'gap'
              ? <span key={`gap-${index}`} style={{ color: 'var(--ink2)' }}>…</span>
              : (
                <Link key={entry} href={newsHref(entry, activeYear)} aria-current={entry === page ? 'page' : undefined} style={chip(entry === page)}>
                  {entry}
                </Link>
              ))}
            {page < pageCount && <Link href={newsHref(page + 1, activeYear)} style={chip(false)}>Next</Link>}
          </nav>
        )}
      </div>
    </>
  );
}
