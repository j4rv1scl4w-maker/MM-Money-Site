import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'MM·Money — Banconote rare del mondo',
  description: 'Oltre 4.000 esemplari catalogati da 208 paesi. Rarità, sovrastampe e specimen per collezionisti esigenti.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <Nav />
        <main>{children}</main>
        <footer style={{ padding:'40px 56px 48px', borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center', color:'var(--ink2)', fontSize:12 }}>
          <div style={{ fontFamily:'Spectral,Georgia,serif', fontSize:18, color:'var(--ink)' }}>
            <span style={{ color:'var(--gold)' }}>MM</span>·Money
          </div>
          <div style={{ display:'flex', gap:36 }}>
            <span>Catalogo · Delcampe</span>
            <span>Catalogo · eBay</span>
            <span>Contatti</span>
            <span>© 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
