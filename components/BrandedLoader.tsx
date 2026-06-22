/**
 * Premium loading splash — neo-brutalist mark with a slow rotating mandala
 * halo and animated progress sweep. Pure CSS animations, zero runtime cost.
 *
 * Used as the suspense fallback for app routes. Keep it lightweight: no
 * remote assets, no client-side state.
 *
 * Always renders in dark-mode palette to prevent light-flash during
 * dark-mode navigation (the html.dark class is set synchronously by the
 * inline script in layout.tsx, but CSS Tailwind dark: variants on the
 * loading shell can lag one paint frame — using explicit dark values avoids
 * that flicker entirely).
 */
export default function BrandedLoader() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] flex items-center justify-center px-6">
      {/* Subtle grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      {/* Ambient yellow glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,221,0,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo + rotating mandala halo */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer mandala — clockwise */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full splash-mandala-spin"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.6"
            aria-hidden="true"
          >
            <circle cx="100" cy="100" r="80" strokeDasharray="2 6" />
            <circle cx="100" cy="100" r="65" strokeDasharray="1 4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <line x1="100" y1="20" x2="100" y2="35" />
                <circle cx="100" cy="20" r="2" fill="rgba(255,255,255,0.15)" />
              </g>
            ))}
          </svg>

          {/* Inner mandala — counter-clockwise (accent yellow) */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full splash-mandala-spin-reverse"
            fill="none"
            stroke="rgba(255,221,0,0.25)"
            strokeWidth="0.7"
            aria-hidden="true"
          >
            <circle cx="100" cy="100" r="50" strokeDasharray="3 3" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <line x1="100" y1="50" x2="100" y2="60" strokeWidth="1" stroke="rgba(255,221,0,0.35)" />
              </g>
            ))}
          </svg>

          {/* Logo tile */}
          <div className="relative w-12 h-12 bg-[#0c0c0c] border border-white/10 flex items-center justify-center shadow-[3px_3px_0px_rgba(255,221,0,0.15)] splash-logo-pulse">
            <img
              src="/FPLogo.png"
              alt=""
              className="w-9 h-9 object-contain"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Wordmark */}
        <div className="font-mono text-base font-black tracking-[0.18em] text-white uppercase">
          <span>FOUNDERS</span>
          <span style={{ color: '#FFD700' }}>[</span>
          <span>PRIME</span>
          <span style={{ color: '#FFD700' }}>]</span>
        </div>

        {/* Progress bar */}
        <div className="relative w-40 h-[2px] bg-white/10 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1/3 splash-progress-sweep" style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }} />
        </div>

        {/* Loading text — accessibility */}
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500" aria-live="polite">
          Loading
          <span className="splash-dot-1">.</span>
          <span className="splash-dot-2">.</span>
          <span className="splash-dot-3">.</span>
        </p>
      </div>

      {/* Pure-CSS keyframes — no JS, no client hydration */}
      <style>{`
        @keyframes splashMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes splashMandalaSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes splashLogoPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes splashProgressSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes splashDot {
          0%, 20% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        .splash-mandala-spin { animation: splashMandalaSpin 8s linear infinite; transform-origin: center; }
        .splash-mandala-spin-reverse { animation: splashMandalaSpinReverse 6s linear infinite; transform-origin: center; }
        .splash-logo-pulse { animation: splashLogoPulse 1.6s ease-in-out infinite; }
        .splash-progress-sweep { animation: splashProgressSweep 1.4s ease-in-out infinite; }
        .splash-dot-1 { animation: splashDot 1.2s ease-in-out infinite; }
        .splash-dot-2 { animation: splashDot 1.2s ease-in-out infinite 0.2s; }
        .splash-dot-3 { animation: splashDot 1.2s ease-in-out infinite 0.4s; }
        @media (prefers-reduced-motion: reduce) {
          .splash-mandala-spin,
          .splash-mandala-spin-reverse,
          .splash-logo-pulse,
          .splash-progress-sweep,
          .splash-dot-1,
          .splash-dot-2,
          .splash-dot-3 {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
