import type { Metadata } from 'next';

const SITE_URL = 'https://mmmoneybanknotes.com';

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest banknote arrivals and worldwide emission announcements — updated regularly.',
  alternates: { canonical: `${SITE_URL}/news` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/news`,
    title: 'News | MM·Money',
    description: 'Latest banknote arrivals and worldwide emission announcements — updated regularly.',
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
