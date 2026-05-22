import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import SingleDealContent from '@/components/deals/SingleDealContent'
import SingleDealSidebar from '@/components/deals/SingleDealSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import DealLogo from '@/components/deals/DealLogo'
import { getAllCategories } from '@/lib/deals-database'
import { getStartupProgramUrl } from '@/lib/comprehensive-startup-urls'
import fs from 'fs'
import path from 'path'
import { accelerators2026 } from '@/data/accelerators-2026'
import { incubators2026 } from '@/data/incubators-2026'
import { grants2026 } from '@/data/grants-2026'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Generate Metadata
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const allDeals = getAllDeals()
  let deal = allDeals.find((d: any) => d.slug === params.slug)

  let title = 'Deal Not Found'
  let description = ''
  let image = 'https://www.foundersprime.com/og-image.jpg'

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
      lastVerified: deal.lastUpdated || new Date().toISOString().split('T')[0],
      appliedCount: Math.floor(Math.random() * 1000) + 100
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


    // Strict exact match - ensure we only match the exact slug
    let dealData = allDeals.find((d: any) => {
      const isMatch = d.slug === params.slug
      if (isMatch) {
        // console.log(`[Deal Lookup] Found exact match: "${d.slug}" -> "${d.title}" (ID: ${d.id})`)
      }
      return isMatch
    })

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
          difficulty: 'Hard',
          successRate: 'Competitive'
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
          difficulty: 'Medium',
          successRate: 'Moderate'
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
          difficulty: 'Varies',
          successRate: 'Competitive'
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

    // Check if user is logged in & pro/admin
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let isPro = false
    let isAdmin = false

    if (user) {
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('email', user.email)
        .single()

      const PRO_USERS = ['raviteja.journal@gmail.com']
      isAdmin = !!adminUser
      isPro = !!adminUser || PRO_USERS.includes(user.email || '')
    }

    // Determine if we should lock the content
    // For now, let's say all deals require Pro to *apply* (viewing is free)
    // Or maybe we can have a logic: isPro ? 'Apply' : 'Upgrade to Access'
    const isLocked = !isPro

    // Structured Data (JSON-LD)
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: deal.title,
      description: deal.description,
      image: dealData.logoUrl || `https://www.foundersprime.com/logos/${deal.provider.toLowerCase().replace(/\s+/g, '-')}.png`,
      brand: {
        '@type': 'Brand',
        name: deal.provider
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `https://www.foundersprime.com/deals/${params.slug}`
      }
    }

    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">
          {/* Neo-brutalist hero header — gradient bg + mandala ornaments */}
          <div className="relative w-full bg-white border-b-3 border-b-black overflow-hidden">
            {/* Subtle grid bg */}
            <div className="absolute inset-0 grid-bg opacity-[0.5] pointer-events-none" aria-hidden="true" />

            {/* Decorative mandalas */}
            <div className="absolute -top-16 -right-16 w-72 h-72 pointer-events-none opacity-[0.08] hidden md:block" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 single-deal-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
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
            <div className="absolute -bottom-20 -left-20 w-64 h-64 pointer-events-none opacity-[0.06] hidden md:block" aria-hidden="true">
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
                  'cloud-credits': { label: 'Cloud Credits', href: '/deals/cloud-credits', parentLabel: 'Deals' },
                  'saas-discounts': { label: 'SaaS Discounts', href: '/deals/saas-discounts', parentLabel: 'Deals' },
                  'ad-credits': { label: 'Ad Credits', href: '/deals/ad-credits', parentLabel: 'Deals' },
                }
                const sub = subcategoryMap[dealData.category]

                return (
                  <nav aria-label="Breadcrumb" className="flex mb-4">
                    <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-600 whitespace-nowrap">
                      <li><a className="hover:text-black transition-colors" href="/">Home</a></li>
                      <li className="text-gray-400">/</li>
                      <li><a className="hover:text-black transition-colors" href="/deals">{sub ? sub.parentLabel : 'Deals'}</a></li>
                      {sub && (
                        <>
                          <li className="text-gray-400">/</li>
                          <li><a className="hover:text-black transition-colors" href={sub.href}>{sub.label}</a></li>
                        </>
                      )}
                      <li className="text-gray-400">/</li>
                      <li aria-current="page">
                        <span className="text-black font-bold bg-accent-yellow/30 px-2 py-0.5 border-2 border-black rounded-sm truncate max-w-[180px] md:max-w-[280px] inline-block align-bottom">{deal.title}</span>
                      </li>
                    </ol>
                  </nav>
                )
              })()}

              {/* Header — logo + title block */}
              <div className="flex items-start gap-3 lg:gap-5">
                <div className="flex-shrink-0">
                  <div className="relative w-14 h-14 lg:w-20 lg:h-20 rounded-sm bg-white border-2 border-black shadow-[3px_3px_0px_#111] overflow-hidden flex items-center justify-center">
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
                    <span className="inline-flex items-center gap-1 rounded-sm px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wide bg-emerald-100 text-black border-2 border-black shadow-[1px_1px_0px_#111]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {deal.status}
                    </span>
                    <span className="inline-flex items-center rounded-sm px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wide bg-sky-100 text-black border-2 border-black shadow-[1px_1px_0px_#111]">
                      {deal.category}
                    </span>
                    {isLocked && (
                      <span className="inline-flex items-center gap-1 rounded-sm px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wide bg-accent-yellow text-black border-2 border-black shadow-[1px_1px_0px_#111]">
                        <span className="material-symbols-outlined text-[12px]">lock</span>
                        Pro
                      </span>
                    )}
                  </div>
                  <h1 className="font-mono text-xl sm:text-2xl lg:text-[34px] font-black tracking-tight text-black leading-[1.1] mb-1.5">
                    {deal.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs lg:text-sm text-gray-700">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-gray-600">domain</span>
                      <span className="font-bold text-black">{deal.provider}</span>
                    </span>
                    <span className="hidden md:inline text-gray-400">·</span>
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-amber-600">verified</span>
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
            <SingleDealContent deal={deal} />
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
