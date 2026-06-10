#!/usr/bin/env python3
"""QC-check researched emission batches and merge them.

Usage: python3 tools/qc_merge.py batch1.json [batch2.json ...]

Each batch file is a JSON array of {id, body, highlights{reason,design,security},
sources[], confidence}. Checks performed before merging:
  - body must not mention another country present in the dataset (row-shift guard)
  - sources must be https URLs without spaces
  - body >= 200 chars, highlights complete
  - confidence is normalized: 'official' only when a government/central-bank
    domain is among the sources, else 'secondary'
On success merges via merge_results.py and marks the ids as 'fixed' in
review_state.json. Exits non-zero (merging nothing) if any check fails.
"""
import json, re, sys
from datetime import datetime, timezone
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE))
from merge_results import merge, load_json, save_json

GOV_PAT = re.compile(
    r'https://[^/]*(\.gov(\.|/)|\.gob\.|\.gouv\.|gov\.cn|rbi\.org\.in|cnb\.cz|centralbank\.ae'
    r'|bb\.org\.bd|rbz\.co\.zw|bot\.or\.th|bsp\.gov\.ph|bi\.go\.id|bcv\.org\.ve|bct\.gov\.tn'
    r'|cbe\.org\.eg|banxico\.org\.mx|mma\.gov\.mv|nbt\.tj|cbpmr\.net|banguat\.gob\.gt'
    r'|cbj\.gov\.jo|sama\.gov\.sa|mongolbank\.mn)')

ALIASES = {
    'China — Peoples Republic': 'China', 'Czechia': 'Czech',
    'United Arab Emirates': 'United Arab Emirates',
}
EXTRA_FOREIGN = ['Tanzania', 'WAEMU', 'Transnistria', 'Jamaica', 'Rwanda', 'Syria',
                 'Timor', 'Riksbank', 'Saudi', 'Sudan']


def main(paths):
    emissions = load_json(BASE / 'content' / 'emissions.json')
    em = {e['id']: e for e in emissions}
    countries = sorted({ALIASES.get(e['country'], e['country']) for e in emissions})

    results, errors = [], []
    for path in paths:
        for r in json.load(open(path)):
            rid = r.get('id')
            if rid not in em:
                errors.append(f'{rid}: unknown id'); continue
            own = ALIASES.get(em[rid]['country'], em[rid]['country'])
            text = r['body'] + ' ' + ' '.join(r['highlights'].values())
            foreign = [c for c in countries + EXTRA_FOREIGN
                       if c != own and c not in own and own not in c
                       and re.search(r'\b' + re.escape(c), text)]
            if foreign: errors.append(f'{rid}: mentions {foreign}')
            if not r.get('sources') or not all(
                    s.startswith('https://') and ' ' not in s for s in r['sources']):
                errors.append(f'{rid}: bad sources {r.get("sources")}')
            if len(r['body']) < 200: errors.append(f'{rid}: body too short')
            if not all(r['highlights'].get(k) for k in ('reason', 'design', 'security')):
                errors.append(f'{rid}: incomplete highlights')
            r['confidence'] = 'official' if any(GOV_PAT.match(s) for s in r['sources']) else 'secondary'
            results.append({k: r[k] for k in ('id', 'body', 'highlights', 'sources', 'confidence')})

    if errors:
        print('QC FAIL:')
        for e in errors: print(' ', e)
        sys.exit(1)
    print(f'QC PASS ({len(results)} items)')

    updated = merge(results)
    print('merged:', len(updated))

    rs = load_json(BASE / 'review_state.json')
    ts = datetime.now(timezone.utc).isoformat()
    done = {r['id'] for r in results}
    for r in rs:
        if r['id'] in done:
            r['status'] = 'fixed'; r['ts'] = ts
    save_json(BASE / 'review_state.json', rs)
    print('review_state fixed total:', sum(1 for r in rs if r['status'] == 'fixed'))


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    main(sys.argv[1:])
