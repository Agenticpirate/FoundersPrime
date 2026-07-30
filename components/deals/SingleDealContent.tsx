'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { resolveDealApplicationUrl } from '@/lib/comprehensive-startup-urls'
import { useRouter } from 'next/navigation'
import { isProUser, isNextFounderUser, checkProStatus } from '@/lib/auth/user-context'
import ProUpgradeModal from '@/components/ProUpgradeModal'
import { claimDeal } from '@/app/actions/deal-actions'
import RichDescription from './RichDescription'
import { FadeUp, Reveal, RevealStagger, RevealItem } from '@/components/ui/premium-motion'
import { premiumEase } from '@/lib/premium-motion-variants'
import SingleDealCollapsibleList from './SingleDealCollapsibleList'
import SingleDealFaq from './SingleDealFaq'
import { formatDateMonthDay } from '@/lib/format-date'

interface Deal {
  id: string
  title: string
  provider: string
  category: string
  value: string
  status: string
  description: string
  stats: {
    appTime: string
    approval: string
    difficulty: string
    successRate: string
  }
  overview: string
  included: Array<{
    title: string
    description: string
  }>
  eligibility: string[]
  steps: Array<{
    title: string
    description: string
  }>
  faq: Array<{
    question: string
    answer: string
  }>
  similarDeals: Array<{
    title: string
    value: string
    description: string
    slug?: string
  }>
  verification: {
    lastVerified: string
    appliedCount: number | null
  }
  applicationUrl: string
  providerWebsite?: string
  actualDealUrl?: string
  detailedDescription?: string
  benefits?: string[]
  applicationInstructions?: string[]
  faqs?: Array<{ question: string; answer: string }>
  eligibilityDetails?: string[]
  enhancedValue?: string
  tags?: string[]
  /** True for accelerators / incubators / grants */
  isProgram?: boolean
}

interface SingleDealContentProps {
  deal: Deal
  freeAccess?: boolean
  basePath?: string
  /** Server-resolved pro status — eliminates the client-side loading flash */
  initialIsPro?: boolean
  /** Server-resolved next-founder status */
  initialIsNextFounder?: boolean
}

