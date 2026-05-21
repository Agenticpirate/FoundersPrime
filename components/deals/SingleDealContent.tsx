'use client'

import { useState, useEffect } from 'react'
import { getStartupProgramUrl } from '@/lib/comprehensive-startup-urls'
import { useRouter } from 'next/navigation'
import { isProUser, isCampusUser } from '@/lib/auth/user-context'
import ProUpgradeModal from '@/components/ProUpgradeModal'
import { claimDeal } from '@/app/actions/deal-actions'
import { GlowingEffect } from '@/components/ui/GlowingEffect'

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
    appliedCount: number
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
}

export default function SingleDealContent({ deal, freeAccess = false, basePath = '/deals' }: SingleDealContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showCopied, setShowCopied] = useState(false)

  // Pro Access State
  const [isPro, setIsPro] = useState(false)
  const [isCampus, setIsCampus] = useState(false)
  const [isLoadingPro, setIsLoadingPro] = useState(true)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimError, setClaimError] = useState<string | null>(null)

  const router = useRouter()

  // Check Pro Status on Mount
  useEffect(() => {
    if (freeAccess) {
      // Student Benefits are free — no Pro check needed
      setIsPro(true)
      setIsLoadingPro(false)
      return
    }
    const checkStatus = async () => {
      try {
        const proStatus = await isProUser()
        setIsPro(proStatus)
        const campusStatus = await isCampusUser()
        setIsCampus(campusStatus)
      } catch (error) {
        console.error('Error checking pro status:', error)
      } finally {
        setIsLoadingPro(false)
      }
    }
    checkStatus()
  }, [freeAccess])

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
          router.push('/login')
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
          router.push('/login')
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
      window.open(applicationUrl, '_blank')
      return
    }

    if (!isPro && !isCampus) {
      setShowUpgradeModal(true)
      return
    }

    setIsClaiming(true)
    try {
        const result = await claimDeal(deal.id, applicationUrl)
        if (result.success && result.url) {
            window.open(result.url, '_blank')
            // Show usage alert for Explorer users
            if (result.usage) {
                const { weeklyUsed, weeklyLimit, monthlyUsed, monthlyLimit } = result.usage
                const weeklyLeft = weeklyLimit - weeklyUsed
                const monthlyLeft = monthlyLimit - monthlyUsed
                if (weeklyLeft <= 2 || monthlyLeft <= 5) {
                    setClaimError(`⚡ ${weeklyLeft} claims left this week · ${monthlyLeft} left this month`)
                }
            }
        } else {
            setClaimError(result.error || 'Failed to apply.')
            if (result.limitReached) {
                setShowUpgradeModal(true)
            }
        }
    } catch (err) {
        setClaimError('An unexpected error occurred.')
    } finally {
        setIsClaiming(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
      {/* Sidebar — shown FIRST on mobile (Apply box top) */}
      <div className="lg:col-span-1 order-first lg:order-last">
        <div className="lg:sticky lg:top-24 space-y-4 md:space-y-6">

          {/* Apply Box */}
          <div className="rounded-sm border-2 border-black bg-white shadow-[3px_3px_0px_#111] p-3 md:p-5">
            
            {claimError && (
              <div className={`mb-3 p-2 text-xs font-bold border-2 rounded-sm ${claimError.startsWith('⚡') ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-red-50 text-red-700 border-red-500'}`}>
                {claimError.startsWith('⚡') ? claimError : `⚠️ ${claimError}`}
              </div>
            )}
            
            {/* Compact value + stats row on mobile */}
            <div className="flex items-baseline justify-between mb-2 md:mb-4">
              <div>
                <div className="text-[9px] md:text-xs font-bold uppercase text-gray-500 font-mono">Deal Value</div>
                <div className="text-lg md:text-3xl font-black text-black font-mono">{displayValue}</div>
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-3 mb-3 pb-3 border-b border-gray-200 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Time</span>
                <span className="font-bold font-mono">{deal.stats.appTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Approval</span>
                <span className="font-bold font-mono">{deal.stats.approval}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Deadline</span>
                <span className="font-bold text-green-600 font-mono">Rolling</span>
              </div>
            </div>

            {/* Apply button — always visible, Pro check happens on click */}
              <div className="relative rounded-sm mb-2">
                <GlowingEffect
                  spread={40}
                  glow={false}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <button
                  onClick={handleApplyClick}
                  disabled={isClaiming}
                  className="relative w-full rounded-sm border-2 border-black bg-primary py-2.5 md:py-4 font-mono text-xs md:text-base font-bold uppercase tracking-wide text-black shadow-[3px_3px_0px_#111111] hover:bg-yellow-300 hover:shadow-[5px_5px_0px_#111111] hover:-translate-x-px hover:-translate-y-px transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isClaiming ? (
                      'Claiming...'
                  ) : (
                      freeAccess ? 'Apply Now' : (isPro || isCampus) ? 'Apply Now' : 'Apply Now (Premium)'
                  )}
                  <span className="material-symbols-outlined !text-[18px]">
                      {isClaiming ? 'hourglass_empty' : (freeAccess || isPro || isCampus ? 'arrow_forward' : 'lock')}
                  </span>
                </button>
              </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`rounded-sm border-2 border-black py-2 font-mono text-xs font-bold uppercase hover:shadow-[2px_2px_0px_#111111] transition-all flex items-center justify-center gap-1 ${isSaved ? 'bg-yellow-400 text-black' : 'bg-white text-black hover:bg-gray-50'
                  } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="material-symbols-outlined !text-[16px]">{isSaved ? 'bookmark_added' : 'bookmark'}</span>
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-full rounded-sm border-2 border-black bg-white py-2 font-mono text-xs font-bold uppercase text-black hover:bg-gray-50 transition-all flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined !text-[16px]">ios_share</span> Share
                </button>
                {showShareMenu && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black shadow-[3px_3px_0px_#111111] z-50">
                    <button onClick={() => handleShare('copy')} className="w-full px-3 py-2 text-left text-xs font-bold hover:bg-gray-100 flex items-center gap-2">
                      <span className="material-symbols-outlined !text-[14px]">content_copy</span>
                      {showCopied ? 'Copied!' : 'Copy Link'}
                    </button>
                    <button onClick={() => handleShare('twitter')} className="w-full px-3 py-2 text-left text-xs font-bold hover:bg-gray-100 flex items-center gap-2">
                      <span className="material-symbols-outlined !text-[14px]">share</span>Share on X
                    </button>
                    <button onClick={() => handleShare('linkedin')} className="w-full px-3 py-2 text-left text-xs font-bold hover:bg-gray-100 flex items-center gap-2">
                      <span className="material-symbols-outlined !text-[14px]">work</span>LinkedIn
                    </button>
                    <button onClick={() => handleShare('email')} className="w-full px-3 py-2 text-left text-xs font-bold hover:bg-gray-100 flex items-center gap-2">
                      <span className="material-symbols-outlined !text-[14px]">mail</span>Email
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links — hidden on mobile to save space */}
          <div className="hidden md:block rounded-sm border-2 md:border-4 border-black bg-white shadow-[4px_4px_0px_#111111] p-5">
            <h4 className="font-mono text-sm font-bold uppercase mb-4 text-gray-700 border-b-2 border-gray-200 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={handleApplyClick} className="flex items-center gap-2 text-sm font-bold hover:text-primary hover:underline">
                  <span className="material-symbols-outlined !text-[18px]">open_in_new</span>
                  Apply for Deal
                </button>
              </li>
              <li>
                <a href={`https://www.${deal.provider.toLowerCase().replace(/\s+/g, '')}.com`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold hover:text-primary hover:underline">
                  <span className="material-symbols-outlined !text-[18px]">info</span>
                  About {deal.provider}
                </a>
              </li>
            </ul>
          </div>

          {/* Help CTA — hidden on mobile */}
          <div className="hidden md:block rounded-sm bg-black text-white p-5 shadow-[3px_3px_0px_#111] text-center border-2 border-black">
            <div className="inline-block p-3 rounded-full bg-yellow-400 border-3 border-white mb-4 text-black">
              <span className="material-symbols-outlined block !text-[28px]">rocket_launch</span>
            </div>
            <h4 className="font-mono font-bold text-xl mb-3 uppercase">Need Help?</h4>
            <p className="text-sm text-gray-300 mb-5 leading-relaxed">
              Get expert guidance on your application to maximize your chances of approval.
            </p>
            <button className="w-full py-3 bg-yellow-400 text-black font-bold font-mono text-sm uppercase rounded-sm hover:bg-yellow-300 shadow-[4px_4px_0px_rgba(255,255,255,0.2)] transition-all border-2 border-white">
              Get Expert Help
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-4 md:space-y-6 order-last lg:order-first">

        {/* Quick Stats Bar — compact on mobile */}
        <div className="grid grid-cols-4 gap-1.5 md:gap-2">
          <div className="rounded-sm border border-black bg-white p-1.5 md:p-2.5 shadow-[1px_1px_0px_#111] md:shadow-[2px_2px_0px_#111]">
            <div className="text-[8px] md:text-[10px] font-bold uppercase text-gray-500 font-mono">Time</div>
            <div className="text-[11px] md:text-base font-bold text-black font-mono">{deal.stats.appTime}</div>
          </div>
          <div className="rounded-sm border border-black bg-white p-1.5 md:p-2.5 shadow-[1px_1px_0px_#111] md:shadow-[2px_2px_0px_#111]">
            <div className="text-[8px] md:text-[10px] font-bold uppercase text-gray-500 font-mono">Approval</div>
            <div className="text-[11px] md:text-base font-bold text-black font-mono">{deal.stats.approval}</div>
          </div>
          <div className="rounded-sm border border-black bg-white p-1.5 md:p-2.5 shadow-[1px_1px_0px_#111] md:shadow-[2px_2px_0px_#111]">
            <div className="text-[8px] md:text-[10px] font-bold uppercase text-gray-500 font-mono">Difficulty</div>
            <div className="text-[11px] md:text-base font-bold text-green-600 font-mono">{deal.stats.difficulty}</div>
          </div>
          <div className="rounded-sm border border-black bg-white p-1.5 md:p-2.5 shadow-[1px_1px_0px_#111] md:shadow-[2px_2px_0px_#111]">
            <div className="text-[8px] md:text-[10px] font-bold uppercase text-gray-500 font-mono">Success</div>
            <div className="text-[11px] md:text-base font-bold text-blue-600 font-mono">{deal.stats.successRate}</div>
          </div>
        </div>

        {/* Overview Section */}
        {description && description.length > 10 && (
        <section className="rounded-sm border border-black bg-white p-3 md:p-6 shadow-[2px_2px_0px_#111]">
          <h2 className="mb-2 flex items-center gap-1.5 border-b border-black pb-1.5 font-mono text-sm md:text-xl font-bold uppercase">
            <span className="material-symbols-outlined text-primary text-base md:text-xl">info</span>
            About This Deal
          </h2>
          <p className="text-xs md:text-base leading-relaxed text-gray-800 whitespace-pre-line break-words">{description}</p>
        </section>
        )}

        {/* What's Included / Benefits */}
        {Array.isArray(benefits) && benefits.length > 0 && (
        <section className="rounded-sm border border-black bg-white p-3 md:p-6 shadow-[2px_2px_0px_#111]">
          <h2 className="mb-2 flex items-center gap-1.5 border-b border-black pb-1.5 font-mono text-sm md:text-xl font-bold uppercase">
            <span className="material-symbols-outlined text-primary text-base md:text-xl">inventory_2</span>
            {deal.benefits ? 'Benefits & Features' : 'What\'s Included'}
          </h2>
          <div className="grid md:grid-cols-2 gap-1.5 md:gap-3">
            {benefits.map((item, index) => (
              <div key={index} className="flex items-start gap-1.5 p-2 bg-gray-50 rounded-sm border border-gray-200">
                <span className="material-symbols-outlined text-green-600 flex-shrink-0 text-sm">check_circle</span>
                <div>
                  {typeof item === 'string' ? (
                    <p className="text-xs md:text-sm font-medium">{item}</p>
                  ) : (
                    <>
                      <h3 className="font-bold font-mono text-xs mb-0.5">{item.title}</h3>
                      <p className="text-[11px] md:text-xs text-gray-600">{item.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* Eligibility Requirements */}
        {eligibility && eligibility.length > 0 && (
        <section className="rounded-sm border border-black bg-white p-3 md:p-5 shadow-[2px_2px_0px_#111]">
          <h2 className="mb-2 flex items-center gap-1.5 border-b border-black pb-1.5 font-mono text-sm md:text-xl font-bold uppercase">
            <span className="material-symbols-outlined text-primary text-base">checklist</span>
            Eligibility
          </h2>
          <ul className="space-y-1">
            {eligibility.map((requirement, index) => (
              <li key={index} className="flex items-start gap-1.5 p-1.5 md:p-2 bg-yellow-50 rounded-sm border-l-3 border-black">
                <span className="material-symbols-outlined text-primary flex-shrink-0 text-xs mt-0.5">arrow_right</span>
                <span className="text-xs md:text-sm font-medium leading-snug">{requirement}</span>
              </li>
            ))}
          </ul>
        </section>
        )}

        {/* How to Apply */}
        {instructions && instructions.length > 0 && (
        <section className="rounded-sm border border-black bg-white p-3 md:p-5 shadow-[2px_2px_0px_#111]">
          <h2 className="mb-2 flex items-center gap-1.5 border-b border-black pb-1.5 font-mono text-sm md:text-xl font-bold uppercase">
            <span className="material-symbols-outlined text-primary text-base">directions_run</span>
            How to Apply
          </h2>
          <div className="space-y-2 md:space-y-3">
            {instructions.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className={`h-7 w-7 md:h-9 md:w-9 rounded-full border-2 border-black flex items-center justify-center font-bold font-mono text-xs md:text-sm shadow-[2px_2px_0px_#111] ${index === 0 ? 'bg-yellow-400' : 'bg-white'}`}>
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 pt-0.5">
                  {typeof step === 'string' ? (
                    <p className="text-sm text-gray-700 leading-snug">{step}</p>
                  ) : (
                    <>
                      <h3 className="font-bold text-sm font-mono mb-0.5">{step.title}</h3>
                      <p className="text-xs text-gray-700 leading-snug">{step.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Apply button */}
          <div className="mt-4 pt-4 border-t-2 border-gray-200">
              <div className="relative inline-block rounded-sm">
                <GlowingEffect
                  spread={40}
                  glow={false}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <button
                  onClick={handleApplyClick}
                  disabled={isClaiming}
                  className="relative inline-flex items-center gap-2 rounded-sm border-2 border-black bg-primary px-6 py-3 font-mono text-sm font-bold uppercase text-black shadow-[3px_3px_0px_#111] hover:bg-yellow-300 hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all cursor-pointer disabled:opacity-50"
                >
                  {isClaiming ? 'Claiming...' : 'Apply Now'}
                  <span className="material-symbols-outlined text-base">
                      {isClaiming ? 'hourglass_empty' : 'arrow_forward'}
                  </span>
                </button>
              </div>
          </div>
        </section>
        )}

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
        <section className="rounded-sm border border-black bg-white p-3 md:p-5 shadow-[2px_2px_0px_#111]">
          <h2 className="mb-2 flex items-center gap-1.5 border-b border-black pb-1.5 font-mono text-sm md:text-xl font-bold uppercase">
            <span className="material-symbols-outlined text-primary text-base">help</span>
            FAQ
          </h2>
          <div className="space-y-1.5">
            {faqs.map((faqItem, index) => (
              <div key={index} className="rounded-sm border border-black bg-white shadow-[1px_1px_0px_#111] overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="flex cursor-pointer items-center justify-between p-2 md:p-3 text-xs md:text-sm font-bold font-mono w-full text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="pr-4">{faqItem.question}</span>
                  <span className={`material-symbols-outlined text-sm transition-transform flex-shrink-0 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div className="border-t-2 border-gray-200 px-3 pb-3 pt-2 text-sm text-gray-700 leading-relaxed bg-gray-50">
                    {faqItem.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        )}

        {/* Similar Deals - removed for cleaner layout */}
      </div>

      <ProUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  )
}