'use client'

const LEGEND_FEATURES = [
  'Lifetime access, no renewals',
  'Every future deal included',
  'Vault, grants & programs forever',
  'Launch pricing — may rise later',
]

export default function PricingPlanLegend({
  expanded,
  loadingPlan,
  onToggle,
  onCheckout,
}: {
  expanded: boolean
  loadingPlan: string | null
  onToggle: () => void
  onCheckout: () => void
}) {
  return (
        <article className="group relative flex flex-col order-3 bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.08] hover:border-purple-400/40 rounded-xl md:rounded-2xl p-3.5 sm:p-5 md:p-7 transition-all duration-300 md:hover:-translate-y-1 shadow-[0_6px_20px_rgba(0,0,0,0.04)] md:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />

          <div className="flex items-start justify-between gap-2 mb-2 md:mb-5">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-purple-500/12 border border-purple-500/25 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                <span className="material-symbols-outlined !text-[16px] md:!text-[20px]">workspace_premium</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.12em] md:tracking-[0.14em] text-gray-900 dark:text-white">
                  Legend
                </h3>
                <p className="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 mt-0 leading-tight md:mt-0.5">
                  Lifetime access
                </p>
              </div>
            </div>
            <span className="shrink-0 inline-flex items-center justify-center min-w-[4.5rem] rounded-full border border-accent-yellow/30 bg-accent-yellow/10 text-amber-800 dark:text-accent-yellow font-mono text-[8px] md:text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
              Lifetime
            </span>
          </div>

          <h4 className="hidden md:block font-mono text-base font-bold text-gray-900 dark:text-white leading-snug mb-1.5">
            Pay once. Keep access for life.
          </h4>
          <p className="hidden md:block text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
            One payment. Never renew again.
          </p>

          <div className="mb-2.5 md:mb-5">
            <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
              <span className="font-mono text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-black text-gray-900 dark:text-white leading-none tracking-tight">
                $99
              </span>
              <span className="font-mono text-sm md:text-base text-gray-400 dark:text-gray-500 line-through font-bold">
                $299
              </span>
              <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-500">
                once
              </span>
            </div>
            <div className="mt-1 md:mt-2 inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-md bg-purple-500/12 border border-purple-500/25 font-mono text-[9px] md:text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-wide">
              67% off
            </div>
          </div>

          <ul className="space-y-1 md:space-y-2.5 mb-3 md:mb-6 flex-1">
            <li className="flex items-start gap-1.5 md:gap-2 text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wide text-gray-900 dark:text-white">
              <span className="material-symbols-outlined !text-[13px] md:!text-[15px] shrink-0">add_circle</span>
              Everything in Founder — for life
            </li>
            {LEGEND_FEATURES.map((feat, i) => {
              const isExtra = i >= 2
              return (
                <li
                  key={feat}
                  className={`items-start gap-1.5 md:gap-2.5 text-[11px] md:text-[12.5px] text-gray-600 dark:text-gray-300 ${
                    isExtra && !expanded ? 'hidden md:flex' : 'flex'
                  }`}
                >
                  <span
                    className="material-symbols-outlined !text-[13px] md:!text-[15px] text-purple-500 dark:text-purple-400 mt-0.5 shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="leading-snug">{feat}</span>
                </li>
              )
            })}
            <li className="md:hidden list-none">
              <button
                type="button"
                onClick={() => onToggle()}
                className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wide text-purple-500 dark:text-purple-400 active:opacity-80"
              >
                <span className="material-symbols-outlined !text-[14px]">
                  {expanded ? 'expand_less' : 'add'}
                </span>
                {expanded ? 'Show less' : `+${LEGEND_FEATURES.length - 2} more benefits`}
              </button>
            </li>
          </ul>

          <div className="mt-auto">
            <button
              type="button"
              onClick={() => onCheckout()}
              disabled={loadingPlan !== null}
              className="w-full inline-flex items-center justify-center gap-1.5 h-11 md:h-12 min-h-[44px] md:min-h-[48px] px-3 md:px-4 bg-gray-900 dark:bg-white text-white dark:text-black active:opacity-90 md:hover:bg-black dark:md:hover:bg-gray-100 font-mono font-black text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.12em] rounded-lg md:rounded-xl transition-all disabled:opacity-60"
            >
              <span>{loadingPlan === 'legend:annual' ? 'Redirecting…' : 'Lock in Legend'}</span>
              <span className="material-symbols-outlined !text-[15px] md:!text-[16px]">arrow_forward</span>
            </button>
            <p className="mt-1.5 md:mt-2.5 text-center text-[9px] md:text-[10px] text-gray-500 font-mono">
              One-time · Lifetime updates
            </p>
          </div>
        </article>

  )
}
