#!/bin/bash

# ─────────────────────────────────────────────────────────────────────────────
# check-use-client.sh
# Finds .tsx files that use React client hooks but are missing 'use client'.
# Run this before committing or after making component changes.
# ─────────────────────────────────────────────────────────────────────────────

HOOKS_PATTERN="useState|useEffect|useRef|useCallback|useMemo|useReducer|useContext|useRouter|usePathname|useSearchParams|useAuth"

echo "🔍 Scanning for components using hooks without 'use client'..."
echo ""

FOUND=0
while IFS= read -r file; do
  if grep -qE "$HOOKS_PATTERN" "$file"; then
    # Check if first non-empty line is 'use client'
    first_directive=$(grep -m1 . "$file" | tr -d "'\"" | tr '[:upper:]' '[:lower:]' | xargs)
    if [ "$first_directive" != "use client" ]; then
      echo "  ❌ MISSING 'use client': $file"
      FOUND=$((FOUND + 1))
    fi
  fi
done < <(find /Users/raviteja/KIRO/FoundersPrime/components \
            /Users/raviteja/KIRO/FoundersPrime/app \
            -name "*.tsx" 2>/dev/null | grep -v node_modules)

if [ $FOUND -eq 0 ]; then
  echo "  ✅ All client components have 'use client'. No issues found."
else
  echo ""
  echo "  ⚠️  Found $FOUND component(s) missing 'use client'. Add it as the very first line."
fi
