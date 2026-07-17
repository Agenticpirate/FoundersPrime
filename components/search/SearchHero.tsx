'use client'

import { useState } from 'react'
import Mandala from '@/components/ui/Mandala'

export default function SearchHero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('all')

  const searchTypes = [
    { value: 'all', label: 'All Content', count: '15,247' },
    { value: 'deals', label: 'Deals', count: '1,247' },
    { value: 'startups', label: 'Startups', count: '12,847' },
    { value: 'ideas', label: 'Ideas', count: '2,847' },
    { value: 'resources', label: 'Resources', count: '1,247' },
    { value: 'blog', label: 'Blog Posts', count: '247' }
  ]

  const popularSearches = [
    'AWS credits', 'Y Combinator', 'SaaS tools', 'Stripe', 'Funding guide',
    'Product validation', 'Marketing automation', 'Cloud hosting', 'Analytics tools'
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search submission

  }

  return (
    <div className="mb-4 md:mb-6">
      {/* Main Search */}
      <div className="relative overflow-hidden bg-white border-2 md:border-[3px] border-black shadow-[4px_4px_0px_0px_#1a1a1a] md:shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-4 md:p-8 mb-4 md:mb-6">
        <Mandala
          variant="radial"
          colorClass="text-gray-900"
          opacity={0.05}
          speed={90}
          className="absolute -top-12 -right-12 w-40 h-40 hidden sm:block"
        />
        <form onSubmit={handleSearch} className="relative space-y-4 md:space-y-6">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search deals, startups, ideas…"
              className="w-full px-4 md:px-6 py-3 md:py-4 pl-11 md:pl-14 pr-24 md:pr-28 border-2 md:border-[3px] border-black rounded-sm font-sans text-sm md:text-lg focus:outline-none focus:shadow-[4px_4px_0px_0px_#1a1a1a] md:focus:shadow-[6px_6px_0px_0px_#1a1a1a] transition-shadow"
            />
            <span className="material-symbols-outlined absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-xl md:text-2xl text-gray-400">
              search
            </span>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 md:px-6 py-1.5 md:py-2 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold text-xs md:text-base rounded-sm transition-all"
            >
              Search
            </button>
          </div>

          {/* Search Type Tabs */}
          <div className="flex gap-2 overflow-x-auto mobile-scroll-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
            {searchTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setSearchType(type.value)}
                className={`flex-shrink-0 px-3 md:px-4 py-1.5 md:py-2 font-mono text-xs md:text-sm font-bold rounded-sm border-2 border-black transition-all whitespace-nowrap ${
                  searchType === type.value
                    ? 'bg-primary text-black shadow-[2px_2px_0px_0px_#1a1a1a]'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {type.label}
                <span className="ml-1.5 md:ml-2 text-[10px] md:text-xs opacity-70">({type.count})</span>
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Popular Searches */}
      <div className="bg-gray-50 border-2 border-black rounded-sm p-4 md:p-6">
        <h3 className="font-mono text-base md:text-lg font-bold text-black mb-3 md:mb-4">
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => setSearchQuery(search)}
              className="px-2.5 md:px-3 py-1 bg-white hover:bg-primary/20 border-2 border-black rounded-sm font-mono text-xs md:text-sm transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Search Stats */}
      <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white border-2 border-black rounded-sm p-3 md:p-4 text-center">
          <div className="font-mono text-lg md:text-xl font-bold text-primary mb-0.5 md:mb-1">15,247</div>
          <div className="font-sans text-xs md:text-sm text-gray-600">Total Items</div>
        </div>
        <div className="bg-white border-2 border-black rounded-sm p-3 md:p-4 text-center">
          <div className="font-mono text-lg md:text-xl font-bold text-primary mb-0.5 md:mb-1">50K+</div>
          <div className="font-sans text-xs md:text-sm text-gray-600">Monthly Searches</div>
        </div>
        <div className="bg-white border-2 border-black rounded-sm p-3 md:p-4 text-center">
          <div className="font-mono text-lg md:text-xl font-bold text-primary mb-0.5 md:mb-1">&lt;0.2s</div>
          <div className="font-sans text-xs md:text-sm text-gray-600">Avg Search Time</div>
        </div>
        <div className="bg-white border-2 border-black rounded-sm p-3 md:p-4 text-center">
          <div className="font-mono text-lg md:text-xl font-bold text-primary mb-0.5 md:mb-1">99.8%</div>
          <div className="font-sans text-xs md:text-sm text-gray-600">Search Accuracy</div>
        </div>
      </div>
    </div>
  )
}