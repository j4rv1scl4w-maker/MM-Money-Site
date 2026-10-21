import type { MetadataRoute } from 'next';

// Required for output: 'export' — emit robots.txt at build time.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Studio is not deployed. These paths stay disallowed so a future copy is not indexed.
      disallow: ['/api/', '/studio/', '/studio-login/'],
    },
    sitemap: 'https://mmmoneybanknotes.com/sitemap.xml',
  };
}
