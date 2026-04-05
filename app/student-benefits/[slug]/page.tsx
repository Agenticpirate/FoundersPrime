import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import SingleDealContent from '@/components/deals/SingleDealContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DealLogo from '@/components/deals/DealLogo'
import { studentBenefits2026, StudentBenefit } from '@/data/student-benefits-2026'
import { GlowingEffect } from '@/components/ui/GlowingEffect'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Generate static params for all benefits
export async function generateStaticParams() {
    return studentBenefits2026
        .filter(benefit => benefit.slug)
        .map((benefit) => ({
            slug: benefit.slug,
        }))
}

// Generate Metadata
export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const benefit = studentBenefits2026.find((b) => b.slug === params.slug)

    if (!benefit) {
        return {
            title: 'Student Benefit Not Found',
        }
    }

    return {
        title: `${benefit.title} - ${benefit.value} for Students`,
        description: `${benefit.offerSummary} Get ${benefit.title} as a student. ${benefit.description?.substring(0, 150) || ''}`,
    }
}

// Helper function to convert StudentBenefit to Deal format
function convertBenefitToDeal(benefit: StudentBenefit, allBenefits: StudentBenefit[]) {
    // Find similar benefits — same specific category, different slug, shuffled for variety
    const sameCategoryBenefits = allBenefits
        .filter(b =>
            b.category === benefit.category &&
            b.slug !== benefit.slug &&
            b.slug
        )

    // If not enough in same category, fill from same appCategory
    const fallbackBenefits = allBenefits
        .filter(b =>
            b.appCategory === benefit.appCategory &&
            b.category !== benefit.category &&
            b.slug !== benefit.slug &&
            b.slug
        )

    // Combine: prefer same category, pad with appCategory fallbacks, shuffle
    const combined = [...sameCategoryBenefits, ...fallbackBenefits]
    // Simple deterministic shuffle based on slug chars for consistency
    const shuffled = combined.sort((a, b) => {
        const seed = benefit.slug?.length ?? 1
        return (a.slug!.charCodeAt(seed % a.slug!.length) - b.slug!.charCodeAt(seed % b.slug!.length))
    })

    const similarDeals = shuffled
        .slice(0, 6)
        .map(b => ({
            title: b.title,
            value: b.value,
            description: b.offerSummary,
            slug: b.slug!
        }))

    return {
        id: benefit.slug || benefit.title.toLowerCase().replace(/\s+/g, '-'),
        title: benefit.title,
        provider: benefit.company,
        category: benefit.category,
        value: benefit.value,
        status: 'Open - Rolling Basis',
        description: benefit.description || benefit.offerSummary,
        badges: [
            'Student Benefit',
            benefit.appCategory,
            benefit.category,
            ...(benefit.tags || [])
        ],
        stats: {
            appTime: benefit.stats?.appTime || '~10 min',
            approval: benefit.stats?.approval || '1-7 days',
            difficulty: benefit.stats?.difficulty || 'Easy',
            successRate: benefit.stats?.successRate || '85%+'
        },
        overview: benefit.description || benefit.offerSummary,
        included: benefit.included?.map((item, index) => ({
            title: `Benefit ${index + 1}`,
            description: item
        })) || [
                { title: 'Value', description: benefit.value },
                { title: 'Provider', description: benefit.company },
                { title: 'Category', description: benefit.category }
            ],
        eligibility: benefit.requirements || [benefit.eligibility],
        steps: benefit.applicationSteps?.map((step, index) => ({
            title: `Step ${index + 1}`,
            description: step
        })) || [
                { title: 'Check Eligibility', description: 'Review the requirements to ensure you qualify.' },
                { title: 'Gather Information', description: 'Prepare required documents and information.' },
                { title: 'Submit Application', description: 'Complete the application form.' },
                { title: 'Wait for Approval', description: 'Approval typically takes 5-7 business days.' }
            ],
        faq: benefit.faq || [
            {
                question: 'Who is eligible for this benefit?',
                answer: benefit.eligibility
            },
            {
                question: 'How do I verify my student status?',
                answer: `Verification method: ${benefit.verification}`
            },
            {
                question: 'What region is this available in?',
                answer: benefit.region
            }
        ],
        similarDeals: similarDeals,
        verification: {
            lastVerified: new Date().toISOString().split('T')[0],
            appliedCount: Math.floor(Math.random() * 5000) + 1000
        },
        applicationUrl: benefit.claimUrl || benefit.url,
        actualDealUrl: benefit.url,
        providerWebsite: benefit.url,
        tags: benefit.tags || []
    }
}

