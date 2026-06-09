import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/content';

const BASE = 'https://mmmoneybanknotes.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
    { url: `${BASE}/catalogue`,   lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/news`,        lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/articles`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
