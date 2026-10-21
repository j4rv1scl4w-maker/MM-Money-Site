/** Delcampe is the live store. eBay stays hidden until shipping is fixed. */
export const promoteEbay = false;

export const ebayStoreUrl = 'https://www.ebay.com/str/mmmoney';

export const delcampeStore = {
  en: 'https://www.delcampe.net/en_GB/collectables/store/MM-Money',
  it: 'https://www.delcampe.net/it/collezionismo/store/MM-Money',
} as const;

/** Delcampe store figures. Update by hand when the shop’s public stats change. */
export const delcampeTrust = {
  ratings: '9,600+',
  ratingsIt: '9.600+',
  positive: '100%',
} as const;
