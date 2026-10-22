import SiteShell from '@/components/SiteShell';
import { homeMetadata } from '@/lib/seo';
import '../globals.css';

export async function generateMetadata() {
  return homeMetadata();
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="it">{children}</SiteShell>;
}
