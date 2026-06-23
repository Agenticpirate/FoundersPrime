"use client";

import { useState } from 'react'
import Mandala from '@/components/ui/Mandala'

interface CategoryCount {
  name: string
  count: number
}

interface IdeasSidebarProps {
  categories: CategoryCount[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  totalIdeas: number
}

export default function IdeasSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  totalIdeas,
}: IdeasSidebarProps) {
  const [showAll, setShowAll] = useState(false)
  const visibleCategories = showAll ? categories : categories.slice(0, 8)

  const validationSteps = [
    'Search volume analysis across Google, social media, and forums',
    'Competitor funding and market traction research',
    'Technical feasibility and cost estimation',
    'Market size and monetization potential analysis',
  ]

  return (
    <div className="space-y-4 lg:sticky lg:top-20">
      {/* Top Categories — real, clickable */}
      <div className="relative bg-white border-2 border-black shadow-[4px_4px_0px_0px_#111] rounded-sm p-4 md:p-5 overflow-hidden">
        <Mandala
          variant="rings"
          colorClass="text-gray-900"
          opacity={0.05}
          speed={95}
          className="absolute -top-12 -right-12 w-40 h-40"
        />
        <div className="relative">
          <h3 className="font-mono text-sm font-black uppercase tracking-[0.08em] mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-accent-yellow">category</span>
            Browse Categories
          </h3>
          <div className="space-y-1">
            {visibleCategories.map((category) => {
              const active = selectedCategory === category.name
              return (
                <button
                  key={category.name}
                  onClick={() => onSelectCategory(category.name)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    active
                      ? 'bg-gray-900 text-white dark:bg-zinc-800 dark:text-white'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-100'
                  }`}
                >
                  <span className="font-mono text-[12px] font-semibold truncate">{category.name}</span>
                  <span className={`font-mono text-[11px] tabular-nums flex-shrink-0 ml-2 px-1.5 py-0.5 rounded-full ${
                    active ? 'bg-accent-yellow text-black' : 'bg-gray-100 text-gray-500 dark:bg-zinc-900 dark:text-zinc-400'
                  }`}>
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>
          {categories.length > 8 && (
            <button
              onClick={() => setShowAll(v => !v)}
              className="w-full mt-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wide bg-gray-50 hover:bg-gray-100 border border-gray-200 dark:border-zinc-800 rounded-lg transition-colors text-gray-700 dark:text-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              {showAll ? 'Show Less' : `View All ${categories.length} Categories`}
            </button>
          )}
        </div>
      </div>

      {/* Validation Methodology */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#111] rounded-sm p-4 md:p-5 overflow-hidden">
        <Mandala
          variant="orbital"
          colorClass="text-accent-yellow"
          opacity={0.1}
          speed={75}
          direction="ccw"
          className="absolute -bottom-12 -right-12 w-40 h-40"
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent" />
        <div className="relative">
          <h3 className="font-mono text-sm font-black uppercase tracking-[0.08em] mb-3 flex items-center gap-2 text-accent-yellow">
            <span className="material-symbols-outlined text-[18px]">science</span>
            How We Validate
          </h3>
          <div className="space-y-2.5">
            {validationSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="bg-accent-yellow text-black size-5 flex items-center justify-center text-[10px] font-black rounded-sm flex-shrink-0 mt-0.5 border border-black">
                  {i + 1}
                </div>
                <p className="font-sans text-[12px] text-gray-300 leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="relative bg-white border-2 border-black shadow-[4px_4px_0px_0px_#111] rounded-sm p-4 md:p-5 overflow-hidden">
        <Mandala
          variant="petal"
          colorClass="text-gray-900"
          opacity={0.05}
          speed={110}
          className="absolute -bottom-10 -left-10 w-36 h-36"
        />
        <div className="relative">
          <h3 className="font-mono text-sm font-black uppercase tracking-[0.08em] mb-1.5">Weekly Ideas Digest</h3>
          <p className="font-sans text-[12px] text-gray-600 dark:text-zinc-400 mb-3 leading-relaxed">
            Get fresh validated startup ideas delivered to your inbox every week.
          </p>
          <div className="space-y-2">
            <input
              className="w-full h-9 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 dark:border-zinc-800 text-black dark:text-white dark:bg-zinc-900 px-3 font-mono text-[12.5px] focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow placeholder:text-gray-400 rounded-lg transition-colors"
              placeholder="your@email.com"
              type="email"
            />
            <button className="w-full py-2 text-[12px] bg-black text-white hover:bg-accent-yellow hover:text-black border-2 border-black dark:border-zinc-800 font-mono font-bold rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
