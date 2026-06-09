import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue — MM·Money',
  description: 'Browse over 4,000 rare banknotes from 208 countries. Filter by grade, country, or denomination. Specimens, overprints and UNC notes for discerning collectors.',
};

export default function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
