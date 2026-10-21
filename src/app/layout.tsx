import { Spectral, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import CloudflareBeacon from '@/components/CloudflareBeacon';
import Nav from '@/components/Nav';
import { homeMetadata } from '@/lib/seo';
import { promoteEbay, ebayStoreUrl } from '@/lib/stores';
import { DELCAMPE_STORE, SITE_URL, catalogDescription, catalogStats, jsonLd } from '@/lib/site';

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-spectral',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-hanken',
  display: 'swap',
});

export async function generateMetadata() {
  return homeMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { pieces, countries } = await catalogStats();
  const description = catalogDescription(pieces, countries);
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MM·Money',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.ico`,
    description,
    email: 'info.mmmoney@gmail.com',
    sameAs: [DELCAMPE_STORE],
  };

  return (
    <html lang="en" className={`${spectral.variable} ${hanken.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }}
        />
        <CloudflareBeacon />
        <Nav />
        <main>{children}</main>
        <footer className="footer-row" style={{ padding: '40px 56px 48px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--ink2)', fontSize: 12 }}>
          <div className="notranslate" translate="no" style={{ fontFamily: 'var(--font-spectral),Georgia,serif', fontSize: 18, color: 'var(--ink)' }}>
            <span style={{ color: 'var(--gold)' }}>MM</span>·Money
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: 36 }}>
            <a href="https://www.delcampe.net/en_GB/collectables/store/MM-Money" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink2)', textDecoration: 'none' }}>Delcampe</a>
            {promoteEbay && (
              <a href={ebayStoreUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink2)', textDecoration: 'none' }}>eBay</a>
            )}
            <a href="mailto:info.mmmoney@gmail.com" style={{ color: 'var(--ink2)', textDecoration: 'none' }}>Contact</a>
            <span>© 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
