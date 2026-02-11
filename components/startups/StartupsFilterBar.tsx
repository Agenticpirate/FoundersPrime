'use client'

import { useState, useEffect } from 'react'

interface FilterState {
  search: string
  category: string
  minRevenue: string
  maxRevenue: string
  country: string
  source: string
  featured: boolean
  forSale: string
}

interface StartupsFilterBarProps {
  onFilterChange: (filters: FilterState) => void
  currentFilters: FilterState
}

export default function StartupsFilterBar({ onFilterChange, currentFilters }: StartupsFilterBarProps) {
  const [filters, setFilters] = useState(currentFilters)

  const categories = ['All', 'SaaS', 'Ecommerce', 'Agency', 'Mobile', 'AI', 'Other']
  const countries = ['All', 'United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'India', 'Italy', 'Denmark', 'Hong Kong']
  const sources = ['All', 'TrustMRR', 'Acquire.com']
  const revenueRanges = [
    { label: 'All Revenue', min: '', max: '' },
    { label: '$0-1M', min: '0', max: '1000000' },
    { label: '$1M-5M', min: '1000000', max: '5000000' },
    { label: '$5M-10M', min: '5000000', max: '10000000' },
    { label: '$10M+', min: '10000000', max: '' }
  ]

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handleChange = (key: keyof FilterState, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleRevenueChange = (min: string, max: string) => {
    setFilters(prev => ({ ...prev, minRevenue: min, maxRevenue: max }))
  }

  const clearFilters = () => {
    const resetFilters: FilterState = {
      search: '',
      category: 'all',
      minRevenue: '',
      maxRevenue: '',
      country: 'all',
      source: 'all',
      featured: false,
      forSale: 'all'
    }
    setFilters(resetFilters)
  }

  const hasActiveFilters = 
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.minRevenue !== '' ||
    filters.maxRevenue !== '' ||
    filters.country !== 'all' ||
    filters.source !== 'all' ||
    filters.featured ||
    filters.forSale !== 'all'

  return (
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_#111111] p-6 sticky top-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">filter_list</span>
          <h2 className="font-mono text-lg font-bold uppercase">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-xs font-mono font-bold text-primary hover:text-black uppercase"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block font-mono text-xs font-bold text-black mb-2 uppercase">
            Search
          </label>
          <input
            type="text"
            placeholder="Search startups..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full bg-white border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-mono text-xs font-bold text-black mb-2 uppercase">
            Category
          </label>
          <select 
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full bg-white border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary"
          >
            {categories.map(cat => (
              <option key={cat} value={cat.toLowerCase()}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Revenue Range */}
        <div>
          <label className="block font-mono text-xs font-bold text-black mb-2 uppercase">
            Revenue
          </label>
          <select 
            value={filters.minRevenue || filters.maxRevenue ? `${filters.minRevenue}-${filters.maxRevenue}` : '-'}
            onChange={(e) => {
              const selected = revenueRanges.find(r => `${r.min}-${r.max}` === e.target.value)
              if (selected) {
                handleRevenueChange(selected.min, selected.max)
              }
            }}
            className="w-full bg-white border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary"
          >
            {revenueRanges.map(range => (
              <option key={range.label} value={`${range.min}-${range.max}`}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block font-mono text-xs font-bold text-black mb-2 uppercase">
            Country
          </label>
          <select 
            value={filters.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full bg-white border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary"
          >
            {countries.map(country => (
              <option key={country} value={country.toLowerCase()}>{country}</option>
            ))}
          </select>
        </div>

        {/* Marketplace Source */}
        <div>
          <label className="block font-mono text-xs font-bold text-black mb-2 uppercase flex items-center gap-1">
            Marketplace
            <span className="material-symbols-outlined text-xs cursor-help" title="Filter by acquisition marketplace">
              help
            </span>
          </label>
          <select 
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
            className="w-full bg-white border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary"
          >
            {sources.map(source => (
              <option key={source} value={source.toLowerCase()}>{source}</option>
            ))}
          </select>
          {filters.source !== 'all' && (
            <p className="text-xs text-gray-600 mt-2 font-sans">
              {filters.source === 'trustmrr' && '✓ Verified SaaS businesses'}
              {filters.source === 'acquire.com' && '✓ Diverse online businesses'}
            </p>
          )}
        </div>

        {/* Availability */}
        <div>
          <label className="block font-mono text-xs font-bold text-black mb-2 uppercase">
            Availability
          </label>
          <select 
            value={filters.forSale}
            onChange={(e) => handleChange('forSale', e.target.value)}
            className="w-full bg-white border-2 border-black px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="true">For Sale</option>
            <option value="false">Not For Sale</option>
          </select>
        </div>

        {/* Featured Toggle */}
        <div className="pt-4 border-t-2 border-gray-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={(e) => handleChange('featured', e.target.checked)}
              className="w-5 h-5 border-2 border-black rounded-sm"
            />
            <span className="font-mono text-sm font-bold">Featured Only</span>
          </label>
        </div>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="w-full px-4 py-3 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono text-sm font-bold rounded-sm transition-colors uppercase"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <p className="text-xs text-gray-600 font-sans leading-relaxed">
          <strong>TrustMRR:</strong> Verified SaaS businesses with recurring revenue
          <br/><br/>
          <strong>Acquire.com:</strong> Wide range of online businesses including ecommerce, agencies, and more
        </p>
      </div>
    </div>
  )
}
