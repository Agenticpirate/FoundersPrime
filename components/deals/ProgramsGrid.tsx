// @ts-nocheck
'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/hooks'
import Mandala from '@/components/ui/Mandala'
import { checkProStatus } from '@/lib/auth/user-context'
import { accelerators2026, Accelerator } from '@/data/accelerators-2026'
import { incubators2026, Incubator } from '@/data/incubators-2026'
import { grants2026, Grant } from '@/data/grants-2026'
import type { ProgramType } from './ProgramsSidebar'
import type { ProgramFilterState } from './ProgramsFilterBar'

// Helper to determine the favicon/logo chain
function getLogoUrl(logo: string | undefined, name: string, website: string | undefined) {
  let domain = ''
  if (website) {
    try {
      domain = new URL(website).hostname.replace('www.', '')
    } catch { }
  }
  const chain = [
    logo,
    domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null,
    domain ? `https://logo.clearbit.com/${domain}` : null,
  ].filter(Boolean) as string[]

  if (chain.length === 0) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3f4f6&color=374151&bold=true&size=128`
  }
  return chain[0]
}

// ──────────────────────────────────────────────────────────
// Redesigned Unified Program Card (matches YC/Techstars reference design)
// ──────────────────────────────────────────────────────────
interface ProgramCardProps {
  logo: string
  name: string
  slug: string
  badge?: string
  description: string
  funding: string
  equity: string
  duration: string
  isPro: boolean
  type?: 'accelerator' | 'incubator' | 'grant'
}

function ProgramCard({
  logo,
  name,
  slug,
  badge,
  description,
  funding,
  equity,
  duration,
  isPro,
  type,
}: ProgramCardProps) {
  const [imgSrc, setImgSrc] = useState(logo)
  const [failed, setFailed] = useState(false)

  const getBadgeStyle = (b?: string) => {
    if (!b) return ''
    const bLc = b.toLowerCase()
    if (bLc.includes('open') || bLc.includes('active')) {
      return 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
    }
    if (bLc.includes('invite')) {
      return 'bg-purple-950/40 text-purple-400 border border-purple-500/20'
    }
    if (bLc.includes('featured') || bLc.includes('recommended')) {
      return 'bg-amber-950/40 text-accent-yellow border border-accent-yellow/20'
    }
    return 'bg-gray-800/40 text-gray-400 border border-white/10'
  }

  return (
    <Link
      href={isPro ? `/deals/${slug}` : '/pricing'}
      className="flex flex-col bg-[#0b0b0b] border border-white/10 hover:border-accent-yellow/30 rounded-lg p-4 transition-all duration-200 group h-full relative overflow-hidden text-left"
    >
      {/* Top badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {type && (
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono ${type === 'accelerator' ? 'bg-orange-950/40 text-orange-400 border border-orange-500/20' :
              type === 'incubator' ? 'bg-teal-950/40 text-teal-400 border border-teal-500/20' :
                'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
            }`}>
            {type}
          </span>
        )}
        {badge && (
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono ${getBadgeStyle(badge)}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Header: logo + name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0 relative">
          {!failed ? (
            <img
              src={imgSrc}
              alt=""
              className="w-full h-full object-contain"
              onError={() => {
                // simple fallback strategy
                if (imgSrc !== logo) {
                  setFailed(true)
                } else {
                  setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3f4f6&color=374151&bold=true&size=128`)
                }
              }}
            />
          ) : (
            <span className="text-[10px] font-mono font-black text-gray-500">
              {name.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <h3 className="text-[14px] font-bold text-white leading-tight group-hover:text-accent-yellow transition-colors line-clamp-2 flex-1">
          {name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[11.5px] text-gray-450 leading-relaxed mb-4 line-clamp-3 flex-grow">
        {description}
      </p>

      {/* 3-column key metrics table */}
      <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-white/5 mb-4 font-mono">
        <div className="min-w-0">
          <span className="block text-[11px] font-black text-emerald-400 truncate">{funding || 'N/A'}</span>
          <span className="block text-[8.5px] text-gray-500 uppercase tracking-wider mt-0.5">Funding</span>
        </div>
        <div className="min-w-0">
          <span className="block text-[11px] font-black text-white truncate">{equity || '0%'}</span>
          <span className="block text-[8.5px] text-gray-500 uppercase tracking-wider mt-0.5">Equity</span>
        </div>
        <div className="min-w-0">
          <span className="block text-[11px] font-black text-white truncate">{duration || 'N/A'}</span>
          <span className="block text-[8.5px] text-gray-500 uppercase tracking-wider mt-0.5">Duration</span>
        </div>
      </div>

      {/* View action */}
      <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-accent-yellow mt-auto">
        <span>VIEW DETAILS</span>
        <span className="material-symbols-outlined !text-[12px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
      </div>
    </Link>
  )
}

// ──────────────────────────────────────────────────────────
// Loading Skeleton
// ──────────────────────────────────────────────────────────
function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-[#0b0b0b] border border-white/5 p-4 rounded-lg animate-pulse h-60 flex flex-col justify-between"
        >
          <div>
            <div className="h-4 bg-white/5 w-1/4 rounded mb-4" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex-shrink-0" />
              <div className="h-3 bg-white/5 rounded w-2/3" />
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-white/5 rounded w-full" />
              <div className="h-2 bg-white/5 rounded w-5/6" />
            </div>
          </div>
          <div className="h-8 bg-white/5 rounded w-full mt-4" />
        </div>
      ))}
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Premium CTA
// ──────────────────────────────────────────────────────────
function PremiumCTA() {
  const verifiedAvatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  ]

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/20 to-yellow-950/10 border border-accent-yellow/20 rounded-xl p-6 md:p-8 mt-12 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
      {/* Decorative background grid/light */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.15), transparent 50%)'
      }} />

      {/* Info Block */}
      <div className="flex items-start gap-4 z-10">
        <div className="w-12 h-12 rounded-xl bg-accent-yellow/10 border border-accent-yellow/30 flex items-center justify-center flex-shrink-0 text-accent-yellow">
          <span className="material-symbols-outlined !text-[24px]">workspace_premium</span>
        </div>
        <div className="min-w-0">
          <h4 className="font-mono text-base md:text-lg font-bold text-white uppercase tracking-wider mb-1">
            Unlock premium programs &amp; insider opportunities.
          </h4>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl">
            Get early access, application templates, expert review &amp; more with FoundersPrime Membership.
          </p>
        </div>
      </div>

      {/* Action Block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 z-10 flex-shrink-0">
        {/* Avatars pile */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {verifiedAvatars.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="w-6 h-6 rounded-full border border-black object-cover"
              />
            ))}
          </div>
          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">Join 10,000+ founders</span>
        </div>

        {/* Button */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono font-bold text-[11px] uppercase tracking-wider px-5 py-3 rounded-lg hover:bg-amber-300 transition-colors shadow-lg"
        >
          <span>VIEW MEMBERSHIP PLANS</span>
          <span className="material-symbols-outlined !text-[13px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Pagination component matching reference design
// ──────────────────────────────────────────────────────────
interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] font-bold">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-gray-400 hover:text-white rounded transition-colors uppercase tracking-wider border border-white/5"
        >
          &larr; PREVIOUS
        </button>
        {getPageNumbers().map((pageNum, idx) =>
          typeof pageNum === 'number' ? (
            <button
              key={idx}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${currentPage === pageNum
                  ? 'bg-accent-yellow text-black font-black border-accent-yellow'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border-white/5'
                }`}
            >
              {pageNum}
            </button>
          ) : (
            <span key={idx} className="px-1 text-gray-600">
              ...
            </span>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-gray-400 hover:text-white rounded transition-colors uppercase tracking-wider border border-white/5"
        >
          NEXT &rarr;
        </button>
      </div>
      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Custom Premium Dark Gating Overlay
// ──────────────────────────────────────────────────────────
interface ProgramsProGateOverlayProps {
  totalCount: number
  label?: string
  children: React.ReactNode
}

function ProgramsProGateOverlay({
  totalCount,
  label = 'Programs',
  children,
}: ProgramsProGateOverlayProps) {
  return (
    <div className="relative mt-8 mb-20">
      {/* Blurred preview children absolute background */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none select-none z-0"
        style={{
          filter: 'blur(10px) brightness(0.4) saturate(0.5)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
        }}
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Dark & Premium Brutalist CTA panel relative content */}
      <div className="relative flex items-start justify-center pt-8 pb-8 px-4 z-20">
        <div className="relative w-full max-w-[460px] bg-[#0c0c0c] border-2 border-accent-yellow shadow-[6px_6px_0px_#111] overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-accent-yellow" />

          {/* Embedded decorative mandala */}
          <Mandala
            variant="orbital"
            colorClass="text-accent-yellow"
            opacity={0.1}
            speed={80}
            className="pointer-events-none absolute -right-12 -top-12 w-36 h-36"
          />

          <div className="p-8 md:p-10 flex flex-col items-center">
            {/* Lock icon */}
            <div className="w-14 h-14 bg-black border-2 border-accent-yellow flex items-center justify-center shadow-[4px_4px_0px_#111] mb-6">
              <span className="material-symbols-outlined !text-[28px] text-accent-yellow" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock
              </span>
            </div>

            {/* Premium tag */}
            <span className="bg-accent-yellow text-black font-mono text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 border border-black shadow-[2px_2px_0px_#111] mb-5">
              ✦ Founder Plan — Full Access
            </span>

            {/* Headline */}
            <h3 className="font-mono text-xl md:text-2xl font-black text-white text-center uppercase tracking-tight mb-2">
              Unlock All {label}
            </h3>

            <p className="font-mono text-[11px] text-gray-400 text-center mb-6">
              Exclusive directory for verified founders &amp; members. The average founder saves a minimum of $3,000+ in their first week alone.
            </p>

            {/* Divider */}
            <div className="w-full border-t border-dashed border-white/10 mb-6" />

            {/* Bullet points */}
            <ul className="w-full space-y-3.5 mb-8">
              {[
                `Save a minimum of $3,000+ in your first week`,
                `Unlimited access to all verified ${label.toLowerCase()}`,
                'Direct application links & verified deadlines',
                'Full funding amounts, cohorts, and equity terms',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 font-mono text-[11.5px] text-gray-300 font-semibold leading-relaxed">
                  <span className="material-symbols-outlined !text-[16px] text-accent-yellow flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href="/pricing"
              className="group flex items-center justify-center gap-2 w-full bg-accent-yellow hover:bg-amber-300 text-black font-mono font-black text-xs uppercase tracking-wider py-4 px-6 border-2 border-black shadow-[4px_4px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
            >
              <span className="material-symbols-outlined !text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                workspace_premium
              </span>
              Unlock All {label}
            </Link>

            {/* Fine print */}
            <p className="font-mono text-[9px] text-gray-500 text-center mt-4 tracking-wider">
              Cancel anytime · Instant access · See plans &amp; pricing
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// Main Grid Component
// ──────────────────────────────────────────────────────────
interface ProgramsGridProps {
  activeType: ProgramType
  filters: ProgramFilterState
  initialIsPro?: boolean
}

interface UnifiedProgram {
  id: string
  type: 'accelerator' | 'incubator' | 'grant'
  name: string
  slug: string
  logo?: string
  website?: string
  applicationStatus: string
  description: string
  funding: string
  equity: string
  duration: string
}

export default function ProgramsGrid({ activeType, filters, initialIsPro }: ProgramsGridProps) {
  const { user, loading: authLoading } = useAuth()
  const [isPro, setIsPro] = useState(initialIsPro ?? false)
  const [checkingAccess, setCheckingAccess] = useState(initialIsPro === undefined)

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [localPage, setLocalPage] = useState(1)

  useEffect(() => {
    // Server already resolved pro status — never block the grid on client auth.
    if (initialIsPro !== undefined) {
      setIsPro(initialIsPro)
      setCheckingAccess(false)
      return
    }
    if (authLoading) return
    let cancelled = false
    const run = async () => {
      try {
        if (user) {
          const { isPro: hasPro } = await checkProStatus()
          if (!cancelled) setIsPro(hasPro)
        } else if (!cancelled) {
          setIsPro(false)
        }
      } catch {
        if (!cancelled) setIsPro(false)
      } finally {
        if (!cancelled) setCheckingAccess(false)
      }
    }
    run()
    // Safety: never leave the grid on skeleton forever if auth hangs.
    const t = setTimeout(() => {
      if (!cancelled) setCheckingAccess(false)
    }, 2500)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [authLoading, user?.id, initialIsPro])

  useEffect(() => {
    const pageParam = searchParams.get('page')
    setLocalPage(Number(pageParam) || 1)
  }, [searchParams])

  const searchLc = filters.search.toLowerCase().trim()

  const filteredAccelerators = useMemo(() => {
    let results = accelerators2026
    if (filters.region && filters.region !== 'All') {
      results = results.filter(a => a.region === filters.region || a.region === 'Global')
    }
    if (searchLc) {
      results = results.filter(a =>
        a.name.toLowerCase().includes(searchLc) ||
        a.location?.toLowerCase().includes(searchLc) ||
        a.focusArea?.toLowerCase().includes(searchLc) ||
        a.description?.toLowerCase().includes(searchLc)
      )
    }
    return [...results].sort((a, b) => {
      if (filters.sort === 'investment-high') {
        const av = parseInt(a.investment?.replace(/[^0-9]/g, '') || '0')
        const bv = parseInt(b.investment?.replace(/[^0-9]/g, '') || '0')
        return bv - av
      }
      if (filters.sort === 'equity-low') {
        const ae = parseFloat(a.equity?.replace('%', '') || '0')
        const be = parseFloat(b.equity?.replace('%', '') || '0')
        return ae - be
      }
      if (filters.sort === 'status') {
        if (a.applicationStatus === 'Active' && b.applicationStatus !== 'Active') return -1
        if (a.applicationStatus !== 'Active' && b.applicationStatus === 'Active') return 1
        return 0
      }
      return a.name.localeCompare(b.name)
    })
  }, [filters.region, searchLc, filters.sort])

  const filteredIncubators = useMemo(() => {
    let results = incubators2026
    if (filters.region && filters.region !== 'All') {
      results = results.filter(i => i.region === filters.region || i.region === 'Global')
    }
    if (searchLc) {
      results = results.filter(i =>
        i.name.toLowerCase().includes(searchLc) ||
        i.location?.toLowerCase().includes(searchLc) ||
        i.focusArea?.toLowerCase().includes(searchLc) ||
        i.description?.toLowerCase().includes(searchLc)
      )
    }
    return [...results].sort((a, b) => {
      if (filters.sort === 'status') {
        if (a.applicationStatus === 'Active' && b.applicationStatus !== 'Active') return -1
        if (a.applicationStatus !== 'Active' && b.applicationStatus === 'Active') return 1
        return 0
      }
      return a.name.localeCompare(b.name)
    })
  }, [filters.region, searchLc, filters.sort])

  const filteredGrants = useMemo(() => {
    let results = grants2026
    if (filters.region && filters.region !== 'All') {
      results = results.filter(g => g.region === filters.region)
    }
    if (filters.subtype && filters.subtype !== 'All') {
      results = results.filter(g => g.type === filters.subtype)
    }
    if (searchLc) {
      results = results.filter(g =>
        g.name.toLowerCase().includes(searchLc) ||
        g.organization?.toLowerCase().includes(searchLc) ||
        g.category?.toLowerCase().includes(searchLc) ||
        g.description?.toLowerCase().includes(searchLc)
      )
    }
    return [...results].sort((a, b) => {
      if (filters.sort === 'funding-high') {
        const av = parseInt(a.fundingAmount?.replace(/[^0-9]/g, '') || '0')
        const bv = parseInt(b.fundingAmount?.replace(/[^0-9]/g, '') || '0')
        return bv - av
      }
      if (filters.sort === 'status') {
        const order: Record<string, number> = { Active: 0, Rolling: 1, 'Opening Soon': 2, Closed: 3, 'Invite Only': 4 }
        return (order[a.applicationStatus] ?? 9) - (order[b.applicationStatus] ?? 9)
      }
      return a.name.localeCompare(b.name)
    })
  }, [filters.region, filters.subtype, searchLc, filters.sort])

  const combinedPrograms = useMemo(() => {
    const list: UnifiedProgram[] = []

    if (activeType === 'all' || activeType === 'accelerators') {
      filteredAccelerators.forEach(acc => {
        list.push({
          id: acc.id,
          type: 'accelerator',
          name: acc.name,
          slug: acc.slug,
          logo: acc.logo,
          website: acc.website,
          applicationStatus: acc.applicationStatus,
          description: acc.description,
          funding: acc.investment,
          equity: acc.equity,
          duration: acc.programDuration,
        })
      })
    }

    if (activeType === 'all' || activeType === 'incubators') {
      filteredIncubators.forEach(inc => {
        list.push({
          id: inc.id,
          type: 'incubator',
          name: inc.name,
          slug: inc.slug,
          logo: inc.logo,
          website: inc.website,
          applicationStatus: inc.applicationStatus,
          description: inc.description,
          funding: inc.support,
          equity: inc.equity,
          duration: inc.programDuration,
        })
      })
    }

    if (activeType === 'all' || activeType === 'grants') {
      filteredGrants.forEach(grant => {
        list.push({
          id: grant.id,
          type: 'grant',
          name: grant.name,
          slug: grant.slug,
          logo: grant.logo,
          website: grant.website,
          applicationStatus: grant.applicationStatus,
          description: grant.description,
          funding: grant.fundingAmount,
          equity: grant.equity,
          duration: grant.deadline || 'N/A',
        })
      })
    }

    return list.sort((a, b) => {
      const aActive = a.applicationStatus === 'Active'
      const bActive = b.applicationStatus === 'Active'
      if (aActive && !bActive) return -1
      if (!aActive && bActive) return 1
      return a.name.localeCompare(b.name)
    })
  }, [activeType, filteredAccelerators, filteredIncubators, filteredGrants])

  // Only block on auth when we did NOT get server-side isPro.
  if (initialIsPro === undefined && (authLoading || checkingAccess)) {
    return <GridSkeleton />
  }

  const totalVisible = combinedPrograms.length
  // Show a full first page free so the tab never feels empty / stuck loading.
  const FREE_LIMIT = 12
  const itemsPerPage = 12
  const totalPages = Math.ceil(totalVisible / itemsPerPage) || 1
  const currentPage = Math.min(Math.max(1, localPage), totalPages)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPrograms = isPro
    ? combinedPrograms.slice(startIndex, endIndex)
    : combinedPrograms.slice(0, FREE_LIMIT)

  const handlePageChange = (page: number) => {
    setLocalPage(page)
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    window.history.replaceState(null, '', pathname + '?' + params.toString())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (totalVisible === 0) {
    return (
      <div className="text-center py-12 bg-[#0b0b0b] border border-white/10 rounded-xl">
        <span className="material-symbols-outlined text-5xl text-gray-600 mb-3 block">search_off</span>
        <h3 className="text-lg font-bold text-white mb-1.5">No programs found</h3>
        <p className="text-gray-500 text-sm">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedPrograms.map(prog => (
          <ProgramCard
            key={`${prog.type}-${prog.id}`}
            logo={getLogoUrl(prog.logo, prog.name, prog.website)}
            name={prog.name}
            slug={prog.slug}
            badge={prog.applicationStatus === 'Active' ? 'Applications Open' : prog.applicationStatus}
            description={prog.description}
            funding={prog.funding}
            equity={prog.equity}
            duration={prog.duration}
            isPro={isPro}
            type={prog.type}
          />
        ))}
      </div>

      {/* Bottom premium gate overlay (renders below grid if user is not pro) */}
      {!isPro && totalVisible > FREE_LIMIT && (
        <ProgramsProGateOverlay
          totalCount={totalVisible}
          label="Startup Programs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 opacity-50 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#0b0b0b] border border-white/5 h-64 rounded-lg p-4" />
            ))}
          </div>
        </ProgramsProGateOverlay>
      )}

      {/* Bottom CTA block */}
      <PremiumCTA />

      {/* Pagination controls */}
      {isPro && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
