import SearchHeader from '@/components/search/SearchHeader'
import SearchHero from '@/components/search/SearchHero'
import SearchFilters from '@/components/search/SearchFilters'
import SearchResults from '@/components/search/SearchResults'
import SearchSidebar from '@/components/search/SearchSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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