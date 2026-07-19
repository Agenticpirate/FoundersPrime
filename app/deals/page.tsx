import { Suspense } from 'react'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DealsHeader from '@/components/deals/DealsHeader'
import DealsHero from '@/components/deals/DealsHero'
import DealsContent from '@/components/deals/DealsContent'
import DealsCrawlIndex from '@/components/deals/DealsCrawlIndex'
import { checkProStatusServer } from '@/lib/auth/user-server'
import { FeaturedDealsProvider } from '@/context/FeaturedDealsContext'
import { createClient } from '@/lib/supabase/server'
import type { Deal } from '@/lib/deals-database'
import {
  fetchDealsListForSSR,
  filterDealsForCategory,
} from '@/lib/deals-server'
import { dealsPageMetadata, categoryLabel } from '@/lib/seo/deals-metadata'

export const dynamic = 'force-dynamic'

type SearchParams = { [key: string]: string | string[] | undefined }

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  return dealsPageMetadata({
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    q: typeof searchParams.q === 'string' ? searchParams.q : undefined,
  })
}

async function getFeaturedDealsServer(): Promise<Deal[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key || url === 'http://localhost:54321') {
      return []
    }
    const supabase = createClient()
    const { data: rawDeals, error } = await supabase
      .from('deals')
      .select('*')
      .eq('featured', true)

    if (error || !rawDeals) return []

    const now = Date.now()
    const featured: any[] = []
    for (const d of rawDeals as any[]) {
      const featuredUntil = d.featuredUntil || d.featured_until || ''
      if (!(d.featured && featuredUntil && new Date(featuredUntil).getTime() > now)) continue
      featured.push({
        id: d.id,
        slug: d.slug,
        title: d.title,
        provider: d.provider,
        category: d.category,
        subcategory: d.subcategory,
        description: d.description,
        shortDescription: d.shortDescription || d.short_description || '',
        value: d.value,
        originalPrice: d.originalPrice || d.original_price || '',
        discountedPrice: d.discountedPrice || d.discounted_price || '',
        savings: d.savings || '',
        eligibility: d.eligibility || [],
        requirements: d.requirements || [],
        applicationProcess: d.applicationProcess || d.application_process || [],
        proTips: d.proTips || d.pro_tips || [],
        tags: d.tags || [],
        status: d.status,
        expiryDate: d.expiryDate || d.expiry_date || '',
        applicationUrl: d.applicationUrl || d.application_url || '',
        providerWebsite: d.providerWebsite || d.provider_website || '',
        logoUrl: d.logoUrl || d.logo_url || '',
        featured: d.featured,
        recommended: d.recommended,
        verified: d.verified,
        difficulty: d.difficulty || 'medium',
        timeToApply: d.timeToApply || d.time_to_apply || '',
        successRate: d.successRate || d.success_rate || '',
        lastUpdated: d.lastUpdated || d.last_updated || d.updated_at || '',
        createdAt: d.createdAt || d.created_at || '',
        updatedAt: d.updatedAt || d.updated_at || '',
        sourceVerified: d.sourceVerified || d.source_verified || true,
        dataSource: d.dataSource || d.data_source || 'supabase',
        featuredUntil,
      })
    }
    return featured
  } catch (e) {
    console.error('Error fetching featured deals server-side:', e)
    return []
  }
}

export default async function DealsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const category =
    typeof searchParams.category === 'string' ? searchParams.category : undefined

  const [{ isPro }, featuredDeals, allDeals] = await Promise.all([
    checkProStatusServer(),
    getFeaturedDealsServer(),
    // Full commercial catalog (same cap as /api/deals) so page count matches client
    fetchDealsListForSSR(5000),
  ])

  const crawlDeals = filterDealsForCategory(allDeals, category).slice(0, 200)
  const catLabel = categoryLabel(category)

  const initialFilters = {
    search: typeof searchParams.q === 'string' ? searchParams.q : '',
    category: category || '',
    subcategory: typeof searchParams.subcategory === 'string' ? searchParams.subcategory : '',
    value: typeof searchParams.value === 'string' ? searchParams.value : '',
    sort: typeof searchParams.sort === 'string' ? searchParams.sort : 'relevance',
  }

  return (
    <FeaturedDealsProvider initialFeaturedDeals={featuredDeals} initialIsPro={isPro}>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#000000] text-[#1a1a1a] dark:text-white transition-colors duration-300">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-accent-yellow/[0.04] dark:bg-accent-yellow/[0.03] blur-3xl rounded-full" />
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-sky-500/[0.03] dark:bg-sky-500/[0.02] blur-3xl rounded-full" />
        </div>
        <Header />
        <main className="relative flex-1">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6 pt-6 md:pt-8 pb-10 lg:pb-14">
            <DealsHeader
              parentSection={{ name: 'Deals', href: '/deals' }}
              currentSection={catLabel || 'All Deals'}
            />
            <DealsHero />
            {catLabel && (
              <h1 className="sr-only">
                {catLabel} — verified startup deals on FoundersPrime
              </h1>
            )}
            {/* Crawler / agent index: real <a> links in HTML without waiting for JS */}
            <DealsCrawlIndex deals={crawlDeals} category={category} />
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-16">
                  <div className="h-10 w-10 rounded-full border-2 border-accent-yellow/30 border-t-accent-yellow animate-spin" />
                </div>
              }
            >
              <DealsContent
                initialIsPro={isPro}
                initialFilters={initialFilters}
                initialDeals={allDeals}
              />
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </FeaturedDealsProvider>
  )
}
