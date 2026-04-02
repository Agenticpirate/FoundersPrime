import { Metadata } from 'next'
import TermsHeader from '@/components/terms/TermsHeader'
import TermsContent from '@/components/terms/TermsContent'
import TermsSidebar from '@/components/terms/TermsSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'FoundersPrime terms of service. Read our terms and conditions for using the platform.',
}

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
          <TermsHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <TermsContent />
            </div>
            <div className="lg:col-span-1">
              <TermsSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}