'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import Mandala from '@/components/ui/Mandala'
import { FadeUp } from '@/components/ui/premium-motion'
import { premiumEase, staggerContainer, staggerItem } from '@/lib/premium-motion-variants'
import StudentBrandMarquee from './StudentBrandMarquee'
import { studentBenefits2026 } from '@/data/student-benefits-2026'
import { isStudentCatalogEligibility } from '@/lib/catalog-segregation'
import { matchesStudentBenefitType } from './student-benefit-types'

function computeCounts() {
  const student = studentBenefits2026.filter((b) => isStudentCatalogEligibility(b.eligibility))
  return {
    total: student.length,
    free: student.filter((b) => matchesStudentBenefitType(b, 'free-access')).length,
    credits: student.filter((b) => matchesStudentBenefitType(b, 'credits-savings')).length,
    funding: student.filter((b) => matchesStudentBenefitType(b, 'funding')).length,
  }
}

/**
 * Compact student benefits hero — mirrors All Deals mobile density.
 */
export default function StudentBenefitsHero() {
  const reduce = useReducedMotion()
  const [counts, setCounts] = useState(computeCounts)

  useEffect(() => {
    setCounts(computeCounts())
  }, [])

  const stats = [
    {
      label: 'Student perks',
      value: `${counts.total.toLocaleString()}+`,
      delta: 'Campus-only offers',
      icon: 'school',
      accent: 'text-sky-500',
      bg: 'bg-sky-500/10',
    },
    {
      label: 'Credits & savings',
      value: `${counts.credits}+`,
      delta: 'Discounts & free months',
      icon: 'savings',
      accent: 'text-amber-600 dark:text-accent-yellow',
      bg: 'bg-accent-yellow/15',
      highlight: true,
    },
    {
      label: 'Free software',
      value: `${counts.free}+`,
      delta: 'Tools & licenses',
      icon: 'devices',
      accent: 'text-violet-500',
      bg: 'bg-violet-500/10',
    },
    {
      label: 'Funding',
      value: `${counts.funding}+`,
      delta: 'Grants & fellowships',
      icon: 'monetization_on',
      accent: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
  ]

  return (
    <div className="relative mb-4 md:mb-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 w-[28rem] h-[28rem] rounded-full bg-accent-yellow/[0.06] dark:bg-accent-yellow/[0.04] blur-3xl hidden md:block"
      />
      <Mandala
        variant="rings"
        colorClass="text-gray-900 dark:text-white/5"
        opacity={0.06}
        speed={90}
        className="absolute -top-10 -right-8 w-64 h-64 hidden md:block pointer-events-none"
      />

      <div className="relative rounded-2xl md:rounded-3xl border border-black/[0.05] dark:border-white/[0.07] bg-gradient-to-br from-white via-white to-amber-50/30 dark:from-[#0a0a0a] dark:via-[#080808] dark:to-[#12100a] p-3.5 sm:p-5 md:p-7 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent"
        />

        <div className="relative flex flex-col xl:flex-row xl:items-end xl:justify-between gap-3.5 md:gap-7">
          <div className="min-w-0 flex-1">
            <FadeUp>
              <div className="inline-flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3.5 px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-accent-yellow/25 bg-accent-yellow/10 text-amber-700 dark:text-accent-yellow">
                <span className="material-symbols-outlined !text-[11px] md:!text-[13px]">school</span>
                <span className="font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-[0.12em] md:tracking-[0.14em]">
                  Student-verified · .edu / campus ID
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h1 className="font-mono text-[1.5rem] sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-1.5 md:mb-3">
                Free software, credits &amp;{' '}
                <span className="relative inline-block text-accent-yellow">
                  funding
                  {!reduce && (
                    <m.span
                      aria-hidden
                      className="absolute -bottom-0.5 md:-bottom-1 left-0 right-0 h-[2px] md:h-[3px] rounded-full bg-accent-yellow/70"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.35, duration: 0.55, ease: premiumEase }}
                      style={{ originX: 0 }}
                    />
                  )}
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.12}>
              {/* Mobile: short blurb · Desktop: full copy */}
              <p className="md:hidden font-sans text-[12px] text-gray-500 dark:text-gray-400 leading-snug mb-2.5">
                Campus-only free tools, credits &amp; funding. Also see{' '}
                <Link href="/deals" className="text-accent-yellow font-semibold">
                  Deals
                </Link>{' '}
                &amp;{' '}
                <Link href="/programs" className="text-accent-yellow font-semibold">
                  Programs
                </Link>
                .
              </p>
              <p className="hidden md:block font-sans text-sm md:text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mb-5">
                Campus-only perks in one place:{' '}
                <strong className="text-gray-700 dark:text-gray-300">free tools</strong>,{' '}
                <strong className="text-gray-700 dark:text-gray-300">credits &amp; savings</strong>, and{' '}
                <strong className="text-gray-700 dark:text-gray-300">student funding</strong>. Startup commercial
                deals live under{' '}
                <Link href="/deals" className="text-accent-yellow font-semibold hover:underline">
                  Deals
                </Link>
                ; accelerators &amp; grants under{' '}
                <Link href="/programs" className="text-accent-yellow font-semibold hover:underline">
                  Programs
                </Link>
                .
              </p>
            </FadeUp>

            {/* Pills — desktop only */}
            <FadeUp delay={0.16} className="hidden md:block">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { text: 'Student eligibility', icon: 'badge' },
                  { text: 'Free & discounted plans', icon: 'redeem' },
                  { text: 'Direct claim links', icon: 'open_in_new' },
                ].map((pill) => (
                  <span
                    key={pill.text}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.04] font-mono text-[10px] font-semibold text-gray-600 dark:text-gray-300"
                  >
                    <span className="material-symbols-outlined !text-[13px] text-accent-yellow">
                      {pill.icon}
                    </span>
                    {pill.text}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          <m.div
            className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-1.5 md:gap-2.5 xl:w-[320px] flex-shrink-0"
            variants={reduce ? undefined : staggerContainer}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'show'}
          >
            {stats.map((s) => (
              <m.div
                key={s.label}
                variants={reduce ? undefined : staggerItem}
                className={`rounded-xl md:rounded-2xl border p-2 md:p-3.5 transition-transform duration-300 md:hover:-translate-y-0.5 ${
                  s.highlight
                    ? 'border-accent-yellow/30 bg-accent-yellow/10 dark:bg-accent-yellow/[0.08]'
                    : 'border-black/[0.05] dark:border-white/[0.07] bg-white/70 dark:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2 min-w-0">
                  <span
                    className={`w-6 h-6 md:w-7 md:h-7 rounded-md md:rounded-lg ${s.bg} flex items-center justify-center shrink-0`}
                  >
                    <span className={`material-symbols-outlined !text-[13px] md:!text-[15px] ${s.accent}`}>
                      {s.icon}
                    </span>
                  </span>
                  <span className="font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-[0.08em] md:tracking-[0.12em] text-gray-400 truncate">
                    {s.label}
                  </span>
                </div>
                <p className="font-mono text-base md:text-xl font-black text-gray-900 dark:text-white leading-none mb-0.5 md:mb-1 tabular-nums">
                  {s.value}
                </p>
                <p className="text-[9px] md:text-[10px] text-gray-500 dark:text-gray-400 truncate">
                  {s.delta}
                </p>
              </m.div>
            ))}
          </m.div>
        </div>

        <StudentBrandMarquee compact />
      </div>
    </div>
  )
}
