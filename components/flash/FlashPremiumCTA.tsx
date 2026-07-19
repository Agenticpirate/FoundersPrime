import Link from 'next/link'
import Image from 'next/image'

const AVATARS = [
  'https://i.pravatar.cc/64?img=12',
  'https://i.pravatar.cc/64?img=32',
  'https://i.pravatar.cc/64?img=5',
  'https://i.pravatar.cc/64?img=48',
]

const CORNER_POS: Record<'tl' | 'tr' | 'bl' | 'br', string> = {
  tl: 'top-2 left-2 border-t-2 border-l-2',
  tr: 'top-2 right-2 border-t-2 border-r-2',
  bl: 'bottom-2 left-2 border-b-2 border-l-2',
  br: 'bottom-2 right-2 border-b-2 border-r-2',
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base = 'absolute w-5 h-5 border-accent-yellow/70 pointer-events-none'
  return <span aria-hidden className={`${base} ${CORNER_POS[pos]}`} />
}


export default function FlashPremiumCTA() {
  return (
    <section className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 pb-4 sm:pb-6 md:pb-10">
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-x-6 sm:-inset-x-10 -inset-y-4 sm:-inset-y-6 bg-accent-yellow/[0.06] blur-3xl rounded-[40px] pointer-events-none"
        />

        <div className="flash-cta-glow flash-cta-sheen relative overflow-hidden rounded-xl sm:rounded-2xl border border-accent-yellow/40 bg-gradient-to-br from-[#1a1710] via-[#0c0c0c] to-black">
          <div
            aria-hidden
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

          <div className="hidden sm:block" aria-hidden>
            <Corner pos="tl" />
            <Corner pos="tr" />
            <Corner pos="bl" />
            <Corner pos="br" />
          </div>

          <div className="relative flex flex-col md:flex-row items-stretch sm:items-center gap-3 sm:gap-6 p-3.5 sm:p-6 md:p-8">
            <div className="relative flex-shrink-0 flex items-center gap-3 md:block">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-accent-yellow/15 blur-md hidden md:block"
              />
              <span className="flash-crown-glow relative w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border border-accent-yellow/50 sm:border-2 bg-accent-yellow/[0.07]">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-8 sm:h-8 text-accent-yellow"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M2 8.2l4.6 3.3L12 4l5.4 7.5L22 8.2l-1.9 9.3H3.9L2 8.2z" />
                  <rect x="3.9" y="18.6" width="16.2" height="2.2" rx="0.4" />
                </svg>
              </span>
              <div className="md:hidden min-w-0 flex-1">
                <p className="font-mono text-[8px] font-black uppercase tracking-[0.14em] text-accent-yellow">
                  Beyond flash
                </p>
                <h3 className="font-heading font-black text-[15px] text-white uppercase tracking-tight leading-tight">
                  Unlock full catalog
                </h3>
              </div>
            </div>

            <div className="hidden md:block flex-1 text-left">
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-accent-yellow mb-1.5">
                Beyond flash deals
              </p>
              <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tight">
                Unlock the full catalog
              </h3>
              <p className="font-sans text-[13px] md:text-sm text-gray-400 mt-1.5 max-w-xl leading-relaxed">
                Flash deals are free with a signup — no membership required. Want more? Members get{' '}
                <span className="text-accent-yellow font-semibold">1,000+ verified deals</span>,
                credits, grants, and programs — year-round.
              </p>
            </div>

            <p className="md:hidden font-sans text-[11px] text-gray-400 leading-snug -mt-1">
              Free flash signup. Members get{' '}
              <span className="text-accent-yellow font-semibold">1,000+ deals</span> year-round.
            </p>

            <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link
                href="/pricing"
                className="fp-sheen group inline-flex items-center justify-center gap-1.5 min-h-[40px] sm:min-h-[48px] rounded-xl bg-white text-black font-mono font-black text-[10px] sm:text-[12px] uppercase tracking-[0.1em] px-4 sm:px-6 py-2.5 sm:py-3 border border-white hover:bg-accent-yellow hover:border-accent-yellow transition-colors shadow-[0_8px_30px_-8px_rgba(255,215,0,0.5)]"
              >
                View plans
                <span className="material-symbols-outlined text-[14px] sm:text-[16px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </Link>

              <div className="hidden sm:flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {AVATARS.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      aria-hidden
                      width={26}
                      height={26}
                      className="w-[26px] h-[26px] rounded-full object-cover ring-2 ring-[#0c0c0c]"
                    />
                  ))}
                </div>
                <p className="font-sans text-[11px] text-gray-400">
                  Join <span className="text-white font-semibold">10,000+</span> founders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
