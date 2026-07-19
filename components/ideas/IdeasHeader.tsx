'use client'

import ideasData from '@/data/startup_ideas.json'
import { FadeUp } from '@/components/ui/premium-motion'
import PageBreadcrumb from '@/components/ui/PageBreadcrumb'

export default function IdeasHeader() {
  const totalIdeas = ideasData.length
  const categoryCount = new Set(ideasData.map((idea: { category: string }) => idea.category)).size
  const sourceCount = new Set(ideasData.map((idea: { source: string }) => idea.source)).size

  const metrics = [
    { value: String(totalIdeas), label: 'ideas' },
    { value: String(categoryCount), label: 'markets' },
    { value: String(sourceCount), label: 'sources' },
  ]

  return (
    <header className="relative mb-4 md:mb-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 h-40 w-[min(90vw,520px)] -translate-x-1/2 rounded-full bg-accent-yellow/[0.06] dark:bg-accent-yellow/[0.04] blur-3xl"
      />

      <PageBreadcrumb
        className="relative mb-3 md:mb-5"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Ideas' },
        ]}
      />

      <div className="relative max-w-3xl">
        <FadeUp>
          <p className="mb-1.5 md:mb-2.5 inline-flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-accent-yellow">
            <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-accent-yellow" aria-hidden />
            Startup Ideas Hub
          </p>
        </FadeUp>

        <FadeUp delay={0.04}>
          <h1 className="font-mono text-[1.4rem] sm:text-3xl lg:text-[2.4rem] font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-2 md:mb-3">
            Problems the market{' '}
            <span className="text-accent-yellow">already wants solved</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.07}>
          <p className="text-[12.5px] md:text-[14px] text-gray-600 dark:text-gray-400 leading-snug md:leading-relaxed max-w-xl mb-3 md:mb-5">
            {totalIdeas} curated opportunities from YC, itch lists &amp; AI briefs — filter a market,
            read the pain, ship.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 md:gap-x-6">
            {metrics.map((m, i) => (
              <div key={m.label} className="flex items-baseline gap-1">
                {i > 0 && (
                  <span
                    className="mr-3 hidden sm:inline h-3 w-px bg-black/10 dark:bg-white/10"
                    aria-hidden
                  />
                )}
                <span className="font-mono text-base md:text-xl font-black tabular-nums text-gray-900 dark:text-white">
                  {m.value}
                </span>
                <span className="font-mono text-[10px] md:text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </header>
  )
}
