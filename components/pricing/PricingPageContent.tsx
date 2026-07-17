'use client'

import React, { useState, useEffect, useRef } from 'react'
import PricingPlans from '@/components/pricing/PricingPlans'
import PricingPartnerLogos from '@/components/pricing/PricingPartnerLogos'
import { Currency } from '@/utils/currency'

const faqs = [
    {
        q: 'HOW FAST WILL I SEE SAVINGS?',
        a: 'Most founders claim their first deal within 3 minutes. A single cloud credit alone can save you $5K–$100K instantly — more than covering years of subscription.'
    },
    {
        q: 'ARE DEALS ACTUALLY VERIFIED?',
        a: 'Yes. Every deal is manually verified weekly by our team. Broken links are removed, expired offers flagged immediately, and new deals are added constantly. You never waste time on dead ends.'
    },
    {
        q: 'I AM A STUDENT — WHICH PLAN IS FOR ME?',
        a: "Next'Founder is $1/yr for active students, indie hackers, and early builders. You get premium AI & SaaS credits, hackathons, internships, fellowships, early-stage grants, and the full Opportunity Hub — tailored for student builders."
    },
    {
        q: 'WHAT IF I ONLY NEED ONE DEAL?',
        a: 'Even a single deal pays for your subscription several times over. The Founder plan at $48/yr gives you full, unlimited access across every category — immediately after checkout.'
    },
    {
        q: 'WHAT ARE THE ELIGIBILITY REQUIREMENTS?',
        a: 'Eligibility is set by each provider — not by FoundersPrime. Rules vary (students, incorporation, region, stage, etc.). We show the provider’s criteria on every listing. Your plan unlocks the catalog; it does not guarantee partner approval.'
    },
    {
        q: 'CAN I CANCEL MY SUBSCRIPTION ANYTIME?',
        a: 'Yes, you can cancel your subscription at any time with a single click from your dashboard. No contracts, no lock-ins. You will keep access to all benefits until the end of your billing period.'
    },
]

const testimonials = [
    {
        text: "Honestly, I signed up just to try it but ended up claiming $5,000 in AWS credits within 10 minutes. That alone made up for years of subscription.",
        author: "Arjun Malhotra",
        role: "Founder, QuickBuild"
    },
    {
        text: "We were struggling to find non-dilutive funding and had no idea about government grants. FoundersPrime's database helped us secure ₹10 Lakh in funding we would've never found on our own.",
        author: "Priya Sharma",
        role: "Co-founder, EdTechUp"
    },
    {
        text: "Every dollar counts when you're bootstrapping. I saved $8,000 on Stripe credits and dynamic tools. Anyone who doesn't use FoundersPrime should check their sanity — just sign up.",
        author: "Daniel Muller",
        role: "Founder, PayStack"
    },
    {
        text: "The pitch deck templates from their resources section was a lifesaver. Our investor actually complimented the structure. We closed our pre-seed round in just 3 weeks after using it!",
        author: "Maria Gonzalez",
        role: "Founder, SyncLabs"
    },
    {
        text: "I love the UI! Vetted deals platform before trying out FoundersPrime. Nothing else comes close. The deals are actually relevant and fully functional, not just random affiliate links.",
        author: "Raj Patel",
        role: "CTO, DevScale"
    },
    {
        text: "The YC application templates and strategy guides on FoundersPrime gave me such a huge edge. I got into the W24 batch and I honestly credit a lot of my prep to this platform.",
        author: "Sophie Chen",
        role: "Founder, Bloom AI"
    },
    {
        text: "Solo founder life is tough, but FoundersPrime makes it way easier. Google Cloud credits, Postman free tier, Notion Teams — my software costs are basically zero now. Love it.",
        author: "James Mitchell",
        role: "Solo Hacker, DevProd"
    },
    {
        text: "I went with the Legend plan and honestly, best money I've spent on my startup. Lifetime access means no renewals, and their support team is super responsive and helpful.",
        author: "Ananya Iyer",
        role: "Co-founder, GreenTech"
    },
    {
        text: "On our first month, we saved over $12,000 in SaaS tools. Notion, Airtable, GitHub — all covered. For us in Spain, it's massive. Every founder should know about this.",
        author: "Liam Torres",
        role: "Founder, SaaSly"
    }
]

