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
  onCheckout: (mode: 'trial' | 'annual') => void
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
            Every deal, credit, grant and program. Unlimited claims.
          </p>

          <div className="mb-2.5 md:mb-5">
            <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
              {/* Annual price leads; the trial is the entry point, not the headline. */}
              <span className="font-mono text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-black text-gray-900 dark:text-white leading-none tracking-tight">
                $48
              </span>
              <span className="font-mono text-sm md:text-base text-gray-400 dark:text-gray-500 line-through font-bold">
                $149
              </span>
              <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-500">
                /yr
              </span>
            </div>
            {/* Primary value claim — deliberately the loudest element on the card. */}
            <div className="mt-1.5 md:mt-2.5 inline-flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-md bg-accent-yellow text-black border border-black/10 shadow-[2px_2px_0_#000] font-mono text-[10px] md:text-[12px] font-black uppercase tracking-wide">
              <span
                className="material-symbols-outlined !text-[13px] md:!text-[15px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              Save up to $10,000+ in year 1
            </div>
            <div className="mt-1.5 md:mt-2">
              <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded-md bg-accent-yellow/15 border border-accent-yellow/30 font-mono text-[9px] md:text-[10px] font-black text-amber-800 dark:text-accent-yellow uppercase tracking-wide">
                30-day trial · $9.99
              </span>
            </div>
            {/* Trial terms: amount, duration and renewal price stated up front. */}
            <p className="mt-1.5 md:mt-2 text-[10px] md:text-[11px] leading-snug text-gray-600 dark:text-gray-300">
              Pay <span className="font-black text-gray-900 dark:text-white">$9.99</span> for your
              first month, then $48/yr. Cancel anytime.
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
            {/* Primary: paid trial. Secondary: buy the full year outright. */}
            <button
              type="button"
              onClick={() => onCheckout('trial')}
              disabled={loadingPlan !== null}
              className="w-full inline-flex items-center justify-center gap-1.5 h-11 md:h-12 min-h-[44px] md:min-h-[48px] px-3 md:px-4 bg-accent-yellow active:bg-yellow-300 md:hover:bg-yellow-300 text-black font-mono font-black text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.12em] rounded-lg md:rounded-xl transition-all shadow-[0_4px_16px_rgba(255,213,0,0.25)] disabled:opacity-60"
            >
              <span>
                {loadingPlan === 'founder:trial' ? 'Redirecting…' : 'Try 30 days · $9.99'}
              </span>
              <span className="material-symbols-outlined !text-[15px] md:!text-[16px]">arrow_forward</span>
            </button>
            {/*
              Annual purchase. The badge is inverted (dark fill, accent text) so it
              reads as a separate label instead of blending into the yellow trial
              button directly above it.
            */}
            <div className="relative mt-3.5 md:mt-4">
              <span className="absolute -top-2 left-2.5 z-10 px-1.5 py-px rounded-sm bg-black dark:bg-white text-accent-yellow dark:text-black font-mono text-[8px] md:text-[8.5px] font-black uppercase tracking-[0.08em] border border-accent-yellow dark:border-black/20">
                Price rises soon
              </span>
              <button
                type="button"
                onClick={() => onCheckout('annual')}
                disabled={loadingPlan !== null}
                className="w-full inline-flex items-center justify-center gap-1.5 h-10 md:h-11 min-h-[40px] md:min-h-[44px] px-3 md:px-4 border-2 border-gray-900 dark:border-white/70 text-gray-900 dark:text-white font-mono font-black text-[10px] md:text-[11px] uppercase tracking-[0.1em] active:bg-gray-900 active:text-white md:hover:bg-gray-900 md:hover:text-white dark:md:hover:bg-white dark:md:hover:text-black rounded-lg md:rounded-xl transition-all disabled:opacity-60"
              >
                {loadingPlan === 'founder:annual' ? 'Redirecting…' : 'Buy 1 year · $48'}
              </button>
            </div>
            <p className="mt-1.5 md:mt-2.5 text-center text-[9px] md:text-[10px] text-gray-500 font-mono">
              Instant access · Cancel anytime
            </p>
          </div>
        </article>


  )
}
