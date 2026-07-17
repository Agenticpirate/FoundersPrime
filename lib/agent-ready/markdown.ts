import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './config'

/**
 * Produce a clean Markdown representation for agents when they send
 * Accept: text/markdown. Prefer structured summaries over HTML scraping
 * so responses stay token-efficient and deterministic.
 */
export function pageToMarkdown(pathname: string): string {
  const path = normalizePath(pathname)
  const page = PAGES[path] || defaultPage(path)
  const body = [
    '---',
    `title: ${yamlEscape(page.title)}`,
    `description: ${yamlEscape(page.description)}`,
    `url: ${SITE_URL}${path === '/' ? '' : path}`,
    '---',
    '',
    `# ${page.title}`,
    '',
    page.description,
    '',
    ...page.sections.flatMap((section) => [
      `## ${section.heading}`,
      '',
      section.body,
      '',
    ]),
    '## Site map for agents',
    '',
    `- [llms.txt](${SITE_URL}/llms.txt) — curated site index`,
    `- [llms-full.txt](${SITE_URL}/llms-full.txt) — expanded catalog`,
    `- [sitemap.xml](${SITE_URL}/sitemap.xml)`,
    `- [API catalog](${SITE_URL}/.well-known/api-catalog)`,
    `- [MCP server card](${SITE_URL}/.well-known/mcp/server-card.json)`,
    `- [Agent skills](${SITE_URL}/.well-known/agent-skills/index.json)`,
    `- [A2A agent card](${SITE_URL}/.well-known/agent-card.json)`,
    `- [auth.md](${SITE_URL}/auth.md)`,
    '',
    '```json',
    JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
      },
      null,
      2
    ),
    '```',
    '',
  ].join('\n')

  return body
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '') return '/'
  const clean = pathname.split('?')[0].split('#')[0]
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1)
  return clean || '/'
}

