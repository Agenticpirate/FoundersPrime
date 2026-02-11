import { Metadata } from 'next'
import SuccessHeader from '@/components/success/SuccessHeader'
import SuccessContent from '@/components/success/SuccessContent'
import SuccessSidebar from '@/components/success/SuccessSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Subscription Success | FoundersPrime',
  description: 'Your FoundersPrime subscription has been activated successfully.',
}

export default function SubscriptionSuccessPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
          <SuccessHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <SuccessContent />
            </div>
            <div className="lg:col-span-1">
              <SuccessSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
