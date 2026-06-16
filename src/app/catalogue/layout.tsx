import type { Metadata } from 'next';

const SITE_URL = 'https://mmmoneybanknotes.com';

export const metadata: Metadata = {
  title: 'Catalogue',
  description: 'Browse over 4,000 catalogued banknotes from 208 countries — filter by country, grade, and denomination.',
  alternates: { canonical: `${SITE_URL}/catalogue` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/catalogue`,
    title: 'Catalogue | MM·Money',
    description: 'Browse over 4,000 catalogued banknotes from 208 countries — filter by country, grade, and denomination.',
  },
};

export default function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return children;
}
