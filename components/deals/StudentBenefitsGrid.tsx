'use client'

import React, { useState, useMemo } from 'react'
import DealCard from './DealCard'
import Pagination from '@/components/Pagination'
import { studentBenefits2026, StudentBenefit } from '@/data/student-benefits-2026'
import type { StudentBenefitType } from './StudentBenefitsSidebar'
import type { StudentBenefitsFilterState } from './StudentBenefitsFilterBar'
import FeaturedSlot from './featured/FeaturedSlot'

// Logo helper - uses Google Favicons (fast, reliable)
const getLogo = (benefit: StudentBenefit) => {
  if (benefit.logo) return benefit.logo
  try {
    const domain = new URL(benefit.url).hostname.replace('www.', '')
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  } catch (e) {
    const cleaned = benefit.company.toLowerCase().replace(/[^a-z0-9]/g, '')
    return `https://www.google.com/s2/favicons?domain=${cleaned}.com&sz=128`
  }
}

// Map to DealCard props
const convertToCard = (benefit: StudentBenefit, idx: number) => {
  const isFree = benefit.benefitType === 'Free' || benefit.appCategory === 'Software & Tools'
  return {
    id: benefit.slug || `${benefit.company}-${idx}`,
    logo: getLogo(benefit),
    category: benefit.category,
    badge: isFree ? 'Free Forever' : benefit.benefitType,
    badgeColor: isFree ? 'bg-green-500' : 'bg-blue-500',
    title: benefit.title,
    provider: benefit.company,
    value: benefit.value === 'N/A' || benefit.value === 'Free' ? 'Free' : benefit.value,
    valueSubtext: benefit.benefitType,
    valueStyle: 'bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white/15',
    description: benefit.offerSummary,
    eligibility: benefit.eligibility,
    // Link to internal detail page if slug exists, otherwise external URL
    applicationUrl: benefit.slug ? undefined : benefit.url,
    verified: true,
  }
}

const PRIORITY_COMPANIES = [
  'thiel fellowship', 'peter thiel', 'y combinator', 'techstars', '500 global',
  'google', 'microsoft', 'apple', 'meta', 'amazon', 'aws',
  'stripe', 'shopify', 'github', 'notion', 'figma', 'openai',
  'ford foundation', 'gates foundation', 'knight foundation',
  'national science foundation', 'nsf', 'darpa', 'arpa',
  'xprize', 'hult prize', 'mit', 'stanford', 'harvard',
  'forbes', 'un', 'united nations', 'world bank',
  'mastercard', 'visa', 'paypal', 'square',
]

