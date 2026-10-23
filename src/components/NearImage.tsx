'use client';

import { useEffect, useRef, useState } from 'react';

/** 1×1 gif so an empty img does not request the page URL. */
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * Holds the real src until the frame is nearly on screen.
 * Native loading="lazy" still fetches on a short page because the browser's
 * margin is large. A tight observer margin does not.
 */
export default function NearImage({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: '80px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      src={ready ? src : BLANK}
      alt={alt}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={style}
    />
  );
}
