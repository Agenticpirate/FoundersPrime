'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import SavedDealsSection from './SavedDealsSection'
import DashboardExploreGrid from './DashboardExploreGrid'
import { m, useReducedMotion } from 'framer-motion'

export type DashboardTab = 'overview' | 'billing' | 'account'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/** Distinct icon colors per catalog tile — not all yellow. */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-600 dark:text-zinc-400 inline-flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow shadow-[0_0_8px_rgba(255,215,0,0.55)]" />
      {children}
    </h2>
  )
}

/* ─── Overview Tab ─────────────────────────────────────── */
export default function OverviewTab({
  isPro,
  savedDealSlugs,
  onChangeTab,
}: {
  isPro: boolean
  savedDealSlugs: string[]
  onChangeTab: (tab: DashboardTab) => void
}) {
  const reduce = useReducedMotion()

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-3.5 md:space-y-8"
    >
      {/* Upgrade banner — free users */}
      {!isPro && (
        <m.section
          variants={itemVariants}
          className="relative overflow-hidden rounded-xl md:rounded-2xl border border-accent-yellow/35 bg-gradient-to-br from-[#1a1710] via-[#0c0c0c] to-black p-3.5 md:p-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-yellow/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent"
          />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-start gap-2.5 md:gap-4 flex-1 min-w-0">
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-accent-yellow text-black border border-accent-yellow/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_rgba(255,215,0,0.25)]">
                <span className="material-symbols-outlined !text-[18px] md:!text-[22px]">bolt</span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.12em] text-accent-yellow mb-0.5 md:mb-1">
                  Free preview
                </p>
                <h2 className="font-mono text-sm md:text-xl font-black text-white tracking-tight leading-tight mb-0.5 md:mb-1">
                  Unlock the full catalog
                </h2>
                <p className="text-[11px] md:text-[13px] text-zinc-400 leading-snug md:leading-relaxed max-w-xl">
                  Cloud, SaaS, grants &amp; programs — one dashboard.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2 shrink-0 self-stretch md:self-auto w-full md:w-auto">
              <Link
                href="/pricing"
                className="group/cta flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 min-h-[40px] md:min-h-[48px] bg-accent-yellow text-black font-mono font-black text-[10px] md:text-[11px] uppercase tracking-[0.1em] px-4 md:px-5 rounded-lg md:rounded-xl hover:bg-yellow-300 transition-colors shadow-[0_0_28px_rgba(255,215,0,0.2)]"
              >
                View plans
                <span className="material-symbols-outlined !text-[14px] md:!text-[16px] group-hover/cta:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <button
                type="button"
                onClick={() => onChangeTab('billing')}
                className="inline-flex items-center justify-center min-h-[40px] md:min-h-[48px] px-3 md:px-4 rounded-lg md:rounded-xl border border-white/15 text-white font-mono text-[10px] md:text-[11px] font-bold uppercase hover:border-accent-yellow/40 transition-colors"
              >
                Billing
              </button>
            </div>
          </div>
        </m.section>
      )}

      {/* Academic Perks — compact on mobile */}
      <m.section variants={itemVariants}>
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-[#0a0a0a]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-yellow/[0.07] via-transparent to-transparent dark:from-accent-yellow/[0.09]"
          />
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-px md:h-[2px] bg-gradient-to-r from-transparent via-accent-yellow/60 to-transparent"
          />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-5 p-3.5 md:p-6">
            <div className="flex items-start gap-2.5 md:gap-4 flex-1 min-w-0">
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-accent-yellow/15 border border-accent-yellow/35 text-amber-700 dark:text-accent-yellow flex items-center justify-center flex-shrink-0">
                <span
                  className="material-symbols-outlined !text-[18px] md:!text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  school
                </span>
              </div>
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1 font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.12em] text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/25 px-2 py-0.5 rounded-full">
                  Academic perks
                </span>
                <h3 className="font-mono text-sm md:text-xl font-black text-gray-900 dark:text-white tracking-tight mt-1 md:mt-2 leading-tight">
                  900+ student benefits
                </h3>
                <p className="text-[11px] md:text-[12.5px] text-gray-600 dark:text-zinc-400 leading-snug mt-1 max-w-xl">
                  Free tools &amp; credits — Figma, GitHub, Notion &amp; more.
                </p>
                <div className="mt-2 md:mt-3 flex flex-wrap gap-1 md:gap-1.5">
                  {['Figma', 'GitHub', 'Notion', 'Cloud'].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-wide text-gray-500 dark:text-zinc-500 border border-black/[0.06] dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] px-1.5 md:px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/student-benefits"
              className="group/btn w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 min-h-[40px] md:min-h-[48px] px-4 md:px-5 rounded-lg md:rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-mono font-black text-[10px] md:text-[11px] uppercase tracking-[0.1em] hover:bg-accent-yellow hover:text-black dark:hover:bg-accent-yellow transition-colors"
            >
              Student perks
              <span className="material-symbols-outlined !text-[14px] md:!text-[15px] group-hover/btn:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </m.section>

      {/* Quick actions strip */}
      <m.section variants={itemVariants}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 md:gap-2.5">
          {[
            {
              href: '/deals',
              icon: 'local_offer',
              label: 'Browse deals',
              sub: 'Full catalog',
            },
            {
              href: '/flash-deals',
              icon: 'bolt',
              label: 'Flash deals',
              sub: 'Live countdowns',
            },
            {
              href: '/ideas',
              icon: 'lightbulb',
              label: 'Ideas hub',
              sub: 'Find problems',
            },
            {
              action: () => onChangeTab('billing'),
              icon: 'credit_card',
              label: 'Billing',
              sub: 'Plan & renewals',
            },
          ].map((item) => {
            const className =
              'group flex items-center gap-2 md:gap-3 p-2.5 md:p-3.5 min-h-[56px] md:min-h-[72px] rounded-xl md:rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0a0a0a] hover:border-accent-yellow/40 hover:bg-accent-yellow/[0.04] transition-all text-left w-full'
            const inner = (
              <>
                <span className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-accent-yellow/10 border border-accent-yellow/20 text-amber-700 dark:text-accent-yellow group-hover:bg-accent-yellow/20 transition-colors">
                  <span className="material-symbols-outlined !text-[16px] md:!text-[18px]">{item.icon}</span>
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] md:text-[11px] font-black uppercase tracking-wide text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                  <span className="block text-[10px] md:text-[11px] text-gray-500 dark:text-zinc-500 mt-0.5">
                    {item.sub}
                  </span>
                </span>
              </>
            )
            if ('href' in item && item.href) {
              return (
                <Link key={item.label} href={item.href} className={className}>
                  {inner}
                </Link>
              )
            }
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className={className}
              >
                {inner}
              </button>
            )
          })}
        </div>
      </m.section>

      {/* Saved Deals */}
      {savedDealSlugs.length > 0 ? (
        <m.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-3.5">
            <SectionLabel>Your saved deals</SectionLabel>
            <Link
              href="/deals"
              className="font-mono text-[10px] font-bold uppercase tracking-wide text-gray-500 hover:text-accent-yellow inline-flex items-center gap-1 transition-colors"
            >
              Browse all
              <span className="material-symbols-outlined !text-[12px]">arrow_forward</span>
            </Link>
          </div>
          <SavedDealsSection savedDealSlugs={savedDealSlugs} />
        </m.section>
      ) : (
        <m.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-3.5">
            <SectionLabel>Your saved deals</SectionLabel>
          </div>
          <div className="relative rounded-2xl border border-dashed border-black/10 dark:border-white/12 bg-white dark:bg-[#0a0a0a] p-6 md:p-7 flex flex-col md:flex-row items-center gap-4 md:gap-5 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-accent-yellow/12 border border-accent-yellow/25 flex items-center justify-center flex-shrink-0 text-amber-700 dark:text-accent-yellow">
              <span className="material-symbols-outlined !text-[22px]">bookmark_add</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-mono text-sm md:text-base font-black text-gray-900 dark:text-white tracking-tight">
                No saved deals yet
              </h3>
              <p className="text-[12px] md:text-[13px] text-gray-600 dark:text-zinc-400 leading-relaxed mt-1">
                Tap the bookmark on any deal to pin it here for quick access later.
              </p>
            </div>
            <Link
              href="/deals"
              className="group/cta inline-flex items-center gap-2 min-h-[44px] bg-gray-900 dark:bg-white text-white dark:text-black font-mono font-black text-[11px] uppercase tracking-[0.1em] px-4 rounded-xl hover:bg-accent-yellow hover:text-black transition-colors flex-shrink-0"
            >
              Browse deals
              <span className="material-symbols-outlined !text-[15px] group-hover/cta:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </m.section>
      )}

      <DashboardExploreGrid />
    </m.div>
  )
}
