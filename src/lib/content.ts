import fs from 'fs/promises';
import path from 'path';
import type { NewsItem, Article } from './data';

const CONTENT_DIR = path.join(process.cwd(), 'content');

async function readJSON<T>(file: string, fallback: T[]): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export async function getNews(): Promise<NewsItem[]> {
  const { NEWS_ITEMS } = await import('./data');
  return readJSON<NewsItem>('news.json', NEWS_ITEMS);
}

export async function getArticles(): Promise<Article[]> {
  const { ARTICLES } = await import('./data');
  return readJSON<Article>('articles.json', ARTICLES);
}
