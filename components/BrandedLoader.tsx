'use client'

import { useEffect, useState } from 'react'

const STAGES = [
  'Booting terminal…',
  'Loading verified deals…',
  'Syncing founder catalog…',
  'Almost ready…',
]

export default function BrandedLoader() {
  const [percent, setPercent] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setPercent(100)
      return
    }

    let frame = 0
    let raf = 0
    const start = performance.now()
    // Ease toward ~92% then settle; route change unmounts this component
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 2200)
      // ease-out cubic, asymptote below 100 so it never feels stuck at full
      const eased = 1 - Math.pow(1 - t, 3)
      const next = Math.min(96, Math.round(eased * 96))
      setPercent(next)
      frame += 1
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduceMotion])

  const stageIndex = Math.min(
    STAGES.length - 1,
    Math.floor((percent / 100) * STAGES.length)
  )

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#000000] flex flex-col items-center justify-center px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading FoundersPrime"
    >
      {/* Ambient gold bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] h-[min(70vw,420px)] w-[min(90vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.12)_0%,rgba(255,215,0,0.03)_45%,transparent_70%)]"
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 45%, #000 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 45%, #000 20%, transparent 75%)',
        }}
        aria-hidden
      />

      {/* Corner marks — terminal aesthetic */}
      <div aria-hidden className="pointer-events-none absolute inset-6 md:inset-10">
        <span className="absolute top-0 left-0 h-3 w-3 border-l border-t border-white/15" />
        <span className="absolute top-0 right-0 h-3 w-3 border-r border-t border-white/15" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-l border-b border-white/15" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-r border-b border-white/15" />
      </div>

      {/* Live pill */}
      <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full bg-accent-yellow ${reduceMotion ? '' : 'animate-pulse'}`}
        />
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400">
          Live · Founder terminal
        </span>
      </div>

      {/* Orbital brand mark */}
      <div className="relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center mb-6">
        <div
          className={`absolute w-28 h-28 rounded-full bg-[#ffd700]/12 blur-2xl pointer-events-none ${reduceMotion ? '' : 'animate-pulse'}`}
          aria-hidden
        />

        {!reduceMotion && (
          <>
            <div
              className="absolute w-[11.5rem] h-[11.5rem] md:w-[13rem] md:h-[13rem] rounded-full border border-white/[0.06]"
              style={{ animation: 'fpLoaderSpin 14s linear infinite' }}
              aria-hidden
            />
            <div
              className="absolute w-[9rem] h-[9rem] md:w-40 md:h-40 rounded-full border border-accent-yellow/20"
              style={{ animation: 'fpLoaderSpin 9s linear infinite reverse' }}
              aria-hidden
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-yellow shadow-[0_0_12px_#ffd700]" />
              <span className="absolute bottom-3 left-3 w-1 h-1 rounded-full bg-accent-yellow/50" />
            </div>
            <div
              className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full border border-white/[0.08]"
              style={{ animation: 'fpLoaderSpin 7s linear infinite' }}
              aria-hidden
            />
          </>
        )}

        <div className="relative z-10 w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] bg-[#0a0a0a] border border-white/12 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.12)]">
          <img
            src="/FPLogo.png"
            alt=""
            className="w-11 h-11 md:w-12 md:h-12 object-contain"
            aria-hidden
          />
        </div>
      </div>

      {/* Wordmark */}
      <div className="font-mono text-xl md:text-2xl font-black tracking-[0.16em] text-white uppercase mb-2 flex items-center justify-center">
        <span>Founders</span>
        <span className="text-accent-yellow mx-0.5">[</span>
        <span>Prime</span>
        <span className="text-accent-yellow mx-0.5">]</span>
      </div>

      <p className="font-sans text-[13px] text-zinc-400 text-center mb-8 max-w-sm leading-relaxed">
        Build more. <span className="text-white font-medium">Burn less.</span>
      </p>

      {/* Progress */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3 mb-12">
        <div className="w-full flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {STAGES[stageIndex]}
          </span>
          <span className="font-mono text-[12px] font-bold text-accent-yellow tabular-nums">
            {percent}%
          </span>
        </div>
        <div
          className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden border border-white/[0.06]"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-yellow via-yellow-300 to-accent-yellow shadow-[0_0_12px_rgba(255,215,0,0.45)] transition-[width] duration-150 ease-out"
            style={{
              width: `${percent}%`,
              backgroundSize: '200% 100%',
              animation: reduceMotion ? undefined : 'fpLoaderSheen 1.6s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Footer trust chips */}
      <div className="flex items-center justify-center gap-4 md:gap-6 border-t border-white/[0.06] pt-5 text-[10px] font-mono text-zinc-500 w-full max-w-md flex-wrap">
        {[
          { icon: 'verified_user', label: 'Verified deals' },
          { icon: 'bolt', label: 'Weekly updates' },
          { icon: 'savings', label: '$500K+ credits' },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center gap-3">
            {i > 0 && <span className="hidden sm:block h-3 w-px bg-white/10 -ml-3" aria-hidden />}
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined !text-[14px] text-accent-yellow">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fpLoaderSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fpLoaderSheen {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
