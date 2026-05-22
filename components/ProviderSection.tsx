'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ProviderSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="py-8 md:py-14 border-b-2 border-black bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-black shadow-[5px_5px_0px_#111] bg-white h-[200px] md:h-[400px] flex items-center justify-center">
            <span className="font-mono animate-pulse text-sm">Loading...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-8 md:py-14 border-b-2 border-black bg-gradient-to-b from-gray-50 to-white overflow-hidden grid-bg">

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-black shadow-[5px_5px_0px_#111] bg-[#fdfbf7] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left Content */}
          <div className="relative p-6 md:p-10 lg:p-12 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-black overflow-hidden">
            {/* Minimalist tech mandala — sits behind content */}
            <div className="absolute -bottom-20 -left-16 w-72 h-72 text-accent-yellow opacity-[0.18] pointer-events-none mandala-spin-slow">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.7">
                <circle cx="100" cy="100" r="40" />
                <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <g key={deg} transform={`rotate(${deg} 100 100)`}>
                    <line x1="100" y1="40" x2="100" y2="20" />
                    <circle cx="100" cy="20" r="2.5" fill="currentColor" />
                  </g>
                ))}
                <circle cx="100" cy="100" r="3" fill="currentColor" />
              </svg>
            </div>

            <span className="relative inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-4 self-start">
              <span className="material-symbols-outlined text-[12px]">handshake</span>
              For SaaS, grants & programs
            </span>

            <h2 className="relative text-2xl md:text-4xl font-black text-black font-mono mb-3 uppercase tracking-tight leading-tight">
              Founders are looking.<br />
              <span className="bg-accent-yellow px-2 border-2 border-black inline-block mt-2">Be findable.</span>
            </h2>

            <p className="relative text-sm md:text-base text-gray-700 mb-4 leading-relaxed max-w-lg font-sans">
              500+ verified deals. 4.2x baseline claim rate. Zero listing fees.
              We put your offer in front of high-intent founders — not tire kickers.
            </p>

            {/* Compact stat strip — sits in the previously-empty space */}
            <div className="relative grid grid-cols-3 gap-2 mb-4 max-w-md">
              {[
                { value: '500+', label: 'Deals listed', icon: 'inventory_2' },
                { value: '4.2x', label: 'Claim rate', icon: 'trending_up' },
                { value: '$0', label: 'Listing fee', icon: 'sell' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white border-2 border-black px-2 py-1.5 shadow-[2px_2px_0px_#111] flex items-center gap-1.5 hover:-translate-y-0.5 transition-transform"
                >
                  <span className="material-symbols-outlined text-sm text-black flex-shrink-0">{s.icon}</span>
                  <div className="min-w-0">
                    <p className="font-mono font-black text-xs leading-none">{s.value}</p>
                    <p className="font-mono text-[8px] uppercase tracking-widest text-gray-500 mt-0.5 truncate">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex flex-wrap gap-3">
              <Link
                href="/submit-deal"
                className="bg-black text-white border-2 border-black px-5 py-3 font-mono font-black uppercase text-xs tracking-wider flex items-center gap-2 hover:bg-accent-yellow hover:text-black transition-colors shadow-[3px_3px_0px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.2)]"
              >
                Submit your deal
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <a
                href="mailto:partners@foundersprime.com"
                className="bg-white text-black border-2 border-black px-5 py-3 font-mono font-black uppercase text-xs tracking-wider flex items-center gap-2 hover:bg-black hover:text-white transition-colors shadow-[3px_3px_0px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.2)]"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                Talk to us
              </a>
            </div>

            {/* Tiny live indicator at the bottom */}
            <div className="relative mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500">
                Reviewing submissions weekly
              </span>
            </div>
          </div>

          {/* Right: Decorative card */}
          <div className="relative flex bg-[#fdfbf7] p-6 md:p-10 flex-col items-center justify-center overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-yellow/30 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/15 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

            <div className="relative z-10 w-full max-w-[340px] transform group-hover:-translate-y-1 group-hover:rotate-1 transition-transform duration-500">
              <div className="absolute -top-3 -right-3 bg-accent-yellow text-black border-2 border-black px-3 py-0.5 font-mono font-black text-[10px] uppercase tracking-wider shadow-[2px_2px_0px_#111] z-20 rotate-3">
                Verified Partner
              </div>

              <div className="bg-white border-2 border-black shadow-[5px_5px_0px_#111] p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3 border-b-2 border-dashed border-gray-200 pb-3">
                  <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#111]">
                    <span className="material-symbols-outlined text-accent-yellow text-2xl">rocket_launch</span>
                  </div>
                  <div>
                    <p className="font-mono font-black text-sm uppercase tracking-tight">Your Product</p>
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Verified · Featured</p>
                  </div>
                </div>

                <div className="space-y-2.5 py-1">
                  {[
                    { icon: 'check_circle', label: 'Direct founder access' },
                    { icon: 'check_circle', label: 'Zero listing fees' },
                    { icon: 'check_circle', label: 'High-intent traffic' },
                    { icon: 'check_circle', label: 'Verified partner badge' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-green-500 text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {item.icon}
                      </span>
                      <span className="font-sans font-bold text-sm text-gray-800">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-black p-3 border-2 border-black flex items-center justify-between text-white group-hover:bg-accent-yellow group-hover:text-black transition-colors duration-300">
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest">Avg. claim rate</span>
                  <span className="font-mono text-base font-black">4.2x baseline</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center relative z-10">
              <p className="font-mono text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                Join Top Tier Providers
              </p>
              <div className="flex justify-center -space-x-2">
                {[
                  { name: 'Stripe', domain: 'stripe.com' },
                  { name: 'AWS', domain: 'amazon.com' },
                  { name: 'Google', domain: 'google.com' },
                  { name: 'HubSpot', domain: 'hubspot.com' },
                  { name: 'Notion', domain: 'notion.so' },
                ].map((brand, i) => (
                  <ProviderAvatar key={i} brand={brand} />
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-white bg-black text-accent-yellow flex items-center justify-center text-[10px] font-mono font-black shadow-[1px_1px_0px_#111] relative z-0">
                  +50
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes mandalaSpinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .mandala-spin-slow {
          animation: mandalaSpinSlow 80s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .mandala-spin-slow {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}

function ProviderAvatar({ brand }: { brand: { name: string; domain: string } }) {
  const [fallbackIndex, setFallbackIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const fallbackChain = [
    `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`,
    `https://logo.clearbit.com/${brand.domain}`,
  ]

  const handleError = () => {
    const nextIndex = fallbackIndex + 1
    if (nextIndex < fallbackChain.length) {
      setFallbackIndex(nextIndex)
      setLoaded(false)
    } else {
      setFailed(true)
    }
  }

  return (
    <div
      className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center overflow-hidden ring-1 ring-transparent group-hover:ring-black transition-all relative z-0 hover:z-10 hover:-translate-y-1 shadow-[1px_1px_0px_#111] ${
        failed ? 'bg-black text-white' : 'bg-white'
      }`}
    >
      {failed ? (
        <span className="text-[10px] font-black">{brand.name[0]}</span>
      ) : (
        <img
          src={fallbackChain[fallbackIndex]}
          alt={brand.name}
          className={`w-full h-full object-contain p-1 transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      )}
    </div>
  )
}
