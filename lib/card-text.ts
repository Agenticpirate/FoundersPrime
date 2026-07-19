/**
 * Shared helpers for deal / student benefit cards.
 * Keep list cards scannable — full copy lives on the detail page.
 */

/** Prefer a short brand product title for the card header. */
export function cardTitle(title: string, maxLen = 40): string {
  let t = (title || '').trim()
  if (!t) return 'Deal'

  // Drop parenthetical noise like "($20/mo value)" or "(ShipAccel)"
  t = t.replace(/\s*\([^)]*\$[^)]*\)/g, '').trim()
  t = t.replace(/\s*\(\d+\s*\/\s*mo[^)]*\)/gi, '').trim()

  // Split on " - " / en-dash / em-dash — keep the product / brand name
  const parts = t.split(/\s+[–—-]\s+/)
  if (parts.length > 1) {
    const head = parts[0].trim()
    if (head.length >= 3) {
      t = head
    }
  }

  // "Save up to 40% off annual plans" style — leave as-is if short enough
  t = t.replace(/\s{2,}/g, ' ').trim()

  if (t.length <= maxLen) return t
  const cut = t.slice(0, maxLen - 1)
  const sp = cut.lastIndexOf(' ')
  return (sp > 10 ? cut.slice(0, sp) : cut).trim() + '…'
}

/** Short value chip for mobile/desktop cards. */
export function cardValueLabel(value: string, maxLen = 18): string {
  let v = (value || '').trim()
  if (!v || /^n\/?a$/i.test(v)) return 'Student deal'
  if (/^free(\s+access)?$/i.test(v) || /^free tier/i.test(v)) return 'Free access'
  if (/variable/i.test(v)) return 'Variable'

  // "1 year Pro free ($20/mo value)" → "1 year free"
  if (/\b1\s*year\b/i.test(v) && /free/i.test(v)) return '1 year free'
  if (/\b12\s*months?\b/i.test(v) && /free/i.test(v)) return '12 mo free'

  // Prefer a clean money token when the string is noisy
  const money = v.match(/\$[\d,]+(?:\+)?(?:\/(?:yr|mo|year|month))?/i)
  if (money && v.length > maxLen) {
    const m = money[0]
    if (/credit/i.test(v)) return `${m} credit`
    return m
  }

  // Strip concatenated words like "~$300Student..."
  v = v.replace(/([a-z])([A-Z])/g, '$1 $2')
  v = v.replace(/\s{2,}/g, ' ').trim()

  if (v.length <= maxLen) return v
  const cut = v.slice(0, maxLen - 1)
  const sp = cut.lastIndexOf(' ')
  return (sp > 6 ? cut.slice(0, sp) : cut).trim() + '…'
}

/** One-line card blurb — detail page has the rest. */
export function cardDescription(text: string, maxLen = 90): string {
  let d = (text || '').trim().replace(/\s+/g, ' ')
  if (!d) return ''
  // First sentence only when long
  const sentence = d.match(/^[^.!?]+[.!?]/)
  if (sentence && d.length > maxLen && sentence[0].length >= 24 && sentence[0].length <= maxLen + 20) {
    d = sentence[0].trim()
  }
  if (d.length <= maxLen) return d
  const cut = d.slice(0, maxLen - 1)
  const sp = cut.lastIndexOf(' ')
  return (sp > 24 ? cut.slice(0, sp) : cut).trim() + '…'
}

/** Claim URL usable for brand domain (not pack aggregators). */
export function productWebsiteForLogo(
  claimUrl?: string | null,
  fallbackUrl?: string | null
): string | undefined {
  for (const raw of [claimUrl, fallbackUrl]) {
    if (!raw) continue
    try {
      const u = new URL(raw)
      const host = u.hostname.replace(/^www\./i, '').toLowerCase()
      if (
        host === 'education.github.com' ||
        (host.includes('github.com') && /\/pack|\/experiences/i.test(u.pathname + u.hash))
      ) {
        continue
      }
      if (host.includes('unidays') || host.includes('sheerid') || host.includes('studentbeans')) {
        continue
      }
      return raw
    } catch {
      // ignore
    }
  }
  return undefined
}
