/** Delcampe listing photo. Only `large`, `thumb`, and `small` exist; there is no mid-size. */
export function delcampeImgUrl(idAuction: string | number, variant: 'large' | 'thumb' = 'large'): string {
  const s = String(idAuction);
  const parts: string[] = [];
  let i = s.length;
  while (i > 0) {
    parts.unshift(s.slice(Math.max(0, i - 3), i));
    i -= 3;
  }
  parts[0] = parts[0].padStart(3, '0');
  return `https://www.delcampe.net/static/img_${variant}/auction/${parts.join('/')}_001.jpg`;
}
