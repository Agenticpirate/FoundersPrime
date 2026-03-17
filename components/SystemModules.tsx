'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

export default function SystemModules() {
  const modules = [
    {
      id: "MOD_01",
      icon: "cloud_done",
      title: "Cloud Credits",
      description: "Access up to $100k in AWS, Google Cloud, and Azure credits instantly with zero equity usage.",
      hoverColor: "group-hover:bg-primary group-hover:text-white",
      buttonText: "Browse Credits",
      href: "/deals/cloud-credits"
    },
    {
      id: "MOD_02",
      icon: "monetization_on",
      title: "Startup Grants",
      description: "Curated list of non-dilutive grants for early-stage startups, R&D, and social impact.",
      hoverColor: "group-hover:bg-accent-yellow group-hover:text-black",
      buttonText: "Find Grants",
      href: "/deals/grants"
    },
    {
      id: "MOD_03",
      icon: "percent",
      title: "SaaS Discounts",
      description: "Get 6 months free or 50% off top tools like Notion, Airtable, Linear, and HubSpot.",
      hoverColor: "group-hover:bg-accent-red group-hover:text-black",
      buttonText: "View Deals",
      href: "/deals/saas-discounts"
    },
    {
      id: "MOD_04",
      icon: "rocket_launch",
      title: "Accelerators",
      description: "Comprehensive database of upcoming batches for YC, Techstars, and niche incubators.",
      hoverColor: "group-hover:bg-accent-orange group-hover:text-black",
      buttonText: "Apply Now",
      href: "/deals/accelerators"
    },
    {
      id: "MOD_05",
      icon: "emoji_objects",
      title: "Verified Ideas",
      description: "Market-validated startup ideas with research, competitor analysis, and demand signals.",
      hoverColor: "group-hover:bg-accent-yellow group-hover:text-black",
      buttonText: "Explore Ideas",
      href: "/ideas"
    },
    {
      id: "MOD_06",
      icon: "dataset",
      title: "Funded Database",
      description: "Analyze who got funded recently to spot industry trends and identify active investors.",
      hoverColor: "group-hover:bg-primary group-hover:text-white",
      buttonText: "View Database",
      href: "/startups"
    }
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

  return (
    <section className="relative py-6 md:py-6 md:py-8 grid-bg overflow-hidden border-b-2 border-black">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-5 md:mb-10 border-b-[3px] border-[#101622] pb-3 md:pb-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#101622] font-mono tracking-tight">CORE AREAS</h2>
            <div className="h-1 w-12 md:w-16 bg-accent-cyan mt-1.5 md:mt-2"></div>
          </div>
          <p className="font-mono text-xs text-gray-600 mt-2 md:mt-0 uppercase tracking-widest font-bold">Everything Founders Need. Nothing They Don't.</p>
        </div>

        {/* Mobile: horizontal snap carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-3 mobile-scroll-hide"
          style={{ scrollPaddingLeft: '16px' }}
        >
          {modules.map((module) => (
            <div key={module.id} className="bg-white border-[3px] border-[#101622] p-4 shadow-[4px_4px_0px_0px_#101622] flex flex-col snap-start shrink-0 w-[78vw]">
              <div className="flex justify-between items-start mb-3">
                <div className={`w-10 h-10 ${module.hoverColor.replace(/group-hover:/g, '')} border-[3px] border-[#101622] flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-xl">{module.icon}</span>
                </div>
                <span className="font-mono text-[10px] font-bold border-[2px] border-[#101622] px-1.5 py-0.5 bg-white shadow-[2px_2px_0px_0px_#101622]">{module.id}</span>
              </div>
              <h3 className="text-base font-bold mb-1.5 font-mono uppercase">{module.title}</h3>
              <p className="text-gray-600 mb-4 text-xs leading-relaxed font-mono flex-grow">{module.description}</p>
              <Link className="flex items-center justify-center gap-2 w-full py-2 border-[3px] border-[#101622] font-mono font-bold text-xs uppercase bg-transparent hover:bg-[#101622] hover:text-white transition-all duration-300" href={module.href}>
                <span>{module.buttonText}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile dots indicator */}
        <div className="flex md:hidden justify-center gap-1.5 mt-3">
          {modules.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-2 transition-all duration-300 border border-black ${activeIdx === idx ? 'w-6 bg-black' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div key={module.id} className="bg-white border-[3px] border-[#101622] p-6 shadow-[6px_6px_0px_0px_#101622] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#101622] transition-all duration-300 group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 bg-white border-[3px] border-[#101622] flex items-center justify-center ${module.hoverColor} transition-colors duration-300`}>
                  <span className="material-symbols-outlined text-2xl">{module.icon}</span>
                </div>
                <span className="font-mono text-xs font-bold border-[3px] border-[#101622] px-2 py-0.5 bg-white shadow-[2px_2px_0px_0px_#101622]">{module.id}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono uppercase">{module.title}</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed font-mono flex-grow">{module.description}</p>
              <Link className="flex items-center justify-center gap-2 w-full py-3 border-[3px] border-[#101622] font-mono font-bold text-xs uppercase bg-transparent hover:bg-[#101622] hover:text-white hover:border-[#101622] transition-all duration-300 group/btn" href={module.href}>
                <span>{module.buttonText}</span>
                <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}