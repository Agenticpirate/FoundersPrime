import { Metadata } from 'next'
import SearchHeader from '@/components/search/SearchHeader'
import SearchHero from '@/components/search/SearchHero'
import SearchFilters from '@/components/search/SearchFilters'
import SearchResults from '@/components/search/SearchResults'
import SearchSidebar from '@/components/search/SearchSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Search Deals & Programs',
  description:
    'Search verified startup deals, cloud credits, grants, accelerators, and SaaS discounts. Find the right opportunity for your startup.',
  alternates: {
    canonical: 'https://www.foundersprime.com/search',
  },
  // Search UIs are thin/query-driven; discourage indexing of empty/mock shells.
  robots: { index: true, follow: true },
}

export default function SearchPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
          <SearchHeader />
          <SearchHero />
          <SearchFilters />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <SearchResults />
            </div>
            <div className="lg:col-span-1">
              <SearchSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}