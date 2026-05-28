#!/usr/bin/env node
/**
 * Identifies duplicate / near-duplicate deals across the deals JSON.
 * Considers each deal pair when:
 *   - Provider name shares a strong root token (e.g. "Google" vs "Google Ads"
 *     vs "Google Cloud") OR titles share a strong root token, AND
 *   - Title similarity OR benefit similarity OR description similarity
 *     crosses a threshold.
 *
 * Reports candidate groups with a recommended slug to keep (richest
 * content) and slugs to remove.
 *
 * Run: node scripts/find-duplicate-deals.js
 */
const fs = require('fs')
const path = require('path')

const DEALS_PATH = path.join(__dirname, '..', 'public', 'data', 'all-deals.json')

const STOP = new Set([
  'for','the','and','of','in','to','a','an','with','your','startup','startups',
  'free','off','up','plan','plans','program','programs','credits','credit',
  'discount','discounts','offer','offers','bonus','bonuses','year','years',
  'month','months','first','new','platform','platforms','software','tool','tools',
  'edition','version','tier','tiered','suite','access','plus','pro','basic',
  'standard','premium','startup','startups','customer','customers','business',
  'businesses','founder','founders','enterprise','company','companies','solution',
  'solutions','team','teams','professional','startup-program','small','medium',
  'use','using','users','app','apps','website','websites','service','services',
  'apply','apply-now','sign','signup','launch','launching','launched','available',
])

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const tokens = (s, removeStop = true) => {
  const t = norm(s).split(' ').filter((x) => x.length >= 3)
  return new Set(removeStop ? t.filter((x) => !STOP.has(x)) : t)
}

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0
  let inter = 0
  for (const t of a) if (b.has(t)) inter++
  return inter / (a.size + b.size - inter)
}

// Single dominant token from provider/title (e.g. "Google for Startups Cloud" → "google")
const rootToken = (s) => {
  const all = norm(s).split(' ').filter((x) => x.length >= 3 && !STOP.has(x))
  return all[0] || norm(s).split(' ')[0] || ''
}

const benefitText = (d) => norm((d.benefits || []).join(' | '))
const fullText = (d) =>
  norm(
    [
      d.title,
      d.provider,
      d.shortDescription,
      d.description,
      d.detailedDescription,
      (d.benefits || []).join(' '),
      (d.tags || []).join(' '),
    ].join(' ')
  )

const score = (d) =>
  (d.detailedDescription?.length || 0) +
  (d.description?.length || 0) +
  (d.benefits?.length || 0) * 50 +
  (d.faqs?.length || 0) * 25 +
  (d.featured ? 10000 : 0) +
  (d.recommended ? 5000 : 0)

;(async () => {
  const deals = JSON.parse(fs.readFileSync(DEALS_PATH, 'utf8'))
  console.log(`Loaded ${deals.length} deals.\n`)

  // Pre-compute features for every deal
  const enriched = deals.map((d) => ({
    d,
    rootProvider: rootToken(d.provider),
    rootTitle: rootToken(d.title),
    titleTokens: tokens(d.title),
    benefitTokens: tokens(benefitText(d)),
    fullTokens: tokens(fullText(d)),
  }))

  // Group by shared root token (provider OR title) for cheap candidate generation
  const byRoot = new Map()
  for (const e of enriched) {
    for (const root of new Set([e.rootProvider, e.rootTitle].filter(Boolean))) {
      if (root.length < 3) continue
      if (!byRoot.has(root)) byRoot.set(root, [])
      byRoot.get(root).push(e)
    }
  }

  // For each candidate group, cluster pairwise
  const seenPairs = new Set()
  const dupGroups = []
  for (const [root, group] of byRoot) {
    if (group.length < 2) continue
    if (group.length > 30) continue // avoid noise from very common roots
    for (let i = 0; i < group.length; i++) {
      const a = group[i]
      const cluster = [a]
      for (let j = i + 1; j < group.length; j++) {
        const b = group[j]
        const pairKey = a.d.slug < b.d.slug ? `${a.d.slug}|${b.d.slug}` : `${b.d.slug}|${a.d.slug}`
        if (seenPairs.has(pairKey)) continue
        const titleSim = jaccard(a.titleTokens, b.titleTokens)
        const benefitSim = jaccard(a.benefitTokens, b.benefitTokens)
        const fullSim = jaccard(a.fullTokens, b.fullTokens)
        const sameProvider = a.rootProvider === b.rootProvider
        const sameRootTitle = a.rootTitle === b.rootTitle
        const samePrimary = sameProvider || sameRootTitle
        const isDup =
          (samePrimary && titleSim >= 0.5) ||
          (samePrimary && benefitSim >= 0.55) ||
          (samePrimary && fullSim >= 0.4) ||
          (titleSim >= 0.7) ||
          (benefitSim >= 0.7 && titleSim >= 0.25) ||
          (fullSim >= 0.55 && titleSim >= 0.3)
        if (isDup) {
          cluster.push(b)
          seenPairs.add(pairKey)
        }
      }
      if (cluster.length >= 2) {
        // De-dup cluster against already-recorded groups
        const cSlugs = new Set(cluster.map((c) => c.d.slug))
        const merged = dupGroups.find((g) =>
          g.some((x) => cSlugs.has(x.d.slug))
        )
        if (merged) {
          for (const c of cluster) {
            if (!merged.some((m) => m.d.slug === c.d.slug)) merged.push(c)
          }
        } else {
          dupGroups.push(cluster)
        }
      }
    }
  }

  if (!dupGroups.length) {
    console.log('No duplicate groups found.')
    return
  }

  // Sort each group: richest first (= keep)
  for (const g of dupGroups) g.sort((a, b) => score(b.d) - score(a.d))

  // Sort groups by provider for readability
  dupGroups.sort((a, b) => (a[0].d.provider || '').localeCompare(b[0].d.provider || ''))

  console.log(`Found ${dupGroups.length} duplicate group(s):\n`)
  let removeCount = 0
  for (const g of dupGroups) {
    console.log(`Provider root: "${g[0].rootProvider}"  ·  Title root: "${g[0].rootTitle}"`)
    console.log(`  KEEP    : ${g[0].d.slug}`)
    console.log(`            "${g[0].d.title}" · ${g[0].d.provider} · ${g[0].d.category} · ${(g[0].d.benefits||[]).length} benefits · score ${score(g[0].d)}`)
    console.log(`            URL: ${g[0].d.applicationUrl}`)
    for (let k = 1; k < g.length; k++) {
      console.log(`  REMOVE  : ${g[k].d.slug}`)
      console.log(`            "${g[k].d.title}" · ${g[k].d.provider} · ${g[k].d.category} · ${(g[k].d.benefits||[]).length} benefits · score ${score(g[k].d)}`)
      console.log(`            URL: ${g[k].d.applicationUrl}`)
      removeCount++
    }
    console.log('')
  }
  console.log(`Total slugs to remove: ${removeCount}`)
})()
