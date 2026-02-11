'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import StartupsGrid from './StartupsGrid'
import StartupsFilterBar from './StartupsFilterBar'

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

export default function StartupsContent() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    minRevenue: '',
    maxRevenue: '',
    country: 'all',
    source: 'all',
    featured: false,
    forSale: 'all'
  })

  const [stats] = useState({
    total: 1150,
    categories: 15,
    countries: 50
  })

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 lg:py-6">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 text-sm font-bold uppercase tracking-wide mb-8">
        <Link className="text-black/60 hover:text-primary hover:underline decoration-2" href="/">Home</Link>
        <span className="text-black/60">/</span>
        <span className="text-black">Startups</span>
      </div>

      {/* Page Heading & Description */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-end border-b-3 border-black pb-8 mb-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9]">
            Verified Startups <br />
            <span className="text-primary" style={{ WebkitTextStroke: '1px #111' }}>Database</span>
          </h1>
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-xl">
            Browse 1,150+ verified startups for acquisition. Real revenue, real metrics, real opportunities from TrustMRR and Acquire.com. Find your next acquisition target.
          </p>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 border-3 border-black bg-white shadow-[6px_6px_0px_#111111] mb-10">
        <div className="p-6 flex flex-col gap-1 items-start md:border-r-3 border-black">
          <span className="text-xs font-bold uppercase tracking-widest text-black/60">Verified Startups</span>
          <span className="text-3xl font-black">{stats.total}</span>
        </div>
        <div className="p-6 flex flex-col gap-1 items-start md:border-r-3 border-black border-t-3 md:border-t-0">
          <span className="text-xs font-bold uppercase tracking-widest text-black/60">Total Value</span>
          <span className="text-3xl font-black text-primary">$2.5B+</span>
        </div>
        <div className="p-6 flex flex-col gap-1 items-start md:border-r-3 border-black border-t-3 lg:border-t-0">
          <span className="text-xs font-bold uppercase tracking-widest text-black/60">Categories</span>
          <span className="text-3xl font-black">{stats.categories}</span>
        </div>
        <div className="p-6 flex flex-col gap-1 items-start border-t-3 lg:border-t-0">
          <span className="text-xs font-bold uppercase tracking-widest text-black/60">Updated</span>
          <span className="text-3xl font-black flex items-center gap-2">
            Daily <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-black inline-block"></span>
          </span>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-[280px] flex-shrink-0">
          <StartupsFilterBar onFilterChange={handleFilterChange} currentFilters={filters} />
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          <StartupsGrid filters={filters} />
        </div>
      </div>
    </div>
  )
}
