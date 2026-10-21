import type { MetadataRoute } from 'next';

// Required for output: 'export' — emit robots.txt at build time.
export const dynamic = 'force-static';

// Cloudflare "Block AI bots" recommendation. Search crawlers stay allowed.
const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'anthropic-ai',
  'Claude-Web',
  'ClaudeBot',
  'Google-Extended',
  'Gemini-Extended',
  'Bytespider',
  'PerplexityBot',
  'YouBot',
  'cohere-ai',
  'CCBot',
  'Diffbot',
  'Omgili',
  'FacebookBot',
  'ImagesiftBot',
  'Scrapy',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Studio is not deployed. These paths stay disallowed so a future copy is not indexed.
        disallow: ['/api/', '/studio/', '/studio-login/'],
      },
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: '/',
      })),
    ],
    sitemap: 'https://mmmoneybanknotes.com/sitemap.xml',
  };
}
