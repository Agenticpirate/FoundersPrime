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
          <div className="border-[3px] border-[#101622] shadow-[6px_6px_0px_0px_#101622] bg-white h-[200px] md:h-[600px] flex items-center justify-center">
            <span className="font-mono animate-pulse text-sm">Loading Provider Network...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-4 md:py-10 border-b-2 border-black bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-[3px] border-[#101622] shadow-[4px_4px_0px_0px_#101622] bg-[#fdfbf7] grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Content Area */}
          <div className="p-4 md:p-10 lg:p-12 flex flex-col justify-center border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[#101622]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#101622] text-white flex items-center justify-center border-[2px] border-[#101622]">
                <span className="material-symbols-outlined text-sm">handshake</span>
              </div>
              <span className="font-mono font-bold text-[10px] uppercase tracking-widest text-gray-500">For Providers</span>
            </div>
            
            <h2 className="text-xl md:text-4xl font-bold text-[#101622] font-mono mb-3 uppercase tracking-tight leading-none">
              List Your Product.<br />
              <span className="bg-accent-yellow px-1.5 border-[2px] border-[#101622] inline-block mt-2">Zero Fees.</span>
            </h2>
            
            <p className="text-sm md:text-base text-gray-700 font-mono mb-6 leading-relaxed max-w-lg">
              Get your SaaS or service in front of 12,000+ verified founders. We curate high-value deals and grants. No fluff. Direct exposure.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Link href="/submit-deal" className="bg-[#101622] text-white border-[3px] border-[#101622] px-6 py-3 font-mono font-bold uppercase text-[11px] flex items-center gap-2 hover:bg-white hover:text-[#101622] transition-colors shadow-[2px_2px_0px_0px_#888]">
                Submit Your Deal <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Decorative Right Area */}
          <div className="hidden lg:flex relative bg-[#fdfbf7] p-8 md:p-10 flex-col items-center justify-center overflow-hidden group">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-yellow/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

            {/* The "Hero" Card (Scaled Down) */}
            <div className="relative z-10 w-full max-w-[320px] transform group-hover:-translate-y-1 group-hover:rotate-1 transition-transform duration-500">
              {/* Badge */}
              <div className="absolute -top-3 -right-3 bg-accent-yellow text-black border-2 border-black px-3 py-0.5 font-mono font-bold text-[10px] uppercase shadow-[2px_2px_0px_0px_#000] z-20 rotate-3">
                Verified Partner
              </div>

              <div className="bg-white border-[3px] border-[#101622] shadow-[6px_6px_0px_0px_#101622] p-5 flex flex-col gap-3">
                
                {/* Simulated Header */}
                <div className="flex items-center gap-3 border-b-2 border-dashed border-gray-200 pb-3">
                  <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black">
                    <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
                  </div>
                  <div>
                    <div className="h-3 w-24 bg-gray-200 mb-1.5 rounded-sm"></div>
                    <div className="h-2 w-16 bg-gray-200 rounded-sm"></div>
                  </div>
                </div>

                {/* Simulated Checklist */}
                <div className="space-y-2.5 py-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                    <span className="font-mono font-bold text-xs text-gray-800">Direct Founder Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                    <span className="font-mono font-bold text-xs text-gray-800">Zero Listing Fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                    <span className="font-mono font-bold text-xs text-gray-800">High-Intent Traffic</span>
                  </div>
                </div>

                {/* Simulated ROI box */}
                <div className="mt-1 bg-[#f8f9fa] p-2.5 border-2 border-black text-center group-hover:bg-[#101622] group-hover:text-white transition-colors duration-300">
                  <span className="font-mono text-[9px] font-bold text-gray-500 group-hover:text-gray-300 uppercase block mb-0.5">Potential Reach</span>
                  <span className="font-mono text-xl font-black">12,450+</span>
                </div>
              </div>
            </div>

            {/* Bottom Trusted By Row */}
            <div className="mt-8 text-center relative z-10">
              <p className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                Join 150+ Top Tier Providers
              </p>
              <div className="flex justify-center -space-x-2">
                {[
                  { name: 'Stripe', domain: 'stripe.com' },
                  { name: 'AWS', domain: 'amazon.com' },
                  { name: 'Google', domain: 'google.com' },
                  { name: 'HubSpot', domain: 'hubspot.com' },
                  { name: 'Notion', domain: 'notion.so' }
                ].map((brand, i) => (
                  <ProviderAvatar key={i} brand={brand} />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-accent-yellow flex items-center justify-center text-black text-[9px] font-bold shadow-sm relative z-0">
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
    <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center overflow-hidden ring-1 ring-transparent group-hover:ring-[#101622] transition-all relative z-0 hover:z-10 hover:-translate-y-1 ${error ? 'bg-[#101622] text-white' : 'bg-white'}`}>
      {error ? (
        <span className="text-[9px] font-bold">{brand.name[0]}</span>
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