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
                        <div className="max-w-[1400px] mx-auto px-6 py-6">
                            {/* Breadcrumbs */}
                            <nav className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 font-mono">
                                <a className="hover:text-black underline decoration-2 underline-offset-2" href="/">Home</a>
                                <span className="text-gray-400">/</span>
                                <a className="hover:text-black underline decoration-2 underline-offset-2" href="/student-benefits">Student Benefits</a>
                                <span className="text-gray-400">/</span>
                                {benefitData.appCategory === 'Free Access' && (
                                    <>
                                        <a className="hover:text-black underline decoration-2 underline-offset-2" href="/resources/free-access">Campus Edge</a>
                                        <span className="text-gray-400">/</span>
                                    </>
                                )}
                                {benefitData.appCategory === 'Credits & Savings' && (
                                    <>
                                        <a className="hover:text-black underline decoration-2 underline-offset-2" href="/resources/credits-savings">Credits &amp; Savings</a>
                                        <span className="text-gray-400">/</span>
                                    </>
                                )}
                                {benefitData.appCategory === 'Funding & Opportunities' && (
                                    <>
                                        <a className="hover:text-black underline decoration-2 underline-offset-2" href="/resources/funding-opportunities">Funding &amp; Opportunities</a>
                                        <span className="text-gray-400">/</span>
                                    </>
                                )}
                                <span className="text-black font-bold">{deal.title}</span>
                            </nav>

                            {/* Header with badges and title */}
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-start gap-5 mb-4">
                                        {/* Provider Logo */}
                                        <DealLogo
                                            logoUrl={benefitData.logo}
                                            provider={benefitData.company}
                                            size="md"
                                        />
                                        <div className="flex-1">
                                            <div className="mb-3 flex flex-wrap gap-2">
                                                <span className="inline-flex items-center rounded-sm border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase bg-green-100">
                                                    {deal.status}
                                                </span>
                                                <span className="inline-flex items-center rounded-sm border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase bg-blue-100">
                                                    {benefitData.appCategory}
                                                </span>
                                                <span className="inline-flex items-center rounded-sm border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase bg-purple-100">
                                                    {benefitData.category}
                                                </span>
                                                {benefitData.benefitType && (
                                                    <span className="inline-flex items-center rounded-sm border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase bg-yellow-100">
                                                        {benefitData.benefitType}
                                                    </span>
                                                )}
                                            </div>
                                            <h1 className="font-mono text-2xl lg:text-3xl font-bold uppercase leading-tight text-black mb-2">
                                                {deal.title}
                                            </h1>
                                            <div className="flex items-center gap-2 font-mono text-base font-medium text-gray-600">
                                                <span className="material-symbols-outlined text-lg">domain</span>
                                                <span>{deal.provider}</span>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 font-mono text-sm text-gray-600">
                                                <span className="material-symbols-outlined text-base">verified</span>
                                                <span>Verification: {benefitData.verification}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Apply button in header */}
                                <div className="flex-shrink-0">
                                    <div className="relative rounded-sm">
                                        <GlowingEffect
                                            spread={40}
                                            glow={false}
                                            disabled={false}
                                            proximity={64}
                                            inactiveZone={0.01}
                                            borderWidth={2}
                                        />
                                        <a
                                            href={benefitData.claimUrl || benefitData.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative inline-flex items-center gap-2 rounded-sm border-3 border-black bg-primary px-8 py-4 font-mono text-base font-bold uppercase text-black shadow-[6px_6px_0px_#111111] hover:bg-primary-dark hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                        >
                                            Apply Now
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </a>
                                    </div>
                                    <div className="mt-2 text-center">
                                        <span className="text-xs font-mono text-gray-600">
                                            {benefitData.region} • {benefitData.value}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main content - full width */}
                    <div className="max-w-[1400px] mx-auto px-6 py-8">
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
