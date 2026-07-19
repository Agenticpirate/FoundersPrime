// @ts-nocheck
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import SingleDealContent from '@/components/deals/SingleDealContent'
import SingleDealHero from '@/components/deals/SingleDealHero'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DealProBadge from '@/components/deals/DealProBadge'
import { getAllCategories } from '@/lib/deals-database'
import { fetchDealBySlugFromDB, fetchAllDealSlugsFromDB, isDealsDbConfigured } from '@/lib/deals-server'
import { resolveDealApplicationUrl } from '@/lib/comprehensive-startup-urls'
import { checkProStatusServer } from '@/lib/auth/user-server'
import fs from 'fs'
import path from 'path'
import { accelerators2026 } from '@/data/accelerators-2026'
import { incubators2026 } from '@/data/incubators-2026'
import { grants2026 } from '@/data/grants-2026'
import { merchantReturnPolicy } from '@/lib/seo/merchant-return-policy'
import { safeJsonLd } from '@/lib/safe-json-ld'

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
    title = `${deal.title || 'Deal'} Deal - ${deal.value || 'Verified'} Value`
    description = `Get ${deal.title || 'this deal'} credits and save ${deal.value || 'verified value'}. ${(deal.description || '').substring(0, 150)}... Verified startup deal.`
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
  const isProgram =
    deal.category === 'accelerators' ||
    deal.category === 'incubators' ||
    deal.category === 'grants' ||
    String(category?.name || '').toLowerCase().includes('accelerator') ||
    String(category?.name || '').toLowerCase().includes('incubator') ||
    String(category?.name || '').toLowerCase().includes('grant')

  const programKind =
    deal.category === 'grants'
      ? 'Grant'
      : deal.category === 'incubators'
        ? 'Incubator'
        : deal.category === 'accelerators'
          ? 'Accelerator'
          : category?.name || deal.category

  return {
    id: deal.slug,
    title: deal.title,
    provider: deal.provider,
    category: category?.name || deal.category,
    value: deal.value,
    status: deal.status === 'active'
      ? (isProgram ? 'Applications Open' : 'Open - Rolling Basis')
      : deal.status === 'limited' ? 'Limited Time'
        : deal.status === 'coming-soon' ? 'Coming Soon' : 'Expired',
    description: deal.description,
    badges: [
      deal.status === 'active' ? (isProgram ? 'Applications Open' : 'Open - Rolling Basis') : deal.status,
      programKind,
      ...(deal.featured && deal.featuredUntil && new Date(deal.featuredUntil).getTime() > Date.now()
        ? ['⭐ Featured']
        : deal.recommended
          ? ['Recommended']
          : []),
    ],
    // Program pages: Funding / Equity / Duration / Selectivity
    // Deal pages: Timeline / Approval / Difficulty / Signal
    stats: isProgram
      ? {
          appTime: deal.programDuration || deal.timeToApply || 'Varies',
          approval: deal.savings || deal.equity || 'See terms',
          difficulty: deal.value || deal.fundingAmount || 'Funding varies',
          successRate: deal.successRate || 'Competitive',
        }
      : {
          appTime: deal.timeToApply || '~15 min',
          approval: '1-7 days',
          difficulty: deal.difficulty || 'Medium',
          successRate: deal.successRate || '75%+',
        },
    overview: deal.description,
    included: [
      {
        title: isProgram
          ? (deal.category === 'grants' ? 'Funding' : 'Investment')
          : 'Value',
        description: deal.value,
      },
      ...(deal.savings || deal.equity
        ? [{ title: 'Equity', description: deal.savings || deal.equity }]
        : []),
      ...(deal.programDuration
        ? [{ title: 'Duration', description: deal.programDuration }]
        : []),
      { title: isProgram ? 'Program' : 'Provider', description: deal.provider },
      { title: 'Type', description: programKind },
    ],
    eligibility: deal.eligibility || (isProgram
      ? ['Early-stage startups', 'Founder-led companies']
      : ['Startups', 'Early stage companies']),
    steps: deal.applicationProcess?.map((step: string, index: number) => ({
      title: `Step ${index + 1}`,
      description: step
    })) || (isProgram
      ? [
          { title: 'Check fit', description: 'Confirm stage, focus area, and geo match the program.' },
          { title: 'Prep materials', description: 'Pitch deck, team bios, metrics, and product demo.' },
          { title: 'Apply', description: 'Submit through the official application portal.' },
          { title: 'Interview', description: 'If shortlisted, complete partner interviews and diligence.' },
        ]
      : [
          { title: 'Check Eligibility', description: 'Review the requirements to ensure you qualify.' },
          { title: 'Gather Information', description: 'Prepare required documents and information.' },
          { title: 'Submit Application', description: 'Complete the application form.' },
          { title: 'Wait for Approval', description: 'Approval typically takes 5-7 business days.' },
        ]),
    faq: isProgram
      ? [
          {
            question: `Who is eligible for ${deal.title}?`,
            answer: deal.eligibility?.filter(Boolean).join(' · ') || 'Review the eligibility section above for stage, geo, and focus requirements.',
          },
          {
            question: 'How competitive is admission?',
            answer: deal.successRate || 'Most top programs are highly selective. Strong traction and a clear founder narrative improve odds.',
          },
          {
            question: 'What do I need to apply?',
            answer: deal.requirements?.filter(Boolean).join(', ') || 'Pitch deck, team info, product overview, and basic metrics.',
          },
        ]
      : [
          {
            question: 'Who is eligible for this deal?',
            answer: deal.eligibility?.join(', ') || 'Check the eligibility requirements above.',
          },
          {
            question: 'How long does approval take?',
            answer: 'Approval typically takes 5-7 business days, but may vary depending on the provider.',
          },
          {
            question: 'What do I need to apply?',
            answer: deal.requirements?.join(', ') || 'Basic company information and documentation.',
          },
        ],
    similarDeals: displaySimilarDeals,
    verification: {
      lastVerified: deal.lastUpdated || deal.lastVerified || new Date().toISOString().split('T')[0],
      appliedCount: typeof deal.appliedCount === 'number' ? deal.appliedCount : null
    },
    applicationUrl: resolveDealApplicationUrl(deal),
    actualDealUrl: deal.actualDealUrl,
    providerWebsite:
      deal.providerWebsite && !String(deal.providerWebsite).includes('google.com/search')
        ? deal.providerWebsite
        : resolveDealApplicationUrl(deal),
    tags: deal.tags || [],
    isProgram,
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
          providerWebsite: accelerator.website,
          status: 'active',
          featured: true,
          eligibility: [
            accelerator.founderStage,
            `Focus: ${accelerator.focusArea}`,
            `Location: ${accelerator.location}`,
            `Region: ${accelerator.region}`,
          ].filter(Boolean),
          requirements: ['Early Stage Startup', accelerator.founderStage, accelerator.focusArea].filter(Boolean),
          tags: [
            ...(accelerator.features || []),
            accelerator.focusArea,
            accelerator.region,
            'Accelerator',
          ].filter(Boolean),
          timeToApply: accelerator.applicationDeadline
            ? `Deadline: ${accelerator.applicationDeadline}`
            : 'Rolling',
          difficulty: 'hard',
          successRate: 'Competitive',
          applicationProcess: [
            `Review ${accelerator.name} eligibility (${accelerator.founderStage}; focus: ${accelerator.focusArea}).`,
            'Prepare pitch deck, team bios, and traction metrics.',
            `Submit via ${accelerator.applicationLink || accelerator.website}.`,
            'Complete interviews if invited; accept offer and join the cohort.',
          ],
          recommended: true,
          verified: true,
          programDuration: accelerator.programDuration,
          equity: accelerator.equity,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          sourceVerified: true,
          dataSource: 'manual',
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
          providerWebsite: incubator.website,
          logoUrl: incubator.logo,
          status: 'active',
          featured: true,
          eligibility: [incubator.founderStage, `Focus: ${incubator.focusArea}`],
          requirements: ['Early Stage Startup', incubator.founderStage],
          tags: incubator.features || [],
          timeToApply: incubator.applicationDeadline ? `Deadline: ${incubator.applicationDeadline}` : 'Rolling',
          difficulty: 'medium',
          successRate: 'Moderate',
          applicationProcess: [
            `Review ${incubator.name} fit for your stage (${incubator.founderStage}).`,
            'Prepare materials and application narrative.',
            `Apply at ${incubator.applicationLink || incubator.website}.`,
            'Complete interviews and join if accepted.',
          ],
          programDuration: incubator.programDuration,
          equity: incubator.equity,
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
          description: d.shortDescription || `${(d.description || '').substring(0, 100)}...`,
          slug: d.slug
        }))
    }

    const deal = convertDealForDisplay(dealData, similarDeals)

    // Resolve pro status server-side so the client never sees a loading flash
    const { isPro: serverIsPro, user: serverUser } = await checkProStatusServer()
    const serverIsNextFounder = !!serverUser?.isNextFounder

    // Structured Data (JSON-LD)
    const dealUrl = `https://www.foundersprime.com/deals/${params.slug}`
    const dealImage = dealData.logoUrl || `https://www.foundersprime.com/logos/${(deal.provider || 'unknown').toLowerCase().replace(/\s+/g, '-')}.png`

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
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
        <Header />
        <main className="flex-1">
          {(() => {
            const subcategoryMap: Record<string, { label: string; href: string; parentLabel: string; parentHref: string }> = {
              accelerators: { label: 'Accelerators', href: '/programs?type=accelerators', parentLabel: 'Programs', parentHref: '/programs' },
              incubators: { label: 'Incubators', href: '/programs?type=incubators', parentLabel: 'Programs', parentHref: '/programs' },
              grants: { label: 'Grants', href: '/programs?type=grants', parentLabel: 'Programs', parentHref: '/programs' },
              'cloud-credits': { label: 'Cloud Credits', href: '/deals?category=cloud-credits', parentLabel: 'Deals', parentHref: '/deals' },
              'saas-discounts': { label: 'SaaS Discounts', href: '/deals?category=saas-discounts', parentLabel: 'Deals', parentHref: '/deals' },
              'ad-credits': { label: 'Ad Credits', href: '/deals?category=ad-credits', parentLabel: 'Deals', parentHref: '/deals' },
            }
            const sub = subcategoryMap[dealData.category]
            const breadcrumbs = [
              { label: 'Home', href: '/' },
              { label: sub?.parentLabel || 'Deals', href: sub?.parentHref || '/deals' },
              ...(sub ? [{ label: sub.label, href: sub.href }] : []),
              { label: deal.title },
            ]
            return (
              <SingleDealHero
                breadcrumbs={breadcrumbs}
                logo={{
                  logoUrl: dealData.logoUrl,
                  brandIcon: dealData.brandIcon,
                  provider: dealData.provider,
                  website: dealData.providerWebsite || dealData.applicationUrl,
                  size: 'md',
                }}
                badges={[
                  { label: deal.status, tone: 'yellow', pulse: true },
                  { label: deal.category, tone: 'sky' },
                ]}
                badgeSlot={<DealProBadge />}
                title={deal.title}
                providerLabel={deal.provider}
                verificationLabel={`Verified · ${new Date(deal.verification.lastVerified).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              />
            )
          })()}

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
