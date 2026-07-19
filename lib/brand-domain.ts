/**
 * Shared brand → domain resolution for deal / student / program cards.
 * Prefer product URL host when available; fall back to known company maps.
 */

import { cleanDomain, extractDomainFromUrl, isGarbageLogoDomain } from '@/lib/logo-utils'

/** Well-known company / product aliases → hostname */
const BRAND_DOMAIN: Record<string, string> = {
  aws: 'aws.amazon.com',
  amazon: 'amazon.com',
  amazonwebservices: 'aws.amazon.com',
  amazonprime: 'amazon.com',
  google: 'google.com',
  googlecloud: 'cloud.google.com',
  youtube: 'youtube.com',
  youtubepremium: 'youtube.com',
  microsoft: 'microsoft.com',
  azure: 'microsoft.com',
  github: 'github.com',
  gitlab: 'gitlab.com',
  notion: 'notion.so',
  figma: 'figma.com',
  canva: 'canva.com',
  adobe: 'adobe.com',
  apple: 'apple.com',
  spotify: 'spotify.com',
  jetbrains: 'jetbrains.com',
  autodesk: 'autodesk.com',
  unity: 'unity.com',
  slack: 'slack.com',
  discord: 'discord.com',
  linkedin: 'linkedin.com',
  openai: 'openai.com',
  cursor: 'cursor.com',
  framer: 'framer.com',
  medium: 'medium.com',
  miro: 'miro.com',
  dropbox: 'dropbox.com',
  zoom: 'zoom.us',
  airtable: 'airtable.com',
  linear: 'linear.app',
  vercel: 'vercel.com',
  netlify: 'netlify.com',
  stripe: 'stripe.com',
  hubspot: 'hubspot.com',
  intercom: 'intercom.com',
  digitalocean: 'digitalocean.com',
  cloudflare: 'cloudflare.com',
  mongodb: 'mongodb.com',
  supabase: 'supabase.com',
  firebase: 'firebase.google.com',
  datadog: 'datadoghq.com',
  sentry: 'sentry.io',
  twilio: 'twilio.com',
  webflow: 'webflow.com',
  auth0: 'auth0.com',
  okta: 'okta.com',
  heroku: 'heroku.com',
  nytimes: 'nytimes.com',
  thenewyorktimes: 'nytimes.com',
  newyorktimes: 'nytimes.com',
  wallstreetjournal: 'wsj.com',
  wsj: 'wsj.com',
  theeconomist: 'economist.com',
  economist: 'economist.com',
  babbel: 'babbel.com',
  everyplate: 'everyplate.com',
  homechef: 'homechef.com',
  zipcar: 'zipcar.com',
  united: 'united.com',
  unitedairlines: 'united.com',
  studentuniverse: 'studentuniverse.com',
  thenorthface: 'thenorthface.com',
  northface: 'thenorthface.com',
  jcrew: 'jcrew.com',
  madewell: 'madewell.com',
  katespade: 'katespade.com',
  tommyhilfiger: 'tommy.com',
  tommy: 'tommy.com',
  reebok: 'reebok.com',
  vineyardvines: 'vineyardvines.com',
  stanley: 'stanley1913.com',
  purple: 'purple.com',
  fedex: 'fedex.com',
  d5render: 'd5render.com',
  d5: 'd5render.com',
  foxrenderfarm: 'foxrenderfarm.com',
  firecrawl: 'firecrawl.dev',
  optus: 'optus.com.au',
  bellcanada: 'bell.ca',
  bell: 'bell.ca',
  ycombinator: 'ycombinator.com',
  yc: 'ycombinator.com',
  techstars: 'techstars.com',
  jetbrainsacademy: 'jetbrains.com',
  githubeducation: 'education.github.com',
  educationgithub: 'education.github.com',
  microsoft365: 'microsoft.com',
  office365: 'microsoft.com',
  visualstudio: 'visualstudio.com',
  intellij: 'jetbrains.com',
  pycharm: 'jetbrains.com',
  webstorm: 'jetbrains.com',
  adobecreativecloud: 'adobe.com',
  adobecreative: 'adobe.com',
  googlesheets: 'google.com',
  googleworkspace: 'workspace.google.com',
  googleone: 'one.google.com',
  youtubeedu: 'youtube.com',
  udemy: 'udemy.com',
  coursera: 'coursera.com',
  skillshare: 'skillshare.com',
  masterclass: 'masterclass.com',
  grammarly: 'grammarly.com',
  notionforstudents: 'notion.so',
  figmaeducation: 'figma.com',
  githubstudent: 'education.github.com',
  githubstudentdeveloperpack: 'education.github.com',
  jetbrainsstudent: 'jetbrains.com',
  azureforstudents: 'azure.microsoft.com',
  awseducate: 'aws.amazon.com',
  namecheap: 'namecheap.com',
  digialocean: 'digitalocean.com', // typo alias kept for stored brand keys
  // heroku already mapped above
  replit: 'replit.com',
  codesandbox: 'codesandbox.io',
  mongodbforstudents: 'mongodb.com',
  databricks: 'databricks.com',
  tableau: 'tableau.com',
  powerbi: 'powerbi.microsoft.com',
  lastpass: 'lastpass.com',
  onepassword: '1password.com',
  '1password': '1password.com',
  bitwarden: 'bitwarden.com',
  nordvpn: 'nordvpn.com',
  expressvpn: 'expressvpn.com',
  headspace: 'headspace.com',
  calm: 'calm.com',
  hulu: 'hulu.com',
  netflix: 'netflix.com',
  disneyplus: 'disneyplus.com',
  hbomax: 'max.com',
  max: 'max.com',
  paramountplus: 'paramountplus.com',
  peacocks: 'peacocktv.com',
  peacock: 'peacocktv.com',
  soundcloud: 'soundcloud.com',
  tidal: 'tidal.com',
  applemusic: 'music.apple.com',
  ynab: 'ynab.com',
  youneedabudget: 'ynab.com',
  dashlane: 'dashlane.com',
  setapp: 'setapp.com',
  cleanmymac: 'macpaw.com',
  paralleldesktop: 'parallels.com',
  parallels: 'parallels.com',
  sketch: 'sketch.com',
  invision: 'invisionapp.com',
  marvelapp: 'marvelapp.com',
  principle: 'principleformac.com',
  procreate: 'procreate.com',
  affinityphoto: 'affinity.serif.com',
  affinitydesigner: 'affinity.serif.com',
  serif: 'affinity.serif.com',
  blender: 'blender.org',
  substance: 'adobe.com',
  cinema4d: 'maxon.net',
  maxon: 'maxon.net',
  unrealengine: 'unrealengine.com',
  epicgames: 'epicgames.com',
  godot: 'godotengine.org',
  itch: 'itch.io',
  steam: 'steampowered.com',
  xbox: 'xbox.com',
  playstation: 'playstation.com',
  nintendo: 'nintendo.com',
}

