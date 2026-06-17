import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/', '/studio-login/'],
    },
    sitemap: 'https://mmmoneybanknotes.com/sitemap.xml',
  };
}
