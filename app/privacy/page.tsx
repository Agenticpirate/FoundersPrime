import PrivacyHeader from '@/components/privacy/PrivacyHeader'
import PrivacyContent from '@/components/privacy/PrivacyContent'
import PrivacySidebar from '@/components/privacy/PrivacySidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3EF]">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
          <PrivacyHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <PrivacyContent />
            </div>
            <div className="lg:col-span-1">
              <PrivacySidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}