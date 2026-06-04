import Link from 'next/link';
import Image from 'next/image';
import Banknote from '@/components/Banknote';
import BanknoteImage from '@/components/BanknoteImage';
import { eur } from '@/lib/data';
import { getArticles } from '@/lib/content';
import type { CatalogItem } from '@/lib/content';
import catalogData from '../../content/catalog.json';
import upcomingData from '../../content/news.json';

// Top 12 by views for homepage
const FEATURED: CatalogItem[] = (catalogData as CatalogItem[])
  .sort((a, b) => b.views - a.views)
  .slice(0, 12);

const ALL_CATALOG = catalogData as CatalogItem[];
const COUNTRY_COUNT = new Set(ALL_CATALOG.map(i => i.country)).size;

const UPCOMING_RELEASES = [
  { region: 'Curaçao & Sint Maarten', issuer: 'Centrale Bank van Curaçao en Sint Maarten', title: '10 Caribbean Guilders', when: 'Mar 2025', hue: 45,  imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/11-curacao-and-sint-maarten-10-caribbean-guilders-mar-2025.jpg' },
  { region: 'Mexico',                 issuer: 'Banco de México',                           title: '1,000 Pesos',          when: 'Mar 2025', hue: 200, imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/10-mexico-1-000-pesos-mar-2025.jpg' },
  { region: 'Poland',                 issuer: 'Narodowy Bank Polski',                      title: '20 Zlotych',           when: 'Jan 2025', hue: 215, imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/02-poland-20-zlotych-jan-2025.jpg' },
  { region: 'Egypt',                  issuer: 'Central Bank of Egypt',                     title: '10 Pounds',            when: 'Jan 2025', hue: 40,  imageUrl: 'https://cdn.jsdelivr.net/gh/j4rv1scl4w-maker/Assets@main/banknote-ws-dated-2025-first-11/01-egypt-10-pounds-jan-2025.jpg' },
];

const STATS = [
  [ALL_CATALOG.length.toLocaleString(), 'notes'],
  [String(COUNTRY_COUNT),              'countries'],
  ['Delcampe',                          '+ eBay'],
  ['since 2009',                        'worldwide shipping'],
];

export default async function Home() {
  const articles = await getArticles();

  return (
    <div>
      {/* Hero */}
      <section className="hero-sec pad-x" style={{ position: 'relative', padding: '80px 56px 72px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 78% 30%, var(--bg2) 0%, var(--bg) 60%)', pointerEvents: 'none' }} />
        <div className="hero-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
              Paper numismatics · since 2009
            </div>
            <h1 className="serif hero-h1" style={{ fontWeight: 300, fontSize: 64, lineHeight: 1.03, letterSpacing: '-.01em', margin: 0 }}>
              The story of the world,<br />
              <em style={{ fontWeight: 500, color: 'var(--gold2)' }}>one banknote</em><br />
              at a time.
            </h1>
            <p style={{ maxWidth: 430, marginTop: 24, font: '400 15px/1.65 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>
              A collection of over {ALL_CATALOG.length.toLocaleString()} pieces from {COUNTRY_COUNT} countries. Rarities, overprints and specimens, photographed and graded with archival care.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
              <Link href="/catalogue" style={{ background: 'var(--gold)', color: '#1b150a', padding: '13px 26px', font: '700 13px/1 Hanken Grotesk,sans-serif', borderRadius: 3, textDecoration: 'none', display: 'inline-block' }}>
                Browse catalogue →
              </Link>
              <Link href="/news" style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)', padding: '13px 22px', font: '600 13px/1 Hanken Grotesk,sans-serif', borderRadius: 3, textDecoration: 'none', display: 'inline-block' }}>
                Banknotes News
              </Link>
            </div>
          </div>
          {/* Hero banknotes — top 4 by views */}
          <div className="hero-art" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {FEATURED.slice(0, 4).map((it, i) => (
              <div key={it.idAuction} style={{ transform: `translateY(${['-16px', '16px', '-4px', '28px'][i]})` }}>
                <BanknoteImage
                  idAuction={it.idAuction}
                  hue={it.hue}
                  denom={it.denom.split(' ')[0]}
                  label={it.country.toUpperCase().slice(0, 8)}
                  alt={`${it.country} ${it.denom} ${it.year}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-row pad-x" style={{ padding: '0 56px', display: 'flex', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        {STATS.map(([n, l], i) => (
          <div key={i} style={{ flex: 1, padding: '24px 8px', borderLeft: i ? '1px solid var(--line)' : 'none' }}>
            <div className="serif" style={{ fontSize: 30, color: 'var(--gold2)', lineHeight: 1 }}>{n}</div>
            <div style={{ font: '500 12px/1.4 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 7 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Featured catalog grid */}
      <section className="pad-x" style={{ padding: '54px 56px 0' }}>
        <div className="section-head" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>From the catalogue</div>
            <div className="serif" style={{ fontSize: 32 }}>Most viewed pieces</div>
          </div>
          <Link href="/catalogue" style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', textDecoration: 'none' }}>
            Full catalogue ({ALL_CATALOG.length.toLocaleString()}) →
          </Link>
        </div>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
          {FEATURED.map((it) => (
            <a
              key={it.idAuction}
              href={`https://www.delcampe.net/it/collezionismo/monete-banconote/banconote/${it.title.toLowerCase().replace(/['"]/g,'').replace(/\./g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}-${it.idAuction}.html`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div style={{ padding: 12 }}>
                <BanknoteImage
                  idAuction={it.idAuction}
                  hue={it.hue}
                  denom={it.denom.split(' ')[0]}
                  label={`${it.country.toUpperCase().slice(0,8)} · ${it.year}`}
                  alt={`${it.country} ${it.denom} ${it.year}`}
                />
              </div>
              <div style={{ padding: '2px 14px 15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ font: '600 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)' }}>{it.country}</span>
                  <span style={{ font: '600 9.5px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--line)', padding: '3px 6px', borderRadius: 2 }}>{it.grade}</span>
                </div>
                <div className="serif" style={{ fontSize: 16, lineHeight: 1.2 }}>{it.denom}</div>
                <div style={{ font: '400 12px/1.3 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 3 }}>{it.year}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  {it.price && <span className="serif" style={{ fontSize: 18, color: 'var(--gold2)' }}>{eur(it.price)}</span>}
                  <span style={{ font: '500 11px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginLeft: 'auto' }}>◉ {it.views}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Upcoming releases */}
      <section className="pad-x" style={{ padding: '56px 56px 0' }}>
        <div className="section-head" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--news)', marginBottom: 10 }}>Banknotes News</div>
            <div className="serif" style={{ fontSize: 32 }}>New worldwide emissions</div>
          </div>
          <Link href="/news" style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', color: 'var(--news)', textDecoration: 'none' }}>All emissions →</Link>
        </div>
        <p style={{ font: '400 14px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)', maxWidth: 560, margin: '0 0 22px', marginTop: -8 }}>
          Recent and upcoming issues from central banks around the world — independent of our catalogue.
        </p>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {UPCOMING_RELEASES.map((u, i) => (
            <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '8/5', background: 'var(--card)' }}>
                {u.imageUrl
                  ? <Image src={u.imageUrl} alt={u.title} fill style={{ objectFit: 'contain', background: '#111' }} unoptimized />
                  : <Banknote hue={u.hue} dark label={u.region} style={{ width: '100%', height: '100%' }} />
                }
              </div>
              <div style={{ padding: '14px 16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: '600 11px/1 Hanken Grotesk,sans-serif', marginBottom: 10 }}>
                  <span style={{ color: 'var(--news)' }}>{u.region}</span>
                  <span style={{ color: 'var(--ink2)' }}>{u.when}</span>
                </div>
                <div className="serif" style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 8 }}>{u.title}</div>
                <div style={{ font: '500 12px/1.4 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>{u.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles preview */}
      <section className="pad-x" style={{ padding: '56px 56px 56px' }}>
        <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22 }}>
          <div>
            <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Blog</div>
            <div className="serif" style={{ fontSize: 32 }}>Articles &amp; guides</div>
          </div>
          <Link href="/articles" style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', textDecoration: 'none' }}>All posts →</Link>
        </div>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 20 }}>
          {articles.slice(0, 3).map((a, i) => (
            <Link key={a.id} href={`/articles/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Banknote hue={a.hue} dark style={{ aspectRatio: i === 0 ? '16/9' : '8/5', marginBottom: 14 }} />
              <div style={{ font: '600 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{a.cat} · {a.read}</div>
              <div className="serif" style={{ fontSize: i === 0 ? 22 : 18, lineHeight: 1.25, marginBottom: 8 }}>{a.title}</div>
              {i === 0 && <p style={{ font: '400 13px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)', maxWidth: 360, margin: 0 }}>{a.excerpt}</p>}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
