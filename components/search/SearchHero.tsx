'use client'

import { useState } from 'react'

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
    console.log('Searching for:', searchQuery, 'in:', searchType)
  }

  return (
    <div className="mb-6 md:mb-4 md:mb-6">
      {/* Main Search */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 mb-4 md:mb-6">
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for deals, startups, ideas, resources, or blog posts..."
              className="w-full px-6 py-4 pl-14 border-3 border-black rounded-sm font-sans text-lg focus:outline-none focus:shadow-[6px_6px_0px_0px_#1a1a1a] transition-shadow"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">
              search
            </span>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary hover:bg-black hover:text-white border-2 border-black text-black font-mono font-bold rounded-sm transition-all"
            >
              Search
            </button>
          </div>
          
          {/* Search Type Tabs */}
          <div className="flex flex-wrap gap-2">
            {searchTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setSearchType(type.value)}
                className={`px-4 py-2 font-mono text-sm font-bold rounded-sm border-2 border-black transition-all ${
                  searchType === type.value
                    ? 'bg-primary text-black shadow-[2px_2px_0px_0px_#1a1a1a]'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {type.label}
                <span className="ml-2 text-xs opacity-70">({type.count})</span>
              </button>
            ))}
          </div>
        </form>
      </div>
      
      {/* Popular Searches */}
      <div className="bg-gray-50 border-2 border-black rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => setSearchQuery(search)}
              className="px-3 py-1 bg-white hover:bg-primary/20 border-2 border-black rounded-sm font-mono text-sm transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
      
      {/* Search Stats */}
      <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-black rounded-sm p-4 text-center">
          <div className="font-mono text-xl font-bold text-primary mb-1">15,247</div>
          <div className="font-sans text-sm text-gray-600">Total Items</div>
        </div>
        <div className="bg-white border-2 border-black rounded-sm p-4 text-center">
          <div className="font-mono text-xl font-bold text-primary mb-1">50K+</div>
          <div className="font-sans text-sm text-gray-600">Monthly Searches</div>
        </div>
        <div className="bg-white border-2 border-black rounded-sm p-4 text-center">
          <div className="font-mono text-xl font-bold text-primary mb-1">&lt;0.2s</div>
          <div className="font-sans text-sm text-gray-600">Average Search Time</div>
        </div>
        <div className="bg-white border-2 border-black rounded-sm p-4 text-center">
          <div className="font-mono text-xl font-bold text-primary mb-1">99.8%</div>
          <div className="font-sans text-sm text-gray-600">Search Accuracy</div>
        </div>
      </div>
    </div>
  )
}