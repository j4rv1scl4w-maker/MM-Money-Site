import { notFound } from 'next/navigation';
import EmissionsGrid from '@/components/EmissionsGrid';
import { getEmissions, toEmissionCard } from '@/lib/content';
import { groupInOrder, newsYears, pageCount, pageSlice, sortNews } from '@/lib/news-pages';
import { responsiveSource } from '@/lib/responsive-image';

export default async function NewsBrowse({ page, year }: { page: number; year?: number }) {
  const cards = sortNews((await getEmissions()).map((emission) => ({
    ...toEmissionCard(emission),
    image: responsiveSource(emission.imageUrl, 320),
  })));
  const years = newsYears(cards);
  if (year !== undefined && !years.includes(year)) notFound();

  const pool = year === undefined ? cards : cards.filter((card) => card.year === year);
  const count = pageCount(pool.length);
  if (page < 1 || page > count) notFound();

  return (
    <EmissionsGrid
      groups={groupInOrder(pageSlice(pool, page))}
      years={years}
      activeYear={year}
      page={page}
      pageCount={count}
      total={pool.length}
    />
  );
}
