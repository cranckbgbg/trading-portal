#!/bin/bash

# Auto-push script for trading-portal
# Checks every 30 seconds for changes and pushes to GitHub

REPO_DIR="/Users/admin/Documents/Codex/2026-06-01/build-a-professional-trading-education-and"

echo "🚀 Auto-push started. Watching for changes every 30 seconds..."
echo "   Press Ctrl+C to stop."
echo ""

cd "$REPO_DIR"

while true; do
  # Check if there are any uncommitted changes
  if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M")
    echo "📦 Changes detected at $TIMESTAMP — pushing..."
    git add .
    git commit -m "auto update: $TIMESTAMP"
    git push
    echo "✅ Pushed successfully!"
    echo ""
  fi
  sleep 30
done
