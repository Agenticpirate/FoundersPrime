'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import Mandala from '@/components/ui/Mandala'
import { Reveal, RevealStagger, RevealItem, premiumEase } from '@/components/ui/premium-motion'

type Category = {
  name: string
  icon: string
  value: string
  desc: string
  href: string
  /** Tailwind text class for value + icon */
  accent: string
  /** Soft icon plate bg */
  plate: string
  /** Glow on hover (rgba) */
  glow: string
  tag: string
}

const categories: Category[] = [
  {
    name: 'Cloud Credits',
    icon: 'cloud',
    value: 'Up to $200K+',
    desc: 'AWS, Google Cloud, Azure & more.',
    href: '/deals?category=cloud-credits',
    accent: 'text-sky-400',
    plate: 'bg-sky-500/10 border-sky-500/20',
    glow: 'rgba(56,189,248,0.18)',
    tag: 'Cloud',
  },
  {
    name: 'Grants',
    icon: 'redeem',
    value: 'Up to $10M+',
    desc: 'Non-dilutive capital for builders.',
    href: '/programs?type=grants',
    accent: 'text-accent-yellow',
    plate: 'bg-accent-yellow/10 border-accent-yellow/25',
    glow: 'rgba(255,215,0,0.16)',
    tag: 'Non-dilutive',
  },
  {
    name: 'SaaS & Tools',
    icon: 'apps',
    value: '200+',
    desc: 'Founder-friendly software deals.',
    href: '/deals?category=saas-discounts',
    accent: 'text-violet-400',
    plate: 'bg-violet-500/10 border-violet-500/20',
    glow: 'rgba(167,139,250,0.16)',
    tag: 'SaaS',
  },
  {
    name: 'Accelerators',
    icon: 'rocket_launch',
    value: '50+',
    desc: 'Top cohorts, perks & programs.',
    href: '/programs?type=accelerators',
    accent: 'text-orange-400',
    plate: 'bg-orange-500/10 border-orange-500/20',
    glow: 'rgba(251,146,60,0.16)',
    tag: 'Programs',
  },
  {
    name: 'Resources',
    icon: 'auto_awesome',
    value: '100+',
    desc: 'Guides & tools to ship faster.',
    href: '/resources',
    accent: 'text-amber-300',
    plate: 'bg-amber-500/10 border-amber-500/20',
    glow: 'rgba(252,211,77,0.14)',
    tag: 'Playbooks',
  },
  {
    name: 'Students',
    icon: 'school',
    value: '1000+',
    desc: 'Campus credits, free tools & more.',
    href: '/student-benefits',
    accent: 'text-sky-300',
    plate: 'bg-sky-400/10 border-sky-400/20',
    glow: 'rgba(125,211,252,0.14)',
    tag: 'Campus',
  },
]

function CategoryCard({ c, index }: { c: Category; index: number }) {
  const reduce = useReducedMotion()

  return (
    <Link
      href={c.href}
      aria-label={`Explore ${c.name}`}
      className="group relative flex flex-col h-full min-h-[248px] md:min-h-[268px] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-4 md:p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-yellow/35"
      style={{
        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Top hairline accent */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 group-hover:via-accent-yellow/60 transition-all duration-300"
      />

      {/* Hover glow blob */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: c.glow }}
      />

      {/* Index — fixed corner, never competes with title */}
      <span className="absolute top-3.5 right-3.5 z-[1] font-mono text-[9px] font-bold tracking-[0.16em] text-white/15 group-hover:text-accent-yellow/45 transition-colors">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* ── Zone 1: icon + label (fixed height) ── */}
      <div className="relative flex items-center gap-2.5 pr-7 mb-4 min-h-[40px]">
        <motion.span
          className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${c.plate}`}
          whileHover={reduce ? undefined : { scale: 1.06, rotate: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        >
          <span
            className={`material-symbols-outlined !text-[20px] ${c.accent}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {c.icon}
          </span>
        </motion.span>
        <div className="min-w-0 flex flex-col justify-center">
          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/40 leading-none mb-1.5">
            {c.tag}
          </span>
          <h3 className="font-sans font-bold text-[13px] md:text-[14px] text-white leading-tight line-clamp-2 min-h-[2.1rem]">
            {c.name}
          </h3>
        </div>
      </div>

      {/* ── Zone 2: metric (single line, fixed height) ── */}
      <p
        className={`relative font-mono font-black text-[17px] md:text-[18px] leading-none tracking-tight whitespace-nowrap mb-2.5 min-h-[1.25rem] ${c.accent}`}
      >
        {c.value}
      </p>

      {/* ── Zone 3: description (2 lines max, equal height) ── */}
      <p className="relative font-sans text-[11.5px] md:text-[12px] text-gray-400 leading-snug line-clamp-2 min-h-[2.4rem] mb-4">
        {c.desc}
      </p>

      {/* ── Zone 4: CTA pinned to bottom ── */}
      <span className="relative mt-auto inline-flex items-center justify-center gap-1.5 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-gray-200 group-hover:bg-accent-yellow group-hover:text-black group-hover:border-accent-yellow transition-all duration-300">
        Explore
        <span className="material-symbols-outlined !text-[13px] transition-transform duration-300 group-hover:translate-x-0.5">
          arrow_forward
        </span>
      </span>
    </Link>
  )
}

