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
    <div className="w-full">
      <ResourcesHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ResourcesFilterBar filters={filters} onFilterChange={setFilters} onClear={handleClear} />
      <ResourcesGrid resources={filteredResources} />
    </div>
  )
}