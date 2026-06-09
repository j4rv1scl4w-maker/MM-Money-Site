import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const auth = await isAuthenticated();
  if (!auth) redirect('/studio-login');
  return (
    <div>
      <div style={{ padding: '10px 56px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end' }}>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
