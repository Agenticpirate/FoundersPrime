import ResourcesHeader from '@/components/resources/ResourcesHeader'
import ResourcesHero from '@/components/resources/ResourcesHero'
import ResourcesFilterBar from '@/components/resources/ResourcesFilterBar'
import ResourcesContent from '@/components/resources/ResourcesContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ResourcesPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
          <ResourcesHeader />
          <ResourcesHero />
          <ResourcesFilterBar />
          <ResourcesContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}