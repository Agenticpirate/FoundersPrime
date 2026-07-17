/**
 * Vendor brand logos for ALL catalog categories into public/brand-logos
 * and regenerate lib/brand-icons.ts mappings (safe name matching).
 *
 * Sources: deals, accelerators, incubators, grants, student benefits,
 * flash deals, popular deals.
 */
import fs from 'fs'
import path from 'path'
import { accelerators2026 } from '../data/accelerators-2026'
import { incubators2026 } from '../data/incubators-2026'
import { grants2026 } from '../data/grants-2026'
import { studentBenefits2026 } from '../data/student-benefits-2026'
import { flashDeals } from '../data/flash-deals'
import { popularDeals } from '../data/popular-deals'

const LOGO_DEV_TOKEN = 'pk_WQ-XL0MlQ3-ODa_K0zgqEg'
const OUT_DIR = path.join(process.cwd(), 'public/brand-logos')
const BRAND_ICONS_PATH = path.join(process.cwd(), 'lib/brand-icons.ts')

const GARBAGE_HOSTS = new Set([
  't1.gstatic.com',
  't0.gstatic.com',
  't2.gstatic.com',
  't3.gstatic.com',
  'www.gstatic.com',
  'gstatic.com',
  'upload.wikimedia.org',
  'www.redditstatic.com',
  'redditstatic.com',
  'framerusercontent.com',
  'www.framerusercontent.com',
  'logo.clearbit.com',
  'img.logo.dev',
  'icons.duckduckgo.com',
  'ui-avatars.com',
  'cdn.simpleicons.org',
  'lh3.googleusercontent.com',
  'googleusercontent.com',
])

