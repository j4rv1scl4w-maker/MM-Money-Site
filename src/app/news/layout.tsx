import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Emissions — MM·Money',
  description: 'Latest banknote emissions and newly arrived pieces from around the world. Stay updated on recent issues, commemoratives, and rarities.',
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
