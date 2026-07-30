import { MetadataRoute } from 'next'
import { accelerators2026 } from '@/data/accelerators-2026'
import { incubators2026 } from '@/data/incubators-2026'
import { grants2026 } from '@/data/grants-2026'
import { flashDeals } from '@/data/flash-deals'
import { studentBenefits2026 } from '@/data/student-benefits-2026'
import { getAllIdeaSlugs } from '@/lib/ideas'
import fs from 'fs'
import path from 'path'

// Single build-time timestamp — stable across all static routes within one
// deploy, instead of a fresh `new Date()` per entry (which makes every URL
// look "just modified" on every build and erodes the lastmod trust signal).
const BUILD_DATE = new Date()

// Parse a date-ish value into a Date, falling back to BUILD_DATE when the
// value is missing or invalid. Keeps real per-item dates from the data so
// Google sees accurate freshness signals.
function toDate(value: unknown): Date {
    if (typeof value === 'string' || typeof value === 'number') {
        const d = new Date(value)
        if (!isNaN(d.getTime())) return d
    }
    return BUILD_DATE
}

// Pick the most recent meaningful date from a record.
function lastModifiedFor(item: any): Date {
    return toDate(item?.updatedAt || item?.lastUpdated || item?.lastVerified || item?.createdAt)
}

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
        '/programs',
        '/programs/accelerators',
        '/programs/incubators',
        '/programs/grants',
        '/ideas',
        '/student-benefits',
        '/flash-deals',
        '/pricing',
        '/about',
        '/contact',
        '/search',
        '/resources',
        '/submit-deal',
        '/privacy',
        '/terms',
        '/cookie-policy',
        '/refund-policy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : route.includes('flash') || route.includes('deals') || route.includes('programs') ? 0.85 : 0.8,
    }))

    // 2. Dynamic Deal Routes
    const allDeals = getAllDeals()
    const dealRoutes = allDeals.map((deal: any) => ({
        url: `${baseUrl}/deals/${deal.slug}`,
        lastModified: lastModifiedFor(deal),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // 3. Dynamic Accelerator Routes
    const acceleratorRoutes = accelerators2026.map((accelerator) => ({
        url: `${baseUrl}/deals/${accelerator.slug}`,
        lastModified: lastModifiedFor(accelerator),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    // 4. Dynamic Incubator Routes
    const incubatorRoutes = incubators2026.map((incubator) => ({
        url: `${baseUrl}/deals/${incubator.slug}`,
        lastModified: lastModifiedFor(incubator),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // 5. Dynamic Grant Routes
    const grantRoutes = grants2026.map((grant) => ({
        url: `${baseUrl}/deals/${grant.slug}`,
        lastModified: lastModifiedFor(grant),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // 6. Flash deals (Verified Startups routes retired — data kept in data/yc_companies_*)
    const flashRoutes = (Array.isArray(flashDeals) ? flashDeals : []).map((deal: any) => ({
        url: `${baseUrl}/flash-deals/${deal.id || deal.slug}`,
        lastModified: lastModifiedFor(deal),
        changeFrequency: 'daily' as const,
        priority: 0.75,
    }))

    // 7. Student benefits (slug pages)
    const studentRoutes: {
        url: string
        lastModified: Date | string
        changeFrequency: 'monthly'
        priority: number
    }[] = []
    for (const item of Array.isArray(studentBenefits2026) ? studentBenefits2026 : []) {
        if (!item?.slug || item.active === false) continue
        studentRoutes.push({
            url: `${baseUrl}/student-benefits/${item.slug}`,
            lastModified: lastModifiedFor(item),
            changeFrequency: 'monthly',
            priority: 0.65,
        })
    }

    // 8. Startup ideas
    const ideaRoutes = getAllIdeaSlugs().map((slug) => ({
        url: `${baseUrl}/ideas/${slug}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [
        ...staticRoutes,
        ...dealRoutes,
        ...acceleratorRoutes,
        ...incubatorRoutes,
        ...grantRoutes,
        ...flashRoutes,
        ...studentRoutes,
        ...ideaRoutes,
    ]
}
