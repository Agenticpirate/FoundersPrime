'use client'

import { useState, useEffect } from 'react'
import { getStartupProgramUrl } from '@/lib/comprehensive-startup-urls'
import { useRouter } from 'next/navigation'
import { isProUser, isNextFounderUser, checkProStatus } from '@/lib/auth/user-context'
import ProUpgradeModal from '@/components/ProUpgradeModal'
import { claimDeal } from '@/app/actions/deal-actions'
import RichDescription from './RichDescription'

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
  // Only show loading spinner if we have no server-side hint AND not freeAccess
  const [isLoadingPro, setIsLoadingPro] = useState(freeAccess ? false : !initialIsPro && !initialIsNextFounder)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimError, setClaimError] = useState<string | null>(null)

  const router = useRouter()

  // Verify/refresh Pro status client-side.
  // If the server already told us the user is pro, we skip the API call
  // entirely (nothing to refresh). Otherwise we check so free users who
  // just upgraded in another tab still see the correct state.
  useEffect(() => {
    if (freeAccess) {
      setIsPro(true)
      setIsLoadingPro(false)
      return
    }
    // If server already confirmed pro, trust it — avoid a redundant round-trip
    if (initialIsPro || initialIsNextFounder) {
      setIsLoadingPro(false)
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
        setIsLoadingPro(false)
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

  // Use the deal's application URL directly, fallback to provider URL mapping only if not set
  const applicationUrl = deal.applicationUrl || deal.actualDealUrl || getStartupProgramUrl(deal.provider)

  // Handle Application Click
  const handleApplyClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (isLoadingPro || isClaiming) {
      return
    }

    setClaimError(null)

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
      {/* Sidebar — shown FIRST on mobile (Apply box top) */}
      <div className="lg:col-span-1 order-first lg:order-last">
        <div className="lg:sticky lg:top-24 space-y-4">

          {/* Apply Box — neo-brutalist premium */}
          <div className="relative rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] shadow-[4px_4px_0px_#111] dark:shadow-none overflow-hidden">
            {/* Decorative mandala in top-right */}
            <div className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none opacity-[0.08]" aria-hidden="true">
              <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-white deal-apply-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
                <circle cx="100" cy="100" r="50" />
                <circle cx="100" cy="100" r="35" strokeDasharray="3 3" />
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={100 + Math.cos((i * Math.PI) / 6) * 90}
                    y2={100 + Math.sin((i * Math.PI) / 6) * 90}
                  />
                ))}
                <circle cx="100" cy="100" r="2" fill="currentColor" />
              </svg>
            </div>

            <div className="relative p-5">
              {claimError && (
                <div className={`mb-3 px-3 py-2 text-[11px] font-semibold rounded-sm border-2 ${claimError.startsWith('⚡') ? 'bg-amber-50 text-amber-800 border-amber-400 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50' : 'bg-red-50 text-red-700 border-red-400 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900/50'}`}>
                  {claimError.startsWith('⚡') ? claimError : `⚠️ ${claimError}`}
                </div>
              )}

              {/* Value display */}
              <div className="mb-4 pb-4 border-b-2 border-black dark:border-b-white/10 border-dashed">
                <div className="text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 font-mono tracking-[0.12em] mb-1">Deal Value</div>
                <div className="text-2xl md:text-3xl font-black font-mono text-black dark:text-white leading-none">
                  {displayValue}
                </div>
              </div>

              {/* Stat rows */}
              <div className="space-y-2 mb-4 pb-4 border-b-2 border-black dark:border-b-white/10 border-dashed">
                <div className="flex justify-between items-center text-[12.5px]">
                  <span className="text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-gray-500 dark:text-gray-400">timer</span>
                    Time
                  </span>
                  <span className="font-bold font-mono text-black dark:text-white">{deal.stats.appTime}</span>
                </div>
                <div className="flex justify-between items-center text-[12.5px]">
                  <span className="text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-gray-500 dark:text-gray-400">task_alt</span>
                    Approval
                  </span>
                  <span className="font-bold font-mono text-black dark:text-white">{deal.stats.approval}</span>
                </div>
                <div className="flex justify-between items-center text-[12.5px]">
                  <span className="text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-gray-500 dark:text-gray-400">event</span>
                    Deadline
                  </span>
                  <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">Rolling</span>
                </div>
              </div>

              {/* Apply button — neo-brutalist */}
              <button
                onClick={handleApplyClick}
                disabled={isClaiming}
                className="group relative w-full bg-accent-yellow text-black font-mono font-black py-3 text-[12.5px] uppercase tracking-[0.1em] rounded-sm border-2 border-black shadow-[3px_3px_0px_#111] hover:bg-amber-300 hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mb-2"
              >
                <span className="relative">
                  {isClaiming
                    ? 'Claiming…'
                    : freeAccess
                      ? 'Apply Now'
                      : (isPro || isNextFounder) ? 'Apply Now' : 'Apply Now (Premium)'}
                </span>
                <span className="material-symbols-outlined relative !text-[18px] group-hover:translate-x-0.5 transition-transform">
                  {isClaiming ? 'hourglass_empty' : (freeAccess || isPro || isNextFounder ? 'arrow_forward' : 'lock')}
                </span>
              </button>

              {/* Save / Share */}
              <div className="grid grid-cols-2 gap-2">
                <button
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
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-full rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-white/5 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 hover:shadow-[2px_2px_0px_#111] dark:hover:shadow-none hover:-translate-x-px hover:-translate-y-px transition-all flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined !text-[15px]">ios_share</span> Share
                  </button>
                  {showShareMenu && (
                    <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-white dark:bg-[#0c0c0c] border-2 border-black dark:border-white/10 rounded-sm shadow-[3px_3px_0px_#111] dark:shadow-none z-50 overflow-hidden">
                      <button onClick={() => handleShare('copy')} className="w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2 text-black dark:text-white">
                        <span className="material-symbols-outlined !text-[14px]">content_copy</span>
                        {showCopied ? 'Copied!' : 'Copy Link'}
                      </button>
                      <button onClick={() => handleShare('twitter')} className="w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2 text-black dark:text-white border-t border-gray-200 dark:border-t-white/10">
                        <span className="material-symbols-outlined !text-[14px]">share</span>Share on X
                      </button>
                      <button onClick={() => handleShare('linkedin')} className="w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2 text-black dark:text-white border-t border-gray-200 dark:border-t-white/10">
                        <span className="material-symbols-outlined !text-[14px]">work</span>LinkedIn
                      </button>
                      <button onClick={() => handleShare('email')} className="w-full px-3 py-2 text-left text-[11px] font-bold hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2 text-black dark:text-white border-t border-gray-200 dark:border-t-white/10">
                        <span className="material-symbols-outlined !text-[14px]">mail</span>Email
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-4 shadow-[3px_3px_0px_#111] dark:shadow-none">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300 mb-3 pb-2 border-b-2 border-black dark:border-b-white/10 border-dashed">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <button onClick={handleApplyClick} className="w-full flex items-center gap-2 text-[12.5px] font-bold text-black dark:text-white hover:bg-accent-yellow/15 dark:hover:bg-white/5 rounded-sm px-2 py-1.5 transition-colors">
                  <span className="material-symbols-outlined !text-[16px] text-accent-yellow">open_in_new</span>
                  Apply for Deal
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
                      rel={isDofollow ? "noopener" : "nofollow noopener noreferrer"}
                      className="flex items-center justify-between gap-2 text-[12.5px] font-bold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-sm px-2 py-1.5 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined !text-[16px] text-sky-500">info</span>
                        About {providerName}
                      </span>
                      {isDofollow && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-sm px-1.5 py-0.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
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
                    {new Date(deal.verification.lastVerified).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-mono text-2xl font-black leading-none text-white mb-1.5 tabular-nums">
                    Verified
                  </p>
                  <p className="text-[11.5px] text-gray-400 leading-relaxed mb-3">
                    Manually checked by the FoundersPrime team. Last verified{' '}
                    {new Date(deal.verification.lastVerified).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.
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
                {[20, 35, 50, 65].map((r, i) => (
                  <ellipse
                    key={i}
                    cx="100"
                    cy="100"
                    rx={r}
                    ry={r / 1.8}
                    transform={`rotate(${i * 30} 100 100)`}
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
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-4 order-last lg:order-first">

        {/* Quick Stats Bar — neo-brutalist tiles */}
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {[
            { label: 'Time', value: deal.stats.appTime, icon: 'timer', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-100' },
            { label: 'Approval', value: deal.stats.approval, icon: 'task_alt', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100' },
            { label: 'Difficulty', value: deal.stats.difficulty, icon: 'speed', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100' },
            { label: 'Success', value: deal.stats.successRate, icon: 'trending_up', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100' },
          ].map((s) => (
            <div key={s.label} className="rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-2.5 md:p-3 shadow-[2px_2px_0px_#111] dark:shadow-none hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all">
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-6 h-6 rounded-sm border-2 border-black dark:border-white/10 flex items-center justify-center flex-shrink-0 ${s.bg} dark:bg-white/5`}>
                  <span className={`material-symbols-outlined !text-[13px] ${s.color}`}>{s.icon}</span>
                </div>
                <div className="text-[9px] md:text-[10px] font-bold uppercase text-gray-600 dark:text-gray-400 font-mono tracking-[0.1em]">{s.label}</div>
              </div>
              <div className="text-[12px] md:text-sm font-black text-black dark:text-white font-mono leading-tight truncate">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Overview Section */}
        {description && description.length > 10 && (
        <section className="rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-5 shadow-[3px_3px_0px_#111] dark:shadow-none">
          <h2 className="mb-3 flex items-center gap-2 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white pb-2 border-b-2 border-black dark:border-b-white/10 border-dashed">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-accent-yellow border-2 border-black dark:border-white/10">
              <span className="material-symbols-outlined text-black !text-[16px]">info</span>
            </span>
            About This Deal
          </h2>
          <RichDescription text={description} />
        </section>
        )}

        {/* What's Included / Benefits */}
        {Array.isArray(benefits) && benefits.length > 0 && (
        <CollapsibleList
          icon="inventory_2"
          title={deal.benefits ? 'Benefits & Features' : "What's Included"}
          count={benefits.length}
          items={benefits as any[]}
          maxVisible={6}
          renderItem={(item: any, index: number) => (
            <div key={index} className="flex items-start gap-2 p-2.5 bg-white dark:bg-[#0c0c0c] rounded-sm border-2 border-black dark:border-white/10 shadow-[2px_2px_0px_#111] dark:shadow-none hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all">
              <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 flex-shrink-0 !text-[16px] mt-0.5">check_circle</span>
              <div className="min-w-0">
                {typeof item === 'string' ? (
                  <p className="text-[12.5px] font-medium text-gray-800 dark:text-gray-200 leading-snug">{item}</p>
                ) : (
                  <>
                    <h3 className="font-bold font-mono text-[12px] text-black dark:text-white mb-0.5">{item.title}</h3>
                    <p className="text-[11.5px] text-gray-700 dark:text-gray-300 leading-snug">{item.description}</p>
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
        <CollapsibleList
          icon="checklist"
          title="Eligibility"
          count={eligibility.length}
          items={eligibility as any[]}
          maxVisible={5}
          renderItem={(requirement: string, index: number) => (
            <li key={index} className="flex items-start gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-950/20 rounded-sm border-2 border-black dark:border-white/10 border-l-[6px] border-l-accent-yellow shadow-[2px_2px_0px_#111] dark:shadow-none">
              <span className="material-symbols-outlined text-black dark:text-white flex-shrink-0 !text-[14px] mt-0.5">arrow_right</span>
              <span className="text-[12.5px] font-medium text-gray-800 dark:text-gray-200 leading-snug">{requirement}</span>
            </li>
          )}
          listMode="ul"
          gridClass="grid md:grid-cols-2 gap-2"
        />
        )}

        {/* How to Apply — neo-brutalist compact */}
        {instructions && instructions.length > 0 && (
        <section className="rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-5 shadow-[3px_3px_0px_#111] dark:shadow-none">
          <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black dark:border-b-white/10 border-dashed">
            <h2 className="flex items-center gap-2 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-accent-yellow border-2 border-black dark:border-white/10">
                <span className="material-symbols-outlined text-black !text-[16px]">directions_run</span>
              </span>
              How to Apply
            </h2>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-black dark:text-white bg-gray-100 dark:bg-white/5 px-2 py-0.5 border-2 border-black dark:border-white/10 rounded-sm">
              {instructions.length} steps
            </span>
          </div>
          <ol className="relative space-y-2">
            {/* Vertical connecting rail */}
            <span className="absolute left-[13px] top-3 bottom-3 w-px bg-black dark:bg-white/10 border-l-2 border-dashed dark:border-l-white/10" aria-hidden="true" />
            {instructions.map((step, index) => {
              const isString = typeof step === 'string'
              const text = isString ? (step as string) : (step as { description: string }).description
              const title = isString ? null : (step as { title: string }).title
              return (
                <li key={index} className="relative flex items-start gap-3 pl-0">
                  <div className={`relative z-10 flex-shrink-0 w-[26px] h-[26px] rounded-sm flex items-center justify-center font-mono text-[11px] font-black tabular-nums border-2 border-black dark:border-white/10 ${
                    index === 0
                      ? 'bg-accent-yellow text-black shadow-[2px_2px_0px_#111] dark:shadow-none'
                      : 'bg-white dark:bg-white/5 text-black dark:text-white shadow-[1px_1px_0px_#111] dark:shadow-none'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0 pt-[3px] pb-1">
                    {title && (
                      <span className="font-mono text-[11px] font-black text-black dark:text-white mr-1.5">{title}.</span>
                    )}
                    <span className="text-[12.5px] text-gray-800 dark:text-gray-200 leading-snug">{text}</span>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Apply button */}
          <div className="mt-4 pt-4 border-t-2 border-black dark:border-t-white/10 border-dashed">
            <button
              onClick={handleApplyClick}
              disabled={isClaiming}
              className="group inline-flex items-center gap-2 bg-accent-yellow text-black font-mono font-black px-5 py-2.5 text-[12px] uppercase tracking-[0.1em] rounded-sm border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-none hover:bg-amber-300 hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isClaiming ? 'Claiming…' : 'Apply Now'}</span>
              <span className="material-symbols-outlined !text-[16px] group-hover:translate-x-0.5 transition-transform">
                {isClaiming ? 'hourglass_empty' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </section>
        )}

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
        <section className="rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-5 shadow-[3px_3px_0px_#111] dark:shadow-none">
          <h2 className="mb-3 flex items-center gap-2 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white pb-2 border-b-2 border-black dark:border-b-white/10 border-dashed">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-accent-yellow border-2 border-black dark:border-white/10">
              <span className="material-symbols-outlined text-black !text-[16px]">help</span>
            </span>
            FAQ
          </h2>
          <div className="space-y-2">
            {faqs.map((faqItem, index) => (
              <div key={index} className="rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] overflow-hidden shadow-[2px_2px_0px_#111] dark:shadow-none hover:shadow-[3px_3px_0px_#111] transition-shadow">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 w-full text-left transition-colors ${
                    openFaqIndex === index ? 'bg-accent-yellow/15 dark:bg-white/5' : 'hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="text-[12.5px] font-bold font-mono text-black dark:text-white pr-2">{faqItem.question}</span>
                  <span className={`material-symbols-outlined !text-[18px] text-black dark:text-white transition-transform flex-shrink-0 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div className="px-3.5 pb-3 pt-2 text-[12.5px] text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-white/5 border-t-2 border-black dark:border-t-white/10 border-dashed">
                    {faqItem.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        )}

        {/* Tags + decorative footer */}
        {Array.isArray(deal.tags) && deal.tags.length > 0 && (
        <section className="relative rounded-sm border-2 border-black dark:border-white/10 bg-gray-50 dark:bg-[#0c0c0c] p-5 overflow-hidden shadow-[3px_3px_0px_#111] dark:shadow-none">
          <div className="absolute -bottom-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.08]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-white deal-tags-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
              <circle cx="100" cy="100" r="40" />
              <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
              <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
              <circle cx="100" cy="100" r="3" fill="currentColor" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 100 100)`}>
                  <line x1="100" y1="40" x2="100" y2="20" />
                  <circle cx="100" cy="20" r="2" fill="currentColor" />
                </g>
              ))}
            </svg>
          </div>
          <div className="relative">
            <h2 className="mb-3 flex items-center gap-2 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white pb-2 border-b-2 border-black dark:border-b-white/10 border-dashed">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-accent-yellow border-2 border-black dark:border-white/10">
                <span className="material-symbols-outlined text-black !text-[16px]">tag</span>
              </span>
              Tags &amp; Categories
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {deal.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wide text-black dark:text-white bg-white dark:bg-white/5 border-2 border-black dark:border-white/10 rounded-sm shadow-[1px_1px_0px_#111] dark:shadow-none hover:shadow-[2px_2px_0px_#111] hover:-translate-x-px hover:-translate-y-px hover:bg-accent-yellow transition-all"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes dealTagsMandalaSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            :global(.deal-tags-mandala-spin) {
              animation: dealTagsMandalaSpin 100s linear infinite;
              transform-origin: center;
            }
            @media (prefers-reduced-motion: reduce) {
              :global(.deal-tags-mandala-spin) { animation: none; }
            }
          `}</style>
        </section>
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

/* ─── Collapsible list section ───────────────────────────── */
function CollapsibleList({
  icon,
  title,
  count,
  items,
  maxVisible,
  renderItem,
  listMode = 'div',
  gridClass,
}: {
  icon: string
  title: string
  count: number
  items: any[]
  maxVisible: number
  renderItem: (item: any, index: number) => JSX.Element
  listMode?: 'ul' | 'div'
  gridClass: string
}) {
  const [expanded, setExpanded] = useState(false)
  const isLong = items.length > maxVisible
  const visible = expanded || !isLong ? items : items.slice(0, maxVisible)
  const Container: any = listMode === 'ul' ? 'ul' : 'div'

  return (
    <section className="rounded-sm border-2 border-black dark:border-white/10 bg-white dark:bg-[#0c0c0c] p-5 shadow-[3px_3px_0px_#111] dark:shadow-none">
      <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black dark:border-b-white/10 border-dashed">
        <h2 className="flex items-center gap-2 font-mono text-[13px] md:text-sm font-black uppercase tracking-[0.08em] text-black dark:text-white">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-accent-yellow border-2 border-black dark:border-white/10">
            <span className="material-symbols-outlined text-black !text-[16px]">{icon}</span>
          </span>
          {title}
        </h2>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-black dark:text-white bg-gray-100 dark:bg-white/5 px-2 py-0.5 border-2 border-black dark:border-white/10 rounded-sm">
          {count} items
        </span>
      </div>
      <Container className={gridClass}>
        {visible.map((item, i) => renderItem(item, i))}
      </Container>
      {isLong && (
        <div className="pt-3 mt-3 border-t-2 border-black dark:border-t-white/10 border-dashed">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black uppercase tracking-[0.1em] text-black dark:text-white bg-white dark:bg-white/5 border-2 border-black dark:border-white/10 px-3 py-1.5 rounded-sm shadow-[2px_2px_0px_#111] dark:shadow-none hover:bg-accent-yellow dark:hover:bg-accent-yellow dark:hover:text-black hover:shadow-[3px_3px_0px_#111] dark:hover:shadow-none hover:-translate-x-px hover:-translate-y-px transition-all"
          >
            <span>
              {expanded ? 'Show Less' : `Show All ${count}`}
            </span>
            <span
              className={`material-symbols-outlined !text-[14px] text-black dark:text-white transition-transform ${
                expanded ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
        </div>
      )}
    </section>
  )
}