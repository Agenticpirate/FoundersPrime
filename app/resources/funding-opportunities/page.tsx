import Link from 'next/link'
import ResourcesHeader from '@/components/resources/ResourcesHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StudentFundingHero from '@/components/deals/StudentFundingHero'
import StudentFundingGrid from '@/components/deals/StudentFundingGrid'

export const metadata = {
    title: 'Funding & Opportunities | Student Benefits 2026',
    description: 'Grants, scholarships, and competitions for student founders.',
}

export default function FundingOpportunitiesPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
            <Header />
            <main className="flex-1">
                <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
                    {/* Breadcrumb - Matching Accelerator Style */}
                    <ResourcesHeader currentSection="Funding & Opportunities" />

                    <StudentFundingHero />
                    <StudentFundingGrid />
                </div>
            </main>
            <Footer />
        </div>
    )
}
