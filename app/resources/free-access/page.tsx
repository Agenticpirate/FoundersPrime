import ResourcesHeader from '@/components/resources/ResourcesHeader'
import { studentBenefits2026 } from '@/data/student-benefits-2026'
import StudentBenefitsContent from '@/components/StudentBenefitsContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
 title: 'Free Access Tools | Student Benefits',
 description: 'Professional tools and licenses available at no cost to students.',
}

export default function FreeAccessPage() {
 const freeBenefits = studentBenefits2026.filter(b => b.appCategory === 'Free Access');

 // Counts for sidebar
 const counts = {
 all: studentBenefits2026.length,
 free: freeBenefits.length,
 credits: studentBenefits2026.filter(b => b.appCategory === 'Credits & Savings').length,
 funding: studentBenefits2026.filter(b => b.appCategory === 'Funding & Opportunities').length
 }

 return (
 <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
 <Header />
 <main className="flex-1">
 <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
 <ResourcesHeader currentSection="Free Access" />
 <div className="mb-3 md:mb-6">
  <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
    STUDENT BENEFITS
  </div>
  <h1 className="text-xl md:text-3xl lg:text-4xl font-black text-ink uppercase tracking-tight leading-tight">Free Access Tools</h1>
  <p className="text-xs md:text-base text-gray-600 mt-1 md:mt-2">Professional tools and licenses available at no cost to students.</p>
 </div>

 <div className="mt-6">
 <StudentBenefitsContent benefits={freeBenefits} title="" />
 </div>
 </div>
 </main>
 <Footer />
 </div>
 )
}
