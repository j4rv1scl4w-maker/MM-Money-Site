export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  (await cookies()).delete('studio_token');
  return NextResponse.json({ ok: true });
}
