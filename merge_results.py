#!/usr/bin/env python3
"""
Usage: python3 merge_results.py '[{"id":"e1","body":"...","highlights":{...},"sources":[...],"confidence":"official"},...]'
Or pipe: echo '...' | python3 merge_results.py
"""
import json, sys, re
from datetime import datetime, timezone
from pathlib import Path

BASE = Path(__file__).parent
EMISSIONS_FILE = BASE / 'content' / 'emissions.json'
PROGRESS_FILE  = BASE / 'progress.json'

def load_json(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def extract_json_array(text):
    # Try to find a JSON array in the text (in case of markdown code blocks)
    m = re.search(r'```(?:json)?\s*(\[.*?\])\s*```', text, re.DOTALL)
    if m:
        return json.loads(m.group(1))
    # Try bare array
    m = re.search(r'(\[.*\])', text, re.DOTALL)
    if m:
        return json.loads(m.group(1))
    raise ValueError("No JSON array found in input")

def merge(results):
    emissions = load_json(EMISSIONS_FILE)
    progress  = load_json(PROGRESS_FILE)

    em_map = {e['id']: e for e in emissions}
    pr_map = {p['id']: p for p in progress}

    updated = []
    ts = datetime.now(timezone.utc).isoformat()

    for r in results:
        eid = r.get('id')
        if not eid or eid not in em_map:
            print(f"  SKIP unknown id: {eid}")
            continue

        em_map[eid]['body']       = r.get('body', '')
        em_map[eid]['highlights'] = r.get('highlights', {})
        em_map[eid]['sources']    = r.get('sources', [])
        em_map[eid]['confidence'] = r.get('confidence', 'fallback')

        if eid in pr_map:
            pr_map[eid]['status']     = 'done'
            pr_map[eid]['ts']         = ts
            pr_map[eid]['confidence'] = r.get('confidence', 'fallback')
            pr_map[eid]['error']      = None

        updated.append(eid)

    save_json(EMISSIONS_FILE, emissions)
    save_json(PROGRESS_FILE, list(pr_map.values()))

    return updated

if __name__ == '__main__':
    raw = sys.stdin.read() if not sys.stdin.isatty() else sys.argv[1] if len(sys.argv) > 1 else ''
    if not raw.strip():
        print("No input provided", file=sys.stderr)
        sys.exit(1)

    try:
        results = extract_json_array(raw)
    except Exception as e:
        print(f"Parse error: {e}", file=sys.stderr)
        sys.exit(1)

    updated = merge(results)
    print(f"Updated: {', '.join(updated)}")

    # Show progress summary
    progress = load_json(PROGRESS_FILE)
    done    = sum(1 for p in progress if p['status'] == 'done')
    failed  = sum(1 for p in progress if p['status'] == 'failed')
    pending = sum(1 for p in progress if p['status'] == 'pending')
    print(f"Progress: {done} done / {failed} failed / {pending} pending / {len(progress)} total")
