// @ts-nocheck
'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth/hooks'
import Mandala from '@/components/ui/Mandala'
import { checkProStatus } from '@/lib/auth/user-context'
import type { ProgramType } from './ProgramsSidebar'
import type { ProgramFilterState } from './ProgramsFilterBar'
import { StaggerGrid, StaggerGridItem } from '@/components/ui/premium-motion'
import { CardHoverGlow, cardHoverClass, cardLogoHoverClass, cardTitleHoverClass } from '@/components/ui/card-hover'
import Pagination from '@/components/Pagination'
import BrandLogo from '@/components/ui/BrandLogo'
import { cleanDomain } from '@/lib/logo-utils'
import {
  getStaticPrograms,
  fromSupabaseProgram,
  type UnifiedProgram as CatalogProgram,
} from '@/lib/programs-catalog'

function websiteDomain(website?: string): string | undefined {
  if (!website) return undefined
  try {
    return cleanDomain(new URL(website).hostname) || undefined
  } catch {
    return cleanDomain(website) || undefined
  }
}

// ──────────────────────────────────────────────────────────
// Redesigned Unified Program Card (matches YC/Techstars reference design)
// ──────────────────────────────────────────────────────────
interface ProgramCardProps {
  name: string
  website?: string
  logo?: string
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
  name,
  website,
  logo,
  slug,
  badge,
  description,
  funding,
  equity,
  duration,
  isPro,
  type,
}: ProgramCardProps) {
  const domain = websiteDomain(website)

  const getBadgeStyle = (b?: string) => {
    if (!b) return ''
    const bLc = b.toLowerCase()
    if (bLc.includes('open') || bLc.includes('active')) {
      return 'bg-accent-yellow/15 text-accent-yellow border border-accent-yellow/30'
    }
    if (bLc.includes('invite')) {
      return 'bg-violet-500/10 text-violet-400 border-violet-500/25'
    }
    if (bLc.includes('featured') || bLc.includes('recommended') || bLc.includes('popular')) {
      return 'bg-orange-500/15 text-orange-400 border-orange-500/30'
    }
    return 'bg-white/5 text-gray-400 border border-white/10'
  }

  const ctaLabel = isPro ? 'View details' : 'Unlock'

  return (
    <Link
      href={isPro ? `/deals/${slug}` : '/pricing'}
      className={`flex flex-col bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/[0.07] rounded-xl md:rounded-2xl p-3 md:p-4 h-full text-left min-w-0 ${cardHoverClass}`}
    >
      <CardHoverGlow />

      {/* Fixed badge strip — same height on every card */}
      <div className="relative flex flex-wrap items-center gap-1 md:gap-1.5 mb-2 md:mb-3 min-h-[20px] md:min-h-[22px]">
        {type && (
          <span
            className={`px-1.5 md:px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-wider font-mono border ${
              type === 'accelerator'
                ? 'bg-orange-500/10 text-orange-400 border-orange-500/25'
                : type === 'incubator'
                  ? 'bg-violet-500/10 text-violet-400 border-violet-500/25'
                  : 'bg-sky-500/10 text-sky-400 border-sky-500/25'
            }`}
          >
            {type}
          </span>
        )}
        {badge && (
          <span className={`px-1.5 md:px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-wider font-mono ${getBadgeStyle(badge)}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Logo row: top-aligned fixed plate so icons line up across the grid */}
      <div className="relative flex items-start gap-2 md:gap-3 mb-2 md:mb-3 min-h-0 md:min-h-[3rem] min-w-0">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 bg-white ${cardLogoHoverClass}`}>
          <BrandLogo
            name={name}
            domain={domain}
            logo={logo}
            size="md"
            plate
            eager
            className="!w-10 !h-10 md:!w-12 md:!h-12 !rounded-xl md:!rounded-2xl"
          />
        </div>
        <h3 className={`text-[12px] md:text-[14px] font-bold text-white leading-snug line-clamp-2 min-h-[2.25rem] md:min-h-[2.5rem] flex-1 pt-0.5 min-w-0 ${cardTitleHoverClass}`}>
          {name}
        </h3>
      </div>

      <p className="relative text-[10px] md:text-[11.5px] text-gray-400 leading-relaxed mb-2.5 md:mb-4 line-clamp-2 md:line-clamp-3 flex-grow">
        {description}
      </p>

      {/* Metrics fields — fixed rows for alignment across cards */}
      <div className="relative grid grid-cols-3 gap-0.5 md:gap-1 py-2 md:py-2.5 px-0.5 md:px-1 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-2.5 md:mb-3.5 font-mono">
        <div className="min-w-0 px-1 md:px-1.5 flex flex-col items-center justify-center text-center">
          <span className="block w-full text-[9px] sm:text-[11px] font-black text-accent-yellow truncate leading-tight">{funding || 'N/A'}</span>
          <span className="block text-[7px] md:text-[8px] text-gray-500 uppercase tracking-wider mt-0.5 leading-none">Funding</span>
        </div>
        <div className="min-w-0 px-1 md:px-1.5 flex flex-col items-center justify-center text-center border-x border-white/[0.05]">
          <span className="block w-full text-[9px] sm:text-[11px] font-black text-white truncate leading-tight">{equity || '0%'}</span>
          <span className="block text-[7px] md:text-[8px] text-gray-500 uppercase tracking-wider mt-0.5 leading-none">Equity</span>
        </div>
        <div className="min-w-0 px-1 md:px-1.5 flex flex-col items-center justify-center text-center">
          <span className="block w-full text-[9px] sm:text-[11px] font-black text-white truncate leading-tight">{duration || 'N/A'}</span>
          <span className="block text-[7px] md:text-[8px] text-gray-500 uppercase tracking-wider mt-0.5 leading-none">Duration</span>
        </div>
      </div>

      {/* CTA — full-width bar; CSS grid + SVG icon so text/icon never baseline-drift */}
      <div className="relative mt-auto w-full pt-0.5 md:pt-1">
        <span
          className="grid h-9 md:h-10 w-full grid-flow-col auto-cols-max place-content-center place-items-center gap-1.5 md:gap-2 rounded-xl border border-black/5 bg-white text-black transition-colors duration-200 group-hover:bg-accent-yellow"
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] leading-none">
            {ctaLabel}
          </span>
          {isPro ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className="block shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="block shrink-0"
            >
              <path
                d="M17 11V8a5 5 0 0 0-10 0v3M6 11h12v9H6v-9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
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
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-gradient-to-br from-amber-950/25 via-[#0c0c0c] to-yellow-950/15 border border-accent-yellow/25 rounded-2xl p-6 md:p-8 mt-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 shadow-[0_0_0_1px_rgba(245,158,11,0.05),0_20px_50px_rgba(0,0,0,0.25)]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.18), transparent 50%)',
        }}
      />
      <div className="flex items-start gap-4 z-10">
        <div className="w-12 h-12 rounded-2xl bg-accent-yellow/15 border border-accent-yellow/30 flex items-center justify-center flex-shrink-0 text-accent-yellow">
          <span className="material-symbols-outlined !text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
        </div>
        <div className="min-w-0">
          <h4 className="font-mono text-base md:text-lg font-bold text-white uppercase tracking-wider mb-1">
            Unlock the full program directory
          </h4>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl leading-relaxed">
            Direct apply links, equity terms, deadlines, and templates — built for founders who ship.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 z-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {verifiedAvatars.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={url}
                alt=""
                className="w-7 h-7 rounded-full border-2 border-[#0c0c0c] object-cover"
              />
            ))}
          </div>
          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
            10,000+ founders
          </span>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 bg-accent-yellow text-black font-mono font-bold text-[11px] uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(245,158,11,0.3)]"
        >
          View plans
          <span className="material-symbols-outlined !text-[13px]">arrow_forward</span>
        </Link>
      </div>
    </motion.div>
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

