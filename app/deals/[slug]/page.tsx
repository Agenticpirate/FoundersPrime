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

  let title = 'Deal Not Found | FoundersPrime'
  let description = ''
  let image = 'https://www.foundersprime.com/og-image.jpg'

  if (deal) {
    title = `${deal.title} Deal - ${deal.value} Value | FoundersPrime`
    description = `Get ${deal.title} credits and save ${deal.value}. ${deal.description.substring(0, 150)}... Verified startup deal.`
    image = deal.logoUrl || image
  } else {
    const accelerator = accelerators2026.find(a => a.slug === params.slug)
    if (accelerator) {
      title = `${accelerator.name} - Accelerator Program | FoundersPrime`
      description = `Apply to ${accelerator.name}. ${accelerator.investment} funding, ${accelerator.equity} equity. ${accelerator.description.substring(0, 150)}`
      image = accelerator.logo || image
    } else {
      const incubator = incubators2026.find(i => i.slug === params.slug)
      if (incubator) {
        title = `${incubator.name} - Incubator Program | FoundersPrime`
        description = `Apply to ${incubator.name}. ${incubator.support} support. ${incubator.description.substring(0, 150)}`
        image = incubator.logo || image
      } else {
        const grant = grants2026.find(g => g.slug === params.slug)
        if (grant) {
          title = `${grant.name} - Grant Program | FoundersPrime`
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
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">
          {/* Full-width header section */}
          <div className="w-full bg-white border-b-3 border-black">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="flex mb-4">
                <ol className="inline-flex items-center space-x-1 md:space-x-3 font-mono text-sm font-medium">
                  <li className="inline-flex items-center">
                    <a className="text-gray-500 hover:text-black" href="/">Home</a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
                      <a className="text-gray-500 hover:text-black" href="/programs">Programs</a>
                    </div>
                  </li>
                  {dealData.category === 'accelerators' && (
                    <li>
                      <div className="flex items-center">
                        <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
                        <a className="text-gray-500 hover:text-black" href="/programs/accelerators">Accelerators</a>
                      </div>
                    </li>
                  )}
                  {dealData.category === 'incubators' && (
                    <li>
                      <div className="flex items-center">
                        <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
                        <a className="text-gray-500 hover:text-black" href="/programs/incubators">Incubators</a>
                      </div>
                    </li>
                  )}
                  {dealData.category === 'grants' && (
                    <li>
                      <div className="flex items-center">
                        <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
                        <a className="text-gray-500 hover:text-black" href="/programs/grants">Grants</a>
                      </div>
                    </li>
                  )}
                  <li aria-current="page">
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
                      <span className="text-black bg-primary/20 px-2 py-0.5 rounded-sm border border-black">{deal.title}</span>
                    </div>
                  </li>
                </ol>
              </nav>

              {/* Header with badges and title */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-5 mb-4">
                    {/* Provider Logo */}
                    <DealLogo
                      logoUrl={dealData.logoUrl}
                      brandIcon={dealData.brandIcon}
                      provider={dealData.provider}
                      size="md"
                    />
                    <div className="flex-1">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-sm border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase bg-green-100">
                          {deal.status}
                        </span>
                        <span className="inline-flex items-center rounded-sm border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase bg-blue-100">
                          {deal.category}
                        </span>
                        {/* Premium Badge */}
                        {isLocked && (
                          <span className="inline-flex items-center gap-1 rounded-sm border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase bg-primary text-black">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            Pro Only
                          </span>
                        )}
                      </div>
                      <h1 className="font-mono text-2xl lg:text-3xl font-bold uppercase leading-tight text-black mb-2">
                        {deal.title}
                      </h1>
                      <div className="flex items-center gap-2 font-mono text-base font-medium text-gray-600">
                        <span className="material-symbols-outlined text-lg">domain</span>
                        <span>{deal.provider}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Apply button in header */}
                <div className="flex-shrink-0">
                  {isLocked ? (
                    <a
                      href="/pricing"
                      className="inline-flex items-center gap-2 rounded-sm border-3 border-black bg-gray-100 px-8 py-4 font-mono text-base font-bold uppercase text-gray-500 shadow-[2px_2px_0px_#111111] hover:bg-primary hover:text-black hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                      <span className="material-symbols-outlined">lock</span>
                      Unlock Deal
                    </a>
                  ) : (
                    <a
                      href={dealData.applicationUrl || getStartupProgramUrl(dealData.provider)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm border-3 border-black bg-primary px-8 py-4 font-mono text-base font-bold uppercase text-black shadow-[6px_6px_0px_#111111] hover:bg-primary-dark hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                      Apply Now
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main content - full width */}
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
