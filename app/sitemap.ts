import { MetadataRoute } from 'next'
import { accelerators2026 } from '@/data/accelerators-2026'
import fs from 'fs'
import path from 'path'

// Helper to get all deals from JSON
function getAllDeals() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'all-deals.json')
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8')
            const deals = JSON.parse(fileContent)
            return Array.isArray(deals) ? deals : []
        }
    } catch (error) {
        console.error('Error loading deals for sitemap:', error)
    }
    return []
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.foundersprime.com'

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/deals',
        '/deals/accelerators',
        '/deals/incubators',
        '/deals/grants',
        '/deals/cloud-credits',
        '/deals/saas-discounts',
        '/deals/ad-credits',
        '/startups',
        '/pricing',
        '/about',
        '/contact',
        '/blog',
        '/resources',
        '/login',
        '/signup',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }))

    // 2. Dynamic Deal Routes
    const allDeals = getAllDeals()
    const dealRoutes = allDeals.map((deal: any) => ({
        url: `${baseUrl}/deals/${deal.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // 3. Dynamic Accelerator Routes
    // Note: keying off the same /deals/[slug] pattern
    const acceleratorRoutes = accelerators2026.map((accelerator) => ({
        url: `${baseUrl}/deals/${accelerator.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9, // Higher priority for accelerators
    }))

    return [...staticRoutes, ...dealRoutes, ...acceleratorRoutes]
}
