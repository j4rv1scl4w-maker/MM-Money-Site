import { NextRequest, NextResponse } from 'next/server';

function toSlug(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 52);
}

export async function POST(req: NextRequest) {
  const { type, note, lang = 'it' } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Fallback without API key
    if (type === 'news') {
      return NextResponse.json({
        draft: {
          title: `${note.country} ${note.denom} ${note.year}${note.tag && note.tag !== '—' ? ' · ' + note.tag : ''}`,
          blurb: lang === 'it'
            ? `Esemplare ${note.grade} appena catalogato${note.note ? '. ' + note.note : ''}. Disponibile ora.`
            : `${note.grade} piece just catalogued${note.note ? '. ' + note.note : ''}. Available now.`,
          country: note.country,
          hue: note.hue,
          price: note.price,
        },
      });
    } else {
      const slug = toSlug(`${note.country} ${note.denom} ${note.year}`);
      return NextResponse.json({
        draft: {
          title: lang === 'it'
            ? `${note.country} ${note.denom} (${note.year}): guida per collezionisti`
            : `${note.country} ${note.denom} (${note.year}): collector's guide`,
          excerpt: lang === 'it'
            ? `Tutto quello che c'è da sapere su questo ${note.denom} di ${note.country} ${note.year} in conservazione ${note.grade}.`
            : `Everything you need to know about this ${note.grade} ${note.denom} from ${note.country}, ${note.year}.`,
          meta: lang === 'it'
            ? `Acquista o studia il ${note.country} ${note.denom} ${note.year} (${note.grade}). Fotografie, storico prezzi e guida al grading.`
            : `Buy or research the ${note.country} ${note.denom} ${note.year} (${note.grade}). Photographs, price history and grading guide.`,
          slug,
          kw: [note.country, note.grade, note.tag !== '—' ? note.tag : note.denom],
          read: '6 min',
        },
      });
    }
  }

  const systemPrompt = lang === 'it'
    ? `Sei il content editor di MM·Money, un negozio di numismatica cartacea fondato nel 2009.
Stile: preciso, asciutto, da esperto. Niente aggettivi vuoti.
Tono: quello di un esperto che parla ad altri collezionisti, non al grande pubblico.

Per NEWS (tipo "arrivo"): scrivi un titolo conciso (max 80 car.) e una riga di blurb (max 120 car.).
Formato titolo: "[Paese] [Taglio] [Anno] · [dettaglio notevole]"
Formato blurb: descrivere cosa rende interessante il pezzo per un collezionista.

Per ARTICOLO: scrivi titolo SEO (H1), excerpt (2 frasi, max 200 car.), meta description (max 160 car.), slug URL e 3 keyword pertinenti.
L'articolo deve rispondere a una domanda reale del collezionista.
Rispondi SOLO in JSON strutturato, senza markdown.`
    : `You are the content editor of MM·Money, a paper numismatics shop founded in 2009.
Style: precise, dry, expert. No empty adjectives.
Tone: an expert speaking to other collectors, not the general public.

For NEWS (type "arrivo"): write a concise title (max 80 chars) and a one-line blurb (max 120 chars).
Title format: "[Country] [Denomination] [Year] · [notable detail]"
Blurb: describe what makes the piece interesting for a collector.

For ARTICLE: write SEO title (H1), excerpt (2 sentences, max 200 chars), meta description (max 160 chars), URL slug and 3 relevant keywords.
The article must answer a real collector question.
Reply ONLY in structured JSON, no markdown.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 512,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: `Genera un ${type === 'news' ? 'post novità' : 'articolo'} per questa banconota:\n${JSON.stringify(note, null, 2)}`,
        }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '{}';
    const draft = JSON.parse(text.replace(/^```json\n?/, '').replace(/\n?```$/, ''));
    return NextResponse.json({ draft });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
