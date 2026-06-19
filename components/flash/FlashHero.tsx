import FlashCountdown from './FlashCountdown'
import FlashCoupon from './FlashCoupon'

/** Glowing gold lightning bolt used as the hero's right-side graphic. */
function LightningBolt() {
  return (
    <svg
      viewBox="0 0 120 240"
      aria-hidden="true"
      className="h-[115%] w-auto"
      style={{ filter: 'drop-shadow(0 0 14px rgba(255,215,0,0.55))' }}
    >
      <defs>
        <linearGradient id="flashBoltGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3ad" />
          <stop offset="45%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#c08a00" />
        </linearGradient>
      </defs>
      <path
        d="M74 6 L26 128 H58 L44 234 L98 96 H62 Z"
        fill="url(#flashBoltGrad)"
        stroke="#ffe98a"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function FlashHero() {
  return (
    <section className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* ── Left: headline + coupon ── */}
        <div>
          <h1 className="font-heading font-black uppercase tracking-[-0.02em] leading-[0.95]">
            <span className="flex items-center gap-2.5 text-3xl md:text-4xl lg:text-[46px] text-accent-yellow">
              <span
                className="material-symbols-outlined text-[34px] md:text-[42px]"
                style={{ fontVariationSettings: "'FILL' 1", filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))' }}
              >
                bolt
              </span>
              Flash Deals.
            </span>
            <span className="block text-2xl md:text-3xl lg:text-[40px] text-white mt-2">
              Deals that disappear fast.
            </span>
          </h1>

          <p className="font-sans text-sm text-gray-400 leading-relaxed mt-4 max-w-md">
            Limited-time offers on top tools and credits.
            <br className="hidden sm:block" />
            New deals every week. Gone when the timer hits zero.
          </p>

          <div className="mt-6 max-w-md">
            <FlashCoupon />
          </div>
        </div>

        {/* ── Right: countdown card ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#15140f] via-[#0c0c0c] to-black border border-accent-yellow/30 p-5 md:p-6 flex flex-col justify-center min-h-[230px]">
          {/* Glowing lightning + halo on the right */}
          <div
            aria-hidden="true"
            className="absolute right-[-26px] top-1/2 -translate-y-1/2 w-44 h-56 bg-accent-yellow/10 blur-3xl rounded-full pointer-events-none"
          />
          <div className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <LightningBolt />
          </div>

          <div className="relative z-10 md:max-w-[74%]">
            <p className="flex items-center gap-2 font-mono font-bold text-[11px] uppercase tracking-[0.18em] text-accent-yellow mb-4">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
              Deals end in
            </p>

            <FlashCountdown nextDrop variant="hero" />

            <div className="mt-5 flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-2.5">
              <span className="material-symbols-outlined text-accent-yellow text-[18px]">calendar_month</span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-gray-300">
                New flash deals drop every Monday &amp; Thursday
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
