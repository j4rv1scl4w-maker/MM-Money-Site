import { notFound } from 'next/navigation';
import NewsBrowse from '../../../../browse';
import { getEmissions, toEmissionCard } from '@/lib/content';
import { newsHref, newsYears, pageCount, parsePageParam, sortNews } from '@/lib/news-pages';
import { pageMeta } from '@/lib/seo';

export async function generateStaticParams() {
  const cards = sortNews((await getEmissions()).map(toEmissionCard));
  const params: { year: string; page: string }[] = [];
  for (const year of newsYears(cards)) {
    const total = cards.filter((card) => card.year === year).length;
    const pages = pageCount(total);
    for (let page = 2; page <= pages; page += 1) {
      params.push({ year: String(year), page: String(page) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ year: string; page: string }> }) {
  const { year: yearRaw, page: pageRaw } = await params;
  const year = parsePageParam(yearRaw);
  const page = parsePageParam(pageRaw);
  if (!year || !page || page < 2) return {};
  return pageMeta({
    title: `Banknotes News — ${year}, page ${page} — MM·Money`,
    description: `Banknote emissions from ${year}, page ${page}. New issues from central banks, listed newest first.`,
    path: newsHref(page, year),
  });
}

export default async function NewsYearPageNumber({ params }: { params: Promise<{ year: string; page: string }> }) {
  const { year: yearRaw, page: pageRaw } = await params;
  const year = parsePageParam(yearRaw);
  const page = parsePageParam(pageRaw);
  if (!year || year < 1900 || !page || page < 2) notFound();
  return <NewsBrowse page={page} year={year} />;
}
