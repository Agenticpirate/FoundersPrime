import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Mandala from '@/components/ui/Mandala'
import {
  FadeUp,
  Reveal,
  RevealItem,
  RevealStagger,
  SoftFloat,
} from '@/components/ui/premium-motion'
import { safeJsonLd } from '@/lib/safe-json-ld'

export const metadata: Metadata = {
  title: 'About FoundersPrime — Build More. Burn Less.',
  description:
    'Learn how FoundersPrime turns fragmented startup credits, non-dilutive programs, verified deals, and practical resources into one founder-first operating layer.',
  alternates: {
    canonical: 'https://www.foundersprime.com/about',
  },
  openGraph: {
    title: 'About FoundersPrime — Build More. Burn Less.',
    description:
      'A founder-first operating layer for verified startup savings, non-dilutive opportunities, and practical resources.',
    url: 'https://www.foundersprime.com/about',
    type: 'website',
  },
}

const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About FoundersPrime',
  url: 'https://www.foundersprime.com/about',
  description:
    'FoundersPrime organizes verified startup deals, cloud credits, SaaS savings, non-dilutive programs, and practical resources for modern founders.',
  mainEntity: {
    '@type': 'Organization',
    name: 'FoundersPrime',
    url: 'https://www.foundersprime.com',
    logo: 'https://www.foundersprime.com/logo-fp.png',
    description:
      'A founder-first platform for verified startup deals, cloud credits, SaaS savings, and non-dilutive opportunities.',
    sameAs: [
      'https://www.linkedin.com/company/foundersprime',
      'https://twitter.com/foundersprime',
      'https://www.crunchbase.com/organization/foundersprime',
    ],
  },
}

const impactStats = [
  { icon: 'monitoring', value: '$4.2M+', label: 'Opportunity value tracked' },
  { icon: 'public', value: '43+', label: 'Countries reached' },
  { icon: 'verified_user', value: 'Weekly', label: 'Catalog review rhythm' },
  { icon: 'pie_chart', value: '0%', label: 'Equity taken' },
]

const platformPillars = [
  {
    icon: 'savings',
    eyebrow: 'Save runway',
    title: 'Deals & Credits',
    description: 'Cloud credits, SaaS savings, and startup benefits organized around real operating needs.',
    href: '/deals',
    cta: 'Explore deals',
  },
  {
    icon: 'account_balance',
    eyebrow: 'Fund progress',
    title: 'Programs & Capital',
    description: 'Grants, accelerators, and non-dilutive pathways with the context needed to evaluate fit.',
    href: '/programs',
    cta: 'Browse programs',
  },
  {
    icon: 'inventory_2',
    eyebrow: 'Build smarter',
    title: 'Founder Resources',
    description: 'Practical templates, startup ideas, and tools that shorten the distance from decision to execution.',
    href: '/resources',
    cta: 'Open resources',
  },
]

const frictionPoints = [
  {
    icon: 'scatter_plot',
    title: 'Fragmented',
    description: 'Useful opportunities are spread across partner portals, government sites, newsletters, and private communities.',
  },
  {
    icon: 'link_off',
    title: 'Unreliable',
    description: 'Expired links and recycled lists waste the one resource an early-stage team cannot recover: time.',
  },
  {
    icon: 'filter_alt_off',
    title: 'Context-poor',
    description: 'A benefit is only useful when eligibility, trade-offs, and next steps are clear before you apply.',
  },
]

const verificationSteps = [
  {
    number: '01',
    icon: 'travel_explore',
    title: 'Discover',
    description: 'Source opportunities from official providers, public programs, and credible ecosystem partners.',
  },
  {
    number: '02',
    icon: 'fact_check',
    title: 'Verify',
    description: 'Review the destination, availability, requirements, and practical value before promotion.',
  },
  {
    number: '03',
    icon: 'notes',
    title: 'Clarify',
    description: 'Turn dense terms into useful context so founders can understand the fit and the catch quickly.',
  },
  {
    number: '04',
    icon: 'published_with_changes',
    title: 'Maintain',
    description: 'Refresh changing details and retire opportunities that no longer help founders move forward.',
  },
]

