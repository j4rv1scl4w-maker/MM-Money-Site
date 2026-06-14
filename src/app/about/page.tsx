import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — MM·Money',
  description: 'Premium banknote dealer. Over 4,000 graded pieces from 241 countries, available on Delcampe and eBay.',
};

export default function About() {
  const sec: React.CSSProperties = { padding: '0 0 48px' };
  const label: React.CSSProperties = { font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10, display: 'block' };

  return (
    <div className="pad-x" style={{ maxWidth: 760, margin: '0 auto', padding: '52px 56px 80px' }}>

      <span style={label}>About</span>
      <h1 translate="no" className="serif notranslate" style={{ fontWeight: 300, fontSize: 48, lineHeight: 1.05, margin: '0 0 32px' }}>
        MM·Money
      </h1>

      <div style={sec}>
        <p style={{ font: '400 17px/1.75 Hanken Grotesk,sans-serif', color: 'var(--ink)', margin: '0 0 18px' }}>
          <span translate="no" className="notranslate">MM·Money</span> is a premium banknote dealer specialised in paper numismatics, active since 2009. We offer over 4,000 graded pieces from 241 countries — from common circulated notes to rare overprints, specimens and essays that document the monetary history of the world.
        </p>
        <p style={{ font: '400 17px/1.75 Hanken Grotesk,sans-serif', color: 'var(--ink2)', margin: 0 }}>
          Every note is individually photographed, graded and catalogued before listing. We ship worldwide from Italy with tracked shipping on all orders.
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 40, ...sec }}>
        <span style={label}>The shop in numbers</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 40px' }}>
          {[
            ['4,073', 'listed pieces'],
            ['241', 'countries represented'],
            ['Since 2009', 'active on the market'],
            ['Delcampe + eBay', 'worldwide shipping'],
          ].map(([n, l]) => (
            <div key={n} style={{ padding: '20px 0', borderBottom: '1px solid var(--line)' }}>
              <div className="serif" style={{ fontSize: 28, color: 'var(--gold2)', lineHeight: 1 }}>{n}</div>
              <div style={{ font: '500 12px/1.4 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 40, ...sec }}>
        <span style={label}>Find us on</span>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          <a href="https://www.delcampe.net/en_GB/collectables/store/MM-Money" target="_blank" rel="noopener noreferrer" style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '11px 20px', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}>
            Delcampe →
          </a>
          <a href="https://www.ebay.com/str/mmmoney" target="_blank" rel="noopener noreferrer" style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', color: 'var(--ink)', border: '1px solid var(--line)', padding: '11px 20px', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}>
            eBay →
          </a>
        </div>
        <span style={label}>Contact</span>
        <p style={{ font: '400 16px/1.7 Hanken Grotesk,sans-serif', color: 'var(--ink2)', margin: '0 0 14px' }}>
          For questions about a specific piece, trades or combined shipping, write to us directly.
        </p>
        <a href="mailto:info.mmmoney@gmail.com" style={{ font: '600 14px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid var(--line)', paddingBottom: 2 }}>
          info.mmmoney@gmail.com
        </a>
      </div>

    </div>
  );
}
