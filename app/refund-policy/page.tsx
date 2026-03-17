import RefundHeader from '@/components/refund/RefundHeader'
import RefundContent from '@/components/refund/RefundContent'
import RefundSidebar from '@/components/refund/RefundSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RefundPolicyPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
          <RefundHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <RefundContent />
            </div>
            <div className="lg:col-span-1">
              <RefundSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}