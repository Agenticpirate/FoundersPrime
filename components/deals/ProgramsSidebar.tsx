'use client'

export type ProgramType = 'all' | 'accelerators' | 'incubators' | 'grants'

interface ProgramsSidebarProps {
  selectedType: ProgramType
  onTypeSelect: (type: ProgramType) => void
  counts?: Record<ProgramType, number>
}

/** Brand-synced palette: yellow active state (matches Deals sidebar), no teal/emerald */
const PROGRAM_TABS: {
  id: ProgramType
  label: string
  icon: string
  iconColor: string
}[] = [
  {
    id: 'all',
    label: 'All Programs',
    icon: 'grid_view',
    iconColor: 'text-gray-400',
  },
  {
    id: 'accelerators',
    label: 'Accelerators',
    icon: 'rocket_launch',
    iconColor: 'text-orange-400',
  },
  {
    id: 'incubators',
    label: 'Incubators',
    icon: 'lightbulb',
    iconColor: 'text-violet-400',
  },
  {
    id: 'grants',
    label: 'Grants',
    icon: 'payments',
    iconColor: 'text-sky-400',
  },
]

export default function ProgramsSidebar({
  selectedType,
  onTypeSelect,
  counts = { all: 0, accelerators: 0, incubators: 0, grants: 0 },
}: ProgramsSidebarProps) {
  return (
    <aside className="w-full">
      <div className="relative sticky top-20 max-h-[calc(100vh-6rem)] overflow-hidden bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm transition-colors duration-300">
        <div className="relative max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.12em]">
                Program Type
              </h3>
              <span className="text-[10px] font-mono text-gray-400">
                {PROGRAM_TABS.length - 1}
              </span>
            </div>
          </div>

          <div className="p-2 space-y-0.5">
            {PROGRAM_TABS.map((tab) => {
              const isActive = selectedType === tab.id
              const count = counts[tab.id]
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTypeSelect(tab.id)}
                  className={`group w-full flex items-center gap-2 px-2.5 py-2.5 text-left rounded-lg transition-all ${
                    isActive
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-sm'
                      : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[17px] flex-shrink-0 transition-colors ${
                      isActive
                        ? 'text-accent-yellow dark:text-black'
                        : `${tab.iconColor} opacity-80 group-hover:opacity-100`
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <span
                    className={`text-[13px] font-medium flex-1 min-w-0 truncate ${
                      isActive ? 'font-semibold' : ''
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`text-[10.5px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0 tabular-nums transition-colors ${
                      isActive
                        ? 'bg-accent-yellow text-black'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-white/10'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mx-4 my-2 border-t border-gray-100 dark:border-white/10" aria-hidden="true" />

          <div className="px-4 pb-4 space-y-2">
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.12em] mb-2">
              Quick Stats
            </p>
            {[
              { label: 'Avg Investment', value: '$250K', icon: 'payments', color: 'text-amber-600 dark:text-accent-yellow' },
              { label: 'Equity-free grants', value: '200+', icon: 'shield', color: 'text-sky-500' },
              { label: 'Countries covered', value: '50+', icon: 'public', color: 'text-violet-500' },
              { label: 'Avg acceptance', value: '~2%', icon: 'filter_alt', color: 'text-orange-500' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[14px] ${stat.color} flex-shrink-0`}
                >
                  {stat.icon}
                </span>
                <span className="text-[11.5px] text-gray-600 dark:text-gray-400 flex-1 truncate">
                  {stat.label}
                </span>
                <span className="text-[11.5px] font-bold font-mono text-gray-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-gray-100 dark:border-white/10 bg-gray-50/60 dark:bg-white/[0.02] rounded-b-xl">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Tip:</span> Use a work
              email to boost approval rates.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