export default function PricingPageContent() {
    const currency: Currency = 'USD'
    const testimonialsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const grid = testimonialsRef.current
        if (!grid) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    grid.querySelectorAll('.testimonial-card').forEach((el) => {
                        el.classList.add('visible')
                    })
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(grid)
        return () => observer.disconnect()
    }, [])

    // Testimonials Carousel State
    const [activeTestimonial, setActiveTestimonial] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    // FAQ State
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <main className="relative bg-[#fafafa] dark:bg-[#000000] text-[#1a1a1a] dark:text-white min-h-screen pb-16 transition-colors duration-300 selection:bg-accent-yellow selection:text-black">
            {/* Soft ambient */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[min(90vw,720px)] h-64 rounded-full bg-accent-yellow/[0.06] dark:bg-accent-yellow/[0.04] blur-3xl"
            />

            {/* ── Unified hero (desktop + mobile) ── */}
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-10 md:pt-14 pb-1 md:pb-4">
                <div className="max-w-2xl">
                    <p className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-accent-yellow mb-2.5 sm:mb-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" aria-hidden />
                        One dashboard · every deal
                    </p>

                    <h1 className="font-mono text-[1.55rem] leading-[1.12] sm:text-4xl sm:leading-[1.08] lg:text-[2.65rem] font-black tracking-tight text-gray-900 dark:text-white">
                        Built to ship{' '}
                        <span className="text-accent-yellow">faster</span>
                        .
                        <br />
                        Built to spend{' '}
                        <span className="text-accent-yellow">less</span>
                        .
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 text-[14px] sm:text-[15px] leading-relaxed mt-3.5 sm:mt-4 max-w-xl">
                        Vetted startup deals, credits, and programs in one place — stop hunting links and start
                        saving on every tool. Students start at{' '}
                        <span className="font-semibold text-gray-900 dark:text-white">$1/year</span>.
                    </p>

                    <div className="mobile-chip-scroll sm:flex sm:flex-wrap gap-2 mt-4 sm:mt-5 font-mono text-[10px] font-semibold">
                        {[
                            'Verified deals',
                            '$50K+ avg savings',
                            '4.9★ rated',
                            'Students $1/yr',
                        ].map((label) => (
                            <span
                                key={label}
                                className="inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 min-h-[32px] rounded-full border border-black/[0.06] dark:border-white/10 bg-white/80 dark:bg-white/[0.03] text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                            >
                                <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full" />
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Pricing Cards component ── */}
            <PricingPlans currency={currency} />



            {/* ── Partner logos strip ── */}
            <div className="border-y border-gray-200 dark:border-[#1b2028] bg-white dark:bg-[#000000]">
                <PricingPartnerLogos />
            </div>

            {/* ── Solo Ship or Build with Team ── */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="text-center mb-8 md:mb-10">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-accent-yellow block mb-2">
                        The comparison
                    </span>
                    <h2 className="font-mono text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                        Solo ship, or build with{' '}
                        <span className="text-accent-yellow">FoundersPrime</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Same goal. Two very different paths.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Alone */}
                    <div className="bg-white dark:bg-[#0b0c0e] border border-gray-200 dark:border-[#1b2028] p-6 md:p-8 rounded-xl flex flex-col justify-between transition-all">
                        <div>
                            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#1b2028] pb-4 mb-4">
                                <h3 className="font-mono text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">Going it alone</h3>
                                <span className="bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm">THE HARD WAY</span>
                            </div>
                            <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-3">Sourcing deals raw:</p>
                            <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-400">
                                <li className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined !text-[16px] text-red-500 mt-0.5">close</span>
                                    <span>Dozens of tabs, forms, and application portals</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined !text-[16px] text-red-500 mt-0.5">close</span>
                                    <span>Missed deadlines and expired startup deals</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined !text-[16px] text-red-500 mt-0.5">close</span>
                                    <span>Paying full price for tools you could get 30–90% off</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined !text-[16px] text-red-500 mt-0.5">close</span>
                                    <span>No clear view of which programs you actually qualify for</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined !text-[16px] text-red-500 mt-0.5">close</span>
                                    <span>Time spent on admin instead of shipping product</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-[#1b2028] pt-4">
                            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">OUTCOME</span>
                            <span className="font-mono text-[11px] font-black text-red-400 uppercase tracking-wider">Slow • Frustrated</span>
                        </div>
                    </div>

                    {/* FoundersPrime */}
                    <div className="bg-white dark:bg-[#0e0d0a] border border-gray-200 dark:border-accent-yellow/45 p-6 md:p-8 rounded-xl flex flex-col justify-between transition-all shadow-[0_0_20px_rgba(255,213,0,0.02)]">
                        <div>
                            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#1b2028] pb-4 mb-4">
                                <h3 className="font-mono text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">With FoundersPrime</h3>
                                <span className="bg-accent-yellow text-black font-mono text-[9px] font-black px-2 py-0.5 rounded-sm">RECOMMENDED</span>
                            </div>
                            <p className="text-[11px] font-mono text-accent-yellow uppercase tracking-wider mb-3">One Unified Dashboard for everything:</p>
                            <ul className="space-y-3 text-xs text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined !text-[16px] text-accent-yellow mt-0.5">check_circle</span>
                                    <span>One vetted dashboard for everything you qualify for</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined !text-[16px] text-accent-yellow mt-0.5">check_circle</span>
                                    <span>Deal, credit, and grant programs matched to your stage and stack</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined !text-[16px] text-accent-yellow mt-0.5">check_circle</span>
                                    <span>Eligibility, application info, and fine print in plain English</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined !text-[16px] text-accent-yellow mt-0.5">check_circle</span>
                                    <span>New perks and programs added every month — automatically</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="material-symbols-outlined !text-[16px] text-accent-yellow mt-0.5">check_circle</span>
                                    <span>More runway, less burn, and more focus on building</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-[#1b2028] pt-4">
                            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">OUTCOME</span>
                            <span className="font-mono text-[11px] font-black text-accent-yellow uppercase tracking-wider">Fast • Focused • Runway</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Everything you need. One Dashboard. ── */}
            <section className="bg-white/60 dark:bg-[#070707] border-y border-black/[0.05] dark:border-white/[0.06] py-12 md:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 md:mb-10">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-accent-yellow block mb-2">
                            What&apos;s inside
                        </span>
                        <h2 className="font-mono text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                            Eight categories.{' '}
                            <span className="text-accent-yellow">One dashboard.</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-xl mx-auto">
                            Every credit, deal, and program organized by what you&apos;re trying to save on.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                            { label: 'CLOUD CREDITS', desc: 'AWS, GCP, Azure and more to cut infrastructure spend.', icon: 'cloud', color: 'text-accent-yellow', badge: 'EXCLUSIVE', bg: 'hover:border-accent-yellow/30' },
                            { label: 'GRANTS', desc: 'Non-dilutive capital you don’t have to pay back.', icon: 'redeem', color: 'text-purple-400', badge: 'EXCLUSIVE', bg: 'hover:border-purple-500/30' },
                            { label: 'ACCELERATORS', desc: 'Programs that bring capital, mentorship, and distribution.', icon: 'rocket_launch', color: 'text-orange-400', badge: 'FEATURED', bg: 'hover:border-orange-500/30' },
                            { label: 'SAAS DEALS', desc: 'CRM, analytics, support, and dev tools at founder-only rates.', icon: 'payments', color: 'text-blue-400', badge: 'EXCLUSIVE', bg: 'hover:border-blue-500/30' },
                            { label: 'AI CREDITS', desc: 'Model, infra, and tooling credits to experiment cheaply.', icon: 'campaign', color: 'text-pink-400', badge: 'FEATURED', bg: 'hover:border-pink-500/30' },
                            { label: 'STARTUP TOOLS', desc: 'Dev, ops, and growth tools with extended trials or discounts.', icon: 'build', color: 'text-cyan-400', badge: 'EXCLUSIVE', bg: 'hover:border-cyan-500/30' },
                            { label: 'FOUNDERS RESOURCES', desc: 'Access ideas database, existing startups, templates, and more.', icon: 'folder_open', color: 'text-accent-yellow', badge: 'RESOURCES', bg: 'hover:border-accent-yellow/30' },
                            { label: 'STUDENT PERKS', desc: 'Special perks only for student and campus founders.', icon: 'school', color: 'text-accent-yellow', badge: 'INITIATIVES', bg: 'hover:border-accent-yellow/30' }
                        ].map((cat) => (
                            <div key={cat.label} className={`p-5 bg-white dark:bg-[#0b0c0e] border border-gray-200 dark:border-[#1b2028] rounded-xl transition-all duration-300 hover:-translate-y-1 ${cat.bg} group relative overflow-hidden`}>
                                <span className="absolute top-2 right-2 text-[8px] font-mono font-bold px-1.5 py-0.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    {cat.badge}
                                </span>
                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <span className={`material-symbols-outlined !text-[20px] ${cat.color}`}>{cat.icon}</span>
                                </div>
                                <h3 className="font-mono text-[11px] font-black uppercase tracking-wider text-gray-900 dark:text-white mb-1">{cat.label}</h3>
                                <p className="text-[10.5px] text-gray-600 dark:text-gray-400 leading-snug">{cat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <span className="font-mono text-[11px] font-bold text-gray-500 dark:text-gray-400">
                            Browse the full catalog after you join — new deals drop every month.
                        </span>
                    </div>
                </div>
            </section>

            {/* ── Accordion FAQ ── */}
            <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="text-center mb-8 md:mb-10">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-accent-yellow block mb-2">
                        FAQ
                    </span>
                    <h2 className="font-mono text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                        Common questions
                    </h2>
                </div>
                
                <div className="space-y-3">
                    {[
                        {
                            q: 'HOW FAST WILL I SEE SAVINGS?',
                            a: 'Many founders recoup their subscription from their first claim — often a single cloud or SaaS deal. Others stack savings over their first few weeks as they switch tools and apply to programs.'
                        },
                        {
                            q: 'ARE DEALS ACTUALLY VERIFIED?',
                            a: 'Yes. We verify every partner, link, and eligibility requirement before listing. If a perk breaks, we fix or replace it — so you’re not chasing dead links.'
                        },
                        {
                            q: 'I AM A STUDENT — WHICH PLAN IS FOR ME?',
                            a: "Next'Founder is $1/yr for active students, student indie hackers, and student founders building their first startup — no revenue or funding required. You get premium AI & SaaS credits, student-exclusive hackathons, fellowships, campus programs, early-stage grants, and the full Opportunity Hub."
                        },
                        {
                            q: 'WHY IS IT ONLY ONE DASHBOARD?',
                            a: 'FoundersPrime is built to replace scattered Notion pages, random discount codes, and FOMO about secret deals. Everything is in one place, and you can filter by stage, stack, and geography in seconds.'
                        },
                        {
                            q: 'WHO SETS ELIGIBILITY — AND DO I AUTOMATICALLY QUALIFY?',
                            a: 'Eligibility is set by each deal, credit, or grant provider — not by FoundersPrime. Criteria vary widely (students only, incorporated startups, region, stage, revenue caps, etc.). We surface the provider’s rules on every listing so you can check before you apply. A FoundersPrime plan unlocks access to the catalog; it does not guarantee approval from any partner. Final decisions always rest with the provider.'
                        },
                        {
                            q: 'CAN I CANCEL MY SUBSCRIPTION ANYTIME?',
                            a: 'Yes, you can cancel your subscription at any time with a single click from your dashboard. No contracts, no lock-ins. You will keep access to all benefits until the end of your billing period.'
                        }
                    ].map((faq, idx) => {
                        const isOpen = openFaq === idx
                        return (
                            <div
                                key={faq.q}
                                onMouseEnter={() => setOpenFaq(idx)}
                                onMouseLeave={() => setOpenFaq(null)}
                                className="border border-gray-200 dark:border-[#1b2028] bg-white dark:bg-[#0b0c0e]/60 rounded-lg overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between p-4 text-left font-mono font-bold text-[12px] uppercase tracking-wider text-gray-900 dark:text-white hover:text-accent-yellow transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center text-accent-yellow font-black font-mono text-[11px]">?</span>
                                        <span>{faq.q}</span>
                                    </div>
                                    <span className="material-symbols-outlined text-[18px] text-gray-500 dark:text-gray-400 transition-transform">
                                        {isOpen ? 'remove' : 'add'}
                                    </span>
                                </button>
                                
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${
                                        isOpen ? 'max-h-[320px] border-t border-gray-200 dark:border-white/5 opacity-100 p-4' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="text-[12.5px] text-gray-700 dark:text-gray-300 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Eligibility note — provider-controlled, not FP-guaranteed */}
                <div className="mt-8 border border-accent-yellow/25 bg-accent-yellow/[0.04] rounded-xl p-4 md:p-5 flex items-start gap-3">
                    <span className="material-symbols-outlined !text-[18px] text-accent-yellow flex-shrink-0 mt-0.5">info</span>
                    <div className="min-w-0">
                        <p className="font-mono text-[10px] font-black uppercase tracking-wider text-accent-yellow mb-1.5">
                            Eligibility is set by providers
                        </p>
                        <p className="text-[12.5px] text-gray-600 dark:text-gray-400 leading-relaxed">
                            Every deal, credit, and grant has its own rules defined by the{' '}
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                offering partner
                            </span>
                            — company stage, student status, location, incorporation, and more.
                            FoundersPrime organizes the catalog and shows those requirements on each
                            listing. We do{' '}
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                not
                            </span>{' '}
                            approve applications or guarantee that you will qualify. Always read the
                            provider criteria on the deal page before you apply.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative bg-gray-100/50 dark:bg-[#000000] pt-14 pb-8 border-y border-gray-200 dark:border-[#1b2028] overflow-hidden">
                {/* Ambient glow blobs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-yellow/[0.04] rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />


                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section header */}
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-[0.25em] text-accent-yellow mb-3">
                            <span className="w-4 h-px bg-accent-yellow/60" />
                            FOUNDER REVIEWS
                            <span className="w-4 h-px bg-accent-yellow/60" />
                        </span>
                        <h2 className="font-mono text-2xl md:text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-white leading-tight">
                            DON&apos;T TAKE OUR WORD{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-black bg-accent-yellow px-2 py-0.5">FOR IT.</span>
                            </span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 font-mono text-xs md:text-sm max-w-xl mx-auto mt-3">
                            “FoundersPrime helped us unlock over <strong>$12,000</strong> in savings in our first year.”
                        </p>
                    </div>

                    {/* Unified Infinite Horizontal Marquee */}
                    <div ref={testimonialsRef} className="relative w-full overflow-hidden py-4">
                        {/* Gradient fades on edges */}
                        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-100/50 dark:from-[#000000] to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-100/50 dark:from-[#000000] to-transparent z-10 pointer-events-none" />

                        <div className="flex gap-5 w-max marquee hover:[animation-play-state:paused] py-2">
                            {[...testimonials, ...testimonials].map((t, idx) => (
                                <div
                                    key={idx}
                                    className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 testimonial-card group relative flex flex-col justify-between rounded-xl p-5 md:p-6 border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-[#0d0d0d] backdrop-blur-sm hover:border-accent-yellow/30 hover:bg-gray-100/80 dark:hover:bg-white/[0.06] transition-all duration-300"
                                >
                                    {/* Subtle gradient top border glow on hover */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/0 to-transparent group-hover:via-accent-yellow/40 transition-all duration-500 rounded-t-xl" />

                                    <div>
                                        {/* Stars */}
                                        <div className="flex items-center gap-0.5 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className="material-symbols-outlined !text-[14px] text-accent-yellow"
                                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                                >
                                                    star
                                                </span>
                                            ))}
                                        </div>

                                        {/* Quote mark */}
                                        <span className="font-mono text-[30px] leading-none text-accent-yellow/20 font-black block -mb-2">&ldquo;</span>

                                        {/* Review text */}
                                        <p className="text-[12px] md:text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed mb-4 md:mb-5 italic">
                                            {t.text.includes('$5,000') ? (
                                                <>Honestly, I signed up just to try it but ended up claiming <strong>$5,000</strong> in AWS credits within 10 minutes. That alone made up for years of subscription. Wish I&apos;d found it sooner.</>
                                            ) : t.text.includes('$8,000') ? (
                                                <>Every dollar counts when you&apos;re bootstrapping. I saved <strong>$8,000</strong> on Stripe credits and dynamic tools. Anyone who doesn&apos;t use FoundersPrime should check their sanity — just sign up.</>
                                            ) : t.text.includes('$12,000') ? (
                                                <>On our first month, we saved over <strong>$12,000</strong> in SaaS tools. Notion, Airtable, GitHub — all covered. For us in Spain, it&apos;s massive. Every founder should know about this.</>
                                            ) : t.text}
                                        </p>
                                    </div>

                                    {/* Author */}
                                    <div className="border-t border-gray-200 dark:border-white/[0.06] pt-3.5 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center font-mono text-xs font-black text-accent-yellow uppercase flex-shrink-0">
                                            {t.author[0]}
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] md:text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-wider">{t.author}</h4>
                                            <p className="text-[9px] md:text-[10px] text-gray-500 font-mono">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Bottom stat strip */}
                    <div className="mt-6 md:mt-8 grid grid-cols-3 gap-1 md:flex md:flex-wrap items-center justify-center md:gap-16 border-t border-gray-200 dark:border-white/5 pt-6 max-w-3xl mx-auto">
                        {[
                            { value: '100+', label: 'Vetted Deals', suffix: 'active catalog' },
                            { value: '$50K+', label: 'Avg. Savings', suffix: 'tracked per member' },
                            { value: '4.9★', label: 'Rating', suffix: 'across tools & SaaS' },
                        ].map((stat) => (
                            <div key={stat.suffix} className="text-center border-r last:border-r-0 border-gray-200 dark:border-white/5 md:border-r-0 px-1 md:px-0">
                                <p className="font-mono text-[16px] sm:text-lg md:text-3xl font-black text-accent-yellow leading-none">{stat.value}</p>
                                <p className="font-mono text-[9px] sm:text-[10px] md:text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mt-1 md:mt-2">{stat.label}</p>
                                <p className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-gray-500 mt-1">{stat.suffix}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes spin-slow {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .animate-spin-slow {
                        animation: spin-slow 20s linear infinite;
                    }
                    .testimonial-card {
                        opacity: 0;
                        transform: translateY(28px);
                        transition: opacity 0.55s ease, transform 0.55s ease;
                    }
                    .testimonial-card.visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    @keyframes testimonialFadeIn {
                        from { opacity: 0; transform: translateY(6px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .testimonial-card {
                            opacity: 1;
                            transform: none;
                        }
                        @keyframes testimonialFadeIn {
                            from { opacity: 1; transform: none; }
                            to   { opacity: 1; transform: none; }
                        }
                    }
                `}} />
            </section>

            {/* ── Bottom Banner ── */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                <div className="relative rounded-2xl border border-black/[0.06] dark:border-accent-yellow/20 bg-white dark:bg-[#0a0a0a] overflow-hidden py-8 px-6 md:py-10 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent"
                    />

                    <div className="text-center md:text-left relative">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-accent-yellow block mb-2">
                            Launch pricing
                        </span>
                        <h2 className="font-mono text-lg md:text-2xl font-black text-gray-900 dark:text-white leading-snug tracking-tight">
                            Students start at $1/yr.
                            <br className="hidden sm:block" />
                            Don&apos;t leave credits on the table.
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md">
                            Deals expire. Launch rates won&apos;t stay this low. Move first, save more.
                        </p>
                    </div>

                    <div className="text-center md:text-right flex-shrink-0 relative">
                        <a
                            href="#plans"
                            className="group inline-flex items-center gap-2 bg-accent-yellow text-black font-mono font-black text-xs uppercase tracking-wide px-6 py-3.5 rounded-xl hover:bg-yellow-300 transition-all"
                        >
                            <span>View plans</span>
                            <span className="material-symbols-outlined !text-[16px] group-hover:translate-x-0.5 transition-transform">
                                arrow_forward
                            </span>
                        </a>
                        <p className="text-[10px] text-gray-500 font-mono mt-2.5">
                            Next&apos;Founder · Founder · Legend
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
