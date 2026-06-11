'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Banknote from './Banknote';

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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HomeNewsRotator({ emissions }: { emissions: Emission[] }) {
  const [visible, setVisible] = useState<Emission[]>(() => shuffle(emissions).slice(0, 4));

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(shuffle(emissions).slice(0, 4));
    }, 12000);
    return () => clearInterval(id);
  }, [emissions]);

  return (
    <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
      {visible.map((u) => (
        <div key={u.id} style={{ background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ position: 'relative', aspectRatio: '8/5', background: 'var(--card)' }}>
            {u.imageUrl
              ? <Image src={u.imageUrl} alt={u.title} fill style={{ objectFit: 'contain', background: '#111' }} unoptimized />
              : <Banknote hue={u.hue} dark label={u.country} style={{ width: '100%', height: '100%' }} />
            }
          </div>
          <div style={{ padding: '14px 16px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', font: '600 11px/1 Hanken Grotesk,sans-serif', marginBottom: 10 }}>
              <span style={{ color: 'var(--news)' }}>{u.country}</span>
              <span style={{ color: 'var(--ink2)' }}>{u.date}</span>
            </div>
            <div className="serif" style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 8 }}>{u.title}</div>
            <div style={{ font: '500 12px/1.4 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>{u.issuer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
