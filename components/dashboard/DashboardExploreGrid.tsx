'use client'

import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import { EXPLORE_LINKS } from './dashboard-explore-links'

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.16em] text-gray-600 dark:text-zinc-400 inline-flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow shadow-[0_0_8px_rgba(255,215,0,0.55)]" />
      {children}
    </h2>
  )
}

export default function DashboardExploreGrid() {
  const reduce = useReducedMotion()
  return (
    <>
      <m.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-3.5">
          <SectionLabel>Explore the catalog</SectionLabel>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-3.5">
          {EXPLORE_LINKS.map((a, i) => (
            <m.div
              key={a.href + a.label}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 + i * 0.03, duration: 0.3 }}
              className="h-full"
            >
              <Link
                href={a.href}
                className={`group relative h-full flex flex-col rounded-xl md:rounded-2xl border border-black/[0.07] dark:border-white/[0.09] bg-white dark:bg-[#0a0a0a] p-2.5 md:p-5 overflow-hidden transition-all duration-300 md:hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] ${a.hoverBorder}`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-transparent blur-2xl transition-colors duration-500 ${a.glowClass}`}
                />
                <div className="relative flex items-center md:items-start justify-between gap-1.5 mb-1.5 md:mb-3">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border flex items-center justify-center transition-colors ${a.plateClass} ${a.iconClass}`}
                  >
                    <span className="material-symbols-outlined !text-[16px] md:!text-[20px]">{a.icon}</span>
                  </div>
                  <span className="hidden md:inline material-symbols-outlined !text-[16px] text-gray-300 dark:text-zinc-600 group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </div>
                <p className="relative font-mono text-[10px] md:text-[13px] font-black uppercase tracking-wide text-gray-900 dark:text-white transition-colors leading-tight">
                  {a.label}
                </p>
                <p className="relative hidden sm:block text-[11px] text-gray-500 dark:text-zinc-500 mt-1 leading-snug">
                  {a.sub}
                </p>
              </Link>
            </m.div>
          ))}
        </div>
      </m.section>

      {/* Tip */}
      <m.section variants={itemVariants}>
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-black/[0.07] dark:border-white/[0.09] bg-white dark:bg-[#0a0a0a] p-3 md:p-6">
          <div className="relative flex items-start gap-2.5 md:gap-3.5">
            <span className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-accent-yellow/12 border border-accent-yellow/25 text-accent-yellow">
              <span className="material-symbols-outlined !text-[16px] md:!text-[18px]">tips_and_updates</span>
            </span>
            <div>
              <p className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.14em] text-gray-500 dark:text-zinc-500 mb-0.5 md:mb-1.5">
                Founder tip
              </p>
              <h3 className="font-mono text-[12px] md:text-[15px] font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-0.5 md:mb-1.5">
                Apply with your work email
              </h3>
              <p className="text-[11px] md:text-[12.5px] text-gray-600 dark:text-zinc-400 leading-snug md:leading-relaxed max-w-2xl">
                Providers approve faster when email matches your domain. Use{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  name@yourstartup.com
                </span>{' '}
                before claiming.
              </p>
            </div>
          </div>
        </div>
      </m.section>
    </>
  )
}
