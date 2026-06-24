// @ts-nocheck
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import SingleDealContent from '@/components/deals/SingleDealContent'
import SingleDealSidebar from '@/components/deals/SingleDealSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DealProBadge from '@/components/deals/DealProBadge'
import DealLogo from '@/components/deals/DealLogo'
import { getAllCategories } from '@/lib/deals-database'
import { fetchDealBySlugFromDB, fetchAllDealSlugsFromDB, isDealsDbConfigured } from '@/lib/deals-server'
import { getStartupProgramUrl } from '@/lib/comprehensive-startup-urls'
import { checkProStatusServer } from '@/lib/auth/user-server'
import fs from 'fs'
import path from 'path'
import { accelerators2026 } from '@/data/accelerators-2026'
import { incubators2026 } from '@/data/incubators-2026'
import { grants2026 } from '@/data/grants-2026'
import { merchantReturnPolicy } from '@/lib/seo/merchant-return-policy'

// Statically generate deal pages and refresh them periodically (ISR).
// Content is identical for every visitor — the only per-user element (the
// "Pro" lock chip) is resolved client-side via <DealProBadge />.
export const revalidate = 3600 // re-generate at most once per hour
export const dynamicParams = true // allow slugs not returned by generateStaticParams

// Generate Metadata
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Supabase is the source of truth (same source as the deals list). Read it
  // first. Only fall back to the local JSON subset when the DB isn't
  // configured (pure local mode) — otherwise the stale JSON could resurrect
  // deleted deals or show outdated links.
  let deal = await fetchDealBySlugFromDB(params.slug)
  if (!deal && !isDealsDbConfigured()) {
    deal = getAllDeals().find((d: any) => d.slug === params.slug)
  }

  let title = 'Deal Not Found'
  let description = ''
  let image = 'https://www.foundersprime.com/og-image.png'

  if (deal) {
    title = `${deal.title} Deal - ${deal.value} Value`
    description = `Get ${deal.title} credits and save ${deal.value}. ${deal.description.substring(0, 150)}... Verified startup deal.`
    image = deal.logoUrl || image
  } else {
    const accelerator = accelerators2026.find(a => a.slug === params.slug)
    if (accelerator) {
      title = `${accelerator.name} - Accelerator Program`
      description = `Apply to ${accelerator.name}. ${accelerator.investment} funding, ${accelerator.equity} equity. ${accelerator.description.substring(0, 150)}`
      image = accelerator.logo || image
    } else {
      const incubator = incubators2026.find(i => i.slug === params.slug)
      if (incubator) {
        title = `${incubator.name} - Incubator Program`
        description = `Apply to ${incubator.name}. ${incubator.support} support. ${incubator.description.substring(0, 150)}`
        image = incubator.logo || image
      } else {
        const grant = grants2026.find(g => g.slug === params.slug)
        if (grant) {
          title = `${grant.name} - Grant Program`
          description = `Apply to ${grant.name}. ${grant.fundingAmount} funding. ${grant.description.substring(0, 150)}`
          image = grant.logo || image
        } else {
          return { title }
        }
      }
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.foundersprime.com/deals/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.foundersprime.com/deals/${params.slug}`,
      siteName: 'FoundersPrime',
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@FoundersPrime',
    },
  }
}

// Helper function to convert our Deal type to the format expected by the components
function convertDealForDisplay(deal: any, displaySimilarDeals: any[]) {
  const categories = getAllCategories()
  const category = categories.find(cat => cat.id === deal.category)

  return {
    id: deal.slug,
    title: deal.title,
    provider: deal.provider,
    category: category?.name || deal.category,
    value: deal.value,
    status: deal.status === 'active' ? 'Open - Rolling Basis' :
      deal.status === 'limited' ? 'Limited Time' :
        deal.status === 'coming-soon' ? 'Coming Soon' : 'Expired',
    description: deal.description,
    badges: [
      deal.status === 'active' ? 'Open - Rolling Basis' : deal.status,
      category?.name || deal.category,
      ...(deal.featured ? ['Recommended'] : [])
    ],
    stats: {
      appTime: deal.timeToApply || '~15 min',
      approval: '1-7 days',
      difficulty: deal.difficulty || 'Medium',
      successRate: deal.successRate || '75%+'
    },
    overview: deal.description,
    included: [
      { title: 'Value', description: deal.value },
      { title: 'Provider', description: deal.provider },
      { title: 'Category', description: category?.name || deal.category },
      ...(deal.savings ? [{ title: 'Savings', description: deal.savings }] : [])
    ],
    eligibility: deal.eligibility || ['Startups', 'Early stage companies'],
    steps: deal.applicationProcess?.map((step: string, index: number) => ({
      title: `Step ${index + 1}`,
      description: step
    })) || [
        { title: 'Check Eligibility', description: 'Review the requirements to ensure you qualify.' },
        { title: 'Gather Information', description: 'Prepare required documents and information.' },
        { title: 'Submit Application', description: 'Complete the application form.' },
        { title: 'Wait for Approval', description: 'Approval typically takes 5-7 business days.' }
      ],
    faq: [
      {
        question: 'Who is eligible for this deal?',
        answer: deal.eligibility?.join(', ') || 'Check the eligibility requirements above.'
      },
      {
        question: 'How long does approval take?',
        answer: 'Approval typically takes 5-7 business days, but may vary depending on the provider.'
      },
      {
        question: 'What do I need to apply?',
        answer: deal.requirements?.join(', ') || 'Basic company information and documentation.'
      }
    ],
    similarDeals: displaySimilarDeals,
    verification: {
      lastVerified: deal.lastUpdated || deal.lastVerified || new Date().toISOString().split('T')[0],
      appliedCount: typeof deal.appliedCount === 'number' ? deal.appliedCount : null
    },
    applicationUrl: deal.applicationUrl,
    actualDealUrl: deal.actualDealUrl,
    providerWebsite: deal.providerWebsite || deal.applicationUrl,
    tags: deal.tags || []
  }
}

// Global cache for deals to handle high concurrency
let cachedDeals: any[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

// Get all deals from the JSON file with memory caching
function getAllDeals() {
  try {
    const now = Date.now();
    if (cachedDeals && (now - lastCacheTime < CACHE_TTL)) {
      return cachedDeals;
    }

    const filePath = path.join(process.cwd(), 'public', 'data', 'all-deals.json')
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const deals = JSON.parse(fileContent)
      cachedDeals = Array.isArray(deals) ? deals : []
      lastCacheTime = now;
      return cachedDeals;
    }
  } catch (error) {
    console.error('Error loading deals:', error)
  }
  return cachedDeals || []
}

interface PageProps {
  params: {
    slug: string
  }
}

export default async function SingleDealPage({ params }: PageProps) {
  try {
    const allDeals = getAllDeals()

    // Log for debugging slug lookups


    // Supabase is the source of truth (same as the deals list). Read it first
    // so admin edits/removals are reflected. Only fall back to the local JSON
    // subset when the DB isn't configured (pure local mode); otherwise the
    // stale JSON would resurrect deleted deals.
    let dealData = await fetchDealBySlugFromDB(params.slug)
    if (!dealData && !isDealsDbConfigured()) {
      dealData = allDeals.find((d: any) => d.slug === params.slug)
    }

    // Check accelerators if not found in regular deals
    if (!dealData) {
      const accelerator = accelerators2026.find(a => a.slug === params.slug)
      if (accelerator) {

        // Map accelerator to deal format
        dealData = {
          id: accelerator.slug,
          slug: accelerator.slug,
          title: accelerator.name,
          provider: accelerator.name,
          category: 'accelerators',
          description: accelerator.description,
          shortDescription: accelerator.description,
          logoUrl: accelerator.logo,
          value: accelerator.investment,
          savings: accelerator.equity,
          applicationUrl: accelerator.applicationLink || accelerator.website,
          status: 'active',
          featured: true,
          eligibility: [accelerator.founderStage, `Focus: ${accelerator.focusArea}`],
          requirements: ['Early Stage Startup', accelerator.founderStage],
          tags: accelerator.features || [],
          timeToApply: accelerator.applicationDeadline ? `Deadline: ${accelerator.applicationDeadline}` : 'Rolling',
          difficulty: 'hard',
          successRate: 'Competitive',
          applicationProcess: [],
          recommended: true,
          verified: true,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          sourceVerified: true,
          dataSource: 'manual'
        }
      }
    }

    // Check incubators if not found
    if (!dealData) {
      const incubator = incubators2026.find(i => i.slug === params.slug)
      if (incubator) {

        // Map incubator to deal format
        dealData = {
          id: incubator.slug,
          slug: incubator.slug,
          title: incubator.name,
          provider: incubator.name,
          category: 'incubators',
          description: incubator.description,
          shortDescription: incubator.description,
          value: incubator.support,
          savings: incubator.equity,
          applicationUrl: incubator.applicationLink || incubator.website,
          logoUrl: incubator.logo,
          status: 'active',
          featured: true,
          eligibility: [incubator.founderStage, `Focus: ${incubator.focusArea}`],
          requirements: ['Early Stage Startup', incubator.founderStage],
          tags: incubator.features || [],
          timeToApply: incubator.applicationDeadline ? `Deadline: ${incubator.applicationDeadline}` : 'Rolling',
          difficulty: 'medium',
          successRate: 'Moderate',
          applicationProcess: [],
          recommended: true,
          verified: true,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          sourceVerified: true,
          dataSource: 'manual'
        }
      }
    }

    // Check grants if not found
    if (!dealData) {
      const grant = grants2026.find(g => g.slug === params.slug)
      if (grant) {

        // Map grant to deal format
        dealData = {
          id: grant.slug,
          slug: grant.slug,
          title: grant.name,
          provider: grant.organization,
          category: 'grants',
          description: grant.description,
          shortDescription: grant.description,
          value: grant.fundingAmount,
          savings: grant.equity,
          applicationUrl: grant.applicationLink || grant.website,
          logoUrl: grant.logo,
          status: 'active',
          featured: true,
          eligibility: [grant.eligibility],
          requirements: [grant.eligibility],
          tags: grant.features || [],
          timeToApply: grant.deadline ? `Deadline: ${grant.deadline}` : 'Rolling',
          difficulty: 'hard',
          successRate: 'Competitive',
          applicationProcess: [],
          recommended: true,
          verified: true,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          sourceVerified: true,
          dataSource: 'manual'
        }
      }
    }

    if (!dealData) {

      // Log similar slugs for debugging
      const similarSlugs = allDeals
        .filter((d: any) => d.slug && d.slug.includes(params.slug.substring(0, 5)))
        .map((d: any) => d.slug)
        .slice(0, 5)
      if (similarSlugs.length > 0) {

      }
      notFound()
    }

    // Validate that the deal data is complete and belongs to this slug
    // Verify slug mismatch
    if (dealData.slug !== params.slug) {
      console.error(`[Deal Lookup] CRITICAL: Slug mismatch! Requested: "${params.slug}", Got: "${dealData.slug}"`)
      notFound()
    }

    // Determine similar deals based on category/type
    let similarDeals = []

    if (dealData.category === 'grants') {
      // Find other grants
      similarDeals = grants2026
        .filter(g => g.slug !== params.slug)
        .slice(0, 4) // Limit to 4
        .map(g => ({
          title: g.name,
          value: g.fundingAmount,
          description: g.description.substring(0, 100) + '...',
          slug: g.slug
        }))
    } else if (dealData.category === 'accelerators') {
      // Find other accelerators
      similarDeals = accelerators2026
        .filter(a => a.slug !== params.slug)
        .slice(0, 4)
        .map(a => ({
          title: a.name,
          value: a.investment,
          description: a.description.substring(0, 100) + '...',
          slug: a.slug
        }))
    } else if (dealData.category === 'incubators') {
      // Find other incubators
      similarDeals = incubators2026
        .filter(i => i.slug !== params.slug)
        .slice(0, 4)
        .map(i => ({
          title: i.name,
          value: i.support,
          description: i.description.substring(0, 100) + '...',
          slug: i.slug
        }))
    } else {
      // Standard SaaS deals
      similarDeals = allDeals
        .filter((d: any) =>
          d.category === dealData.category &&
          d.slug !== dealData.slug &&
          d.status === 'active'
        )
        .slice(0, 6)
        .map((d: any) => ({
          title: d.title,
          value: d.value,
          description: d.shortDescription || d.description.substring(0, 100) + '...',
          slug: d.slug
        }))
    }

    const deal = convertDealForDisplay(dealData, similarDeals)

    // Resolve pro status server-side so the client never sees a loading flash
    const { isPro: serverIsPro, user: serverUser } = await checkProStatusServer()
    const serverIsNextFounder = !!serverUser?.isNextFounder

    // Structured Data (JSON-LD)
    const dealUrl = `https://www.foundersprime.com/deals/${params.slug}`
    const dealImage = dealData.logoUrl || `https://www.foundersprime.com/logos/${deal.provider.toLowerCase().replace(/\s+/g, '-')}.png`

    // Primary entity schema — typed by category so we describe each listing
    // accurately instead of forcing everything into Product (which mis-flags
    // free programs as shippable merchandise). Grants → MonetaryGrant,
    // accelerators/incubators → the offering Organization, and genuine
    // software offers (SaaS/cloud/ad credits) → Product + Offer.
    const cat = dealData.category
    let primarySchema: Record<string, any>

    if (cat === 'grants') {
      primarySchema = {
        '@context': 'https://schema.org',
        '@type': 'MonetaryGrant',
        name: deal.title,
        description: deal.description,
        url: dealUrl,
        funder: {
          '@type': 'Organization',
          name: deal.provider,
        },
      }
    } else if (cat === 'accelerators' || cat === 'incubators') {
      primarySchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: deal.provider,
        description: deal.description,
        url: dealUrl,
        ...(dealImage ? { logo: dealImage } : {}),
      }
    } else {
      // SaaS discounts, cloud credits, ad credits, etc. — genuine offers on
      // digital services. Product + Offer is the accurate representation.
      primarySchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: deal.title,
        description: deal.description,
        image: dealImage,
        brand: {
          '@type': 'Brand',
          name: deal.provider,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: dealUrl,
          hasMerchantReturnPolicy: merchantReturnPolicy,
        },
      }
    }

    // Breadcrumb trail — helps Google render breadcrumb rich results
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.foundersprime.com' },
        { '@type': 'ListItem', position: 2, name: 'Deals', item: 'https://www.foundersprime.com/deals' },
        { '@type': 'ListItem', position: 3, name: deal.category, item: `https://www.foundersprime.com/deals?category=${encodeURIComponent(dealData.category)}` },
        { '@type': 'ListItem', position: 4, name: deal.title, item: dealUrl },
      ],
    }

    // FAQ schema — built from the deal's own (data-derived) Q&A
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: deal.faq.map((f: { question: string; answer: string }) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    }

    const jsonLd = [primarySchema, breadcrumbSchema, faqSchema]

    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#000000] text-[#1a1a1a] dark:text-white transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">
          {/* Neo-brutalist hero header — gradient bg + mandala ornaments */}
          <div className="relative w-full bg-white dark:bg-[#000000] border-b-3 border-b-black dark:border-b-white/10 overflow-hidden transition-colors duration-300">
            {/* Subtle grid bg removed */}

            {/* Decorative mandalas */}
            <div className="absolute -top-16 -right-16 w-72 h-72 pointer-events-none opacity-[0.08] dark:opacity-[0.12] hidden md:block" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-white single-deal-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
                <circle cx="100" cy="100" r="40" />
                <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
                <circle cx="100" cy="100" r="3" fill="currentColor" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <g key={deg} transform={`rotate(${deg} 100 100)`}>
                    <line x1="100" y1="40" x2="100" y2="20" />
                    <circle cx="100" cy="20" r="2" fill="currentColor" />
                  </g>
                ))}
              </svg>
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 pointer-events-none opacity-[0.06] dark:opacity-[0.10] hidden md:block" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow single-deal-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.7">
                <circle cx="100" cy="100" r="50" />
                <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={100 + Math.cos((i * Math.PI) / 6) * 90}
                    y2={100 + Math.sin((i * Math.PI) / 6) * 90}
                  />
                ))}
                <circle cx="100" cy="100" r="2" fill="currentColor" />
              </svg>
            </div>

            <div className="relative max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
              {(() => {
                const subcategoryMap: Record<string, { label: string; href: string; parentLabel: string }> = {
                  'accelerators': { label: 'Accelerators', href: '/deals/accelerators', parentLabel: 'Programs' },
                  'incubators': { label: 'Incubators', href: '/deals/incubators', parentLabel: 'Programs' },
                  'grants': { label: 'Grants', href: '/deals/grants', parentLabel: 'Programs' },
                  'cloud-credits': { label: 'Cloud Credits', href: '/deals?category=cloud-credits', parentLabel: 'Deals' },
                  'saas-discounts': { label: 'SaaS Discounts', href: '/deals?category=saas-discounts', parentLabel: 'Deals' },
                  'ad-credits': { label: 'Ad Credits', href: '/deals?category=ad-credits', parentLabel: 'Deals' },
                }
                const sub = subcategoryMap[dealData.category]

                return (
                  <nav aria-label="Breadcrumb" className="flex mb-4">
                    <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      <li><a className="hover:text-black dark:hover:text-white transition-colors" href="/">Home</a></li>
                      <li className="text-gray-400 dark:text-gray-600">/</li>
                      <li><a className="hover:text-black dark:hover:text-white transition-colors" href="/deals">{sub ? sub.parentLabel : 'Deals'}</a></li>
                      {sub && (
                        <>
                          <li className="text-gray-400 dark:text-gray-600">/</li>
                          <li><a className="hover:text-black dark:hover:text-white transition-colors" href={sub.href}>{sub.label}</a></li>
                        </>
                      )}
                      <li className="text-gray-400 dark:text-gray-600">/</li>
                      <li aria-current="page">
                        <span className="text-black dark:text-white font-bold bg-accent-yellow/30 dark:bg-accent-yellow/20 px-2 py-0.5 border-2 border-black dark:border-white/10 rounded-sm truncate max-w-[180px] md:max-w-[280px] inline-block align-bottom">{deal.title}</span>
                      </li>
                    </ol>
                  </nav>
                )
              })()}

              {/* Header — logo + title block */}
              <div className="flex items-start gap-3 lg:gap-5">
                <div className="flex-shrink-0">
                  <div className="relative w-14 h-14 lg:w-20 lg:h-20 rounded-sm bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] overflow-hidden flex items-center justify-center">
                    <DealLogo
                      logoUrl={dealData.logoUrl}
                      brandIcon={dealData.brandIcon}
                      provider={dealData.provider}
                      size="sm"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-sm px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wide bg-emerald-100 dark:bg-emerald-950/20 text-black dark:text-emerald-400 border-2 border-black dark:border-white/10 shadow-[1px_1px_0px_#111] dark:shadow-[1px_1px_0px_rgba(255,255,255,0.05)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {deal.status}
                    </span>
                    <span className="inline-flex items-center rounded-sm px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wide bg-sky-100 dark:bg-sky-950/20 text-black dark:text-sky-400 border-2 border-black dark:border-white/10 shadow-[1px_1px_0px_#111] dark:shadow-[1px_1px_0px_rgba(255,255,255,0.05)]">
                      {deal.category}
                    </span>
                    <DealProBadge />
                  </div>
                  <h1 className="font-mono text-xl sm:text-2xl lg:text-[34px] font-black tracking-tight text-black dark:text-white leading-[1.1] mb-1.5 transition-colors duration-300">
                    {deal.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-gray-600 dark:text-gray-400">domain</span>
                      <span className="font-bold text-black dark:text-white">{deal.provider}</span>
                    </span>
                    <span className="hidden md:inline text-gray-400 dark:text-gray-600">·</span>
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-amber-600 dark:text-amber-500">verified</span>
                      <span>Verified · Last checked {new Date(deal.verification.lastVerified).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mandala spin keyframes */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes singleDealMandalaSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              @keyframes singleDealMandalaSpinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
              .single-deal-mandala-spin { animation: singleDealMandalaSpin 80s linear infinite; transform-origin: center; }
              .single-deal-mandala-spin-reverse { animation: singleDealMandalaSpinReverse 100s linear infinite; transform-origin: center; }
              @media (prefers-reduced-motion: reduce) {
                .single-deal-mandala-spin, .single-deal-mandala-spin-reverse { animation: none; }
              }
            ` }} />
          </div>

          {/* Main content */}
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
            <SingleDealContent
              deal={deal}
              initialIsPro={serverIsPro}
              initialIsNextFounder={serverIsNextFounder}
            />
          </div>
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error rendering deal page:', error)
    notFound()
  }
}

// Pre-render all known deal/program slugs at build time. Combined with
// `revalidate`, pages are served statically and refreshed hourly. Unknown
// slugs (e.g. newly added deals) are generated on first request via
// `dynamicParams` and then cached.
export async function generateStaticParams() {
  const slugs = new Set<string>()

  for (const deal of getAllDeals()) {
    if (deal?.slug) slugs.add(deal.slug)
  }
  // Include deals that live only in Supabase (the JSON file is a subset).
  for (const slug of await fetchAllDealSlugsFromDB()) {
    if (slug) slugs.add(slug)
  }
  for (const a of accelerators2026) {
    if (a?.slug) slugs.add(a.slug)
  }
  for (const i of incubators2026) {
    if (i?.slug) slugs.add(i.slug)
  }
  for (const g of grants2026) {
    if (g?.slug) slugs.add(g.slug)
  }

  return Array.from(slugs).map((slug) => ({ slug }))
}
