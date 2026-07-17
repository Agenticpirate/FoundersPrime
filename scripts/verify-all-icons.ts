import fs from 'fs'
import path from 'path'
import { accelerators2026 } from '../data/accelerators-2026'
import { incubators2026 } from '../data/incubators-2026'
import { grants2026 } from '../data/grants-2026'
import { studentBenefits2026 } from '../data/student-benefits-2026'
import { flashDeals } from '../data/flash-deals'
import { popularDeals } from '../data/popular-deals'
import { getLocalBrandLogoCandidates, resolveLocalBrandSlug } from '../lib/brand-icons'
import { getLogoUrlChain, cleanDomain } from '../lib/logo-utils'

function domainOf(website?: string | null) {
  if (!website) return ''
  try { return cleanDomain(new URL(website).hostname) } catch { return cleanDomain(website) }
}

function check(name: string, domain?: string | null, logo?: string | null) {
  const local = getLocalBrandLogoCandidates(name, domain)
  const file = local[0]
  const exists = file ? fs.existsSync(path.join(process.cwd(), 'public', file.replace(/^\//, ''))) : false
  const chain = getLogoUrlChain(name, domain, logo, { preferLocal: true, theme: 'light' })
  const firstLocal = chain[0]?.startsWith('/brand-logos/')
  return { name, domain: domain || '', local: exists, firstIsLocal: Boolean(firstLocal), chain0: chain[0]?.slice(0, 90), slug: resolveLocalBrandSlug(name, domain) }
}

const deals = JSON.parse(fs.readFileSync('public/data/all-deals.json', 'utf8'))
const dealArr = Array.isArray(deals) ? deals : deals.deals || []

const buckets: Record<string, ReturnType<typeof check>[]> = {
  deals: [],
  accelerators: [],
  incubators: [],
  grants: [],
  student_benefits: [],
  flash_deals: [],
  popular_deals: [],
}

for (const d of dealArr) {
  const name = (d.provider || d.title || '').replace(/^By\s+/i, '')
  if (!name || name.toLowerCase() === 'deals') continue
  buckets.deals.push(check(name, domainOf(d.providerWebsite || d.provider_website), d.logoUrl || d.brandIcon))
}
for (const a of accelerators2026) buckets.accelerators.push(check(a.name, domainOf(a.website), a.logo))
for (const a of incubators2026) buckets.incubators.push(check(a.name, domainOf(a.website), a.logo))
for (const a of grants2026) buckets.grants.push(check(a.name, domainOf(a.website), a.logo))

const seenStudent = new Set<string>()
for (const b of studentBenefits2026) {
  const key = (b.company || '').toLowerCase()
  if (!key || seenStudent.has(key)) continue
  seenStudent.add(key)
  let domain = ''
  try { if (b.url) domain = cleanDomain(new URL(b.url).hostname) } catch {}
  buckets.student_benefits.push(check(b.company, domain, (b as any).logo))
}

for (const d of flashDeals as any[]) {
  const name = d.provider || d.brand || d.name || d.title
  if (!name) continue
  buckets.flash_deals.push(check(name, domainOf(d.website || d.providerWebsite || d.url), d.logo || d.logoUrl))
}
for (const d of popularDeals as any[]) {
  const name = d.provider || d.name || d.title
  if (!name) continue
  buckets.popular_deals.push(check(name, domainOf(d.domain || d.website), d.logo))
}

const summary: any = {}
let total = 0, localOk = 0, noLocal = 0
const missingByBucket: any = {}

for (const [k, rows] of Object.entries(buckets)) {
  const missing = rows.filter(r => !r.local)
  const withLocal = rows.filter(r => r.local)
  summary[k] = {
    total: rows.length,
    withLocalFile: withLocal.length,
    missingLocal: missing.length,
    pctLocal: rows.length ? ((withLocal.length / rows.length) * 100).toFixed(1) + '%' : 'n/a',
    firstChainIsLocal: rows.filter(r => r.firstIsLocal).length,
  }
  total += rows.length
  localOk += withLocal.length
  noLocal += missing.length
  if (missing.length) missingByBucket[k] = missing.slice(0, 20).map(m => ({ name: m.name, domain: m.domain, chain0: m.chain0 }))
}

const clearbitHits: string[] = []
for (const f of [
  'components/deals/ProgramsGrid.tsx',
  'components/deals/DealCard.tsx',
  'components/deals/GrantsGrid.tsx',
  'components/deals/StudentBenefitCard.tsx',
  'components/deals/DealLogo.tsx',
  'components/deals/DealsBrandMarquee.tsx',
  'components/deals/ProgramsBrandMarquee.tsx',
  'components/deals/StudentBrandMarquee.tsx',
  'components/PopularDealsGrid.tsx',
  'components/deals/StudentBenefitsGrid.tsx',
]) {
  if (!fs.existsSync(f)) continue
  const t = fs.readFileSync(f, 'utf8')
  if (t.includes('clearbit') || t.includes('logo.clearbit')) clearbitHits.push(f)
}

console.log(JSON.stringify({
  overall: { total, withLocalFile: localOk, missingLocal: noLocal, pct: total ? ((localOk/total)*100).toFixed(2)+'%' : 'n/a' },
  byCategory: summary,
  missingSamples: missingByBucket,
  clearbitStillInMainUI: clearbitHits,
  brandLogoFilesOnDisk: fs.readdirSync('public/brand-logos').length,
}, null, 2))
