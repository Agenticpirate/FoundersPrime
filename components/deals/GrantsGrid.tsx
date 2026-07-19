// @ts-nocheck
'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { grants2026, Grant } from '@/data/grants-2026'
import Link from 'next/link'
import Pagination from '@/components/Pagination'
import { useAuth } from '@/lib/auth/hooks'
import { checkProStatus } from '@/lib/auth/user-context'
import ProGateOverlay from '@/components/ProGateOverlay'
import { StaggerGrid, StaggerGridItem } from '@/components/ui/premium-motion'
import { GrantCard, GrantLogo } from './GrantCard'
import GrantsToolbar from './GrantsToolbar'

export default function GrantsGrid({ defaultRegion = 'All' }: { defaultRegion?: string }) {
  const { user } = useAuth()
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const { isPro: hasProAccess } = await checkProStatus()
        setIsPro(hasProAccess)
      } else {
        setIsPro(false)
      }
    }
    checkAccess()
  }, [user])

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [selectedRegion, setSelectedRegion] = useState<string>(defaultRegion)
  const [selectedType, setSelectedType] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Get unique regions and types
  const regions = ['All', ...Array.from(new Set(grants2026.map(g => g.region)))]
  const types = ['All', ...Array.from(new Set(grants2026.map(g => g.type)))]

  // Filter grants
  const filteredGrants = useMemo(() => {
    return grants2026.filter(grant => {
      const matchesRegion = selectedRegion === 'All' || grant.region === selectedRegion
      const matchesType = selectedType === 'All' || grant.type === selectedType
      const matchesSearch = searchQuery === '' ||
        grant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.category.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesRegion && matchesType && matchesSearch
    })
  }, [selectedRegion, selectedType, searchQuery])

  // Local Fast Pagination Logic
  const [localPage, setLocalPage] = useState(1)

  useEffect(() => {
    const pageParam = searchParams.get('page')
    const next =
      pageParam && selectedRegion === 'All' && selectedType === 'All' && searchQuery === ''
        ? Number(pageParam) || 1
        : 1
    setLocalPage(next)
  }, [selectedRegion, selectedType, searchQuery, searchParams])

  const itemsPerPage = 9
  const totalPages = Math.ceil(filteredGrants.length / itemsPerPage) || 1
  const currentPage = Math.min(Math.max(1, localPage), totalPages)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentGrants = filteredGrants.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setLocalPage(page)
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    window.history.replaceState(null, '', pathname + '?' + params.toString())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reset page when filters change
  const handleFilterChange = (setter: (val: string) => void, val: string) => {
    setter(val)
    handlePageChange(1)
  }

  return (
    <div className="space-y-3 md:space-y-6">
      <GrantsToolbar
        regions={regions}
        types={types}
        selectedRegion={selectedRegion}
        selectedType={selectedType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredCount={filteredGrants.length}
        startIndex={startIndex}
        endIndex={endIndex}
        handleFilterChange={handleFilterChange}
        setSelectedRegion={setSelectedRegion}
        setSelectedType={setSelectedType}
        handlePageChange={handlePageChange}
      />

      {/* Grants Grid */}
      <StaggerGrid
        animKey={`${currentPage}-${selectedRegion}-${selectedType}-${searchQuery}`}
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4"
      >
        {(isPro ? currentGrants : currentGrants.slice(0, 3)).map((grant) => (
          <StaggerGridItem key={grant.id}>
            <GrantCard grant={grant} isPro={isPro} />
          </StaggerGridItem>
        ))}
      </StaggerGrid>

      {/* Pro Gate Overlay */}
      {!isPro && filteredGrants.length > 3 && (
        <ProGateOverlay
          totalCount={filteredGrants.length}
          visibleCount={3}
          label="Grants"
        >
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {filteredGrants.slice(3, 9).map((grant) => (
              <div key={grant.id} className="flex flex-col bg-white border-2 border-black overflow-visible p-2.5 md:p-4 gap-1.5" tabIndex={-1}>
                <div className="flex items-center gap-2">
                  <GrantLogo grant={grant} />
                  <div className="min-w-0">
                    <p className="text-[11px] md:text-sm font-bold text-gray-900 line-clamp-2">{grant.name}</p>
                    <p className="text-[9px] text-gray-400">{grant.organization}</p>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-gray-500 line-clamp-2">{grant.description}</p>
                <p className="text-xs font-bold text-amber-700 font-mono mt-auto">{grant.fundingAmount}</p>
              </div>
            ))}
          </div>
        </ProGateOverlay>
      )}

      {filteredGrants.length === 0 && (
        <div className="neo-card bg-white p-12 text-center">
          <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
          <h3 className="text-2xl font-bold mb-2">No grants found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
          <button type="button"
            onClick={() => {
              setSelectedRegion('All')
              setSelectedType('All')
              setSearchQuery('')
              handlePageChange(1)
            }}
            className="neo-button bg-primary text-white px-6 py-2"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {isPro && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
