scripts/update_feature_ledger.sh#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="docs/FEATURE_LOG.md"
CURSOR_HASH=""

if [[ -f "$LOG_FILE" ]]; then
  CURSOR_HASH=$(grep -Eo '[a-f0-9]{7,40}' "$LOG_FILE" | head -n 1 || true)
fi

if [[ -n "${CURSOR_HASH}" ]]; then
  RANGE="${CURSOR_HASH}..HEAD"
  git log --no-merges --pretty=format:"%H|%ad|%an|%s" --date=short "$RANGE" > /tmp/ledger_commits.txt
else
  git log --no-merges -n 50 --pretty=format:"%H|%ad|%an|%s" --date=short > /tmp/ledger_commits.txt
fi

echo "Collected commits into /tmp/ledger_commits.txt"
echo "Next: ask Claude to summarize these into FEATURE_LOG.md using .claude/skills/feature-ledger.md"