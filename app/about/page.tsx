import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Mandala from '@/components/ui/Mandala'
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
  { value: '$4.2M+', label: 'Opportunity value tracked' },
  { value: '43+', label: 'Countries reached' },
  { value: 'Weekly', label: 'Catalog review rhythm' },
  { value: '0%', label: 'Equity taken' },
]

const platformPillars = [
  {
    icon: 'savings',
    eyebrow: 'Save runway',
    title: 'Deals & Credits',
    description: 'Cloud credits, SaaS savings, and startup benefits organized around real operating needs.',
    href: '/deals',
    cta: 'Explore deals',
    accent: 'bg-accent-yellow text-black',
  },
  {
    icon: 'account_balance',
    eyebrow: 'Fund progress',
    title: 'Programs & Capital',
    description: 'Grants, accelerators, and non-dilutive pathways with the context needed to evaluate fit.',
    href: '/programs',
    cta: 'Browse programs',
    accent: 'bg-primary text-black',
  },
  {
    icon: 'inventory_2',
    eyebrow: 'Build smarter',
    title: 'Founder Resources',
    description: 'Practical templates, startup ideas, and tools that shorten the distance from decision to execution.',
    href: '/resources',
    cta: 'Open the vault',
    accent: 'bg-white text-black',
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
    description: 'Review the destination, availability, requirements, and practical value before an entry is promoted.',
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
    description: 'Revisit the catalog continuously, refresh changing details, and retire opportunities that no longer help.',
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
    description: 'Startup infrastructure changes quickly. The product must keep learning, reviewing, and improving with it.',
  },
]

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-[#1a1a1a] transition-colors duration-300 dark:bg-black dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(aboutPageJsonLd) }}
      />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="pattern-grid-lg relative overflow-hidden border-b-2 border-black bg-white dark:border-white/10 dark:bg-[#09090b]">
          <Mandala
            variant="rings"
            colorClass="text-gray-900 dark:text-white"
            opacity={0.045}
            speed={100}
            className="absolute -right-24 -top-24 hidden h-[28rem] w-[28rem] md:block"
          />
          <Mandala
            variant="radial"
            colorClass="text-accent-yellow"
            opacity={0.08}
            speed={130}
            direction="ccw"
            className="absolute -bottom-40 -left-40 h-80 w-80"
          />

          <div className="relative mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
            <div className="fp-fade-up max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 border-2 border-black bg-accent-yellow px-3 py-1.5 text-black shadow-[3px_3px_0px_#111]">
                <span className="material-symbols-outlined !text-[16px]" aria-hidden="true">hub</span>
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em]">About FoundersPrime</span>
              </div>

              <h1 className="max-w-5xl font-mono text-[2.5rem] font-black uppercase leading-[0.98] tracking-[-0.055em] text-gray-950 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Build more.
                <span className="mt-1 block text-primary">Burn less.</span>
              </h1>

              <p className="mt-6 max-w-2xl border-l-4 border-accent-yellow pl-4 font-sans text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:pl-5 sm:text-base md:text-lg">
                FoundersPrime turns scattered startup savings, non-dilutive opportunities, and practical resources into one clear operating layer for teams building with focus.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/deals"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-black bg-primary px-5 py-3 font-mono text-xs font-black uppercase text-black shadow-[4px_4px_0px_#111] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-accent-yellow hover:shadow-[6px_6px_0px_#111]"
                >
                  Explore the platform
                  <span className="material-symbols-outlined !text-[17px]" aria-hidden="true">arrow_forward</span>
                </Link>
                <Link
                  href="/submit-deal"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 font-mono text-xs font-black uppercase text-black shadow-[4px_4px_0px_#111] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-[6px_6px_0px_#ffd700] dark:border-white/20 dark:bg-[#111] dark:text-white"
                >
                  Contribute an opportunity
                  <span className="material-symbols-outlined !text-[17px]" aria-hidden="true">add_circle</span>
                </Link>
              </div>
            </div>

            <div className="fp-fade-up" style={{ animationDelay: '0.12s' }}>
              <div className="relative overflow-hidden border-2 border-black bg-gradient-to-br from-[#151515] via-[#0b0b0b] to-black p-6 text-white shadow-[7px_7px_0px_#ffd700] sm:p-7">
                <Mandala
                  variant="orbital"
                  colorClass="text-accent-yellow"
                  opacity={0.13}
                  speed={72}
                  className="absolute -right-12 -top-12 h-44 w-44"
                />
                <div className="relative">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] font-black uppercase tracking-[0.22em] text-accent-yellow">Platform brief</p>
                      <p className="mt-1 font-mono text-lg font-black uppercase">Founder operating layer</p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 text-accent-yellow">
                      <span className="material-symbols-outlined" aria-hidden="true">deployed_code</span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      ['SAVE', 'Credits, deals & benefits'],
                      ['FUND', 'Grants & startup programs'],
                      ['BUILD', 'Resources, ideas & tools'],
                    ].map(([label, description], index) => (
                      <div key={label} className="flex items-center gap-3 border border-white/[0.08] bg-white/[0.035] p-3.5">
                        <span className="font-mono text-[10px] font-black text-accent-yellow">0{index + 1}</span>
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-white">{label}</p>
                          <p className="mt-0.5 text-xs text-zinc-400">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow opacity-40" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-yellow" />
                    </span>
                    Continuously reviewed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact rail */}
        <section className="border-b-2 border-black bg-black text-white dark:border-white/10">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-y divide-white/10 px-4 sm:px-6 md:grid-cols-4 md:divide-y-0 lg:px-10">
            {impactStats.map(({ value, label }) => (
              <div key={label} className="px-3 py-6 text-center sm:px-5 md:py-8">
                <p className="font-mono text-2xl font-black text-accent-yellow sm:text-3xl">{value}</p>
                <p className="mt-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-zinc-400 sm:text-[9px]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Platform pillars */}
        <section className="border-b-2 border-black bg-background-light py-12 dark:border-white/10 dark:bg-black md:py-18">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-primary">One platform. Three jobs.</p>
                <h2 className="mt-2 max-w-2xl font-mono text-2xl font-black uppercase tracking-tight text-gray-950 dark:text-white sm:text-3xl md:text-4xl">
                  Everything points back to runway.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Save what you can, find capital that does not cost ownership, and spend less time hunting for reliable answers.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {platformPillars.map(({ icon, eyebrow, title, description, href, cta, accent }, index) => (
                <Link
                  key={title}
                  href={href}
                  className="fp-fade-up group relative flex min-h-[17rem] flex-col overflow-hidden border-2 border-black bg-white p-5 text-gray-950 shadow-[5px_5px_0px_#111] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111] dark:border-white/10 dark:bg-[#0c0c0c] dark:text-white dark:shadow-[5px_5px_0px_rgba(255,255,255,0.06)] sm:p-6"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-12 w-12 items-center justify-center border-2 border-black ${accent}`}>
                      <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
                    </span>
                    <span className="font-mono text-[10px] font-black text-gray-400">0{index + 1}</span>
                  </div>
                  <p className="mt-6 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
                  <h3 className="mt-1.5 font-mono text-xl font-black uppercase">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-gray-900 group-hover:text-primary dark:text-white">
                    {cta}
                    <span className="material-symbols-outlined !text-[16px] transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why it exists */}
        <section className="border-b-2 border-black bg-white py-12 dark:border-white/10 dark:bg-[#09090b] md:py-20">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 lg:px-10">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-primary">Why FoundersPrime exists</p>
              <h2 className="mt-3 font-mono text-3xl font-black uppercase leading-[1.04] tracking-tight text-gray-950 dark:text-white md:text-5xl">
                The startup internet is noisy.
                <span className="mt-2 block text-primary">Your runway isn&apos;t.</span>
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                <p>
                  The opportunities founders need already exist, but finding them often means navigating stale lists, unclear requirements, and disconnected sources.
                </p>
                <p>
                  FoundersPrime is the organization layer: a focused place to discover what can save money, unlock momentum, or remove operational friction—and understand why it matters.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {frictionPoints.map(({ icon, title, description }, index) => (
                <div
                  key={title}
                  className="fp-fade-up group grid gap-4 border-2 border-black bg-background-light p-5 shadow-[5px_5px_0px_#111] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 dark:border-white/10 dark:bg-[#0c0c0c] dark:shadow-[5px_5px_0px_rgba(255,255,255,0.05)] sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:items-center sm:p-6"
                  style={{ animationDelay: `${index * 0.09}s` }}
                >
                  <span className="flex h-12 w-12 items-center justify-center border-2 border-black bg-accent-yellow text-black">
                    <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] font-black text-primary">0{index + 1}</span>
                      <h3 className="font-mono text-lg font-black uppercase text-gray-950 dark:text-white">{title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verification system */}
        <section className="relative overflow-hidden border-b-2 border-black bg-black py-12 text-white dark:border-white/10 md:py-20">
          <Mandala
            variant="radial"
            colorClass="text-white"
            opacity={0.035}
            speed={120}
            className="absolute -right-32 top-0 h-[32rem] w-[32rem]"
          />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="mb-9 max-w-3xl md:mb-14">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-accent-yellow">The verification loop</p>
              <h2 className="mt-3 font-mono text-3xl font-black uppercase tracking-tight md:text-5xl">From discovery to decision.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Listings are treated as living product data—not one-time content. The workflow is designed to make each entry more useful before it reaches a founder.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
              {verificationSteps.map(({ number, icon, title, description }, index) => (
                <div key={number} className="group relative min-h-[16rem] bg-[#0a0a0a] p-5 transition-colors hover:bg-[#111] sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-accent-yellow">{number}</span>
                    <span className="material-symbols-outlined text-zinc-600 transition-colors group-hover:text-accent-yellow" aria-hidden="true">{icon}</span>
                  </div>
                  <div className="mt-12">
                    <h3 className="font-mono text-xl font-black uppercase">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{description}</p>
                  </div>
                  {index < verificationSteps.length - 1 && (
                    <span className="material-symbols-outlined absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black p-1 text-accent-yellow xl:block" aria-hidden="true">arrow_forward</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="border-b-2 border-black bg-background-light py-12 dark:border-white/10 dark:bg-black md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="mb-8 md:mb-12">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-primary">How the platform thinks</p>
              <h2 className="mt-2 font-mono text-3xl font-black uppercase text-gray-950 dark:text-white md:text-4xl">Operating principles</h2>
            </div>

            <div className="grid border-2 border-black bg-black shadow-[6px_6px_0px_#111] dark:border-white/10 dark:bg-white/10 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.05)] md:grid-cols-2">
              {principles.map(({ icon, title, description }, index) => (
                <div
                  key={title}
                  className={`group bg-white p-5 transition-colors hover:bg-accent-yellow/10 dark:bg-[#0c0c0c] dark:hover:bg-white/[0.04] sm:p-7 ${index < 2 ? 'border-b-2 border-black dark:border-white/10' : ''} ${index % 2 === 0 ? 'md:border-r-2 md:border-black md:dark:border-white/10' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-black text-accent-yellow dark:border-white/15 dark:bg-[#1a1a1a]">
                      <span className="material-symbols-outlined !text-[19px]" aria-hidden="true">{icon}</span>
                    </span>
                    <div>
                      <p className="font-mono text-[9px] font-black text-primary">PRINCIPLE 0{index + 1}</p>
                      <h3 className="mt-1.5 font-mono text-lg font-black uppercase text-gray-950 dark:text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand-led contact and CTA */}
        <section className="bg-white py-12 dark:bg-[#09090b] md:py-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <div className="relative overflow-hidden border-2 border-black bg-black p-6 text-white shadow-[6px_6px_0px_#ffd700] sm:p-8">
                <Mandala
                  variant="petal"
                  colorClass="text-accent-yellow"
                  opacity={0.12}
                  speed={84}
                  className="absolute -bottom-16 -right-12 h-56 w-56"
                />
                <div className="relative">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-accent-yellow">Built to stay useful</p>
                  <h2 className="mt-3 max-w-lg font-mono text-2xl font-black uppercase leading-tight sm:text-3xl">
                    A brand-led platform with a founder-first standard.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
                    FoundersPrime is maintained as a research and product system: focused on dependable information, practical outcomes, and continuous improvement.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Research-led', 'Founder-first', 'Continuously maintained'].map((label) => (
                      <span key={label} className="border border-white/10 bg-white/5 px-3 py-2 font-mono text-[8px] font-black uppercase tracking-[0.12em] text-zinc-300">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-2 border-black bg-background-light p-5 shadow-[6px_6px_0px_#111] dark:border-white/10 dark:bg-[#0c0c0c] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.05)] sm:p-8">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-primary">Connect with FoundersPrime</p>
                <h2 className="mt-2 font-mono text-2xl font-black uppercase text-gray-950 dark:text-white sm:text-3xl">Help make the ecosystem more useful.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Share an opportunity, report an outdated listing, explore a partnership, or ask the team a question.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/contact"
                    className="group flex min-h-14 items-center justify-between border-2 border-black bg-white px-4 py-3 font-mono text-[10px] font-black uppercase text-black transition-colors hover:bg-accent-yellow dark:border-white/15 dark:bg-[#111] dark:text-white dark:hover:text-black"
                  >
                    Contact the team
                    <span className="material-symbols-outlined !text-[17px] transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
                  </Link>
                  <Link
                    href="/submit-deal"
                    className="group flex min-h-14 items-center justify-between border-2 border-black bg-primary px-4 py-3 font-mono text-[10px] font-black uppercase text-black transition-colors hover:bg-accent-yellow"
                  >
                    Submit an opportunity
                    <span className="material-symbols-outlined !text-[17px] transition-transform group-hover:translate-x-1" aria-hidden="true">north_east</span>
                  </Link>
                </div>

                <div className="mt-5 flex flex-col gap-2 border-t border-black/10 pt-5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500 dark:border-white/10 dark:text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                  <a href="mailto:support@foundersprime.com" className="transition-colors hover:text-primary">support@foundersprime.com</a>
                  <span>Built for teams that build lean.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
