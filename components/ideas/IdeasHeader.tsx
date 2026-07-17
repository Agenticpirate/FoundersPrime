'use client'

import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import ideasData from '@/data/startup_ideas.json'
import { FadeUp } from '@/components/ui/premium-motion'

const SOURCES: { label: string; short: string }[] = [
  { label: 'YC Requests for Startups', short: 'YC RFS' },
  { label: 'Razorpay Fix My Itch', short: 'Razorpay' },
  { label: 'AI opportunity briefs', short: 'AI briefs' },
]

export default function IdeasHeader() {
  const reduce = useReducedMotion()
  const totalIdeas = ideasData.length
  const categoryCount = new Set(ideasData.map((idea: { category: string }) => idea.category)).size
  const sourceCount = new Set(ideasData.map((idea: { source: string }) => idea.source)).size

  const metrics = [
    { value: String(totalIdeas), label: 'ideas' },
    { value: String(categoryCount), label: 'markets' },
    { value: String(sourceCount), label: 'sources' },
  ]

  return (
    <header className="relative mb-8 md:mb-10">
      {/* Soft ambient — no heavy panels */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-accent-yellow/[0.07] dark:bg-accent-yellow/[0.05] blur-3xl"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="relative mb-6">
        <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] text-gray-500 dark:text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-300 dark:text-white/20" aria-hidden>
            /
          </li>
          <li>
            <Link
              href="/resources"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Resources
            </Link>
          </li>
          <li className="text-gray-300 dark:text-white/20" aria-hidden>
            /
          </li>
          <li aria-current="page">
            <span className="text-gray-900 dark:text-white font-semibold">Ideas</span>
          </li>
        </ol>
      </nav>

      <div className="relative max-w-3xl">
        <FadeUp>
          <p className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-accent-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" aria-hidden />
            Startup Ideas Hub
          </p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 className="font-mono text-[1.85rem] sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-gray-900 dark:text-white leading-[1.08] mb-4">
            Problems the market{' '}
            <span className="text-accent-yellow">already wants solved</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.09}>
          <p className="text-[14px] md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-6">
            {totalIdeas} curated opportunities from YC, founder itch lists, and AI briefs — real
            demand, not brainstorm fluff. Filter a market, read the pain, ship the solution.
          </p>
        </FadeUp>

        {/* Minimal metrics row */}
        <FadeUp delay={0.12}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
            {metrics.map((m, i) => (
              <div key={m.label} className="flex items-baseline gap-1.5">
                {i > 0 && (
                  <span
                    className="mr-4 hidden sm:inline h-3 w-px bg-black/10 dark:bg-white/10"
                    aria-hidden
                  />
                )}
                <span className="font-mono text-lg md:text-xl font-black tabular-nums text-gray-900 dark:text-white">
                  {m.value}
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-500">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Source line — quiet trust marks */}
        <FadeUp delay={0.15}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 mr-1">
              From
            </span>
            {SOURCES.map((s) => (
              <span
                key={s.short}
                title={s.label}
                className="inline-flex items-center rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] font-semibold text-gray-700 dark:text-gray-300"
              >
                {s.short}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Slim principle bar — one line, not a second hero */}
      <FadeUp delay={reduce ? 0 : 0.18} className="mt-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/[0.06] dark:border-white/[0.07] pt-5">
          {['Validated demand', 'Clear pain points', 'Ready to build'].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-gray-500 dark:text-gray-400"
            >
              <span className="material-symbols-outlined !text-[14px] text-accent-yellow">
                check
              </span>
              {item}
            </span>
          ))}
        </div>
      </FadeUp>
    </header>
  )
}
