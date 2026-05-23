import CloudCreditsHeader from '@/components/deals/CloudCreditsHeader'
import CloudCreditsHero from '@/components/deals/CloudCreditsHero'
import CloudCreditsStrategy from '@/components/deals/CloudCreditsStrategy'
import CloudCreditsGrid from '@/components/deals/CloudCreditsGrid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Cloud Credits',
  description: 'Verified cloud credit programs for startups — AWS, Google Cloud, Azure, DigitalOcean, and more. Eligibility, application steps, and tips, all in one place.',
}

export default function CloudCreditsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-5">
          <CloudCreditsHeader />
          <CloudCreditsHero />
          <CloudCreditsStrategy />
          <CloudCreditsGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
