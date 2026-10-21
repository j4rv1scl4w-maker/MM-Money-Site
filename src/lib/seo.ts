import type { Metadata } from 'next';
import { SITE_URL, catalogDescription, catalogStats, pageUrl } from '@/lib/site';

const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`;

export function pageMeta({
  title,
  description,
  path,
  type = 'website',
  images,
  keywords,
  publishedTime,
  modifiedTime,
  includeOgImage = true,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  images?: string[];
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  /** Home uses the generated file image, rewritten to /og.png after export. */
  includeOgImage?: boolean;
}): Metadata {
  const url = pageUrl(path);
  const ogImages = images && images.length > 0 ? images : includeOgImage ? [DEFAULT_OG_IMAGE] : undefined;
  const meta: Metadata = {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: 'MM·Money',
      title,
      description,
      locale: 'en_GB',
      ...(ogImages ? { images: ogImages } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
  return meta;
}

export async function homeMetadata(): Promise<Metadata> {
  const { pieces, countries } = await catalogStats();
  const description = catalogDescription(pieces, countries);
  const title = 'MM·Money — Rare banknotes of the world';
  return {
    ...pageMeta({ title, description, path: '/', includeOgImage: false }),
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s | MM·Money',
    },
  };
}

export const newsMetadata: Metadata = pageMeta({
  title: 'Banknotes News — MM·Money',
  description: 'New worldwide banknote emissions from central banks, 2020–2026. Stay up to date with the latest issues.',
  path: '/news',
});

export const articlesMetadata: Metadata = pageMeta({
  title: 'Articles & Guides — MM·Money',
  description: 'Evergreen collector guides and in-depth stories about rare banknotes, overprints, and specimens from around the world.',
  path: '/articles',
});

export async function aboutMetadata(): Promise<Metadata> {
  const { pieces, countries } = await catalogStats();
  return pageMeta({
    title: 'About — MM·Money',
    description: `Premium banknote dealer. Over ${pieces.toLocaleString('en-GB')} graded pieces from ${countries} countries, available on Delcampe and eBay.`,
    path: '/about',
  });
}

export async function catalogueMetadata(): Promise<Metadata> {
  const { pieces, countries } = await catalogStats();
  return pageMeta({
    title: 'Catalogue — MM·Money',
    description: `Browse over ${pieces.toLocaleString('en-GB')} rare banknotes from ${countries} countries. Filter by grade, country, or denomination. Specimens, overprints and UNC notes for discerning collectors.`,
    path: '/catalogue',
  });
}
