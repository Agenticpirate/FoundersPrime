'use client'

import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import Mandala from '@/components/ui/Mandala'
import { Reveal, RevealStagger, RevealItem } from '@/components/ui/premium-motion'
import { premiumEase } from '@/lib/premium-motion-variants'

type Category = {
  name: string
  /** Short label for narrow mobile cells */
  shortName?: string
  icon: string
  metric: string
  metricLabel: string
  desc: string
  href: string
  accent: string
  plate: string
  glow: string
}

/**
 * Six equal tracks — fixed typography zones so every card aligns:
 * icon row → metric → description → CTA.
 */
const categories: Category[] = [
  {
    name: 'Cloud Credits',
    shortName: 'Cloud',
    icon: 'cloud',
    metricLabel: 'Up to',
    metric: '$200K+',
    desc: 'AWS, Google Cloud, Azure & more.',
    href: '/deals?category=cloud-credits',
    accent: 'text-sky-400',
    plate: 'bg-sky-500/12 border-sky-500/25',
    glow: 'rgba(56,189,248,0.16)',
  },
  {
    name: 'Grants',
    icon: 'redeem',
    metricLabel: 'Up to',
    metric: '$10M+',
    desc: 'Non-dilutive capital for builders.',
    href: '/programs?type=grants',
    accent: 'text-accent-yellow',
    plate: 'bg-accent-yellow/12 border-accent-yellow/30',
    glow: 'rgba(255,215,0,0.14)',
  },
  {
    name: 'SaaS & Tools',
    shortName: 'SaaS',
    icon: 'apps',
    metricLabel: 'Catalog',
    metric: '200+',
    desc: 'Founder-friendly software deals.',
    href: '/deals?category=saas-discounts',
    accent: 'text-violet-400',
    plate: 'bg-violet-500/12 border-violet-500/25',
    glow: 'rgba(167,139,250,0.14)',
  },
  {
    name: 'Accelerators',
    shortName: 'Accel',
    icon: 'rocket_launch',
    metricLabel: 'Programs',
    metric: '50+',
    desc: 'Top cohorts, perks & equity deals.',
    href: '/programs?type=accelerators',
    accent: 'text-orange-400',
    plate: 'bg-orange-500/12 border-orange-500/25',
    glow: 'rgba(251,146,60,0.14)',
  },
  {
    name: 'Resources',
    icon: 'auto_awesome',
    metricLabel: 'Playbooks',
    metric: '100+',
    desc: 'Guides & tools to ship faster.',
    href: '/resources',
    accent: 'text-amber-300',
    plate: 'bg-amber-500/12 border-amber-500/25',
    glow: 'rgba(252,211,77,0.12)',
  },
  {
    name: 'Students',
    icon: 'school',
    metricLabel: 'Campus',
    metric: '1000+',
    desc: 'Credits, free tools & campus perks.',
    href: '/student-benefits',
    accent: 'text-sky-300',
    plate: 'bg-sky-400/12 border-sky-400/25',
    glow: 'rgba(125,211,252,0.12)',
  },
]

