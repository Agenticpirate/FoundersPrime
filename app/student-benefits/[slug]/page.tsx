import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import SingleDealContent from '@/components/deals/SingleDealContent'
import SingleDealHero from '@/components/deals/SingleDealHero'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { studentBenefits2026, StudentBenefit } from '@/data/student-benefits-2026'
import { GlowingEffect } from '@/components/ui/GlowingEffect'
import { merchantReturnPolicy } from '@/lib/seo/merchant-return-policy'
import { checkProStatusServer } from '@/lib/auth/user-server'
import { getStudentBenefitBadge } from '@/lib/student-benefit-badges'

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
        badges: (() => {
            const promo = getStudentBenefitBadge(benefit)
            return [
                ...(promo ? [promo.label] : []),
                'Student Benefit',
                benefit.appCategory,
                benefit.category,
            ].filter(Boolean)
        })(),
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
                    <SingleDealHero
                        breadcrumbs={[
                            { label: 'Home', href: '/' },
                            { label: 'Students', href: '/student-benefits' },
                            { label: deal.title },
                        ]}
                        logo={{
                            logoUrl: benefitData.logo,
                            provider:
                                /youtube/i.test(benefitData.title || '') ||
                                /youtube/i.test(benefitData.slug || '')
                                    ? 'YouTube'
                                    : benefitData.company,
                            website: benefitData.url,
                            size: 'md',
                        }}
                        badges={[
                            { label: benefitData.appCategory, tone: 'yellow', pulse: true },
                            { label: benefitData.category, tone: 'purple' },
                            { label: 'Free', tone: 'amber' },
                        ]}
                        title={deal.title}
                        providerLabel={deal.provider}
                        verificationLabel={`Verified via ${benefitData.verification}`}
                    />

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
