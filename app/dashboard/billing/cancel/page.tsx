import { Metadata } from 'next'
import CancelHeader from '@/components/cancel/CancelHeader'
import CancelContent from '@/components/cancel/CancelContent'
import CancelSidebar from '@/components/cancel/CancelSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cancel Subscription',
  description: 'Cancel your FoundersPrime subscription.',
}

export default function CancelSubscriptionPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
          <CancelHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <CancelContent />
            </div>
            <div className="lg:col-span-1">
              <CancelSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
