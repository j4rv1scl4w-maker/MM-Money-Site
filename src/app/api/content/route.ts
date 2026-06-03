import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

async function checkAuth() {
  const cookieStore = await cookies();
  return !!cookieStore.get('studio_token')?.value;
}

async function readJSON(file: string) {
  try { return JSON.parse(await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8')); }
  catch { return []; }
}

async function writeJSON(file: string, data: unknown) {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(path.join(CONTENT_DIR, file), JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const news = await readJSON('news.json');
  const articles = await readJSON('articles.json');
  return NextResponse.json({ news, articles });
}

export async function POST(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { news, articles } = await req.json();
  await writeJSON('news.json', news);
  await writeJSON('articles.json', articles);
  return NextResponse.json({ ok: true });
}
