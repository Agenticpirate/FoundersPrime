'use client'

import { grants2026 } from '@/data/grants-2026'

export default function GrantsHero() {
 const totalGrants = grants2026.length
 const activeGrants = grants2026.filter(g => g.applicationStatus === 'Active' || g.applicationStatus === 'Rolling').length

 return (
 <div className="mb-6 md:mb-6 md:mb-4 md:mb-6">
 {/* Compact Header */}
 <div className="mb-4 md:mb-6">
 <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-3">
 NON-DILUTIVE FUNDING
 </div>
 <h1 className="font-mono text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-3 leading-tight">
 Startup Grants & Competitions
 </h1>
 <p className="font-sans text-base text-gray-700 leading-relaxed max-w-3xl">
 Access <span className="font-bold text-black bg-primary/20 px-1">{totalGrants} active grants</span> from government agencies, foundations, and global competitions. Get funded without giving up equity—from $10K micro-grants2026to $100M+ prize competitions.
 </p>
 </div>

 {/* Compact Stats - Horizontal Layout */}
 <div className="grid grid-cols-3 gap-2 md:gap-4">
 <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
 <div>
 <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Active Programs</p>
 <p className="font-mono text-xl md:text-2xl font-bold text-black">{totalGrants}</p>
 </div>
 <span className="material-symbols-outlined text-xl text-black hidden sm:block">workspace_premium</span>
 </div>

 <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
 <div>
 <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Total Funding</p>
 <p className="font-mono text-xl md:text-2xl font-bold text-white">$237M+</p>
 </div>
 <span className="material-symbols-outlined text-xl text-primary hidden sm:block">trending_up</span>
 </div>

 <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
 <div>
 <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Equity Required</p>
 <p className="font-mono text-xl md:text-2xl font-bold text-black">0%</p>
 </div>
 <span className="material-symbols-outlined text-xl text-black hidden sm:block">block</span>
 </div>
 </div>
 </div>
 )
}