import type { MetadataRoute } from 'next';
import { parseContentDate } from '@/lib/dates';
import { getArticles, getEmissions } from '@/lib/content';
import { pageUrl } from '@/lib/site';

// Required for output: 'export' — metadata routes must be static.
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, emissions] = await Promise.all([getArticles(), getEmissions()]);

  // Static routes have no source date. Omit lastModified rather than stamp every build with new Date().
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: pageUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: pageUrl('/catalogue'), changeFrequency: 'daily', priority: 0.9 },
    { url: pageUrl('/news'), changeFrequency: 'daily', priority: 0.8 },
    { url: pageUrl('/articles'), changeFrequency: 'weekly', priority: 0.8 },
    { url: pageUrl('/about'), changeFrequency: 'monthly', priority: 0.5 },
    { url: pageUrl('/shop'), changeFrequency: 'monthly', priority: 0.9 },
    { url: pageUrl('/it/shop'), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
    const lastModified = parseContentDate(article.updatedAt) ?? parseContentDate(article.createdAt);
    return {
      url: pageUrl(`/articles/${article.slug}`),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  const emissionRoutes: MetadataRoute.Sitemap = emissions.map((emission) => {
    const lastModified = parseContentDate(emission.date, emission.year);
    return {
      url: pageUrl(`/emissions/${emission.slug}`),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...articleRoutes, ...emissionRoutes];
}
