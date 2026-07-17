import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DealsHeader from '@/components/deals/DealsHeader'
import ProgramsHero from '@/components/deals/ProgramsHero'
import ProgramsContent from '@/components/deals/ProgramsContent'
import { checkProStatusServer } from '@/lib/auth/user-server'
import { FeaturedDealsProvider } from '@/context/FeaturedDealsContext'
import type { ProgramType } from '@/components/deals/ProgramsSidebar'

const TYPE_LABELS: Record<string, string> = {
  accelerators: 'Accelerators',
  incubators: 'Incubators',
  grants: 'Grants',
  all: 'All Programs',
}

/**
 * Shared server shell for /programs and /programs/{type} so subtype URLs
 * are real indexable pages (not soft redirects to ?type=).
 */
export default async function ProgramsTypePage({
  type = 'all',
  searchParams = {},
}: {
  type?: ProgramType
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { isPro } = await checkProStatusServer()
  const typeParam = type || 'all'
  const initialFilters = {
    search: typeof searchParams.q === 'string' ? searchParams.q : '',
    region: typeof searchParams.region === 'string' ? searchParams.region : 'All',
    subtype: typeof searchParams.subtype === 'string' ? searchParams.subtype : 'All',
    sort: typeof searchParams.sort === 'string' ? searchParams.sort : 'name',
  }

  const label = TYPE_LABELS[typeParam] || 'All Programs'

  return (
    <FeaturedDealsProvider initialFeaturedDeals={[]} initialIsPro={isPro}>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#000000] text-[#1a1a1a] dark:text-white transition-colors duration-300">
        <Header />
        <main className="flex-1">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6 pt-6 md:pt-8 pb-4 lg:pb-5">
            <DealsHeader
              parentSection={{ name: 'Programs', href: '/programs' }}
              currentSection={label}
            />
            <ProgramsHero />
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-violet-400 border-t-transparent" />
                </div>
              }
            >
              <ProgramsContent
                initialIsPro={isPro}
                initialType={typeParam}
                initialFilters={initialFilters}
              />
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </FeaturedDealsProvider>
  )
}
