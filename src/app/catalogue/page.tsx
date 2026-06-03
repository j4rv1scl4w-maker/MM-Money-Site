'use client';
import { useState, useMemo } from 'react';
import BanknoteImage from '@/components/BanknoteImage';
import { eur } from '@/lib/data';
import type { CatalogItem } from '@/lib/content';
import catalogData from '../../../content/catalog.json';

const ALL_ITEMS = catalogData as CatalogItem[];

const GRADES = ['All', 'UNC', 'XF', 'VF', 'VG', 'AU'];
const PER_PAGE = 48;

function delcampeUrl(id: string) {
  return `https://www.delcampe.net/en_US/collectibles/search?term=${id}&search_mode=items`;
}

export default function Catalogue() {
  const [gradeFilter, setGradeFilter] = useState('All');
  const [search, setSearch]           = useState('');
  const [page, setPage]               = useState(1);

  const filtered = useMemo(() => {
    let items = ALL_ITEMS;
    if (gradeFilter !== 'All') items = items.filter(it => it.grade === gradeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(it =>
        it.country.toLowerCase().includes(q) ||
        it.denom.toLowerCase().includes(q) ||
        String(it.year).includes(q)
      );
    }
    return items;
  }, [gradeFilter, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleFilter(g: string) { setGradeFilter(g); setPage(1); }
  function handleSearch(v: string) { setSearch(v); setPage(1); }

  return (
    <div className="pad-x" style={{ padding: '44px 56px 60px' }}>
      <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Catalogue</div>
      <h1 className="serif" style={{ fontWeight: 400, fontSize: 42, lineHeight: 1.05, margin: '0 0 12px' }}>
        {ALL_ITEMS.length.toLocaleString()} banknotes from {new Set(ALL_ITEMS.map(i => i.country)).size} countries
      </h1>
      <p style={{ font: '400 15px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)', maxWidth: 540, margin: '0 0 28px' }}>
        Specimens, overprints, rarities and crisp notes — photographed one by one.
      </p>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search country, denomination…"
          style={{ background: 'var(--bg2)', border: '1px solid var(--line)', color: 'var(--ink)', padding: '9px 14px', borderRadius: 6, font: '400 14px/1 Hanken Grotesk,sans-serif', width: 260, outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: 6 }}>
          {GRADES.map(g => (
            <button key={g} onClick={() => handleFilter(g)} style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', padding: '8px 13px', borderRadius: 999, border: `1px solid ${gradeFilter === g ? 'var(--gold)' : 'var(--line)'}`, background: gradeFilter === g ? 'var(--gold)' : 'transparent', color: gradeFilter === g ? '#1b150a' : 'var(--ink2)', cursor: 'pointer' }}>
              {g}
            </button>
          ))}
        </div>
        <span style={{ font: '400 13px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginLeft: 'auto' }}>
          {filtered.length.toLocaleString()} results
        </span>
      </div>

      {/* Grid */}
      <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
        {visible.map((it) => (
          <a
            key={it.idAuction}
            href={delcampeUrl(it.idAuction)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div style={{ padding: 12 }}>
              <BanknoteImage
                idAuction={it.idAuction}
                hue={it.hue}
                denom={it.denom.split(' ')[0]}
                label={`${it.country.toUpperCase()} · ${it.year}`}
                alt={`${it.country} ${it.denom} ${it.year}`}
              />
            </div>
            <div style={{ padding: '2px 14px 15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ font: '600 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)' }}>{it.country}</span>
                <span style={{ font: '600 9.5px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--line)', padding: '3px 6px', borderRadius: 2 }}>{it.grade}</span>
              </div>
              <div className="serif" style={{ fontSize: 16, lineHeight: 1.25 }}>{it.denom}</div>
              <div style={{ font: '400 12px/1.3 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 3 }}>{it.year}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                {it.price && <span className="serif" style={{ fontSize: 18, color: 'var(--gold2)' }}>{eur(it.price)}</span>}
                <span style={{ font: '500 11px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginLeft: 'auto' }}>◉ {it.views}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', padding: '9px 18px', border: '1px solid var(--line)', background: 'transparent', color: page === 1 ? 'var(--line)' : 'var(--ink)', borderRadius: 4, cursor: page === 1 ? 'default' : 'pointer' }}>← Prev</button>
          <span style={{ font: '400 13px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', padding: '9px 14px' }}>{page} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', padding: '9px 18px', border: '1px solid var(--line)', background: 'transparent', color: page === totalPages ? 'var(--line)' : 'var(--ink)', borderRadius: 4, cursor: page === totalPages ? 'default' : 'pointer' }}>Next →</button>
        </div>
      )}
    </div>
  );
}
