'use client'

import Link from 'next/link'
import { RevealItem } from '@/components/ui/premium-motion'

const yellowFeatures = [
  'Pinned to the top of the homepage & deals feed',
  'Featured badge that signals trust',
  'Permanent dofollow backlink for SEO',
  'Priority spot in the weekly founder newsletter',
  'Live views & clicks analytics on your listing',
  'Auto-refund if your deal is not approved',
]

export default function ProviderOfferCard() {
  return (
          <RevealItem className="lg:sticky lg:top-8">
            <div className="relative rounded-2xl md:rounded-3xl border-2 md:border-3 border-black bg-gradient-to-b from-[#12141c] via-[#090a0f] to-[#000] text-white shadow-[5px_5px_0_#ffd700] md:shadow-[8px_8px_0_#ffd700] dark:shadow-[8px_8px_0_rgba(255,215,0,0.2)] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-yellow to-transparent opacity-80" />

              <div className="absolute top-0 right-0 z-10 flex items-center gap-1 bg-accent-yellow text-black px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-bl-xl font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.12em] md:tracking-[0.15em] border-l-2 border-b-2 border-black shadow-sm">
                <span
                  className="material-symbols-outlined !text-[11px] md:!text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                Most Visibility
              </div>

              <div
                className="pointer-events-none absolute top-12 right-6 w-24 h-16 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(#ffd700 1px, transparent 1px)',
                  backgroundSize: '8px 8px',
                }}
                aria-hidden="true"
              />

              <div className="relative p-4 md:p-7 pt-5 md:pt-7">
                <span className="inline-flex items-center gap-1.5 bg-accent-yellow/10 border border-accent-yellow/30 text-accent-yellow font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.14em] px-2.5 md:px-3 py-1 md:py-1.5 rounded-full mb-3 md:mb-4">
                  <span
                    className="material-symbols-outlined !text-[12px] md:!text-[13px] text-accent-yellow"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  Featured Ad Slot
                </span>

                <h3 className="font-mono font-black uppercase text-white tracking-tight leading-[1.12] text-lg md:text-2xl mb-3.5 md:mb-5 pr-16 md:pr-0">
                  Get the top spot — without the{' '}
                  <span className="text-accent-red font-black underline decoration-wavy decoration-accent-red/50 decoration-1 underline-offset-4">
                    $1,499/mo
                  </span>{' '}
                  price tag.
                </h3>

                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3.5 md:mb-5">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5 md:p-3.5">
                    <p className="font-mono text-[7px] font-bold uppercase tracking-widest text-gray-500">
                      Typical Directory
                    </p>
                    <p className="font-mono font-black text-sm md:text-base text-gray-400 line-through decoration-accent-red decoration-2 my-1 md:my-1.5">
                      $500 – $1.5K
                    </p>
                    <p className="font-mono text-[7px] md:text-[8px] uppercase tracking-wider text-gray-500">
                      / Month
                    </p>
                  </div>

                  <div className="relative rounded-xl border-2 border-accent-yellow bg-gradient-to-b from-[#1c1d12] to-black p-2.5 md:p-3.5 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                    <div className="absolute -top-2 left-2 md:left-3 bg-accent-yellow text-black font-mono text-[6px] md:text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border border-black">
                      FOUNDERS&apos; CHOICE
                    </div>
                    <p className="font-mono text-[7px] font-bold uppercase tracking-widest text-accent-yellow mt-1">
                      FoundersPrime
                    </p>
                    <p className="font-mono font-black leading-none my-1.5 md:my-2 flex items-baseline gap-1">
                      <span className="text-[7px] md:text-[8px] uppercase tracking-wider text-white/70">
                        From
                      </span>
                      <span className="text-accent-yellow text-xl md:text-2xl tracking-tighter">
                        $25
                      </span>
                    </p>
                    <p className="font-mono text-[8px] md:text-[8.5px] uppercase tracking-wider text-white/80 font-bold">
                      / Wk <span className="text-[7px] md:text-[7.5px] text-white/50 font-normal">or $99/yr</span>
                    </p>
                  </div>
                </div>

                {/* features — show first 4 on mobile, all on md+ */}
                <div className="border-t border-b border-white/10 divide-y divide-white/15 mb-4 md:mb-6">
                  {yellowFeatures.map((f, i) => (
                    <div
                      key={f}
                      className={`flex items-center gap-2.5 md:gap-3 py-2 md:py-2.5 group/item hover:bg-white/[0.01] px-1 transition-colors ${
                        i >= 4 ? 'hidden md:flex' : ''
                      }`}
                    >
                      <span className="w-4 h-4 md:w-4.5 md:h-4.5 flex-shrink-0 rounded-full bg-accent-yellow/10 border border-accent-yellow/30 flex items-center justify-center">
                        <span
                          className="material-symbols-outlined !text-[10px] md:!text-[11px] text-accent-yellow"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check
                        </span>
                      </span>
                      <span className="flex-1 font-sans text-[11px] md:text-xs text-gray-300 group-hover/item:text-white transition-colors leading-snug">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/submit-deal?tier=featured"
                  className="group relative overflow-hidden flex items-center justify-center gap-2 w-full rounded-xl border-2 border-black bg-accent-yellow text-black px-5 md:px-6 py-3 md:py-4 min-h-[48px] font-mono font-black uppercase text-[11px] md:text-xs tracking-[0.12em] md:tracking-[0.15em] hover:bg-white hover:text-black transition-all hover:scale-[1.01] hover:-translate-y-0.5 shadow-md active:translate-y-0"
                >
                  <span
                    className="material-symbols-outlined !text-[15px] md:!text-[16px] text-black"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                  Claim Featured Spot
                  <span className="absolute inset-y-0 -left-[100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none group-hover:animate-[heroShimmer_1.8s_ease-in-out_infinite]" />
                </Link>

                <p className="mt-3 md:mt-4 text-center font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.12em] md:tracking-[0.15em] text-gray-400">
                  Limited Slots · Founding Rate While It Lasts
                </p>
              </div>
            </div>
          </RevealItem>

  )
}
