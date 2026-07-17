'use client'

import { useState, useMemo, useCallback } from 'react'
import ideasData from '@/data/startup_ideas.json'
import IdeasFilterBar, { type IdeasFilterState } from './IdeasFilterBar'
import IdeasGrid from './IdeasGrid'
import IdeasSidebar from './IdeasSidebar'
import { getSignalScore } from './IdeaCard'

const DEFAULT_FILTERS: IdeasFilterState = {
  search: '',
  category: '',
  source: '',
  sort: 'relevance',
}

export default function IdeasContent() {
  const [filters, setFilters] = useState<IdeasFilterState>(DEFAULT_FILTERS)

  const allIdeas = ideasData as Array<{
    title: string
    description: string
    category: string
    source: string
    tags?: string[]
    itchScore?: string
    author?: string
  }>

  const categories = useMemo(() => {
    const counts: Record<string, number> = {}
    allIdeas.forEach((i) => {
      counts[i.category] = (counts[i.category] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [allIdeas])

  const sources = useMemo(
    () => Array.from(new Set(allIdeas.map((i) => i.source))).filter(Boolean) as string[],
    [allIdeas]
  )

  const filteredIdeas = useMemo(() => {
    let result = allIdeas

    if (filters.category) {
      result = result.filter((i) => i.category === filters.category)
    }
    if (filters.source) {
      result = result.filter((i) => i.source === filters.source)
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          (i.tags || []).some((t: string) => t.toLowerCase().includes(q))
      )
    }

    if (filters.sort === 'alphabetical') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    } else if (filters.sort === 'category') {
      result = [...result].sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title))
    } else if (filters.sort === 'signal') {
      result = [...result].sort(
        (a, b) =>
          getSignalScore(b.title, b.itchScore) - getSignalScore(a.title, a.itchScore)
      )
    }

    return result
  }, [allIdeas, filters])

  const handleCategorySelect = useCallback((category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === category ? '' : category,
    }))
  }, [])

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  return (
    <div>
      <IdeasFilterBar
        filters={filters}
        onFilterChange={setFilters}
        categories={categories.map((c) => c.name)}
        sources={sources}
        resultCount={filteredIdeas.length}
        totalCount={allIdeas.length}
        onReset={handleReset}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
        <div className="lg:col-span-8 min-w-0 order-2 lg:order-1">
          <IdeasGrid ideas={filteredIdeas} onClearFilters={handleReset} />
        </div>
        <div className="lg:col-span-4 min-w-0 order-1 lg:order-2">
          <IdeasSidebar
            categories={categories}
            selectedCategory={filters.category}
            onSelectCategory={handleCategorySelect}
            totalIdeas={allIdeas.length}
          />
        </div>
      </div>
    </div>
  )
}
