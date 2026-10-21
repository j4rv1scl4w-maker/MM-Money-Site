import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Banknote from '@/components/Banknote';
import { getArticles } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { SITE_URL, absoluteAsset, jsonLd, pageUrl } from '@/lib/site';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find(a => a.slug === slug);
  if (!article) return {};
  return pageMeta({
    title: `${article.title} — MM·Money`,
    description: article.meta,
    path: `/articles/${slug}`,
    type: 'article',
    keywords: article.kw,
    images: article.imageUrl ? [article.imageUrl] : undefined,
    publishedTime: article.createdAt,
    modifiedTime: article.updatedAt ?? article.createdAt,
  });
}

function renderInline(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) result.push(text.slice(last, m.index));
    result.push(m[1] !== undefined
      ? <strong key={key++}>{m[1]}</strong>
      : <em key={key++}>{m[2]}</em>
    );
    last = regex.lastIndex;
  }
  if (last < text.length) result.push(text.slice(last));
  return result;
}

function renderBody(body: string) {
  return body.split('\n\n').map((para, i) => {
    if (para.startsWith('## ')) {
      return <h2 key={i} className="serif" style={{ fontWeight: 500, fontSize: 24, lineHeight: 1.3, margin: '32px 0 12px', color: 'var(--ink)' }}>{para.slice(3)}</h2>;
    }
    return <p key={i} style={{ marginBottom: 20 }}>{renderInline(para)}</p>;
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find(a => a.slug === slug);
  if (!article) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta,
    keywords: article.kw.join(', '),
    url: pageUrl(`/articles/${slug}`),
    mainEntityOfPage: pageUrl(`/articles/${slug}`),
    datePublished: article.createdAt,
    dateModified: article.updatedAt ?? article.createdAt,
    image: absoluteAsset(article.imageUrl),
    author: { '@type': 'Organization', name: 'MM·Money', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'MM·Money',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` },
    },
  };

  return (
    <article style={{ maxWidth: 740, margin: '0 auto', padding: '44px 24px 80px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }} />
      <div style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginBottom: 20, display: 'flex', gap: 8 }}>
        <Link href="/articles" style={{ color: 'var(--ink2)', textDecoration: 'none' }}>Articles</Link>
        <span>/</span>
        <span style={{ color: 'var(--gold)' }}>{article.cat}</span>
        <span>/</span>
        <span>{article.slug}</span>
      </div>

      <span style={{ font: '700 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--line)', padding: '5px 9px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>{article.cat}</span>

      <h1 className="serif" style={{ fontWeight: 500, fontSize: 40, lineHeight: 1.12, letterSpacing: '-.01em', margin: '0 0 18px' }}>{article.title}</h1>

      <div style={{ font: '600 12.5px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginBottom: 28 }}>
        MM·Money · {article.read} · updated 2026
      </div>

      {article.imageUrl
        ? <img src={article.imageUrl} alt={article.title} style={{ width: '100%', aspectRatio: '16/8', objectFit: 'cover', borderRadius: 10, marginBottom: 36 }} />
        : <Banknote hue={article.hue} dark style={{ aspectRatio: '16/8', marginBottom: 36 }} />
      }

      <div className="serif" style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink)' }}>
        {renderBody(article.body)}
      </div>

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {article.kw.map(k => (
          <span key={k} style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)', border: '1px solid var(--line)', padding: '6px 10px', borderRadius: 4 }}>{k}</span>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <Link href="/articles" style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', textDecoration: 'none' }}>← All articles</Link>
      </div>
    </article>
  );
}
