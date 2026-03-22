import DealsHeader from '@/components/deals/DealsHeader'
import { studentBenefits2026 } from '@/data/student-benefits-2026'
import StudentBenefitsContent from '@/components/StudentBenefitsContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Student Benefits 2026 | FoundersPrime',
    description: 'The definitive list of free tools, credits, and funding for student founders.',
}

export default function StudentBenefitsPage() {
    // Counts
    const freeCount = studentBenefits2026.filter(b => b.appCategory === 'Free Access').length;
    const creditsCount = studentBenefits2026.filter(b => b.appCategory === 'Credits & Savings').length;
    const fundingCount = studentBenefits2026.filter(b => b.appCategory === 'Funding & Opportunities').length;

    const counts = {
        all: studentBenefits2026.length,
        free: freeCount,
        credits: creditsCount,
        funding: fundingCount
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
            <Header />
            <main className="flex-1">
                <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
                    <DealsHeader
                        currentSection="Student Benefits"
                    />

                    <div className="mb-3 md:mb-6">
                        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
                            STUDENT BENEFITS
                        </div>
                        <h1 className="text-xl md:text-4xl lg:text-5xl font-black mb-1.5 md:mb-3 font-display uppercase tracking-tight leading-tight">
                            Student Benefits 2026
                        </h1>
                        <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4 max-w-3xl font-medium">
                            Over <span className="font-bold text-black">$200k+</span> in free software, cloud credits, and funding opportunities for verified students.
                        </p>

                        <div className="flex flex-wrap gap-2 text-[10px] md:text-sm font-bold font-mono">
                            <div className="bg-white border-2 border-black px-2 md:px-3 py-0.5 md:py-1 shadow-[2px_2px_0_0_#000]">
                                LAST UPDATED: Q1 2026
                            </div>
                            <div className="bg-cyan-100 border-2 border-black px-2 md:px-3 py-0.5 md:py-1 shadow-[2px_2px_0_0_#000]">
                                {studentBenefits2026.length} VERIFIED DEALS
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <StudentBenefitsContent benefits={studentBenefits2026} title="" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
