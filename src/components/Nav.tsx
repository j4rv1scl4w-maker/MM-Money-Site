'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { label: 'Shop',            href: '/catalogue' },
  { label: 'Banknotes News',  href: '/news'      },
  { label: 'Blog',            href: '/articles'  },
  { label: 'About',           href: '/about'     },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="nav-bar" style={{ padding: '0 56px', height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontFamily: 'Spectral,Georgia,serif', fontSize: 23, letterSpacing: '.04em', color: 'var(--ink)', textDecoration: 'none' }}>
          <span style={{ color: 'var(--gold)' }}>MM</span>·Money
        </Link>
        <div className="nav-links" style={{ display: 'flex', gap: 30 }}>
          {NAV.map(({ label, href }) => {
            const active = path === href || path?.startsWith(href + '/');
            return (
              <Link key={href} href={href} style={{ font: '500 13px/1 Hanken Grotesk,system-ui,sans-serif', color: active ? 'var(--ink)' : 'var(--ink2)', textDecoration: 'none' }}>
                {label}
              </Link>
            );
          })}
        </div>
        <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu" style={{ display: 'none', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink)', padding: 4 }}>
          {open ? '✕' : '☰'}
        </button>
      </nav>
      {open && (
        <div style={{ position: 'fixed', inset: '66px 0 0 0', background: 'var(--bg)', zIndex: 49, display: 'flex', flexDirection: 'column', padding: '24px 24px', borderTop: '1px solid var(--line)', gap: 0 }}>
          {NAV.map(({ label, href }) => {
            const active = path === href || path?.startsWith(href + '/');
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} style={{ font: '500 18px/1 Hanken Grotesk,sans-serif', color: active ? 'var(--gold)' : 'var(--ink)', textDecoration: 'none', padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
