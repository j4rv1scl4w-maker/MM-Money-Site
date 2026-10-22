export interface ResponsiveSource {
  src: string;
  width?: number;
  height?: number;
  avifSrcSet?: string;
  webpSrcSet?: string;
}

/**
 * Local banknote photo. Uses the build-time AVIF/WebP srcset when the manifest
 * has one, and the original file as the fallback so existing URLs still work.
 */
export default function NoteImage({
  source,
  alt,
  sizes,
  priority = false,
  fill = false,
  className,
  style,
}: {
  source: ResponsiveSource;
  alt: string;
  sizes?: string;
  /** LCP image: eager, high fetch priority, and not lazy. */
  priority?: boolean;
  /** Stretch to a positioned frame. The frame should use the image's aspect ratio. */
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const loading = priority ? 'eager' : 'lazy';
  return (
    <picture
      style={fill ? { position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%' } : { display: 'block' }}
    >
      {source.avifSrcSet ? <source type="image/avif" srcSet={source.avifSrcSet} sizes={sizes} /> : null}
      {source.webpSrcSet ? <source type="image/webp" srcSet={source.webpSrcSet} sizes={sizes} /> : null}
      <img
        src={source.src}
        alt={alt}
        width={source.width}
        height={source.height}
        sizes={sizes}
        loading={loading}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        className={className}
        style={{
          objectFit: 'contain',
          ...(fill ? { width: '100%', height: '100%' } : { width: '100%', height: 'auto' }),
          ...style,
        }}
      />
    </picture>
  );
}
