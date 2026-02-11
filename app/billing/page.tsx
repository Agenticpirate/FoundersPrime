import { Metadata } from 'next'
import BillingHeader from '@/components/billing/BillingHeader'
import BillingContent from '@/components/billing/BillingContent'
import BillingSidebar from '@/components/billing/BillingSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Billing & Subscription | FoundersPrime',
  description: 'Manage your FoundersPrime subscription, billing information, and payment methods.',
}

export default function BillingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
          <BillingHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <BillingContent />
            </div>
            <div className="lg:col-span-1">
              <BillingSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}