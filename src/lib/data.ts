// idAuction: Delcampe auction ID — image URL: https://delcampe-static.net/img/lot/{id}/{id}_001.jpg
// Replace with real IDs from data/collection.csv
export const SAMPLE_ITEMS = [
  { id: 1,  idAuction: null, country: "Bosnia",     denom: "100 Dinara",        year: 1993, grade: "UNC", price: 21.5,  views: 24,  tag: "Overprint",  hue: 24,  note: "Sarajevo · Uncivpol" },
  { id: 2,  idAuction: null, country: "Bosnia",     denom: "50 Mrd Dinara",     year: 1993, grade: "UNC", price: 43.5,  views: 21,  tag: "Rare",       hue: 8,   note: "50 billion" },
  { id: 3,  idAuction: null, country: "China",      denom: "100 Yuan",          year: 1941, grade: "XF",  price: 10,    views: 14,  tag: "Vintage",    hue: 14,  note: "Central Bank of China" },
  { id: 4,  idAuction: null, country: "China",      denom: "20 Yuan",           year: 2022, grade: "UNC", price: 9,     views: 6,   tag: "Polymer",    hue: 210, note: "Olympic Winter Games" },
  { id: 5,  idAuction: null, country: "Congo",      denom: "5 000 Francs",      year: 2013, grade: "AU",  price: 39,    views: 18,  tag: "Rare",       hue: 150, note: "Without serial" },
  { id: 6,  idAuction: null, country: "Costa Rica", denom: "20 000 Colones",    year: 2020, grade: "UNC", price: 63,    views: 31,  tag: "Polymer",    hue: 130, note: "New polymer" },
  { id: 7,  idAuction: null, country: "Cook Is.",   denom: "10 Dollars",        year: 1987, grade: "UNC", price: 47,    views: 172, tag: "Low serial", hue: 190, note: "Serial 000368" },
  { id: 8,  idAuction: null, country: "Biafra",     denom: "5 Pounds",          year: 1969, grade: "VG",  price: 11.5,  views: 40,  tag: "Vintage",    hue: 35,  note: "Civil-war issue" },
  { id: 9,  idAuction: null, country: "Bhutan",     denom: "1 000 Ngultrum",    year: 2008, grade: "UNC", price: 37,    views: 28,  tag: "—",          hue: 280, note: "" },
  { id: 10, idAuction: null, country: "Bolivia",    denom: "10 000 Bolivianos", year: 1945, grade: "VF",  price: 24,    views: 27,  tag: "Vintage",    hue: 50,  note: "" },
  { id: 11, idAuction: null, country: "Comoros",    denom: "500 Francs",        year: 2021, grade: "UNC", price: 5,     views: 70,  tag: "Hybrid",     hue: 170, note: "Newly issued" },
  { id: 12, idAuction: null, country: "Bosnia",     denom: "100 KM",            year: 1998, grade: "UNC", price: 78,    views: 15,  tag: "Specimen",   hue: 320, note: "Perforated specimen" },
];

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
  createdAt?: string;
  updatedAt?: string;
}

