'use client'

const NEXT_FEATURES = [
  '1,000+ student discounts',
  'AI, cloud & SaaS credits',
  'Hackathons, fellowships & grants',
  'Dev tools for pre-revenue',
  'Opportunity Hub access',
]

export default function PricingPlanNext({
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
        <article className="group relative flex flex-col order-1 bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.08] hover:border-accent-yellow/40 rounded-xl md:rounded-2xl p-3.5 sm:p-5 md:p-7 transition-all duration-300 md:hover:-translate-y-1 shadow-[0_6px_20px_rgba(0,0,0,0.04)] md:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />

          {/* Header: title left · badges stacked + aligned right */}
          <div className="flex items-start justify-between gap-2 mb-2 md:mb-5">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-accent-yellow/12 border border-accent-yellow/25 flex items-center justify-center text-amber-700 dark:text-accent-yellow shrink-0">
                <span className="material-symbols-outlined !text-[16px] md:!text-[20px]">school</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.12em] md:tracking-[0.14em] text-gray-900 dark:text-white">
                  Next&apos;Founder
                </h3>
                <p className="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 mt-0 leading-tight md:mt-0.5">
                  Students &amp; first builders
                </p>
              </div>
            </div>
            {/* Stacked badges — same right edge, consistent width */}
            <div className="flex flex-col items-end gap-1 shrink-0 pt-0.5">
              <span className="inline-flex items-center justify-center min-w-[4.5rem] rounded-full border border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400 font-mono text-[8px] md:text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                Students
              </span>
              <span className="md:hidden inline-flex items-center justify-center min-w-[4.5rem] rounded-full border border-red-500/25 bg-red-500/10 text-red-500 font-mono text-[8px] font-black px-2 py-0.5 uppercase tracking-wider">
                Limited
              </span>
            </div>
          </div>

          <h4 className="hidden md:block font-mono text-base font-bold text-gray-900 dark:text-white leading-snug mb-1.5">
            Built for students shipping their first startup.
          </h4>
          <p className="hidden md:block text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
            Active students and indie builders — no revenue or funding required.
          </p>

          <div className="mb-2.5 md:mb-5">
            <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
              <span className="font-mono text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-black text-gray-900 dark:text-white leading-none tracking-tight">
                $1
              </span>
              <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-500">
                first month
              </span>
            </div>
            <div className="mt-1 md:mt-2 inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-md bg-accent-yellow/15 border border-accent-yellow/30 font-mono text-[9px] md:text-[10px] font-black text-amber-800 dark:text-accent-yellow uppercase tracking-wide">
              Launch price · $59 later
            </div>
            {/*
              Auto-renewing paid trial: the renewal amount and timing must be
              stated before checkout, not only in the receipt.
            */}
            <p className="mt-1.5 md:mt-2 text-[9px] md:text-[10px] leading-snug text-gray-500 dark:text-gray-400">
              Then <span className="font-bold text-gray-700 dark:text-gray-300">$14.99/yr</span>,
              billed automatically after 30 days. Cancel anytime before renewal.
            </p>
          </div>

          <ul className="space-y-1 md:space-y-2.5 mb-3 md:mb-6 flex-1">
            {NEXT_FEATURES.map((feat, i) => {
              const isExtra = i >= 3
              return (
                <li
                  key={feat}
                  className={`items-start gap-1.5 md:gap-2.5 text-[11px] md:text-[12.5px] text-gray-600 dark:text-gray-300 ${
                    isExtra && !expanded ? 'hidden md:flex' : 'flex'
                  }`}
                >
                  <span
                    className="material-symbols-outlined !text-[13px] md:!text-[15px] text-accent-yellow mt-0.5 shrink-0"
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
                className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wide text-accent-yellow active:opacity-80"
              >
                <span className="material-symbols-outlined !text-[14px]">
                  {expanded ? 'expand_less' : 'add'}
                </span>
                {expanded ? 'Show less' : `+${NEXT_FEATURES.length - 3} more benefits`}
              </button>
            </li>
          </ul>

          <div className="mt-auto">
            <button
              type="button"
              onClick={() => onCheckout()}
              disabled={loadingPlan === 'nextfounder'}
              className="w-full inline-flex items-center justify-center gap-1.5 h-11 md:h-12 min-h-[44px] md:min-h-[48px] px-3 md:px-4 font-mono font-black text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.12em] text-gray-900 dark:text-white border-2 border-gray-900 dark:border-white/80 active:bg-gray-900 active:text-white dark:active:bg-white dark:active:text-black md:hover:bg-gray-900 md:hover:text-white dark:md:hover:bg-white dark:md:hover:text-black rounded-lg md:rounded-xl transition-all disabled:opacity-60"
            >
              <span>{loadingPlan === 'nextfounder' ? 'Redirecting…' : 'Start for $1'}</span>
              <span className="material-symbols-outlined !text-[15px] md:!text-[16px]">arrow_forward</span>
            </button>
            <p className="mt-1.5 md:mt-2.5 text-center text-[9px] md:text-[10px] text-gray-500 font-mono">
              Students only · Cancel anytime
            </p>
          </div>
        </article>


  )
}
