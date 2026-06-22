import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DealsHeader from '@/components/deals/DealsHeader'
import StudentBenefitsHero from '@/components/deals/StudentBenefitsHero'
import StudentBenefitsUnifiedContent from '@/components/deals/StudentBenefitsUnifiedContent'

export const metadata = {
  title: 'Student Benefits 2026 — Free Tools, Credits & Funding',
  description: 'Browse 450+ verified student benefits: top free software, cloud credits (Figma, GitHub), and funding opportunities (grants, scholarships) in one place.',
  alternates: {
    canonical: 'https://www.foundersprime.com/student-benefits',
  },
}

export default function StudentBenefitsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const typeParam = typeof searchParams.type === 'string' ? searchParams.type : 'all'
  const initialFilters = {
    search: typeof searchParams.q === 'string' ? searchParams.q : '',
    category: typeof searchParams.category === 'string' ? searchParams.category : 'All',
    subtype: typeof searchParams.subtype === 'string' ? searchParams.subtype : 'All',
    sort: typeof searchParams.sort === 'string' ? searchParams.sort : 'relevance',
    region: typeof searchParams.region === 'string' ? searchParams.region : 'All',
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#050505] text-[#1a1a1a] dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 pt-6 md:pt-8 pb-4 lg:pb-5">
          <DealsHeader
            parentSection={{ name: 'Student Benefits', href: '/student-benefits' }}
            currentSection="All Benefits"
          />
          <StudentBenefitsHero />
          <Suspense fallback={
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-cyan-400 border-t-transparent" />
            </div>
          }>
            <StudentBenefitsUnifiedContent initialType={typeParam as any} initialFilters={initialFilters} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
