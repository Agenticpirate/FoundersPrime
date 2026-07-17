#!/usr/bin/env node
/**
 * Updates logoUrl + brandIcon for ad-credit deals to point at verified
 * brand image URLs. Each URL was tested with a HEAD/GET request and
 * confirmed to return image content.
 *
 * Run: node scripts/update-ad-credit-logos.js
 */
const fs = require('fs')
const path = require('path')

const FILES = [
  path.join(__dirname, '..', 'public', 'data', 'all-deals.json'),
  path.join(__dirname, '..', 'data', 'processed-deals', 'all-deals.json'),
]

// slug → { logoUrl, brandIcon? }
// All URLs verified reachable + serve image content.
const LOGOS = {
  // Was Square favicon (squareup.com), now LeadSquared's own
  'leadsquared-750': {
    logoUrl: 'https://www.leadsquared.com/favicon.ico',
    brandIcon: 'https://www.leadsquared.com/favicon.ico',
  },
  // Was empty
  'search-ads-924': {
    logoUrl: 'https://www.gstatic.com/images/branding/product/2x/ads_48dp.png',
    brandIcon: 'https://www.gstatic.com/images/branding/product/2x/ads_48dp.png',
  },
  // Was google's faviconV2 proxy (weak quality)
  'tiktok-for-business-ttam': {
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg',
    brandIcon: 'https://cdn.worldvectorlogo.com/logos/tiktok-icon-2.svg',
  },
  'tiktok-ads': {
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg',
    brandIcon: 'https://cdn.worldvectorlogo.com/logos/tiktok-icon-2.svg',
  },
  'microsoft-ads': {
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    brandIcon: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
  'yelp-ads': {
    logoUrl: 'https://www.yelp.com/favicon.ico',
    brandIcon: 'https://www.yelp.com/favicon.ico',
  },
  'apple-search-ads': {
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    brandIcon: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
  'pinterest-ads': {
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
    brandIcon: 'https://s.pinimg.com/webapp/favicon-54a5b2af.png',
  },
  'reddit-ads': {
    logoUrl: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png',
    brandIcon: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png',
  },
  'spotify-ads': {
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    brandIcon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
  },
  'quora-ads': {
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Quora_logo_2015.svg',
    brandIcon: 'https://www.quora.com/favicon.ico',
  },
  'linkedin-ads-b2b-credits': {
    logoUrl: 'https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg',
    brandIcon: 'https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg',
  },
  'snapchat-ads-matched-credit': {
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg',
    brandIcon: 'https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg',
  },
  'reddit-ads-500-credit': {
    logoUrl: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png',
    brandIcon: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png',
  },
  'google-ads-startup-credits': {
    logoUrl: 'https://www.gstatic.com/images/branding/product/2x/ads_48dp.png',
    brandIcon: 'https://www.gstatic.com/images/branding/product/2x/ads_48dp.png',
  },
}

for (const file of FILES) {
  const raw = fs.readFileSync(file, 'utf8')
  const deals = JSON.parse(raw)
  let changed = 0
  for (const d of deals) {
    const upd = LOGOS[d.slug]
    if (!upd) continue
    const newLogo = upd.logoUrl
    const newBrand = upd.brandIcon || newLogo
    let touched = false
    if (d.logoUrl !== newLogo) {
      console.log(`[${path.basename(path.dirname(file))}] ${d.slug}`)
      console.log(`  OLD: ${d.logoUrl || '(none)'}`)
      console.log(`  NEW: ${newLogo}`)
      d.logoUrl = newLogo
      touched = true
    }
    if (d.brandIcon !== newBrand) {
      d.brandIcon = newBrand
      touched = true
    }
    if (touched) changed++
  }
  fs.writeFileSync(file, JSON.stringify(deals, null, 2) + '\n')
  console.log(`  → ${changed} updated in ${file}\n`)
}