/** Always seed these — product sites must not fall through to parent companies */
const CRITICAL: Array<{ slug: string; domains: string[]; names: string[] }> = [
  { slug: 'youtube', domains: ['youtube.com', 'youtu.be', 'music.youtube.com'], names: ['youtube', 'youtube premium', 'youtube music'] },
  { slug: 'google', domains: ['google.com', 'about.google'], names: ['google'] },
  { slug: 'googlecloud', domains: ['cloud.google.com'], names: ['google cloud', 'gcp'] },
  { slug: 'figma', domains: ['figma.com'], names: ['figma'] },
  { slug: 'adobe', domains: ['adobe.com'], names: ['adobe'] },
  { slug: 'spotify', domains: ['spotify.com'], names: ['spotify'] },
  { slug: 'microsoft', domains: ['microsoft.com'], names: ['microsoft'] },
  { slug: 'github', domains: ['github.com', 'github.blog'], names: ['github'] },
  { slug: 'notion', domains: ['notion.so', 'notion.com'], names: ['notion'] },
  { slug: 'apple', domains: ['apple.com'], names: ['apple'] },
  { slug: 'amazon', domains: ['amazon.com'], names: ['amazon'] },
  { slug: 'aws', domains: ['aws.amazon.com', 'amazonaws.com'], names: ['aws', 'amazon web services'] },
  { slug: 'canva', domains: ['canva.com'], names: ['canva'] },
  { slug: 'slack', domains: ['slack.com'], names: ['slack'] },
  { slug: 'discord', domains: ['discord.com', 'discord.gg'], names: ['discord'] },
  { slug: 'linkedin', domains: ['linkedin.com'], names: ['linkedin'] },
  { slug: 'openai', domains: ['openai.com', 'chatgpt.com'], names: ['openai', 'chatgpt'] },
  { slug: 'anthropic', domains: ['anthropic.com', 'claude.ai'], names: ['anthropic', 'claude'] },
  { slug: 'cursor', domains: ['cursor.com'], names: ['cursor'] },
  { slug: 'framer', domains: ['framer.com'], names: ['framer'] },
  { slug: 'jetbrains', domains: ['jetbrains.com'], names: ['jetbrains'] },
  { slug: 'autodesk', domains: ['autodesk.com'], names: ['autodesk'] },
  { slug: 'unity', domains: ['unity.com'], names: ['unity'] },
  { slug: 'nytimes', domains: ['nytimes.com', 'www.nytimes.com'], names: ['the new york times', 'new york times', 'nytimes', 'ny times'] },
  { slug: 'wsj', domains: ['wsj.com', 'education.wsj.com'], names: ['wall street journal', 'wsj'] },
  { slug: 'economist', domains: ['economist.com'], names: ['the economist', 'economist'] },
  { slug: 'babbel', domains: ['babbel.com'], names: ['babbel'] },
  { slug: 'ynab', domains: ['ynab.com'], names: ['you need a budget', 'ynab'] },
  { slug: 'zipcar', domains: ['zipcar.com'], names: ['zipcar'] },
  { slug: 'united', domains: ['united.com'], names: ['united airlines', 'united'] },
  { slug: 'thenorthface', domains: ['thenorthface.com'], names: ['the north face', 'north face'] },
  { slug: 'jcrew', domains: ['jcrew.com'], names: ['j.crew', 'jcrew'] },
  { slug: 'madewell', domains: ['madewell.com'], names: ['madewell'] },
  { slug: 'katespade', domains: ['katespade.com'], names: ['kate spade'] },
  { slug: 'tommy', domains: ['tommy.com', 'usa.tommy.com'], names: ['tommy hilfiger'] },
  { slug: 'reebok', domains: ['reebok.com'], names: ['reebok'] },
  { slug: 'newbalance', domains: ['newbalance.com'], names: ['new balance'] },
  { slug: 'medium', domains: ['medium.com'], names: ['medium'] },
  { slug: 'gitlab', domains: ['gitlab.com'], names: ['gitlab'] },
  { slug: 'miro', domains: ['miro.com'], names: ['miro'] },
  { slug: 'firecrawl', domains: ['firecrawl.dev'], names: ['firecrawl'] },
  { slug: 'perplexity', domains: ['perplexity.ai'], names: ['perplexity', 'perplexity ai'] },
  { slug: 'instatus', domains: ['instatus.com'], names: ['instatus'] },
  { slug: 'lovable', domains: ['lovable.dev'], names: ['lovable', 'lovable premium', 'lovable pro'] },
  { slug: 'stripe', domains: ['stripe.com'], names: ['stripe'] },
  { slug: 'vercel', domains: ['vercel.com'], names: ['vercel'] },
  { slug: 'supabase', domains: ['supabase.com'], names: ['supabase'] },
  { slug: 'ycombinator', domains: ['ycombinator.com'], names: ['y combinator', 'ycombinator', 'yc'] },
  { slug: 'techstars', domains: ['techstars.com'], names: ['techstars'] },
  { slug: '500global', domains: ['500.co'], names: ['500 global', '500 startups'] },
]

function cleanDomain(raw?: string | null): string {
  if (!raw) return ''
  try {
    let s = String(raw).trim()
    if (!s) return ''
    if (s.includes('domain=')) s = s.split('domain=')[1].split('&')[0]
    if (s.includes('logo.clearbit.com/')) s = s.split('logo.clearbit.com/')[1].split('?')[0]
    if (s.includes('img.logo.dev/')) s = s.split('img.logo.dev/')[1]?.split('?')[0] || ''
    if (s.includes('://') || s.startsWith('//')) {
      s = new URL(s.startsWith('//') ? `https:${s}` : s).hostname
    }
    s = s.replace(/^www\./i, '').split('/')[0].split('?')[0].toLowerCase()
    if (!s || GARBAGE_HOSTS.has(s) || s.endsWith('.gstatic.com')) return ''
    // junk compound domains from bad data
    if (s.includes('savingsstudents') || s.includes('sheerid') && s.includes('youtube')) {
      if (s.includes('youtube')) return 'youtube.com'
    }
    if (s.endsWith('.new.com')) return s.replace(/\.new\.com$/, '.new')
    return s
  } catch {
    return ''
  }
}

