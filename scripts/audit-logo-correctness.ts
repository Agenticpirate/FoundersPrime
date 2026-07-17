import fs from 'fs'
import path from 'path'
import { studentBenefits2026 } from '../data/student-benefits-2026'
import { accelerators2026 } from '../data/accelerators-2026'
import { incubators2026 } from '../data/incubators-2026'
import { grants2026 } from '../data/grants-2026'
import { getLocalBrandLogoCandidates, resolveLocalBrandSlug } from '../lib/brand-icons'
import { getLogoUrlChain, cleanDomain } from '../lib/logo-utils'

function domainOf(url?: string) {
  if (!url) return ''
  try {
    let h = cleanDomain(new URL(url).hostname)
    if (h.includes('youtube')) return 'youtube.com'
    return h
  } catch { return cleanDomain(url) }
}

type Issue = { kind: string; name: string; domain: string; expectedHint?: string; got: string; chain0: string }

const issues: Issue[] = []
const ok: { kind: string; n: number }[] = []

function check(kind: string, name: string, domain: string, mustInclude?: string) {
  const chain = getLogoUrlChain(name, domain || null, null)
  const chain0 = chain[0] || ''
  const slug = resolveLocalBrandSlug(name, domain) || resolveLocalBrandSlug(null, domain)
  const local = getLocalBrandLogoCandidates(null, domain)[0] || getLocalBrandLogoCandidates(name, null)[0]
  const fileOk = local ? fs.existsSync(path.join('public', local.replace(/^\//, ''))) : false

  // Wrong product matches
  if (mustInclude && chain0 && !chain0.toLowerCase().includes(mustInclude) && !chain0.includes('ui-avatars')) {
    issues.push({ kind, name, domain, expectedHint: mustInclude, got: slug || 'none', chain0 })
    return false
  }
  // Local first preferred
  if (domain && fileOk && !chain0.startsWith('/brand-logos/')) {
    issues.push({ kind, name, domain, expectedHint: 'local first', got: slug || 'none', chain0 })
    return false
  }
  // Dangerous wrong locals
  if (domain.includes('youtube') && slug && slug !== 'youtube') {
    issues.push({ kind, name, domain, expectedHint: 'youtube', got: slug, chain0 })
    return false
  }
  if (name.toLowerCase().includes('new york times') && slug === 'new') {
    issues.push({ kind, name, domain, expectedHint: 'nytimes', got: slug, chain0 })
    return false
  }
  return true
}

// Known regression cases
const known = [
  ['student', 'Google', 'youtube.com', 'youtube'],
  ['student', 'YouTube', 'youtube.com', 'youtube'],
  ['student', 'The New York Times', 'nytimes.com', 'nytimes'],
  ['student', 'Figma', 'figma.com', 'figma'],
  ['student', 'Adobe', 'adobe.com', 'adobe'],
  ['student', 'Spotify', 'spotify.com', 'spotify'],
  ['deal', 'Google Cloud', 'cloud.google.com', 'googlecloud'],
  ['deal', 'AWS', 'aws.amazon.com', 'aws'],
]
let knownPass = 0
for (const [k, n, d, hint] of known) {
  if (check(k, n, d, hint)) knownPass++
}

// All student benefits
let studentOk = 0, studentTotal = 0, studentNoLocal = 0
const seen = new Set<string>()
for (const b of studentBenefits2026) {
  const key = b.slug || b.company
  if (seen.has(key)) continue
  seen.add(key)
  studentTotal++
  let domain = domainOf(b.url)
  let name = b.company
  if (/youtube/i.test(`${b.title} ${b.slug}`)) {
    name = 'YouTube'
    domain = 'youtube.com'
  }
  const chain0 = getLogoUrlChain(name, domain, b.logo)[0] || ''
  if (chain0.startsWith('/brand-logos/')) studentOk++
  else studentNoLocal++
  if (domain.includes('youtube') && !chain0.includes('youtube')) {
    issues.push({ kind: 'student', name: b.company, domain, expectedHint: 'youtube', got: chain0, chain0 })
  }
}

// Programs
let progOk = 0, progTotal = 0
for (const rows of [
  accelerators2026.map(a => ({ kind: 'accelerator', name: a.name, domain: domainOf(a.website) })),
  incubators2026.map(a => ({ kind: 'incubator', name: a.name, domain: domainOf(a.website) })),
  grants2026.map(a => ({ kind: 'grant', name: a.name, domain: domainOf(a.website) })),
]) {
  for (const r of rows) {
    progTotal++
    const chain0 = getLogoUrlChain(r.name, r.domain, null)[0] || ''
    if (chain0.startsWith('/brand-logos/')) progOk++
  }
}

// Deals
const deals = JSON.parse(fs.readFileSync('public/data/all-deals.json','utf8'))
const dealArr = Array.isArray(deals) ? deals : deals.deals || []
let dealOk = 0
for (const d of dealArr) {
  const name = (d.provider || '').replace(/^By\s+/i,'')
  if (!name || name.toLowerCase()==='deals') continue
  const domain = domainOf(d.providerWebsite || d.provider_website)
  const chain0 = getLogoUrlChain(name, domain, d.logoUrl)[0] || ''
  if (chain0.startsWith('/brand-logos/')) dealOk++
}

// Simulate YouTube student page exactly
const yt = studentBenefits2026.find(b => b.slug === 'youtube-premium-student')!
const ytName = /youtube/i.test(yt.title) ? 'YouTube' : yt.company
const ytDomain = domainOf(yt.url)
const ytChain = getLogoUrlChain(ytName, ytDomain, yt.logo)

console.log(JSON.stringify({
  youtubePage: {
    company: yt.company,
    title: yt.title,
    resolvedName: ytName,
    domain: ytDomain,
    chain0: ytChain[0],
    correct: ytChain[0]?.includes('youtube'),
  },
  knownCases: { pass: knownPass, total: known.length },
  student: { total: studentTotal, withLocal: studentOk, withoutLocal: studentNoLocal, pct: ((studentOk/studentTotal)*100).toFixed(1)+'%' },
  programs: { total: progTotal, withLocal: progOk, pct: ((progOk/progTotal)*100).toFixed(1)+'%' },
  deals: { total: dealArr.length, withLocal: dealOk },
  issues: issues.slice(0, 20),
  issueCount: issues.length,
  logoFiles: fs.readdirSync('public/brand-logos').length,
}, null, 2))
