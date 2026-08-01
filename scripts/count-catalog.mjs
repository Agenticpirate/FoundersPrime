#!/usr/bin/env node
/**
 * Recount the catalog and compare against lib/catalog-stats.ts.
 *
 * Marketing copy quotes hard numbers (emails, offer popup), so those numbers
 * need a cheap way to be re-verified after the catalog changes. Run:
 *
 *   node scripts/count-catalog.mjs
 *
 * Exits 1 when a literal in lib/catalog-stats.ts no longer matches the data, so
 * it can be wired into CI later if desired.
 */
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')

/** Count top-level `"slug":` keys, which appear exactly once per record. */
const countSlugs = (file) => (read(file).match(/^\s{2,4}"slug":/gm) || []).length

/** Records explicitly switched off are not published, so they are not counted. */
const countInactive = (file) => (read(file).match(/^\s{2,4}"active":\s*false/gm) || []).length

const deals = JSON.parse(read('public/data/all-deals.json'))
const byCategory = deals.reduce((acc, d) => {
  acc[d.category] = (acc[d.category] || 0) + 1
  return acc
}, {})

const studentTotal = countSlugs('data/student-benefits-2026.ts')
const ideas = JSON.parse(read('data/startup_ideas.json'))

const counted = {
  founderDeals: deals.length,
  saasDeals: byCategory['saas-discounts'] || 0,
  cloudDeals: byCategory['cloud-credits'] || 0,
  adDeals: byCategory['ad-credits'] || 0,
  accelerators: countSlugs('data/accelerators-2026.ts'),
  incubators: countSlugs('data/incubators-2026.ts'),
  grants: countSlugs('data/grants-2026.ts'),
  studentPerks: studentTotal - countInactive('data/student-benefits-2026.ts'),
  flashDeals: (read('data/flash-deals.ts').match(/^\s{2,4}id: '/gm) || []).length,
  ideas: Array.isArray(ideas) ? ideas.length : Object.keys(ideas).length,
}

const declared = Object.fromEntries(
  [...read('lib/catalog-stats.ts').matchAll(/^\s{2}(\w+):\s(\d+),$/gm)].map((m) => [
    m[1],
    Number(m[2]),
  ])
)

let drift = false
for (const [key, value] of Object.entries(counted)) {
  const was = declared[key]
  const ok = was === value
  if (!ok) drift = true
  console.log(`${ok ? 'ok  ' : 'DRIFT'} ${key.padEnd(14)} data=${String(value).padStart(5)} declared=${String(was ?? '—').padStart(5)}`)
}

const programs = counted.accelerators + counted.incubators + counted.grants
console.log(`\nprograms total  ${programs}`)
console.log(`offers total    ${counted.founderDeals + programs + counted.studentPerks}`)

if (drift) {
  console.error('\nlib/catalog-stats.ts is out of date — update the literals above.')
  process.exit(1)
}
