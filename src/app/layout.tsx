import type { Metadata } from 'next';
import { Spectral, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';

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

const SITE_URL = 'https://mmmoneybanknotes.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MM·Money — Rare banknotes of the world',
    template: '%s | MM·Money',
  },
  description: 'Over 4,000 catalogued pieces from 208 countries. Rarities, overprints and specimens for discerning collectors.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'MM·Money',
    title: 'MM·Money — Rare banknotes of the world',
    description: 'Over 4,000 catalogued pieces from 208 countries. Rarities, overprints and specimens for discerning collectors.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MM·Money — Rare banknotes of the world',
    description: 'Over 4,000 catalogued pieces from 208 countries. Rarities, overprints and specimens for discerning collectors.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MM·Money',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: 'Over 4,000 catalogued pieces from 208 countries. Rarities, overprints and specimens for discerning collectors.',
  email: 'info.mmmoney@gmail.com',
  sameAs: [
    'https://www.delcampe.net/en_GB/collectables/store/MM-Money',
    'https://www.ebay.com/str/mmmoney',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${hanken.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="footer-row" style={{ padding: '40px 56px 48px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--ink2)', fontSize: 12 }}>
          <div translate="no" style={{ fontFamily: 'var(--font-spectral),Georgia,serif', fontSize: 18, color: 'var(--ink)' }}>
            <span style={{ color: 'var(--gold)' }}>MM</span>·Money
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: 36 }}>
            <a href="https://www.delcampe.net/en_GB/collectables/store/MM-Money" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink2)', textDecoration: 'none' }}>Delcampe</a>
            <a href="https://www.ebay.com/str/mmmoney" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink2)', textDecoration: 'none' }}>eBay</a>
            <a href="mailto:info.mmmoney@gmail.com" style={{ color: 'var(--ink2)', textDecoration: 'none' }}>Contact</a>
            <span>© 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
