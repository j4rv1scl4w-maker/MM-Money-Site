import Link from 'next/link';
import Banknote from '@/components/Banknote';
import { SAMPLE_ITEMS, UPCOMING, ARTICLES, eur } from '@/lib/data';

const FILTERS = ['Tutti', 'UNC', 'Specimen', 'Rare', 'Polymer'];

const STATS = [
  ['4.073', 'esemplari'],
  ['208', 'paesi'],
  ['Delcampe', '+ eBay'],
  ['dal 2009', 'spedizione mondiale'],
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{ position:'relative', padding:'80px 56px 72px', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(120% 90% at 78% 30%, var(--bg2) 0%, var(--bg) 60%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', display:'grid', gridTemplateColumns:'1fr 0.9fr', gap:48, alignItems:'center' }}>
          <div>
            <div style={{ font:'600 11px/1 Hanken Grotesk,sans-serif', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:12 }}>
              Numismatica cartacea · dal 2009
            </div>
            <h1 className="serif" style={{ fontWeight:300, fontSize:64, lineHeight:1.03, letterSpacing:'-.01em', margin:0 }}>
              La storia del mondo,<br />
              <em style={{ fontWeight:500, color:'var(--gold2)' }}>una banconota</em><br />
              alla volta.
            </h1>
            <p style={{ maxWidth:430, marginTop:24, font:'400 15px/1.65 Hanken Grotesk,sans-serif', color:'var(--ink2)' }}>
              Una collezione di oltre 4.000 esemplari da 208 paesi. Rarità, sovrastampe e specimen, fotografati e classificati con cura d&apos;archivio.
            </p>
            <div style={{ display:'flex', gap:12, marginTop:30 }}>
              <Link href="/catalogo" style={{ background:'var(--gold)', color:'#1b150a', border:'none', padding:'13px 26px', font:'700 13px/1 Hanken Grotesk,sans-serif', borderRadius:3, textDecoration:'none', display:'inline-block' }}>
                Esplora il catalogo →
              </Link>
              <Link href="/novita" style={{ background:'transparent', color:'var(--ink)', border:'1px solid var(--line)', padding:'13px 22px', font:'600 13px/1 Hanken Grotesk,sans-serif', borderRadius:3, textDecoration:'none', display:'inline-block' }}>
                Novità recenti
              </Link>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <div style={{ transform:'translateY(-16px)' }}><Banknote hue={24}  dark denom="100"  label="BOSNIA"  /></div>
            <div style={{ transform:'translateY(16px)' }}> <Banknote hue={190} dark denom="10$"  label="COOK IS."/></div>
            <div style={{ transform:'translateY(-4px)' }}> <Banknote hue={320} dark denom="100"  label="KM·SPEC" /></div>
            <div style={{ transform:'translateY(28px)' }}> <Banknote hue={130} dark denom="20K"  label="C.RICA"  /></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ padding:'0 56px', display:'flex', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)' }}>
        {STATS.map(([n, l], i) => (
          <div key={i} style={{ flex:1, padding:'24px 8px', borderLeft: i ? '1px solid var(--line)' : 'none' }}>
            <div className="serif" style={{ fontSize:30, color:'var(--gold2)', lineHeight:1 }}>{n}</div>
            <div style={{ font:'500 12px/1.4 Hanken Grotesk,sans-serif', color:'var(--ink2)', marginTop:7 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Catalog grid */}
      <section style={{ padding:'54px 56px 0' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:24 }}>
          <div>
            <div style={{ font:'600 11px/1 Hanken Grotesk,sans-serif', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:10 }}>Dal catalogo</div>
            <div className="serif" style={{ fontSize:32 }}>Pezzi in evidenza</div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {FILTERS.map((f, i) => (
              <span key={f} style={{ font:'600 12px/1 Hanken Grotesk,sans-serif', padding:'8px 13px', borderRadius:999, border:`1px solid ${i===0?'var(--gold)':'var(--line)'}`, background:i===0?'var(--gold)':'transparent', color:i===0?'#1b150a':'var(--ink2)', cursor:'pointer' }}>{f}</span>
            ))}
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
          {SAMPLE_ITEMS.map((it) => (
            <div key={it.id} style={{ background:'var(--card)', border:'1px solid var(--line)', borderRadius:6, overflow:'hidden' }}>
              <div style={{ padding:12 }}>
                <Banknote hue={it.hue} dark denom={it.denom.split(' ')[0]} label={`${it.country.toUpperCase()} · ${it.year}`} />
              </div>
              <div style={{ padding:'2px 14px 15px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                  <span style={{ font:'600 10px/1 Hanken Grotesk,sans-serif', letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ink2)' }}>{it.country}</span>
                  {it.tag !== '—' && <span style={{ font:'600 9.5px/1 Hanken Grotesk,sans-serif', letterSpacing:'.12em', textTransform:'uppercase', color:'var(--gold)', border:'1px solid var(--line)', padding:'4px 7px', borderRadius:2 }}>{it.tag}</span>}
                </div>
                <div className="serif" style={{ fontSize:17, lineHeight:1.2 }}>{it.denom} · {it.grade}</div>
                <div style={{ font:'400 12px/1.3 Hanken Grotesk,sans-serif', color:'var(--ink2)', marginTop:3 }}>{it.year}{it.note ? ' · ' + it.note : ''}</div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12 }}>
                  <span className="serif" style={{ fontSize:19, color:'var(--gold2)' }}>{eur(it.price)}</span>
                  <span style={{ font:'500 11px/1 Hanken Grotesk,sans-serif', color:'var(--ink2)' }}>◉ {it.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section style={{ padding:'56px 56px 0' }}>
        <div style={{ font:'600 11px/1 Hanken Grotesk,sans-serif', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:10 }}>Novità nel mondo</div>
        <div className="serif" style={{ fontSize:32, marginBottom:22 }}>Prossime uscite mondiali</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
          {UPCOMING.map((u, i) => (
            <div key={i} style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:6, padding:'18px 18px 20px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', font:'600 11px/1 Hanken Grotesk,sans-serif', marginBottom:14 }}>
                <span style={{ color:'var(--gold)' }}>{u.region}</span>
                <span style={{ color:'var(--ink2)' }}>{u.when}</span>
              </div>
              <div className="serif" style={{ fontSize:17, lineHeight:1.3, marginBottom:10 }}>{u.title}</div>
              <div style={{ font:'500 12px/1.4 Hanken Grotesk,sans-serif', color:'var(--ink2)' }}>{u.issuer}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles preview */}
      <section style={{ padding:'56px 56px 56px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:22 }}>
          <div>
            <div style={{ font:'600 11px/1 Hanken Grotesk,sans-serif', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)', marginBottom:10 }}>Dal giornale</div>
            <div className="serif" style={{ fontSize:32 }}>Articoli &amp; guide</div>
          </div>
          <Link href="/articoli" style={{ font:'600 13px/1 Hanken Grotesk,sans-serif', color:'var(--gold)', textDecoration:'none' }}>
            Tutti gli articoli →
          </Link>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr', gap:20 }}>
          {ARTICLES.slice(0, 3).map((a, i) => (
            <Link key={a.id} href={`/articoli/${a.slug}`} style={{ textDecoration:'none', color:'inherit' }}>
              <Banknote hue={a.hue} dark style={{ aspectRatio: i === 0 ? '16/9' : '8/5', marginBottom:14 }} />
              <div style={{ font:'600 10px/1 Hanken Grotesk,sans-serif', letterSpacing:'.12em', textTransform:'uppercase', color:'var(--gold)', marginBottom:8 }}>{a.cat} · {a.read}</div>
              <div className="serif" style={{ fontSize: i === 0 ? 22 : 18, lineHeight:1.25, marginBottom:8 }}>{a.title}</div>
              {i === 0 && <p style={{ font:'400 13px/1.6 Hanken Grotesk,sans-serif', color:'var(--ink2)', maxWidth:360, margin:0 }}>{a.excerpt}</p>}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
