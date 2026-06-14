'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { label: 'Shop',           href: '/catalogue' },
  { label: 'Banknotes News', href: '/news'      },
  { label: 'Blog',           href: '/articles'  },
  { label: 'About',          href: '/about'     },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="nav-bar" style={{ padding: '0 56px', height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 50 }}>
      <Link href="/" className="nav-logo notranslate" translate="no" style={{ fontFamily: 'Spectral,Georgia,serif', fontSize: 23, letterSpacing: '.04em', color: 'var(--ink)', textDecoration: 'none', flexShrink: 0 }}>
        <span style={{ color: 'var(--gold)' }}>MM</span>·Money
      </Link>
      <div className="nav-links" style={{ display: 'flex', gap: 20 }}>
        {NAV.map(({ label, href }) => {
          const active = path === href || path?.startsWith(href + '/');
          return (
            <Link key={href} href={href} style={{ font: '500 13px/1 Hanken Grotesk,system-ui,sans-serif', color: active ? 'var(--ink)' : 'var(--ink2)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
