'use client'

import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { GlowingEffect } from '@/components/ui/GlowingEffect'

/* ─── Minimalist tech mandalas — subtle decorative SVGs per pillar ─── */
const mandalas: Record<string, JSX.Element> = {
  '01': (
    /* Cloud / Infra — concentric arcs + nodes */
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.6">
      <circle cx="100" cy="100" r="40" />
      <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
      <circle cx="100" cy="100" r="3" fill="currentColor" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <line x1="100" y1="40" x2="100" y2="20" />
          <circle cx="100" cy="20" r="2" fill="currentColor" />
        </g>
      ))}
    </svg>
  ),
  '02': (
    /* Capital / Grants — radiating coin lines */
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.6">
      <circle cx="100" cy="100" r="50" />
      <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2={100 + Math.cos((i * Math.PI) / 6) * 90}
          y2={100 + Math.sin((i * Math.PI) / 6) * 90}
          strokeDasharray="2 6"
        />
      ))}
      <text x="100" y="106" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor" stroke="none">$</text>
    </svg>
  ),
  '03': (
    /* SaaS Stack — interlocking grid layers */
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.6">
      <rect x="60" y="60" width="80" height="80" />
      <rect x="50" y="70" width="80" height="80" strokeDasharray="3 3" />
      <rect x="70" y="50" width="80" height="80" strokeDasharray="3 3" />
      {[...Array(5)].map((_, i) => (
        <line key={i} x1={60 + i * 20} y1="60" x2={60 + i * 20} y2="140" strokeDasharray="1 3" />
      ))}
      <circle cx="100" cy="100" r="6" fill="currentColor" />
    </svg>
  ),
  '04': (
    /* Accelerators — rocket trajectory with orbits */
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.6">
      <ellipse cx="100" cy="100" rx="70" ry="35" />
      <ellipse cx="100" cy="100" rx="70" ry="35" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="70" ry="35" transform="rotate(120 100 100)" />
      <circle cx="100" cy="100" r="8" fill="currentColor" />
      <circle cx="170" cy="100" r="3" fill="currentColor" />
      <circle cx="65" cy="135" r="2.5" fill="currentColor" />
      <circle cx="65" cy="65" r="2.5" fill="currentColor" />
    </svg>
  ),
  '05': (
    /* Verified Ideas — neural net / lightbulb */
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.6">
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI) / 4
        const x = 100 + Math.cos(angle) * 60
        const y = 100 + Math.sin(angle) * 60
        return (
          <g key={i}>
            <line x1="100" y1="100" x2={x} y2={y} strokeDasharray="2 4" />
            <circle cx={x} cy={y} r="3" fill="currentColor" />
          </g>
        )
      })}
      {[...Array(8)].map((_, i) => {
        const angle1 = (i * Math.PI) / 4
        const angle2 = ((i + 1) * Math.PI) / 4
        const x1 = 100 + Math.cos(angle1) * 60
        const y1 = 100 + Math.sin(angle1) * 60
        const x2 = 100 + Math.cos(angle2) * 60
        const y2 = 100 + Math.sin(angle2) * 60
        return <line key={`edge-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray="1 4" />
      })}
      <circle cx="100" cy="100" r="6" fill="currentColor" />
    </svg>
  ),
  '06': (
    /* Funded DB — concentric data rings */
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.6">
      {[20, 35, 50, 65, 80].map((r, i) => (
        <circle key={r} cx="100" cy="100" r={r} strokeDasharray={i % 2 === 0 ? '4 4' : '1 5'} />
      ))}
      {[...Array(4)].map((_, i) => {
        const angle = (i * Math.PI) / 2
        return (
          <line
            key={i}
            x1={100 + Math.cos(angle) * 20}
            y1={100 + Math.sin(angle) * 20}
            x2={100 + Math.cos(angle) * 80}
            y2={100 + Math.sin(angle) * 80}
            strokeDasharray="1 4"
          />
        )
      })}
      <rect x="96" y="96" width="8" height="8" fill="currentColor" stroke="none" />
    </svg>
  ),
}

export default function SystemModules() {
  const modules = [
    {
      id: '01',
      icon: 'cloud_done',
      title: 'Cloud Credits',
      description: 'Skip the AWS sales calls. Get up to $100K in credits direct — no equity, no demos.',
      value: '$200K+',
      pillar: 'Infra',
      examples: ['AWS', 'GCP', 'Azure'],
      bg: 'bg-sky-100',
      accent: 'bg-sky-500',
      mandalaColor: 'text-sky-500',
      iconBg: 'bg-sky-500 text-white',
      buttonText: 'Claim credits',
      href: '/deals/cloud-credits',
    },
    {
      id: '02',
      icon: 'monetization_on',
      title: 'Startup Grants',
      description: 'Money you don\'t pay back. Curated grants for R&D, social impact, and early-stage builders.',
      value: '$10M+',
      pillar: 'Capital',
      examples: ['SBIR', 'NIH', 'NSF'],
      bg: 'bg-green-100',
      accent: 'bg-green-500',
      mandalaColor: 'text-green-600',
      iconBg: 'bg-green-500 text-white',
      buttonText: 'Find grants',
      href: '/deals/grants',
    },
    {
      id: '03',
      icon: 'percent',
      title: 'SaaS Stack',
      description: 'Stop paying full price. Notion, Linear, HubSpot — 50–90% off, all in one place.',
      value: '200+',
      pillar: 'Tools',
      examples: ['Notion', 'Linear', 'HubSpot'],
      bg: 'bg-purple-100',
      accent: 'bg-purple-500',
      mandalaColor: 'text-purple-600',
      iconBg: 'bg-purple-500 text-white',
      buttonText: 'Stack savings',
      href: '/deals/saas-discounts',
    },
    {
      id: '04',
      icon: 'rocket_launch',
      title: 'Accelerators',
      description: 'YC. Techstars. Antler. Eligibility, timelines, and applications — all decoded for you.',
      value: '50+',
      pillar: 'Programs',
      examples: ['YC', 'Techstars', 'Antler'],
      bg: 'bg-orange-100',
      accent: 'bg-orange-500',
      mandalaColor: 'text-orange-600',
      iconBg: 'bg-orange-500 text-white',
      buttonText: 'Browse programs',
      href: '/deals/accelerators',
    },
    {
      id: '05',
      icon: 'emoji_objects',
      title: 'Verified Ideas',
      description: 'Stop guessing what to build. Market-tested startup ideas with demand signals, not hype.',
      value: '100+',
      pillar: 'Insights',
      examples: ['B2B', 'AI', 'Vertical'],
      bg: 'bg-yellow-100',
      accent: 'bg-yellow-500',
      mandalaColor: 'text-yellow-600',
      iconBg: 'bg-yellow-500 text-black',
      buttonText: 'See ideas',
      href: '/ideas',
    },
    {
      id: '06',
      icon: 'dataset',
      title: 'Funded Database',
      description: 'See who just raised. Spot trends, identify active investors, model your next round.',
      value: '1K+',
      pillar: 'Signals',
      examples: ['Seed', 'Series A', 'Series B'],
      bg: 'bg-blue-100',
      accent: 'bg-blue-500',
      mandalaColor: 'text-blue-600',
      iconBg: 'bg-blue-500 text-white',
      buttonText: 'Open database',
      href: '/startups',
    },
  ]

  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const scrollTo = (idx: number) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[idx] as HTMLElement
    if (card) {
      container.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' })
      setActiveIdx(idx)
    }
  }

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return
    const scrollLeft = container.scrollLeft
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 0
    const idx = Math.round(scrollLeft / (cardWidth + 16))
    setActiveIdx(Math.min(idx, modules.length - 1))
  }

  const isTouch = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTouch.current) return
      const next = (activeIdx + 1) % modules.length
      scrollTo(next)
    }, 3500)
    return () => clearInterval(interval)
  }, [activeIdx, modules.length])

  return (
    <section className="relative py-10 md:py-16 border-b-2 border-black bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden grid-bg">
      {/* Soft accent blobs */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-accent-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-3 shadow-[2px_2px_0px_#FFD500]">
            <span className="material-symbols-outlined text-[12px]">grid_view</span>
            Six pillars. One terminal.
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-black font-mono uppercase tracking-tight mb-2 leading-[1.05]">
            Everything that moves your startup forward.<br />
            <span className="bg-gradient-to-r from-accent-yellow via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Nothing that doesn't.
            </span>
          </h2>
          <p className="font-sans text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            Six pillars, one membership. Built to extend runway, raise smarter, and ship faster.
          </p>

          {/* Top stats strip — premium polish */}
          <div className="hidden md:flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="font-mono text-[11px] font-black uppercase tracking-widest text-gray-700">Manually verified</span>
            </div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-green-500" style={{ fontVariationSettings: "'FILL' 1" }}>update</span>
              <span className="font-mono text-[11px] font-black uppercase tracking-widest text-gray-700">Refreshed weekly</span>
            </div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-blue-500" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              <span className="font-mono text-[11px] font-black uppercase tracking-widest text-gray-700">Zero equity</span>
            </div>
          </div>
        </div>

        {/* Mobile: horizontal snap carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => { isTouch.current = true }}
          onTouchEnd={() => { setTimeout(() => { isTouch.current = false }, 2000) }}
          className="flex md:hidden gap-3 overflow-x-auto snap-x snap-mandatory pb-3 mobile-scroll-hide"
          style={{ scrollPaddingLeft: '16px' }}
        >
          {modules.map((module, idx) => (
            <div
              key={module.id}
              className={`relative ${module.bg} border-2 border-black p-4 shadow-[4px_4px_0px_#111] flex flex-col snap-start shrink-0 w-[78vw] overflow-hidden group sysmodule-fade-in`}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className={`absolute -top-6 -right-6 w-20 h-20 ${module.accent} opacity-25 rounded-full blur-2xl pointer-events-none`} />
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${module.mandalaColor} opacity-[0.28] pointer-events-none`}>
                {mandalas[module.id]}
              </div>
              <div className="relative flex justify-between items-start mb-3">
                <div className={`w-11 h-11 ${module.iconBg} border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#111]`}>
                  <span className="material-symbols-outlined text-xl">{module.icon}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-[8px] font-black text-gray-500 uppercase tracking-widest">{module.pillar}</span>
                  <span className="font-mono font-black text-[11px] bg-white border border-black px-1.5 py-0.5 shadow-[1px_1px_0px_#111]">
                    {module.value}
                  </span>
                </div>
              </div>
              <h3 className="text-base font-black mb-1.5 font-mono uppercase relative">{module.title}</h3>
              <p className="text-gray-700 mb-3 text-xs leading-relaxed flex-grow relative">{module.description}</p>

              {/* Example tags */}
              <div className="relative flex flex-wrap gap-1 mb-3">
                {module.examples.map((tag) => (
                  <span key={tag} className="font-mono text-[8px] font-bold uppercase tracking-wider bg-white/80 border border-black/30 px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                className="relative flex items-center justify-center gap-2 w-full py-2 border-2 border-black bg-black text-white font-mono font-bold text-[11px] uppercase tracking-wider hover:bg-accent-yellow hover:text-black transition-colors"
                href={module.href}
              >
                {module.buttonText}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="flex md:hidden justify-center gap-1.5 mt-3">
          {modules.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: activeIdx === idx ? 16 : 6,
                height: 6,
                backgroundColor: activeIdx === idx ? '#000' : '#d1d5db',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((module, idx) => (
            <div
              key={module.id}
              className={`relative ${module.bg} border-2 border-black p-6 shadow-[5px_5px_0px_#111] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111] transition-all duration-300 group flex flex-col h-full overflow-hidden sysmodule-fade-in`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <GlowingEffect spread={30} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />

              {/* Decorative blobs (multi-layer for depth) */}
              <div className={`absolute -top-12 -right-12 w-40 h-40 ${module.accent} opacity-20 rounded-full blur-3xl group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 pointer-events-none`} />
              <div className={`absolute top-1/2 right-2 w-1 h-12 ${module.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              {/* Minimalist tech mandala — sits behind content, animates on hover */}
              <div className={`absolute -bottom-16 -right-16 w-56 h-56 ${module.mandalaColor} opacity-[0.28] group-hover:opacity-[0.45] group-hover:rotate-[20deg] transition-all duration-700 ease-out pointer-events-none mandala-spin`}>
                {mandalas[module.id]}
              </div>

              {/* Top: pillar badge + module ID */}
              <div className="relative flex items-center justify-between mb-4">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                  PILLAR · {module.pillar}
                </span>
                <span className="font-mono text-[10px] font-black text-gray-400 tracking-widest">
                  MOD_{module.id}
                </span>
              </div>

              {/* Icon + value row */}
              <div className="relative flex items-center justify-between mb-5">
                <div className={`w-16 h-16 ${module.iconBg} border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#111] group-hover:rotate-[-6deg] group-hover:scale-105 transition-all duration-300`}>
                  <span className="material-symbols-outlined text-3xl">{module.icon}</span>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[9px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Value</p>
                  <p className="font-mono font-black text-2xl md:text-3xl text-black leading-none">
                    {module.value}
                  </p>
                </div>
              </div>

              {/* Title + description */}
              <h3 className="relative text-xl md:text-2xl font-black mb-2 font-mono uppercase tracking-tight">
                {module.title}
              </h3>
              <p className="relative text-gray-700 mb-4 text-sm leading-relaxed font-sans flex-grow">
                {module.description}
              </p>

              {/* Example pills */}
              <div className="relative flex flex-wrap gap-1.5 mb-5">
                {module.examples.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] font-black uppercase tracking-wider bg-white/80 border border-black px-2 py-0.5 shadow-[1px_1px_0px_#111] group-hover:bg-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                className="relative flex items-center justify-between w-full py-3 px-4 border-2 border-black bg-black text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-accent-yellow hover:text-black transition-colors"
                href={module.href}
              >
                <span>{module.buttonText}</span>
                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom: aggregate value strip */}
        <div className="hidden md:flex mt-8 md:mt-10 items-center justify-center">
          <div className="bg-black text-white border-2 border-black px-5 md:px-8 py-3 md:py-4 shadow-[4px_4px_0px_#FFD500] flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-accent-yellow text-base">bolt</span>
              <span className="font-mono text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-300">Stack it all</span>
            </div>
            <span className="text-gray-700">|</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono font-black text-xl md:text-2xl text-accent-yellow">$500K+</span>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-400">Total value unlocked</span>
            </div>
            <span className="text-gray-700">|</span>
            <Link
              href="/pricing"
              className="font-mono text-[10px] md:text-xs font-black uppercase tracking-widest hover:text-accent-yellow transition-colors flex items-center gap-1.5"
            >
              See plans
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes sysmoduleFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .sysmodule-fade-in {
          animation: sysmoduleFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes mandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .mandala-spin {
          animation: mandalaSpin 60s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sysmodule-fade-in {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .mandala-spin {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
