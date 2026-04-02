import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/dashboard/'],
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'Anthropic-ai', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Omgilibot', 'FacebookBot', 'Bytespider', 'cohere-ai'],
                allow: ['/', '/llms.txt', '/llms-full.txt'],
            }
        ],
        sitemap: 'https://www.foundersprime.com/sitemap.xml',
    }
}
