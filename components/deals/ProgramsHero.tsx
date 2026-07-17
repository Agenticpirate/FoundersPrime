'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Mandala from '@/components/ui/Mandala'
import ProgramsBrandMarquee from './ProgramsBrandMarquee'
import { useEffect, useState } from 'react'
import { FadeUp, premiumEase, staggerContainer, staggerItem } from '@/components/ui/premium-motion'
import { getStaticProgramCounts } from '@/lib/programs-catalog'

export default function ProgramsHero() {
  const reduce = useReducedMotion()
  const baseline = getStaticProgramCounts()
  const [counts, setCounts] = useState(baseline)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/deals?scope=programs')
        const data = await res.json()
        if (!data?.success || !Array.isArray(data.deals) || cancelled) return
        const { fromSupabaseProgram, mergePrograms, getStaticPrograms } = await import(
          '@/lib/programs-catalog'
        )
        const remote = data.deals.map((d: any) => fromSupabaseProgram(d)).filter(Boolean)
        const merged = mergePrograms(getStaticPrograms(), remote as any)
        if (cancelled) return
        setCounts({
          accelerators: merged.filter((p) => p.type === 'accelerator').length,
          incubators: merged.filter((p) => p.type === 'incubator').length,
          grants: merged.filter((p) => p.type === 'grant').length,
          total: merged.length,
        })
      } catch {
        /* static */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const stats = [
    {
      label: 'Programs',
      value: `${counts.total.toLocaleString()}+`,
      delta: 'Accelerators · grants',
      icon: 'grid_view',
      accent: 'text-sky-500',
      bg: 'bg-sky-500/10',
    },
    {
      label: 'Accelerators',
      value: `${counts.accelerators}+`,
      delta: 'Cohorts worldwide',
      icon: 'rocket_launch',
      accent: 'text-amber-600 dark:text-accent-yellow',
      bg: 'bg-accent-yellow/15',
      highlight: true,
    },
    {
      label: 'Incubators',
      value: `${counts.incubators}+`,
      delta: 'Studios & hubs',
      icon: 'lightbulb',
      accent: 'text-violet-500',
      bg: 'bg-violet-500/10',
    },
    {
      label: 'Grants',
      value: `${counts.grants}+`,
      delta: 'Non-dilutive funding',
      icon: 'payments',
      accent: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
  ]

  return (
    <div className="relative mb-7 md:mb-9">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 w-[28rem] h-[28rem] rounded-full bg-accent-yellow/[0.06] dark:bg-accent-yellow/[0.04] blur-3xl"
      />
      <Mandala
        variant="rings"
        colorClass="text-gray-900 dark:text-white/5"
        opacity={0.06}
        speed={90}
        className="absolute -top-10 -right-8 w-64 h-64 hidden md:block pointer-events-none"
      />

      <div className="relative rounded-3xl border border-black/[0.05] dark:border-white/[0.07] bg-gradient-to-br from-white via-white to-amber-50/30 dark:from-[#0a0a0a] dark:via-[#080808] dark:to-[#12100a] p-5 md:p-7 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent"
        />

        <div className="relative flex flex-col xl:flex-row xl:items-end xl:justify-between gap-7">
          <div className="min-w-0 flex-1">
            <FadeUp>
              <div className="inline-flex items-center gap-1.5 mb-3.5 px-3 py-1 rounded-full border border-accent-yellow/25 bg-accent-yellow/10 text-amber-700 dark:text-accent-yellow">
                <motion.span
                  className="material-symbols-outlined !text-[13px]"
                  animate={reduce ? undefined : { rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  rocket_launch
                </motion.span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]">
                  Accelerators · Incubators · Grants
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h1 className="font-mono text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight text-gray-900 dark:text-white leading-[1.08] mb-3">
                Power your{' '}
                <span className="relative inline-block text-accent-yellow">
                  startup
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-accent-yellow/70"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.35, duration: 0.55, ease: premiumEase }}
                      style={{ originX: 0 }}
                    />
                  )}
                </span>{' '}
                journey.
              </h1>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p className="font-sans text-sm md:text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mb-5">
                Browse {counts.accelerators}+ accelerators, {counts.incubators}+ incubators, and{' '}
                {counts.grants}+ grants — terms, equity, deadlines, and apply links. Commercial cloud &amp;
                SaaS deals stay on{' '}
                <a href="/deals" className="text-accent-yellow font-semibold hover:underline">
                  Deals
                </a>
                .
              </p>
            </FadeUp>

            <FadeUp delay={0.16}>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { text: 'Verified cohorts', icon: 'verified' },
                  { text: 'Funding terms clear', icon: 'payments' },
                  { text: 'Global reach', icon: 'public' },
                ].map((pill) => (
                  <span
                    key={pill.text}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.04] font-mono text-[10px] font-semibold text-gray-600 dark:text-gray-300"
                  >
                    <span className="material-symbols-outlined !text-[13px] text-accent-yellow">{pill.icon}</span>
                    {pill.text}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-2.5 xl:w-[320px] flex-shrink-0"
            variants={reduce ? undefined : staggerContainer}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'show'}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={reduce ? undefined : staggerItem}
                className={`rounded-2xl border p-3.5 transition-transform duration-300 hover:-translate-y-0.5 ${
                  s.highlight
                    ? 'border-accent-yellow/30 bg-accent-yellow/10 dark:bg-accent-yellow/[0.08]'
                    : 'border-black/[0.05] dark:border-white/[0.07] bg-white/70 dark:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined !text-[15px] ${s.accent}`}>{s.icon}</span>
                  </span>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400">
                    {s.label}
                  </span>
                </div>
                <p className="font-mono text-xl font-black text-gray-900 dark:text-white leading-none mb-1">
                  {s.value}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{s.delta}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <ProgramsBrandMarquee />
      </div>
    </div>
  )
}
