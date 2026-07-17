'use client'

import { useState, useEffect } from 'react'
import { getSubcategoriesByCategory, getAllCategories } from '@/lib/deals-database'
import { countDealsByCategory } from '@/lib/catalog-segregation'

interface CategorySidebarProps {
  onCategorySelect?: (category: string, subcategory?: string) => void
  selectedCategory?: string
  selectedSubcategory?: string
}

const CATEGORY_ICONS: Record<string, string> = {
  'cloud-credits': 'cloud',
  'ad-credits': 'campaign',
  'saas-discounts': 'apps',
}

const CATEGORY_ICON_COLORS: Record<string, string> = {
  'cloud-credits': 'text-sky-500',
  'ad-credits': 'text-orange-500',
  'saas-discounts': 'text-violet-500',
}

export default function DealsCategorySidebar({
  onCategorySelect,
  selectedCategory = '',
  selectedSubcategory = '',
}: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    [selectedCategory].filter(Boolean)
  )
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({
    'cloud-credits': 0,
    'ad-credits': 0,
    'saas-discounts': 0,
  })
  const [subcategoryCounts, setSubcategoryCounts] = useState<Record<string, number>>({})
  const [totalDeals, setTotalDeals] = useState(0)
  const categories = getAllCategories()

  useEffect(() => {
    const loadCounts = async () => {
      try {
        // Explicit commercial scope — never use unscoped/all
        const response = await fetch('/api/deals?scope=deals')
        const data = await response.json()
        if (data.success && Array.isArray(data.deals)) {
          const { total, byCategory, bySubcategory } = countDealsByCategory(data.deals)
          setTotalDeals(total)
          setCategoryCounts(byCategory)
          setSubcategoryCounts(bySubcategory)
        }
      } catch (error) {
        console.error('Error loading deal counts:', error)
      }
    }
    loadCounts()
  }, [])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    )
  }

  const handleCategoryClick = (categoryId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedCategory === categoryId && !selectedSubcategory) {
      onCategorySelect?.('', '')
      setExpandedCategories((prev) => prev.filter((id) => id !== categoryId))
    } else {
      onCategorySelect?.(categoryId, '')
      setExpandedCategories((prev) => (prev.includes(categoryId) ? prev : [...prev, categoryId]))
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
        <div className="relative max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.12em]">
                Categories
              </h3>
              <span className="text-[10px] font-mono text-gray-400">{categories.length}</span>
            </div>
          </div>

          <div className="p-2">
            <button
              type="button"
              onClick={() => onCategorySelect?.('', '')}
              className={`group w-full flex items-center gap-2 px-2.5 py-2 text-left rounded-lg transition-all ${
                !selectedCategory
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-sm'
                  : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[17px] flex-shrink-0 ${
                  !selectedCategory
                    ? 'text-accent-yellow dark:text-black'
                    : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                }`}
              >
                grid_view
              </span>
              <span className="text-[13px] font-medium flex-1 min-w-0">All deals</span>
              <span
                className={`text-[10.5px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0 tabular-nums ${
                  !selectedCategory
                    ? // Active pill is light (white) — force dark count, never low-contrast gray
                      'bg-accent-yellow text-black'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'
                }`}
              >
                {totalDeals || '—'}
              </span>
            </button>

            <div className="my-2 border-t border-gray-100 dark:border-white/10" aria-hidden="true" />

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
                        type="button"
                        onClick={(e) => handleCategoryClick(category.id, e)}
                        className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2 text-left rounded-lg"
                      >
                        <span
                          className={`material-symbols-outlined text-[17px] flex-shrink-0 ${
                            isActive ? iconColor : `${iconColor} opacity-70 group-hover:opacity-100`
                          }`}
                        >
                          {icon}
                        </span>
                        <span
                          className={`text-[13px] flex-1 min-w-0 ${
                            isActive
                              ? 'font-semibold text-gray-900 dark:text-white'
                              : 'text-gray-700 dark:text-gray-300 font-medium'
                          }`}
                          title={category.name}
                        >
                          {category.name}
                        </span>
                        <span
                          className={`text-[10.5px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0 tabular-nums ${
                            isActive
                              ? 'bg-accent-yellow text-black'
                              : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {count}
                        </span>
                      </button>

                      {hasSubcategories && (
                        <button
                          type="button"
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

                    {hasSubcategories && (
                      <div
                        className={`overflow-hidden transition-all duration-200 ease-out ${
                          isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="mt-0.5 ml-7 pl-2 border-l border-gray-200 dark:border-white/10 space-y-0.5">
                          {subcategories.map((subcategory) => {
                            const isSubActive =
                              selectedCategory === category.id &&
                              selectedSubcategory === subcategory.id
                            const subCount =
                              subcategoryCounts[`${category.id}/${subcategory.id}`] || 0
                            return (
                              <button
                                key={subcategory.id}
                                type="button"
                                onClick={() =>
                                  handleSubcategoryClick(category.id, subcategory.id)
                                }
                                className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 text-left rounded-md transition-colors text-[12.5px] ${
                                  isSubActive
                                    ? 'bg-accent-yellow/15 dark:bg-accent-yellow/10 text-gray-900 dark:text-accent-yellow font-semibold'
                                    : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'
                                }`}
                              >
                                <span className="truncate">{subcategory.name}</span>
                                <span
                                  className={`text-[10px] font-mono tabular-nums ${
                                    isSubActive
                                      ? 'text-gray-700 dark:text-accent-yellow/80'
                                      : 'text-gray-400'
                                  }`}
                                >
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

          <div className="px-4 py-3 border-t border-gray-100 dark:border-white/10 bg-gray-50/60 dark:bg-white/[0.02] rounded-b-xl space-y-1.5">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Deals only</span>
              {' — '}
              cloud, ads, and SaaS offers. Accelerators &amp; grants are under{' '}
              <a href="/programs" className="text-accent-yellow font-semibold hover:underline">
                Programs
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
