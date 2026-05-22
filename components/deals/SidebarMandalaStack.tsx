'use client'

/**
 * Decorative mandala stack rendered below the sticky CategorySidebar.
 * Reveals as the user scrolls past the categories — fills the empty
 * left-column space with subtle premium ornamentation.
 *
 * Copy intentionally diplomatic — deals depend on third-party providers
 * who may change terms or pause programs without notice.
 */
export default function SidebarMandalaStack() {
  return (
    <div className="hidden lg:block mt-4 space-y-3" aria-hidden="true">
      {/* Top tile — Curation note (dark) */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white rounded-xl p-4 overflow-hidden border border-gray-800 stack-tile-fade-in">
        {/* Layered mandalas — primary + secondary for depth */}
        <div className="absolute -top-8 -right-8 w-32 h-32 pointer-events-none opacity-[0.18]">
          <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow stack-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
            <circle cx="100" cy="100" r="40" />
            <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
            <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <line x1="100" y1="40" x2="100" y2="20" />
                <circle cx="100" cy="20" r="2" fill="currentColor" />
              </g>
            ))}
            <circle cx="100" cy="100" r="3" fill="currentColor" />
          </svg>
        </div>
        {/* Inner counter-rotating ring for depth */}
        <div className="absolute top-2 right-2 w-16 h-16 pointer-events-none opacity-[0.14]">
          <svg viewBox="0 0 100 100" className="w-full h-full text-accent-yellow stack-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.7">
            <circle cx="50" cy="50" r="20" strokeDasharray="2 3" />
            {[...Array(6)].map((_, i) => (
              <circle
                key={i}
                cx={50 + Math.cos((i * Math.PI) / 3) * 30}
                cy={50 + Math.sin((i * Math.PI) / 3) * 30}
                r="1.5"
                fill="currentColor"
              />
            ))}
          </svg>
        </div>
        {/* Subtle gradient shimmer */}
        <div className="absolute inset-0 stack-tile-shimmer pointer-events-none" />

        <div className="relative">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-accent-yellow mb-2 inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent-yellow animate-pulse" />
            Curated Catalog
          </p>
          <p className="font-mono text-2xl font-black leading-none text-white mb-2 tabular-nums stack-counter-fade">
            500+
          </p>
          <p className="text-[11.5px] text-gray-300 leading-relaxed">
            Each opportunity is reviewed by our team before it goes live, with eligibility and terms summarized for clarity.
          </p>
        </div>
      </div>

      {/* Middle tile — Refreshed (light) */}
      <div className="relative bg-white border border-gray-200 rounded-xl p-4 overflow-hidden stack-tile-fade-in" style={{ animationDelay: '0.1s' }}>
        {/* Layered mandalas */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.10]">
          <svg viewBox="0 0 200 200" className="w-40 h-40 text-gray-900 stack-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.6">
            <circle cx="100" cy="100" r="50" />
            <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + Math.cos((i * Math.PI) / 6) * 90}
                y2={100 + Math.sin((i * Math.PI) / 6) * 90}
              />
            ))}
            <circle cx="100" cy="100" r="2" fill="currentColor" />
          </svg>
        </div>
        {/* Outer slow ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
          <svg viewBox="0 0 200 200" className="w-48 h-48 text-amber-500 stack-mandala-spin-slow" fill="none" stroke="currentColor" strokeWidth="0.8">
            <circle cx="100" cy="100" r="80" strokeDasharray="1 5" />
            <circle cx="100" cy="100" r="95" strokeDasharray="0.5 8" />
          </svg>
        </div>

        <div className="relative text-center py-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 mb-2.5 stack-icon-pulse">
            <span className="material-symbols-outlined text-[20px] text-amber-600">verified</span>
          </div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 mb-1">
            Reviewed Regularly
          </p>
          <p className="font-mono text-base font-black text-gray-900 leading-tight tabular-nums mb-1">
            Daily Checks
          </p>
          <p className="text-[10.5px] text-gray-500 leading-relaxed">
            Provider terms can change — we update listings as we learn.
          </p>
        </div>
      </div>

      {/* Bottom tile — Founder Tip with orbital mandala */}
      <div className="relative bg-gray-50 border border-gray-200 rounded-xl p-4 overflow-hidden stack-tile-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 pointer-events-none opacity-[0.10]">
          <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 stack-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
            {[20, 35, 50, 65].map((r, i) => (
              <ellipse
                key={i}
                cx="100"
                cy="100"
                rx={r}
                ry={r / 1.8}
                transform={`rotate(${i * 30} 100 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="2" fill="currentColor" />
          </svg>
        </div>
        {/* Soft top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent" />

        <div className="relative">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-gray-500 mb-1.5 inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent-yellow" />
            How to Get Approved
          </p>
          <p className="text-[12px] text-gray-700 leading-relaxed mb-3">
            Apply with a <span className="font-semibold text-gray-900">work email matching your domain</span>. Founders who do tend to see higher approval rates from most providers.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wide text-gray-700 pt-2 border-t border-gray-200">
            <span className="material-symbols-outlined text-[14px] text-accent-yellow stack-bolt-pulse">bolt</span>
            <span>Match · Apply · Track</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Mandala spins — multiple speeds for layered depth */
        @keyframes stackMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes stackMandalaSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes stackMandalaSpinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        :global(.stack-mandala-spin) {
          animation: stackMandalaSpin 70s linear infinite;
          transform-origin: center;
        }
        :global(.stack-mandala-spin-reverse) {
          animation: stackMandalaSpinReverse 90s linear infinite;
          transform-origin: center;
        }
        :global(.stack-mandala-spin-slow) {
          animation: stackMandalaSpinSlow 140s linear infinite;
          transform-origin: center;
        }

        /* Fade-in entry — staggered via inline animation-delay */
        @keyframes stackTileFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        :global(.stack-tile-fade-in) {
          animation: stackTileFadeIn 0.55s cubic-bezier(0.4, 0, 0.2, 1) backwards;
        }

        /* Counter fade-in */
        @keyframes stackCounterFade {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        :global(.stack-counter-fade) {
          animation: stackCounterFade 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;
          transform-origin: left center;
        }

        /* Subtle diagonal shimmer over dark tile */
        @keyframes stackTileShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        :global(.stack-tile-shimmer) {
          background: linear-gradient(115deg, transparent 30%, rgba(255, 221, 0, 0.04) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: stackTileShimmer 8s ease-in-out infinite;
        }

        /* Icon ring pulse */
        @keyframes stackIconPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.18); }
          50% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
        }
        :global(.stack-icon-pulse) {
          animation: stackIconPulse 2.6s ease-in-out infinite;
        }

        /* Bolt micro-pulse */
        @keyframes stackBoltPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.12); opacity: 0.85; }
        }
        :global(.stack-bolt-pulse) {
          animation: stackBoltPulse 2.2s ease-in-out infinite;
          display: inline-block;
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.stack-mandala-spin),
          :global(.stack-mandala-spin-reverse),
          :global(.stack-mandala-spin-slow),
          :global(.stack-tile-fade-in),
          :global(.stack-counter-fade),
          :global(.stack-tile-shimmer),
          :global(.stack-icon-pulse),
          :global(.stack-bolt-pulse) {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
