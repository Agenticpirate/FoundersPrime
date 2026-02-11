'use client'

import { useState, useEffect } from 'react'
import StartupCard from './StartupCard'

interface Startup {
  id: string
  slug: string
  name: string
  category: string
  description: string
  shortDescription: string
  revenue: number
  revenueDisplay: string
  profit: number
  profitDisplay: string
  askingPrice: number
  askingPriceDisplay: string
  country: string
  founded: string
  logoUrl: string
  featured: boolean
  forSale: boolean
  source: string
  sourceUrl: string
  teamSize: string
}

interface StartupsGridProps {
  filters: {
    search: string
    category: string
    minRevenue: string
    maxRevenue: string
    country: string
    source: string
    featured: boolean
    forSale: string
  }
}

export default function StartupsGrid({ filters }: StartupsGridProps) {
  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const startupsPerPage = 12

  useEffect(() => {
    const fetchStartups = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filters.search) params.append('search', filters.search)
        if (filters.category !== 'all') params.append('category', filters.category)
        if (filters.minRevenue) params.append('minRevenue', filters.minRevenue)
        if (filters.maxRevenue) params.append('maxRevenue', filters.maxRevenue)
        if (filters.country !== 'all') params.append('country', filters.country)
        if (filters.source !== 'all') params.append('source', filters.source)
        if (filters.forSale !== 'all') params.append('forSale', filters.forSale)
        if (filters.featured) params.append('featured', 'true')

        const response = await fetch(`/api/startups?${params}`)
        const data = await response.json()
        
        if (data.success) {
          setStartups(data.startups)
        }
      } catch (error) {
        console.error('Error fetching startups:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStartups()
    setCurrentPage(1)
  }, [filters])

  const totalPages = Math.ceil(startups.length / startupsPerPage)
  const startIndex = (currentPage - 1) * startupsPerPage
  const currentStartups = startups.slice(startIndex, startIndex + startupsPerPage)

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-primary"></div>
        <p className="mt-4 font-mono text-lg">Loading verified startups...</p>
      </div>
    )
  }

  if (startups.length === 0) {
    return (
      <div className="text-center py-12 bg-white border-3 border-black p-8">
        <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">search_off</span>
        <h3 className="font-mono text-xl font-bold mb-2">No startups found</h3>
        <p className="font-mono text-gray-600">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="font-mono text-2xl font-bold">Showing {startups.length} startups</h2>
          <span className="bg-gray-200 px-2 py-1 font-mono text-xs rounded-sm border border-black">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Startups Grid */}
      <div className="space-y-6">
        {currentStartups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border-2 border-black font-mono text-sm rounded-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 border-2 border-black font-mono text-sm rounded-sm ${
                  currentPage === pageNum 
                    ? 'bg-black text-white' 
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
          
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="px-2 font-mono text-sm">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-4 py-2 bg-white border-2 border-black font-mono text-sm rounded-sm hover:bg-gray-100"
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border-2 border-black font-mono text-sm rounded-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}