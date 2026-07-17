'use client'

import { useState, useEffect } from 'react'
import { getSubcategoriesByCategory, Deal, getAllCategories } from '@/lib/deals-database'

interface CategorySidebarProps {
  onCategorySelect?: (category: string, subcategory?: string) => void
  selectedCategory?: string
  selectedSubcategory?: string
}

const CATEGORY_ICONS: Record<string, string> = {
  'cloud-credits': 'cloud',
  'ad-credits': 'campaign',
  'saas-discounts': 'apps',
  'startup-programs': 'rocket_launch',
}

const CATEGORY_ICON_COLORS: Record<string, string> = {
  'cloud-credits': 'text-sky-500',
  'ad-credits': 'text-pink-500',
  'saas-discounts': 'text-indigo-500',
  'startup-programs': 'text-orange-500',
}

export default function DealsCategorySidebar({
  onCategorySelect,
  selectedCategory = '',
  selectedSubcategory = ''
}: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([selectedCategory].filter(Boolean))
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [subcategoryCounts, setSubcategoryCounts] = useState<Record<string, number>>({})
  const [totalDeals, setTotalDeals] = useState(0)
  const categories = getAllCategories()

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const response = await fetch('/api/deals')
        const data = await response.json()
        if (data.success && data.deals) {
          const deals: Deal[] = data.deals
          setTotalDeals(deals.length)
          const catCounts: Record<string, number> = {}
          const subCounts: Record<string, number> = {}
          deals.forEach(deal => {
            const catId = (deal.category || '').toLowerCase().replace(/\s+/g, '-')
            catCounts[catId] = (catCounts[catId] || 0) + 1
            if (deal.subcategory) {
              const subId = (deal.subcategory || '').toLowerCase().replace(/\s+/g, '-')
              subCounts[`${catId}/${subId}`] = (subCounts[`${catId}/${subId}`] || 0) + 1
            }
          })
          setCategoryCounts(catCounts)
          setSubcategoryCounts(subCounts)
        }
      } catch (error) {
        console.error('Error loading deal counts:', error)
      }
    }
    loadCounts()
  }, [])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    )
  }

  const handleCategoryClick = (categoryId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedCategory === categoryId && !selectedSubcategory) {
      onCategorySelect?.('', '')
      setExpandedCategories(prev => prev.filter(id => id !== categoryId))
    } else {
      onCategorySelect?.(categoryId, '')
      setExpandedCategories(prev => (prev.includes(categoryId) ? prev : [...prev, categoryId]))
    }
  }

  const handleToggleOnly = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toggleCategory(categoryId)
  }

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    onCategorySelect?.(categoryId, subcategoryId)
  }

  return (
    <aside className="w-full">
      <div className="relative sticky top-20 max-h-[calc(100vh-6rem)] overflow-hidden bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm transition-colors duration-300">
        {/* Decorative mandala — corner ornament */}
        <div className="absolute -bottom-12 -right-12 w-40 h-40 pointer-events-none opacity-[0.06]" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-white/10 sidebar-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
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
            <h3 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.12em]">Categories</h3>
            <span className="text-[10px] font-mono text-gray-400">{categories.length}</span>
          </div>
        </div>

        <div className="p-2">
          {/* All Deals */}
          <button
            onClick={() => onCategorySelect?.('', '')}
            className={`group w-full flex items-center gap-2 px-2.5 py-2 text-left rounded-lg transition-all ${
              !selectedCategory
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-sm'
                : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className={`material-symbols-outlined text-[17px] flex-shrink-0 ${!selectedCategory ? 'text-accent-yellow dark:text-black' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`}>
              grid_view
            </span>
            <span className="text-[13px] font-medium flex-1 min-w-0 truncate">All Deals</span>
            <span className={`text-[10.5px] font-mono px-1.5 py-0.5 rounded flex-shrink-0 ${
              !selectedCategory ? 'bg-white/10 dark:bg-black/10 text-white dark:text-gray-300' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-white/10'
            }`}>
              {totalDeals}
            </span>
          </button>

          <div className="my-2 border-t border-gray-100 dark:border-white/10" aria-hidden="true" />

          {/* Categories */}
          <div className="space-y-0.5">
            {categories.map((category) => {
              const subcategories = getSubcategoriesByCategory(category.id)
              const isExpanded = expandedCategories.includes(category.id)
              const isActive = selectedCategory === category.id && !selectedSubcategory
              const hasSubcategories = subcategories.length > 0
              const icon = CATEGORY_ICONS[category.id] || 'folder'
              const iconColor = CATEGORY_ICON_COLORS[category.id] || 'text-gray-400'
              const count = categoryCounts[category.id] || 0

              return (
                <div key={category.id}>
                  <div
                    className={`group relative flex items-center rounded-lg transition-all ${
                      isActive ? 'bg-gray-100 dark:bg-white/5' : 'hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <button
                      onClick={(e) => handleCategoryClick(category.id, e)}
                      className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2 text-left rounded-lg"
                    >
                      <span className={`material-symbols-outlined text-[17px] flex-shrink-0 ${
                        isActive ? iconColor : `${iconColor} opacity-70 group-hover:opacity-100`
                      }`}>
                        {icon}
                      </span>
                      <span className={`text-[13px] truncate flex-1 min-w-0 ${isActive ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300 font-medium'}`}>
                        {category.name}
                      </span>
                      <span className={`text-[10.5px] font-mono px-1.5 py-0.5 rounded flex-shrink-0 ${
                        isActive ? 'bg-white dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'
                      }`}>
                        {count}
                      </span>
                    </button>

                    {hasSubcategories && (
                      <button
                        onClick={(e) => handleToggleOnly(category.id, e)}
                        className="flex-shrink-0 p-1.5 mr-1 rounded hover:bg-gray-200/60 dark:hover:bg-white/10 transition-colors"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        <span
                          className={`material-symbols-outlined text-[15px] text-gray-400 transition-transform duration-200 block ${
                            isExpanded ? 'rotate-90' : 'rotate-0'
                          }`}
                        >
                          chevron_right
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Subcategories */}
                  {hasSubcategories && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-out ${
                        isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="mt-0.5 ml-7 pl-2 border-l border-gray-200 dark:border-white/10 space-y-0.5">
                        {subcategories.map((subcategory) => {
                          const isSubActive =
                            selectedCategory === category.id && selectedSubcategory === subcategory.id
                          const subCount = subcategoryCounts[`${category.id}/${subcategory.id}`] || 0
                          return (
                            <button
                              key={subcategory.id}
                              onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
                              className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 text-left rounded-md transition-colors text-[12.5px] ${
                                isSubActive
                                  ? 'bg-accent-yellow/15 dark:bg-accent-yellow/10 text-gray-900 dark:text-accent-yellow font-semibold'
                                  : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              <span className="truncate">{subcategory.name}</span>
                              <span className={`text-[10px] font-mono ${
                                isSubActive ? 'text-gray-700 dark:text-accent-yellow/80' : 'text-gray-400'
                              }`}>
                                {subCount}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer hint */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-white/10 bg-gray-50/60 dark:bg-white/[0.02] rounded-b-xl">
          <p className="text-[10px] text-gray-500 dark:text-gray-450 leading-relaxed">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Tip:</span> Use a work email to boost approval rates.
          </p>
        </div>
        </div>

        <style jsx>{`
          @keyframes sidebarMandalaSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          :global(.sidebar-mandala-spin) {
            animation: sidebarMandalaSpin 90s linear infinite;
            transform-origin: center;
          }
          @media (prefers-reduced-motion: reduce) {
            :global(.sidebar-mandala-spin) { animation: none; }
          }
        `}</style>
      </div>
    </aside>
  )
}
