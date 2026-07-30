'use client'

const FOUNDER_FEATURES = [
  'Cloud credits (AWS, GCP, Azure)',
  'SaaS: HubSpot, Stripe & 100+',
  'Unlimited claims, every category',
  'Funding & grants by stage',
  'Accelerators & fellowships',
  'Founder Vault & ideas hub',
]

export default function PricingPlanFounder({
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
        <article className="group relative flex flex-col order-2 bg-white dark:bg-[#0c0b08] border-2 border-accent-yellow/50 rounded-xl md:rounded-2xl p-3.5 sm:p-5 md:p-7 pt-5 md:pt-8 transition-all duration-300 md:scale-[1.02] z-10 shadow-[0_8px_28px_rgba(255,213,0,0.1)] md:shadow-[0_12px_40px_rgba(255,213,0,0.08)] overflow-visible">
          <div className="absolute -top-2.5 md:-top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <span className="inline-flex items-center gap-1 whitespace-nowrap bg-accent-yellow text-black font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.12em] px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full shadow-[2px_2px_0_#000] border border-black/10">
              Most popular
            </span>
          </div>

          <div className="flex items-start justify-between gap-2 mb-2 md:mb-5">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-accent-yellow/15 border border-accent-yellow/30 flex items-center justify-center text-amber-800 dark:text-accent-yellow shrink-0">
                <span className="material-symbols-outlined !text-[16px] md:!text-[20px]">rocket_launch</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.12em] md:tracking-[0.14em] text-gray-900 dark:text-white">
                  Founder
                </h3>
                <p className="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 mt-0 leading-tight md:mt-0.5">
                  Full catalog access
                </p>
              </div>
            </div>
            <span className="shrink-0 inline-flex items-center justify-center rounded-full border border-accent-yellow/40 bg-accent-yellow/15 text-amber-800 dark:text-accent-yellow font-mono text-[8px] md:text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
              Popular
            </span>
          </div>

          <h4 className="hidden md:block font-mono text-base font-bold text-gray-900 dark:text-white leading-snug mb-1.5">
            Everything you need to scale.
          </h4>
          <p className="hidden md:block text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
            Full catalog while you ship and grow — cloud, SaaS, grants, and more.
          </p>

          <div className="mb-2.5 md:mb-5">
            <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
              <span className="font-mono text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-black text-gray-900 dark:text-white leading-none tracking-tight">
                $9.99
              </span>
              <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-500">
                first month
              </span>
            </div>
            <div className="mt-1 md:mt-2 inline-flex items-center gap-1 px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-md bg-accent-yellow text-black font-mono text-[9px] md:text-[10px] font-black tracking-wide">
              <span className="material-symbols-outlined !text-[11px] md:!text-[12px]">bolt</span>
              Save $3,000+ yr 1
            </div>
            {/*
              Auto-renewing paid trial: the renewal amount and timing must be
              stated before checkout, not only in the receipt.
            */}
            <p className="mt-1.5 md:mt-2 text-[9px] md:text-[10px] leading-snug text-gray-500 dark:text-gray-400">
              Then <span className="font-bold text-gray-700 dark:text-gray-300">$48/yr</span>{' '}
              <span className="line-through">$149</span>, billed automatically after 30 days. Cancel
              anytime before renewal.
            </p>
          </div>

          <ul className="space-y-1 md:space-y-2.5 mb-3 md:mb-6 flex-1">
            <li className="flex items-start gap-1.5 md:gap-2 text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wide text-gray-900 dark:text-white">
              <span className="material-symbols-outlined !text-[13px] md:!text-[15px] shrink-0">add_circle</span>
              Everything in Next&apos;Founder, plus
            </li>
            {FOUNDER_FEATURES.map((feat, i) => {
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
                {expanded ? 'Show less' : `+${FOUNDER_FEATURES.length - 3} more benefits`}
              </button>
            </li>
          </ul>

          <div className="mt-auto">
            <button
              type="button"
              onClick={() => onCheckout()}
              disabled={loadingPlan === 'founder'}
              className="w-full inline-flex items-center justify-center gap-1.5 h-11 md:h-12 min-h-[44px] md:min-h-[48px] px-3 md:px-4 bg-accent-yellow active:bg-yellow-300 md:hover:bg-yellow-300 text-black font-mono font-black text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.12em] rounded-lg md:rounded-xl transition-all shadow-[0_4px_16px_rgba(255,213,0,0.25)] disabled:opacity-60"
            >
              <span>{loadingPlan === 'founder' ? 'Redirecting…' : 'Start for $9.99'}</span>
              <span className="material-symbols-outlined !text-[15px] md:!text-[16px]">arrow_forward</span>
            </button>
            <p className="mt-1.5 md:mt-2.5 text-center text-[9px] md:text-[10px] text-gray-500 font-mono">
              Instant access · Cancel anytime
            </p>
          </div>
        </article>


  )
}
