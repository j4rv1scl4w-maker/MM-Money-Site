'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { label: 'Catalogue',   href: '/catalogue' },
  { label: "What's new",  href: '/news'      },
  { label: 'Articles',    href: '/articles'  },
  { label: 'About',       href: '/about'     },
];

export default function Nav() {
  const path = usePathname();

  return (
    <nav style={{ padding: '0 56px', height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 50 }}>
      <Link href="/" style={{ fontFamily: 'Spectral,Georgia,serif', fontSize: 23, letterSpacing: '.04em', color: 'var(--ink)', textDecoration: 'none' }}>
        <span style={{ color: 'var(--gold)' }}>MM</span>·Money
      </Link>
      <div style={{ display: 'flex', gap: 30 }}>
        {NAV.map(({ label, href }) => {
          const active = path === href || path?.startsWith(href + '/');
          return (
            <Link key={href} href={href} style={{ font: '500 13px/1 Hanken Grotesk,system-ui,sans-serif', color: active ? 'var(--ink)' : 'var(--ink2)', textDecoration: 'none' }}>
              {label}
            </Link>
          );
        })}
      </div>
      <button style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', color: 'var(--ink)', border: '1px solid var(--line)', padding: '7px 14px', borderRadius: 999, background: 'transparent', cursor: 'pointer' }}>
        Search ⌕
      </button>
    </nav>
  );
}