function slugFromDomain(domain: string): string {
  const special: Record<string, string> = {
    'aws.amazon.com': 'aws',
    'cloud.google.com': 'googlecloud',
    'firebase.google.com': 'firebase',
    'youtube.com': 'youtube',
    'music.youtube.com': 'youtube',
    'youtu.be': 'youtube',
    'yandex.cloud': 'yandexcloud',
    'zoom.us': 'zoom',
    'notion.so': 'notion',
    'linear.app': 'linear',
    'sentry.io': 'sentry',
    'datadoghq.com': 'datadog',
    'quickbooks.intuit.com': 'quickbooks',
    '500.co': '500global',
    'fi.co': 'foundersinstitute',
    'nytimes.com': 'nytimes',
    'wsj.com': 'wsj',
    'education.wsj.com': 'wsj',
    'claude.ai': 'anthropic',
    'chatgpt.com': 'openai',
  }
  if (special[domain]) return special[domain]
  // education.wsj.com style — use registrable-ish base
  const parts = domain.split('.')
  if (parts.length >= 2) {
    const base = parts[parts.length - 2]
    if (base === 'co' && parts.length >= 3) return parts[parts.length - 3].replace(/[^a-z0-9]/g, '')
    return base.replace(/[^a-z0-9]/g, '') || domain.replace(/[^a-z0-9]/g, '')
  }
  return domain.replace(/[^a-z0-9]/g, '')
}

function slugFromName(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/^by\s+/i, '')
      .replace(/\s*\(ex\.[^)]+\)/gi, '')
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 48) || 'brand'
  )
}

type BrandRow = {
  name: string
  domain: string
  kinds: Set<string>
  count: number
}

function addBrand(
  map: Map<string, BrandRow>,
  name: string,
  website: string | undefined,
  logo: string | undefined,
  kind: string
) {
  const n = (name || '').replace(/^By\s+/i, '').trim()
  if (!n || n.toLowerCase() === 'deals') return

  // Prefer product domain from URL; fix known parent-company mislabels
  let domain = cleanDomain(website) || cleanDomain(logo) || ''

  // Title/company product overrides when URL is product site
  const lower = n.toLowerCase()
  if (domain.includes('youtube') || /youtube/i.test(n) || /youtube/i.test(website || '')) {
    domain = 'youtube.com'
  }

  if (!domain) {
    domain = `${slugFromName(n)}.com`
  }

  // Key by domain when available so Google+YouTube and Google Cloud stay separate
  const key = domain ? `d:${domain}` : `n:${lower}`

  if (!map.has(key)) {
    map.set(key, { name: n, domain, kinds: new Set([kind]), count: 1 })
  } else {
    const b = map.get(key)!
    b.count++
    b.kinds.add(kind)
    // Prefer a more specific product name over parent company
    if (/youtube|premium|figma|spotify/i.test(n) && /^(google|microsoft|amazon)$/i.test(b.name)) {
      b.name = n
    }
  }
}

function collect(): BrandRow[] {
  const map = new Map<string, BrandRow>()

  const deals = JSON.parse(fs.readFileSync('public/data/all-deals.json', 'utf8'))
  const dealArr = Array.isArray(deals) ? deals : deals.deals || []
  for (const d of dealArr) {
    addBrand(map, d.provider || d.title, d.providerWebsite || d.provider_website, d.logoUrl || d.brandIcon, 'deal')
  }
  for (const a of accelerators2026) addBrand(map, a.name, a.website, a.logo, 'accelerator')
  for (const a of incubators2026) addBrand(map, a.name, a.website, a.logo, 'incubator')
  for (const a of grants2026) addBrand(map, a.name, a.website, a.logo, 'grant')

  for (const b of studentBenefits2026) {
    // Prefer title for product detection when company is parent mega-corp
    const display =
      /youtube/i.test(b.title || '') || /youtube/i.test(b.slug || '')
        ? 'YouTube'
        : b.company
    addBrand(map, display, b.url, (b as { logo?: string }).logo, 'student')
  }

  for (const d of flashDeals as any[]) {
    addBrand(
      map,
      d.provider || d.brand || d.name || d.title,
      d.website || d.providerWebsite || d.url || d.domain,
      d.logo || d.logoUrl,
      'flash'
    )
  }
  for (const d of popularDeals as any[]) {
    addBrand(map, d.provider || d.name || d.title, d.domain || d.website, d.logo, 'popular')
  }

  // Critical always present
  for (const c of CRITICAL) {
    addBrand(map, c.names[0], `https://${c.domains[0]}`, undefined, 'critical')
  }

  return [...map.values()]
}

