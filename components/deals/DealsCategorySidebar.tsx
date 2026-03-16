'use client'

import { useState, useEffect } from 'react'
import { getAllCategories, getSubcategoriesByCategory, Deal, getFeaturedCategories } from '@/lib/deals-database'

interface CategorySidebarProps {
  onCategorySelect?: (category: string, subcategory?: string) => void
  selectedCategory?: string
  selectedSubcategory?: string
}

export default function DealsCategorySidebar({
  onCategorySelect,
  selectedCategory = '',
  selectedSubcategory = ''
}: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([selectedCategory])
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [subcategoryCounts, setSubcategoryCounts] = useState<Record<string, number>>({})
  const [totalDeals, setTotalDeals] = useState(0)
  const categories = getFeaturedCategories()

  // Load deals and calculate counts
  useEffect(() => {
    const loadCounts = async () => {
      try {
        const response = await fetch('/api/deals')
        const data = await response.json()

        if (data.success && data.deals) {
          const deals: Deal[] = data.deals
          setTotalDeals(deals.length)

          // Calculate category counts
          const catCounts: Record<string, number> = {}
          const subCounts: Record<string, number> = {}

          deals.forEach(deal => {
            const catId = deal.category.toLowerCase().replace(/\s+/g, '-')
            catCounts[catId] = (catCounts[catId] || 0) + 1
            if (deal.subcategory) {
              const subId = deal.subcategory.toLowerCase().replace(/\s+/g, '-')
              const subKey = `${catId}/${subId}`
              subCounts[subKey] = (subCounts[subKey] || 0) + 1
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
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleCategoryClick = (categoryId: string, e?: React.MouseEvent) => {
    // Prevent event bubbling
    e?.stopPropagation()

    if (selectedCategory === categoryId) {
      // Deselect if clicking active category
      onCategorySelect?.('', '')
      // Also collapse the category
      setExpandedCategories(prev => prev.filter(id => id !== categoryId))
    } else {
      onCategorySelect?.(categoryId, '')
      // Auto-expand when clicking the category
      setExpandedCategories(prev =>
        prev.includes(categoryId) ? prev : [...prev, categoryId]
      )
    }
  }

  const handleToggleOnly = (categoryId: string, e: React.MouseEvent) => {
    // Prevent triggering category selection
    e.stopPropagation()
    toggleCategory(categoryId)
  }

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    onCategorySelect?.(categoryId, subcategoryId)
  }

  return (
    <aside className="w-56 flex-shrink-0">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white border-2 border-black p-3 shadow-[4px_4px_0px_#111111]">
        {/* Categories Header */}
        <div className="mb-2">
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide px-2">Categories</h3>
        </div>

        {/* All Deals Option */}
        <button
          onClick={() => onCategorySelect?.('', '')}
          className={`w-full flex items-center justify-between px-2 py-1.5 text-left transition-colors text-sm ${!selectedCategory
            ? 'bg-ink text-white font-medium shadow-[2px_2px_0px_#111111]'
            : 'hover:bg-gray-50 text-gray-700'
            }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">apps</span>
            <span>All Deals</span>
          </div>
          <span className="text-xs font-medium">
            {totalDeals}
          </span>
        </button>

        {/* Category List */}
        <div className="space-y-0.5 mt-2">
          {categories.map((category) => {
            const subcategories = getSubcategoriesByCategory(category.id)
            const isExpanded = expandedCategories.includes(category.id)
            const isActive = selectedCategory === category.id && !selectedSubcategory
            const hasSubcategories = subcategories.length > 0

            return (
              <div key={category.id}>
                {/* Category Item */}
                <div className="flex items-center">
                  {/* Expand/Collapse Button */}
                  {hasSubcategories ? (
                    <button
                      onClick={(e) => handleToggleOnly(category.id, e)}
                      className="p-0.5 hover:bg-gray-100 rounded transition-colors"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      <span className={`material-symbols-outlined text-sm text-gray-500 transition-transform duration-200 ease-out ${isExpanded ? 'rotate-90' : 'rotate-0'
                        }`}>
                        chevron_right
                      </span>
                    </button>
                  ) : (
                    <div className="w-5"></div>
                  )}

                  <button
                    onClick={(e) => handleCategoryClick(category.id, e)}
                    className={`flex-1 flex items-center justify-between px-2 py-1.5 text-left transition-colors rounded text-sm ${isActive
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                      }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs font-medium">
                      {categoryCounts[category.id] || 0}
                    </span>
                  </button>
                </div>

                {/* Subcategories with smooth animation */}
                {hasSubcategories && (
                  <div
                    className={`ml-5 overflow-hidden transition-all duration-200 ease-out ${isExpanded ? 'max-h-[500px] opacity-100 mt-0.5' : 'max-h-0 opacity-0 mt-0'
                      }`}
                  >
                    <div className="space-y-0.5 py-0.5">
                      {subcategories.map((subcategory) => {
                        const isSubActive = selectedCategory === category.id && selectedSubcategory === subcategory.id

                        return (
                          <button
                            key={subcategory.id}
                            onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
                            className={`w-full flex items-center justify-between px-2 py-1.5 text-left transition-colors rounded text-xs ${isSubActive
                              ? 'bg-gray-100 text-gray-900 font-medium'
                              : 'hover:bg-gray-50 text-gray-600'
                              }`}
                          >
                            <span>{subcategory.name}</span>
                            <span className="text-xs font-medium">
                              {subcategoryCounts[`${category.id}/${subcategory.id}`] || 0}
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
    </aside>
  )
}