export default function SystemModules() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-black grid-bg-dark py-16 md:py-24 border-y border-white/5">
      {/* Ambient depth */}
      <Mandala
        variant="rings"
        colorClass="text-white"
        opacity={0.025}
        speed={140}
        direction="cw"
        className="hidden md:block absolute -top-36 -left-32 w-[28rem] h-[28rem] pointer-events-none"
      />
      <Mandala
        variant="orbital"
        colorClass="text-accent-yellow"
        opacity={0.055}
        speed={160}
        direction="ccw"
        className="hidden md:block absolute -bottom-44 -right-32 w-[32rem] h-[32rem] pointer-events-none"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[min(90vw,40rem)] h-32 bg-accent-yellow/[0.04] blur-3xl"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 bg-accent-yellow/10 border border-accent-yellow/25 text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.16em] px-3 py-1.5 rounded-full mb-4">
                <span className="material-symbols-outlined !text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  bolt
                </span>
                Everything you need
              </span>
              <h2 className="font-mono font-black uppercase text-white tracking-tight leading-[1.05] text-2xl sm:text-3xl lg:text-[36px]">
                Every category.{' '}
                <span className="text-white/90">Every advantage.</span>
              </h2>
              <p className="mt-3 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] text-gray-500">
                <span className="text-accent-yellow/90">//</span> Six curated tracks. One terminal for the entire founder stack.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent-yellow opacity-70 animate-ping" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
                </span>
                Updated weekly
              </span>
              <Link
                href="/deals"
                className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] font-black uppercase tracking-wider text-accent-yellow hover:text-white transition-colors"
              >
                Browse catalog
                <span className="material-symbols-outlined !text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Category grid */}
        <RevealStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-3.5 items-stretch">
          {categories.map((c, i) => (
            <RevealItem key={c.name} className="h-full min-h-0 flex">
              <div className="w-full h-full">
                <CategoryCard c={c} index={i} />
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Bottom CTA — premium strip */}
        <Reveal className="relative mt-8 md:mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-accent-yellow/25 bg-gradient-to-r from-[#0c0c0c] via-[#12100a] to-[#0c0c0c] px-5 md:px-8 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_0_1px_rgba(255,215,0,0.06),0_20px_50px_rgba(0,0,0,0.35)]">
            {/* Top gold line */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent"
            />
            <Mandala
              variant="orbital"
              colorClass="text-accent-yellow"
              opacity={0.12}
              speed={100}
              direction="cw"
              className="pointer-events-none absolute -right-8 -top-10 w-40 h-40"
            />
            <Mandala
              variant="rings"
              colorClass="text-white"
              opacity={0.05}
              speed={130}
              direction="ccw"
              className="pointer-events-none absolute -left-12 -bottom-14 w-44 h-44 hidden sm:block"
            />

            <div className="relative flex items-start sm:items-center gap-3 text-center sm:text-left">
              <span className="hidden sm:flex w-10 h-10 rounded-xl bg-accent-yellow/15 border border-accent-yellow/30 items-center justify-center flex-shrink-0">
                <span
                  className="material-symbols-outlined !text-[20px] text-accent-yellow"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
              </span>
              <div>
                <p className="font-sans text-sm md:text-[15px] text-white leading-snug">
                  Unlock up to{' '}
                  <span className="font-mono font-black text-accent-yellow">$500K+</span> in perks and
                  credits.
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-gray-500">
                  Full catalog · Verified programs · Weekly updates
                </p>
              </div>
            </div>

            <Link
              href="/pricing"
              className="group/cta relative z-[1] inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-accent-yellow text-black font-mono font-black text-[11px] uppercase tracking-[0.1em] px-6 py-3.5 border border-black shadow-[3px_3px_0_0_#000] hover:bg-white hover:shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap overflow-hidden"
            >
              Unlock full access
              <span className="material-symbols-outlined !text-[16px] transition-transform group-hover/cta:translate-x-0.5">
                arrow_forward
              </span>
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                  initial={{ left: '-40%' }}
                  animate={{ left: '140%' }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.5, ease: premiumEase }}
                />
              )}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
