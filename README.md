# MM·Money

Static site for [mmmoneybanknotes.com](https://mmmoneybanknotes.com): a banknote catalogue, news on new issues, and collector articles. Notes are sold on [Delcampe](https://www.delcampe.net/it/collezionismo/store/MM-Money).

The site is a Next.js static export (`output: export`, trailing slashes). Production deploys from the `main` branch to GitHub Pages with [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), behind Cloudflare. There is no `basePath`.

## Develop

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The export is written to `out/`.

## Content

- `content/catalog.json` — catalogue listings
- `content/articles.json` — articles
- `content/emissions.json` — banknote news and `/emissions/` pages
- `public/emissions/` — local photos for news and the home page

`merge_results.py` and `tools/qc_merge.py` read `progress.json` and `review_state.json`. Those files are the research pipeline’s state. They are not imported by the site build, so they stay in the repo. `banknotes_research.json` is scratch data with no readers; it is gitignored.

## Shop and analytics

`/shop/` is the English landing page for the Instagram bio. `/it/shop/` is the Italian version. The eBay link is off until `promoteEbay` in `src/lib/stores.ts` is set to `true`.

Cloudflare Web Analytics is a cookieless beacon. It is omitted unless `NEXT_PUBLIC_CF_BEACON_TOKEN` is set when the site is built. The GitHub Actions workflow reads the Actions variable of that name, or a secret with the same name. In the Cloudflare dashboard: Analytics & logs → Web Analytics → the site → copy the token from the JavaScript snippet (`{"token":"..."}`). Do not also turn on Cloudflare’s automatic injection, or visits are counted twice. The token is public in the page source. Changing it requires a new build.