export const ARTICLES: Article[] = [
  { id: "a1", cat: "Guida",      read: "6 min", hue: 320, featured: true,  slug: "specimen-saggio-prova-differenze",          title: "Specimen, Saggio e Prova: come distinguerli",                     excerpt: "Perforazioni, sovrastampe e numerazione zero — i segni che separano un esemplare di prova da una banconota circolante.", meta: "Differenze tra specimen, saggio e prova di stampa nelle banconote: perforazioni, sovrastampe e numerazione zero spiegate con esempi.", kw: ["specimen","saggio","prova di stampa"], body: "Il termine **specimen** identifica esemplari distribuiti alle banche centrali e ai musei come campioni ufficiali, non per la circolazione. Sono tipicamente perforati o sovrastampati con la parola SPECIMEN.\n\nIl **saggio** è un esemplare di prova prodotto prima dell'emissione definitiva, spesso con differenze tecniche dalla versione finale.\n\nLa **prova di stampa** è invece un foglio prodotto durante il processo di controllo qualità, raramente distribuito al di fuori degli archivi." },
  { id: "a2", cat: "Storia",     read: "9 min", hue: 24,  featured: false, slug: "iperinflazione-zimbabwe-weimar-jugoslavia",  title: "Iperinflazione a confronto: Zimbabwe, Weimar e Jugoslavia",       excerpt: "Tre episodi, miliardi di zeri. Cosa raccontano le banconote a più alta denominazione mai stampate.", meta: "Le banconote a più alta denominazione della storia: cosa raccontano le iperinflazioni di Zimbabwe, Repubblica di Weimar e Jugoslavia.", kw: ["iperinflazione","Zimbabwe","Weimar"], body: "La Germania di Weimar nel 1923, la Jugoslavia nel 1994, lo Zimbabwe nel 2008: tre episodi che hanno prodotto alcune delle banconote più straordinarie della storia della numismatica.\n\nLo **Zimbabwe** ha emesso nel 2008 la banconota da 100 miliardi di dollari — ancora insufficiente per acquistare un uovo. Il collasso monetario fu causato da politiche di redistribuzione agraria e iperemissione monetaria.\n\nIl **Reichsmark di Weimar** raggiunse il picco di 4,2 miliardi di marchi per un dollaro nel novembre 1923, prima della stabilizzazione tramite il Rentenmark." },
  { id: "a3", cat: "Tecnica",    read: "7 min", hue: 150, featured: false, slug: "sovrastampe-uncivpol-sarajevo-1993",          title: "Le sovrastampe di guerra UNCIVPOL di Sarajevo",                   excerpt: "La serie bosniaca del 1993, una delle più ricercate dai collezionisti di sovrastampe.", meta: "La serie bosniaca del 1993 con sovrastampe UNCIVPOL: storia, varianti e valore per i collezionisti.", kw: ["Bosnia","sovrastampa","1993"], body: "Le banconote bosniache del 1993 con sovrastampa UNCIVPOL sono tra le più ricercate nel mercato della numismatica di guerra.\n\nDurante il conflitto nei Balcani, alcune emissioni vennero ufficialmente contrassegnate per uso interno all'UNPROFOR. Le varianti più rare mostrano la sovrastampa applicata con inchiostro rosso su esemplari precedenti alla guerra." },
  { id: "a4", cat: "Condizioni", read: "5 min", hue: 210, featured: false, slug: "grading-banconote-unc-aunc-vf",               title: "UNC, aUNC, VF: leggere la conservazione di una banconota",       excerpt: "Una mappa pratica della scala di grading, con esempi ad alta risoluzione.", meta: "Guida al grading delle banconote: cosa significano UNC, aUNC, VF e come valutare la conservazione con esempi ad alta risoluzione.", kw: ["grading","UNC","conservazione"], body: "La scala di conservazione delle banconote segue standard internazionali IBNS:\n\n**UNC (Uncirculated)**: mai circolata, senza pieghe, piena lucentezza originale.\n\n**aUNC (About Uncirculated)**: tracce minime di maneggiamento, pieghe leggere agli angoli.\n\n**VF (Very Fine)**: circolata moderatamente, pieghe visibili ma carta ancora rigida.\n\n**F (Fine)**: circolazione evidente, multiple pieghe, carta morbida." },
  { id: "a5", cat: "Paesi",      read: "8 min", hue: 280, featured: false, slug: "banconote-bhutan-ngultrum",                   title: "Banconote del Bhutan: il regno che stampa l'Himalaya",            excerpt: "Dzong, draghi e vette: la carta moneta di uno dei paesi più isolati del mondo.", meta: "Storia e iconografia delle banconote del Bhutan in Ngultrum: dzong, draghi e montagne sulla carta moneta himalayana.", kw: ["Bhutan","Ngultrum","Asia"], body: "Il Bhutan emette banconote in Ngultrum dal 1974. Le emissioni sono caratterizzate da iconografia fortemente legata alla cultura e alla geografia del regno himalayano.\n\nI **dzong** — fortezze-monastero che fungono da centri amministrativi — compaiono frequentemente nelle raffigurazioni. Il drago tuonante **Druk**, simbolo nazionale, è presente su quasi tutte le serie." },
];

export function eur(n: number) {
  return "€ " + n.toFixed(2).replace(".", ",");
}
