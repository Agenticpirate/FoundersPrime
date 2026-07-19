'use client'

/**
 * Decorative mandala layers for the Dashboard hero.
 * Slow rotating SVGs, pure CSS, respect prefers-reduced-motion.
 */
export default function DashboardMandala() {
  return (
    <>
      {/* Top-right concentric mandala */}
      <div className="absolute -top-16 right-1/4 w-56 h-56 pointer-events-none opacity-[0.08] hidden md:block" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow dashboard-hero-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <line x1="100" y1="40" x2="100" y2="20" />
              <circle cx="100" cy="20" r="2" fill="currentColor" />
            </g>
          ))}
          <circle cx="100" cy="100" r="3" fill="currentColor" />
        </svg>
      </div>

      {/* Bottom-left radial mandala */}
      <div className="absolute -bottom-12 left-12 w-36 h-36 pointer-events-none opacity-[0.06] hidden md:block" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-full h-full text-white dashboard-hero-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
          {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => (
            <line
              key={`dash-ray-${deg}`}
              x1="100"
              y1="100"
              x2={100 + Math.cos((deg * Math.PI) / 180) * 90}
              y2={100 + Math.sin((deg * Math.PI) / 180) * 90}
            />
          ))}
          <circle cx="100" cy="100" r="2" fill="currentColor" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes dashboardHeroMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dashboardHeroMandalaSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        :global(.dashboard-hero-mandala-spin) {
          animation: dashboardHeroMandalaSpin 90s linear infinite;
          transform-origin: center;
        }
        :global(.dashboard-hero-mandala-spin-reverse) {
          animation: dashboardHeroMandalaSpinReverse 110s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.dashboard-hero-mandala-spin),
          :global(.dashboard-hero-mandala-spin-reverse) {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}
