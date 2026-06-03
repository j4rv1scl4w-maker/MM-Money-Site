import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — MM·Money',
  description: 'Paper numismatics collector since 2009. Over 4,000 banknotes from 208 countries.',
};

export default function About() {
  const sec: React.CSSProperties = { padding: '0 0 48px' };
  const label: React.CSSProperties = { font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10, display: 'block' };

  return (
    <div className="pad-x" style={{ maxWidth: 760, margin: '0 auto', padding: '52px 56px 80px' }}>

      <span style={label}>About</span>
      <h1 className="serif" style={{ fontWeight: 300, fontSize: 48, lineHeight: 1.05, margin: '0 0 32px' }}>
        MM·Money
      </h1>

      <div style={sec}>
        <p style={{ font: '400 17px/1.75 Hanken Grotesk,sans-serif', color: 'var(--ink)', margin: '0 0 18px' }}>
          MM·Money is a paper numismatics collection built over more than fifteen years, focused on banknotes from every corner of the world — from common circulated notes to rare overprints, specimens and essays that document monetary history.
        </p>
        <p style={{ font: '400 17px/1.75 Hanken Grotesk,sans-serif', color: 'var(--ink2)', margin: 0 }}>
          The collection spans over 4,000 pieces from 241 countries, graded and catalogued with archival care. Every note is photographed and listed on Delcampe and eBay.
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 40, ...sec }}>
        <span style={label}>The collection</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 40px' }}>
          {[
            ['4,073', 'catalogued notes'],
            ['241', 'countries represented'],
            ['Since 2009', 'worldwide activity'],
            ['Delcampe + eBay', 'sales platforms'],
          ].map(([n, l]) => (
            <div key={n} style={{ padding: '20px 0', borderBottom: '1px solid var(--line)' }}>
              <div className="serif" style={{ fontSize: 28, color: 'var(--gold2)', lineHeight: 1 }}>{n}</div>
              <div style={{ font: '500 12px/1.4 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 40, ...sec }}>
        <span style={label}>Contact</span>
        <p style={{ font: '400 16px/1.7 Hanken Grotesk,sans-serif', color: 'var(--ink2)', margin: '0 0 18px' }}>
          For purchases, questions or trades, reach us directly on Delcampe or eBay via the shop links on each listing.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="https://www.delcampe.net" target="_blank" rel="noopener noreferrer" style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', color: 'var(--gold)', border: '1px solid var(--line)', padding: '10px 18px', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}>
            View on Delcampe →
          </a>
          <a href="https://www.ebay.com" target="_blank" rel="noopener noreferrer" style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', border: '1px solid var(--line)', padding: '10px 18px', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}>
            View on eBay →
          </a>
        </div>
      </div>

    </div>
  );
}
