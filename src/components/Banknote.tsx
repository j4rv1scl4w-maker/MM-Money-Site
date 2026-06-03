'use client';

interface BanknoteProps {
  hue?: number;
  denom?: string;
  label?: string;
  dark?: boolean;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Banknote({ hue = 200, denom = '', label = '', dark = false, radius = 4, className = '', style = {} }: BanknoteProps) {
  const ink   = dark ? `oklch(0.82 0.06 ${hue})` : `oklch(0.42 0.07 ${hue})`;
  const paper = dark ? `oklch(0.22 0.02 ${hue})` : `oklch(0.95 0.018 ${hue})`;
  const line  = dark ? `oklch(0.5 0.05 ${hue} / 0.5)` : `oklch(0.62 0.06 ${hue} / 0.55)`;
  const border = dark ? `oklch(0.4 0.04 ${hue} / 0.4)` : `oklch(0.7 0.05 ${hue} / 0.5)`;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        aspectRatio: '8/5',
        borderRadius: radius,
        background: paper,
        overflow: 'hidden',
        border: `1px solid ${border}`,
        backgroundImage: `repeating-linear-gradient(90deg, ${line} 0 1px, transparent 1px 7px), repeating-linear-gradient(0deg, ${line} 0 1px, transparent 1px 7px)`,
        ...style,
      }}
    >
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:'34%', aspectRatio:'1', borderRadius:'50%', border:`1px solid ${line}`, display:'flex', alignItems:'center', justifyContent:'center', background:paper }}>
          <div style={{ width:'62%', aspectRatio:'1', borderRadius:'50%', border:`1px solid ${line}` }} />
        </div>
      </div>
      {denom && <div style={{ position:'absolute', top:7, left:9, font:'600 11px/1 ui-monospace,monospace', color:ink, letterSpacing:'.04em' }}>{denom}</div>}
      {label && <div style={{ position:'absolute', bottom:7, right:9, font:'600 11px/1 ui-monospace,monospace', color:ink, opacity:.8 }}>{label}</div>}
      <div style={{ position:'absolute', bottom:7, left:9, font:'400 8px/1 ui-monospace,monospace', color:ink, opacity:.5 }}>SPECIMEN</div>
    </div>
  );
}
