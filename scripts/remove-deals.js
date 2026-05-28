#!/usr/bin/env node
/**
 * Removes deal entries by slug from both JSON files.
 *
 * Usage:
 *   node scripts/remove-deals.js slug-1 slug-2 slug-3
 *
 * Slugs may also be given as URLs — the trailing path segment is used.
 */
const fs = require('fs')
const path = require('path')

const FILES = [
  path.join(__dirname, '..', 'public', 'data', 'all-deals.json'),
  path.join(__dirname, '..', 'data', 'processed-deals', 'all-deals.json'),
]

function extractSlug(arg) {
  // Accept full URLs, paths, or bare slugs
  const m = String(arg).match(/([^\/?#]+)(?:[?#].*)?$/)
  return m ? m[1] : String(arg)
}

const slugs = process.argv.slice(2).map(extractSlug).filter(Boolean)
if (!slugs.length) {
  console.error('No slugs provided.')
  process.exit(1)
}

const REMOVE = new Set(slugs)
console.log(`Removing ${REMOVE.size} slug(s):`, [...REMOVE].join(', '), '\n')

let totalRemoved = 0
for (const file of FILES) {
  const raw = fs.readFileSync(file, 'utf8')
  const deals = JSON.parse(raw)
  const before = deals.length
  const filtered = deals.filter((d) => !REMOVE.has(d.slug))
  const removed = before - filtered.length
  totalRemoved += removed
  fs.writeFileSync(file, JSON.stringify(filtered, null, 2) + '\n')
  console.log(`${path.relative(process.cwd(), file)}: ${before} → ${filtered.length} (-${removed})`)
}

if (!totalRemoved) {
  console.log('\n⚠️  None of the supplied slugs were found in the JSON files.')
}
