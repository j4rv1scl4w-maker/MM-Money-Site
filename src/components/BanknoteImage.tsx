'use client';
import Image from 'next/image';
import { useState } from 'react';
import { delcampeImgUrl } from '@/lib/delcampe-image';
import Banknote from './Banknote';

interface BanknoteImageProps {
  idAuction?: string | number | null;
  hue?: number;
  denom?: string;
  label?: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  priority?: boolean;
  /** Card grids and the homepage hero pass `thumb`. Catalogue stays on `large`. */
  variant?: 'large' | 'thumb';
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  /**
   * Homepage hero is `display: none` below 901px. The real URL is a `<source>`
   * that matches only that desktop breakpoint, so phones never fetch it and
   * React does not emit a preload (the image sits inside `<picture>`).
   */
  desktopOnly?: boolean;
}

/** 1×1 gif. Fallback `src` when the desktop `<source>` does not match. */
const DESKTOP_ONLY_FALLBACK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export { delcampeImgUrl } from '@/lib/delcampe-image';

export default function BanknoteImage({ idAuction, hue = 200, denom, label, alt = '', style, className, priority = false, variant = 'large', loading = 'lazy', fetchPriority, desktopOnly = false }: BanknoteImageProps) {
  const [imgError, setImgError] = useState(false);

  // Show placeholder if no id or image failed to load
  if (!idAuction || imgError) {
    return <Banknote hue={hue} dark denom={denom} label={label} style={style} className={className} />;
  }

  const src = delcampeImgUrl(idAuction, variant);
  const frame = {
    position: 'relative' as const,
    aspectRatio: '8/5',
    borderRadius: 4,
    overflow: 'hidden',
    border: '1px solid var(--line)',
    background: 'var(--card)',
    ...style,
  };

  if (desktopOnly) {
    return (
      <div className={className} style={frame}>
        <picture style={{ position: 'absolute', inset: 0, display: 'block' }}>
          <source media="(min-width: 901px)" srcSet={src} />
          <img
            alt={alt || String(label || denom || '')}
            src={DESKTOP_ONLY_FALLBACK}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#111' }}
          />
        </picture>
      </div>
    );
  }

  return (
    <div className={className} style={frame}>
      <Image
        src={src}
        alt={alt || String(label || denom || '')}
        fill
        sizes="(max-width: 768px) 100vw, 300px"
        style={{ objectFit: 'contain', background: '#111' }}
        onError={() => setImgError(true)}
        priority={priority}
        loading={priority ? 'eager' : loading}
        fetchPriority={priority ? 'high' : fetchPriority}
        unoptimized // Avoids Next.js image optimization server requirement on static export
      />
    </div>
  );
}
