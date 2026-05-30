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
 {/* ─── Premium Toolbar ─── */}
 <div className="relative bg-white border-2 border-black shadow-[3px_3px_0px_#111] rounded-sm overflow-hidden mb-4">
 {/* Decorative mandala */}
 <div className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.05]" aria-hidden="true">
 <svg viewBox="0 0 200 200" className="w-full h-full text-orange-700 accel-toolbar-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
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
 {/* Header row — title + count + view toggle */}
 <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b-2 border-black border-dashed">
 <div className="flex items-center gap-2.5 min-w-0">
 <span className="inline-flex items-center justify-center w-7 h-7 bg-orange-100 border-2 border-black rounded-sm shadow-[1px_1px_0px_#111] flex-shrink-0">
 <span className="material-symbols-outlined !text-[14px] text-orange-700">rocket_launch</span>
 </span>
 <div className="min-w-0">
 <h2 className="font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.06em] text-black leading-none truncate">
 Top Programs
 </h2>
 <p className="font-mono text-[10px] text-gray-500 mt-1 leading-none flex items-center gap-1.5">
 <span className="font-bold text-black tabular-nums">{filteredAndSearchedDeals.length}</span>
 <span className="text-gray-400">·</span>
 Verified terms &amp; deadlines
 </p>
 </div>
 </div>
 <ViewToggle onViewChange={setViewMode} />
 </div>

 {/* Search row */}
 <div className="mb-3">
 <AcceleratorsSearch onSearch={handleSearch} />
 </div>

 {/* Filter + Sort row */}
 <div className="flex flex-col md:flex-row md:items-end gap-2.5 md:gap-3">
 {/* Region pills */}
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-1.5 mb-1.5">
 <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">
 Region
 </span>
 <span className="h-px flex-1 bg-gray-200" />
 </div>
 <div className="flex gap-1.5 overflow-x-auto mobile-scroll-hide pb-0.5">
 {regions.map((region) => {
 const active = filterRegion === region
 return (
 <button
 key={region}
 onClick={() => setFilterRegion(region)}
 className={`px-2.5 py-1 font-mono text-[10.5px] font-black uppercase tracking-wider border-2 border-black rounded-sm whitespace-nowrap flex-shrink-0 transition-all ${
 active
 ? 'bg-black text-accent-yellow shadow-[2px_2px_0px_#FFD500]'
 : 'bg-white text-black hover:bg-gray-50 hover:shadow-[2px_2px_0px_#111] hover:-translate-x-px hover:-translate-y-px'
 }`}
 aria-pressed={active}
 >
 {region}
 </button>
 )
 })}
 </div>
 </div>

 {/* Sort dropdown */}
 <div className="md:w-52 flex-shrink-0">
 <div className="flex items-center gap-1.5 mb-1.5">
 <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">
 Sort
 </span>
 <span className="h-px flex-1 bg-gray-200" />
 </div>
 <div className="relative">
 <select
 id="sort-select"
 value={sortBy}
 onChange={(e) => setSortBy(e.target.value as SortOption)}
 className="w-full appearance-none px-3 py-2 pr-9 font-mono text-[11px] font-bold bg-white border-2 border-black rounded-sm focus:outline-none focus:shadow-[3px_3px_0px_#FFD500] hover:shadow-[2px_2px_0px_#111] transition-all cursor-pointer"
 aria-label="Sort accelerators"
 >
 <option value="name">Name (A&ndash;Z)</option>
 <option value="investment">Investment · High to Low</option>
 <option value="equity">Equity · Low to High</option>
 <option value="deadline">Application Status</option>
 </select>
 <span className="material-symbols-outlined !text-[16px] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
 expand_more
 </span>
 </div>
 </div>
 </div>

 {/* Active filters chip row */}
 {hasActiveFilters && (
 <div className="mt-3 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between gap-2 flex-wrap">
 <div className="flex items-center gap-1.5 flex-wrap">
 <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-gray-500">
 Active
 </span>
 {filterRegion !== 'All' && (
 <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-yellow border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider">
 {filterRegion}
 </span>
 )}
 {searchQuery.trim() && (
 <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider max-w-[200px] truncate">
 &ldquo;{searchQuery}&rdquo;
 </span>
 )}
 {sortBy !== 'name' && (
 <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border-2 border-black rounded-sm font-mono text-[10px] font-black uppercase tracking-wider">
 {sortBy}
 </span>
 )}
 </div>
 <button
 onClick={handleClearFilters}
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
 @keyframes accelToolbarMandalaSpin {
 from { transform: rotate(0deg); }
 to { transform: rotate(360deg); }
 }
 :global(.accel-toolbar-mandala-spin) {
 animation: accelToolbarMandalaSpin 110s linear infinite;
 transform-origin: center;
 }
 @media (prefers-reduced-motion: reduce) {
 :global(.accel-toolbar-mandala-spin) { animation: none; }
 }
 `}</style>
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