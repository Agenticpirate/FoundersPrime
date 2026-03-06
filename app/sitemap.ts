import { MetadataRoute } from 'next'
import { accelerators2026 } from '@/data/accelerators-2026'
import { incubators2026 } from '@/data/incubators-2026'
import { grants2026 } from '@/data/grants-2026'
import startupsData from '@/data/yc_companies_2024_2026.json'
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
    const acceleratorRoutes = accelerators2026.map((accelerator) => ({
        url: `${baseUrl}/deals/${accelerator.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    // 4. Dynamic Incubator Routes
    const incubatorRoutes = incubators2026.map((incubator) => ({
        url: `${baseUrl}/deals/${incubator.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // 5. Dynamic Grant Routes
    const grantRoutes = grants2026.map((grant) => ({
        url: `${baseUrl}/deals/${grant.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // 6. Dynamic Startup Routes
    const startupRoutes = startupsData.map((startup: any) => ({
        url: `${baseUrl}/startups/${startup.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [
        ...staticRoutes,
        ...dealRoutes,
        ...acceleratorRoutes,
        ...incubatorRoutes,
        ...grantRoutes,
        ...startupRoutes
    ]
}
