import { notFound } from 'next/navigation';
import NewsBrowse from '../../browse';
import { getEmissions, toEmissionCard } from '@/lib/content';
import { newsHref, newsYears, parsePageParam } from '@/lib/news-pages';
import { pageMeta } from '@/lib/seo';

export async function generateStaticParams() {
  const cards = (await getEmissions()).map(toEmissionCard);
  return newsYears(cards).map((year) => ({ year: String(year) }));
}

function yearFrom(value: string): number | undefined {
  const year = parsePageParam(value);
  if (!year || year < 1900 || year > 2100) return undefined;
  return year;
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }) {
  const year = yearFrom((await params).year);
  if (!year) return {};
  return pageMeta({
    title: `Banknotes News — ${year} — MM·Money`,
    description: `Banknote emissions from ${year}. New issues from central banks, listed newest first.`,
    path: newsHref(1, year),
  });
}

export default async function NewsYearPage({ params }: { params: Promise<{ year: string }> }) {
  const year = yearFrom((await params).year);
  if (!year) notFound();
  return <NewsBrowse page={1} year={year} />;
}
