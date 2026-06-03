'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudioLogin() {
  const router = useRouter();
  const [user, setUser]       = useState('');
  const [pass, setPass]       = useState('');
  const [err, setErr]         = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(''); setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass }),
    });
    setLoading(false);
    if (res.ok) { router.push('/studio'); router.refresh(); }
    else setErr('Invalid credentials.');
  }

  const inp: React.CSSProperties = { background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--ink)', padding: '11px 14px', borderRadius: 6, font: '400 15px/1 Hanken Grotesk,sans-serif', width: '100%', boxSizing: 'border-box', outline: 'none' };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 340, background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 12, padding: 32 }}>
        <div style={{ fontFamily: 'Spectral,Georgia,serif', fontSize: 22, marginBottom: 6 }}>
          <span style={{ color: 'var(--gold)' }}>MM</span>·Money Studio
        </div>
        <div style={{ font: '400 13px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginBottom: 28 }}>Private access</div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)', display: 'block', marginBottom: 6 }}>Username</label>
            <input style={inp} value={user} onChange={e => setUser(e.target.value)} autoComplete="username" required />
          </div>
          <div>
            <label style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)', display: 'block', marginBottom: 6 }}>Password</label>
            <input style={inp} type="password" value={pass} onChange={e => setPass(e.target.value)} autoComplete="current-password" required />
          </div>
          {err && <div style={{ font: '400 13px/1 Hanken Grotesk,sans-serif', color: '#e88' }}>{err}</div>}
          <button type="submit" disabled={loading} style={{ background: 'var(--gold)', color: '#1b150a', border: 'none', padding: 13, font: '700 13px/1 Hanken Grotesk,sans-serif', borderRadius: 4, cursor: loading ? 'wait' : 'pointer', marginTop: 4 }}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>
      </div>
    </div>
  );
}
