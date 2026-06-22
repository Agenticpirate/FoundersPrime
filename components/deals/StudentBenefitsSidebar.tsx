'use client'

import { studentBenefits2026 } from '@/data/student-benefits-2026'

export type StudentBenefitType = 'all' | 'free-access' | 'credits-savings' | 'funding' | 'programs'

interface StudentBenefitsSidebarProps {
  selectedType: StudentBenefitType
  onTypeSelect: (type: StudentBenefitType) => void
}

const BENEFIT_TABS: {
  id: StudentBenefitType
  label: string
  icon: string
  iconColor: string
  activeIconColor: string
  activeBg: string
}[] = [
  {
    id: 'all',
    label: 'All Benefits',
    icon: 'grid_view',
    iconColor: 'text-gray-400',
    activeIconColor: 'text-accent-yellow dark:text-black',
    activeBg: 'bg-gray-900 dark:bg-white text-white dark:text-black',
  },
  {
    id: 'credits-savings',
    label: 'Credits & Savings',
    icon: 'savings',
    iconColor: 'text-emerald-400',
    activeIconColor: 'text-emerald-500',
    activeBg: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200',
  },
  {
    id: 'free-access',
    label: 'Campus Edge',
    icon: 'devices',
    iconColor: 'text-pink-400',
    activeIconColor: 'text-pink-500',
    activeBg: 'bg-pink-50 dark:bg-pink-950/20 text-pink-900 dark:text-pink-200',
  },
  {
    id: 'funding',
    label: 'Funding & Opps',
    icon: 'monetization_on',
    iconColor: 'text-cyan-400',
    activeIconColor: 'text-cyan-500',
    activeBg: 'bg-cyan-50 dark:bg-cyan-950/20 text-cyan-900 dark:text-cyan-200',
  },
  {
    id: 'programs',
    label: 'Programs',
    icon: 'rocket_launch',
    iconColor: 'text-orange-400',
    activeIconColor: 'text-orange-500',
    activeBg: 'bg-orange-50 dark:bg-orange-950/20 text-orange-900 dark:text-orange-200',
  },
]

export default function StudentBenefitsSidebar({ selectedType, onTypeSelect }: StudentBenefitsSidebarProps) {
  const counts: Record<StudentBenefitType, number> = {
    all: studentBenefits2026.length,
    'free-access': studentBenefits2026.filter((b) => b.appCategory === 'Software & Tools').length,
    'credits-savings': studentBenefits2026.filter((b) => b.appCategory === 'Credits & Savings').length,
    funding: studentBenefits2026.filter((b) => b.appCategory === 'Funding & Opportunities').length,
    programs: studentBenefits2026.filter((b) => b.appCategory === 'Programs').length,
  }

  return (
    <aside className="w-full">
      <div className="relative sticky top-20 max-h-[calc(100vh-6rem)] overflow-hidden bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm transition-colors duration-300">
        {/* Decorative mandala — corner ornament */}
        <div className="absolute -bottom-12 -right-12 w-40 h-40 pointer-events-none opacity-[0.06]" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-700 dark:text-cyan-400 student-sidebar-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
              <h3 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.12em]">Benefit Type</h3>
              <span className="text-[10px] font-mono text-gray-400">{BENEFIT_TABS.length - 1}</span>
            </div>
          </div>

          <div className="p-2 space-y-0.5">
            {BENEFIT_TABS.map((tab) => {
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
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.12em] mb-2">Student Info</p>
            {[
              { label: 'School Email', value: '.edu email', icon: 'mail', color: 'text-amber-600' },
              { label: 'Verification', preference: 'SheerID / Beans', icon: 'verified', color: 'text-emerald-600' },
              { label: 'Free Forever', value: '200+ deals', icon: 'workspace_premium', color: 'text-pink-600' },
              { label: 'Regions', value: 'Global', icon: 'public', color: 'text-sky-600' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-[14px] ${stat.color} flex-shrink-0`}>{stat.icon}</span>
                <span className="text-[11.5px] text-gray-600 dark:text-gray-400 flex-1 truncate">{stat.label}</span>
                <span className="text-[11.5px] font-bold font-mono text-gray-900 dark:text-white">
                  {stat.value || (stat as any).preference}
                </span>
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-3 border-t border-gray-100 dark:border-white/10 bg-gray-50/60 dark:bg-white/[0.02] rounded-b-xl">
            <p className="text-[10px] text-gray-500 dark:text-gray-450 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Tip:</span> Use your academic email address to instantly verify your student status.
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes studentSidebarMandalaSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          :global(.student-sidebar-mandala-spin) {
            animation: studentSidebarMandalaSpin 90s linear infinite;
            transform-origin: center;
          }
          @media (prefers-reduced-motion: reduce) {
            :global(.student-sidebar-mandala-spin) { animation: none; }
          }
        `}</style>
      </div>
    </aside>
  )
}
