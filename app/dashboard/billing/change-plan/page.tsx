import { Metadata } from 'next'
import ChangePlanHeader from '@/components/change-plan/ChangePlanHeader'
import ChangePlanContent from '@/components/change-plan/ChangePlanContent'
import ChangePlanSidebar from '@/components/change-plan/ChangePlanSidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Change Plan',
  description: 'Change your FoundersPrime subscription plan.',
}

export default function ChangePlanPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
          <ChangePlanHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <ChangePlanContent />
            </div>
            <div className="lg:col-span-1">
              <ChangePlanSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