type UnifiedProgram = CatalogProgram

export default function ProgramsGrid({ activeType, filters, initialIsPro }: ProgramsGridProps) {
  const { user, loading: authLoading } = useAuth()
  const [isPro, setIsPro] = useState(initialIsPro ?? false)
  const [checkingAccess, setCheckingAccess] = useState(initialIsPro === undefined)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [localPage, setLocalPage] = useState(1)
  // Static baseline + remote Supabase programs merged for full inventory
  const [catalog, setCatalog] = useState<UnifiedProgram[]>(() => getStaticPrograms())

  // Remote programs merge quietly: only append net-new rows so the first paint
  // order never reshuffles when Supabase responds.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/deals?scope=programs')
        const data = await res.json()
        if (!data?.success || !Array.isArray(data.deals) || cancelled) return
        const remote = data.deals
          .map((d: any) => fromSupabaseProgram(d))
          .filter(Boolean) as UnifiedProgram[]
        if (cancelled || remote.length === 0) return
        setCatalog((prev) => {
          const seen = new Set(prev.map((p) => p.slug.toLowerCase()))
          const extras = remote.filter((p) => !seen.has(p.slug.toLowerCase()))
          if (extras.length === 0) return prev // no visual change
          // Append only — preserve existing order (no re-sort / no shuffle)
          return [...prev, ...extras]
        })
      } catch {
        // keep static catalog
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

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

  const matchesStage = (founderStage?: string) => {
    if (!filters.stage || filters.stage === 'All') return true
    const s = (founderStage || '').toLowerCase()
    if (filters.stage === 'Idea') return s.includes('idea') || s.includes('pre-seed') || s.includes('early')
    if (filters.stage === 'MVP') return s.includes('mvp') || s.includes('seed') || s.includes('early')
    if (filters.stage === 'Growth') return s.includes('growth') || s.includes('series') || s.includes('scale')
    return true
  }

  const combinedPrograms = useMemo(() => {
    let list = catalog.filter((p) => {
      if (activeType === 'accelerators') return p.type === 'accelerator'
      if (activeType === 'incubators') return p.type === 'incubator'
      if (activeType === 'grants') return p.type === 'grant'
      return true // all
    })

    if (filters.region && filters.region !== 'All') {
      list = list.filter(
        (p) => p.region === filters.region || p.region === 'Global' || (p.location || '').includes(filters.region)
      )
    }
    if (filters.stage && filters.stage !== 'All') {
      list = list.filter((p) => matchesStage(p.founderStage))
    }
    if (searchLc) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLc) ||
          (p.location || '').toLowerCase().includes(searchLc) ||
          (p.focusArea || '').toLowerCase().includes(searchLc) ||
          p.description.toLowerCase().includes(searchLc)
      )
    }

    // Stable sorts only — never inject "Active first" on name sort (that caused
    // a mid-load reshuffle when remote rows arrived with different statuses).
    return [...list].sort((a, b) => {
      if (filters.sort === 'investment-high' || filters.sort === 'funding-high') {
        const av = parseInt((a.funding || '').replace(/[^0-9]/g, '') || '0')
        const bv = parseInt((b.funding || '').replace(/[^0-9]/g, '') || '0')
        if (bv !== av) return bv - av
        return a.name.localeCompare(b.name)
      }
      if (filters.sort === 'equity-low') {
        const ae = parseFloat((a.equity || '').replace('%', '') || '0')
        const be = parseFloat((b.equity || '').replace('%', '') || '0')
        if (ae !== be) return ae - be
        return a.name.localeCompare(b.name)
      }
      if (filters.sort === 'status') {
        const aActive = a.applicationStatus === 'Active' ? 0 : 1
        const bActive = b.applicationStatus === 'Active' ? 0 : 1
        if (aActive !== bActive) return aActive - bActive
        return a.name.localeCompare(b.name)
      }
      // Default / name — pure alphabetical, stable
      return a.name.localeCompare(b.name)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, activeType, filters.region, filters.stage, filters.sort, filters.subtype, searchLc])

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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#111] to-[#0a0a0a]"
      >
        <span className="material-symbols-outlined text-5xl text-gray-600 mb-3 block">search_off</span>
        <h3 className="text-lg font-bold text-white mb-1.5">No programs found</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Try clearing chips, switching tabs, or broadening region / stage filters.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Results meta bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-0.5">
        <p className="font-mono text-[11px] text-gray-500 dark:text-gray-400">
          <span className="font-bold text-gray-800 dark:text-gray-200">{totalVisible.toLocaleString()}</span>
          {' '}
          {activeType === 'all' ? 'programs' : activeType}
          {searchLc ? (
            <>
              {' '}matching <span className="text-accent-yellow font-semibold">&ldquo;{filters.search}&rdquo;</span>
            </>
          ) : null}
          {!isPro && totalVisible > FREE_LIMIT ? (
            <span className="text-gray-500"> · showing {FREE_LIMIT} free</span>
          ) : null}
        </p>
        {isPro && totalPages > 1 && (
          <p className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
            Page {currentPage}/{totalPages}
          </p>
        )}
      </div>

      <StaggerGrid
        // Only re-stagger on intentional user changes — not on silent catalog appends
        animKey={`${activeType}-${currentPage}-${searchLc}-${filters.region}-${filters.stage}-${filters.sort}`}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 md:gap-4"
      >
        {paginatedPrograms.map((prog) => (
          <StaggerGridItem key={`${prog.type}-${prog.slug}`} layout={false}>
            <ProgramCard
              name={prog.name}
              website={prog.website}
              logo={prog.logo}
              slug={prog.slug}
              badge={prog.applicationStatus === 'Active' ? 'Applications Open' : prog.applicationStatus}
              description={prog.description}
              funding={prog.funding}
              equity={prog.equity}
              duration={prog.duration}
              isPro={isPro}
              type={
                prog.type === 'program'
                  ? 'accelerator'
                  : (prog.type as 'accelerator' | 'incubator' | 'grant')
              }
            />
          </StaggerGridItem>
        ))}
      </StaggerGrid>

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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
