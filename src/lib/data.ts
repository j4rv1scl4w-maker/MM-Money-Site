export const UPCOMING = [
  { region: "Eurozona",    issuer: "Banca Centrale Europea",    title: 'Nuova serie € · tema "Cultura europea"', when: "Set 2026", hue: 210 },
  { region: "Regno Unito", issuer: "Bank of England",           title: "£50 in polimero · ritratto aggiornato",  when: "Ott 2026", hue: 150 },
  { region: "India",       issuer: "Reserve Bank of India",     title: "₹100 commemorativa · anniversario",      when: "Nov 2026", hue: 35  },
  { region: "Svizzera",    issuer: "Banca Nazionale Svizzera",  title: "10ª serie · nuovo motivo grafico",       when: "2027",     hue: 8   },
];

export interface NewsItem {
  id: string;
  kind: 'arrivo' | 'uscita';
  date: string;
  ago: string;
  country: string;
  title: string;
  blurb: string;
  hue: number;
  price: number | null;
}

export const NEWS_ITEMS: NewsItem[] = [
  { id: "n1", kind: "arrivo", date: "Oggi",        ago: "2 ore fa",    country: "Bosnia",     title: "Sarajevo 100 Dinara 1993 · sovrastampa UNCIVPOL", blurb: "Esemplare UNC appena catalogato, fronte/retro fotografati.", hue: 24,  price: 21.5  },
  { id: "n2", kind: "uscita", date: "3 set 2026",  ago: "annuncio",    country: "Eurozona",   title: 'BCE · nuova serie € "Cultura europea"',            blurb: "Annunciata la nuova famiglia di banconote, in arrivo nel 2026.", hue: 210, price: null },
  { id: "n3", kind: "arrivo", date: "Ieri",        ago: "1 giorno fa", country: "Costa Rica", title: "20 000 Colones 2020 · polimero",                   blurb: "Lotto di 4 pezzi UNC, numerazione consecutiva.", hue: 130, price: 63    },
  { id: "n4", kind: "uscita", date: "Ott 2026",    ago: "in arrivo",   country: "Regno Unito",title: "Bank of England · £50 polimero, ritratto aggiornato",blurb: "Ritiro graduale della vecchia serie cartacea.", hue: 150, price: null  },
  { id: "n5", kind: "arrivo", date: "2 giorni fa", ago: "2 giorni fa", country: "Cook Is.",   title: "10 Dollars 1987 · serial basso 000368",            blurb: "Pezzo da collezione con numerazione bassa.", hue: 190, price: 47    },
  { id: "n6", kind: "uscita", date: "Nov 2026",    ago: "in arrivo",   country: "India",      title: "RBI · ₹100 commemorativa",                        blurb: "Emissione per anniversario, tiratura limitata.", hue: 35,  price: null  },
];

