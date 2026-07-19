import { Suspense } from 'react'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DealsHeader from '@/components/deals/DealsHeader'
import ProgramsHero from '@/components/deals/ProgramsHero'
import ProgramsContent from '@/components/deals/ProgramsContent'
import { checkProStatusServer } from '@/lib/auth/user-server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const type = typeof searchParams.type === 'string' ? searchParams.type : ''
  if (type === 'accelerators') {
    return {
      title: 'Startup Accelerators | Top Programs',
      description:
        'Discover top startup accelerators worldwide. Y Combinator, Techstars, 500 Global & more.',
      alternates: { canonical: 'https://www.foundersprime.com/programs/accelerators' },
    }
  }
  if (type === 'incubators') {
    return {
      title: 'Startup Incubators | Top Programs',
      description: 'Browse verified startup incubators and venture studios worldwide.',
      alternates: { canonical: 'https://www.foundersprime.com/programs/incubators' },
    }
  }
  if (type === 'grants') {
    return {
      title: 'Startup Grants | Non-Dilutive Funding',
      description: 'Non-dilutive grants and funding programs for founders.',
      alternates: { canonical: 'https://www.foundersprime.com/programs/grants' },
    }
  }
  return {
    title: 'Startup Programs — Accelerators, Incubators & Grants',
    description:
      'Browse 580+ verified startup programs: top accelerators (YC, Techstars), incubators, and non-dilutive grant funding — terms, deadlines, and equity in one place.',
    alternates: {
      canonical: 'https://www.foundersprime.com/programs',
    },
    openGraph: {
      title: 'Startup Programs | FoundersPrime',
      description:
        'Accelerators, incubators, and grants for founders — verified terms and apply links.',
      url: 'https://www.foundersprime.com/programs',
    },
  }
}

// Server Component page shell — runs server-side checks.
export default async function ProgramsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { isPro } = await checkProStatusServer()

  const typeParam = typeof searchParams.type === 'string' ? searchParams.type : 'all'
  const initialFilters = {
    search: typeof searchParams.q === 'string' ? searchParams.q : '',
    region: typeof searchParams.region === 'string' ? searchParams.region : 'All',
    subtype: typeof searchParams.subtype === 'string' ? searchParams.subtype : 'All',
    sort: typeof searchParams.sort === 'string' ? searchParams.sort : 'name',
    stage: typeof searchParams.stage === 'string' ? searchParams.stage : 'All',
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#000000] text-[#1a1a1a] dark:text-white transition-colors duration-300">
      {/* Ambient page atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-accent-yellow/[0.04] dark:bg-accent-yellow/[0.03] blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-sky-500/[0.03] dark:bg-sky-500/[0.02] blur-3xl rounded-full" />
      </div>
      <Header />
      <main className="relative flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 pt-6 md:pt-8 pb-10 lg:pb-14">
          <DealsHeader
            parentSection={{ name: 'Programs', href: '/programs' }}
            currentSection={
              typeParam === 'accelerators'
                ? 'Accelerators'
                : typeParam === 'incubators'
                  ? 'Incubators'
                  : typeParam === 'grants'
                    ? 'Grants'
                    : 'All Programs'
            }
          />
          <ProgramsHero />
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-16">
                <div className="h-10 w-10 rounded-full border-2 border-accent-yellow/30 border-t-accent-yellow animate-spin" />
              </div>
            }
          >
            <ProgramsContent
              initialIsPro={isPro}
              initialType={typeParam as any}
              initialFilters={initialFilters}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
