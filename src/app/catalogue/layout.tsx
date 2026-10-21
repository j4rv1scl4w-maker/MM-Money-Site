import { catalogueMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return catalogueMetadata();
}

export default function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
