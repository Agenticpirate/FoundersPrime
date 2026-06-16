import Link from 'next/link'

/**
 * Decorative mandalas — line art drawn with currentColor so opacity/tint is
 * controlled by the parent className. Three distinct styles for visual variety.
 */

// 1. Lotus — rounded pointed petals over concentric rings + radial spokes.
function MandalaLotus({ className = '' }: { className?: string }) {
  const petals = Array.from({ length: 16 })
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.75" aria-hidden="true">
      <circle cx="100" cy="100" r="98" />
      <circle cx="100" cy="100" r="78" />
      <circle cx="100" cy="100" r="52" />
      <circle cx="100" cy="100" r="28" />
      <circle cx="100" cy="100" r="10" />
      {petals.map((_, i) => (
        <g key={i} transform={`rotate(${(360 / petals.length) * i} 100 100)`}>
          <path d="M100 2 C116 38 116 66 100 98 C84 66 84 38 100 2 Z" />
          <path d="M100 52 C108 66 108 78 100 92 C92 78 92 66 100 52 Z" />
          <line x1="100" y1="100" x2="100" y2="10" />
        </g>
      ))}
    </svg>
  )
}

// 2. Star — angular 8-point star from crossed diamonds, rim ticks + inner triangles.
function MandalaStar({ className = '' }: { className?: string }) {
  const ticks = Array.from({ length: 24 })
  const triangles = Array.from({ length: 12 })
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.75" aria-hidden="true">
      <circle cx="100" cy="100" r="98" />
      <circle cx="100" cy="100" r="64" />
      <circle cx="100" cy="100" r="34" />
      <polygon points="100,6 194,100 100,194 6,100" />
      <polygon points="32,32 168,32 168,168 32,168" />
      <circle cx="100" cy="100" r="9" />
      {ticks.map((_, i) => (
        <line key={`t${i}`} transform={`rotate(${(360 / ticks.length) * i} 100 100)`} x1="100" y1="2" x2="100" y2="14" />
      ))}
      {triangles.map((_, i) => (
        <polygon key={`tri${i}`} transform={`rotate(${(360 / triangles.length) * i} 100 100)`} points="100,30 110,62 90,62" />
      ))}
    </svg>
  )
}

// 3. Tech — circuit-board mandala: gear-tooth rim, dashed rings, radial traces
//    with terminal nodes, and a hexagonal chip core. Fits a dev/SaaS audience.
function MandalaTech({ className = '' }: { className?: string }) {
  const teeth = Array.from({ length: 48 })
  const traces = Array.from({ length: 12 })
  // Hexagon, radius ~34 around centre (100,100)
  const hex = [0, 60, 120, 180, 240, 300]
    .map((deg) => {
      const r = (deg * Math.PI) / 180
      return `${(100 + 34 * Math.cos(r)).toFixed(1)},${(100 + 34 * Math.sin(r)).toFixed(1)}`
    })
    .join(' ')
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.75" aria-hidden="true">
      <circle cx="100" cy="100" r="98" />
      <circle cx="100" cy="100" r="86" strokeDasharray="3 4" />
      <circle cx="100" cy="100" r="60" />
      <circle cx="100" cy="100" r="46" strokeDasharray="2 5" />
      {/* gear-tooth rim */}
      {teeth.map((_, i) => (
        <line key={`g${i}`} transform={`rotate(${(360 / teeth.length) * i} 100 100)`} x1="100" y1="92" x2="100" y2="98" />
      ))}
      {/* radial circuit traces with terminal + junction nodes */}
      {traces.map((_, i) => (
        <g key={`c${i}`} transform={`rotate(${(360 / traces.length) * i} 100 100)`}>
          <line x1="100" y1="60" x2="100" y2="14" />
          <line x1="100" y1="38" x2="90" y2="28" />
          <circle cx="100" cy="14" r="2.6" />
          <circle cx="90" cy="28" r="1.4" />
          <circle cx="100" cy="60" r="1.6" />
        </g>
      ))}
      {/* hexagonal chip core */}
      <polygon points={hex} />
      <circle cx="100" cy="100" r="9" />
      <circle cx="100" cy="100" r="3" />
    </svg>
  )
}

/**
 * FeaturedAdSpot
 * Home-page call-out that sells the Featured advertising placement to SaaS,
 * grants and programs. Positions FoundersPrime as the affordable alternative
 * to pricey SaaS directories — founding rate from $25/week.
 *
 * Links into the existing /submit-deal flow where the Featured tier is chosen.
 */