function normalizeKey(s: string): string {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

/**
 * Aggregator / pack hosts that hijack product logos (e.g. Azure deal listed under GitHub Student Pack).
 * Prefer brand name mapping instead of these hosts.
 */
export function isAggregatorLogoHost(host: string, fullUrl?: string): boolean {
  const h = cleanDomain(host || '')
  if (!h) return true
  if (h === 'education.github.com' || h === 'education.github.io') return true
  // github.com/pack (and hash deep-links) list third-party tools — not the product brand
  if (h === 'github.com' || h.endsWith('.github.com')) {
    const path = (fullUrl || '').toLowerCase()
    if (path.includes('/pack') || path.includes('/experiences') || path.includes('student')) {
      return true
    }
  }
  if (h.includes('unidays') || h.includes('sheerid') || h.includes('studentbeans')) return true
  if (h.includes('linktr.ee') || h.includes('bit.ly') || h.includes('t.co')) return true
  return false
}

/**
 * Resolve the best brand domain from optional website URL, logo URL, and name.
 */
export function resolveBrandDomain(opts: {
  name?: string
  website?: string | null
  logo?: string | null
}): string {
  // 1) Explicit website / claim URL host (skip aggregators so Azure ≠ GitHub logo)
  if (opts.website) {
    try {
      const parsed = new URL(opts.website, 'https://x')
      const host = cleanDomain(parsed.hostname)
      if (
        host &&
        !isGarbageLogoDomain(host) &&
        !isAggregatorLogoHost(host, opts.website)
      ) {
        if (host.includes('youtube')) return 'youtube.com'
        return host
      }
    } catch {
      const host = cleanDomain(opts.website)
      if (host && !isGarbageLogoDomain(host)) return host
    }
  }

  // 2) Domain embedded in logo URL (google s2, logo.dev, etc.)
  if (opts.logo) {
    const fromLogo = extractDomainFromUrl(opts.logo)
    if (fromLogo && !isGarbageLogoDomain(fromLogo)) {
      if (fromLogo.includes('youtube')) return 'youtube.com'
      return cleanDomain(fromLogo)
    }
  }

  // 3) Known brand map (exact then longest prefix / includes)
  const key = normalizeKey(opts.name || '')
  if (key && BRAND_DOMAIN[key]) return BRAND_DOMAIN[key]

  if (key) {
    const keys = Object.keys(BRAND_DOMAIN).sort((a, b) => b.length - a.length)
    for (const k of keys) {
      if (k.length >= 3 && (key.startsWith(k) || key.includes(k))) {
        return BRAND_DOMAIN[k]
      }
    }
  }

  // 4) Fallback slug.com
  return key ? `${key}.com` : 'example.com'
}