interface PageProps {
    params: {
        slug: string
    }
}

export default async function StudentBenefitDetailPage({ params }: PageProps) {
    try {


        // Find the benefit by slug
        const benefitData = studentBenefits2026.find((b) => b.slug === params.slug)

        if (!benefitData) {

            notFound()
        }

        const deal = convertBenefitToDeal(benefitData, studentBenefits2026)

        // Structured Data (JSON-LD)
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: deal.title,
            description: deal.description,
            image: benefitData.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(benefitData.company)}&size=200`,
            brand: {
                '@type': 'Brand',
                name: deal.provider
            },
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: `https://www.foundersprime.com/student-benefits/${params.slug}`
            }
        }

        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Header />
                <main className="flex-1 bg-gray-50">
                    {/* Full-width header section */}
                    <div className="w-full bg-white border-b-3 border-black">
                        <div className="max-w-[1400px] mx-auto px-3 md:px-6 py-2 md:py-4">
                            {/* Breadcrumb — same format as deals */}
                            <nav aria-label="Breadcrumb" className="flex mb-3 md:mb-4">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3 font-mono text-xs md:text-sm font-medium whitespace-nowrap">
                                    <li><a className="text-gray-500 hover:text-black" href="/">Home</a></li>
                                    <li className="flex items-center">
                                        <span className="material-symbols-outlined text-gray-400 text-sm mx-0.5 md:mx-1">chevron_right</span>
                                        <a className="text-gray-500 hover:text-black" href="/student-benefits">Students</a>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="material-symbols-outlined text-gray-400 text-sm mx-0.5 md:mx-1">chevron_right</span>
                                        <span className="text-black bg-primary/20 px-1.5 md:px-2 py-0.5 rounded-sm border border-black text-[11px] md:text-sm truncate max-w-[150px] md:max-w-[250px]">{deal.title}</span>
                                    </li>
                                </ol>
                            </nav>

                            {/* Header — no CTA button */}
                            <div className="flex items-start gap-3 lg:gap-5 mb-2 lg:mb-4">
                                <DealLogo
                                    logoUrl={benefitData.logo}
                                    provider={benefitData.company}
                                    size="sm"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="mb-1.5 flex flex-wrap gap-1 lg:gap-2">
                                        <span className="inline-flex items-center rounded-sm border border-black px-1.5 py-0.5 lg:px-3 lg:py-1 font-mono text-[9px] lg:text-xs font-bold uppercase bg-green-100">
                                            {benefitData.appCategory}
                                        </span>
                                        <span className="inline-flex items-center rounded-sm border border-black px-1.5 py-0.5 lg:px-3 lg:py-1 font-mono text-[9px] lg:text-xs font-bold uppercase bg-purple-100">
                                            {benefitData.category}
                                        </span>
                                    </div>
                                    <h1 className="font-mono text-base sm:text-xl lg:text-3xl font-bold uppercase leading-tight text-black mb-1">
                                        {deal.title}
                                    </h1>
                                    <div className="flex items-center gap-3 text-xs lg:text-sm font-mono text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">domain</span>
                                            {deal.provider}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">verified</span>
                                            {benefitData.verification}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="max-w-[1400px] mx-auto px-3 md:px-6 py-2 md:py-6">
                        <SingleDealContent deal={deal} freeAccess={true} basePath="/student-benefits" />
                    </div>
                </main>
                <Footer />
            </div>
        )
    } catch (error) {
        console.error('Error rendering student benefit page:', error)
        notFound()
    }
}
