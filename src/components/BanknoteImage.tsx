'use client';
import Image from 'next/image';
import { useState } from 'react';
import Banknote from './Banknote';

interface BanknoteImageProps {
  idAuction?: string | number | null;
  hue?: number;
  denom?: string;
  label?: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function delcampeImgUrl(idAuction: string | number): string {
  const s = String(idAuction);
  const parts: string[] = [];
  let i = s.length;
  while (i > 0) {
    parts.unshift(s.slice(Math.max(0, i - 3), i));
    i -= 3;
  }
  parts[0] = parts[0].padStart(3, '0');
  return `https://www.delcampe.net/static/img_large/auction/${parts.join('/')}_001.jpg`;
}

export default function BanknoteImage({ idAuction, hue = 200, denom, label, alt = '', style, className }: BanknoteImageProps) {
  const [imgError, setImgError] = useState(false);

  // Show placeholder if no id or image failed to load
  if (!idAuction || imgError) {
    return <Banknote hue={hue} dark denom={denom} label={label} style={style} className={className} />;
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        aspectRatio: '8/5',
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid var(--line)',
        background: 'var(--card)',
        ...style,
      }}
    >
      <Image
        src={delcampeImgUrl(idAuction)}
        alt={alt || String(label || denom || '')}
        fill
        sizes="(max-width: 768px) 100vw, 300px"
        style={{ objectFit: 'cover' }}
        onError={() => setImgError(true)}
        unoptimized // Avoids Next.js image optimization server requirement on static export
      />
    </div>
  );
}
