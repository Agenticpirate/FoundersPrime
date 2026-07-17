'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import DealCard from './DealCard'
import Pagination from '@/components/Pagination'
import { studentBenefits2026, type StudentBenefit } from '@/data/student-benefits-2026'
import { isStudentCatalogEligibility } from '@/lib/catalog-segregation'
import type { StudentBenefitType } from './StudentBenefitsSidebar'
import type { StudentBenefitsFilterState } from './StudentBenefitsFilterBar'
import {
  matchesStudentBenefitType,
  STUDENT_TYPE_LABELS,
} from './student-benefit-types'
import ProGateOverlay from '@/components/ProGateOverlay'
import { useHydratedDeals } from '@/context/FeaturedDealsContext'
import { StaggerGrid, StaggerGridItem } from '@/components/ui/premium-motion'
import { isUsableLogoUrl } from '@/lib/logo-utils'
import { resolveBrandDomain } from '@/lib/brand-domain'
import { getStudentBenefitBadge } from '@/lib/student-benefit-badges'

const PRIORITY_COMPANIES = [
  'github',
  'figma',
  'microsoft',
  'adobe',
  'google',
  'aws',
  'notion',
  'spotify',
  'apple',
  'jetbrains',
  'autodesk',
  'canva',
  'unity',
  'slack',
  'linkedin',
  'amazon',
  'openai',
  'cursor',
  'framer',
  'gitlab',
  'thiel',
  'y combinator',
  'nsf',
  'gates foundation',
]

/** Display brand for logo: product name when title/slug is the product. */
function brandNameForLogo(benefit: StudentBenefit): string {
  const title = `${benefit.title || ''} ${benefit.slug || ''}`
  if (/youtube/i.test(title)) return 'YouTube'
  if (/spotify/i.test(title) && !/spotify/i.test(benefit.company || '')) return 'Spotify'
  if (/github/i.test(title) && !/github/i.test(benefit.company || '')) return 'GitHub'
  if (/figma/i.test(title) && !/figma/i.test(benefit.company || '')) return 'Figma'
  if (/notion/i.test(title) && !/notion/i.test(benefit.company || '')) return 'Notion'
  if (/jetbrains/i.test(title)) return 'JetBrains'
  if (/azure/i.test(title) && /microsoft|azure/i.test(benefit.company || 'microsoft')) return 'Microsoft'
  return benefit.company || benefit.title || 'Brand'
}

/** Explicit logo URL if usable — BrandLogo rebuilds the full fallback chain. */
function explicitLogo(benefit: StudentBenefit): string {
  const l = (benefit.logo || '').trim()
  if (!l || !isUsableLogoUrl(l)) return ''
  return l
}

function convertToCard(benefit: StudentBenefit, idx: number) {
  const badgeInfo = getStudentBenefitBadge(benefit)
  const name = brandNameForLogo(benefit)
  const logo = explicitLogo(benefit)
  // Claim URL host wins (YouTube under Google, etc.)
  const domain = resolveBrandDomain({
    name,
    website: benefit.claimUrl || benefit.url,
    logo: benefit.logo,
  })

  return {
    id: benefit.slug || `${benefit.company}-${idx}`,
    logo,
    domain,
    category: benefit.category,
    badge: badgeInfo?.label,
    badgeColor: badgeInfo?.color,
    title: benefit.title,
    provider: name,
    value:
      benefit.value === 'N/A' || !benefit.value
        ? benefit.benefitType === 'Free'
          ? 'Free'
          : 'Student deal'
        : benefit.value,
    valueSubtext: benefit.benefitType || 'Student',
    valueStyle:
      'bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white/15',
    description: benefit.offerSummary,
    eligibility: benefit.eligibility,
    // Keep claim URL for domain resolution + external fallbacks
    applicationUrl: benefit.claimUrl || benefit.url,
    verified: true,
  }
}

function scoreRelevance(b: StudentBenefit): number {
  const name = `${b.company} ${b.title}`.toLowerCase()
  let score = 0
  if (PRIORITY_COMPANIES.some((p) => name.includes(p))) score += 100
  if (/free|100%|credits?|1 year|12 months/i.test(`${b.value} ${b.title}`)) score += 40
  const num = parseInt((b.value || '').replace(/[^0-9]/g, ''), 10) || 0
  if (num >= 10000) score += 50
  else if (num >= 1000) score += 25
  else if (num >= 100) score += 10
  // Badge-tier boost so Popular/Recommended float first on relevance sort
  const badge = getStudentBenefitBadge(b)
  if (badge?.label === 'Popular') score += 80
  else if (badge?.label === 'Recommended') score += 40
  return score
}

interface StudentBenefitsGridProps {
  activeType: StudentBenefitType
  filters: StudentBenefitsFilterState
}

