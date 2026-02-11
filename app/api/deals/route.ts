import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { accelerators2026 } from '@/data/accelerators-2026'
import { grants2026 } from '@/data/grants-2026'
import { incubators2026 } from '@/data/incubators-2026'
import { Deal } from '@/lib/deals-database'

const PUBLIC_DEALS_PATH = path.join(process.cwd(), 'public', 'data', 'all-deals.json')
const PROCESSED_DEALS_PATH = path.join(process.cwd(), 'data', 'processed-deals', 'all-deals.json')

// Helper to ensure directory exists
function ensureDirectoryExists() {
  const dir = path.dirname(PUBLIC_DEALS_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Convert specific types to generic Deal type
function normalizeAccelerator(acc: any): Deal {
  return {
    id: acc.id,
    slug: acc.slug,
    title: acc.name,
    provider: acc.name,
    category: 'startup-programs',
    subcategory: 'accelerators',
    description: acc.description,
    shortDescription: acc.description.substring(0, 150) + '...',
    value: acc.investment || 'Varies',
    eligibility: [acc.founderStage, acc.focusArea],
    requirements: [],
    applicationProcess: ['Visit website to apply'],
    tags: ['accelerator', ...acc.features || []],
    status: acc.applicationStatus === 'Active' ? 'active' : 'expired',
    applicationUrl: acc.applicationLink || acc.website,
    providerWebsite: acc.website,
    logoUrl: acc.logo,
    featured: false,
    recommended: false,
    verified: true,
    difficulty: 'medium',
    timeToApply: 'Varies',
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceVerified: true,
    dataSource: 'import'
  }
}

function normalizeGrant(grant: any): Deal {
  return {
    id: grant.id,
    slug: grant.slug,
    title: grant.name,
    provider: grant.organization,
    category: 'startup-programs',
    subcategory: 'grants',
    description: grant.description,
    shortDescription: grant.description.substring(0, 150) + '...',
    value: grant.fundingAmount || 'Varies',
    eligibility: [grant.eligibility],
    requirements: [],
    applicationProcess: ['Visit website to apply'],
    tags: ['grant', grant.type, ...grant.features || []],
    status: grant.applicationStatus === 'Active' ? 'active' : 'expired',
    applicationUrl: grant.applicationLink || grant.website,
    providerWebsite: grant.website,
    logoUrl: grant.logo,
    featured: false,
    recommended: false,
    verified: true,
    difficulty: 'medium',
    timeToApply: 'Varies',
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceVerified: true,
    dataSource: 'import'
  }
}

function normalizeIncubator(inc: any): Deal {
  return {
    id: inc.id,
    slug: inc.slug,
    title: inc.name,
    provider: inc.name,
    category: 'startup-programs',
    subcategory: 'incubators',
    description: inc.description,
    shortDescription: inc.description.substring(0, 150) + '...',
    value: inc.support || 'Varies',
    eligibility: [inc.founderStage, inc.focusArea],
    requirements: [],
    applicationProcess: ['Visit website to apply'],
    tags: ['incubator', ...inc.features || []],
    status: inc.applicationStatus === 'Active' ? 'active' : 'expired',
    applicationUrl: inc.applicationLink || inc.website,
    providerWebsite: inc.website,
    logoUrl: inc.logo,
    featured: false,
    recommended: false,
    verified: true,
    difficulty: 'medium',
    timeToApply: 'Varies',
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceVerified: true,
    dataSource: 'import'
  }
}

// Helper to read deals from file (checks multiple locations)
function readDeals(): Deal[] {
  let allDeals: Deal[] = []

  try {
    // 1. Get manually added deals from JSON
    if (fs.existsSync(PUBLIC_DEALS_PATH)) {
      const data = fs.readFileSync(PUBLIC_DEALS_PATH, 'utf8')
      try {
        const jsonDeals = JSON.parse(data)
        if (Array.isArray(jsonDeals)) {
          allDeals = [...allDeals, ...jsonDeals]
        }
      } catch (e) {
        console.error('Error parsing public deals JSON:', e)
      }
    } else if (fs.existsSync(PROCESSED_DEALS_PATH)) {
      const data = fs.readFileSync(PROCESSED_DEALS_PATH, 'utf8')
      try {
        const jsonDeals = JSON.parse(data)
        if (Array.isArray(jsonDeals)) {
          allDeals = [...allDeals, ...jsonDeals]
        }
      } catch (e) {
        console.error('Error parsing processed deals JSON:', e)
      }
    }

    // 2. Aggregate from TypeScript data files
    const acceleratedDeals = accelerators2026.map(normalizeAccelerator)
    const grantDeals = grants2026.map(normalizeGrant)
    const incubatorDeals = incubators2026.map(normalizeIncubator)

    // Merge, preventing duplicates by slug
    const existingSlugs = new Set(allDeals.map(d => d.slug))

    const newDeals = [
      ...acceleratedDeals,
      ...grantDeals,
      ...incubatorDeals
    ].filter(d => !existingSlugs.has(d.slug))

    allDeals = [...allDeals, ...newDeals]

  } catch (error) {
    console.error('Error reading deals:', error)
  }
  return allDeals
}

// Helper: Get only JSON deals (for writing)
function getJsonDealsOnly(): any[] {
  if (fs.existsSync(PUBLIC_DEALS_PATH)) {
    const data = fs.readFileSync(PUBLIC_DEALS_PATH, 'utf8')
    try {
      return JSON.parse(data)
    } catch (e) {
      return []
    }
  }
  // Fallback to processed if public missing
  if (fs.existsSync(PROCESSED_DEALS_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(PROCESSED_DEALS_PATH, 'utf8'))
    } catch (e) { return [] }
  }
  return []
}

// Helper to write deals to file (only writes the manual/JSON portion)
function writeDeals(deals: any[]): void {
  ensureDirectoryExists()
  // We will ONLY write deals that are NOT from the TS imports to the JSON file
  const dealsPersist = deals.filter(d => d.dataSource !== 'import')
  fs.writeFileSync(PUBLIC_DEALS_PATH, JSON.stringify(dealsPersist, null, 2))
}

// GET - Fetch all deals or filter by query params
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const slug = searchParams.get('slug')
    const id = searchParams.get('id')
    const featured = searchParams.get('featured')
    const recommended = searchParams.get('recommended')
    const limit = searchParams.get('limit')

    let deals = readDeals()

    // Filter by single deal lookup
    if (slug) {
      const deal = deals.find(d => d.slug === slug)
      if (deal) {
        return NextResponse.json({ success: true, deal })
      }
      return NextResponse.json({ success: false, error: 'Deal not found' }, { status: 404 })
    }

    if (id) {
      const deal = deals.find(d => d.id === id)
      if (deal) {
        return NextResponse.json({ success: true, deal })
      }
      return NextResponse.json({ success: false, error: 'Deal not found' }, { status: 404 })
    }

    // Apply filters
    if (category && category !== 'all') {
      // Filter by category OR subcategory (for AI subcategories)
      deals = deals.filter(d =>
        d.category === category ||
        d.subcategory === category ||
        (category === 'ai' && d.category === 'ai')
      )
    }

    if (status && status !== 'all') {
      deals = deals.filter(d => d.status === status)
    }

    if (featured === 'true') {
      deals = deals.filter(d => d.featured === true)
    }

    if (recommended === 'true') {
      deals = deals.filter(d => d.recommended === true)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      deals = deals.filter(d =>
        d.title?.toLowerCase().includes(searchLower) ||
        d.provider?.toLowerCase().includes(searchLower) ||
        d.description?.toLowerCase().includes(searchLower) ||
        d.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower))
      )
    }

    // Apply limit
    if (limit) {
      deals = deals.slice(0, parseInt(limit))
    }

    // Calculate stats
    const allDeals = readDeals()
    const stats = {
      total: allDeals.length,
      active: allDeals.filter(d => d.status === 'active').length,
      expired: allDeals.filter(d => d.status === 'expired').length,
      featured: allDeals.filter(d => d.featured).length,
      recommended: allDeals.filter(d => d.recommended).length,
      byCategory: allDeals.reduce((acc: Record<string, number>, d) => {
        acc[d.category] = (acc[d.category] || 0) + 1
        return acc
      }, {})
    }

    return NextResponse.json({
      success: true,
      deals,
      count: deals.length,
      stats
    })
  } catch (error) {
    console.error('Error fetching deals:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to load deals'
    }, { status: 500 })
  }
}