const principles = [
  {
    icon: 'my_location',
    title: 'Utility over volume',
    description: 'A smaller set of useful opportunities beats a massive directory nobody can trust.',
  },
  {
    icon: 'speed',
    title: 'Clarity over friction',
    description: 'Founders should understand what matters, what it costs, and what to do next without decoding jargon.',
  },
  {
    icon: 'visibility',
    title: 'Transparency by default',
    description: 'Eligibility limits, trade-offs, and commercial relationships should be visible—not buried.',
  },
  {
    icon: 'autorenew',
    title: 'A living system',
    description: 'Startup infrastructure changes quickly. The product must keep learning and improving with it.',
  },
]

const platformLanes = [
  { icon: 'savings', label: 'Save', detail: 'Credits, deals & benefits' },
  { icon: 'account_balance', label: 'Fund', detail: 'Grants & startup programs' },
  { icon: 'inventory_2', label: 'Build', detail: 'Resources, ideas & tools' },
]

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f8] text-[#1a1a1a] transition-colors duration-300 dark:bg-black dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(aboutPageJsonLd) }}
      />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="grid-bg relative overflow-hidden bg-[#f6f8f8] dark:bg-black">
          <SoftFloat className="pointer-events-none absolute -left-28 -top-32 hidden h-80 w-80 lg:block" duration={11}>
            <div className="h-full w-full rounded-full bg-accent-yellow/15 blur-3xl dark:bg-accent-yellow/[0.06]" />
          </SoftFloat>
          <SoftFloat className="pointer-events-none absolute -bottom-40 -right-32 hidden h-96 w-96 lg:block" duration={13}>
            <div className="h-full w-full rounded-full bg-accent-yellow/10 blur-3xl dark:bg-accent-yellow/[0.05]" />
          </SoftFloat>
          <Mandala
            variant="rings"
            colorClass="text-gray-900 dark:text-white"
            opacity={0.045}
            speed={110}
            direction="ccw"
            className="absolute -right-20 top-10 hidden h-80 w-80 md:block"
          />

          <div className="relative mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
            <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <FadeUp>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow opacity-50" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
                    </span>
                    <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-gray-900 dark:text-white">
                      About FoundersPrime
                    </span>
                  </div>
                </FadeUp>

                <FadeUp delay={0.06}>
                  <h1 className="max-w-4xl font-heading text-[clamp(2.8rem,8vw,5.9rem)] font-black uppercase leading-[0.9] tracking-[-0.035em] text-gray-950 dark:text-white">
                    Build more.
                    <span className="mt-2 block">
                      Burn{' '}
                      <span className="relative inline-block rounded-sm bg-accent-yellow px-2.5 py-0.5 text-black sm:px-3.5">
                        less.
                      </span>
                    </span>
                  </h1>
                </FadeUp>

                <FadeUp delay={0.12}>
                  <p className="mt-5 max-w-xl text-[15px] font-medium leading-relaxed text-gray-600 dark:text-zinc-300 sm:text-base md:mt-6 md:text-lg">
                    FoundersPrime turns scattered startup savings, non-dilutive opportunities, and practical resources into one clear operating layer for teams building with focus.
                  </p>
                </FadeUp>

                <FadeUp delay={0.18} className="mt-6 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row md:mt-7">
                  <Link
                    href="/deals"
                    className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-black bg-accent-yellow px-5 py-3.5 font-mono text-[11px] font-black uppercase tracking-[0.1em] text-black shadow-[4px_4px_0px_#111] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-yellow-300 hover:shadow-[2px_2px_0px_#111] sm:min-w-48"
                  >
                    Explore the platform
                    <span className="material-symbols-outlined !text-[17px] transition-transform group-hover:translate-x-0.5" aria-hidden="true">arrow_forward</span>
                  </Link>
                  <Link
                    href="/submit-deal"
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-3.5 font-mono text-[11px] font-black uppercase tracking-[0.1em] text-gray-900 transition-colors hover:border-accent-yellow/60 hover:bg-accent-yellow/[0.08] dark:border-white/10 dark:bg-[#0c0c0c] dark:text-white dark:hover:border-accent-yellow/40"
                  >
                    Contribute an opportunity
                    <span className="material-symbols-outlined !text-[17px]" aria-hidden="true">add_circle</span>
                  </Link>
                </FadeUp>

                <FadeUp delay={0.23} className="mt-5 flex flex-wrap gap-2">
                  {['Verified opportunities', 'Zero dilution', 'Built for lean teams'].map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-white/60 px-2.5 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-gray-500 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400"
                    >
                      <span className="material-symbols-outlined !text-[12px] text-amber-600 dark:text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">check_circle</span>
                      {label}
                    </span>
                  ))}
                </FadeUp>
              </div>

              <FadeUp delay={0.16} className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#151515] via-[#0b0b0b] to-black p-5 text-white shadow-[0_22px_60px_rgba(0,0,0,0.18)] sm:p-6 md:rounded-3xl md:p-7 dark:shadow-[0_22px_70px_rgba(255,215,0,0.04)]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/80 to-transparent" />
                  <Mandala
                    variant="orbital"
                    colorClass="text-accent-yellow"
                    opacity={0.11}
                    speed={88}
                    className="absolute -right-12 -top-12 h-48 w-48"
                  />

                  <div className="relative">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-accent-yellow">Platform profile</p>
                        <h2 className="mt-1.5 font-heading text-xl font-black uppercase tracking-tight sm:text-2xl">Founder operating layer</h2>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-accent-yellow">
                        <span className="material-symbols-outlined !text-[19px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">deployed_code</span>
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {platformLanes.map(({ icon, label, detail }, index) => (
                        <div key={label} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] p-3.5 transition-colors hover:bg-white/[0.06]">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent-yellow/20 bg-accent-yellow/10 text-accent-yellow">
                            <span className="material-symbols-outlined !text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">{icon}</span>
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[8px] font-black text-zinc-600">0{index + 1}</span>
                              <p className="font-mono text-[10px] font-black uppercase tracking-[0.12em] text-white">{label}</p>
                            </div>
                            <p className="mt-0.5 text-xs text-zinc-400">{detail}</p>
                          </div>
                          <span className="material-symbols-outlined !text-[15px] text-zinc-700" aria-hidden="true">arrow_forward</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <span className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-zinc-400">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow opacity-40" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-yellow" />
                        </span>
                        Continuously reviewed
                      </span>
                      <span className="font-mono text-[8px] font-black uppercase tracking-[0.12em] text-zinc-600">FP / 2026</span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            <RevealStagger className="mt-9 grid grid-cols-2 gap-2.5 md:mt-12 md:grid-cols-4 md:gap-3">
              {impactStats.map(({ icon, value, label }) => (
                <RevealItem key={label}>
                  <div className="flex h-full items-center gap-3 rounded-2xl border border-black/[0.07] bg-white/80 p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.035)] backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#0a0a0a] dark:shadow-none sm:p-4">
                    <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent-yellow/25 bg-accent-yellow/10 text-amber-700 dark:text-accent-yellow sm:flex">
                      <span className="material-symbols-outlined !text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">{icon}</span>
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-base font-black leading-none text-gray-950 dark:text-white sm:text-lg">{value}</p>
                      <p className="mt-1 truncate font-mono text-[7.5px] font-bold uppercase tracking-[0.1em] text-gray-500 dark:text-zinc-500 sm:text-[8px]">{label}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Platform pillars */}
        <section className="border-y border-black/[0.06] bg-white/65 py-12 dark:border-white/[0.07] dark:bg-[#090909] md:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent-yellow/30 bg-accent-yellow/10 px-3 py-1.5 text-amber-700 dark:text-accent-yellow">
                  <span className="material-symbols-outlined !text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">hub</span>
                  <span className="font-mono text-[8px] font-black uppercase tracking-[0.16em]">One platform. Three jobs.</span>
                </div>
                <h2 className="mt-3 max-w-2xl font-heading text-3xl font-black uppercase leading-[0.98] tracking-[-0.02em] text-gray-950 dark:text-white sm:text-4xl md:text-5xl">
                  Everything points back to runway.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-zinc-400 md:text-[15px]">
                Save what you can, find capital that does not cost ownership, and spend less time hunting for reliable answers.
              </p>
            </Reveal>

            <RevealStagger className="grid gap-3 md:grid-cols-3 md:gap-4">
              {platformPillars.map(({ icon, eyebrow, title, description, href, cta }, index) => (
                <RevealItem key={title} className="h-full">
                  <Link
                    href={href}
                    className="group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-b from-white to-gray-50/70 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.045)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-yellow/50 hover:shadow-[0_14px_34px_rgba(0,0,0,0.07)] dark:border-white/[0.08] dark:from-[#111] dark:to-[#090909] dark:shadow-none dark:hover:border-accent-yellow/30 sm:p-6"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/0 to-transparent transition-all duration-300 group-hover:via-accent-yellow/80" />
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent-yellow/25 bg-accent-yellow/10 text-amber-700 dark:text-accent-yellow">
                        <span className="material-symbols-outlined !text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">{icon}</span>
                      </span>
                      <span className="font-mono text-[8px] font-black text-gray-300 dark:text-zinc-700">0{index + 1}</span>
                    </div>
                    <p className="mt-5 font-mono text-[8px] font-black uppercase tracking-[0.16em] text-amber-700 dark:text-accent-yellow">{eyebrow}</p>
                    <h3 className="mt-1.5 font-heading text-xl font-black uppercase tracking-tight text-gray-950 dark:text-white sm:text-2xl">{title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">{description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-[0.11em] text-gray-900 dark:text-white">
                      {cta}
                      <span className="material-symbols-outlined !text-[15px] transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Why it exists */}
        <section className="bg-[#f6f8f8] py-12 dark:bg-black md:py-16">
          <div className="mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
            <Reveal className="lg:col-span-5 lg:self-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3 py-1.5 dark:border-white/[0.08] dark:bg-white/[0.04]">
                <span className="material-symbols-outlined !text-[13px] text-amber-700 dark:text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">bolt</span>
                <span className="font-mono text-[8px] font-black uppercase tracking-[0.16em] text-gray-600 dark:text-zinc-300">Why FoundersPrime exists</span>
              </div>
              <h2 className="mt-4 font-heading text-3xl font-black uppercase leading-[0.98] tracking-[-0.02em] text-gray-950 dark:text-white sm:text-4xl md:text-5xl">
                The startup internet is noisy.
                <span className="mt-1.5 block text-amber-600 dark:text-accent-yellow">Your runway isn&apos;t.</span>
              </h2>
              <div className="mt-5 max-w-xl space-y-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400 md:text-[15px]">
                <p>
                  The opportunities founders need already exist, but finding them often means navigating stale lists, unclear requirements, and disconnected sources.
                </p>
                <p>
                  FoundersPrime is the organization layer: a focused place to discover what can save money, unlock momentum, or remove operational friction—and understand why it matters.
                </p>
              </div>
            </Reveal>

            <RevealStagger className="grid gap-3 lg:col-span-7">
              {frictionPoints.map(({ icon, title, description }, index) => (
                <RevealItem key={title}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-black/[0.07] bg-white p-4 shadow-[0_7px_22px_rgba(0,0,0,0.035)] transition-colors hover:border-accent-yellow/40 dark:border-white/[0.08] dark:bg-[#0a0a0a] dark:shadow-none sm:items-center sm:p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-yellow/25 bg-accent-yellow/10 text-amber-700 dark:text-accent-yellow">
                      <span className="material-symbols-outlined !text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">{icon}</span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[8px] font-black text-gray-300 dark:text-zinc-700">0{index + 1}</span>
                        <h3 className="font-mono text-sm font-black uppercase tracking-tight text-gray-950 dark:text-white sm:text-base">{title}</h3>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">{description}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Verification system */}
        <section className="bg-[#f6f8f8] pb-12 dark:bg-black md:pb-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#151515] via-[#0b0b0b] to-black p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.14)] sm:p-7 md:p-9">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/70 to-transparent" />
                <Mandala
                  variant="radial"
                  colorClass="text-accent-yellow"
                  opacity={0.06}
                  speed={120}
                  className="absolute -right-24 -top-20 h-80 w-80"
                />

                <div className="relative mb-7 max-w-2xl md:mb-9">
                  <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-accent-yellow">The verification loop</p>
                  <h2 className="mt-2 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl">From discovery to decision.</h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-[15px]">
                    Listings are treated as living product data—not one-time content. The workflow is designed to make each entry more useful before it reaches a founder.
                  </p>
                </div>

                <RevealStagger className="relative grid gap-2.5 md:grid-cols-2 xl:grid-cols-4">
                  {verificationSteps.map(({ number, icon, title, description }, index) => (
                    <RevealItem key={number} className="h-full">
                      <div className="group relative flex h-full min-h-[13rem] flex-col rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors hover:bg-white/[0.06] sm:p-5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] font-black text-accent-yellow">{number}</span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-500 transition-colors group-hover:text-accent-yellow">
                            <span className="material-symbols-outlined !text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">{icon}</span>
                          </span>
                        </div>
                        <div className="mt-auto pt-8">
                          <h3 className="font-mono text-base font-black uppercase text-white">{title}</h3>
                          <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">{description}</p>
                        </div>
                        {index < verificationSteps.length - 1 && (
                          <span className="absolute -right-2.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] text-accent-yellow xl:flex" aria-hidden="true">
                            <span className="material-symbols-outlined !text-[12px]">arrow_forward</span>
                          </span>
                        )}
                      </div>
                    </RevealItem>
                  ))}
                </RevealStagger>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Principles and final CTA */}
        <section className="border-t border-black/[0.06] bg-white/65 py-12 dark:border-white/[0.07] dark:bg-[#090909] md:py-16">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-yellow/30 bg-accent-yellow/10 px-3 py-1.5 text-amber-700 dark:text-accent-yellow">
                <span className="material-symbols-outlined !text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">conversion_path</span>
                <span className="font-mono text-[8px] font-black uppercase tracking-[0.16em]">How the platform thinks</span>
              </div>
              <h2 className="mt-3 font-heading text-3xl font-black uppercase tracking-tight text-gray-950 dark:text-white sm:text-4xl md:text-5xl">Operating principles</h2>
            </Reveal>

            <RevealStagger className="grid gap-3 sm:grid-cols-2 md:gap-4">
              {principles.map(({ icon, title, description }, index) => (
                <RevealItem key={title}>
                  <div className="group flex h-full items-start gap-4 rounded-2xl border border-black/[0.07] bg-gradient-to-b from-white to-gray-50/70 p-4 shadow-[0_7px_22px_rgba(0,0,0,0.035)] transition-colors hover:border-accent-yellow/40 dark:border-white/[0.08] dark:from-[#111] dark:to-[#090909] dark:shadow-none sm:p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-yellow/25 bg-accent-yellow/10 text-amber-700 dark:text-accent-yellow">
                      <span className="material-symbols-outlined !text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">{icon}</span>
                    </span>
                    <div>
                      <p className="font-mono text-[8px] font-black uppercase tracking-[0.12em] text-gray-400 dark:text-zinc-600">Principle 0{index + 1}</p>
                      <h3 className="mt-1 font-mono text-sm font-black uppercase text-gray-950 dark:text-white sm:text-base">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">{description}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>

            <Reveal className="mt-8 md:mt-10">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-black p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.14)] sm:p-8 md:p-10">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/80 to-transparent" />
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-yellow/[0.08] blur-3xl" />
                <Mandala
                  variant="petal"
                  colorClass="text-accent-yellow"
                  opacity={0.09}
                  speed={96}
                  className="absolute -bottom-20 -right-12 h-64 w-64"
                />

                <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                  <div>
                    <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-accent-yellow">Connect with FoundersPrime</p>
                    <h2 className="mt-2 max-w-2xl font-heading text-2xl font-black uppercase leading-tight sm:text-3xl md:text-4xl">
                      Help make the startup ecosystem more useful.
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-[15px]">
                      Share an opportunity, report an outdated listing, explore a partnership, or ask the team a question.
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-2.5 sm:flex-row lg:w-auto">
                    <Link
                      href="/contact"
                      className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white px-5 py-3 font-mono text-[10px] font-black uppercase tracking-[0.1em] text-black transition-colors hover:bg-accent-yellow"
                    >
                      Contact the team
                      <span className="material-symbols-outlined !text-[16px] transition-transform group-hover:translate-x-0.5" aria-hidden="true">arrow_forward</span>
                    </Link>
                    <Link
                      href="/submit-deal"
                      className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-accent-yellow/30 bg-accent-yellow px-5 py-3 font-mono text-[10px] font-black uppercase tracking-[0.1em] text-black transition-colors hover:bg-yellow-300"
                    >
                      Submit an opportunity
                      <span className="material-symbols-outlined !text-[16px] transition-transform group-hover:translate-x-0.5" aria-hidden="true">north_east</span>
                    </Link>
                  </div>
                </div>

                <div className="relative mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                  <a href="mailto:support@foundersprime.com" className="transition-colors hover:text-accent-yellow">support@foundersprime.com</a>
                  <span>Research-led · Founder-first · Continuously maintained</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
