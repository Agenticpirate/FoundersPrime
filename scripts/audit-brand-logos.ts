import fs from 'fs'
import path from 'path'
import { accelerators2026 } from '../data/accelerators-2026'
import { incubators2026 } from '../data/incubators-2026'
import { grants2026 } from '../data/grants-2026'
import { getLocalBrandLogoCandidates } from '../lib/brand-icons'
import { cleanDomain, extractDomainFromUrl } from '../lib/logo-utils'

// reimplement usable check
function isUsableLogoUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  const u = url.trim()
  if (!u) return false
  if (u.includes('rocket') || u.includes('placeholder') || u.includes('ui-avatars')) return false
  if (u.includes('logo.clearbit.com')) return false
  if (u.includes('cdn.simpleicons.org/') && u.endsWith('simpleicons.org/')) return false
  return true
}

type Row = {
  kind: string
  name: string
  website?: string
  logo?: string
  title?: string
  category?: string
}

const dealsRaw = JSON.parse(fs.readFileSync('public/data/all-deals.json', 'utf8'))
const dealArr = Array.isArray(dealsRaw) ? dealsRaw : dealsRaw.deals || []

const rows: Row[] = [
  ...dealArr.map((d: any) => ({
    kind: 'deal',
    name: d.provider || d.title,
    website: d.providerWebsite || d.provider_website || '',
    logo: d.logoUrl || d.logo_url || d.brandIcon || '',
    title: d.title,
    category: d.category,
  })),
  ...accelerators2026.map((a) => ({
    kind: 'accelerator',
    name: a.name,
    website: a.website || '',
    logo: a.logo || '',
  })),
  ...incubators2026.map((a) => ({
    kind: 'incubator',
    name: a.name,
    website: a.website || '',
    logo: a.logo || '',
  })),
  ...grants2026.map((a) => ({
    kind: 'grant',
    name: a.name,
    website: a.website || '',
    logo: a.logo || '',
  })),
]

type Brand = {
  name: string
  domain: string
  logo: string
  kinds: Set<string>
  count: number
}

const brandMap = new Map<string, Brand>()

for (const row of rows) {
  const domain =
    cleanDomain(row.website || '') ||
    extractDomainFromUrl(row.logo || '') ||
    ''
  const key = (row.name || '').toLowerCase().trim() || domain
  if (!brandMap.has(key)) {
    brandMap.set(key, {
      name: row.name,
      domain,
      logo: row.logo || '',
      kinds: new Set(),
      count: 0,
    })
  }
  const b = brandMap.get(key)!
  b.kinds.add(row.kind)
  b.count++
  if (domain && (!b.domain || domain.length > b.domain.length)) b.domain = domain
  if (row.logo && isUsableLogoUrl(row.logo) && !b.logo) b.logo = row.logo
}

const localDir = 'public/brand-logos'
const onDisk = new Set(fs.readdirSync(localDir))

const missing: any[] = []
const withLocal: any[] = []

for (const b of brandMap.values()) {
  const candidates = getLocalBrandLogoCandidates(b.name, b.domain)
  const file = candidates[0] ? path.basename(candidates[0]) : null
  const localOk = Boolean(file && onDisk.has(file))
  const entry = {
    name: b.name,
    domain: b.domain,
    kinds: [...b.kinds],
    count: b.count,
    localFile: file,
    hasUsableLogoField: Boolean(b.logo && isUsableLogoUrl(b.logo)),
    logoSample: (b.logo || '').slice(0, 100),
  }
  if (localOk) withLocal.push(entry)
  else missing.push(entry)
}

missing.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
withLocal.sort((a, b) => b.count - a.count)

const summary = {
  totalRows: rows.length,
  uniqueBrands: brandMap.size,
  withLocal: withLocal.length,
  missingLocal: missing.length,
  missingNoDomain: missing.filter((m) => !m.domain).length,
  missingNoDomainNoLogo: missing.filter((m) => !m.domain && !m.hasUsableLogoField).length,
}

console.log(JSON.stringify(summary, null, 2))
console.log('\n=== MISSING LOCAL (all) ===')
for (const [i, e] of missing.entries()) {
  console.log(
    `${String(i + 1).padStart(3)}. [${e.count}x] ${e.name} | ${e.domain || 'NO_DOMAIN'} | ${e.kinds.join('+')} | logoField=${e.hasUsableLogoField}`
  )
}

fs.writeFileSync(
  'scripts/audit-brand-logos-report.json',
  JSON.stringify({ summary, missing, withLocal }, null, 2)
)
console.log('\nWrote scripts/audit-brand-logos-report.json')
