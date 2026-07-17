import fs from 'fs'
import path from 'path'
import { accelerators2026 } from '../data/accelerators-2026'
import { incubators2026 } from '../data/incubators-2026'
import { grants2026 } from '../data/grants-2026'
import { getLocalBrandLogoCandidates, resolveLocalBrandSlug } from '../lib/brand-icons'
import { cleanDomain } from '../lib/logo-utils'

function domainOf(website?: string) {
  if (!website) return ''
  try { return cleanDomain(new URL(website).hostname) } catch { return cleanDomain(website) }
}

const deals = JSON.parse(fs.readFileSync('public/data/all-deals.json','utf8'))
const dealArr = Array.isArray(deals) ? deals : deals.deals || []

type Row = { kind: string; name: string; domain: string; title?: string }
const rows: Row[] = [
  ...dealArr.map((d: any) => ({
    kind: 'deal',
    name: (d.provider || d.title || '').replace(/^By\s+/i,''),
    domain: domainOf(d.providerWebsite || d.provider_website),
    title: d.title,
  })),
  ...accelerators2026.map(a => ({ kind: 'accelerator', name: a.name, domain: domainOf(a.website) })),
  ...incubators2026.map(a => ({ kind: 'incubator', name: a.name, domain: domainOf(a.website) })),
  ...grants2026.map(a => ({ kind: 'grant', name: a.name, domain: domainOf(a.website) })),
]

const missing: any[] = []
const ok: any[] = []
for (const r of rows) {
  if (!r.name || r.name.toLowerCase() === 'deals') continue
  const candidates = getLocalBrandLogoCandidates(r.name, r.domain)
  const file = candidates[0]
  const exists = file ? fs.existsSync(path.join('public', file.replace(/^\//,''))) : false
  if (!exists) missing.push({ ...r, slug: resolveLocalBrandSlug(r.name, r.domain), candidates })
  else ok.push(r)
}

console.log(JSON.stringify({
  total: rows.length,
  covered: ok.length,
  missing: missing.length,
  coveragePct: ((ok.length / (ok.length + missing.length)) * 100).toFixed(2) + '%',
  missingSamples: missing.slice(0, 30),
}, null, 2))

fs.writeFileSync('scripts/verify-brand-coverage-report.json', JSON.stringify({ missing, covered: ok.length }, null, 2))
