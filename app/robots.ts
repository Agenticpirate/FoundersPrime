import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // Only block crawling of API endpoints (no SEO value, avoids
                // unnecessary load). /admin and /dashboard are intentionally
                // NOT blocked here — they are de-indexed via an
                // `X-Robots-Tag: noindex` response header instead, so Google
                // can crawl them, read the directive, and drop them from the
                // index. Blocking them in robots.txt is what caused the
                // "Indexed, though blocked by robots.txt" warning.
                disallow: '/api/',
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'Anthropic-ai', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Omgilibot', 'FacebookBot', 'Bytespider', 'cohere-ai'],
                allow: ['/', '/llms.txt', '/llms-full.txt'],
                disallow: ['/api/', '/admin/', '/dashboard/'],
            }
        ],
        sitemap: 'https://www.foundersprime.com/sitemap.xml',
    }
}