async function download(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'FoundersPrimeLogoVendor/1.0' },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 200) return null
    const head = buf.slice(0, 20).toString('utf8').toLowerCase()
    if (head.includes('<!doctype') || head.includes('<html')) return null
    return buf
  } catch {
    return null
  }
}

async function fetchLogo(domain: string): Promise<Buffer | null> {
  const sources = [
    `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=128&format=png`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ]
  for (const url of sources) {
    const buf = await download(url)
    if (buf) return buf
  }
  return null
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const brands = collect()
  console.log(`Collected ${brands.length} unique brand domains`)

  const slugFile: Record<string, string> = {}
  // Keep existing files on disk
  for (const f of fs.readdirSync(OUT_DIR)) {
    const slug = f.replace(/\.(png|svg|jpg|jpeg|webp)$/i, '')
    slugFile[slug] = f
  }

  const domainToSlug: Record<string, string> = {}
  const nameToSlug: Record<string, string> = {}

  // Seed critical first
  for (const c of CRITICAL) {
    for (const d of c.domains) domainToSlug[d] = c.slug
    for (const n of c.names) nameToSlug[n] = c.slug
  }

  let downloaded = 0
  let reused = 0
  let failed: string[] = []
  const queue = [...brands]
  const concurrency = 10

  async function worker() {
    while (queue.length) {
      const b = queue.shift()!
      const domain = cleanDomain(b.domain) || b.domain
      if (!domain || GARBAGE_HOSTS.has(domain)) {
        failed.push(`${b.name} (bad domain ${domain})`)
        continue
      }

      // Prefer critical mapping
      let slug =
        domainToSlug[domain] ||
        slugFromDomain(domain) ||
        slugFromName(b.name)

      // Don't let parent mega-corp names overwrite product slugs for product domains
      if (domain.includes('youtube')) slug = 'youtube'
      if (domain === 'figma.com') slug = 'figma'
      if (domain === 'adobe.com') slug = 'adobe'
      if (domain === 'spotify.com') slug = 'spotify'
      if (domain === 'nytimes.com') slug = 'nytimes'

      domainToSlug[domain] = slug
      const nameKey = b.name.toLowerCase().trim()
      // Only map name → slug when name is not a parent company that would steal product logos
      // e.g. never map "google" → youtube
      if (nameKey && !(nameKey === 'google' && slug === 'youtube')) {
        nameToSlug[nameKey] = slug
      }
      // Product aliases from name
      if (/youtube/i.test(b.name)) {
        nameToSlug['youtube'] = 'youtube'
        nameToSlug['youtube premium'] = 'youtube'
      }

      if (slugFile[slug] && fs.existsSync(path.join(OUT_DIR, slugFile[slug]))) {
        reused++
        continue
      }

      const buf = await fetchLogo(domain)
      if (!buf) {
        const guess = `${slugFromName(b.name)}.com`
        const buf2 = guess !== domain ? await fetchLogo(guess) : null
        if (!buf2) {
          failed.push(`${b.name} @ ${domain}`)
          continue
        }
        const file = `${slug}.png`
        fs.writeFileSync(path.join(OUT_DIR, file), buf2)
        slugFile[slug] = file
        downloaded++
        continue
      }

      const file = `${slug}.png`
      // Don't overwrite high-quality svg with png if svg already present
      if (slugFile[slug]?.endsWith('.svg') && fs.existsSync(path.join(OUT_DIR, slugFile[slug]))) {
        reused++
        continue
      }
      fs.writeFileSync(path.join(OUT_DIR, file), buf)
      slugFile[slug] = file
      downloaded++
      if (downloaded % 50 === 0) console.log(`  downloaded ${downloaded}...`)
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()))

  // Ensure critical logos exist
  for (const c of CRITICAL) {
    if (slugFile[c.slug] && fs.existsSync(path.join(OUT_DIR, slugFile[c.slug]))) continue
    const buf = await fetchLogo(c.domains[0])
    if (buf) {
      const file = `${c.slug}.png`
      fs.writeFileSync(path.join(OUT_DIR, file), buf)
      slugFile[c.slug] = file
      downloaded++
      console.log(`  critical downloaded: ${c.slug}`)
    } else {
      failed.push(`CRITICAL ${c.slug} @ ${c.domains[0]}`)
    }
  }

  // Extra hand-tuned domains/names for mega brands
  Object.assign(domainToSlug, {
    'aws.amazon.com': 'aws',
    'amazon.com': 'amazon',
    'cloud.google.com': 'googlecloud',
    'google.com': 'google',
    'youtube.com': 'youtube',
    'youtu.be': 'youtube',
    'music.youtube.com': 'youtube',
    'microsoft.com': 'microsoft',
    'openai.com': 'openai',
    'figma.com': 'figma',
    'adobe.com': 'adobe',
    'spotify.com': 'spotify',
    'github.com': 'github',
    'notion.so': 'notion',
    'notion.com': 'notion',
    'nytimes.com': 'nytimes',
    'wsj.com': 'wsj',
    'education.wsj.com': 'wsj',
    'ycombinator.com': 'ycombinator',
    'techstars.com': 'techstars',
    '500.co': '500global',
    'lovable.dev': 'lovable',
    'cursor.com': 'cursor',
    'perplexity.ai': 'perplexity',
  })
  Object.assign(nameToSlug, {
    youtube: 'youtube',
    'youtube premium': 'youtube',
    google: 'google',
    'google cloud': 'googlecloud',
    figma: 'figma',
    adobe: 'adobe',
    spotify: 'spotify',
    microsoft: 'microsoft',
    github: 'github',
    notion: 'notion',
    'the new york times': 'nytimes',
    'new york times': 'nytimes',
    nytimes: 'nytimes',
    'wall street journal': 'wsj',
    wsj: 'wsj',
    'new balance': 'newbalance',
    aws: 'aws',
    openai: 'openai',
    cursor: 'cursor',
    lovable: 'lovable',
    'y combinator': 'ycombinator',
    ycombinator: 'ycombinator',
    techstars: 'techstars',
  })

  // google slug may not exist yet if only googlecloud does — map google → google if downloaded else keep googlecloud for cloud only
  if (!slugFile['google'] && slugFile['googlecloud']) {
    // leave google name → try download google.com
    const g = await fetchLogo('google.com')
    if (g) {
      fs.writeFileSync(path.join(OUT_DIR, 'google.png'), g)
      slugFile['google'] = 'google.png'
      downloaded++
    }
  }

  const sortedSlugs = Object.keys(slugFile).sort()
  const slugFileBody = sortedSlugs
    .filter((s) => fs.existsSync(path.join(OUT_DIR, slugFile[s])))
    .map((s) => `  "${s}": "${slugFile[s]}",`)
    .join('\n')

  const domainBody = Object.entries(domainToSlug)
    .filter(([, slug]) => slugFile[slug])
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([d, s]) => `  '${d}': '${s}',`)
    .join('\n')

  const nameBody = Object.entries(nameToSlug)
    .filter(([, slug]) => slugFile[slug])
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([n, s]) => {
      const key = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(n) ? n : `'${n.replace(/'/g, "\\'")}'`
      return `  ${key}: '${s}',`
    })
    .join('\n')

  const ts = `/**
 * Local brand marks under /public/brand-logos (same-origin).
 * Auto-generated by scripts/vendor-brand-logos.ts — re-run after catalog changes.
 *
 * Resolution rules (see resolveBrandSlug):
 * - Domain match first (product site wins over parent company name)
 * - Name match is exact / word-boundary only (no short substring hijacks)
 */

/** slug → exact filename that exists on disk */
const SLUG_FILE: Record<string, string> = {
${slugFileBody}
}

/** domain (hostname) → slug */
const DOMAIN_TO_SLUG: Record<string, string> = {
${domainBody}
}

/** brand display name (lowercase) → slug */
const NAME_TO_SLUG: Record<string, string> = {
${nameBody}
}

function normalizeHost(domain?: string | null): string {
  if (!domain) return ''
  return domain
    .replace(/^(https?:\\/\\/)?(www\\.)?/i, '')
    .split('/')[0]
    .toLowerCase()
    .trim()
}

function normalizeName(name?: string | null): string {
  if (!name) return ''
  return name
    .toLowerCase()
    .trim()
    .replace(/^by\\s+/, '')
    .replace(/\\s*\\(ex\\.[^)]+\\)/gi, '')
    .replace(/\\s+/g, ' ')
}

/**
 * Safe brand slug resolution.
 * Domain match preferred. Name match is exact / suffix-stripped / word-boundary (len>=5).
 */
function resolveBrandSlug(
  name?: string | null,
  domain?: string | null
): string | null {
  const host = normalizeHost(domain)
  if (host) {
    if (DOMAIN_TO_SLUG[host]) return DOMAIN_TO_SLUG[host]
    const parts = host.split('.')
    for (let i = 0; i < parts.length - 1; i++) {
      const candidate = parts.slice(i).join('.')
      if (DOMAIN_TO_SLUG[candidate]) return DOMAIN_TO_SLUG[candidate]
    }
    const base = parts[0]
    if (base && SLUG_FILE[base]) return base
  }

  const n = normalizeName(name)
  if (!n) return null

  if (NAME_TO_SLUG[n]) return NAME_TO_SLUG[n]

  const stripped = n
    .replace(
      /\\s+(accelerator|incubator|program|fellowship|labs?|ventures?|premium|student|students|for startups|startups?)$/i,
      ''
    )
    .trim()
  if (stripped && NAME_TO_SLUG[stripped]) return NAME_TO_SLUG[stripped]

  const keys = Object.keys(NAME_TO_SLUG)
    .filter((k) => k.length >= 5)
    .sort((a, b) => b.length - a.length)
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&')
    const re = new RegExp('(?:^|\\\\s)' + escaped + '(?:\\\\s|$)', 'i')
    if (re.test(n)) return NAME_TO_SLUG[key]
  }

  const compact = n.replace(/[^a-z0-9]/g, '')
  if (compact && SLUG_FILE[compact]) return compact
  if (compact && NAME_TO_SLUG[compact]) return NAME_TO_SLUG[compact]

  return null
}

/** Same-origin logo path(s), e.g. \`/brand-logos/stripe.svg\`. */
export function getLocalBrandLogoCandidates(
  name?: string | null,
  domain?: string | null
): string[] {
  const slug = resolveBrandSlug(name, domain)
  if (!slug) return []
  const file = SLUG_FILE[slug]
  if (!file) return []
  return [\`/brand-logos/\${file}\`]
}

/** Expose resolved slug for audits */
export function resolveLocalBrandSlug(
  name?: string | null,
  domain?: string | null
): string | null {
  return resolveBrandSlug(name, domain)
}
`

  // Fix over-escaped regex in generated file — write resolver cleanly after
  fs.writeFileSync(BRAND_ICONS_PATH, ts)

  // Patch the broken escape sequence from template generation
  let final = fs.readFileSync(BRAND_ICONS_PATH, 'utf8')
  final = final.replace(
    /const escaped = key\.replace\([^)]+\)[\s\S]*?const re = new RegExp\([^)]+\)/,
    `const escaped = key.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&')
    const re = new RegExp('(?:^|\\\\s)' + escaped + '(?:\\\\s|$)', 'i')`
  )
  // Better: replace whole word-boundary block with correct code
  final = final.replace(
    /const keys = Object\.keys\(NAME_TO_SLUG\)[\s\S]*?if \(re\.test\(n\)\) return NAME_TO_SLUG\[key\]\n  \}/,
    `const keys = Object.keys(NAME_TO_SLUG)
    .filter((k) => k.length >= 5)
    .sort((a, b) => b.length - a.length)
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&')
    const re = new RegExp('(?:^|\\\\s)' + escaped + '(?:\\\\s|$)', 'i')
    if (re.test(n)) return NAME_TO_SLUG[key]
  }`
  )
  fs.writeFileSync(BRAND_ICONS_PATH, final)

  const report = {
    totalBrands: brands.length,
    slugCount: Object.keys(slugFile).length,
    downloaded,
    reused,
    failed: failed.length,
    failedSamples: failed.slice(0, 40),
    youtubeFile: slugFile['youtube'] || null,
    figmaFile: slugFile['figma'] || null,
    googleFile: slugFile['google'] || null,
  }
  fs.writeFileSync('scripts/vendor-brand-logos-report.json', JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
