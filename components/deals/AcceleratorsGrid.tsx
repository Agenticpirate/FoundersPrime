'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import DealCard from './DealCard'
import AcceleratorsSearch from './AcceleratorsSearch'
import ViewToggle, { ViewMode } from './ViewToggle'
import { accelerators2026, Accelerator } from '@/data/accelerators-2026'
import { useAuth } from '@/lib/auth/hooks'
import { checkProStatus } from '@/lib/auth/user-context'
import ProGateOverlay from '@/components/ProGateOverlay'

type SortOption = 'name' | 'investment' | 'deadline' | 'equity'

export default function AcceleratorsGrid() {
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
 provider: acc.name,
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
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 border-b-2 border-black pb-2">
 <div className="flex-1">
 <h2 className="font-mono text-lg md:text-2xl font-bold text-black">Top Programs</h2>
 <span className="font-mono text-[10px] md:text-xs text-gray-500 mt-0.5 block">
 Verified terms and deadlines
 </span>
 </div>
 <ViewToggle onViewChange={setViewMode} />
 </div>

 {/* Search Bar */}
 <div className="mb-6">
 <AcceleratorsSearch onSearch={handleSearch} />
 </div>

 {/* Filters and Sorting */}
 <div className="flex flex-col gap-3 mb-4 md:mb-6">
 {/* Region Filters - always horizontal scroll */}
 <div className="flex gap-1.5 overflow-x-auto mobile-scroll-hide pb-0.5">
 {regions.map(region => (
 <button
 key={region}
 onClick={() => setFilterRegion(region)}
 className={`px-2 py-0.5 font-mono text-[10px] border border-black rounded-sm whitespace-nowrap transition-all flex-shrink-0 ${filterRegion === region
 ? 'bg-black text-white'
 : 'bg-white text-black hover:bg-gray-100'
 }`}
 aria-pressed={filterRegion === region}
 >
 {region}
 </button>
 ))}
 </div>

 {/* Sort */}
 <select
 id="sort-select"
 value={sortBy}
 onChange={(e) => setSortBy(e.target.value as SortOption)}
 className="w-full md:w-48 px-2 py-1.5 font-mono text-xs bg-white border-2 border-black rounded-sm focus:outline-none"
 aria-label="Sort accelerators"
 >
 <option value="name">Name (A-Z)</option>
 <option value="investment">Investment (High to Low)</option>
 <option value="equity">Equity (Low to High)</option>
 <option value="deadline">Application Status</option>
 </select>
 </div>

 {/* Results Count and Clear Filters */}
 <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-dashed border-gray-300">
 <div className="font-mono text-[10px] md:text-xs text-gray-600">
 <span className="font-bold text-black">{filteredAndSearchedDeals.length}</span> programs
 </div>
 {hasActiveFilters && (
 <button
 onClick={handleClearFilters}
 className="px-2 py-0.5 font-mono text-[10px] font-bold bg-white border border-black rounded-sm hover:bg-gray-100 flex items-center gap-0.5"
 aria-label="Clear all filters"
 >
 <span className="material-symbols-outlined text-[10px]">close</span>
 Clear
 </button>
 )}
 </div>

 {/* Grid/List View */}
 {filteredAndSearchedDeals.length > 0 ? (
 <div>
 {/* Always-visible cards (first 3 for free users, all for pro) */}
 <div
 className={
 viewMode === 'grid'
 ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4'
 : 'flex flex-col gap-4'
 }
 >
 {(isPro ? filteredAndSearchedDeals : filteredAndSearchedDeals.slice(0, 3)).map((acc) => (
 <DealCard
 key={acc.id}
 deal={convertToCard(acc)}
 overrideHref={isPro ? undefined : '/pricing'}
 />
 ))}
 </div>

 {/* Pro Gate — real cards blurred behind glass */}
 {!isPro && filteredAndSearchedDeals.length > 3 && (
 <ProGateOverlay
 totalCount={filteredAndSearchedDeals.length}
 visibleCount={3}
 label="Accelerators"
 >
 <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
 {filteredAndSearchedDeals.slice(3, 9).map((acc) => (
 <DealCard key={acc.id} deal={convertToCard(acc)} />
 ))}
 </div>
 </ProGateOverlay>
 )}
 </div>
 ) : (
 <div className="text-center py-8 md:py-6 md:py-8 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm">
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