import ShopLanding from '@/components/ShopLanding';
import { pageMeta } from '@/lib/seo';
import { pageUrl } from '@/lib/site';

const languages = {
  en: pageUrl('/shop'),
  it: pageUrl('/it/shop'),
  'x-default': pageUrl('/shop'),
};

export const metadata = pageMeta({
  title: 'Il negozio — MM·Money',
  description: 'Banconote di MM·Money, spedite dall’Italia. Oltre 4.000 pezzi su Delcampe, con più di 9.600 valutazioni e feedback positivo al 100%.',
  path: '/it/shop',
  locale: 'it_IT',
  languages,
});

export default function ItalianShopPage() {
  return <ShopLanding locale="it" />;
}
