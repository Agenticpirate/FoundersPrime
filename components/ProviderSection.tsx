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
      <section className="py-8 md:py-5 md:py-6 md:py-14 border-b-2 border-black bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-[3px] border-[#101622] shadow-[6px_6px_0px_0px_#101622] bg-[#f6f6f8] h-[200px] md:h-[600px] flex items-center justify-center">
            <span className="font-mono animate-pulse text-sm">Loading Provider Network...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-5 md:py-6 md:py-14 border-b-2 border-black bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-[3px] border-[#101622] shadow-[6px_6px_0px_0px_#101622] bg-[#f6f6f8] grid grid-cols-1 lg:grid-cols-2">
          <div className="p-5 md:p-12 lg:p-16 flex flex-col justify-center border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[#101622]">
            <div className="flex items-center gap-2 mb-3 md:mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#101622] text-white flex items-center justify-center border-[2px] border-[#101622]">
                <span className="material-symbols-outlined text-base md:text-xl">handshake</span>
              </div>
              <span className="font-mono font-bold text-xs uppercase tracking-widest text-gray-500">For Providers</span>
            </div>
            <h2 className="text-xl md:text-5xl font-bold text-[#101622] font-mono mb-3 md:mb-6 uppercase tracking-tight leading-none">
              List Your Product.<br />
              <span className="bg-accent-yellow px-1 border-[2px] border-[#101622]">Zero Fees.</span>
            </h2>
            <p className="text-sm md:text-lg text-gray-700 font-mono mb-5 md:mb-10 leading-relaxed">
              Get your SaaS or service in front of 12,000+ verified founders. We curate high-value deals and grants. No fluff. Direct exposure.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/submit-deal" className="bg-[#101622] text-white border-[3px] border-[#101622] px-5 py-2.5 md:px-8 md:py-4 font-mono font-bold uppercase text-xs md:text-sm flex items-center gap-2 hover:bg-white hover:text-[#101622] transition-colors shadow-[3px_3px_0px_0px_#888]">
                Submit Your Deal <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Decorative card — hidden on mobile */}
          <div className="hidden lg:relative lg:flex bg-[#fdfbf7] p-8 md:p-12 flex-col items-center justify-center overflow-hidden border-l-0 lg:border-l-[3px] border-[#101622] group">

            {/* Background Decor */}
            <div className="absolute inset-0 grid-bg opacity-50"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-yellow/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/20 rounded-full blur-3xl -ml-20 -mb-10 md:mb-14"></div>

            {/* The "Hero" Card */}
            <div className="relative z-10 w-full max-w-sm transform group-hover:-translate-y-2 transition-transform duration-500">
              {/* Badge */}
              <div className="absolute -top-4 -right-4 bg-accent-yellow text-black border-2 border-black px-4 py-1 font-mono font-bold text-xs uppercase shadow-[4px_4px_0px_0px_#000] z-20 rotate-3">
                Verified Partner
              </div>

              <div className="bg-white border-[3px] border-[#101622] shadow-[8px_8px_0px_0px_#101622] p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b-2 border-dashed border-gray-200 pb-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center border-2 border-black">
                    <span className="material-symbols-outlined text-white text-2xl">rocket_launch</span>
                  </div>
                  <div>
                    <div className="h-4 w-32 bg-gray-200 mb-2 animate-pulse"></div>
                    <div className="h-3 w-20 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    <span className="font-mono font-bold text-sm">Direct Founder Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    <span className="font-mono font-bold text-sm">Zero Listing Fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    <span className="font-mono font-bold text-sm">High-Intent Traffic</span>
                  </div>
                </div>

                <div className="mt-2 bg-[#f6f8f8] p-3 border-2 border-black text-center">
                  <span className="font-mono text-xs font-bold text-gray-500 uppercase block mb-1">Potential Reach</span>
                  <span className="font-mono text-2xl font-bold text-black">12,450+</span>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6 text-center relative z-10">
              <p className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
                Join 150+ Top Tier Providers
              </p>
              <div className="flex justify-center -space-x-3 mt-4">
                {[
                  { name: 'Stripe', domain: 'stripe.com' },
                  { name: 'AWS', domain: 'amazon.com' },
                  { name: 'Google', domain: 'google.com' },
                  { name: 'HubSpot', domain: 'hubspot.com' },
                  { name: 'Notion', domain: 'notion.so' }
                ].map((brand, i) => (
                  <ProviderAvatar key={i} brand={brand} />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-accent-yellow flex items-center justify-center text-black text-[10px] font-bold relative z-0">
                  +150
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

function ProviderAvatar({ brand }: { brand: { name: string, domain: string } }) {
  const [error, setError] = useState(false)

  return (
    <div className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden ring-2 ring-transparent group-hover:ring-[#101622] transition-all relative z-0 hover:z-10 hover:-translate-y-1 ${error ? 'bg-[#101622] text-white' : 'bg-white'}`}>
      {error ? (
        <span className="text-[10px] font-bold">{brand.name[0]}</span>
      ) : (
        <img
          src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
          alt={brand.name}
          className="w-full h-full object-contain p-1"
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}