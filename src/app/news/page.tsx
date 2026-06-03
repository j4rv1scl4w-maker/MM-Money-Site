'use client';
import { useState } from 'react';

interface Emission {
  id: string;
  year: number;
  date: string;
  country: string;
  issuer: string;
  title: string;
  description: string;
  hue: number;
}

const EMISSIONS: Emission[] = [
  { id: 'e1', year: 2026, date: 'Sep 2026', country: 'Eurozone', issuer: 'European Central Bank', title: 'New € series — "European culture" theme', description: 'The ECB launches a new series featuring European cultural heritage motifs replacing the current "Ages and Styles" architecture series.', hue: 210 },
  { id: 'e2', year: 2026, date: 'Oct 2026', country: 'United Kingdom', issuer: 'Bank of England', title: '£50 polymer — updated royal portrait', description: 'Updated polymer £50 note featuring the new royal portrait, replacing the previous version.', hue: 150 },
  { id: 'e3', year: 2026, date: 'Nov 2026', country: 'India', issuer: 'Reserve Bank of India', title: '₹100 commemorative — anniversary edition', description: 'Commemorative ₹100 note issued for a significant national anniversary. Limited print run.', hue: 35 },
  { id: 'e4', year: 2027, date: '2027', country: 'Switzerland', issuer: 'Swiss National Bank', title: '10th series — new graphic motif', description: 'The SNB announces a new 10th series with updated graphic motifs while maintaining the vertical format introduced in 2016.', hue: 8 },
  { id: 'e5', year: 2027, date: 'Q1 2027', country: 'Australia', issuer: 'Reserve Bank of Australia', title: 'New $5 note — design update', description: 'Updated $5 note replacing the King\'s coronation portrait with a new design honoring indigenous Australian culture.', hue: 55 },
  { id: 'e6', year: 2025, date: 'Dec 2025', country: 'Canada', issuer: 'Bank of Canada', title: '$20 polymer — updated series', description: 'New $20 polymer note with enhanced security features and updated imagery.', hue: 170 },
];

const YEARS = [...new Set(EMISSIONS.map(e => e.year))].sort((a, b) => a - b);

export default function BanknotesNews() {
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');

  const visible = yearFilter === 'all' ? EMISSIONS : EMISSIONS.filter(e => e.year === yearFilter);
  const grouped = YEARS.filter(y => yearFilter === 'all' || y === yearFilter).map(y => ({
    year: y,
    items: visible.filter(e => e.year === y),
  })).filter(g => g.items.length > 0);

  return (
    <div>
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
          <button onClick={() => setYearFilter('all')} style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', padding: '8px 14px', borderRadius: 999, border: `1px solid ${yearFilter === 'all' ? 'var(--news)' : 'var(--line)'}`, background: yearFilter === 'all' ? 'var(--news)' : 'transparent', color: yearFilter === 'all' ? '#0c1418' : 'var(--ink2)', cursor: 'pointer' }}>
            All
          </button>
          {YEARS.map(y => (
            <button key={y} onClick={() => setYearFilter(y)} style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', padding: '8px 14px', borderRadius: 999, border: `1px solid ${yearFilter === y ? 'var(--news)' : 'var(--line)'}`, background: yearFilter === y ? 'var(--news)' : 'transparent', color: yearFilter === y ? '#0c1418' : 'var(--ink2)', cursor: 'pointer' }}>
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
              <div key={e.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, padding: '20px 0', borderTop: '1px solid var(--line)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ font: '600 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)' }}>{e.country}</span>
                    <span style={{ width: 3, height: 3, borderRadius: 99, background: 'var(--line)', display: 'inline-block' }} />
                    <span style={{ font: '500 11px/1 Hanken Grotesk,sans-serif', color: 'var(--news)' }}>{e.date}</span>
                  </div>
                  <div className="serif" style={{ fontSize: 20, lineHeight: 1.25, marginBottom: 8 }}>{e.title}</div>
                  <div style={{ font: '400 13px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>{e.description}</div>
                  <div style={{ font: '500 12px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 10 }}>{e.issuer}</div>
                </div>
                <div style={{ width: 6, alignSelf: 'stretch', background: `hsl(${e.hue},40%,35%)`, borderRadius: 3, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
