'use client';
import { useState } from 'react';
import BanknoteImage from '@/components/BanknoteImage';
import { SAMPLE_ITEMS, eur } from '@/lib/data';

const FILTERS = ['All', 'UNC', 'Specimen', 'Rare', 'Polymer', 'Vintage'];

export default function Catalogue() {
  const [filter, setFilter] = useState('All');

  const visible = SAMPLE_ITEMS.filter(it => {
    if (filter === 'All') return true;
    if (filter === 'UNC') return it.grade === 'UNC';
    return it.tag === filter;
  });

  return (
    <div style={{ padding: '44px 56px 60px' }}>
      <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Catalogue</div>
      <h1 className="serif" style={{ fontWeight: 400, fontSize: 42, lineHeight: 1.05, margin: '0 0 12px' }}>The catalogue</h1>
      <p style={{ font: '400 15px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)', maxWidth: 540, margin: '0 0 28px' }}>
        Over 4,000 pieces from 208 countries — specimens, overprints, rarities and crisp notes, photographed one by one.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', padding: '8px 14px', borderRadius: 999, border: `1px solid ${filter === f ? 'var(--gold)' : 'var(--line)'}`, background: filter === f ? 'var(--gold)' : 'transparent', color: filter === f ? '#1b150a' : 'var(--ink2)', cursor: 'pointer' }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
        {visible.map((it) => (
          <div key={it.id} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ padding: 12 }}>
              <BanknoteImage idAuction={it.idAuction} hue={it.hue} denom={it.denom.split(' ')[0]} label={`${it.country.toUpperCase()} · ${it.year}`} alt={`${it.country} ${it.denom} ${it.year}`} />
            </div>
            <div style={{ padding: '2px 14px 15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ font: '600 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)' }}>{it.country}</span>
                {it.tag !== '—' && <span style={{ font: '600 9.5px/1 Hanken Grotesk,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--line)', padding: '4px 7px', borderRadius: 2 }}>{it.tag}</span>}
              </div>
              <div className="serif" style={{ fontSize: 17, lineHeight: 1.2 }}>{it.denom} · {it.grade}</div>
              <div style={{ font: '400 12px/1.3 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 3 }}>{it.year}{it.note ? ' · ' + it.note : ''}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <span className="serif" style={{ fontSize: 19, color: 'var(--gold2)' }}>{eur(it.price)}</span>
                <span style={{ font: '500 11px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>◉ {it.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