export default function StudentBenefitsGrid({ activeType, filters }: StudentBenefitsGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { isPro, isNextFounder } = useHydratedDeals()
  const hasAccess = isPro || isNextFounder
  const pageSize = 12

  const filteredList = useMemo(() => {
    let list = studentBenefits2026.filter((b) => isStudentCatalogEligibility(b.eligibility))

    if (activeType !== 'all') {
      list = list.filter((b) => matchesStudentBenefitType(b, activeType))
    }

    if (filters.category && filters.category !== 'All') {
      list = list.filter((b) => b.category === filters.category)
    }

    if (filters.region && filters.region !== 'All') {
      list = list.filter((b) => b.region === filters.region || b.region === 'Global')
    }

    if (filters.subtype && filters.subtype !== 'All') {
      const sub = filters.subtype.toLowerCase()
      list = list.filter(
        (b) =>
          b.benefitType.toLowerCase().includes(sub) ||
          b.title.toLowerCase().includes(sub) ||
          b.category.toLowerCase().includes(sub)
      )
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim()
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.company.toLowerCase().includes(q) ||
          b.offerSummary.toLowerCase().includes(q) ||
          (b.value || '').toLowerCase().includes(q) ||
          (b.benefitType || '').toLowerCase().includes(q)
      )
    }

    return [...list].sort((a, b) => {
      if (filters.sort === 'value-high') {
        const valA = parseInt((a.value || '').replace(/[^0-9]/g, ''), 10) || 0
        const valB = parseInt((b.value || '').replace(/[^0-9]/g, ''), 10) || 0
        return valB - valA
      }
      if (filters.sort === 'alphabetical') {
        return a.title.localeCompare(b.title)
      }
      // relevance
      const sa = scoreRelevance(a)
      const sb = scoreRelevance(b)
      if (sa !== sb) return sb - sa
      const valA = parseInt((a.value || '').replace(/[^0-9]/g, ''), 10) || 0
      const valB = parseInt((b.value || '').replace(/[^0-9]/g, ''), 10) || 0
      return valB - valA
    })
  }, [activeType, filters])

  const lastKey = useRef(`${activeType}|${JSON.stringify(filters)}`)
  useEffect(() => {
    const key = `${activeType}|${JSON.stringify(filters)}`
    if (lastKey.current !== key) {
      lastKey.current = key
      setCurrentPage(1)
    }
  }, [filters, activeType])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const element = document.getElementById('student-benefits-container')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }
  }

  if (filteredList.length === 0) {
    return (
      <div className="text-center py-14 px-6 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] shadow-sm">
        <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600 mb-3 block">
          search_off
        </span>
        <h3 className="text-lg font-bold font-mono text-gray-800 dark:text-white mb-1.5">
          No student benefits found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
          Try another type, clear filters, or search a brand like GitHub, Figma, or Adobe.
        </p>
      </div>
    )
  }

  const totalPages = Math.ceil(filteredList.length / pageSize) || 1
  const startIndex = (currentPage - 1) * pageSize
  const paginated = filteredList.slice(startIndex, startIndex + pageSize)
  const displayStart = filteredList.length > 0 ? startIndex + 1 : 0
  const displayEnd = Math.min(startIndex + pageSize, filteredList.length)

  const typeLabel = STUDENT_TYPE_LABELS[activeType]
  const countLabel =
    activeType === 'all'
      ? 'student benefits'
      : activeType === 'credits-savings'
        ? 'credits & savings offers'
        : activeType === 'free-access'
          ? 'free tools & licenses'
          : activeType === 'funding'
            ? 'funding opportunities'
            : 'student programs'

  const gridContent = (
    <StaggerGrid
      animKey={`${activeType}-${currentPage}-${filteredList.length}-${filters.sort}`}
      className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 items-stretch"
    >
      {paginated.map((b, idx) => (
        <StaggerGridItem key={b.slug || `${b.company}-${startIndex + idx}`}>
          <DealCard deal={convertToCard(b, startIndex + idx)} basePath="/student-benefits" />
        </StaggerGridItem>
      ))}
    </StaggerGrid>
  )

  const showingLine = (
    <p className="text-xs md:text-[13px] text-gray-600 dark:text-gray-400 px-1 mb-4">
      Showing{' '}
      <span className="font-semibold text-gray-900 dark:text-white tabular-nums">
        {displayStart}–{displayEnd}
      </span>{' '}
      of{' '}
      <span className="font-semibold text-gray-900 dark:text-white tabular-nums">
        {filteredList.length}
      </span>{' '}
      {countLabel}
      {activeType !== 'all' && (
        <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-md bg-accent-yellow/15 text-amber-800 dark:text-accent-yellow font-mono text-[10px] font-bold uppercase tracking-wide">
          {typeLabel}
        </span>
      )}
    </p>
  )

  const pagination =
    totalPages > 1 ? (
      <div className="mt-8 md:mt-10 mb-8 md:mb-10 w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    ) : null

  if (!hasAccess && currentPage > 1) {
    return (
      <div>
        {showingLine}
        <ProGateOverlay
          totalCount={filteredList.length}
          visibleCount={pageSize}
          label="Student Benefits"
        >
          {gridContent}
        </ProGateOverlay>
        {pagination}
      </div>
    )
  }

  return (
    <div>
      {showingLine}
      {gridContent}
      {pagination}
    </div>
  )
}
