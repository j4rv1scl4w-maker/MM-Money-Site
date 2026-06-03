import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const validUser = process.env.STUDIO_USER || 'marco';
  const validPass = process.env.STUDIO_PASSWORD || 'changeme';

  if (username !== validUser || password !== validPass) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
  const cookieStore = await cookies();
  cookieStore.set('studio_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return NextResponse.json({ ok: true });
}
