// Manual Deal Processing for Direct Data Entry
import { Deal } from './deals-database'

export interface RawDealData {
  [key: string]: any
}

// Extract company name from deal title or other fields
function extractCompanyName(deal: RawDealData): string {
  const title = deal.title || deal.name || ''

  // Common patterns to extract company names
  const patterns = [
    // "Company Name Promo code" -> "Company Name"
    /^(.+?)\s+(promo code|discount|offer|deal)$/i,
    // "Company API" -> "Company"
    /^(.+?)\s+API$/i,
    // Just use the first word if it looks like a company
    /^([A-Z][a-zA-Z0-9]+)/
  ]

  for (const pattern of patterns) {
    const match = title.match(pattern)
    if (match) {
      return match[1].trim()
    }
  }

  // Fallback: use first word or "Unknown"
  const firstWord = title.split(' ')[0]
  return firstWord || 'Unknown Company'
}

// Generate description from available data
function generateDescription(deal: RawDealData): string {
  const title = deal.title || deal.name || ''
  const company = extractCompanyName(deal)

  // Try to find description in various fields
  const desc = deal.description || deal.desc || deal.details || deal.summary || deal.about
  if (desc && desc.length > 10) {
    return desc
  }

  // Generate basic description
  if (title.toLowerCase().includes('promo code')) {
    return `Get exclusive promo code for ${company}. Special discount available for startups and new users.`
  }

  if (title.toLowerCase().includes('api')) {
    return `Access ${company} API with special pricing or credits. Developer-friendly integration for startups.`
  }

  return `Exclusive deal for ${company}. Special pricing and benefits available for qualifying startups.`
}

// Determine category from title/company
function determineCategory(deal: RawDealData): string {
  const title = (deal.title || deal.name || '').toLowerCase()
  const company = extractCompanyName(deal).toLowerCase()

  // API/Developer tools
  if (title.includes('api') || title.includes('developer')) {
    return 'saas-discounts'
  }

  // Cloud services
  if (title.includes('cloud') || title.includes('hosting') ||
    company.includes('aws') || company.includes('google') || company.includes('azure')) {
    return 'cloud-credits'
  }

  // Communication/productivity
  if (company.includes('notion') || company.includes('slack') ||
    company.includes('intercom') || company.includes('discord')) {
    return 'saas-discounts'
  }

  // Default to SaaS discounts
  return 'saas-discounts'
}

// Generate application URL
function generateApplicationUrl(deal: RawDealData): string {
  // Try to find URL in various fields
  const url = deal.url || deal.link || deal.applicationUrl || deal.website || deal.apply_url
  if (url) {
    return url
  }

  const company = extractCompanyName(deal).toLowerCase().replace(/\s+/g, '')
  return `https://${company}.com`
}

// Process raw deal data into proper format
export function processRawDeal(rawDeal: RawDealData): Deal {
  const company = extractCompanyName(rawDeal)
  const title = rawDeal.title || rawDeal.name || `${company} Deal`
  const description = generateDescription(rawDeal)
  const category = determineCategory(rawDeal)
  const applicationUrl = generateApplicationUrl(rawDeal)

  const deal: Deal = {
    id: `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title: title,
    provider: company,
    category: category as Deal['category'],
    description: description,
    shortDescription: description.substring(0, 120) + (description.length > 120 ? '...' : ''),
    value: rawDeal.value || rawDeal.amount || rawDeal.savings || 'Special Pricing',
    eligibility: rawDeal.eligibility || rawDeal.requirements || ['Startups', 'New users'],
    requirements: rawDeal.requirements || rawDeal.eligibility || ['Valid startup', 'New account'],
    applicationProcess: [
      'Visit the provider website',
      'Sign up for an account',
      'Apply the promo code or mention startup status',
      'Complete verification if required'
    ],
    proTips: [
      'Apply early as offers may have limited availability',
      'Keep documentation of your startup status ready',
      'Check terms and conditions for specific requirements'
    ],
    tags: [category, company, 'Startup Deal'],
    status: 'active' as const,
    applicationUrl: applicationUrl,
    providerWebsite: applicationUrl,
    featured: false,
    recommended: false,
    verified: true,
    difficulty: 'easy' as const,
    timeToApply: '5-10 minutes',
    lastUpdated: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    sourceVerified: false,
    dataSource: 'manual' as const
  }

  return deal
}

// Process array of raw deals
export function processRawDeals(rawDeals: RawDealData[]): Deal[] {
  return rawDeals.map(processRawDeal)
}

// Process deals from JSON import
export function processImportedDeals(deals: any[]): Deal[] {
  return deals.map(deal => {
    // Handle various JSON structures
    const processed = {
      title: deal.title || deal.name,
      value: deal.value || deal.amount || deal.discount,
      // Add any other fields from the JSON
      ...deal
    }

    return processRawDeal(processed)
  })
}