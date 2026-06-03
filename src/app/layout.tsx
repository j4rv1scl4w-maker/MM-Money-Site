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

export const metadata: Metadata = {
  title: 'MM·Money — Rare banknotes of the world',
  description: 'Over 4,000 catalogued pieces from 208 countries. Rarities, overprints and specimens for discerning collectors.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${hanken.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="footer-row" style={{ padding: '40px 56px 48px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--ink2)', fontSize: 12 }}>
          <div style={{ fontFamily: 'var(--font-spectral),Georgia,serif', fontSize: 18, color: 'var(--ink)' }}>
            <span style={{ color: 'var(--gold)' }}>MM</span>·Money
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: 36 }}>
            <span>Catalogue · Delcampe</span>
            <span>Catalogue · eBay</span>
            <span>Contact</span>
            <span>© 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
