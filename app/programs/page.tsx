import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DealsHeader from '@/components/deals/DealsHeader'
import ProgramsHero from '@/components/deals/ProgramsHero'
import ProgramsContent from '@/components/deals/ProgramsContent'
import { checkProStatusServer } from '@/lib/auth/user-server'
import { FeaturedDealsProvider } from '@/context/FeaturedDealsContext'
import { createClient } from '@/lib/supabase/server'
import type { Deal } from '@/lib/deals-database'

export const dynamic = 'force-dynamic'

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
    
    // Quick filter check similar to useFeatured.ts logic
    return rawDeals.map((d: any) => ({
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
      featuredUntil: d.featuredUntil || d.featured_until || '',
    })).filter(d => !!(d.featured && d.featuredUntil && new Date(d.featuredUntil).getTime() > Date.now()))
  } catch (e) {
    console.error('Error fetching featured deals server-side:', e)
    return []
  }
}

// Server Component page shell — runs server-side checks.
export default async function ProgramsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { isPro } = await checkProStatusServer()
  const featuredDeals = await getFeaturedDealsServer()

  const typeParam = typeof searchParams.type === 'string' ? searchParams.type : 'all'
  const initialFilters = {
    search: typeof searchParams.q === 'string' ? searchParams.q : '',
    region: typeof searchParams.region === 'string' ? searchParams.region : 'All',
    subtype: typeof searchParams.subtype === 'string' ? searchParams.subtype : 'All',
    sort: typeof searchParams.sort === 'string' ? searchParams.sort : 'name',
  }

  return (
    <FeaturedDealsProvider initialFeaturedDeals={featuredDeals} initialIsPro={isPro}>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#000000] text-[#1a1a1a] dark:text-white transition-colors duration-300">
        <Header />
        <main className="flex-1">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6 pt-6 md:pt-8 pb-4 lg:pb-5">
            <DealsHeader
              parentSection={{ name: 'Programs', href: '/programs' }}
              currentSection="All Programs"
            />
            <ProgramsHero />
            <Suspense fallback={
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-violet-400 border-t-transparent" />
              </div>
            }>
              <ProgramsContent initialIsPro={isPro} initialType={typeParam as any} initialFilters={initialFilters} />
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </FeaturedDealsProvider>
  )
}

export const metadata = {
  title: 'Startup Programs — Accelerators, Incubators & Grants',
  description: 'Browse 580+ verified startup programs: top accelerators (YC, Techstars), incubators, and $237M+ in non-dilutive grant funding — terms, deadlines, and equity in one place.',
  alternates: {
    canonical: 'https://www.foundersprime.com/programs',
  },
}
