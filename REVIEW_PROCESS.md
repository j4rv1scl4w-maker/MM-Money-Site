# Emissions description review — resumable process

Goal: every emission in `content/emissions.json` must have a body, highlights and
sources that actually describe **that country's** banknote, with at least one real
URL among the sources. Many entries (confidence `fallback`) have bodies that
describe the wrong country, caused by a row-shift in an earlier bulk merge.

## State files (committed — this is what makes the process stop/resume safe)

- `review_state.json` — one entry per emission id, ordered by year (newest first).
  - `status: pending` — not yet reviewed
  - `status: ok` — reviewed, content is correct, skipped
  - `status: needs_fix` — reviewed, content wrong/generic; `issues` says why
  - `status: fixed` — corrected content merged into `content/emissions.json`
- `progress.json` — per-id merge log kept by `merge_results.py` (status/confidence/ts).

## The loop (per year, newest → oldest: 2026, 2025, 2024, …)

1. Pick the next year with `pending` or `needs_fix` entries in `review_state.json`.
2. **Review** each pending entry: compare `body`/`sources` against `country`,
   `title` and `description`. If correct and sourced → mark `ok`. Otherwise mark
   `needs_fix` with the reason in `issues`.
3. **Fix** each `needs_fix` entry: research the actual note (central bank site,
   numista.com, banknotenews.com, banknoteworld), then write:
   - `body`: 2–4 factual paragraphs about THAT country's note (design, series
     context, security features). Never reuse text from another country.
   - `highlights`: `{ reason, design, security }`
   - `sources`: real URLs (central bank first when available)
   - `confidence`: `official` (central bank source) or `secondary` (catalog only)
4. Merge with: `python3 tools/qc_merge.py <batch.json> [...]` — runs QC first
   (foreign-country mention guard, https-only sources, completeness, confidence
   normalized by source domain), then merges via `merge_results.py` (idempotent
   by id, updates `content/emissions.json` + `progress.json`) and marks the ids
   `fixed` in `review_state.json`. Research can be delegated to parallel Haiku
   subagents that write their JSON batch to a file; QC stays in the main session.
5. **Commit and push after every merged batch** (a batch = one country or a few
   small ones). A killed session loses at most one un-committed batch; on resume,
   re-read `review_state.json` and continue from the first non-`fixed`/non-`ok` id.

## Duplicate pairs found so far

e43/e577 (PNG 100 Kina), e424/e575 (Indonesia 20.000), e547/e581 (UAE 50
Dirhams), e142/e146 (Philippines 500 Piso polymer), e247/e348 (Philippines 50
Piso), e249/e350 (Philippines 100 Piso). Content fixed in both entries; actual
deduplication is a user decision.

## Invariants

- `description` (the short card text) is generally correct — do not overwrite it
  via the merge script (it doesn't touch it).
- Duplicate pairs found so far: e43/e577 (PNG 100 Kina), e424/e575 (Indonesia
  20.000 Rupiah), e547/e581 (UAE 50 Dirhams). Fix content in both; dedup is a
  separate decision for the user.
- The emission detail page renders every `sources` string as a link, so a source
  without a URL becomes a broken link — always provide URLs.
