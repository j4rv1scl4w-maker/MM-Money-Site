import ShopLanding from '@/components/ShopLanding';
import { pageMeta } from '@/lib/seo';
import { pageUrl } from '@/lib/site';

const languages = {
  en: pageUrl('/shop'),
  it: pageUrl('/it/shop'),
  'x-default': pageUrl('/shop'),
};

export const metadata = pageMeta({
  title: 'Shop the collection — MM·Money',
  description: 'Banknotes from MM·Money, shipped from Italy. More than 4,000 notes on Delcampe, with 9,600+ ratings and 100% positive feedback.',
  path: '/shop',
  locale: 'en_GB',
  languages,
});

export default function ShopPage() {
  return <ShopLanding locale="en" />;
}
