import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (username !== (process.env.STUDIO_USER || 'marco') || password !== (process.env.STUDIO_PASSWORD || 'changeme')) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const cookieStore = await cookies();
  cookieStore.set('studio_token', Buffer.from(`${username}:${Date.now()}`).toString('base64'), {
    httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/',
  });
  return NextResponse.json({ ok: true });
}
