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

// Logo component with fallback chain
function GrantLogo({ grant }: { grant: Grant }) {
  const [fallbackIndex, setFallbackIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  let domain = ''
  try {
    domain = new URL(grant.website).hostname.replace('www.', '')
  } catch {}

  const fallbackChain = [
    grant.logo,
    domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null,
    domain ? `https://logo.clearbit.com/${domain}` : null,
  ].filter(Boolean) as string[]

  if (fallbackChain.length === 0) {
    fallbackChain.push(`https://ui-avatars.com/api/?name=${encodeURIComponent(grant.organization)}&background=f3f4f6&color=374151&bold=true&size=128`)
  }

  const handleError = () => {
    const nextIndex = fallbackIndex + 1
    if (nextIndex < fallbackChain.length) {
      setFallbackIndex(nextIndex)
      setLoaded(false)
    } else {
      setFailed(true)
    }
  }

  useEffect(() => {
    setFallbackIndex(0)
    setLoaded(false)
    setFailed(false)
  }, [grant.id])

  if (failed) {
    return (
      <span className="text-xs font-black font-mono text-gray-400">
        {grant.organization.substring(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={fallbackChain[fallbackIndex]}
      alt=""
      className={`w-full h-full object-contain transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={() => setLoaded(true)}
      onError={handleError}
    />
  )
}

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
    if (pageParam && selectedRegion === 'All' && selectedType === 'All' && searchQuery === '') {
      setLocalPage(Number(pageParam) || 1)
    } else {
      setLocalPage(1)
    }
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

  const getStatusColor = (status: Grant['applicationStatus']) => {
    switch (status) {
      case 'Active': return 'bg-green-600 text-white'
      case 'Rolling': return 'bg-blue-600 text-white'
      case 'Closed': return 'bg-gray-600 text-white'
      case 'Opening Soon': return 'bg-yellow-600 text-white'
      default: return 'bg-gray-600 text-white'
    }
  }

  const getTypeColor = (type: Grant['type']) => {
    switch (type) {
      case 'Government': return 'bg-blue-600 text-white'
      case 'Corporate': return 'bg-purple-600 text-white'
      case 'Foundation': return 'bg-yellow-600 text-white'
      case 'Competition': return 'bg-red-600 text-white'
      case 'State/Regional': return 'bg-green-600 text-white'
      default: return 'bg-gray-600 text-white'
    }
  }

  // Reset page when filters change
  const handleFilterChange = (setter: (val: string) => void, val: string) => {
    setter(val)
    handlePageChange(1)
  }

  return (
    <div className="space-y-3 md:space-y-6">
      {/* ─── Premium Toolbar ─── */}
      <div className="relative bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm overflow-hidden">
        {/* Decorative mandala */}
        <div className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.05]" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-700 grants-toolbar-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
            <circle cx="100" cy="100" r="40" />
            <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
            <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <line x1="100" y1="40" x2="100" y2="20" />
                <circle cx="100" cy="20" r="2" fill="currentColor" />
              </g>
            ))}
            <circle cx="100" cy="100" r="3" fill="currentColor" />
          </svg>
        </div>

        <div className="relative p-3 md:p-4">
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b-2 border-black border-dashed">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-emerald-100 border-2 border-black rounded-sm shadow-[1px_1px_0px_#111] flex-shrink-0">
                <span className="material-symbols-outlined !text-[14px] text-emerald-700">payments</span>
              </span>
              <div className="min-w-0">
                <h2 className="font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.06em] text-black leading-none truncate">
                  Grant Programs
                </h2>
                <p className="font-mono text-[10px] text-gray-500 mt-1 leading-none flex items-center gap-1.5">
                  <span className="font-bold text-black tabular-nums">{filteredGrants.length}</span>
                  <span className="text-gray-400">·</span>
                  {filteredGrants.length > 0 ? (
                    <span>showing {startIndex + 1}&ndash;{Math.min(endIndex, filteredGrants.length)}</span>
                  ) : (
                    <span>verified &amp; deadline-tracked</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Search row */}
          <div className="mb-3">
            <div className="relative w-full">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <span className="material-symbols-outlined !text-[16px] text-gray-400">search</span>
              </div>
              <input
                type="text"
                placeholder="Search by grant, organization, or category..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  handlePageChange(1)
                }}
                className="w-full pl-10 pr-10 py-2.5 font-mono text-[12.5px] bg-white border-2 border-black rounded-sm outline-none transition-all duration-200 placeholder:text-gray-400 shadow-[2px_2px_0px_#111] focus:shadow-[3px_3px_0px_#FFD500] focus:translate-x-[-1px] focus:translate-y-[-1px]"
                aria-label="Search grants"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); handlePageChange(1) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-sm border border-black bg-white hover:bg-accent-yellow transition-colors"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined !text-[12px] text-black">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Region + Type dropdowns */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">Region</span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => handleFilterChange(setSelectedRegion, e.target.value)}
                  className="w-full appearance-none px-3 py-2 pr-9 font-mono text-[11px] font-bold bg-white border-2 border-black rounded-sm focus:outline-none focus:shadow-[3px_3px_0px_#FFD500] hover:shadow-[2px_2px_0px_#111] transition-all cursor-pointer"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined !text-[16px] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">expand_more</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">Type</span>
                <span className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => handleFilterChange(setSelectedType, e.target.value)}
                  className="w-full appearance-none px-3 py-2 pr-9 font-mono text-[11px] font-bold bg-white border-2 border-black rounded-sm focus:outline-none focus:shadow-[3px_3px_0px_#FFD500] hover:shadow-[2px_2px_0px_#111] transition-all cursor-pointer"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined !text-[16px] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">expand_more</span>
              </div>
            </div>
          </div>

          {/* Active filters chip row */}
          {(selectedRegion !== 'All' || selectedType !== 'All' || searchQuery !== '') && (
            <div className="mt-3 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">Active</span>
                {selectedRegion !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-yellow border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider">
                    {selectedRegion}
                  </span>
                )}
                {selectedType !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-yellow border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider">
                    {selectedType}
                  </span>
                )}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider max-w-[180px] truncate">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedRegion('All')
                  setSelectedType('All')
                  setSearchQuery('')
                  handlePageChange(1)
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider bg-white border-2 border-black rounded-sm shadow-[1px_1px_0px_#111] hover:bg-black hover:text-white transition-all"
                aria-label="Clear all filters"
              >
                <span className="material-symbols-outlined !text-[12px]">close</span>
                Clear all
              </button>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes grantsToolbarMandalaSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          :global(.grants-toolbar-mandala-spin) {
            animation: grantsToolbarMandalaSpin 110s linear infinite;
            transform-origin: center;
          }
          @media (prefers-reduced-motion: reduce) {
            :global(.grants-toolbar-mandala-spin) { animation: none; }
          }
        `}</style>
      </div>

      {/* Grants Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {(isPro ? currentGrants : currentGrants.slice(0, 3)).map((grant) => (
          <Link
            key={grant.id}
            href={isPro ? `/deals/${grant.slug}` : '/pricing'}
            className="flex flex-col bg-white border-2 border-black shadow-[2px_2px_0px_#111] hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all duration-200 overflow-hidden group h-full"
          >
            {/* Status */}
            <div className="px-3 pt-2.5">
              <span className={`inline-block px-1.5 py-0.5 ${getStatusColor(grant.applicationStatus)} text-[8px] font-bold uppercase tracking-wider`}>
                {grant.applicationStatus}
              </span>
            </div>

            {/* Logo + Title */}
            <div className="flex items-center gap-2 px-3 pt-2 pb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 border border-gray-200 flex items-center justify-center p-1 flex-shrink-0 rounded-sm overflow-hidden">
                <GrantLogo grant={grant} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[11px] md:text-sm font-bold text-gray-900 leading-snug group-hover:text-black transition-colors line-clamp-2">
                  {grant.name.length > 40 ? grant.name.substring(0, 40) + '…' : grant.name}
                </h3>
                <p className="text-[9px] text-gray-400 font-mono truncate mt-0.5">{grant.organization}</p>
              </div>
            </div>

            {/* Description */}
            <div className="px-3 pb-2 flex-grow">
              <p className="text-[10px] md:text-xs text-gray-500 leading-snug line-clamp-2">{grant.description}</p>
            </div>

            {/* Value — pinned bottom */}
            <div className="px-3 pb-3 mt-auto border-t border-gray-100 pt-2">
              <p className="text-xs md:text-sm font-bold text-green-600 font-mono line-clamp-1">{grant.fundingAmount}</p>
              <p className="text-[9px] text-gray-400">{grant.equity}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pro Gate Overlay */}
      {!isPro && filteredGrants.length > 3 && (
        <ProGateOverlay
          totalCount={filteredGrants.length}
          visibleCount={3}
          label="Grants"
        >
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {filteredGrants.slice(3, 9).map((grant) => (
              <div key={grant.id} className="flex flex-col bg-white border-2 border-black overflow-hidden p-2.5 md:p-4 gap-1.5" tabIndex={-1}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 border border-gray-200 flex items-center justify-center p-1 flex-shrink-0 rounded-sm overflow-hidden">
                    <GrantLogo grant={grant} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] md:text-sm font-bold text-gray-900 line-clamp-2">{grant.name}</p>
                    <p className="text-[9px] text-gray-400">{grant.organization}</p>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-gray-500 line-clamp-2">{grant.description}</p>
                <p className="text-xs font-bold text-green-600 font-mono mt-auto">{grant.fundingAmount}</p>
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
          <button
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