'use client'

import { useEffect, useState } from 'react'
import { accelerators2026 } from '@/data/accelerators-2026'
import { incubators2026 } from '@/data/incubators-2026'
import { grants2026 } from '@/data/grants-2026'

export type ProgramType = 'all' | 'accelerators' | 'incubators' | 'grants'

interface ProgramsSidebarProps {
  selectedType: ProgramType
  onTypeSelect: (type: ProgramType) => void
}

const PROGRAM_TABS: {
  id: ProgramType
  label: string
  icon: string
  iconColor: string
  activeIconColor: string
  activeBg: string
}[] = [
  {
    id: 'all',
    label: 'All Programs',
    icon: 'grid_view',
    iconColor: 'text-gray-400',
    activeIconColor: 'text-accent-yellow dark:text-black',
    activeBg: 'bg-gray-900 dark:bg-white text-white dark:text-black',
  },
  {
    id: 'accelerators',
    label: 'Accelerators',
    icon: 'rocket_launch',
    iconColor: 'text-orange-400',
    activeIconColor: 'text-orange-500',
    activeBg: 'bg-orange-50 dark:bg-orange-950/20 text-orange-900 dark:text-orange-200',
  },
  {
    id: 'incubators',
    label: 'Incubators',
    icon: 'lightbulb',
    iconColor: 'text-teal-400',
    activeIconColor: 'text-teal-500',
    activeBg: 'bg-teal-50 dark:bg-teal-950/20 text-teal-900 dark:text-teal-200',
  },
  {
    id: 'grants',
    label: 'Grants',
    icon: 'payments',
    iconColor: 'text-emerald-400',
    activeIconColor: 'text-emerald-500',
    activeBg: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200',
  },
]

export default function ProgramsSidebar({ selectedType, onTypeSelect }: ProgramsSidebarProps) {
  const counts: Record<ProgramType, number> = {
    all: accelerators2026.length + incubators2026.length + grants2026.length,
    accelerators: accelerators2026.length,
    incubators: incubators2026.length,
    grants: grants2026.length,
  }

  return (
    <aside className="w-full">
      <div className="relative sticky top-20 max-h-[calc(100vh-6rem)] overflow-hidden bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm transition-colors duration-300">
        {/* Decorative mandala — corner ornament */}
        <div className="absolute -bottom-12 -right-12 w-40 h-40 pointer-events-none opacity-[0.06]" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-full h-full text-violet-700 dark:text-violet-400 programs-sidebar-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
            <circle cx="100" cy="100" r="50" />
            <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + Math.cos((i * Math.PI) / 6) * 90}
                y2={100 + Math.sin((i * Math.PI) / 6) * 90}
              />
            ))}
            <circle cx="100" cy="100" r="2" fill="currentColor" />
          </svg>
        </div>

        <div className="relative max-h-[calc(100vh-6rem)] overflow-y-auto">
          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.12em]">Program Type</h3>
              <span className="text-[10px] font-mono text-gray-400">{PROGRAM_TABS.length - 1}</span>
            </div>
          </div>

          <div className="p-2 space-y-0.5">
            {PROGRAM_TABS.map((tab) => {
              const isActive = selectedType === tab.id
              const count = counts[tab.id]
              return (
                <button
                  key={tab.id}
                  onClick={() => onTypeSelect(tab.id)}
                  className={`group w-full flex items-center gap-2 px-2.5 py-2.5 text-left rounded-lg transition-all ${
                    isActive
                      ? tab.activeBg + ' shadow-sm'
                      : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[17px] flex-shrink-0 transition-colors ${
                    isActive ? tab.activeIconColor : `${tab.iconColor} opacity-70 group-hover:opacity-100`
                  }`}>
                    {tab.icon}
                  </span>
                  <span className={`text-[13px] font-medium flex-1 min-w-0 truncate ${isActive ? 'font-semibold' : ''}`}>
                    {tab.label}
                  </span>
                  <span className={`text-[10.5px] font-mono px-1.5 py-0.5 rounded flex-shrink-0 transition-colors ${
                    isActive
                      ? 'bg-white/20 dark:bg-black/10'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-white/10'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Stats divider */}
          <div className="mx-4 my-2 border-t border-gray-100 dark:border-white/10" aria-hidden="true" />

          {/* Quick stats */}
          <div className="px-4 pb-4 space-y-2">
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.12em] mb-2">Quick Stats</p>
            {[
              { label: 'Avg Investment', value: '$250K', icon: 'payments', color: 'text-amber-600' },
              { label: 'Equity-free grants', value: '200+', icon: 'shield', color: 'text-emerald-600' },
              { label: 'Countries covered', value: '50+', icon: 'public', color: 'text-sky-600' },
              { label: 'Avg acceptance', value: '~2%', icon: 'filter_alt', color: 'text-rose-600' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-[14px] ${stat.color} flex-shrink-0`}>{stat.icon}</span>
                <span className="text-[11.5px] text-gray-600 dark:text-gray-400 flex-1 truncate">{stat.label}</span>
                <span className="text-[11.5px] font-bold font-mono text-gray-900 dark:text-white">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-3 border-t border-gray-100 dark:border-white/10 bg-gray-50/60 dark:bg-white/[0.02] rounded-b-xl">
            <p className="text-[10px] text-gray-500 dark:text-gray-450 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Tip:</span> Use a work email to boost approval rates.
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes programsSidebarMandalaSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          :global(.programs-sidebar-mandala-spin) {
            animation: programsSidebarMandalaSpin 90s linear infinite;
            transform-origin: center;
          }
          @media (prefers-reduced-motion: reduce) {
            :global(.programs-sidebar-mandala-spin) { animation: none; }
          }
        `}</style>
      </div>
    </aside>
  )
}
