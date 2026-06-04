'use client';
import { useState } from 'react';
import Image from 'next/image';
import Banknote from '@/components/Banknote';

interface Emission {
  id: string;
  year: number;
  date: string;
  country: string;
  issuer: string;
  title: string;
  description: string;
  hue: number;
  imageUrl?: string;
}

const EMISSIONS: Emission[] = [
  {
    id: 'e1',
    year: 2025,
    date: 'Jan 2025',
    country: 'Egypt',
    issuer: 'Central Bank of Egypt',
    title: '10 Pounds',
    description: 'The front shows Al-Rifai Mosque in Cairo with Pharaoh Khafre. This is the 2025-issued variant of the long-running P-73 type with the 2022–2026 signature period.',
    hue: 40,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/01-egypt-10-pounds-jan-2025.jpg',
  },
  {
    id: 'e2',
    year: 2025,
    date: 'Jan 2025',
    country: 'Poland',
    issuer: 'Narodowy Bank Polski',
    title: '20 Zlotych',
    description: 'The front features Bolesław Chrobry based on a 19th-century etching. It is a commemorative issue for the millennium of his coronation, with details from the Gniezno bronze doors.',
    hue: 215,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/02-poland-20-zlotych-jan-2025.jpg',
  },
  {
    id: 'e3',
    year: 2025,
    date: 'Jan 2025',
    country: 'Fiji',
    issuer: 'Reserve Bank of Fiji',
    title: '100 Cents',
    description: 'The front shows a stylized Chinese dragon with clouds and red lanterns. It is a non-circulating numismatic note for the Chinese Lunar Year of the Dragon.',
    hue: 10,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/03-fiji-100-cents-jan-2025.jpg',
  },
  {
    id: 'e4',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '2 Dollars',
    description: 'The front shows Philip Goldson with the national coat of arms and Antelope Falls. A distinctive feature is the waterfall theme tied to Belizean natural landmarks.',
    hue: 230,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/04-belize-2-dollars-feb-2025.jpg',
  },
  {
    id: 'e5',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '5 Dollars',
    description: 'The front shows George Cadle Price with the national coat of arms and the National Assembly building in Belmopan. It is distinguished by the civic and historic architecture references on the note.',
    hue: 0,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/05-belize-5-dollars-feb-2025.jpg',
  },
  {
    id: 'e6',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '10 Dollars',
    description: 'The front shows Philip Goldson with the national coat of arms and a green heron. Its distinctive theme is Belizean birdlife, echoed by the toucan and hummingbirds referenced on the note.',
    hue: 35,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/06-belize-10-dollars-feb-2025.jpg',
  },
  {
    id: 'e7',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '20 Dollars',
    description: 'The front shows George Cadle Price with the national coat of arms and Baird\'s tapir. A distinctive element is the wildlife focus, especially the tapir and jaguar imagery.',
    hue: 15,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/07-belize-20-dollars-feb-2025.jpg',
  },
  {
    id: 'e8',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '50 Dollars',
    description: 'The front shows Philip Goldson with the national coat of arms and the Mask Temple at Lamanai. It is distinguished by its strong Maya archaeological theme.',
    hue: 345,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/08-belize-50-dollars-feb-2025.jpg',
  },
  {
    id: 'e9',
    year: 2025,
    date: 'Feb 2025',
    country: 'Belize',
    issuer: 'Central Bank of Belize',
    title: '100 Dollars',
    description: 'The front shows George Cadle Price with the national coat of arms and a queen triggerfish. A distinctive feature is the marine theme connected to the Great Blue Hole and reef life.',
    hue: 190,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/09-belize-100-dollars-feb-2025.jpg',
  },
  {
    id: 'e10',
    year: 2025,
    date: 'Mar 2025',
    country: 'Mexico',
    issuer: 'Banco de México',
    title: '1,000 Pesos',
    description: 'The front shows Hermila Galindo, Carmen Serdán, and Francisco I. Madero. This commemorative variant adds the "100 Aniversario 1925–2025" overprint for the 100th anniversary of Banco de México.',
    hue: 200,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/10-mexico-1-000-pesos-mar-2025.jpg',
  },
  {
    id: 'e11',
    year: 2025,
    date: 'Mar 2025',
    country: 'Curaçao and Sint Maarten',
    issuer: 'Centrale Bank van Curaçao en Sint Maarten',
    title: '10 Caribbean Guilders',
    description: 'The front shows a gray angelfish and the Klein Curaçao lighthouse. Its distinctive feature is the marine-and-lighthouse identity of the new Caribbean guilder series.',
    hue: 45,
    imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/11-curacao-and-sint-maarten-10-caribbean-guilders-mar-2025.jpg',
  },
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
              <div key={e.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, padding: '20px 0', borderTop: '1px solid var(--line)', alignItems: 'start' }}>
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
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
