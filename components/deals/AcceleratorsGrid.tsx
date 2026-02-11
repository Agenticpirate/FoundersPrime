'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import DealCard from './DealCard'
import AcceleratorsSearch from './AcceleratorsSearch'
import ViewToggle, { ViewMode } from './ViewToggle'
import { accelerators2026, Accelerator } from '@/data/accelerators-2026'

type SortOption = 'name' | 'investment' | 'deadline' | 'equity'

export default function AcceleratorsGrid() {
  const [filterRegion, setFilterRegion] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const regions = ['All', 'Global', 'North America', 'Europe', 'Southeast Asia', 'MENA', 'LatAm']

  // Search and filter logic
  const filteredAndSearchedDeals = useMemo(() => {
    let results = accelerators2026

    // Apply region filter
    if (filterRegion !== 'All') {
      results = results.filter(acc => acc.region === filterRegion || acc.region === 'Global')
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(acc =>
        acc.name.toLowerCase().includes(query) ||
        acc.location.toLowerCase().includes(query) ||
        acc.focusArea.toLowerCase().includes(query) ||
        acc.description.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'investment':
          // Extract numeric value for comparison
          const aInv = parseInt(a.investment.replace(/[^0-9]/g, '')) || 0
          const bInv = parseInt(b.investment.replace(/[^0-9]/g, '')) || 0
          return bInv - aInv
        case 'equity':
          const aEq = parseFloat(a.equity.replace('%', '')) || 0
          const bEq = parseFloat(b.equity.replace('%', '')) || 0
          return aEq - bEq
        case 'deadline':
          // Sort by application status and deadline
          if (a.applicationStatus === 'Active' && b.applicationStatus !== 'Active') return -1
          if (a.applicationStatus !== 'Active' && b.applicationStatus === 'Active') return 1
          return 0
        default:
          return 0
      }
    })

    return results
  }, [filterRegion, searchQuery, sortBy])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleClearFilters = () => {
    setFilterRegion('All')
    setSearchQuery('')
    setSortBy('name')
  }

  const hasActiveFilters = filterRegion !== 'All' || searchQuery.trim() !== '' || sortBy !== 'name'

  // Helper to convert Accelerator to DealCard format
  const convertToCard = (acc: Accelerator) => {
    return {
      id: acc.slug,
      logo: acc.logo || '',
      category: 'Accelerator',
      badge: acc.applicationStatus === 'Active' ? 'Applications Open' : acc.applicationStatus,
      badgeColor: acc.applicationStatus === 'Active' ? 'bg-green-600' : 'bg-gray-500',
      title: acc.name,
      provider: acc.location,
      value: acc.investment,
      valueSubtext: acc.equity === '0%' ? 'Equity Free' : `${acc.equity} Equity`,
      valueStyle: 'bg-white text-ink border-2 border-ink',
      description: acc.description,
      eligibility: acc.founderStage,
      validFor: acc.applicationDeadline ? `Deadline: ${acc.applicationDeadline}` : acc.applicationStatus,
      applicationUrl: acc.website,
      verified: true
    }
  }

  return (
    <div className="w-full">
      {/* Header with Title and View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 border-b-3 border-black pb-4">
        <div className="flex-1">
          <h2 className="font-mono text-3xl font-bold text-black">Top Programs 2026</h2>
          <span className="font-mono text-sm text-gray-500 mt-1 block">
            Verified terms and deadlines for Q1 2026
          </span>
        </div>
        <ViewToggle onViewChange={setViewMode} />
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <AcceleratorsSearch onSearch={handleSearch} />
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Region Filters */}
        <div className="flex-1">
          <label className="font-mono text-xs font-bold text-gray-600 uppercase mb-2 block">
            Filter by Region
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setFilterRegion(region)}
                className={`px-3 py-1.5 font-mono text-xs border-2 border-black rounded-sm whitespace-nowrap transition-all ${filterRegion === region
                    ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]'
                    : 'bg-white text-black hover:bg-gray-100'
                  }`}
                aria-pressed={filterRegion === region}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="lg:w-64">
          <label htmlFor="sort-select" className="font-mono text-xs font-bold text-gray-600 uppercase mb-2 block">
            Sort By
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full px-3 py-2 font-mono text-sm bg-white border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all"
            aria-label="Sort accelerators"
          >
            <option value="name">Name (A-Z)</option>
            <option value="investment">Investment (High to Low)</option>
            <option value="equity">Equity (Low to High)</option>
            <option value="deadline">Application Status</option>
          </select>
        </div>
      </div>

      {/* Results Count and Clear Filters */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dashed border-gray-300">
        <div className="font-mono text-sm text-gray-600">
          Showing <span className="font-bold text-black">{filteredAndSearchedDeals.length}</span> of{' '}
          <span className="font-bold text-black">{accelerators2026.length}</span> programs
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="px-3 py-1.5 font-mono text-xs font-bold bg-white border-2 border-black rounded-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
            aria-label="Clear all filters"
          >
            <span className="material-symbols-outlined text-sm">close</span>
            Clear Filters
          </button>
        )}
      </div>

      {/* Grid/List View */}
      {filteredAndSearchedDeals.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {filteredAndSearchedDeals.map((acc) => (
            <DealCard key={acc.id} deal={convertToCard(acc)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm">
          <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">
            search_off
          </span>
          <p className="font-mono text-lg font-bold text-gray-700 mb-2">No programs found</p>
          <p className="font-mono text-sm text-gray-500 mb-4">
            Try adjusting your filters or search query
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 font-mono text-sm font-bold bg-accent-yellow border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}