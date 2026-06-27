import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import SingleDealContent from '@/components/deals/SingleDealContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DealLogo from '@/components/deals/DealLogo'
import { studentBenefits2026, StudentBenefit } from '@/data/student-benefits-2026'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { merchantReturnPolicy } from '@/lib/seo/merchant-return-policy'
import { checkProStatusServer } from '@/lib/auth/user-server'

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
            appliedCount: null
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

        // Resolve pro status server-side so the client never sees a loading flash
        const { isPro: serverIsPro, user: serverUser } = await checkProStatusServer()
        const serverIsNextFounder = !!serverUser?.isNextFounder

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
                url: `https://www.foundersprime.com/student-benefits/${params.slug}`,
                hasMerchantReturnPolicy: merchantReturnPolicy
            }
        }

        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-[#000000] text-[#1a1a1a] dark:text-white transition-colors duration-300">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Header />
                <main className="flex-1">
                    {/* Neo-brutalist hero header — gradient bg + mandala ornaments */}
                    <div className="relative w-full bg-white dark:bg-[#000000] border-b-3 border-b-black dark:border-b-white/10 overflow-hidden transition-colors duration-300">
                        {/* Subtle grid bg removed */}

                        {/* Decorative mandalas */}
                        <div className="absolute -top-16 -right-16 w-72 h-72 pointer-events-none opacity-[0.08] dark:opacity-[0.12] hidden md:block" aria-hidden="true">
                            <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-white single-deal-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
                                <circle cx="100" cy="100" r="40" />
                                <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                                <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
                                <circle cx="100" cy="100" r="3" fill="currentColor" />
                                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                                    <g key={deg} transform={`rotate(${deg} 100 100)`}>
                                        <line x1="100" y1="40" x2="100" y2="20" />
                                        <circle cx="100" cy="20" r="2" fill="currentColor" />
                                    </g>
                                ))}
                            </svg>
                        </div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 pointer-events-none opacity-[0.06] dark:opacity-[0.10] hidden md:block" aria-hidden="true">
                            <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow single-deal-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.7">
                                <circle cx="100" cy="100" r="50" />
                                <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
                                {[...Array(12)].map((_, i) => (
                                    <line
                                        key={i}
                                        x1="100"
                                        y1="100"
                                        x2={100 + Math.cos((i * Math.PI) / 6) * 90}
                                        y2={100 + Math.sin((i * Math.PI) / 6) * 90}
                                    />
                                ))}
                                <circle cx="100" cy="100" r="2" fill="currentColor" />
                            </svg>
                        </div>

                        <div className="relative max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
                            {/* Breadcrumb */}
                            <nav aria-label="Breadcrumb" className="flex mb-4">
                                <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                    <li><a className="hover:text-black dark:hover:text-white transition-colors" href="/">Home</a></li>
                                    <li className="text-gray-400 dark:text-gray-600">/</li>
                                    <li><a className="hover:text-black dark:hover:text-white transition-colors" href="/student-benefits">Students</a></li>
                                    <li className="text-gray-400 dark:text-gray-600">/</li>
                                    <li aria-current="page">
                                        <span className="text-black dark:text-white font-bold bg-accent-yellow/30 dark:bg-accent-yellow/20 px-2 py-0.5 border-2 border-black dark:border-white/10 rounded-sm truncate max-w-[180px] md:max-w-[280px] inline-block align-bottom">{deal.title}</span>
                                    </li>
                                </ol>
                            </nav>

                            {/* Header — logo + title block */}
                            <div className="flex items-start gap-3 lg:gap-5">
                                <div className="flex-shrink-0">
                                    <div className="relative w-14 h-14 lg:w-20 lg:h-20 rounded-sm bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] overflow-hidden flex items-center justify-center">
                                        <DealLogo
                                            logoUrl={benefitData.logo}
                                            provider={benefitData.company}
                                            size="sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="mb-2 flex flex-wrap gap-1.5">
                                        <span className="inline-flex items-center gap-1 rounded-sm px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wide bg-emerald-100 dark:bg-emerald-950/20 text-black dark:text-emerald-400 border-2 border-black dark:border-white/10 shadow-[1px_1px_0px_#111] dark:shadow-[1px_1px_0px_rgba(255,255,255,0.05)]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            {benefitData.appCategory}
                                        </span>
                                        <span className="inline-flex items-center rounded-sm px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wide bg-purple-100 dark:bg-purple-950/20 text-black dark:text-purple-400 border-2 border-black dark:border-white/10 shadow-[1px_1px_0px_#111] dark:shadow-[1px_1px_0px_rgba(255,255,255,0.05)]">
                                            {benefitData.category}
                                        </span>
                                        <span className="inline-flex items-center rounded-sm px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wide bg-amber-100 dark:bg-amber-950/20 text-black dark:text-amber-400 border-2 border-black dark:border-white/10 shadow-[1px_1px_0px_#111] dark:shadow-[1px_1px_0px_rgba(255,255,255,0.05)]">
                                            Free
                                        </span>
                                    </div>
                                    <h1 className="font-mono text-xl sm:text-2xl lg:text-[34px] font-black tracking-tight text-black dark:text-white leading-[1.1] mb-1.5 transition-colors duration-300">
                                        {deal.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs lg:text-sm text-gray-700 dark:text-gray-300">
                                        <span className="inline-flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-gray-600 dark:text-gray-400">domain</span>
                                            <span className="font-bold text-black dark:text-white">{deal.provider}</span>
                                        </span>
                                        <span className="hidden md:inline text-gray-400 dark:text-gray-600">/</span>
                                        <span className="inline-flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-amber-600 dark:text-amber-500">verified</span>
                                            <span>Verified via {benefitData.verification}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mandala spin keyframes */}
                        <style dangerouslySetInnerHTML={{ __html: `
                            @keyframes singleDealMandalaSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                            @keyframes singleDealMandalaSpinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
                            .single-deal-mandala-spin { animation: singleDealMandalaSpin 80s linear infinite; transform-origin: center; }
                            .single-deal-mandala-spin-reverse { animation: singleDealMandalaSpinReverse 100s linear infinite; transform-origin: center; }
                            @media (prefers-reduced-motion: reduce) {
                                .single-deal-mandala-spin, .single-deal-mandala-spin-reverse { animation: none; }
                            }
                        ` }} />
                    </div>

                    {/* Main content */}
                    <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
                        <SingleDealContent
                            deal={deal}
                            basePath="/student-benefits"
                            initialIsPro={serverIsPro}
                            initialIsNextFounder={serverIsNextFounder}
                        />
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
