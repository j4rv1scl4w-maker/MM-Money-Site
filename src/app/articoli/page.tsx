import Link from 'next/link';
import Banknote from '@/components/Banknote';
import { ARTICLES } from '@/lib/data';

export default function Articoli() {
  const featured = ARTICLES.find(a => a.featured)!;
  const rest = ARTICLES.filter(a => !a.featured);

  return (
    <div>
      {/* Header */}
      <div style={{ padding:'44px 56px 36px' }}>
        <div style={{ font:'600 11px/1 Hanken Grotesk,sans-serif', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:12 }}>Articoli &amp; guide</div>
        <h1 className="serif" style={{ fontWeight:400, fontSize:42, lineHeight:1.05, margin:'0 0 12px' }}>Approfondimenti che restano</h1>
        <p style={{ font:'400 15px/1.6 Hanken Grotesk,sans-serif', color:'var(--ink2)', maxWidth:580, margin:0 }}>
          Guide e storie evergreen, pensate per essere trovate su Google e dagli assistenti AI. Rispondono a domande reali dei collezionisti.
        </p>
      </div>

      {/* Featured */}
      <div style={{ padding:'0 56px 36px' }}>
        <Link href={`/articoli/${featured.slug}`} style={{ textDecoration:'none', color:'inherit', display:'grid', gridTemplateColumns:'1.15fr 1fr', background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:12, padding:22, gap:28, alignItems:'center' }}>
          <Banknote hue={featured.hue} dark style={{ aspectRatio:'16/9' }} />
          <div>
            <span style={{ font:'700 10px/1 Hanken Grotesk,sans-serif', letterSpacing:'.14em', textTransform:'uppercase', color:'var(--gold)', border:'1px solid var(--line)', padding:'5px 9px', borderRadius:999, display:'inline-block', marginBottom:14 }}>{featured.cat}</span>
            <h2 className="serif" style={{ fontWeight:400, fontSize:30, lineHeight:1.2, margin:'0 0 14px' }}>{featured.title}</h2>
            <p style={{ font:'400 14px/1.6 Hanken Grotesk,sans-serif', color:'var(--ink2)', margin:'0 0 18px' }}>{featured.excerpt}</p>
            <span style={{ font:'600 13px/1 Hanken Grotesk,sans-serif', color:'var(--gold)' }}>Leggi → {featured.read}</span>
          </div>
        </Link>
      </div>

      {/* Grid */}
      <div style={{ padding:'0 56px 56px', display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20 }}>
        {rest.map((a) => (
          <Link key={a.id} href={`/articoli/${a.slug}`} style={{ textDecoration:'none', color:'inherit', display:'grid', gridTemplateColumns:'170px 1fr', gap:18, background:'var(--card)', border:'1px solid var(--line)', borderRadius:10, padding:16, alignItems:'start' }}>
            <Banknote hue={a.hue} dark style={{ aspectRatio:'8/5' }} />
            <div>
              <span style={{ font:'700 10px/1 Hanken Grotesk,sans-serif', letterSpacing:'.14em', textTransform:'uppercase', color:'var(--gold)', display:'block', marginBottom:8 }}>{a.cat} · {a.read}</span>
              <h3 className="serif" style={{ fontWeight:400, fontSize:18, lineHeight:1.3, margin:'0 0 10px' }}>{a.title}</h3>
              <p style={{ font:'400 13px/1.55 Hanken Grotesk,sans-serif', color:'var(--ink2)', margin:0 }}>{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