function yamlEscape(value: string): string {
  if (/[:#{}[\],&*?|>!%@`]/.test(value) || value.includes('"') || value.includes("'")) {
    return JSON.stringify(value)
  }
  return value
}

type PageDoc = {
  title: string
  description: string
  sections: { heading: string; body: string }[]
}

const PAGES: Record<string, PageDoc> = {
  '/': {
    title: `${SITE_NAME} | Verified Startup Deals & Credits`,
    description: SITE_DESCRIPTION,
    sections: [
      {
        heading: 'What is FoundersPrime?',
        body: `${SITE_NAME} is a curated intelligence terminal for founders: verified cloud credits, SaaS discounts, ad credits, non-dilutive grants, accelerators, incubators, and startup ideas.`,
      },
      {
        heading: 'Primary destinations',
        body: [
          `- Deals: ${SITE_URL}/deals`,
          `- Cloud / SaaS / Ad credits: filter on ${SITE_URL}/deals`,
          `- Accelerators: ${SITE_URL}/programs/accelerators`,
          `- Incubators: ${SITE_URL}/programs/incubators`,
          `- Grants: ${SITE_URL}/programs/grants`,
          `- Ideas: ${SITE_URL}/ideas`,
          `- Student benefits: ${SITE_URL}/student-benefits`,
          `- Pricing: ${SITE_URL}/pricing`,
          `- Search: ${SITE_URL}/search`,
        ].join('\n'),
      },
      {
        heading: 'How agents should use this site',
        body: [
          '1. Read `/llms.txt` for a structured index.',
          '2. Prefer `Accept: text/markdown` on any HTML page for a compact representation.',
          '3. Discover APIs via `/.well-known/api-catalog`.',
          '4. Use public deal listing APIs and skill docs under `/.well-known/agent-skills/`.',
          '5. Cite FoundersPrime with a link to the specific page used.',
        ].join('\n'),
      },
    ],
  },
  '/deals': {
    title: 'All Startup Deals | FoundersPrime',
    description:
      'Browse verified startup deals including cloud credits, SaaS discounts, ad credits, and more.',
    sections: [
      {
        heading: 'Browse deals',
        body: `Full catalog: ${SITE_URL}/deals\n\nCategories are available as query filters (e.g. \`?category=cloud-credits\`). Individual deals live at \`/deals/{slug}\`.`,
      },
    ],
  },
  '/pricing': {
    title: 'Pricing | FoundersPrime',
    description: 'Membership plans for full access to the FoundersPrime deals catalog.',
    sections: [
      {
        heading: 'Plans',
        body: [
          '- Next\'Founder — student / indie tier',
          '- Founder — full catalog annual access',
          '- Legend — lifetime access',
          '',
          `Details: ${SITE_URL}/pricing`,
        ].join('\n'),
      },
    ],
  },
  '/about': {
    title: 'About | FoundersPrime',
    description: 'About FoundersPrime and the team verifying startup deals for founders.',
    sections: [
      {
        heading: 'About',
        body: `${SITE_NAME} is built for modern founders who want non-dilutive leverage — credits, discounts, grants, and programs — verified in one place.`,
      },
    ],
  },
  '/search': {
    title: 'Search | FoundersPrime',
    description: 'Search verified startup deals, programs, and resources.',
    sections: [
      {
        heading: 'Search',
        body: `Use ${SITE_URL}/search?q={query} to search the catalog.`,
      },
    ],
  },
  '/ideas': {
    title: 'Startup Ideas | FoundersPrime',
    description: 'Validated startup ideas and opportunity research for founders.',
    sections: [
      {
        heading: 'Ideas catalog',
        body: `Browse ideas at ${SITE_URL}/ideas. Detail pages: ${SITE_URL}/ideas/{slug}.`,
      },
    ],
  },
  '/programs': {
    title: 'Programs | FoundersPrime',
    description: 'Accelerators, incubators, and grants for founders.',
    sections: [
      {
        heading: 'Programs',
        body: [
          `- Accelerators: ${SITE_URL}/programs/accelerators`,
          `- Incubators: ${SITE_URL}/programs/incubators`,
          `- Grants: ${SITE_URL}/programs/grants`,
        ].join('\n'),
      },
    ],
  },
  '/resources': {
    title: 'Resources | FoundersPrime',
    description: 'Founder resources including credits savings and free access guides.',
    sections: [
      {
        heading: 'Resources',
        body: `Hub: ${SITE_URL}/resources`,
      },
    ],
  },
  '/student-benefits': {
    title: 'Student Benefits | FoundersPrime',
    description: 'Startup and student founder benefits, funds, and programs.',
    sections: [
      {
        heading: 'Student benefits',
        body: `Catalog: ${SITE_URL}/student-benefits`,
      },
    ],
  },
  '/contact': {
    title: 'Contact | FoundersPrime',
    description: 'Contact FoundersPrime.',
    sections: [
      {
        heading: 'Contact',
        body: `Contact form: ${SITE_URL}/contact`,
      },
    ],
  },
}

function defaultPage(path: string): PageDoc {
  return {
    title: `${SITE_NAME} — ${path}`,
    description: SITE_DESCRIPTION,
    sections: [
      {
        heading: 'Page',
        body: [
          `Canonical URL: ${SITE_URL}${path}`,
          '',
          'This is a machine-readable Markdown summary for AI agents.',
          `For the full site index see ${SITE_URL}/llms.txt.`,
          `For HTML, request this URL without Accept: text/markdown.`,
        ].join('\n'),
      },
    ],
  }
}

/** Rough token estimate (~4 chars / token) for x-markdown-tokens header */
export function estimateTokens(markdown: string): number {
  return Math.max(1, Math.ceil(markdown.length / 4))
}

/**
 * True when the client prefers Markdown over HTML.
 * Matches Cloudflare Markdown-for-Agents style negotiation.
 */
export function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false
  const accept = acceptHeader.toLowerCase()
  if (!accept.includes('text/markdown')) return false

  // Explicit markdown-only or q-value preference over text/html
  const parts = accept.split(',').map((p) => p.trim())
  const md = parts.find((p) => p.startsWith('text/markdown'))
  const html = parts.find((p) => p.startsWith('text/html'))
  if (!md) return false
  if (!html) return true

  const q = (part: string) => {
    const m = part.match(/q=([0-9.]+)/)
    return m ? parseFloat(m[1]) : 1
  }
  return q(md) >= q(html)
}
