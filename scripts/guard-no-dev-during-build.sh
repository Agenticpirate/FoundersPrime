#!/usr/bin/env bash
# Prevents `next build` from overwriting a live `next dev` .next cache
# (that mismatch causes unstyled pages: layout.css 404 on localhost).
set -euo pipefail

if lsof -nP -iTCP:3001 -sTCP:LISTEN >/dev/null 2>&1; then
  # Confirm it's Next, not some other app, when possible
  if pgrep -fl "next dev|next-server|next start" >/dev/null 2>&1; then
    echo ""
    echo "❌ Refusing to run build while a Next.js server is using port 3001."
    echo ""
    echo "   Running build while 'npm run dev' is active corrupts .next and"
    echo "   makes the site load without CSS (blue links / blank layout)."
    echo ""
    echo "   Fix:"
    echo "     1) Stop the dev server (Ctrl+C in that terminal)"
    echo "     2) npm run build"
    echo "     3) npm run dev   # when you want to develop again"
    echo ""
    exit 1
  fi
fi

exit 0
