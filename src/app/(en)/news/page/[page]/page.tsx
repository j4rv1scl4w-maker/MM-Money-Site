import { notFound } from 'next/navigation';
import NewsBrowse from '../../browse';
import { getEmissions, toEmissionCard } from '@/lib/content';
import { newsHref, pageCount, parsePageParam, sortNews } from '@/lib/news-pages';
import { pageMeta } from '@/lib/seo';

export async function generateStaticParams() {
  const cards = sortNews((await getEmissions()).map(toEmissionCard));
  const pages = pageCount(cards.length);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const page = parsePageParam((await params).page);
  if (!page || page < 2) return {};
  return pageMeta({
    title: `Banknotes News — page ${page} — MM·Money`,
    description: `New worldwide banknote emissions from central banks, page ${page}. Issues from 2020–2026, listed newest first.`,
    path: newsHref(page),
  });
}

export default async function NewsPageNumber({ params }: { params: Promise<{ page: string }> }) {
  const page = parsePageParam((await params).page);
  const cards = sortNews((await getEmissions()).map(toEmissionCard));
  const count = pageCount(cards.length);
  if (!page || page < 2 || page > count) notFound();
  return <NewsBrowse page={page} />;
}