export default function FeaturedAdSpot() {
  return (
    <section className="relative py-10 md:py-16 border-y-2 border-black bg-accent-yellow overflow-hidden grid-bg">
      {/* Soft glow accents */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />

      {/* Rotating mandala line-art — three distinct styles, sit behind the card */}
      <MandalaLotus className="absolute -top-20 -left-24 w-72 h-72 md:w-96 md:h-96 text-black/[0.07] animate-spin [animation-duration:90s] motion-reduce:animate-none pointer-events-none" />
      <MandalaStar className="absolute -bottom-28 -right-24 w-80 h-80 md:w-[28rem] md:h-[28rem] text-black/[0.06] animate-spin [animation-duration:120s] [animation-direction:reverse] motion-reduce:animate-none pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-black shadow-[6px_6px_0px_#111] bg-[#fdfbf7] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* ── Left: the pitch ── */}
          <div className="relative p-6 sm:p-8 md:p-12 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-black overflow-hidden">
            <MandalaTech className="absolute -bottom-24 -right-16 w-72 h-72 md:w-96 md:h-96 text-black/[0.05] animate-spin [animation-duration:110s] [animation-direction:reverse] motion-reduce:animate-none pointer-events-none" />
            <span className="relative inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-4 self-start">
              <span className="material-symbols-outlined text-[12px]">campaign</span>
              Featured ad slot · Limited
            </span>

            <h2 className="relative text-2xl md:text-4xl font-black text-black font-mono mb-3 uppercase tracking-tight leading-tight">
              Advertise to founders.
              <br />
              <span className="bg-accent-yellow px-2 border-2 border-black inline-block mt-2">
                Without the $1,499/mo price tag.
              </span>
            </h2>

            <p className="relative text-sm md:text-base text-gray-700 mb-5 leading-relaxed max-w-lg font-sans">
              Most SaaS directories charge $500–$1,500 a month for a featured spot — enough
              to make any indie founder think twice. We put your product in front of the same
              high-intent founders, pinned to the top of the homepage and deals feed, for a fraction
              of that.
            </p>

            {/* Price comparison strip */}
            <div className="relative grid grid-cols-2 gap-3 mb-6 max-w-md">
              <div className="bg-white border-2 border-black px-3 py-3 shadow-[2px_2px_0px_#111] opacity-70">
                <p className="font-mono text-[8px] uppercase tracking-widest text-gray-500 mb-1">
                  Typical directory
                </p>
                <p className="font-mono font-black text-lg leading-none line-through decoration-2 decoration-red-500">
                  $500–1,500
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-1">
                  / month
                </p>
              </div>
              <div className="bg-black border-2 border-black px-3 py-3 shadow-[2px_2px_0px_#111]">
                <p className="font-mono text-[8px] uppercase tracking-widest text-accent-yellow mb-1">
                  FoundersPrime
                </p>
                <p className="font-mono font-black text-lg leading-none text-white">from $25</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-1">
                  / week · or $99/mo
                </p>
              </div>
            </div>

            <div className="relative flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-3">
              <Link
                href="/submit-deal?tier=featured"
                className="bg-black text-white border-2 border-black px-5 py-3 font-mono font-black uppercase text-xs tracking-wider flex items-center justify-center sm:justify-start gap-2 hover:bg-accent-yellow hover:text-black transition-colors shadow-[3px_3px_0px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.2)]"
              >
                Get featured
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            <div className="relative mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500">
                Founding rate · locked while slots last
              </span>
            </div>
          </div>

          {/* ── Right: what you get ── */}
          <div className="relative flex bg-[#fdfbf7] p-6 md:p-10 flex-col justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-yellow/40 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

            <p className="relative font-mono text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">
              What a featured slot gets you
            </p>

            <div className="relative space-y-3">
              {[
                { icon: 'push_pin', label: 'Pinned to the top of the homepage & deals feed' },
                { icon: 'verified', label: 'Featured badge that signals trust to founders' },
                { icon: 'groups', label: 'High-intent audience actively hunting for tools' },
                { icon: 'link', label: 'Permanent dofollow backlink — lasting SEO juice for your site' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-white border-2 border-black px-3 py-2.5 shadow-[2px_2px_0px_#111] hover:-translate-y-0.5 transition-transform"
                >
                  <span className="w-8 h-8 flex-shrink-0 bg-black flex items-center justify-center border-2 border-black">
                    <span className="material-symbols-outlined text-accent-yellow text-base">
                      {item.icon}
                    </span>
                  </span>
                  <span className="font-sans font-bold text-sm text-gray-800">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="relative mt-5 font-mono text-[10px] text-gray-500 leading-relaxed">
              Perfect for indie SaaS, accelerators, grants and tools that want founder eyeballs
              without a five-figure ad budget.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
