#!/usr/bin/env bash
# Rebuild public/_fonts/GalmuriMono11-ledger.woff2, the dot-matrix "printer" face.
#
# The full GalmuriMono11 (OFL-1.1, https://github.com/quiple/galmuri) is ~490KB.
# The ledger only prints ASCII, a few separators, and the fixed machine-printed
# labels below, so we ship a subset. If you add a new label set in `font-dot`,
# add its Hangul to LEDGER_HANGUL and rerun.
#
# Usage: scripts/subset-dot-font.sh <path/to/GalmuriMono11.woff2>
# Needs: pyftsubset (pip install fonttools brotli)
set -euo pipefail

SRC="${1:?path to GalmuriMono11.woff2 (npm: galmuri)}"
OUT="$(dirname "$0")/../public/_fonts/GalmuriMono11-ledger.woff2"

LEDGER_HANGUL="최근체무기록개월여기까지정리됨제면건자누적이전다음첫조회되지않는입니다처리중오류가발생했습니다없음"

pyftsubset "$SRC" \
  --output-file="$OUT" \
  --flavor=woff2 \
  --unicodes="U+0020-007E,U+00B7,U+2014,U+2026" \
  --text="$LEDGER_HANGUL" \
  --layout-features='*' \
  --no-hinting

ls -l "$OUT"
