"use client";

import { useState, useMemo } from 'react'
import ResourcesHero from './ResourcesHero'
import ResourcesFilterBar, { type ResourcesFilterState } from './ResourcesFilterBar'
import ResourcesGrid from './ResourcesGrid'
import { resourcesData } from './resources-data'

const DEFAULT_FILTERS: ResourcesFilterState = {
  category: '',
  type: '',
  format: '',
  price: '',
  sort: 'popular',
}

export default function ResourcesContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<ResourcesFilterState>(DEFAULT_FILTERS)

  const filteredResources = useMemo(() => {
    let result = resourcesData

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.toLowerCase().includes(q))
      )
    }

    // 2. Category Filter
    if (filters.category) {
      result = result.filter(item => item.category === filters.category)
    }

    // 3. Type Filter
    if (filters.type) {
      result = result.filter(item => item.type === filters.type)
    }

    // 4. Format Filter
    if (filters.format) {
      result = result.filter(item => item.format === filters.format)
    }

    // 5. Price Filter
    if (filters.price) {
      if (filters.price === 'Free') {
        result = result.filter(item => item.price === 'Free')
      } else if (filters.price === 'Under $50') {
        result = result.filter(item => {
          if (item.price === 'Free') return true
          const val = Number(item.price.replace('$', ''))
          return val < 50
        })
      } else if (filters.price === '$50-$200') {
        result = result.filter(item => {
          if (item.price === 'Free') return false
          const val = Number(item.price.replace('$', ''))
          return val >= 50 && val <= 200
        })
      } else if (filters.price === '$200+') {
        result = result.filter(item => {
          if (item.price === 'Free') return false
          const val = Number(item.price.replace('$', ''))
          return val > 200
        })
      }
    }

    // 6. Sort
    if (filters.sort === 'recent') {
      result = [...result].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    } else if (filters.sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    } else if (filters.sort === 'downloads') {
      const parseDls = (dl: string) => Number(dl.replace('K', '')) || 0
      result = [...result].sort((a, b) => parseDls(b.downloads) - parseDls(a.downloads))
    } else if (filters.sort === 'price') {
      const parsePrice = (pr: string) => pr === 'Free' ? 0 : Number(pr.replace('$', '')) || 0
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    } else {
      const parseDls = (dl: string) => Number(dl.replace('K', '')) || 0
      result = [...result].sort((a, b) => (b.rating * parseDls(b.downloads)) - (a.rating * parseDls(a.downloads)))
    }

    return result
  }, [searchQuery, filters])

  const handleClear = () => {
    setSearchQuery('')
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <div className="w-full relative">
      <ResourcesHero searchQuery={searchQuery} onSearchChange={setSearchQuery} totalCount={resourcesData.length} />
      <ResourcesFilterBar filters={filters} onFilterChange={setFilters} onClear={handleClear} />
      <ResourcesGrid resources={filteredResources} />

      {/* Under Construction Popup Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop with strong blur */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        
        {/* Modal box */}
        <div className="relative w-full max-w-md bg-white dark:bg-[#0d0d0d] border-3 border-black dark:border-white/20 shadow-[8px_8px_0px_#111111] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.1)] p-6 md:p-8 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-accent-yellow border-2 border-black rounded-sm flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_#111]">
            <span className="material-symbols-outlined !text-[32px] text-black">construction</span>
          </div>
          
          <h2 className="font-mono text-xl md:text-2xl font-black uppercase text-black dark:text-white mb-3">
            Under Construction
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-mono mb-6">
            We are currently building and curating high-quality resources, templates, and guides for founders. Check back soon!
          </p>

          <div className="flex justify-center">
            <button type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-mono font-black text-xs uppercase tracking-wider px-5 py-3 border-2 border-black rounded-sm shadow-[3px_3px_0px_#111] hover:bg-accent-yellow hover:text-black hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
            >
              <span className="material-symbols-outlined !text-[16px]">arrow_back</span>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}