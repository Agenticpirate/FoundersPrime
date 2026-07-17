#!/usr/bin/env node
/**
 * Validates application URLs for all ad-credit category deals.
 * Hits each URL with a HEAD then GET fallback, reports status code,
 * final URL after redirects, and any obvious red flags.
 *
 * Run: node scripts/validate-ad-credit-urls.js
 */

const fs = require('fs')
const path = require('path')

const DEALS_PATH = path.join(__dirname, '..', 'public', 'data', 'all-deals.json')

async function checkUrl(url) {
  const start = Date.now()
  try {
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 12000)
    let res
    try {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: ctrl.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml',
        },
      })
    } finally {
      clearTimeout(timeout)
    }
    return {
      ok: res.ok,
      status: res.status,
      finalUrl: res.url,
      ms: Date.now() - start,
    }
  } catch (err) {
    return {
      ok: false,
      status: 0,
      finalUrl: '',
      error: err.message || String(err),
      ms: Date.now() - start,
    }
  }
}

;(async () => {
  const raw = fs.readFileSync(DEALS_PATH, 'utf8')
  const deals = JSON.parse(raw)
  const adDeals = deals.filter((d) => d.category === 'ad-credits')

  console.log(`Found ${adDeals.length} ad-credit deals. Validating…\n`)

  const results = []
  for (const d of adDeals) {
    const url = d.applicationUrl
    process.stdout.write(`  ${d.slug.padEnd(40)} `)
    if (!url) {
      console.log('❌ NO URL')
      results.push({ slug: d.slug, status: 'no-url', url: '' })
      continue
    }
    const r = await checkUrl(url)
    const flag =
      r.status >= 200 && r.status < 300
        ? '✅'
        : r.status >= 300 && r.status < 400
          ? '↪️'
          : r.status >= 400 && r.status < 500
            ? '⚠️'
            : r.status >= 500
              ? '🔥'
              : '❌'
    const redirected = r.finalUrl && r.finalUrl !== url
    console.log(
      `${flag} ${r.status || 'ERR'} ${r.ms}ms${redirected ? ` → ${r.finalUrl}` : ''}${r.error ? ` (${r.error})` : ''}`
    )
    results.push({
      slug: d.slug,
      provider: d.provider,
      url,
      status: r.status,
      ok: r.ok,
      finalUrl: r.finalUrl,
      redirected,
      error: r.error,
    })
  }

  console.log('\n--- SUMMARY ---')
  const broken = results.filter((r) => !r.ok && r.status !== 405)
  const ok = results.filter((r) => r.ok)
  const redirected = results.filter((r) => r.ok && r.redirected)
  console.log(`✅ ${ok.length} OK  |  ↪️ ${redirected.length} redirected  |  ⚠️ ${broken.length} need attention`)

  if (broken.length) {
    console.log('\n--- ATTENTION NEEDED ---')
    broken.forEach((r) => {
      console.log(`  • ${r.slug} (${r.provider})`)
      console.log(`    ${r.url}`)
      console.log(`    Status: ${r.status}${r.error ? ' · ' + r.error : ''}`)
    })
  }

  if (redirected.length) {
    console.log('\n--- REDIRECTED (review final URLs) ---')
    redirected.forEach((r) => {
      console.log(`  • ${r.slug}`)
      console.log(`    From: ${r.url}`)
      console.log(`    To:   ${r.finalUrl}`)
    })
  }
})()
