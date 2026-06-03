'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/studio-login');
    router.refresh();
  }
  return (
    <button onClick={logout} style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)', background: 'transparent', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>
      Sign out
    </button>
  );
}
