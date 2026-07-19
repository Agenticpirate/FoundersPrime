'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import PricingPlans from '@/components/pricing/PricingPlans'
import PricingPartnerLogos from '@/components/pricing/PricingPartnerLogos'
import { Currency } from '@/utils/currency'

const INSIDE_CATEGORIES = [
    {
        label: 'Cloud Credits',
        desc: 'AWS, GCP, Azure & more to cut infrastructure spend.',
        icon: 'cloud',
        color: 'text-sky-400',
        iconBg: 'bg-sky-500/10 border-sky-400/25',
        badge: 'Exclusive',
        badgeClass: 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/10 border-sky-200/50 dark:border-sky-400/20',
        href: '/deals?category=cloud-credits',
        examples: 'AWS · GCP · Azure',
    },
    {
        label: 'Grants',
        desc: 'Non-dilutive capital you don’t have to pay back.',
        icon: 'redeem',
        color: 'text-violet-400',
        iconBg: 'bg-violet-500/10 border-violet-400/25',
        badge: 'Exclusive',
        badgeClass: 'text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-500/10 border-violet-200/50 dark:border-violet-400/20',
        href: '/programs?type=grants',
        examples: 'Gov · NGO · Corporate',
    },
    {
        label: 'Accelerators',
        desc: 'Capital, mentorship, and distribution programs.',
        icon: 'rocket_launch',
        color: 'text-orange-400',
        iconBg: 'bg-orange-500/10 border-orange-400/25',
        badge: 'Featured',
        badgeClass: 'text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-500/10 border-orange-200/50 dark:border-orange-400/20',
        href: '/programs?type=accelerators',
        examples: 'YC · Techstars · 500',
    },
    {
        label: 'SaaS Deals',
        desc: 'CRM, analytics, support & dev tools at founder rates.',
        icon: 'apps',
        color: 'text-blue-400',
        iconBg: 'bg-blue-500/10 border-blue-400/25',
        badge: 'Exclusive',
        badgeClass: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10 border-blue-200/50 dark:border-blue-400/20',
        href: '/deals?category=saas-discounts',
        examples: 'Notion · Stripe · Linear',
    },
    {
        label: 'AI Credits',
        desc: 'Model, infra, and tooling credits to experiment cheaply.',
        icon: 'smart_toy',
        color: 'text-pink-400',
        iconBg: 'bg-pink-500/10 border-pink-400/25',
        badge: 'Featured',
        badgeClass: 'text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-500/10 border-pink-200/50 dark:border-pink-400/20',
        href: '/deals',
        examples: 'OpenAI · Anthropic · GPU',
    },
    {
        label: 'Startup Tools',
        desc: 'Dev, ops, and growth tools with trials or discounts.',
        icon: 'build',
        color: 'text-cyan-400',
        iconBg: 'bg-cyan-500/10 border-cyan-400/25',
        badge: 'Exclusive',
        badgeClass: 'text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200/50 dark:border-cyan-400/20',
        href: '/deals',
        examples: 'Hosting · Analytics · CRM',
    },
    {
        label: 'Founder Resources',
        desc: 'Ideas database, startups, templates, and more.',
        icon: 'folder_open',
        color: 'text-accent-yellow',
        iconBg: 'bg-accent-yellow/10 border-accent-yellow/25',
        badge: 'Resources',
        badgeClass: 'text-amber-800 dark:text-accent-yellow bg-amber-50 dark:bg-accent-yellow/10 border-amber-200/50 dark:border-accent-yellow/20',
        href: '/ideas',
        examples: 'Ideas · Templates · Vault',
    },
    {
        label: 'Student Perks',
        desc: 'Special perks only for student and campus founders.',
        icon: 'school',
        color: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10 border-emerald-400/25',
        badge: 'Campus',
        badgeClass: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-400/20',
        href: '/student-benefits',
        examples: 'GitHub · Figma · Free Pro',
    },
] as const

