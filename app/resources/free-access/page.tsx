import ResourcesHeader from '@/components/resources/ResourcesHeader'
import { studentBenefits2026 } from '@/data/student-benefits-2026'
import StudentBenefitsContent from '@/components/StudentBenefitsContent'
import FreeAccessHero from '@/components/resources/FreeAccessHero'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Free Access Tools | Student Benefits',
  description: 'Professional tools and licenses available at no cost to students.',
}

export default function FreeAccessPage() {
  const freeBenefits = studentBenefits2026.filter(b => b.appCategory === 'Free Access')

  const categoryCount = new Set(freeBenefits.map(b => b.category)).size

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-5">
          <ResourcesHeader
            currentSection="Campus Edge"
            parentSection={{ name: 'Students', href: '/student-benefits' }}
          />

          <FreeAccessHero toolCount={freeBenefits.length} categoryCount={categoryCount} />

          <StudentBenefitsContent benefits={freeBenefits} title="" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
