'use client';
import { useState, useEffect, useCallback } from 'react';
import Banknote from '@/components/Banknote';
import { SAMPLE_ITEMS, type NewsItem, type Article } from '@/lib/data';

type ContentData = { news: (NewsItem & { _type: 'news' })[]; articles: (Article & { _type: 'article' })[] };
type ContentItem = ContentData['news'][0] | ContentData['articles'][0];

const TABS = [
  { key: 'list',    label: 'Content list' },
  { key: 'compose', label: 'Composer'     },
  { key: 'batch',   label: 'Batch import' },
  { key: 'claude',  label: '✦ Claude'     },
];

const ART_CATS = ['Guide', 'History', 'Technique', 'Condition', 'Countries'];

function toSlug(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 52);
}

const emptyData: ContentData = { news: [], articles: [] };

export default function Studio() {
  const [tab, setTab]         = useState<'list'|'compose'|'batch'|'claude'>('list');
  const [data, setDataRaw]    = useState<ContentData>(emptyData);
  const [saving, setSaving]   = useState(false);
  const [cType, setCType]     = useState<'news'|'article'>('news');
  const [editId, setEditId]   = useState<string | null>(null);

  // news form
  const [fKind, setFKind]       = useState<'arrivo'|'uscita'>('arrivo');
  const [fTitle, setFTitle]     = useState('');
  const [fBlurb, setFBlurb]     = useState('');
  const [fCountry, setFCountry] = useState('');
  const [fPrice, setFPrice]     = useState('');

  // article form
  const [aCat, setACat]         = useState('Guide');
  const [aTitle, setATitle]     = useState('');
  const [aExcerpt, setAExcerpt] = useState('');
  const [aMeta, setAMeta]       = useState('');

  // batch
  const [batchText, setBatchText]     = useState('');
  const [batchParsed, setBatchParsed] = useState<null | unknown[]>(null);
  const [batchErr, setBatchErr]       = useState('');

  // claude
  const [cItemId, setCItemId]   = useState(String(SAMPLE_ITEMS[0]?.id || '1'));
  const [cGenType, setCGenType] = useState<'news'|'article'>('news');
  const [cLoading, setCLoading] = useState(false);
  const [cDraft, setCDraft]     = useState<null | { title?: string; blurb?: string; excerpt?: string; meta?: string; slug?: string; kw?: string[]; read?: string; country?: string; price?: number | null }>(null);
  const [cSaved, setCSaved]     = useState(false);

  // Load from API on mount
  useEffect(() => {
    fetch('/api/content')
      .then(r => r.json())
      .then(d => setDataRaw({
        news: (d.news || []).map((n: NewsItem) => ({ ...n, _type: 'news' as const })),
        articles: (d.articles || []).map((a: Article) => ({ ...a, _type: 'article' as const })),
      }));
  }, []);

  const persistData = useCallback(async (d: ContentData) => {
    setDataRaw(d);
    setSaving(true);
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ news: d.news, articles: d.articles }),
    });
    setSaving(false);
  }, []);

  const allList: ContentItem[] = [
    ...data.news.map(n => ({ ...n, _type: 'news' as const })),
    ...data.articles.map(a => ({ ...a, _type: 'article' as const })),
  ];

  function deleteItem(id: string, type: 'news' | 'article') {
    if (!confirm('Delete this item?')) return;
    persistData({
      news: type === 'news' ? data.news.filter(n => n.id !== id) : data.news,
      articles: type === 'article' ? data.articles.filter(a => a.id !== id) : data.articles,
    });
  }

  function startEdit(item: ContentItem) {
    if (item._type === 'news') {
      setFKind(item.kind); setFTitle(item.title); setFBlurb(item.blurb || '');
      setFCountry(item.country || ''); setFPrice(item.price ? String(item.price) : '');
      setCType('news');
    } else {
      setACat((item as Article).cat || 'Guide'); setATitle(item.title);
      setAExcerpt((item as Article).excerpt || ''); setAMeta((item as Article).meta || '');
      setCType('article');
    }
    setEditId(item.id); setTab('compose');
  }

  function clearForm() {
    setFTitle(''); setFBlurb(''); setFCountry(''); setFPrice('');
    setATitle(''); setAExcerpt(''); setAMeta(''); setACat('Guide');
    setEditId(null);
  }

  function saveItem() {
    const id = editId || `${cType}-${Date.now()}`;
    if (cType === 'news') {
      const item: NewsItem & { _type: 'news' } = {
        id, _type: 'news', kind: fKind, title: fTitle, blurb: fBlurb,
        country: fCountry, hue: 24, price: fPrice ? parseFloat(fPrice) : null,
        date: 'Today', ago: 'just now',
      };
      persistData({
        news: editId ? data.news.map(n => n.id === editId ? item : n) : [item, ...data.news],
        articles: data.articles,
      });
    } else {
      const item: Article & { _type: 'article' } = {
        id, _type: 'article', cat: aCat, title: aTitle, excerpt: aExcerpt,
        meta: aMeta, slug: toSlug(aTitle), kw: [], read: '5 min', hue: 200,
        featured: false, body: '',
      };
      persistData({
        news: data.news,
        articles: editId ? data.articles.map(a => a.id === editId ? item : a) : [item, ...data.articles],
      });
    }
    clearForm(); setTab('list');
  }

  function parseBatch() {
    try {
      const parsed = JSON.parse(batchText);
      if (!Array.isArray(parsed)) throw new Error('Must be array');
      setBatchParsed(parsed); setBatchErr('');
    } catch (e) { setBatchErr(String(e)); setBatchParsed(null); }
  }

  function importBatch() {
    if (!batchParsed) return;
    const newNews = [...data.news];
    const newArts = [...data.articles];
    for (const raw of batchParsed as Record<string, unknown>[]) {
      const id = `import-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      if (raw.type === 'news') {
        newNews.unshift({ id, _type: 'news', kind: (raw.kind as 'arrivo'|'uscita') || 'arrivo', title: String(raw.title || ''), blurb: String(raw.blurb || ''), country: String(raw.country || ''), hue: Number(raw.hue) || 24, price: raw.price ? Number(raw.price) : null, date: 'Today', ago: 'just now' });
      } else if (raw.type === 'article') {
        newArts.unshift({ id, _type: 'article', cat: String(raw.cat || 'Guide'), title: String(raw.title || ''), excerpt: String(raw.excerpt || ''), meta: String(raw.meta || ''), slug: String(raw.slug || toSlug(String(raw.title || ''))), kw: (raw.kw as string[]) || [], read: String(raw.read || '5 min'), hue: Number(raw.hue) || 200, featured: false, body: '' });
      }
    }
    persistData({ news: newNews, articles: newArts });
    setBatchText(''); setBatchParsed(null); setTab('list');
  }

  async function generateWithClaude() {
    setCLoading(true); setCDraft(null); setCSaved(false);
    const item = SAMPLE_ITEMS.find(s => String(s.id) === cItemId) || SAMPLE_ITEMS[0];
    try {
      const res = await fetch('/api/claude/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: cGenType, note: item, lang: 'en' }),
      });
      const { draft } = await res.json();
      setCDraft(draft);
    } catch {
      setCDraft({ title: '(error — configure ANTHROPIC_API_KEY)', blurb: '', excerpt: '' });
    }
    setCLoading(false);
  }

  function saveDraft() {
    if (!cDraft) return;
    const id = `claude-${Date.now()}`;
    if (cGenType === 'news') {
      persistData({ news: [{ id, _type: 'news', kind: 'arrivo', title: String(cDraft.title || ''), blurb: String(cDraft.blurb || ''), country: String(cDraft.country || ''), hue: 24, price: null, date: 'Today', ago: 'just now' }, ...data.news], articles: data.articles });
    } else {
      persistData({ news: data.news, articles: [{ id, _type: 'article', cat: 'Guide', title: String(cDraft.title || ''), excerpt: String(cDraft.excerpt || ''), meta: String(cDraft.meta || ''), slug: toSlug(String(cDraft.title || '')), kw: cDraft.kw || [], read: String(cDraft.read || '5 min'), hue: 200, featured: false, body: '' }, ...data.articles] });
    }
    setCSaved(true);
  }

  const inp: React.CSSProperties = { background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--ink)', padding: '10px 13px', borderRadius: 6, font: '400 14px/1 Hanken Grotesk,sans-serif', width: '100%', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)', display: 'block', marginBottom: 6 };
  const newsSlug = toSlug(fTitle);
  const artSlug  = toSlug(aTitle);

  return (
    <div style={{ minHeight: '80vh', padding: '32px 56px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Studio CMS</div>
          <h1 className="serif" style={{ fontWeight: 400, fontSize: 32, margin: 0 }}>
            {data.news.length} news · {data.articles.length} articles
            {saving && <span style={{ font: '400 13px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginLeft: 14 }}>saving…</span>}
          </h1>
        </div>
        <button onClick={() => { clearForm(); setTab('compose'); }} style={{ background: 'var(--gold)', color: '#1b150a', border: 'none', padding: '11px 20px', font: '700 13px/1 Hanken Grotesk,sans-serif', borderRadius: 4, cursor: 'pointer' }}>+ New</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--line)', marginBottom: 28 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)} style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', padding: '10px 16px', background: 'transparent', border: 'none', color: tab === t.key ? 'var(--ink)' : 'var(--ink2)', borderBottom: tab === t.key ? '2px solid var(--gold)' : '2px solid transparent', cursor: 'pointer', marginBottom: -1 }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* LIST */}
      {tab === 'list' && (
        <div>
          {allList.length === 0 && <p style={{ color: 'var(--ink2)' }}>No content yet. Create the first one.</p>}
          {allList.map(item => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ font: '700 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', padding: '5px 8px', borderRadius: 3, color: item._type === 'news' ? 'var(--news)' : 'var(--gold)', background: item._type === 'news' ? 'var(--news-dim)' : 'color-mix(in srgb, var(--gold) 12%, transparent)', textAlign: 'center' }}>
                {item._type === 'news' ? 'NEWS' : 'ARTICLE'}
              </span>
              <div>
                <div style={{ font: '500 15px/1 Hanken Grotesk,sans-serif', marginBottom: 4 }}>{item.title}</div>
                <div style={{ font: '400 12px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>
                  {item._type === 'news' ? (item as NewsItem).blurb : (item as Article).excerpt}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => startEdit(item)} style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', background: 'transparent', border: '1px solid var(--line)', padding: '7px 12px', borderRadius: 4, cursor: 'pointer' }}>✎ Edit</button>
                <button onClick={() => deleteItem(item.id, item._type)} style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', background: 'transparent', border: '1px solid var(--line)', padding: '7px 12px', borderRadius: 4, cursor: 'pointer' }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COMPOSE */}
      {tab === 'compose' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--bg2)', padding: 4, borderRadius: 8, width: 'fit-content' }}>
              {(['news', 'article'] as const).map(t => (
                <button key={t} onClick={() => setCType(t)} style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', padding: '9px 20px', borderRadius: 6, border: 'none', background: cType === t ? (t === 'news' ? 'var(--news)' : 'var(--gold)') : 'transparent', color: cType === t ? (t === 'news' ? '#0c1418' : '#1b150a') : 'var(--ink2)', cursor: 'pointer' }}>
                  {t === 'news' ? 'NEWS' : 'ARTICLE'}
                </button>
              ))}
            </div>

            {cType === 'news' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Kind</label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {(['arrivo', 'uscita'] as const).map(k => (
                      <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, font: '500 13px/1 Hanken Grotesk,sans-serif', cursor: 'pointer' }}>
                        <input type="radio" checked={fKind === k} onChange={() => setFKind(k)} style={{ accentColor: 'var(--news)' }} />
                        {k === 'arrivo' ? 'Just arrived' : 'Upcoming'}
                      </label>
                    ))}
                  </div>
                </div>
                <div><label style={labelStyle}>Title *</label><input style={inp} value={fTitle} onChange={e => setFTitle(e.target.value)} placeholder="e.g. Bosnia 100 Dinara 1993 · UNCIVPOL" /></div>
                <div><label style={labelStyle}>Blurb (one line)</label><textarea style={{ ...inp, resize: 'vertical', minHeight: 56 }} value={fBlurb} onChange={e => setFBlurb(e.target.value)} placeholder="Brief description for the feed…" /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div><label style={labelStyle}>Country</label><input style={inp} value={fCountry} onChange={e => setFCountry(e.target.value)} placeholder="Bosnia" /></div>
                  <div><label style={labelStyle}>Price (€)</label><input style={inp} type="number" value={fPrice} onChange={e => setFPrice(e.target.value)} placeholder="21.50" /></div>
                </div>
                {newsSlug && <div style={{ font: '400 11.5px/1 ui-monospace,monospace', color: 'var(--ink2)' }}>slug: /news/{newsSlug}</div>}
              </div>
            )}

            {cType === 'article' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {ART_CATS.map(c => (
                      <button key={c} onClick={() => setACat(c)} style={{ font: '600 12px/1 Hanken Grotesk,sans-serif', padding: '7px 14px', borderRadius: 999, border: `1px solid ${aCat === c ? 'var(--gold)' : 'var(--line)'}`, background: aCat === c ? 'var(--gold)' : 'transparent', color: aCat === c ? '#1b150a' : 'var(--ink2)', cursor: 'pointer' }}>{c}</button>
                    ))}
                  </div>
                </div>
                <div><label style={labelStyle}>Title H1 *</label><input style={{ ...inp, fontFamily: 'Spectral,serif', fontSize: 18 }} value={aTitle} onChange={e => setATitle(e.target.value)} placeholder="Article title" /></div>
                <div><label style={labelStyle}>Excerpt</label><textarea style={{ ...inp, resize: 'vertical', minHeight: 72 }} value={aExcerpt} onChange={e => setAExcerpt(e.target.value)} placeholder="Short extract for the index and Google…" /></div>
                <div><label style={labelStyle}>Meta description (max 160 chars)</label><textarea style={{ ...inp, resize: 'vertical', minHeight: 56 }} value={aMeta} onChange={e => setAMeta(e.target.value)} maxLength={160} placeholder="SEO text for search engines…" /></div>
                {artSlug && <div style={{ font: '400 11.5px/1 ui-monospace,monospace', color: 'var(--ink2)' }}>slug: /articles/{artSlug}</div>}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={saveItem} disabled={!(cType === 'news' ? fTitle : aTitle)} style={{ background: 'var(--gold)', color: '#1b150a', border: 'none', padding: '11px 22px', font: '700 13px/1 Hanken Grotesk,sans-serif', borderRadius: 4, cursor: 'pointer', opacity: !(cType === 'news' ? fTitle : aTitle) ? 0.5 : 1 }}>
                {editId ? 'Update' : 'Publish'}
              </button>
              <button onClick={() => { clearForm(); setTab('list'); }} style={{ background: 'transparent', color: 'var(--ink2)', border: '1px solid var(--line)', padding: '11px 16px', font: '600 13px/1 Hanken Grotesk,sans-serif', borderRadius: 4, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>

          {/* Live preview */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink2)', marginBottom: 16 }}>Live preview</div>
            {cType === 'news' && (
              <div style={{ border: '1px solid var(--line)', borderRadius: 6, padding: 14, background: 'var(--card)' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ font: '700 9px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 7px', borderRadius: 2, color: fKind === 'arrivo' ? 'var(--news)' : 'var(--gold)', background: fKind === 'arrivo' ? 'var(--news-dim)' : 'color-mix(in srgb,var(--gold) 10%,transparent)' }}>
                    {fKind === 'arrivo' ? 'Just arrived' : 'Upcoming'}
                  </span>
                  {fCountry && <span style={{ font: '600 10px/1 Hanken Grotesk,sans-serif', color: 'var(--ink2)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{fCountry}</span>}
                </div>
                <div className="serif" style={{ fontSize: 17, lineHeight: 1.25, marginBottom: 6 }}>{fTitle || 'Title…'}</div>
                {fBlurb && <div style={{ font: '400 12px/1.5 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>{fBlurb}</div>}
                {fPrice && <div className="serif" style={{ fontSize: 18, color: 'var(--gold2)', marginTop: 10 }}>€ {parseFloat(fPrice).toFixed(2)}</div>}
              </div>
            )}
            {cType === 'article' && (
              <div>
                <div style={{ font: '700 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>{aCat}</div>
                <div className="serif" style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 10 }}>{aTitle || 'Article title…'}</div>
                {aExcerpt && <div style={{ font: '400 13px/1.55 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginBottom: 14 }}>{aExcerpt}</div>}
                {artSlug && (
                  <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 4, padding: '8px 10px', font: '400 11px/1.4 ui-monospace,monospace', color: 'var(--ink2)' }}>
                    /articles/{artSlug}
                    {aMeta && <><br /><br /><span style={{ color: 'var(--ink)' }}>{aMeta}</span></>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* BATCH */}
      {tab === 'batch' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
          <div>
            <div style={{ font: '500 14px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginBottom: 16 }}>
              Paste a JSON array to bulk-import news items or articles.
            </div>
            <textarea value={batchText} onChange={e => setBatchText(e.target.value)}
              placeholder={'[\n  {\n    "type": "news",\n    "kind": "arrivo",\n    "title": "Bosnia 100 Dinara 1993",\n    "blurb": "UNC just catalogued.",\n    "country": "Bosnia",\n    "hue": 24,\n    "price": 21.50\n  }\n]'}
              style={{ ...inp, minHeight: 240, resize: 'vertical', fontFamily: 'ui-monospace,monospace', fontSize: 12 }} />
            {batchErr && <div style={{ color: '#e88', font: '400 12px/1.4 Hanken Grotesk,sans-serif', marginTop: 8 }}>{batchErr}</div>}
            <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
              <button onClick={parseBatch} style={{ background: 'var(--bg2)', color: 'var(--ink)', border: '1px solid var(--line)', padding: '10px 18px', font: '600 13px/1 Hanken Grotesk,sans-serif', borderRadius: 4, cursor: 'pointer' }}>Analyse &amp; preview</button>
              {batchParsed && <button onClick={importBatch} style={{ background: 'var(--gold)', color: '#1b150a', border: 'none', padding: '10px 18px', font: '700 13px/1 Hanken Grotesk,sans-serif', borderRadius: 4, cursor: 'pointer' }}>Import all ({batchParsed.length})</button>}
            </div>
            {batchParsed && (
              <div style={{ marginTop: 18 }}>
                <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)', marginBottom: 10 }}>{batchParsed.length} items found</div>
                {(batchParsed as Record<string, unknown>[]).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                    <span style={{ font: '700 9px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', padding: '3px 6px', borderRadius: 2, color: item.type === 'news' ? 'var(--news)' : 'var(--gold)', background: item.type === 'news' ? 'var(--news-dim)' : 'color-mix(in srgb,var(--gold) 12%,transparent)' }}>{String(item.type || 'unknown').toUpperCase()}</span>
                    <span style={{ font: '400 13px/1 Hanken Grotesk,sans-serif' }}>{String(item.title || '')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink2)', marginBottom: 12 }}>JSON schema</div>
            <pre style={{ font: '400 10px/1.6 ui-monospace,monospace', color: 'var(--ink2)', background: 'var(--bg)', border: '1px solid var(--line)', padding: 12, borderRadius: 4, overflow: 'auto', margin: 0 }}>
{`[
  {
    "type": "news",
    "kind": "arrivo",
    "title": "...",
    "blurb": "...",
    "country": "...",
    "hue": 24,
    "price": 21.50
  },
  {
    "type": "article",
    "cat": "Guide",
    "title": "...",
    "excerpt": "...",
    "meta": "...",
    "slug": "...",
    "kw": ["..."],
    "hue": 320,
    "read": "6 min"
  }
]`}
            </pre>
          </div>
        </div>
      )}

      {/* CLAUDE */}
      {tab === 'claude' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
          <div>
            <div style={{ font: '500 14px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginBottom: 20 }}>
              Select a banknote from the catalogue and auto-generate a news item or SEO article with Claude.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Banknote</label>
                <select value={cItemId} onChange={e => setCItemId(e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
                  {SAMPLE_ITEMS.map(s => <option key={s.id} value={String(s.id)}>{s.country} · {s.denom} · {s.year} · {s.grade}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Content type</label>
                <div style={{ display: 'flex', gap: 4, background: 'var(--bg2)', padding: 4, borderRadius: 8, width: 'fit-content' }}>
                  {(['news', 'article'] as const).map(t => (
                    <button key={t} onClick={() => setCGenType(t)} style={{ font: '600 13px/1 Hanken Grotesk,sans-serif', padding: '9px 20px', borderRadius: 6, border: 'none', background: cGenType === t ? (t === 'news' ? 'var(--news)' : 'var(--gold)') : 'transparent', color: cGenType === t ? (t === 'news' ? '#0c1418' : '#1b150a') : 'var(--ink2)', cursor: 'pointer' }}>
                      {t === 'news' ? 'Quick news' : 'SEO article'}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={generateWithClaude} disabled={cLoading} style={{ background: 'var(--gold)', color: '#1b150a', border: 'none', padding: '13px 24px', font: '700 13px/1 Hanken Grotesk,sans-serif', borderRadius: 4, cursor: cLoading ? 'wait' : 'pointer', width: 'fit-content', opacity: cLoading ? 0.7 : 1 }}>
                {cLoading ? '⌛ Generating…' : '✦ Generate with Claude'}
              </button>

              {cDraft && (
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 8, padding: 20, marginTop: 8 }}>
                  <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)', marginBottom: 12 }}>Generated draft</div>
                  <div className="serif" style={{ fontSize: 19, marginBottom: 8 }}>{String(cDraft.title || '')}</div>
                  {cDraft.blurb   && <div style={{ font: '400 13px/1.55 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginBottom: 8 }}>{String(cDraft.blurb)}</div>}
                  {cDraft.excerpt && <div style={{ font: '400 13px/1.55 Hanken Grotesk,sans-serif', color: 'var(--ink2)', marginBottom: 8 }}>{String(cDraft.excerpt)}</div>}
                  {cDraft.slug    && <div style={{ font: '400 11px/1 ui-monospace,monospace', color: 'var(--ink2)', marginBottom: 12 }}>slug: {String(cDraft.slug)}</div>}
                  {cDraft.kw && cDraft.kw.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                      {cDraft.kw.map(k => <span key={k} style={{ font: '600 10px/1 Hanken Grotesk,sans-serif', padding: '4px 8px', border: '1px solid var(--line)', borderRadius: 3, color: 'var(--ink2)' }}>{k}</span>)}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => { setCDraft(null); setCSaved(false); }} style={{ background: 'transparent', color: 'var(--ink2)', border: '1px solid var(--line)', padding: '9px 14px', font: '600 12px/1 Hanken Grotesk,sans-serif', borderRadius: 4, cursor: 'pointer' }}>Discard</button>
                    <button onClick={saveDraft} disabled={cSaved} style={{ background: cSaved ? 'transparent' : 'var(--gold)', color: cSaved ? 'var(--gold)' : '#1b150a', border: cSaved ? '1px solid var(--gold)' : 'none', padding: '9px 18px', font: '700 12px/1 Hanken Grotesk,sans-serif', borderRadius: 4, cursor: cSaved ? 'default' : 'pointer' }}>
                      {cSaved ? '✓ Saved' : 'Save to CMS →'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
            <div style={{ font: '600 11px/1 Hanken Grotesk,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink2)', marginBottom: 12 }}>How it works</div>
            <div style={{ font: '400 13px/1.6 Hanken Grotesk,sans-serif', color: 'var(--ink2)' }}>
              <p style={{ margin: '0 0 12px' }}>Claude analyses the selected banknote metadata and generates content optimised for collectors and search engines.</p>
              <p style={{ margin: '0 0 12px' }}>For a <strong style={{ color: 'var(--news)' }}>news item</strong>: concise title + one-line blurb.</p>
              <p style={{ margin: 0 }}>For an <strong style={{ color: 'var(--gold)' }}>SEO article</strong>: H1 · excerpt · meta description · slug · keywords.</p>
            </div>
            <div style={{ marginTop: 16, padding: 12, background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 4 }}>
              <div style={{ font: '600 10px/1 Hanken Grotesk,sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink2)', marginBottom: 6 }}>Config</div>
              <div style={{ font: '400 11px/1.5 ui-monospace,monospace', color: 'var(--ink2)' }}>ANTHROPIC_API_KEY=sk-ant-…</div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom padding */}
      <div style={{ height: 40 }} />
      <div>
        <Banknote style={{ display: 'none' }} hue={0} />
      </div>
    </div>
  );
}
