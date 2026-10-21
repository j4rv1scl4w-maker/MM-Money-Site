import Image from 'next/image';
import Link from 'next/link';
import { catalogStats } from '@/lib/site';
import { delcampeStore, delcampeTrust, ebayStoreUrl, promoteEbay } from '@/lib/stores';
import styles from '@/app/shop/shop.module.css';

const NOTES = [
  {
    src: '/emissions/banknote-ws-dated-2025-first-11/03-fiji-100-cents-jan-2025.jpg',
    alt: { en: 'Fiji 100 cents banknote, kingfisher', it: 'Banconota da 100 centesimi delle Fiji, martin pescatore' },
  },
  {
    src: '/emissions/banknote-ws-dated-2025-first-11/10-mexico-1-000-pesos-mar-2025.jpg',
    alt: { en: 'Mexico 1,000 pesos banknote', it: 'Banconota da 1.000 pesos del Messico' },
  },
  {
    src: '/emissions/banknote-ws-uscite-2026-banknotes/fronts/ZIMW0115o.jpg',
    alt: { en: 'Zimbabwe ZiG banknote with rhinoceros', it: 'Banconota ZiG dello Zimbabwe con rinoceronte' },
  },
  {
    src: '/emissions/banknote-ws-uscite-2026-banknotes/fronts/GTMW0130o.jpg',
    alt: { en: 'Guatemala 100 quetzales banknote', it: 'Banconota da 100 quetzales del Guatemala' },
  },
  {
    src: '/emissions/banknote-ws-dated-2025-first-11/02-poland-20-zlotych-jan-2025.jpg',
    alt: { en: 'Poland 20 zlotych banknote', it: 'Banconota da 20 zloty della Polonia' },
  },
] as const;

const COPY = {
  en: {
    eyebrow: 'Collector shop · since 2009',
    title: 'Banknotes, chosen one by one.',
    lede: 'Rarities, overprints and specimens, photographed and listed on Delcampe. We ship from Italy.',
    notes: 'notes in the shop',
    ratings: 'Delcampe ratings',
    positive: 'positive feedback',
    shipping: 'ships from Italy',
    cta: 'Shop the collection on Delcampe',
    note: 'Buyer protection on Delcampe. Tracked shipping from Italy to the EU and worldwide.',
    ebay: 'Also on eBay',
  },
  it: {
    eyebrow: 'Negozio da collezione · dal 2009',
    title: 'Banconote, scelte una a una.',
    lede: 'Rarità, sovrastampe ed esemplari, fotografati e in vendita su Delcampe. Spediamo dall’Italia.',
    notes: 'banconote in negozio',
    ratings: 'valutazioni su Delcampe',
    positive: 'feedback positivo',
    shipping: 'spedizione dall’Italia',
    cta: 'Apri il negozio su Delcampe',
    note: 'Pagamento protetto su Delcampe. Spedizione tracciata dall’Italia verso l’Europa e il resto del mondo.',
    ebay: 'Anche su eBay',
  },
} as const;

export default async function ShopLanding({ locale }: { locale: 'en' | 'it' }) {
  const { pieces } = await catalogStats();
  const copy = COPY[locale];
  const notes = pieces.toLocaleString(locale === 'it' ? 'it-IT' : 'en-GB');
  const [hero, ...rest] = NOTES;
  const store = delcampeStore[locale];

  return (
    <div className={styles.page} lang={locale}>
      {locale === 'it' && (
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='it'" }} />
      )}
      <nav className={styles.lang} aria-label={locale === 'it' ? 'Lingua' : 'Language'}>
        <Link href="/shop" hrefLang="en" aria-current={locale === 'en' ? 'page' : undefined}>EN</Link>
        <Link href="/it/shop" hrefLang="it" aria-current={locale === 'it' ? 'page' : undefined}>IT</Link>
      </nav>

      <div className={styles.layout}>
        <div className={styles.collage}>
          <div className={styles.heroFrame}>
            <Image src={hero.src} alt={hero.alt[locale]} fill priority sizes="(max-width: 900px) 100vw, 46vw" unoptimized />
          </div>
          <div className={styles.thumbs}>
            {rest.slice(0, 2).map((note) => (
              <div className={styles.thumb} key={note.src}>
                <Image src={note.src} alt={note.alt[locale]} fill sizes="20vw" unoptimized />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={`serif ${styles.title}`}>{copy.title}</h1>
          <p className={styles.lede}>{copy.lede}</p>

          <div className={styles.trust}>
            <div>
              <strong>{notes}</strong>
              <span>{copy.notes}</span>
            </div>
            <div>
              <strong>{locale === 'it' ? delcampeTrust.ratingsIt : delcampeTrust.ratings}</strong>
              <span>{copy.ratings}</span>
            </div>
            <div>
              <strong>{delcampeTrust.positive}</strong>
              <span>{copy.positive}</span>
            </div>
            <div>
              <strong>{locale === 'it' ? 'Italia' : 'Italy'}</strong>
              <span>{copy.shipping}</span>
            </div>
          </div>

          <a className={styles.cta} href={store} target="_blank" rel="noopener noreferrer">
            {copy.cta}
          </a>
          <p className={styles.note}>{copy.note}</p>
          {promoteEbay && (
            <a className={styles.ebay} href={ebayStoreUrl} target="_blank" rel="noopener noreferrer">
              {copy.ebay}
            </a>
          )}
        </div>
      </div>

      <div className={styles.more}>
        {rest.map((note) => (
          <div className={styles.thumb} key={note.src}>
            <Image src={note.src} alt={note.alt[locale]} fill sizes="50vw" unoptimized />
          </div>
        ))}
      </div>
    </div>
  );
}