export interface Article {
  id: string;
  cat: string;
  read: string;
  hue: number;
  featured: boolean;
  slug: string;
  title: string;
  excerpt: string;
  meta: string;
  kw: string[];
  body: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const ARTICLES: Article[] = [{
    id: "a6",
    cat: "History",
    read: "10 min",
    hue: 45,
    featured: true,
    slug: "zimbabwe-100-trillion-dollar-banknote-history",
    title: "The Zimbabwe 100 Trillion Dollar Banknote: The Story Behind an Icon of Hyperinflation",
    excerpt: "Discover the story of the Zimbabwe 100 trillion dollar banknote — the highest denomination ever printed, born from one of history's worst hyperinflations and now one of the most iconic collectibles in the world.",
    meta: "The history of the Zimbabwe 100 trillion dollar banknote: why it was printed, what caused hyperinflation, its collector value today, and how to authenticate one.",
    kw: ["Zimbabwe", "hyperinflation", "100 trillion", "collecting", "world banknotes"],
    createdAt: "2026-05-15",
    body: "There are banknotes, and then there is the Zimbabwe 100 trillion dollar bill. A note so extreme it has become a cultural symbol — printed not as a joke, but out of sheer necessity during one of the most catastrophic monetary collapses in modern history.\n\nToday it sits in glass cases at numismatic fairs, framed on collectors' walls, and listed on eBay for a few dollars — a paradox that perfectly encapsulates what it represents.\n\n## Is the Zimbabwe 100 Trillion Dollar Banknote Real?\n\nYes, completely. The Reserve Bank of Zimbabwe (RBZ) issued it in January 2009 as part of the third dollar series. It was legal tender, printed on real banknote paper, with security features, serial numbers, and the signature of Gideon Gono, the central bank governor.\n\nIts face value: **100,000,000,000,000 Zimbabwean dollars** — one hundred trillion.\n\nIt was not a satirical note, not a souvenir, and not a test print. It was a genuine attempt to give citizens currency they could actually use — for a few days, before inflation made even that insufficient.\n\n## Why Was It Printed?\n\nTo understand the 100 trillion note, you need to understand what happened to Zimbabwe between 1999 and 2009.\n\nUnder President Robert Mugabe, the government launched a land reform program that forcibly redistributed land from white commercial farmers. Agricultural output collapsed. The country began importing food it once exported. Foreign currency reserves dried up. The government's response was to print money to cover its debts.\n\nThe result was a textbook hyperinflationary spiral:\n\n- **2000**: Inflation reaches 55%\n- **2004**: Inflation hits 624%\n- **2007**: Inflation surpasses 66,000%\n- **November 2008**: Month-on-month inflation peaks at an estimated **79.6 billion percent**\n\nAt the peak, prices were doubling every 24 hours. Supermarkets had to reprice goods multiple times per day. Workers demanded to be paid daily — sometimes twice daily — just to afford bread by evening.\n\nThe RBZ responded by issuing ever-larger denominations: 1 million, 10 million, 100 million, then billions, then trillions. The 100 trillion dollar note arrived in January 2009.\n\nBy April 2009, even it was worthless. Zimbabwe abandoned its currency entirely and adopted the US dollar and South African rand.\n\n## What Does the Note Show?\n\nThe 100 trillion dollar note is printed in shades of **red and gold**, measuring the standard 145 × 69 mm of Zimbabwean banknotes from that era.\n\nOn the **obverse (front)**:\n- The Reserve Bank of Zimbabwe logo\n- A stone carving from *Great Zimbabwe*, the ancient city that gives the country its name\n- The denomination in large numerals\n- Serial number and security thread\n- Signature of Governor Gideon Gono\n\nOn the **reverse (back)**:\n- The Chiremba Balancing Rocks, a national symbol located outside Harare\n- The denomination repeated\n- Fine-line guilloche security printing\n\nThe design is professionally executed — a reminder that the printing infrastructure was competent. The catastrophe was economic, not technical.\n\n## How Much Was It Worth When Issued?\n\nAt the official exchange rate set by the Reserve Bank in January 2009, 100 trillion Zimbabwean dollars was worth approximately **US$0.40**.\n\nAt the parallel (black market) rate that most citizens actually used, it bought considerably less — sometimes the equivalent of a few US cents.\n\nFor context: **a loaf of bread** in Harare in early 2009 cost around Z$300 trillion. The 100 trillion dollar note could not even buy half a loaf.\n\nThe government had lost the ability to print money fast enough to keep up with the prices it was creating.\n\n## What Is the Collector Value Today?\n\nThis is where the story takes an ironic turn. The note that was worthless in Zimbabwe in 2009 now trades as a collectible worldwide.\n\nTypical market prices (2025–2026):\n\n- **Circulated / average condition**: US$3–8\n- **Uncirculated (UNC)**: US$8–20\n- **PMG or PCGS graded UNC 65–67**: US$25–60\n- **Original folder / consecutive pairs**: US$40–100+\n\nSupply is substantial — hundreds of millions were printed — which keeps prices accessible. But demand is equally strong: it is one of the most recognizable banknotes in the world and an entry point for new collectors.\n\nAuthenticated, graded examples in high condition command the best premiums, especially in Asian markets where demand for extreme denomination notes is particularly strong.\n\n## How to Collect Zimbabwe Hyperinflation Notes\n\nThe 100 trillion is the famous piece, but the full hyperinflation series is a fascinating collection in its own right.\n\n**Key notes to consider:**\n\n- **50 trillion dollars** (2008, AA series) — same design family, slightly scarcer\n- **20 trillion dollars** (2008) — the last before the jump to 50/100 trillion\n- **100 billion dollars** (2008, third dollar) — the step just below the trillion series\n- **10 billion dollars** (2008) — readily available, good entry point\n- **Special Agro-Cheques** — issued in 2008 specifically for agricultural transactions, including a 100 billion cheque that predates the regular banknote series\n\nFor the serious collector, completing the **Third Dollar** series (2007–2009) — the one that includes the trillion notes — is a rewarding project that documents the full arc of the collapse.\n\n## FAQ\n\n## Is the Zimbabwe 100 trillion note a good investment?\n\nIt is a collectible with stable modest demand, not a financial instrument. Prices have been broadly flat for a decade. Buy it because you find it historically fascinating, not as a store of value.\n\n## How do I know if mine is authentic?\n\nAuthentic notes have a metallic security thread running vertically through the paper, fine guilloche printing on the reverse visible under magnification, and a serial number in the format AA or AB followed by digits. The paper has a subtle texture — it is not smooth like copy paper. Fakes exist but are usually obvious on close inspection.\n\n## Where can I buy one?\n\neBay, Delcampe, and specialist numismatic dealers are all reliable sources. Graded examples from PMG (Paper Money Guaranty) or PCGS Currency offer additional authentication assurance.\n\n## Is it legal to own?\n\nYes, entirely. Zimbabwe demonetized its dollar in 2015, exchanging remaining notes at a rate of US$1 for 35 quadrillion Zimbabwean dollars. The notes are no longer legal tender anywhere and are treated purely as collectibles.\n\n## What caused Zimbabwe's hyperinflation?\n\nThe primary causes were the land reform program beginning in 2000, which destroyed agricultural exports; the government's decision to fund its fiscal deficit by printing money; and a collapse in investor confidence that created a self-reinforcing cycle of currency depreciation and price increases.\n\n## Did Zimbabwe ever recover?\n\nAfter abandoning the Zimbabwean dollar in 2009 and adopting a multi-currency system (primarily USD and ZAR), the economy stabilized. Zimbabwe later introduced a new currency — the RTGS dollar, then the Zimbabwe Gold (ZiG) in 2024 — though monetary credibility remains fragile.\n\n## Final Thoughts\n\nThe Zimbabwe 100 trillion dollar banknote is more than a curiosity. It is a primary historical document — a piece of paper that captures, in its absurd denomination, the full weight of an economic catastrophe and its human cost.\n\nFor collectors, it is also wonderfully accessible: a genuine world-record note, beautifully printed, for the price of a coffee. That combination of historical significance and affordability makes it one of the great entry points into world banknote collecting.\n\nIf you do not own one yet, you probably should.",
  },
];

export function eur(n: number) {
  return "€ " + n.toFixed(2).replace(".", ",");
}