function SectionDivider({
  icon,
  label,
  count,
  accent,
}: {
  icon: string
  label: string
  count: number
  accent: 'pink' | 'emerald' | 'cyan'
}) {
  const colors = {
    pink: 'text-pink-600 bg-pink-100 dark:bg-pink-950/30',
    emerald: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/30',
    cyan: 'text-cyan-600 bg-cyan-100 dark:bg-cyan-950/30',
  }
  const lineColors = {
    pink: 'from-pink-300/60 to-transparent',
    emerald: 'from-emerald-300/60 to-transparent',
    cyan: 'from-cyan-300/60 to-transparent',
  }
  return (
    <div className="flex items-center gap-3 mb-4 mt-7 first:mt-0">
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-mono text-[11px] font-black uppercase tracking-[0.1em] ${colors[accent]}`}>
        <span className="material-symbols-outlined text-[15px]">{icon}</span>
        {label}
        <span className="ml-1 px-1.5 py-0.5 bg-white/60 dark:bg-black/20 rounded text-[10px]">{count}</span>
      </div>
      <div className={`flex-1 h-px bg-gradient-to-r ${lineColors[accent]}`} />
    </div>
  )
}

interface StudentBenefitsGridProps {
  activeType: StudentBenefitType
  filters: StudentBenefitsFilterState
}

export default function StudentBenefitsGrid({ activeType, filters }: StudentBenefitsGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  // Page 1 uses 10 items so that 10 items + 2 ads = 12 cells (divisible by 3 → no empty grid slots).
  // All subsequent pages use 12 items (no ads) = 12 cells, also complete.
  const getPageSize = (page: number) => page === 1 ? 10 : 12
  const itemsPerPage = getPageSize(currentPage)

  // ── Filter and sort benefits ─────────────────────────────
  const filterAndSort = (appCategory: string | null) => {
    let list = studentBenefits2026
 
    if (appCategory) {
      list = list.filter(b => b.appCategory === appCategory)
    }

    // Filter by category
    if (filters.category && filters.category !== 'All') {
      list = list.filter(b => b.category === filters.category)
    }

    // Filter by region
    if (filters.region && filters.region !== 'All') {
      list = list.filter(b => b.region === filters.region || b.region === 'Global')
    }

    // Filter by funding subtype (only for Funding or All)
    if (filters.subtype && filters.subtype !== 'All') {
      list = list.filter(b =>
        b.benefitType.toLowerCase().includes(filters.subtype.toLowerCase()) ||
        b.title.toLowerCase().includes(filters.subtype.toLowerCase())
      )
    }

    // Filter by search query
    if (filters.search) {
      const q = filters.search.toLowerCase().trim()
      list = list.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.company.toLowerCase().includes(q) ||
        b.offerSummary.toLowerCase().includes(q)
      )
    }

    // Sort
    return [...list].sort((a, b) => {
      if (filters.sort === 'value-high') {
        const valA = parseInt(a.value.replace(/[^0-9]/g, '')) || 0
        const valB = parseInt(b.value.replace(/[^0-9]/g, '')) || 0
        return valB - valA
      } else if (filters.sort === 'alphabetical') {
        return a.title.localeCompare(b.title)
      } else {
        // Relevance: prioritize famous programs, then by value
        const aName = (a.company + ' ' + a.title).toLowerCase()
        const bName = (b.company + ' ' + b.title).toLowerCase()
        const aPriority = PRIORITY_COMPANIES.some(p => aName.includes(p)) ? 0 : 1
        const bPriority = PRIORITY_COMPANIES.some(p => bName.includes(p)) ? 0 : 1
        if (aPriority !== bPriority) return aPriority - bPriority
        const valA = parseInt(a.value.replace(/[^0-9]/g, '')) || 0
        const valB = parseInt(b.value.replace(/[^0-9]/g, '')) || 0
        return valB - valA
      }
    })
  }

  const freeAccessList = useMemo(() => filterAndSort('Software & Tools'), [filters, activeType])
  const creditsSavingsList = useMemo(() => filterAndSort('Credits & Savings'), [filters, activeType])
  const fundingList = useMemo(() => filterAndSort('Funding & Opportunities'), [filters, activeType])
  const programsList = useMemo(() => filterAndSort('Programs'), [filters, activeType])

  const totalFilteredCount =
    (activeType === 'all' || activeType === 'free-access' ? freeAccessList.length : 0) +
    (activeType === 'all' || activeType === 'credits-savings' ? creditsSavingsList.length : 0) +
    (activeType === 'all' || activeType === 'funding' ? fundingList.length : 0) +
    (activeType === 'all' || activeType === 'programs' ? programsList.length : 0)

  // Reset pagination on filter or type tab change
  useMemo(() => {
    setCurrentPage(1)
  }, [filters, activeType])

  // Handle dynamic scroll
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const element = document.getElementById('student-benefits-container')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }
  }

  if (totalFilteredCount === 0) {
    return (
      <div className="text-center py-10 bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-none rounded-sm">
        <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600 mb-3 block">search_off</span>
        <h3 className="text-lg font-bold text-gray-700 dark:text-white mb-1.5">No student benefits found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  // ── Single Category Views ──────────────────────────────────
  const getPaginatedGrid = (items: typeof studentBenefits2026) => {
    // Calculate total pages: page 1 holds 10 items, all others hold 12
    const totalItems = items.length
    const firstPageSize = 10
    const otherPageSize = 12
    const totalPages = totalItems <= firstPageSize
      ? 1
      : 1 + Math.ceil((totalItems - firstPageSize) / otherPageSize)
    const pageSize = getPageSize(currentPage)
    const startIndex = currentPage === 1 ? 0 : firstPageSize + (currentPage - 2) * otherPageSize
    const paginated = items.slice(startIndex, startIndex + pageSize)

    return (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {(() => {
            const cardItems: React.ReactNode[] = paginated.map((b, idx) => (
              <DealCard key={b.slug || `${b.company}-${idx}`} deal={convertToCard(b, idx)} basePath="/student-benefits" />
            ))
            
            // Page 1 only: interleave 2 ads at positions 4 and 10.
            // 10 items + 2 ads = 12 grid cells → 4 complete rows of 3, no empty slot.
            if (currentPage === 1) {
              const adPositions = [4, 10]
              adPositions.forEach((pos, adIdx) => {
                if (cardItems.length >= pos) {
                  const insertAt = Math.min(pos + adIdx, cardItems.length)
                  cardItems.splice(
                    insertAt,
                    0,
                    <FeaturedSlot
                      key={`featured-ad-single-${adIdx}`}
                      variant="inline"
                      count={1}
                      intervalMs={5500}
                      offset={6 + adIdx * 3}
                      className="h-full"
                    />
                  )
                }
              })
            }
            
            return cardItems
          })()}
        </div>
        {totalPages > 1 && (
          <div className="mt-8 md:mt-10 mb-8 md:mb-10 w-full">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    )
  }

  if (activeType === 'free-access') {
    return (
      <div>
        <p className="text-xs md:text-[13px] text-gray-600 dark:text-gray-400 px-1 mb-4">
          Showing <span className="font-semibold text-gray-900 dark:text-white tabular-nums">{freeAccessList.length}</span> student software tools &amp; licenses
        </p>
        {getPaginatedGrid(freeAccessList)}
      </div>
    )
  }

  if (activeType === 'credits-savings') {
    return (
      <div>
        <p className="text-xs md:text-[13px] text-gray-600 dark:text-gray-400 px-1 mb-4">
          Showing <span className="font-semibold text-gray-900 dark:text-white tabular-nums">{creditsSavingsList.length}</span> discount credits &amp; savings
        </p>
        {getPaginatedGrid(creditsSavingsList)}
      </div>
    )
  }

  if (activeType === 'funding') {
    return (
      <div>
        <p className="text-xs md:text-[13px] text-gray-600 dark:text-gray-400 px-1 mb-4">
          Showing <span className="font-semibold text-gray-900 dark:text-white tabular-nums">{fundingList.length}</span> student grants, fellowships &amp; opportunities
        </p>
        {getPaginatedGrid(fundingList)}
      </div>
    )
  }

  if (activeType === 'programs') {
    return (
      <div>
        <p className="text-xs md:text-[13px] text-gray-600 dark:text-gray-400 px-1 mb-4">
          Showing <span className="font-semibold text-gray-900 dark:text-white tabular-nums">{programsList.length}</span> student programs, fellowships &amp; residencies
        </p>
        {getPaginatedGrid(programsList)}
      </div>
    )
  }

  // ── "All Benefits" View — flat merged list with pagination (same as All Deals) ──
  const allBenefitsMerged = useMemo(() => {
    const lists = [freeAccessList, creditsSavingsList, fundingList, programsList]
    const merged: typeof freeAccessList = []
    const maxLen = Math.max(...lists.map(l => l.length))
    for (let i = 0; i < maxLen; i++) {
      for (const list of lists) {
        if (i < list.length) merged.push(list[i])
      }
    }
    return merged
  }, [freeAccessList, creditsSavingsList, fundingList, programsList])

  // Adaptive page sizes: page 1 = 10 items + 2 ads = 12 cells; pages 2+ = 12 items + 0 ads = 12 cells
  const allFirstPageSize = 10
  const allOtherPageSize = 12
  const allTotalPages = allBenefitsMerged.length <= allFirstPageSize
    ? 1
    : 1 + Math.ceil((allBenefitsMerged.length - allFirstPageSize) / allOtherPageSize)
  const allPageSize = currentPage === 1 ? allFirstPageSize : allOtherPageSize
  const allStartIndex = currentPage === 1 ? 0 : allFirstPageSize + (currentPage - 2) * allOtherPageSize
  const allCurrentItems = allBenefitsMerged.slice(allStartIndex, allStartIndex + allPageSize)

  // Count display helpers
  const allDisplayStart = allStartIndex + 1
  const allDisplayEnd = Math.min(allStartIndex + allPageSize, allBenefitsMerged.length)

  return (
    <div>
      <p className="text-xs md:text-[13px] text-gray-600 dark:text-gray-400 px-1 mb-4">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white tabular-nums">
          {allDisplayStart}–{allDisplayEnd}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-gray-900 dark:text-white tabular-nums">{allBenefitsMerged.length}</span>{' '}
        student benefits
      </p>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {(() => {
          const cardItems: React.ReactNode[] = allCurrentItems.map((b, idx) => (
            <DealCard
              key={b.slug || `${b.company}-${idx}`}
              deal={convertToCard(b, idx)}
              basePath="/student-benefits"
            />
          ))
          // Page 1 only: 10 items + 2 ads at positions 4 & 10 = 12 total cells, no empty slot
          if (currentPage === 1) {
            const adPositions = [4, 10]
            adPositions.forEach((pos, idx) => {
              if (cardItems.length >= pos) {
                const insertAt = Math.min(pos + idx, cardItems.length)
                cardItems.splice(
                  insertAt,
                  0,
                  <FeaturedSlot
                    key={`featured-ad-all-${idx}`}
                    variant="inline"
                    count={1}
                    intervalMs={5500}
                    offset={6 + idx * 3}
                    className="h-full"
                  />
                )
              }
            })
          }
          return cardItems
        })()}
      </div>

      {allTotalPages > 1 && (
        <div className="mt-8 md:mt-10 mb-8 md:mb-10 w-full">
          <Pagination currentPage={currentPage} totalPages={allTotalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  )
}