const faqs: { q: string; a: string; icon: string }[] = [
    {
        icon: 'savings',
        q: 'How fast will I see savings?',
        a: 'Many founders recoup their plan from the first cloud or SaaS claim. Others stack savings over the first few weeks as they switch tools and apply to programs.',
    },
    {
        icon: 'verified',
        q: 'Are deals actually verified?',
        a: 'Yes. We verify partners, links, and eligibility before listing. If a perk breaks, we fix or replace it — so you are not chasing dead links.',
    },
    {
        icon: 'school',
        q: 'I am a student — which plan is for me?',
        a: "Next'Founder is $1/yr for active students and student founders — no revenue required. Premium AI & SaaS credits, campus opportunities, early grants, and the Opportunity Hub.",
    },
    {
        icon: 'bolt',
        q: 'Do I need a membership for Flash Deals?',
        a: 'No. Flash deals are free with a free account. Membership unlocks the full year-round catalog beyond flash drops.',
    },
    {
        icon: 'dashboard',
        q: 'Why is it only one dashboard?',
        a: 'One place replaces scattered Notion docs, random codes, and FOMO about secret deals. Filter by stage, stack, and geography in seconds.',
    },
    {
        icon: 'rule',
        q: 'Who sets eligibility — do I automatically qualify?',
        a: 'Providers set eligibility — not FoundersPrime. We show their rules on each listing. A plan unlocks the catalog; it does not guarantee partner approval.',
    },
    {
        icon: 'local_offer',
        q: 'What if I only need one deal?',
        a: 'A single cloud or ad credit can cover years of membership. Founder unlocks unlimited catalog access right after checkout.',
    },
    {
        icon: 'cancel',
        q: 'Can I cancel anytime?',
        a: 'Yes — one click from your dashboard. No lock-ins. Access continues until the period ends. Sales are final (see Refund Policy).',
    },
    {
        icon: 'upgrade',
        q: 'How do I switch or upgrade plans?',
        a: 'Pick your plan at checkout. For upgrades after purchase, email support@foundersprime.com with your account email.',
    },
    {
        icon: 'payments',
        q: 'What payment methods do you accept?',
        a: 'Checkout via Dodo Payments — major cards and regional methods shown at pay. Receipt emailed after success.',
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

    // FAQ State
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [showAllFaqs, setShowAllFaqs] = useState(false)
    const MOBILE_FAQ_PREVIEW = 4

    return (
        <main className="relative bg-[#fafafa] dark:bg-[#000000] text-[#1a1a1a] dark:text-white min-h-screen pb-12 md:pb-16 transition-colors duration-300 selection:bg-accent-yellow selection:text-black">
            {/* Soft ambient */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[min(90vw,720px)] h-40 md:h-64 rounded-full bg-accent-yellow/[0.06] dark:bg-accent-yellow/[0.04] blur-3xl"
            />

            {/* ── Hero — super compact on mobile for faster path to plans ── */}
            <div className="relative max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8 md:pt-14 pb-0 md:pb-4">
                <div className="max-w-2xl">
                    <p className="inline-flex items-center gap-1.5 md:gap-2 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] md:tracking-[0.18em] text-amber-700 dark:text-accent-yellow mb-1.5 sm:mb-2.5 md:mb-3">
                        <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-accent-yellow" aria-hidden />
                        One dashboard · every deal
                    </p>

                    <h1 className="font-mono text-[1.35rem] leading-[1.1] sm:text-4xl sm:leading-[1.08] lg:text-[2.65rem] font-black tracking-tight text-gray-900 dark:text-white">
                        Built to ship{' '}
                        <span className="text-accent-yellow">faster</span>
                        .
                        <br className="hidden sm:block" />
                        {' '}Built to spend{' '}
                        <span className="text-accent-yellow">less</span>
                        .
                    </h1>

                    {/* Mobile: one-line value prop · Desktop: full copy */}
                    <p className="md:hidden text-gray-600 dark:text-gray-400 text-[12px] leading-snug mt-1.5">
                        Vetted deals &amp; credits — students from{' '}
                        <span className="font-bold text-gray-900 dark:text-white">$1/yr</span>
                    </p>
                    <p className="hidden md:block text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed mt-4 max-w-xl">
                        Vetted startup deals, credits, and programs in one place — stop hunting links and start
                        saving on every tool. Students start at{' '}
                        <span className="font-semibold text-gray-900 dark:text-white">$1/year</span>.
                    </p>

                    {/* Mobile: ultra-dense trust row · Desktop: chip pills */}
                    <div className="md:hidden flex items-center gap-2 mt-2 font-mono text-[9px] font-bold text-gray-500 uppercase tracking-wide">
                        <span className="inline-flex items-center gap-1">
                            <span className="w-1 h-1 bg-accent-yellow rounded-full" />
                            Verified
                        </span>
                        <span className="text-gray-300 dark:text-white/15">·</span>
                        <span>$50K+ saved</span>
                        <span className="text-gray-300 dark:text-white/15">·</span>
                        <span>4.9★</span>
                        <span className="text-gray-300 dark:text-white/15">·</span>
                        <span className="text-amber-700 dark:text-accent-yellow">$1 students</span>
                    </div>
                    <div className="hidden md:flex md:flex-wrap gap-2 mt-5 font-mono text-[10px] font-semibold">
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

            {/* ── Comparison — ultra-compact side-by-side on mobile ── */}
            <section className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 md:py-16">
                <div className="text-center mb-3 md:mb-10">
                    <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.16em] md:tracking-[0.2em] text-amber-700 dark:text-accent-yellow block mb-0.5 md:mb-2">
                        The comparison
                    </span>
                    <h2 className="font-mono text-sm md:text-2xl lg:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                        Solo ship vs{' '}
                        <span className="text-accent-yellow">FoundersPrime</span>
                    </h2>
                    <p className="hidden md:block text-gray-500 dark:text-gray-400 text-sm mt-2">Same goal. Two very different paths.</p>
                </div>

                {/* Mobile: compact 2-col comparison table */}
                <div className="md:hidden rounded-xl border border-black/[0.06] dark:border-white/[0.08] overflow-hidden bg-white dark:bg-[#0b0c0e]">
                    <div className="grid grid-cols-2 border-b border-black/[0.06] dark:border-white/[0.08]">
                        <div className="px-2.5 py-2 border-r border-black/[0.06] dark:border-white/[0.08]">
                            <p className="font-mono text-[9px] font-black uppercase tracking-wider text-gray-500">Alone</p>
                            <span className="inline-block mt-0.5 bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-[7px] font-bold px-1 py-0.5 rounded-sm">HARD WAY</span>
                        </div>
                        <div className="px-2.5 py-2 bg-accent-yellow/[0.06]">
                            <p className="font-mono text-[9px] font-black uppercase tracking-wider text-gray-900 dark:text-white">FoundersPrime</p>
                            <span className="inline-block mt-0.5 bg-accent-yellow text-black font-mono text-[7px] font-black px-1 py-0.5 rounded-sm">RECOMMENDED</span>
                        </div>
                    </div>
                    {[
                        { bad: 'Tabs, forms, dead links', good: 'One vetted dashboard' },
                        { bad: 'Missed / expired deals', good: 'Matched to your stage' },
                        { bad: 'Pay full SaaS prices', good: 'Credits & founder rates' },
                        { bad: 'Admin over shipping', good: 'More runway to build' },
                    ].map((row) => (
                        <div key={row.bad} className="grid grid-cols-2 border-b border-black/[0.04] dark:border-white/[0.05] last:border-b-0">
                            <div className="flex items-start gap-1 px-2.5 py-2 border-r border-black/[0.04] dark:border-white/[0.05]">
                                <span className="material-symbols-outlined !text-[12px] text-red-500 mt-0.5 shrink-0">close</span>
                                <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-snug">{row.bad}</span>
                            </div>
                            <div className="flex items-start gap-1 px-2.5 py-2 bg-accent-yellow/[0.03]">
                                <span className="material-symbols-outlined !text-[12px] text-accent-yellow mt-0.5 shrink-0">check_circle</span>
                                <span className="text-[10px] text-gray-700 dark:text-gray-200 leading-snug font-medium">{row.good}</span>
                            </div>
                        </div>
                    ))}
                    <div className="grid grid-cols-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                        <div className="px-2.5 py-2 border-r border-black/[0.06] dark:border-white/[0.08]">
                            <p className="font-mono text-[8px] text-gray-500 uppercase">Outcome</p>
                            <p className="font-mono text-[9px] font-black text-red-400 uppercase">Slow</p>
                        </div>
                        <div className="px-2.5 py-2 bg-accent-yellow/[0.06]">
                            <p className="font-mono text-[8px] text-gray-500 uppercase">Outcome</p>
                            <p className="font-mono text-[9px] font-black text-accent-yellow uppercase">Fast · Runway</p>
                        </div>
                    </div>
                </div>

                {/* Desktop: original two cards */}
                <div className="hidden md:grid grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-[#0b0c0e] border border-gray-200 dark:border-[#1b2028] p-8 rounded-xl flex flex-col justify-between transition-all">
                        <div>
                            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#1b2028] pb-4 mb-4">
                                <h3 className="font-mono text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">Going it alone</h3>
                                <span className="bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm">HARD WAY</span>
                            </div>
                            <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-3">Sourcing deals raw:</p>
                            <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-400">
                                {[
                                    'Dozens of tabs, forms, and application portals',
                                    'Missed deadlines and expired startup deals',
                                    'Paying full price for tools you could get 30–90% off',
                                    'No clear view of which programs you actually qualify for',
                                    'Time spent on admin instead of shipping product',
                                ].map((t) => (
                                    <li key={t} className="flex items-start gap-2.5">
                                        <span className="material-symbols-outlined !text-[16px] text-red-500 mt-0.5">close</span>
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-[#1b2028] pt-4">
                            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">OUTCOME</span>
                            <span className="font-mono text-[11px] font-black text-red-400 uppercase tracking-wider">Slow • Frustrated</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0e0d0a] border border-gray-200 dark:border-accent-yellow/45 p-8 rounded-xl flex flex-col justify-between transition-all shadow-[0_0_20px_rgba(255,213,0,0.02)]">
                        <div>
                            <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#1b2028] pb-4 mb-4">
                                <h3 className="font-mono text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">With FoundersPrime</h3>
                                <span className="bg-accent-yellow text-black font-mono text-[9px] font-black px-2 py-0.5 rounded-sm">RECOMMENDED</span>
                            </div>
                            <p className="text-[11px] font-mono text-accent-yellow uppercase tracking-wider mb-3">One Unified Dashboard for everything:</p>
                            <ul className="space-y-3 text-xs text-gray-700 dark:text-gray-300">
                                {[
                                    'One vetted dashboard for everything you qualify for',
                                    'Deal, credit, and grant programs matched to your stage and stack',
                                    'Eligibility, application info, and fine print in plain English',
                                    'New perks and programs added every month — automatically',
                                    'More runway, less burn, and more focus on building',
                                ].map((t) => (
                                    <li key={t} className="flex items-start gap-2.5">
                                        <span className="material-symbols-outlined !text-[16px] text-accent-yellow mt-0.5">check_circle</span>
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-[#1b2028] pt-4">
                            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">OUTCOME</span>
                            <span className="font-mono text-[11px] font-black text-accent-yellow uppercase tracking-wider">Fast • Focused • Runway</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── What's inside — ultra-dense on mobile ── */}
            <section className="relative border-y border-black/[0.05] dark:border-white/[0.06] py-6 md:py-14 overflow-hidden">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-white/60 dark:bg-[#070707]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[min(90vw,640px)] h-32 md:h-48 rounded-full bg-accent-yellow/[0.05] blur-3xl"
                />

                <div className="relative max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8">
                    <div className="relative rounded-xl md:rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0c0c]/90 p-3 sm:p-5 md:p-6 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                        <div
                            aria-hidden
                            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/45 to-transparent"
                        />

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 md:gap-3 mb-3 md:mb-5">
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-1.5">
                                    <span className="inline-flex items-center gap-1 md:gap-1.5 rounded-full border border-accent-yellow/30 bg-accent-yellow/10 px-2 md:px-2.5 py-0.5 font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.12em] md:tracking-[0.14em] text-amber-800 dark:text-accent-yellow">
                                        <span className="w-1 h-1 rounded-full bg-accent-yellow" />
                                        What&apos;s inside
                                    </span>
                                    <span className="inline-flex items-center rounded-full border border-black/[0.06] dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] px-1.5 md:px-2 py-0.5 font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-gray-500">
                                        8 categories
                                    </span>
                                </div>
                                <h2 className="font-mono text-base md:text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                                    Eight categories.{' '}
                                    <span className="text-accent-yellow">One dashboard.</span>
                                </h2>
                                <p className="hidden md:block text-[12.5px] text-gray-500 dark:text-gray-400 mt-1.5 max-w-lg leading-relaxed">
                                    Every credit, deal, and program organized by what you&apos;re trying
                                    to save on.
                                </p>
                            </div>
                            <p className="hidden sm:block font-mono text-[10px] text-gray-500 uppercase tracking-wider shrink-0 pb-0.5">
                                Browse after you join
                            </p>
                        </div>

                        {/* Category cards — mobile: icon + title only density */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3">
                            {INSIDE_CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.label}
                                    href={cat.href}
                                    className="group relative flex flex-col rounded-lg md:rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.025] p-2 sm:p-3.5 transition-all duration-200 hover:border-accent-yellow/35 hover:bg-white dark:hover:bg-white/[0.05] hover:shadow-[0_8px_28px_-12px_rgba(255,213,0,0.2)] md:hover:-translate-y-0.5"
                                >
                                    <div className="flex items-center md:items-start justify-between gap-1.5 md:gap-2 mb-0 md:mb-2.5">
                                        <span
                                            className={`flex h-7 w-7 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-md md:rounded-lg border ${cat.iconBg} ${cat.color} transition-transform duration-200 group-hover:scale-105`}
                                        >
                                            <span className="material-symbols-outlined !text-[15px] md:!text-[18px]">
                                                {cat.icon}
                                            </span>
                                        </span>
                                        <span
                                            className={`hidden sm:inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 font-mono text-[7.5px] font-bold uppercase tracking-wider ${cat.badgeClass}`}
                                        >
                                            {cat.badge}
                                        </span>
                                    </div>
                                    <h3 className="font-mono text-[10px] sm:text-[11.5px] font-black uppercase tracking-wide text-gray-900 dark:text-white leading-tight mt-1.5 md:mt-0 mb-0 md:mb-1 group-hover:text-accent-yellow transition-colors">
                                        {cat.label}
                                    </h3>
                                    <p className="hidden sm:block text-[10.5px] text-gray-500 dark:text-gray-400 leading-snug flex-1 line-clamp-2">
                                        {cat.desc}
                                    </p>
                                    <div className="hidden sm:flex mt-2.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] items-center justify-between gap-1">
                                        <span className="font-mono text-[8.5px] text-gray-400 truncate">
                                            {cat.examples}
                                        </span>
                                        <span className="material-symbols-outlined !text-[14px] text-gray-400 group-hover:text-accent-yellow group-hover:translate-x-0.5 transition-all shrink-0">
                                            arrow_forward
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Footer strip */}
                        <div className="mt-2.5 md:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-2.5 rounded-lg md:rounded-xl border border-black/[0.05] dark:border-white/[0.06] bg-gray-50/80 dark:bg-white/[0.02] px-2.5 md:px-3.5 py-2 md:py-2.5">
                            <p className="font-mono text-[9.5px] md:text-[10.5px] text-gray-500 dark:text-gray-400 leading-snug">
                                Full catalog after you join —{' '}
                                <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                    new deals monthly
                                </span>
                            </p>
                            <div className="flex flex-wrap gap-1 md:gap-1.5">
                                {[
                                    { label: 'Deals', href: '/deals' },
                                    { label: 'Programs', href: '/programs' },
                                    { label: 'Students', href: '/student-benefits' },
                                    { label: 'Flash', href: '/flash-deals' },
                                ].map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className="inline-flex h-6 md:h-7 items-center rounded-md md:rounded-lg border border-black/[0.06] dark:border-white/10 bg-white dark:bg-white/[0.04] px-2 md:px-2.5 font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300 hover:border-accent-yellow/40 hover:text-accent-yellow transition-colors"
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Compact FAQ ── */}
            <section className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 md:py-12">
                <div className="relative rounded-xl md:rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-3 sm:p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/45 to-transparent"
                    />

                    {/* Header */}
                    <div className="relative mb-2.5 md:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
                        <div className="flex items-center gap-2 md:gap-3 min-w-0">
                            <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-accent-yellow/15 border border-accent-yellow/25 text-accent-yellow">
                                <span className="material-symbols-outlined !text-[16px] md:!text-[20px]">
                                    question_answer
                                </span>
                            </div>
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                                    <h2 className="font-mono text-[12px] md:text-[14px] font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">
                                        FAQ
                                    </h2>
                                    <span className="inline-flex items-center rounded-full border border-black/[0.06] dark:border-white/10 bg-gray-50 dark:bg-white/[0.04] px-1.5 md:px-2 py-0.5 font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-gray-500">
                                        {faqs.length} answers
                                    </span>
                                </div>
                                <p className="font-mono text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
                                    Tap to expand
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dense 2-col on md+ · mobile previews first N then “more” */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2.5 items-start">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx
                            const isMobileHidden = !showAllFaqs && idx >= MOBILE_FAQ_PREVIEW
                            return (
                                <div
                                    key={faq.q}
                                    onMouseLeave={() => {
                                        if (openFaq === idx) setOpenFaq(null)
                                    }}
                                    className={`rounded-lg md:rounded-xl border transition-colors ${
                                        isMobileHidden ? 'hidden md:block' : ''
                                    } ${
                                        isOpen
                                            ? 'border-accent-yellow/40 bg-accent-yellow/[0.04] dark:bg-accent-yellow/[0.05]'
                                            : 'border-black/[0.06] dark:border-white/[0.08] bg-gray-50/70 dark:bg-white/[0.02] hover:border-accent-yellow/25'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                        className="w-full px-2.5 py-2 sm:px-3.5 sm:py-3 text-left flex items-center gap-2 md:gap-2.5"
                                    >
                                        <span
                                            className={`flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-md md:rounded-lg border ${
                                                isOpen
                                                    ? 'bg-accent-yellow border-accent-yellow text-black'
                                                    : 'bg-accent-yellow/10 border-accent-yellow/20 text-accent-yellow'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined !text-[13px] md:!text-[15px]">
                                                {faq.icon}
                                            </span>
                                        </span>
                                        <span className="min-w-0 flex-1 font-mono text-[11px] sm:text-[12px] font-bold text-gray-900 dark:text-white leading-snug">
                                            {faq.q}
                                        </span>
                                        <span
                                            className={`flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center rounded-md border ${
                                                isOpen
                                                    ? 'bg-accent-yellow border-accent-yellow text-black'
                                                    : 'border-black/10 dark:border-white/15 text-gray-400 bg-white dark:bg-white/5'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined !text-[12px] md:!text-[14px]">
                                                {isOpen ? 'remove' : 'add'}
                                            </span>
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="px-2.5 md:px-3.5 pb-2.5 md:pb-3 pl-[2.5rem] md:pl-[3.25rem]">
                                            <div className="border-t border-black/[0.05] dark:border-white/[0.07] pt-2">
                                                <p className="text-[11px] md:text-[12px] text-gray-600 dark:text-gray-400 leading-relaxed">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Mobile: show more / less FAQs */}
                    {faqs.length > MOBILE_FAQ_PREVIEW && (
                        <button
                            type="button"
                            onClick={() => {
                                setShowAllFaqs((v) => !v)
                                if (showAllFaqs) setOpenFaq(null)
                            }}
                            className="md:hidden mt-2.5 w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-black/[0.08] dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] font-mono text-[10px] font-black uppercase tracking-wide text-gray-700 dark:text-gray-200 active:border-accent-yellow/40"
                        >
                            <span className="material-symbols-outlined !text-[16px] text-accent-yellow">
                                {showAllFaqs ? 'expand_less' : 'expand_more'}
                            </span>
                            {showAllFaqs
                                ? 'Show fewer questions'
                                : `+${faqs.length - MOBILE_FAQ_PREVIEW} more questions`}
                        </button>
                    )}

                    {/* Compact eligibility + support row */}
                    <div className="relative mt-2.5 md:mt-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 md:gap-3 rounded-lg md:rounded-xl border border-accent-yellow/20 bg-accent-yellow/[0.05] dark:bg-accent-yellow/[0.04] p-2.5 sm:p-3.5">
                        <div className="flex items-start gap-2 md:gap-2.5 min-w-0">
                            <span className="inline-flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-md md:rounded-lg bg-accent-yellow/15 border border-accent-yellow/25 text-accent-yellow">
                                <span className="material-symbols-outlined !text-[14px] md:!text-[16px]">info</span>
                            </span>
                            <div className="min-w-0">
                                <p className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-wider text-accent-yellow mb-0.5">
                                    Eligibility by providers
                                </p>
                                <p className="text-[10.5px] md:text-[11.5px] text-gray-600 dark:text-gray-400 leading-snug">
                                    Partners set the rules — we show them on each listing. Membership unlocks the catalog.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="shrink-0 inline-flex h-8 sm:h-10 items-center justify-center gap-1.5 self-center rounded-lg md:rounded-xl bg-accent-yellow text-black font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.08em] px-3 md:px-4 hover:bg-amber-300 transition-colors"
                        >
                            Contact support
                            <span className="material-symbols-outlined !text-[13px] md:!text-[14px]">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative bg-gray-100/50 dark:bg-[#000000] pt-8 md:pt-14 pb-5 md:pb-8 border-y border-gray-200 dark:border-[#1b2028] overflow-hidden">
                {/* Ambient glow blobs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-yellow/[0.04] rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />


                <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
                    {/* Section header */}
                    <div className="text-center mb-4 md:mb-10">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-accent-yellow mb-1.5 md:mb-3">
                            <span className="w-3 md:w-4 h-px bg-accent-yellow/60" />
                            FOUNDER REVIEWS
                            <span className="w-3 md:w-4 h-px bg-accent-yellow/60" />
                        </span>
                        <h2 className="font-mono text-lg md:text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-white leading-tight">
                            DON&apos;T TAKE OUR WORD{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-black bg-accent-yellow px-1.5 md:px-2 py-0.5">FOR IT.</span>
                            </span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 font-mono text-[10px] md:text-sm max-w-xl mx-auto mt-1.5 md:mt-3">
                            “Unlocked over <strong>$12,000</strong> in savings in year one.”
                        </p>
                    </div>

                    {/* Unified Infinite Horizontal Marquee */}
                    <div ref={testimonialsRef} className="relative w-full overflow-hidden py-2 md:py-4">
                        {/* Gradient fades on edges */}
                        <div className="absolute inset-y-0 left-0 w-10 md:w-32 bg-gradient-to-r from-gray-100/50 dark:from-[#000000] to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-10 md:w-32 bg-gradient-to-l from-gray-100/50 dark:from-[#000000] to-transparent z-10 pointer-events-none" />

                        <div className="flex gap-2.5 md:gap-5 w-max marquee hover:[animation-play-state:paused] py-1 md:py-2">
                            {(['a', 'b'] as const).flatMap((pass) =>
                              testimonials.map((t) => (
                                <div
                                    key={`${pass}-${t.author}`}
                                    className="w-[240px] sm:w-[320px] md:w-[350px] shrink-0 testimonial-card group relative flex flex-col justify-between rounded-lg md:rounded-xl p-3.5 md:p-6 border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-[#0d0d0d] backdrop-blur-sm hover:border-accent-yellow/30 hover:bg-gray-100/80 dark:hover:bg-white/[0.06] transition-all duration-300"
                                >
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/0 to-transparent group-hover:via-accent-yellow/40 transition-all duration-500 rounded-t-xl" />

                                    <div>
                                        <div className="flex items-center gap-0.5 mb-1.5 md:mb-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={`star-${star}`}
                                                    className="material-symbols-outlined !text-[11px] md:!text-[14px] text-accent-yellow"
                                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                                >
                                                    star
                                                </span>
                                            ))}
                                        </div>

                                        <span className="font-mono text-[22px] md:text-[30px] leading-none text-accent-yellow/20 font-black block -mb-1.5 md:-mb-2">&ldquo;</span>

                                        <p className="text-[11px] md:text-[13px] text-gray-700 dark:text-gray-300 leading-snug md:leading-relaxed mb-2.5 md:mb-5 italic line-clamp-4 md:line-clamp-none">
                                            {t.text.includes('$5,000') ? (
                                                <>Honestly, I signed up just to try it but ended up claiming <strong>$5,000</strong> in AWS credits within 10 minutes. That alone made up for years of subscription. Wish I&apos;d found it sooner.</>
                                            ) : t.text.includes('$8,000') ? (
                                                <>Every dollar counts when you&apos;re bootstrapping. I saved <strong>$8,000</strong> on Stripe credits and dynamic tools. Anyone who doesn&apos;t use FoundersPrime should check their sanity — just sign up.</>
                                            ) : t.text.includes('$12,000') ? (
                                                <>On our first month, we saved over <strong>$12,000</strong> in SaaS tools. Notion, Airtable, GitHub — all covered. For us in Spain, it&apos;s massive. Every founder should know about this.</>
                                            ) : t.text}
                                        </p>
                                    </div>

                                    <div className="border-t border-gray-200 dark:border-white/[0.06] pt-2.5 md:pt-3.5 flex items-center gap-2 md:gap-3">
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center font-mono text-[10px] md:text-xs font-black text-accent-yellow uppercase flex-shrink-0">
                                            {t.author[0]}
                                        </div>
                                        <div>
                                            <h4 className="text-[9px] md:text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-wider">{t.author}</h4>
                                            <p className="text-[8px] md:text-[10px] text-gray-500 font-mono">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                              ))
                            )}
                        </div>
                    </div>


                    {/* Bottom stat strip */}
                    <div className="mt-4 md:mt-8 grid grid-cols-3 gap-1 md:flex md:flex-wrap items-center justify-center md:gap-16 border-t border-gray-200 dark:border-white/5 pt-4 md:pt-6 max-w-3xl mx-auto">
                        {[
                            { value: '100+', label: 'Vetted Deals', suffix: 'active catalog' },
                            { value: '$50K+', label: 'Avg. Savings', suffix: 'tracked per member' },
                            { value: '4.9★', label: 'Rating', suffix: 'across tools & SaaS' },
                        ].map((stat) => (
                            <div key={stat.suffix} className="text-center border-r last:border-r-0 border-gray-200 dark:border-white/5 md:border-r-0 px-1 md:px-0">
                                <p className="font-mono text-[14px] sm:text-lg md:text-3xl font-black text-accent-yellow leading-none">{stat.value}</p>
                                <p className="font-mono text-[8px] sm:text-[10px] md:text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mt-0.5 md:mt-2">{stat.label}</p>
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

            {/* ── Bottom Banner — high-CTR mobile compact ── */}
            <section className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 md:py-10">
                <div className="relative rounded-xl md:rounded-2xl border border-black/[0.06] dark:border-accent-yellow/20 bg-white dark:bg-[#0a0a0a] overflow-hidden py-4 px-3.5 md:py-10 md:px-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-6">
                    <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent"
                    />

                    <div className="text-left relative min-w-0">
                        <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] md:tracking-[0.16em] text-amber-700 dark:text-accent-yellow block mb-1 md:mb-2">
                            Launch pricing
                        </span>
                        <h2 className="font-mono text-[15px] md:text-2xl font-black text-gray-900 dark:text-white leading-snug tracking-tight">
                            Students start at $1/yr.
                            <span className="hidden sm:inline"> Don&apos;t leave credits on the table.</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-[11px] md:text-sm mt-1 md:mt-2 max-w-md">
                            Deals expire. Launch rates won&apos;t stay this low.
                        </p>
                    </div>

                    <div className="flex flex-col items-stretch md:items-end flex-shrink-0 relative gap-1.5">
                        <a
                            href="#plans"
                            className="group inline-flex w-full md:w-auto items-center justify-center gap-1.5 md:gap-2 bg-accent-yellow text-black font-mono font-black text-[10px] md:text-xs uppercase tracking-wide px-4 md:px-6 h-11 md:h-auto md:py-3.5 rounded-lg md:rounded-xl hover:bg-yellow-300 active:bg-yellow-300 transition-all"
                        >
                            <span>View plans · from $1</span>
                            <span className="material-symbols-outlined !text-[15px] md:!text-[16px] group-hover:translate-x-0.5 transition-transform">
                                arrow_forward
                            </span>
                        </a>
                        <p className="text-[9px] md:text-[10px] text-gray-500 font-mono text-center md:text-right">
                            Next&apos;Founder · Founder · Legend
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
