'use client'

import { useState } from 'react'

export default function BlogFilterBar() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Latest')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    'All',
    'Funding',
    'Growth',
    'Product',
    'Marketing',
    'Operations',
    'Legal',
    'Founder Stories',
    'Industry Insights'
  ]

  const sortOptions = [
    'Latest',
    'Most Popular',
    'Most Commented',
    'Trending'
  ]

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border-3 border-black rounded-sm font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_#1a1a1a] transition-shadow"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            search
          </span>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 font-mono text-sm font-bold rounded-sm border-2 border-black transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-black shadow-[2px_2px_0px_0px_#1a1a1a]'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Sort and View Options */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-black">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border-2 border-black rounded-sm font-mono text-sm bg-white focus:outline-none focus:shadow-[2px_2px_0px_0px_#1a1a1a]"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          {/* View Toggle */}
          <div className="flex border-2 border-black rounded-sm overflow-hidden">
            <button className="p-2 bg-primary border-r-2 border-black">
              <span className="material-symbols-outlined text-sm">grid_view</span>
            </button>
            <button className="p-2 bg-white hover:bg-gray-100">
              <span className="material-symbols-outlined text-sm">view_list</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Active Filters */}
      {(selectedCategory !== 'All' || searchQuery) && (
        <div className="mt-4 flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-black">Active filters:</span>
          {selectedCategory !== 'All' && (
            <span className="px-3 py-1 bg-primary/20 border-2 border-black rounded-sm font-mono text-xs">
              {selectedCategory}
              <button 
                onClick={() => setSelectedCategory('All')}
                className="ml-2 text-black hover:text-red-600"
              >
                ×
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="px-3 py-1 bg-primary/20 border-2 border-black rounded-sm font-mono text-xs">
              "{searchQuery}"
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-2 text-black hover:text-red-600"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}