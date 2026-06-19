import Link from 'next/link'

const AVATARS = [
  'https://i.pravatar.cc/64?img=12',
  'https://i.pravatar.cc/64?img=32',
  'https://i.pravatar.cc/64?img=5',
  'https://i.pravatar.cc/64?img=48',
]

/** Corner bracket accent (L-shape) — gold framing on each corner. */
function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base = 'absolute w-5 h-5 border-accent-yellow/70 pointer-events-none'
  const map = {
    tl: 'top-2 left-2 border-t-2 border-l-2',
    tr: 'top-2 right-2 border-t-2 border-r-2',
    bl: 'bottom-2 left-2 border-b-2 border-l-2',
    br: 'bottom-2 right-2 border-b-2 border-r-2',
  }
  return <span aria-hidden="true" className={`${base} ${map[pos]}`} />
}

export default function FlashPremiumCTA() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <div className="relative">
        {/* Ambient glow behind the panel */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-10 -inset-y-6 bg-accent-yellow/[0.06] blur-3xl rounded-[40px] pointer-events-none"
        />

        <div className="flash-cta-glow flash-cta-sheen relative overflow-hidden border border-accent-yellow/40 bg-gradient-to-br from-[#1a1710] via-[#0c0c0c] to-black">
          {/* Particle dot texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.5] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,215,0,0.14) 1px, transparent 1.5px)',
              backgroundSize: '16px 16px',
              WebkitMaskImage:
                'radial-gradient(120% 120% at 0% 0%, black 0%, transparent 42%), radial-gradient(120% 120% at 100% 100%, black 0%, transparent 42%)',
              maskImage:
                'radial-gradient(120% 120% at 0% 0%, black 0%, transparent 42%), radial-gradient(120% 120% at 100% 100%, black 0%, transparent 42%)',
            }}
          />

          {/* Corner brackets */}
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
            {/* Crown */}
            <div className="relative flex-shrink-0">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-accent-yellow/15 blur-md"
              />
              <span className="flash-crown-glow relative w-16 h-16 flex items-center justify-center rounded-full border-2 border-accent-yellow/50 bg-accent-yellow/[0.07]">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent-yellow" fill="currentColor" aria-hidden="true">
                  <path d="M2 8.2l4.6 3.3L12 4l5.4 7.5L22 8.2l-1.9 9.3H3.9L2 8.2z" />
                  <rect x="3.9" y="18.6" width="16.2" height="2.2" rx="0.4" />
                </svg>
              </span>
            </div>

            {/* Copy */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tight">
                Unlock Even More Deals
              </h3>
              <p className="font-sans text-[13px] md:text-sm text-gray-400 mt-1.5 max-w-xl leading-relaxed">
                These are just a few. Get access to{' '}
                <span className="text-accent-yellow font-semibold">1,000+ verified deals</span>, credits, and
                programs with our premium membership.
              </p>
            </div>

            {/* Action + social proof */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <Link
                href="/pricing"
                className="fp-sheen group inline-flex items-center gap-2 bg-white text-black font-mono font-black text-[12px] uppercase tracking-[0.12em] px-6 py-3 border border-white hover:bg-accent-yellow hover:border-accent-yellow transition-colors shadow-[0_8px_30px_-8px_rgba(255,215,0,0.5)]"
              >
                View Membership Plans
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </Link>

              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {AVATARS.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      aria-hidden="true"
                      width={26}
                      height={26}
                      loading="lazy"
                      className="w-[26px] h-[26px] rounded-full object-cover ring-2 ring-[#0c0c0c]"
                    />
                  ))}
                </div>
                <p className="font-sans text-[11px] text-gray-400">
                  Join <span className="text-white font-semibold">10,000+</span> founders saving millions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
