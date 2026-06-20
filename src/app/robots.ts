import type { MetadataRoute } from 'next';

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
