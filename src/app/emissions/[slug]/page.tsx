import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Banknote from '@/components/Banknote';
import { getEmissions } from '@/lib/content';

export async function generateStaticParams() {
  const emissions = await getEmissions();
  return emissions.map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const emissions = await getEmissions();
  const e = emissions.find(e => e.slug === slug);
  if (!e) return {};
  return {
    title: `${e.country} · ${e.title} (${e.date}) — MM·Money`,
    description: e.body || e.description,
  };
}

export default async function EmissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const emissions = await getEmissions();
  const e = emissions.find(e => e.slug === slug);
  if (!e) notFound();

  return (
    <article style={{ maxWidth: 740, margin: '0 auto', padding: '44px 24px 80px' }}>
      <div style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginBottom: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Link href="/news" style={{ color: 'var(--ink2)', textDecoration: 'none' }}>Banknotes News</Link>
        <span>/</span>
        <span style={{ color: 'var(--news)' }}>{e.country}</span>
        <span>/</span>
        <span>{e.year}</span>
      </div>

      <span style={{ font: '700 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--news)', border: '1px solid var(--line)', padding: '5px 9px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>
        {e.date}
      </span>

      <h1 className="serif" style={{ fontWeight: 400, fontSize: 38, lineHeight: 1.1, letterSpacing: '-.01em', margin: '0 0 10px' }}>
        {e.title}
      </h1>

      <div style={{ font: '500 13px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginBottom: 28 }}>
        {e.country} · {e.issuer}
      </div>

      <div style={{ marginBottom: 36, borderRadius: 6, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--card)', aspectRatio: '8/5', position: 'relative' }}>
        {e.imageUrl
          ? <Image src={e.imageUrl} alt={`${e.country} ${e.title}`} fill style={{ objectFit: 'contain', background: '#111' }} unoptimized />
          : <Banknote hue={e.hue} dark denom={e.title} label={e.country} style={{ width: '100%', height: '100%' }} />
        }
      </div>

      <div className="serif" style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32 }}>
        {e.body
          ? e.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ marginBottom: 20 }}>{para}</p>
            ))
          : <p style={{ color: 'var(--ink2)' }}>{e.description}</p>
        }
      </div>

      {e.highlights && (e.highlights.reason || e.highlights.design || e.highlights.security) && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 8, padding: '20px 24px', marginBottom: 32 }}>
          <div style={{ font: '700 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink2)', marginBottom: 14 }}>Highlights</div>
          {e.highlights.reason && (
            <div style={{ marginBottom: 10 }}>
              <span style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', display: 'block', marginBottom: 4 }}>Reason</span>
              <span style={{ font: '400 13px/1.5 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>{e.highlights.reason}</span>
            </div>
          )}
          {e.highlights.design && (
            <div style={{ marginBottom: 10 }}>
              <span style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', display: 'block', marginBottom: 4 }}>Design</span>
              <span style={{ font: '400 13px/1.5 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>{e.highlights.design}</span>
            </div>
          )}
          {e.highlights.security && (
            <div>
              <span style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', display: 'block', marginBottom: 4 }}>Security features</span>
              <span style={{ font: '400 13px/1.5 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>{e.highlights.security}</span>
            </div>
          )}
        </div>
      )}

      {e.sources && e.sources.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ font: '700 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink2)', marginBottom: 10 }}>Sources</div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {e.sources.map((src, i) => (
              <li key={i}>
                {src.startsWith('http')
                  ? <a href={src} target="_blank" rel="noopener noreferrer" style={{ font: '400 12.5px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', wordBreak: 'break-all' }}>
                      {src}
                    </a>
                  : <span style={{ font: '400 12.5px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', wordBreak: 'break-all' }}>{src}</span>
                }
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
        <Link href="/news" style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', textDecoration: 'none' }}>
          ← All emissions
        </Link>
      </div>
    </article>
  );
}
