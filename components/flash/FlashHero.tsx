import FlashCountdown from './FlashCountdown'
import FlashCoupon from './FlashCoupon'

function Sparkle({ className, delay, size = 24 }: { className?: string; delay: string; size?: number }) {
  return (
    <svg 
      className={`absolute pointer-events-none opacity-80 ${className || ''}`}
      width={size} height={size} viewBox="0 0 24 24" 
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: `pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite ${delay}` }}
    >
      <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="#ffd700" filter="drop-shadow(0 0 4px #ffd700)" />
    </svg>
  )
}

/** Large glowing gold lightning bolt watermark */
function LightningBolt() {
  return (
    <div className="animate-[pulse_3s_ease-in-out_infinite]">
      <svg
        viewBox="0 0 120 240"
        aria-hidden="true"
        width="140"
        height="280"
        style={{
          filter:
            'drop-shadow(0 0 18px rgba(255,215,0,0.65)) drop-shadow(0 0 50px rgba(255,215,0,0.25))',
        }}
      >
        <defs>
          <linearGradient id="boltMain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffde0" />
            <stop offset="25%" stopColor="#ffd700" />
            <stop offset="65%" stopColor="#e09900" />
            <stop offset="100%" stopColor="#7a5500" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="boltGlowFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Glow layer */}
        <path
          d="M74 6 L26 128 H58 L44 234 L98 96 H62 Z"
          fill="url(#boltGlowFill)"
          transform="scale(1.06) translate(-3, -4)"
          className="animate-[pulse_2s_ease-in-out_infinite]"
        />
        {/* Main bolt */}
        <path
          d="M74 6 L26 128 H58 L44 234 L98 96 H62 Z"
          fill="url(#boltMain)"
          stroke="#ffe98a"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function FlashHero() {
  return (
    <section className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-8 overflow-hidden lg:overflow-visible">
      {/* Ambient Sparkles */}
      <Sparkle className="-top-4 left-[10%] lg:left-[-5%] -rotate-12" delay="0s" size={32} />
      <Sparkle className="top-[40%] left-[45%] opacity-50" delay="0.5s" size={16} />
      <Sparkle className="top-8 right-[50%] lg:right-[48%] opacity-60 rotate-45" delay="1s" size={24} />
      <Sparkle className="-bottom-8 left-[20%] opacity-40 -rotate-45" delay="1.5s" size={20} />
      <Sparkle className="bottom-[10%] right-[-2%] opacity-70 rotate-12" delay="0.8s" size={28} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">

        {/* ── Left: headline + coupon ── */}
        <div className="flex flex-col justify-center">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 mb-4 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="font-mono font-black text-[9px] uppercase tracking-[0.2em] text-red-400">
              Live — Deals active now
            </span>
          </div>

          <h1 className="font-heading font-black uppercase tracking-[-0.02em] leading-[0.92]">
            <span className="flex items-center gap-3 text-[38px] md:text-[48px] lg:text-[54px] text-accent-yellow">
              <span
                className="material-symbols-outlined text-[38px] md:text-[48px]"
                style={{
                  fontVariationSettings: "'FILL' 1",
                  filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.8)) drop-shadow(0 0 30px rgba(255,215,0,0.4))',
                }}
              >
                bolt
              </span>
              Flash Deals.
            </span>
            <span className="block text-[26px] md:text-[34px] lg:text-[38px] text-gray-900 dark:text-white mt-1.5 leading-tight">
              Deals that disappear fast.
            </span>
          </h1>

          <p className="font-sans text-[13px] md:text-sm text-gray-650 dark:text-gray-400 leading-relaxed mt-4 max-w-md">
            Limited-time offers on top tools and credits.{' '}
            <span className="text-gray-800 dark:text-gray-300 font-medium">New deals every week.</span>{' '}
            Gone when the timer hits zero.
          </p>

          <div className="mt-5 max-w-md">
            <FlashCoupon />
          </div>
        </div>

        {/* ── Right: countdown card ── */}
        {/*
          NOTE: overflow-hidden is intentionally NOT set here so the
          lightning bolt SVG (which extends beyond the card edge) remains
          visible. The inner glow blob is the only element that bleeds out.
        */}
        <div className="relative bg-gradient-to-br from-[#1c1a0e] via-[#0d0d0d] to-[#000000] border border-accent-yellow/35 p-5 md:p-7 flex flex-col justify-center min-h-[240px]">
          {/* Scan-line texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.035] rounded-[inherit]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(255,215,0,1) 0px, rgba(255,215,0,1) 1px, transparent 1px, transparent 5px)',
            }}
          />

          {/* Top gold accent bar */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,215,0,0.7) 40%, rgba(255,215,0,0.7) 60%, transparent)',
            }}
          />

          {/* Ambient glow behind the bolt */}
          <div
            aria-hidden="true"
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-48 h-72 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse, rgba(255,215,0,0.12) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          {/* ⚡ The lightning bolt — positioned absolutely on the right, z above bg decorators */}
          <div
            className="absolute right-[-8px] top-1/2 -translate-y-1/2 pointer-events-none z-[1] transition-transform duration-1000 hover:scale-105"
            aria-hidden="true"
          >
            <LightningBolt />
          </div>

          {/* Content — sits above the bolt so it doesn't obscure text */}
          <div className="relative z-10 md:max-w-[68%]">
            <p className="flex items-center gap-2 font-mono font-bold text-[10px] uppercase tracking-[0.22em] text-accent-yellow mb-4">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              Deals end in
            </p>

            <FlashCountdown nextDrop variant="hero" />

            <div className="mt-5 flex items-center gap-2 bg-black/50 border border-white/[0.08] px-3 py-2.5">
              <span className="material-symbols-outlined text-accent-yellow text-[17px]">calendar_month</span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-gray-300">
                New flash deals drop every week
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
