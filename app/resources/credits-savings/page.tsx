import ResourcesHeader from '@/components/resources/ResourcesHeader'
import { studentBenefits2026 } from '@/data/student-benefits-2026'
import StudentBenefitsContent from '@/components/StudentBenefitsContent'
import CreditsSavingsHero from '@/components/resources/CreditsSavingsHero'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Credits & Savings | Student Benefits',
  description: 'Exclusive savings and cloud credits to help you build for less.',
}

export default function CreditsSavingsPage() {
  const creditBenefits = studentBenefits2026.filter(b => b.appCategory === 'Credits & Savings')

  const categoryCount = new Set(creditBenefits.map(b => b.category)).size

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 pt-6 md:pt-8 pb-4 lg:pb-5">
          <ResourcesHeader
            currentSection="Credits & Savings"
            parentSection={{ name: 'Students', href: '/student-benefits' }}
          />

          <CreditsSavingsHero toolCount={creditBenefits.length} categoryCount={categoryCount} />

          <StudentBenefitsContent benefits={creditBenefits} title="" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