function CategoryCard({ c, index }: { c: Category; index: number }) {
  const reduce = useReducedMotion()
  const mobileTitle = c.shortName || c.name

  return (
    <Link
      href={c.href}
      aria-label={`Explore ${c.name}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl md:rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-2 md:p-5 transition-all duration-300 md:hover:-translate-y-1 active:border-accent-yellow/40 hover:border-accent-yellow/35"
      style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.04)' }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-accent-yellow/50 transition-all"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 md:h-24 md:w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: c.glow }}
      />

      {/* ── Mobile-only dense layout (< md) ── */}
      <div className="relative flex h-full flex-col md:hidden">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${c.plate}`}
          >
            <span
              className={`material-symbols-outlined !text-[15px] ${c.accent}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {c.icon}
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <span className="font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-white/35">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-mono text-[10.5px] font-black uppercase tracking-wide text-white leading-none">
              {mobileTitle}
            </h3>
          </div>
        </div>

        <div className="mb-1">
          <span className="font-mono text-[7px] font-bold uppercase tracking-[0.12em] text-white/30">
            {c.metricLabel}
          </span>
          <p
            className={`font-mono text-[17px] font-black leading-none tracking-tight tabular-nums ${c.accent}`}
          >
            {c.metric}
          </p>
        </div>

        <p className="mb-2 font-sans text-[9.5px] leading-snug text-zinc-500 line-clamp-2 flex-1">
          {c.desc}
        </p>

        <span
          className={`mt-auto inline-flex w-full items-center justify-center gap-0.5 rounded-md border border-white/[0.1] bg-white/[0.03] py-1.5 font-mono text-[8.5px] font-black uppercase tracking-[0.1em] text-zinc-300 ${c.accent}`}
        >
          Explore
          <span className="material-symbols-outlined !text-[11px]">arrow_forward</span>
        </span>
      </div>

      {/* ── Desktop / tablet layout (md+) ── */}
      <div className="relative hidden h-full flex-col md:flex">
        <div className="relative mb-4 flex items-start gap-3">
          <m.span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${c.plate}`}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span
              className={`material-symbols-outlined !text-[20px] ${c.accent}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {c.icon}
            </span>
          </m.span>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-mono text-[13px] font-black uppercase tracking-wide text-white leading-snug">
              {c.name}
            </h3>
          </div>
        </div>

        <div className="relative mb-3 min-h-[3.25rem]">
          <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
            {c.metricLabel}
          </p>
          <p
            className={`font-mono text-[22px] font-black leading-none tracking-tight tabular-nums ${c.accent}`}
          >
            {c.metric}
          </p>
        </div>

        <p className="relative mb-5 min-h-[2.5rem] font-sans text-[12px] leading-snug text-zinc-400 line-clamp-2">
          {c.desc}
        </p>

        <span className="relative mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-zinc-200 transition-all duration-300 group-hover:border-accent-yellow group-hover:bg-accent-yellow group-hover:text-black">
          Explore
          <span className="material-symbols-outlined !text-[14px] transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  )
}

export default function SystemModules() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-black py-7 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-28 md:h-40 w-[min(90vw,40rem)] -translate-x-1/2 bg-accent-yellow/[0.04] blur-3xl"
      />
      <Mandala
        variant="rings"
        colorClass="text-white"
        opacity={0.02}
        speed={140}
        className="pointer-events-none absolute -left-32 -top-36 hidden h-[28rem] w-[28rem] md:block"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8">
        {/* Section header — mobile denser */}
        <Reveal className="mb-3.5 md:mb-12">
          <div className="flex flex-col gap-2 md:gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-1.5 md:mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-accent-yellow/25 bg-accent-yellow/10 px-2 py-0.5 md:px-3 md:py-1.5 font-mono text-[8px] md:text-[10px] font-black uppercase tracking-[0.14em] text-accent-yellow">
                  <span
                    className="material-symbols-outlined !text-[11px] md:!text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                  Everything you need
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 md:hidden">
                  <span className="h-1 w-1 rounded-full bg-accent-yellow" />
                  Weekly
                </span>
              </div>
              <h2 className="font-mono text-lg sm:text-2xl md:text-3xl lg:text-[36px] font-black uppercase leading-[1.1] tracking-tight text-white">
                Every category.{' '}
                <span className="text-white/80">Every advantage.</span>
              </h2>
              <p className="mt-1 md:mt-3 font-mono text-[9px] md:text-[12px] uppercase tracking-[0.12em] text-zinc-500">
                Six tracks · one catalog
              </p>
            </div>

            <div className="hidden shrink-0 flex-wrap items-center gap-3 md:flex">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-yellow opacity-70" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-yellow" />
                </span>
                Updated weekly
              </span>
              <Link
                href="/deals"
                className="inline-flex items-center gap-1 font-mono text-[10px] font-black uppercase tracking-wider text-accent-yellow transition-colors hover:text-white"
              >
                Browse catalog
                <span className="material-symbols-outlined !text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* 2×3 mobile · 3 tablet · 6 desktop */}
        <RevealStagger className="grid grid-cols-2 gap-1.5 sm:gap-2.5 md:grid-cols-3 md:gap-3.5 lg:grid-cols-6">
          {categories.map((c, i) => (
            <RevealItem key={c.name} className="min-h-0">
              <CategoryCard c={c} index={i} />
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Bottom CTA — mobile compact strip */}
        <Reveal className="relative mt-3.5 md:mt-10">
          <div className="relative flex flex-row items-center justify-between gap-2.5 overflow-hidden rounded-xl md:rounded-2xl border border-accent-yellow/25 bg-gradient-to-r from-[#0c0c0c] via-[#12100a] to-[#0c0c0c] px-2.5 py-2 md:px-8 md:py-6 shadow-[0_0_0_1px_rgba(255,215,0,0.06)] md:flex-row md:gap-4">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent"
            />
            <div className="relative flex min-w-0 flex-1 items-center gap-2 text-left">
              <span className="flex h-7 w-7 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg md:rounded-xl border border-accent-yellow/30 bg-accent-yellow/15">
                <span
                  className="material-symbols-outlined !text-[14px] md:!text-[20px] text-accent-yellow"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
              </span>
              <div className="min-w-0">
                <p className="font-sans text-[11px] md:text-[15px] leading-snug text-white">
                  Up to{' '}
                  <span className="font-mono font-black text-accent-yellow">$500K+</span>
                  <span className="hidden sm:inline"> in perks</span>
                </p>
                <p className="mt-0.5 font-mono text-[8px] md:text-[10px] uppercase tracking-wider text-zinc-500 truncate">
                  Full catalog · Weekly updates
                </p>
              </div>
            </div>

            <Link
              href="/pricing"
              className="group/cta relative z-[1] inline-flex shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-lg md:rounded-xl border border-black bg-accent-yellow px-3 py-2 md:px-6 md:py-3.5 font-mono text-[9px] md:text-[11px] font-black uppercase tracking-[0.08em] text-black shadow-[2px_2px_0_0_#000] md:shadow-[3px_3px_0_0_#000] transition-all active:scale-[0.98] md:hover:-translate-y-0.5 md:hover:bg-white"
            >
              Unlock
              <span className="hidden md:inline"> full access</span>
              <span className="material-symbols-outlined !text-[13px] md:!text-[16px] transition-transform group-hover/cta:translate-x-0.5">
                arrow_forward
              </span>
              {!reduce && (
                <m.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent hidden md:block"
                  initial={{ x: '-100%' }}
                  animate={{ x: '400%' }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    ease: premiumEase,
                  }}
                />
              )}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
