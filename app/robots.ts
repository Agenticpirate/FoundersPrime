import { MetadataRoute } from 'next'

/**
 * robots.txt for SEO + AI agent readiness (isitagentready.com).
 *
 * IMPORTANT: Cloudflare AI Crawl Control currently injects a managed block that
 * DISALLOWs GPTBot/ClaudeBot/etc. For LLM ranking you must set those bots to
 * Allow in Cloudflare → AI Crawl Control (origin rules alone are not enough).
 *
 * Content-Signal is expressed via a custom header route (see next.config) and
 * Cloudflare-managed robots content. Next MetadataRoute.Robots does not emit
 * Content-Signal lines natively.
 */
export default function robots(): MetadataRoute.Robots {
    const aiBots = [
        'GPTBot',
        'ChatGPT-User',
        'Google-Extended',
        'Anthropic-ai',
        'ClaudeBot',
        'Claude-Web',
        'PerplexityBot',
        'Omgilibot',
        'FacebookBot',
        'Bytespider',
        'cohere-ai',
        'CCBot',
        'meta-externalagent',
        'Applebot-Extended',
        'Amazonbot',
    ]

    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/llms.txt',
                    '/llms-full.txt',
                    '/auth.md',
                    '/.well-known/',
                ],
                // Only block crawling of API endpoints (no SEO value, avoids
                // unnecessary load). /admin and /dashboard are intentionally
                // NOT blocked here — they are de-indexed via an
                // `X-Robots-Tag: noindex` response header instead, so Google
                // can crawl them, read the directive, and drop them from the
                // index. Blocking them in robots.txt is what caused the
                // "Indexed, though blocked by robots.txt" warning.
                disallow: ['/api/'],
            },
            {
                // Explicit allow for major AI crawlers + discovery files.
                // Must win over any broader Disallow for LLM citation/ranking.
                userAgent: aiBots,
                allow: [
                    '/',
                    '/llms.txt',
                    '/llms-full.txt',
                    '/auth.md',
                    '/.well-known/',
                    '/deals',
                    '/programs',
                    '/startups',
                    '/ideas',
                    '/resources',
                    '/pricing',
                    '/about',
                    '/search',
                    '/student-benefits',
                ],
                disallow: ['/api/', '/admin/', '/dashboard/', '/billing/', '/checkout/'],
            },
        ],
        sitemap: 'https://www.foundersprime.com/sitemap.xml',
        host: 'https://www.foundersprime.com',
    }
}
