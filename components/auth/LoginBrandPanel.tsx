'use client'

import BrandLogo from '@/components/ui/BrandLogo'
import Mandala from '@/components/ui/Mandala'

const loginPartners = [
  { name: 'AWS', domain: 'aws.amazon.com' },
  { name: 'Google Cloud', domain: 'cloud.google.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'DigitalOcean', domain: 'digitalocean.com' },
]

export default function LoginBrandPanel() {
  return (
          <div className="hidden lg:flex lg:col-span-6 text-white flex-col justify-center gap-6 relative overflow-hidden backdrop-blur-sm pr-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 rounded-full px-3 py-1 text-[10px] font-mono mb-4">
                <span className="flex items-center gap-1.5 text-accent-yellow font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full animate-pulse" />
                  Live Terminal
                </span>
                <span className="w-px h-3 bg-neutral-800 mx-1" />
                <span className="text-gray-400">Built for modern builders & founders</span>
              </div>

              <h2 className="font-mono text-3xl xl:text-4xl font-black leading-tight mb-4 uppercase tracking-tight">
                SHIP FASTER.<br />SPEND <span className="text-accent-yellow">SMARTER.</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-sans mb-6">
                Ship in days, not weeks. Stop burning precious capital on your stack when you can leverage <span className="text-accent-yellow font-bold font-mono">up to $500K+</span> in verified startup credits, perks, and grants.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-md">
              <div className="flex items-center gap-2.5 p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg">
                <span className="material-symbols-outlined text-accent-yellow text-lg flex-shrink-0">redeem</span>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider font-mono">Up to $500K+</p>
                  <p className="text-[9px] text-gray-500 font-mono leading-none mt-0.5">In Credits</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg">
                <span className="material-symbols-outlined text-emerald-400 text-lg flex-shrink-0">verified</span>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider font-mono">Verified</p>
                  <p className="text-[9px] text-gray-500 font-mono leading-none mt-0.5">Deals & Grants</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg">
                <span className="material-symbols-outlined text-purple-400 text-lg flex-shrink-0">shield_lock</span>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider font-mono">Founder</p>
                  <p className="text-[9px] text-gray-500 font-mono leading-none mt-0.5">Vetted Only</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-neutral-900/40 border border-neutral-900 rounded-lg">
                <span className="material-symbols-outlined text-cyan-400 text-lg flex-shrink-0">bolt</span>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-wider font-mono">Save $50K+</p>
                  <p className="text-[9px] text-gray-500 font-mono leading-none mt-0.5">In 3 Months</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0c0c0e] to-black border border-white/5 p-5 rounded-xl relative max-w-md mb-8 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-50"></div>
              <div className="flex items-start gap-3.5 relative z-10">
                <div className="flex-shrink-0 w-8 h-8 rounded bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent-yellow text-sm">local_fire_department</span>
                </div>
                <div>
                  <h3 className="font-mono text-xs font-black uppercase text-white tracking-wider mb-1.5">Unlock Premium Benefits</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Instantly save runway with discounts on <span className="text-white font-bold">AWS</span>, <span className="text-white font-bold">OpenAI</span>, <span className="text-white font-bold">Stripe</span>, and <span className="text-white font-bold">Google Cloud</span>. No pitch decks, no interviews, no equity dilution.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-900 overflow-hidden max-w-md">
              <div className="flex items-center gap-3 mb-3.5">
                <div className="flex-1 h-px bg-neutral-900" />
                <span className="text-[8.5px] font-mono font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">TRUSTED BY FOUNDERS WHO USE</span>
                <div className="flex-1 h-px bg-neutral-900" />
              </div>
              <div className="relative w-full overflow-hidden mask-gradient-x opacity-65 hover:opacity-95 transition-opacity duration-300">
                <div className="flex gap-6 animate-login-marquee whitespace-nowrap items-center py-1">
                  {(['a', 'b'] as const).flatMap((pass) =>
                    loginPartners.map((partner) => (
                      <div key={`${pass}-${partner.domain || partner.name}`} className="flex items-center gap-1.5 flex-shrink-0">
                        <BrandLogo name={partner.name} domain={partner.domain} size="sm" eager />
                        <span className="font-mono text-[9px] font-bold text-gray-400 whitespace-nowrap">{partner.name}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>


  )
}