// POST - Create new deal(s)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Handle bulk import
    if (body.deals && Array.isArray(body.deals)) {
      const newDeals = body.deals.map((deal: any) => normalizeDeal(deal, 'import'))

      // See Note in PUT: we only modify the JSON part
      const jsonDeals = getJsonDealsOnly()
      const allDeals = [...jsonDeals] // Copy
      let added = 0
      let updated = 0

      for (const newDeal of newDeals) {
        const existingIndex = allDeals.findIndex(d => d.slug === newDeal.slug)
        if (existingIndex >= 0) {
          allDeals[existingIndex] = { ...allDeals[existingIndex], ...newDeal, updatedAt: new Date().toISOString() }
          updated++
        } else {
          allDeals.push(newDeal)
          added++
        }
      }

      writeDeals(allDeals)

      return NextResponse.json({
        success: true,
        message: `Added ${added} new deals, updated ${updated} existing deals`,
        totalDeals: allDeals.length,
        added,
        updated
      })
    }

    // Handle single deal creation
    const deal = body
    const jsonDeals = getJsonDealsOnly()
    const newDeal = normalizeDeal(deal, 'manual')

    // Check for duplicate slug in JSON
    if (jsonDeals.some(d => d.slug === newDeal.slug)) {
      newDeal.slug = `${newDeal.slug}-${Date.now()}`
    }
    // Note: We don't check TS files for slug collision here, but maybe we should to avoid confusing UI.
    // However, if we add it to JSON, it will override or coexist depending on readDeals logic.
    // Current readDeals filters TS deals if slug exists in JSON/allDeals (which starts with JSON).
    // So usually JSON overrides TS if same slug.

    jsonDeals.push(newDeal)
    writeDeals(jsonDeals)

    return NextResponse.json({
      success: true,
      deal: newDeal,
      message: 'Deal created successfully'
    })
  } catch (error) {
    console.error('Error creating deal:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create deal'
    }, { status: 500 })
  }
}

