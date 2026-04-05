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
    domain ? `https://logo.clearbit.com/${domain}` : null,
    domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null,
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

export default function GrantsGrid() {
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

  const [selectedRegion, setSelectedRegion] = useState<string>('All')
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
    <div className="space-y-8">
      {/* Filters */}
      <div className="neo-card bg-white p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-xs font-mono font-bold text-gray-600 mb-2">SEARCH</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input
                type="text"
                placeholder="Search grants..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  handlePageChange(1)
                }}
                className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Region Filter */}
          <div className="lg:w-48">
            <label className="block text-xs font-mono font-bold text-gray-600 mb-2">REGION</label>
            <select
              value={selectedRegion}
              onChange={(e) => handleFilterChange(setSelectedRegion, e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="lg:w-48">
            <label className="block text-xs font-mono font-bold text-gray-600 mb-2">TYPE</label>
            <select
              value={selectedType}
              onChange={(e) => handleFilterChange(setSelectedType, e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t-2 border-gray-200 pt-4">
          <div className="text-sm font-mono">
            <span className="font-bold">{filteredGrants.length}</span> grants found
            {filteredGrants.length > 0 && (
              <span className="text-gray-500 ml-2">
                (Showing {startIndex + 1}-{Math.min(endIndex, filteredGrants.length)})
              </span>
            )}
          </div>
          {(selectedRegion !== 'All' || selectedType !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedRegion('All')
                setSelectedType('All')
                setSearchQuery('')
                handlePageChange(1)
              }}
              className="text-sm font-mono font-bold text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(isPro ? currentGrants : currentGrants.slice(0, 3)).map((grant) => (
          <Link
            key={grant.id}
            href={isPro ? `/deals/${grant.slug}` : '/pricing'}
            className="flex flex-col bg-white border-2 border-black shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all duration-200 overflow-hidden group h-full"
          >
            {/* Status */}
            <div className="px-4 pt-3">
              <span className={`inline-block px-2 py-0.5 ${getStatusColor(grant.applicationStatus)} text-[9px] font-bold uppercase tracking-wider`}>
                {grant.applicationStatus}
              </span>
            </div>

            {/* Logo + Title */}
            <div className="flex items-center gap-3 px-4 pt-3 pb-3">
              <div className="w-12 h-12 bg-gray-50 border-2 border-gray-200 flex items-center justify-center p-1.5 flex-shrink-0 rounded-sm overflow-hidden">
                <GrantLogo grant={grant} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-black transition-colors line-clamp-2">
                  {grant.name.length > 45 ? grant.name.substring(0, 45) + '…' : grant.name}
                </h3>
                <p className="text-[11px] text-gray-400 font-mono truncate mt-0.5">{grant.organization}</p>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 pb-3 flex-grow">
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{grant.description}</p>
            </div>

            {/* Value — pinned bottom */}
            <div className="px-4 pb-4 mt-auto border-t border-gray-100 pt-3">
              <p className="text-base font-bold text-green-600 font-mono">{grant.fundingAmount}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{grant.equity}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGrants.slice(3, 9).map((grant) => (
              <div key={grant.id} className="flex flex-col bg-white border-2 border-black overflow-hidden p-4 gap-2" tabIndex={-1}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-50 border-2 border-gray-200 flex items-center justify-center p-1.5 flex-shrink-0 rounded-sm overflow-hidden">
                    <GrantLogo grant={grant} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 line-clamp-2">{grant.name}</p>
                    <p className="text-[11px] text-gray-400">{grant.organization}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 line-clamp-3">{grant.description}</p>
                <p className="text-base font-bold text-green-600 font-mono mt-auto">{grant.fundingAmount}</p>
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