export default function SingleDealContent({
  deal,
  freeAccess = false,
  basePath = '/deals',
  initialIsPro = false,
  initialIsNextFounder = false,
}: SingleDealContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showCopied, setShowCopied] = useState(false)

  // Pro Access State — seed from server-resolved props so there's no flash
  // The useEffect below still runs to pick up any session changes on this page.
  const [isPro, setIsPro] = useState(freeAccess ? true : initialIsPro)
  const [isNextFounder, setIsNextFounder] = useState(freeAccess ? false : initialIsNextFounder)
  // Gate apply-click while status is still resolving (not rendered — ref avoids extra paints)
  const isLoadingProRef = useRef(freeAccess ? false : !initialIsPro && !initialIsNextFounder)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimError, setClaimError] = useState<string | null>(null)

  const router = useRouter()
  const reduceMotion = useReducedMotion()

  // Verify/refresh Pro status client-side.
  // If the server already told us the user is pro, we skip the API call
  // entirely (nothing to refresh). Otherwise we check so free users who
  // just upgraded in another tab still see the correct state.
  useEffect(() => {
    if (freeAccess) {
      setIsPro(true)
      isLoadingProRef.current = false
      return
    }
    // If server already confirmed pro, trust it — avoid a redundant round-trip
    if (initialIsPro || initialIsNextFounder) {
      isLoadingProRef.current = false
      return
    }
    const checkStatus = async () => {
      try {
        const status = await checkProStatus()
        setIsPro(status.isPro)
        setIsNextFounder(!!status.user?.isNextFounder)
      } catch (error) {
        console.error('Error checking pro status:', error)
      } finally {
        isLoadingProRef.current = false
      }
    }
    checkStatus()
  }, [freeAccess, initialIsPro, initialIsNextFounder])

  // Check if deal is saved on mount
  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const response = await fetch('/api/saved-deals')
        const data = await response.json()
        if (data.success && data.savedDeals) {
          setIsSaved(data.savedDeals.includes(deal.id))
        }
      } catch (error) {
        console.error('Error checking saved status:', error)
      }
    }
    checkSavedStatus()
  }, [deal.id])

  // Handle save/unsave
  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (isSaved) {
        const response = await fetch(`/api/saved-deals?dealSlug=${deal.id}`, {
          method: 'DELETE'
        })
        const data = await response.json()
        if (data.success) {
          setIsSaved(false)
        } else if (response.status === 401) {
          router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
        }
      } else {
        const response = await fetch('/api/saved-deals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dealSlug: deal.id })
        })
        const data = await response.json()
        if (data.success) {
          setIsSaved(true)
        } else if (response.status === 401) {
          router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
        }
      }
    } catch (error) {
      console.error('Error saving deal:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Handle share
  const handleShare = async (method: 'copy' | 'twitter' | 'linkedin' | 'email') => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const text = `Check out this deal: ${deal.title} - ${deal.value}`

    switch (method) {
      case 'copy':
        await navigator.clipboard.writeText(url)
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(`Deal: ${deal.title}`)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`
        break
    }
    setShowShareMenu(false)
  }

  // Use enhanced data if available
  const description = deal.detailedDescription || deal.overview
  const benefits = deal.benefits || deal.included
  const instructions = deal.applicationInstructions || deal.steps
  const eligibility = deal.eligibilityDetails || deal.eligibility
  const faqs = deal.faqs || deal.faq
  const displayValue = deal.enhancedValue || deal.value
  const isProgram = !!deal.isProgram ||
    /accelerator|incubator|grant/i.test(deal.category || '')
  const isDealInactive = /not active|inactive|expired|closed|ended/i.test(deal.status || '')

  // Prefer real apply link; rewrite Google-search placeholders to official URLs
  const applicationUrl = resolveDealApplicationUrl(deal)

  const statCards = isProgram
    ? [
        { label: 'Duration', value: deal.stats.appTime, icon: 'schedule', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/10' },
        { label: 'Equity', value: deal.stats.approval, icon: 'pie_chart', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
        { label: 'Funding', value: deal.stats.difficulty, icon: 'payments', color: 'text-amber-700 dark:text-accent-yellow', bg: 'bg-amber-50 dark:bg-accent-yellow/10' },
        { label: 'Selectivity', value: deal.stats.successRate, icon: 'military_tech', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
      ]
    : [
        { label: 'Timeline', value: deal.stats.appTime, icon: 'timer', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/10' },
        { label: 'Approval', value: deal.stats.approval, icon: 'task_alt', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
        { label: 'Difficulty', value: deal.stats.difficulty, icon: 'speed', color: 'text-amber-700 dark:text-accent-yellow', bg: 'bg-amber-50 dark:bg-accent-yellow/10' },
        { label: 'Signal', value: deal.stats.successRate, icon: 'trending_up', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
      ]

  const applyLabel = isDealInactive
    ? 'Not Active'
    : isClaiming
      ? 'Claiming…'
    : freeAccess || isPro || isNextFounder
      ? (isProgram ? 'Apply to program' : 'Apply Now')
      : (isProgram ? 'Unlock to apply' : 'Apply Now (Premium)')

  // Handle Application Click
  const handleApplyClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (isLoadingProRef.current || isClaiming) {
      return
    }

    setClaimError(null)

    if (isDealInactive) {
      setClaimError('This deal is no longer active.')
      return
    }

    if (freeAccess) {
      const w = window.open(applicationUrl, '_blank')
      if (w) w.opener = null
      return
    }

    if (!isPro && !isNextFounder) {
      setShowUpgradeModal(true)
      return
    }

    // Fast path — Pro/admin users have no limits to track. Open the tab
    // directly inside the click gesture (no popup blocker issues, no
    // current-tab navigation surprise) and don't bother awaiting the
    // server claim. We can still record the click in the background.
    if (isPro) {
      const w = window.open(applicationUrl, '_blank')
      if (w) w.opener = null
      // Fire-and-forget tracking — best effort, ignore failures
      claimDeal(deal.id, applicationUrl).catch(() => {})
      return
    }

    // NextFounder users — must validate weekly/monthly limits before opening.
    // Open a placeholder synchronously inside the click gesture (without
    // `noopener` so we KEEP the window reference; we set `opener=null`
    // ourselves once redirected). On server response, redirect the
    // placeholder. On error, close it and surface the error in-page.
    const placeholder = window.open('about:blank', '_blank')

    setIsClaiming(true)
    try {
      const result = await claimDeal(deal.id, applicationUrl)
      if (result.success && result.url) {
        if (placeholder && !placeholder.closed) {
          try { placeholder.opener = null } catch {}
          placeholder.location.href = result.url
        }
        // If popup was blocked entirely, just surface the URL — DON'T
        // navigate the current tab away.
        if (!placeholder) {
          setClaimError('Popup blocked. Please allow popups for this site and try again.')
        }
        if (result.usage) {
          const { weeklyUsed, weeklyLimit, monthlyUsed, monthlyLimit } = result.usage
          const weeklyLeft = weeklyLimit - weeklyUsed
          const monthlyLeft = monthlyLimit - monthlyUsed
          if (weeklyLeft <= 2 || monthlyLeft <= 5) {
            setClaimError(`⚡ ${weeklyLeft} claims left this week · ${monthlyLeft} left this month`)
          }
        }
      } else {
        if (placeholder && !placeholder.closed) placeholder.close()
        setClaimError(result.error || 'Failed to apply.')
        if (result.limitReached) {
          setShowUpgradeModal(true)
        }
      }
    } catch (err) {
      if (placeholder && !placeholder.closed) placeholder.close()
      setClaimError('An unexpected error occurred.')
    } finally {
      setIsClaiming(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
      {/* Sidebar — shown FIRST on mobile (Apply box top) */}
      <div className="lg:col-span-1 order-first lg:order-last">
        <FadeUp delay={0.08} className="lg:sticky lg:top-24 space-y-4">

          {/* Apply Box — premium minimal */}
          <div className="relative rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
            {/* Decorative mandala in top-right */}
            <div className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none opacity-[0.08]" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-white deal-apply-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
                <circle cx="100" cy="100" r="50" />
                <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
                {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => (
                  <line
                    key={`mandala-ray-${deg}`}
                    x1="100"
                    y1="100"
                    x2={100 + Math.cos((deg * Math.PI) / 180) * 90}
                    y2={100 + Math.sin((deg * Math.PI) / 180) * 90}
                  />
                ))}
                <circle cx="100" cy="100" r="2" fill="currentColor" />
              </svg>
            </div>

            <div className="relative p-5">
              <AnimatePresence mode="wait">
                {claimError && (
                  <m.div
                    key={claimError}
                    initial={reduceMotion ? false : { opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -4, height: 0 }}
                    transition={{ duration: 0.25, ease: premiumEase }}
                    className={`mb-3 px-3 py-2 text-[11px] font-semibold rounded-sm border-2 overflow-hidden ${claimError.startsWith('⚡') ? 'bg-amber-50 text-amber-800 border-amber-400 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50' : 'bg-red-50 text-red-700 border-red-400 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900/50'}`}
                  >
                    {claimError.startsWith('⚡') ? claimError : `⚠️ ${claimError}`}
                  </m.div>
                )}
              </AnimatePresence>

              {/* Value display */}
              <div className="mb-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
                <div className="text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 font-mono tracking-[0.12em] mb-1">
                  {isProgram ? 'Funding / Offer' : 'Deal Value'}
                </div>
                <m.div
                  className="text-2xl md:text-3xl font-black font-mono text-black dark:text-white leading-none"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.12, ease: premiumEase }}
                >
                  {displayValue}
                </m.div>
              </div>

              {/* Stat rows */}
              <div className="space-y-2 mb-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
                {(isProgram
                  ? [
                      { icon: 'schedule', label: 'Duration', value: deal.stats.appTime },
                      { icon: 'pie_chart', label: 'Equity', value: deal.stats.approval },
                      { icon: 'event', label: 'Status', value: deal.status || 'Open', accent: true },
                    ]
                  : [
                      { icon: 'timer', label: 'Time', value: deal.stats.appTime },
                      { icon: 'task_alt', label: 'Approval', value: deal.stats.approval },
                      { icon: 'event', label: 'Deadline', value: 'Rolling', accent: true },
                    ]
                ).map((row, i) => (
                  <m.div
                    key={row.label}
                    className="flex justify-between items-center gap-3 text-[12.5px]"
                    initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.14 + i * 0.05, duration: 0.35, ease: premiumEase }}
                  >
                    <span className="text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5 shrink-0">
                      <span className="material-symbols-outlined text-[14px] text-gray-500 dark:text-gray-400">{row.icon}</span>
                      {row.label}
                    </span>
                    <span className={`font-bold font-mono text-right truncate ${row.accent ? 'text-amber-700 dark:text-accent-yellow' : 'text-black dark:text-white'}`}>
                      {row.value}
                    </span>
                  </m.div>
                ))}
              </div>

              {/* Apply button — soft sheen + press */}
              <m.button
                onClick={handleApplyClick}
                disabled={isClaiming || isDealInactive}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2, ease: premiumEase }}
                className="group relative w-full h-12 bg-accent-yellow text-black font-mono font-black text-[12px] uppercase tracking-[0.08em] rounded-xl border border-black/10 shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:bg-amber-300 hover:shadow-[0_8px_24px_rgba(245,158,11,0.35)] transition-colors duration-300 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mb-2 overflow-hidden leading-none"
              >
                {!reduceMotion && (
                  <m.span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    initial={{ x: '-120%' }}
                    animate={{ x: '320%' }}
                    transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.2, ease: 'easeInOut' }}
                  />
                )}
                <span className="relative leading-none translate-y-px">{applyLabel}</span>
                <span className="material-symbols-outlined relative !text-[18px] !leading-none !w-[18px] !h-[18px] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  {isClaiming ? 'hourglass_empty' : (freeAccess || isPro || isNextFounder ? 'arrow_forward' : 'lock')}
                </span>
              </m.button>

              {/* Save / Share */}
              <div className="grid grid-cols-2 gap-2">
                <button type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`rounded-sm border-2 border-black dark:border-white/10 py-2 font-mono text-[11px] font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-1.5 hover:shadow-[2px_2px_0px_#111] dark:hover:shadow-none hover:-translate-x-px hover:-translate-y-px ${
                    isSaved
                      ? 'bg-accent-yellow text-black border-black dark:border-black'
                      : 'bg-white dark:bg-white/5 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/10'
                  } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="material-symbols-outlined !text-[15px]">{isSaved ? 'bookmark_added' : 'bookmark'}</span>
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                <div className="relative">
                  <button type="button"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-full rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-white/5 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 hover:shadow-[2px_2px_0px_#111] dark:hover:shadow-none hover:-translate-x-px hover:-translate-y-px transition-all flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined !text-[15px]">ios_share</span> Share
                  </button>
                  <AnimatePresence>
                    {showShareMenu && (
                      <m.div
                        initial={reduceMotion ? false : { opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: premiumEase }}
                        className="absolute bottom-full left-0 right-0 mb-1.5 bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 rounded-sm shadow-[3px_3px_0px_#111] dark:shadow-none z-50 overflow-hidden origin-bottom"
                      >
                        <button type="button" onClick={() => handleShare('copy')} className="w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2 text-black dark:text-white">
                          <span className="material-symbols-outlined !text-[14px]">content_copy</span>
                          {showCopied ? 'Copied!' : 'Copy Link'}
                        </button>
                        <button type="button" onClick={() => handleShare('twitter')} className="w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2 text-black dark:text-white border-t border-gray-200 dark:border-t-white/10">
                          <span className="material-symbols-outlined !text-[14px]">share</span>Share on X
                        </button>
                        <button type="button" onClick={() => handleShare('linkedin')} className="w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2 text-black dark:text-white border-t border-gray-200 dark:border-t-white/10">
                          <span className="material-symbols-outlined !text-[14px]">work</span>LinkedIn
                        </button>
                        <button type="button" onClick={() => handleShare('email')} className="w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2 text-black dark:text-white border-t border-gray-200 dark:border-t-white/10">
                          <span className="material-symbols-outlined !text-[14px]">mail</span>Email
                        </button>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-4 shadow-[3px_3px_0px_#111] dark:shadow-none">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300 mb-3 pb-2 border-b-2 border-black dark:border-b-white/10 border-dashed">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <button type="button" onClick={handleApplyClick} className="w-full flex items-center gap-2 text-[12.5px] font-bold text-black dark:text-white hover:bg-accent-yellow/15 dark:hover:bg-white/5 rounded-sm px-2 py-1.5 transition-colors">
                  <span className="material-symbols-outlined !text-[16px] text-accent-yellow">open_in_new</span>
                  {isProgram ? 'Apply to program' : 'Apply for deal'}
                </button>
              </li>
              <li>
                {(() => {
                  const isDofollow = deal.tags?.includes('dofollow');
                  const providerName = deal.provider || deal.title || 'provider'
                  const targetUrl =
                    deal.providerWebsite ||
                    `https://www.${providerName.toLowerCase().replace(/\s+/g, '')}.com`
                  return (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel={isDofollow ? "noopener noreferrer" : "nofollow noopener noreferrer"}
                      className="flex items-center justify-between gap-2 text-[12.5px] font-bold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-sm px-2 py-1.5 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined !text-[16px] text-sky-500">info</span>
                        About {providerName}
                      </span>
                      {isDofollow && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/25 rounded-sm px-1.5 py-0.5">
                          <span className="w-1 h-1 rounded-full bg-accent-yellow animate-pulse" />
                          SEO Dofollow Verified
                        </span>
                      )}
                    </a>
                  );
                })()}
              </li>
            </ul>
          </div>

          {/* Trust Stats — neo-brutalist dark with mandala */}
          <div className="hidden md:block relative rounded-sm bg-black dark:bg-[#0c0c0c] text-white p-5 overflow-hidden border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_rgba(255,221,0,0.5)] dark:shadow-none">
            <div className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.18]" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full text-accent-yellow deal-apply-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
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
            <div className="relative">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-accent-yellow mb-2">
                · Trust Signal
              </p>
              {typeof deal.verification.appliedCount === 'number' && deal.verification.appliedCount > 0 ? (
                <>
                  <p className="font-mono text-2xl font-black leading-none text-white mb-1.5 tabular-nums">
                    {deal.verification.appliedCount.toLocaleString()}+
                  </p>
                  <p className="text-[11.5px] text-gray-400 leading-relaxed mb-3">
                    Founders applied through FoundersPrime. Last verified{' '}
                    {formatDateMonthDay(deal.verification.lastVerified)}.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-mono text-2xl font-black leading-none text-white mb-1.5 tabular-nums">
                    Verified
                  </p>
                  <p className="text-[11.5px] text-gray-400 leading-relaxed mb-3">
                    Manually checked by the FoundersPrime team. Last verified{' '}
                    {formatDateMonthDay(deal.verification.lastVerified)}.
                  </p>
                </>
              )}
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wide text-accent-yellow">
                <span className="material-symbols-outlined !text-[14px]">verified</span>
                <span>Hand-verified deal</span>
              </div>
            </div>
          </div>

          {/* Bottom mandala tile — premium ornament */}
          <div className="hidden md:block relative rounded-sm bg-gray-50 dark:bg-white/5 border-2 border-black dark:border-white/10 p-5 overflow-hidden shadow-[3px_3px_0px_#111] dark:shadow-none">
            <div className="absolute -bottom-10 -left-10 w-36 h-36 pointer-events-none opacity-[0.10]" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-white deal-apply-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.6">
                {[20, 35, 50, 65].map((r, orbitIdx) => (
                  <ellipse
                    key={`apply-orbit-${r}`}
                    cx="100"
                    cy="100"
                    rx={r}
                    ry={r / 1.8}
                    transform={`rotate(${orbitIdx * 30} 100 100)`}
                  />
                ))}
                <circle cx="100" cy="100" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className="relative">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-gray-700 dark:text-gray-300 mb-1.5">
                · Founder Tip
              </p>
              <p className="text-[12px] text-gray-700 dark:text-gray-300 leading-relaxed">
                Apply with a <span className="font-bold text-black dark:text-white bg-accent-yellow/40 dark:bg-accent-yellow/20 px-1">company email</span> matching your domain. Approval rates jump <span className="font-bold text-black dark:text-white">3×</span> when emails match.
              </p>
            </div>
          </div>

          <style jsx>{`
            @keyframes dealApplyMandalaSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes dealApplyMandalaSpinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
            :global(.deal-apply-mandala-spin) {
              animation: dealApplyMandalaSpin 90s linear infinite;
              transform-origin: center;
            }
            :global(.deal-apply-mandala-spin-reverse) {
              animation: dealApplyMandalaSpinReverse 110s linear infinite;
              transform-origin: center;
            }
            @media (prefers-reduced-motion: reduce) {
              :global(.deal-apply-mandala-spin),
              :global(.deal-apply-mandala-spin-reverse) { animation: none; }
            }
          `}</style>
        </FadeUp>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-4 order-last lg:order-first">

        {/* Quick Stats Bar */}
        <FadeUp delay={0.04}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
            {statCards.map((s, i) => (
              <m.div
                key={s.label}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.2 } }}
                transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease: premiumEase }}
                className="rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-3 md:p-3.5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] hover:border-accent-yellow/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-colors duration-300"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                    <span className={`material-symbols-outlined !text-[14px] ${s.color}`}>{s.icon}</span>
                  </div>
                  <div className="text-[9px] md:text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 font-mono tracking-[0.1em] leading-none">{s.label}</div>
                </div>
                <div className="text-[12px] md:text-sm font-black text-black dark:text-white font-mono leading-tight truncate" title={String(s.value)}>
                  {s.value}
                </div>
              </m.div>
            ))}
          </div>
        </FadeUp>

        {/* Overview Section */}
        {description && description.length > 10 && (
        <Reveal>
        <section className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h2 className="mb-3 flex items-center gap-2.5 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-accent-yellow/90 shadow-sm">
              <span className="material-symbols-outlined text-black !text-[16px]">info</span>
            </span>
            {isProgram ? 'About this program' : 'About this deal'}
          </h2>
          <RichDescription text={description} />
        </section>
        </Reveal>
        )}

        {/* What's Included / Benefits */}
        {Array.isArray(benefits) && benefits.length > 0 && (
        <SingleDealCollapsibleList
          icon="inventory_2"
          title={deal.benefits ? 'Benefits & Features' : "What's Included"}
          count={benefits.length}
          items={benefits as any[]}
          maxVisible={6}
          renderItem={(item: any) => (
            <div
              className="flex items-start gap-2.5 p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.03] hover:border-accent-yellow/30 hover:bg-accent-yellow/[0.04] transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-accent-yellow flex-shrink-0 !text-[16px] mt-0.5">check_circle</span>
              <div className="min-w-0">
                {typeof item === 'string' ? (
                  <p className="text-[12.5px] font-medium text-gray-800 dark:text-gray-200 leading-snug">{item}</p>
                ) : (
                  <>
                    <h3 className="font-bold font-mono text-[12px] text-black dark:text-white mb-0.5">{item.title}</h3>
                    <p className="text-[11.5px] text-gray-600 dark:text-gray-300 leading-snug">{item.description}</p>
                  </>
                )}
              </div>
            </div>
          )}
          gridClass="grid md:grid-cols-2 gap-2.5"
        />
        )}

        {/* Eligibility Requirements */}
        {eligibility && eligibility.length > 0 && (
        <SingleDealCollapsibleList
          icon="checklist"
          title="Eligibility"
          count={eligibility.length}
          items={eligibility as any[]}
          maxVisible={5}
          renderItem={(requirement: string) => (
            <li
              className="flex items-start gap-2.5 px-3 py-2.5 list-none rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.03] hover:border-accent-yellow/30 hover:bg-accent-yellow/[0.04] transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-accent-yellow flex-shrink-0 !text-[16px] mt-0.5">check_circle</span>
              <span className="text-[12.5px] font-medium text-gray-800 dark:text-gray-200 leading-snug">{requirement}</span>
            </li>
          )}
          listMode="ul"
          gridClass="grid md:grid-cols-2 gap-2.5"
        />
        )}

        {/* How to Apply — clean timeline (segment connectors, no odd full-height rail) */}
        {instructions && instructions.length > 0 && (
        <Reveal>
        <section className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
            <h2 className="flex items-center gap-2.5 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-accent-yellow shadow-sm">
                <span className="material-symbols-outlined text-black !text-[16px]">directions_run</span>
              </span>
              How to Apply
            </h2>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/[0.04] px-2.5 py-1 rounded-lg border border-black/[0.06] dark:border-white/[0.08]">
              {instructions.length} steps
            </span>
          </div>

          <ol className="m-0 list-none p-0">
            {instructions.map((step, index) => {
              const isString = typeof step === 'string'
              const rawText = isString ? (step as string) : (step as { description: string }).description
              const rawTitle = isString ? null : (step as { title: string }).title
              // Drop redundant "Step 1" / "Step 1." titles — number badge already shows the index
              const title =
                rawTitle && !/^step\s*\d+\.?$/i.test(rawTitle.trim())
                  ? rawTitle.replace(/\.\s*$/, '')
                  : null
              // Also strip a leading "Step N." from the body if the data baked it in
              const text = (rawText || '').replace(/^step\s*\d+\.?\s*/i, '')
              const isLast = index === instructions.length - 1
              const isFirst = index === 0

              return (
                <m.li
                  key={title ? `${title}-${text.slice(0, 32)}` : text.slice(0, 64) || `step-${index + 1}`}
                  className="flex gap-3.5"
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-12px' }}
                  transition={{ delay: Math.min(index, 6) * 0.04, duration: 0.3, ease: premiumEase }}
                >
                  {/* Number + segment connector (only between badges — no floating full rail) */}
                  <div className="flex w-8 flex-col items-center shrink-0">
                    <div
                      className={`relative z-[1] flex h-8 w-8 items-center justify-center rounded-xl font-mono text-[12px] font-black tabular-nums ${
                        isFirst
                          ? 'bg-accent-yellow text-black shadow-[0_0_0_4px_rgba(255,213,0,0.12)]'
                          : isLast
                            ? 'bg-white dark:bg-white/10 text-black dark:text-white border border-black/[0.08] dark:border-white/15'
                            : 'bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-gray-100 border border-black/[0.06] dark:border-white/10'
                      }`}
                    >
                      {index + 1}
                    </div>
                    {!isLast && (
                      <div
                        className="my-1 w-px flex-1 min-h-[18px] bg-gradient-to-b from-black/15 via-black/10 to-black/15 dark:from-white/20 dark:via-white/10 dark:to-white/15"
                        aria-hidden
                      />
                    )}
                  </div>

                  {/* Copy */}
                  <div className={`min-w-0 flex-1 ${isLast ? 'pb-1' : 'pb-5'}`}>
                    <div className="rounded-xl border border-black/[0.05] dark:border-white/[0.06] bg-gray-50/80 dark:bg-white/[0.025] px-3.5 py-3">
                      {title && (
                        <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-amber-700 dark:text-accent-yellow">
                          {title}
                        </p>
                      )}
                      <p className="text-[13px] leading-relaxed text-gray-700 dark:text-gray-200">
                        {text}
                      </p>
                    </div>
                  </div>
                </m.li>
              )
            })}
          </ol>

          {/* Apply button */}
          <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
            <m.button
              onClick={handleApplyClick}
              disabled={isClaiming}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="group inline-flex h-11 items-center justify-center gap-2 bg-accent-yellow text-black font-mono font-black px-6 text-[12px] uppercase tracking-[0.08em] rounded-xl border border-black/10 shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:bg-amber-300 hover:shadow-[0_8px_24px_rgba(245,158,11,0.35)] transition-colors cursor-pointer disabled:opacity-50 leading-none"
            >
              <span className="leading-none">
                {isClaiming ? 'Claiming…' : (isProgram ? 'Apply to program' : 'Apply Now')}
              </span>
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
            </m.button>
          </div>
        </section>
        </Reveal>
        )}

        <SingleDealFaq faqs={faqs} openFaqIndex={openFaqIndex} setOpenFaqIndex={setOpenFaqIndex} />

        {/* Similar programs */}
        {Array.isArray(deal.similarDeals) && deal.similarDeals.length > 0 && (
        <Reveal delay={0.05}>
          <section className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <h2 className="flex items-center gap-2.5 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-accent-yellow/90 shadow-sm">
                  <span className="material-symbols-outlined text-black !text-[16px]">hub</span>
                </span>
                {isProgram ? 'Similar programs' : 'Similar deals'}
              </h2>
              <Link
                href={isProgram ? '/programs' : '/deals'}
                className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-accent-yellow transition-colors inline-flex items-center gap-1"
              >
                View all
                <span className="material-symbols-outlined !text-[14px]">arrow_forward</span>
              </Link>
            </div>
            <RevealStagger className="grid sm:grid-cols-2 gap-3">
              {deal.similarDeals.slice(0, 4).map((sim, i) => {
                const href = sim.slug ? `${basePath}/${sim.slug}` : '/programs'
                return (
                  <RevealItem key={sim.slug || sim.title}>
                    <Link
                      href={href}
                      className="group h-full rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-gray-50/80 dark:bg-white/[0.02] p-3.5 hover:border-accent-yellow/40 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="font-mono text-[13px] font-bold text-black dark:text-white group-hover:text-accent-yellow transition-colors line-clamp-1">
                          {sim.title}
                        </p>
                      </div>
                      {sim.value && (
                        <p className="font-mono text-[11px] font-bold text-amber-700 dark:text-accent-yellow mb-1 truncate">
                          {sim.value}
                        </p>
                      )}
                      <p className="text-[11.5px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3 flex-grow">
                        {sim.description}
                      </p>
                      <span className="mt-auto inline-flex h-8 items-center justify-center gap-1 self-start bg-black dark:bg-white text-white dark:text-black group-hover:bg-accent-yellow group-hover:text-black font-mono text-[9px] font-bold uppercase tracking-wide px-2.5 rounded-md transition-all duration-200 leading-none">
                        <span className="leading-none translate-y-px">{isProgram ? 'View program' : 'View deal'}</span>
                        <span className="material-symbols-outlined !text-[12px] !leading-none !w-3 !h-3 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                          arrow_forward
                        </span>
                      </span>
                    </Link>
                  </RevealItem>
                )
              })}
            </RevealStagger>
          </section>
        </Reveal>
        )}

        {/* Tags */}
        {Array.isArray(deal.tags) && deal.tags.length > 0 && (
        <Reveal delay={0.08}>
        <section className="relative rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-gray-50/80 dark:bg-[#0c0c0c] p-5 md:p-6 overflow-hidden">
          <div className="relative">
            <h2 className="mb-3 flex items-center gap-2.5 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-accent-yellow/90 shadow-sm">
                <span className="material-symbols-outlined text-black !text-[16px]">tag</span>
              </span>
              Tags &amp; categories
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {deal.tags.map((tag, tagIdx) => (
                <m.span
                  key={tag}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: tagIdx * 0.03, duration: 0.3, ease: premiumEase }}
                  whileHover={reduceMotion ? undefined : { y: -1, scale: 1.03 }}
                  className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono font-semibold tracking-wide text-gray-700 dark:text-gray-200 bg-white dark:bg-white/5 border border-black/[0.06] dark:border-white/[0.08] rounded-full hover:border-accent-yellow/50 hover:bg-accent-yellow/15 transition-colors duration-200"
                >
                  #{tag}
                </m.span>
              ))}
            </div>
          </div>
        </section>
        </Reveal>
        )}

      </div>

      <ProUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        isStudentBenefit={basePath === '/student-benefits'}
      />
    </div>
  )
}