// PUT - Update existing deal
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, slug, ...updates } = body

    if (!id && !slug) {
      return NextResponse.json({
        success: false,
        error: 'Deal ID or slug is required'
      }, { status: 400 })
    }

    const deals = getJsonDealsOnly()
    const dealIndex = deals.findIndex(d => d.id === id || d.slug === slug)

    if (dealIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Deal not found in editable database (might be a static import)'
      }, { status: 404 })
    }

    // Update the deal
    deals[dealIndex] = {
      ...deals[dealIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    writeDeals(deals)

    return NextResponse.json({
      success: true,
      deal: deals[dealIndex],
      message: 'Deal updated successfully'
    })
  } catch (error) {
    console.error('Error updating deal:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update deal'
    }, { status: 500 })
  }
}

// DELETE - Delete deal(s)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const slug = searchParams.get('slug')
    const ids = searchParams.get('ids') // For bulk delete

    const deals = getJsonDealsOnly()

    if (ids) {
      // Bulk delete
      const idsToDelete = ids.split(',')
      const remainingDeals = deals.filter(d => !idsToDelete.includes(d.id))
      const deletedCount = deals.length - remainingDeals.length

      writeDeals(remainingDeals)

      return NextResponse.json({
        success: true,
        message: `Deleted ${deletedCount} deals`,
        deletedCount
      })
    }

    if (!id && !slug) {
      return NextResponse.json({
        success: false,
        error: 'Deal ID or slug is required'
      }, { status: 400 })
    }

    const dealIndex = deals.findIndex(d => d.id === id || d.slug === slug)

    if (dealIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Deal not found in editable database'
      }, { status: 404 })
    }

    const deletedDeal = deals.splice(dealIndex, 1)[0]
    writeDeals(deals)

    return NextResponse.json({
      success: true,
      message: 'Deal deleted successfully',
      deal: deletedDeal
    })
  } catch (error) {
    console.error('Error deleting deal:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete deal'
    }, { status: 500 })
  }
}

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100)
}

