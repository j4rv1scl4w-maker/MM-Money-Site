'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Banknote from './Banknote';
import type { Emission } from '@/lib/content';

interface Props {
  emissions: Emission[];
}

export default function EmissionsGrid({ emissions }: Props) {
  const years = [...new Set(emissions.map(e => e.year))].sort((a, b) => b - a);
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');

  const visible = yearFilter === 'all' ? emissions : emissions.filter(e => e.year === yearFilter);
  const grouped = years
    .filter(y => yearFilter === 'all' || y === yearFilter)
    .map(y => ({ year: y, items: visible.filter(e => e.year === y) }))
    .filter(g => g.items.length > 0);

  // Sort emissions within each year by date descending (newest first)
  grouped.forEach(g => g.items.sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true })));

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
          <button
            onClick={() => setYearFilter('all')}
            style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', padding: '8px 14px', borderRadius: 999, border: `1px solid ${yearFilter === 'all' ? 'var(--news)' : 'var(--line)'}`, background: yearFilter === 'all' ? 'var(--news)' : 'transparent', color: yearFilter === 'all' ? '#0c1418' : 'var(--ink2)', cursor: 'pointer' }}
          >
            All
          </button>
          {years.map(y => (
            <button
              key={y}
              onClick={() => setYearFilter(y)}
              style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', padding: '8px 14px', borderRadius: 999, border: `1px solid ${yearFilter === y ? 'var(--news)' : 'var(--line)'}`, background: yearFilter === y ? 'var(--news)' : 'transparent', color: yearFilter === y ? '#0c1418' : 'var(--ink2)', cursor: 'pointer' }}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="pad-x" style={{ padding: '0 56px 60px' }}>
        {grouped.map(({ year, items }) => (
          <div key={year}>
            <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--ink2)', padding: '28px 0 16px', borderTop: '2px solid var(--line)', marginTop: 8 }}>
              {year}
            </div>
            {items.map(e => (
              <Link
                key={e.id}
                href={`/emissions/${e.slug}`}
                style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, padding: '20px 0', borderTop: '1px solid var(--line)', alignItems: 'start', textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ width: 160, flexShrink: 0, aspectRatio: '8/5', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--card)', position: 'relative' }}>
                  {e.imageUrl
                    ? <Image src={e.imageUrl} alt={e.title} fill style={{ objectFit: 'contain', background: '#111' }} unoptimized />
                    : <Banknote hue={e.hue} dark label={e.country} style={{ width: '100%', height: '100%' }} />
                  }
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ font: '600 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)' }}>{e.country}</span>
                    <span style={{ width: 3, height: 3, borderRadius: 99, background: 'var(--line)', display: 'inline-block' }} />
                    <span style={{ font: '500 11px/1 Hanken Grotesk,sans-serif', color: 'var(--news)' }}>{e.date}</span>
                  </div>
                  <div className="serif" style={{ fontSize: 20, lineHeight: 1.25, marginBottom: 8 }}>{e.title}</div>
                  <div style={{ font: '400 13px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>{e.description}</div>
                  <div style={{ font: '500 12px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 10 }}>{e.issuer}</div>
                  {e.body && (
                    <div style={{ font: '500 11px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', marginTop: 8 }}>Read more →</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
