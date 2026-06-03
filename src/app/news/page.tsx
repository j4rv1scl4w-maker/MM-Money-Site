'use client';
import { useState } from 'react';
import BanknoteImage from '@/components/BanknoteImage';
import type { NewsItem } from '@/lib/data';
import { eur } from '@/lib/data';

// Data is baked in at build time via props from server component
import newsData from '../../../content/news.json';

const FILTERS = [
  { label: 'All',      key: 'all'    },
  { label: 'Arrivals', key: 'arrivo' },
  { label: 'Releases', key: 'uscita' },
];

export default function News() {
  const [filter, setFilter] = useState<'all' | 'arrivo' | 'uscita'>('all');
  const items: NewsItem[] = newsData as NewsItem[];
  const visible = items.filter(n => filter === 'all' || n.kind === filter);

  return (
    <div>
      <div className="pad-x" style={{ padding: '44px 56px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 9, height: 9, borderRadius: 99, background: 'var(--news)', boxShadow: '0 0 0 4px color-mix(in srgb, var(--news) 20%, transparent)', display: 'inline-block' }} />
          <span style={{ font: '700 12px/1 Hanken Grotesk,sans-serif', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--news)' }}>What&apos;s new · Real-time</span>
        </div>
        <h1 className="serif" style={{ fontWeight: 400, fontSize: 42, lineHeight: 1.05, margin: '0 0 12px' }}>On the pulse, every week</h1>
        <p style={{ font: '400 15px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)', maxWidth: 620, marginBottom: 22 }}>
          New catalogue arrivals and upcoming world issues. Short, dated updates: visitors instantly see we&apos;re active.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          {FILTERS.map(({ label, key }) => (
            <button key={key} onClick={() => setFilter(key as typeof filter)} style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', padding: '8px 14px', borderRadius: 999, border: `1px solid ${filter === key ? 'var(--news)' : 'var(--line)'}`, background: filter === key ? 'var(--news)' : 'transparent', color: filter === key ? '#0c1418' : 'var(--ink2)', cursor: 'pointer' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="pad-x" style={{ padding: '0 56px 52px' }}>
        {visible.map((n) => (
          <div key={n.id} className="news-row" style={{ display: 'grid', gridTemplateColumns: '120px 76px 1fr 150px', gap: 22, alignItems: 'center', padding: '20px 0', borderTop: '1px solid var(--line)' }}>
            <div>
              <div style={{ font: '600 14px/1.2 Hanken Grotesk,sans-serif' }}>{n.date}</div>
              <div style={{ font: '400 11.5px/1.2 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 3 }}>{n.ago}</div>
            </div>
            <div style={{ width: 74 }}>
              <BanknoteImage hue={n.hue} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                <span style={{ font: '700 9.5px/1 Hanken Grotesk,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', padding: '5px 8px', borderRadius: 3, color: n.kind === 'arrivo' ? 'var(--news)' : 'var(--gold)', background: n.kind === 'arrivo' ? 'color-mix(in srgb, var(--news) 12%, transparent)' : 'color-mix(in srgb, var(--gold) 10%, transparent)', border: `1px solid color-mix(in srgb, ${n.kind === 'arrivo' ? 'var(--news)' : 'var(--gold)'} 26%, transparent)` }}>
                  {n.kind === 'arrivo' ? 'Just arrived' : 'Upcoming'}
                </span>
                <span style={{ font: '600 10.5px/1 Hanken Grotesk,sans-serif', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink2)' }}>{n.country}</span>
              </div>
              <div className="serif" style={{ fontSize: 19, lineHeight: 1.25 }}>{n.title}</div>
              <div style={{ font: '400 13px/1.5 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 5 }}>{n.blurb}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              {n.price
                ? <><div className="serif" style={{ fontSize: 18, color: 'var(--gold2)' }}>{eur(n.price)}</div><div style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', color: 'var(--news)', marginTop: 8 }}>View in catalogue →</div></>
                : <span style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>Announcement</span>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