// Helper function to normalize and fill in missing deal fields
function normalizeDeal(deal: any, source: string): any {
  const now = new Date().toISOString()
  const title = deal.title || deal.name || deal.dealName || 'Untitled Deal'
  const provider = deal.provider || deal.company || deal.vendor || deal.brand || 'Unknown Provider'
  const description = deal.description || deal.details || deal.about || deal.summary || ''
  const value = deal.value || deal.discount || deal.amount || deal.savings || deal.credits || ''
  const url = deal.applicationUrl || deal.url || deal.link || deal.applyUrl || deal.website || ''

  // Auto-detect category from content
  const category = deal.category || detectCategory(JSON.stringify(deal))

  return {
    id: deal.id || `deal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    slug: deal.slug || generateSlug(title),
    title,
    provider,
    category,
    subcategory: deal.subcategory || '',
    description,
    shortDescription: deal.shortDescription || description.substring(0, 150) + (description.length > 150 ? '...' : ''),
    value,
    originalPrice: deal.originalPrice || '',
    discountedPrice: deal.discountedPrice || '',
    savings: deal.savings || '',
    eligibility: normalizeArray(deal.eligibility || deal.requirements || deal.criteria || []),
    requirements: normalizeArray(deal.requirements || deal.eligibility || []),
    applicationProcess: normalizeArray(deal.applicationProcess || deal.howToApply || ['Visit provider website', 'Complete application', 'Await approval']),
    proTips: normalizeArray(deal.proTips || deal.tips || []),
    tags: normalizeArray(deal.tags || deal.keywords || deal.labels || []),
    status: deal.status || 'active',
    expiryDate: deal.expiryDate || deal.expires || deal.expiry || '',
    applicationUrl: url,
    providerWebsite: deal.providerWebsite || url,
    logoUrl: deal.logoUrl || deal.logo || deal.image || '',
    featured: deal.featured || false,
    recommended: deal.recommended || false,
    verified: deal.verified || true,
    difficulty: deal.difficulty || 'medium',
    timeToApply: deal.timeToApply || '15 minutes',
    successRate: deal.successRate || '',
    lastUpdated: now,
    createdAt: deal.createdAt || now,
    updatedAt: now,
    sourceVerified: true,
    dataSource: source
  }
}

// Helper to normalize arrays from various formats
function normalizeArray(input: any): string[] {
  if (!input) return []
  if (Array.isArray(input)) return input.filter(Boolean).map(String)
  if (typeof input === 'string') {
    return input.split(/[,\n]/).map(s => s.trim()).filter(Boolean)
  }
  return []
}

// Auto-detect category from deal content
function detectCategory(text: string): string {
  const lower = text.toLowerCase()
  const keywords: Record<string, string[]> = {
    'cloud-credits': ['aws', 'azure', 'gcp', 'google cloud', 'cloud credits', 'infrastructure', 'digitalocean', 'heroku'],
    'ai': ['ai', 'artificial intelligence', 'machine learning', 'gpt', 'llm', 'openai', 'anthropic', 'claude'],
    'grants': ['grant', 'funding', 'non-dilutive', 'award', 'fellowship'],
    'accelerators': ['accelerator', 'yc', 'y combinator', 'techstars', 'batch', '500 startups'],
    'incubators': ['incubator', 'incubation'],
    'ad-credits': ['ad credits', 'advertising', 'google ads', 'facebook ads', 'meta ads', 'linkedin ads'],
    'marketing': ['marketing', 'seo', 'email marketing', 'social media', 'hubspot', 'mailchimp'],
    'development': ['developer', 'api', 'sdk', 'github', 'coding', 'vercel', 'netlify'],
    'finance': ['payment', 'banking', 'fintech', 'stripe', 'accounting', 'quickbooks'],
    'human-resources': ['hr', 'hiring', 'recruitment', 'payroll', 'employee'],
  }

  for (const [cat, kws] of Object.entries(keywords)) {
    if (kws.some(kw => lower.includes(kw))) return cat
  }
  return 'saas-discounts'
}
