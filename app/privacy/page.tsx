import { Metadata } from 'next'
import PrivacyHeader from '@/components/privacy/PrivacyHeader'
import PrivacyContent from '@/components/privacy/PrivacyContent'
import PrivacySidebar from '@/components/privacy/PrivacySidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'FoundersPrime privacy policy. How we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-[#000000]">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 md:py-6">
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