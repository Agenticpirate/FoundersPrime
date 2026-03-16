'use client'

import { useState, useEffect } from 'react'
import { getStartupProgramUrl } from '@/lib/comprehensive-startup-urls'
import { useRouter } from 'next/navigation'
import { isProUser } from '@/lib/auth/user-context'
import ProUpgradeModal from '@/components/ProUpgradeModal'

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
  const [isLoadingPro, setIsLoadingPro] = useState(true)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

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

  // Handle Application Click
  const handleApplyClick = (e: React.MouseEvent) => {
    if (isLoadingPro) {
      e.preventDefault()
      return
    }

    if (!isPro) {
      e.preventDefault()
      setShowUpgradeModal(true)
    }
    // If Pro, let the link work as normal (opening in new tab)
  }

  // Use the deal's application URL directly, fallback to provider URL mapping only if not set
  const applicationUrl = deal.applicationUrl || deal.actualDealUrl || getStartupProgramUrl(deal.provider)

  // Use enhanced data if available
  const description = deal.detailedDescription || deal.overview
  const benefits = deal.benefits || deal.included
  const instructions = deal.applicationInstructions || deal.steps
  const eligibility = deal.eligibilityDetails || deal.eligibility
  const faqs = deal.faqs || deal.faq
  const displayValue = deal.enhancedValue || deal.value

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Sidebar — shown FIRST on mobile (Apply box top) */}
      <div className="lg:col-span-1 order-first lg:order-last">
        <div className="lg:sticky lg:top-24 space-y-4 md:space-y-6">

          {/* Apply Box */}
          <div className="rounded-sm border-2 md:border-4 border-black bg-white shadow-[3px_3px_0px_#111111] md:shadow-[6px_6px_0px_#111111] p-4 md:p-6">
            <div className="mb-3 md:mb-4">
              <div className="text-[10px] md:text-xs font-bold uppercase text-gray-500 mb-0.5 md:mb-1 font-mono">Deal Value</div>
              <div className="text-xl md:text-3xl font-black text-black font-mono mb-2 md:mb-4">{displayValue}</div>
            </div>

            <div className="space-y-2 md:space-y-3 mb-4 pb-4 border-b-2 border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Time Required</span>
                <span className="font-bold font-mono">{deal.stats.appTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Approval Time</span>
                <span className="font-bold font-mono">{deal.stats.approval}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Deadline</span>
                <span className="font-bold text-green-600 font-mono">Rolling</span>
              </div>
            </div>

            {isLoadingPro ? (
              <div className="w-full h-12 bg-gray-100 animate-pulse rounded-sm mb-3"></div>
            ) : (
              <a
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleApplyClick}
                className="w-full rounded-sm border-2 md:border-4 border-black bg-primary py-3 md:py-4 font-mono text-sm md:text-base font-bold uppercase tracking-wide text-black shadow-[3px_3px_0px_#111111] hover:bg-yellow-300 transition-all mb-3 flex items-center justify-center gap-2 cursor-pointer"
              >
                {freeAccess ? 'Apply Now' : isPro ? 'Apply Now' : 'Apply Now (Pro)'}
                <span className="material-symbols-outlined !text-[18px]">{freeAccess || isPro ? 'arrow_forward' : 'lock'}</span>
              </a>
            )}

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

          {/* Verified Badge */}
          <div className="rounded-sm border-2 md:border-4 border-black bg-green-50 p-4 md:p-5 shadow-[3px_3px_0px_#111111] md:shadow-[4px_4px_0px_#111111]">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-green-400 border-2 border-black flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-black !text-[16px] md:!text-[20px]">verified</span>
              </div>
              <div>
                <h4 className="font-bold font-mono text-sm md:text-base uppercase mb-1">Verified Deal</h4>
                <p className="text-xs md:text-sm text-green-900 mb-1 font-mono">
                  <strong>Last verified:</strong> {deal.verification.lastVerified}
                </p>
                <p className="text-xs md:text-sm text-green-900 font-mono">
                  <strong>{deal.verification.appliedCount}+</strong> founders applied
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links — hidden on mobile to save space */}
          <div className="hidden md:block rounded-sm border-2 md:border-4 border-black bg-white shadow-[4px_4px_0px_#111111] p-5">
            <h4 className="font-mono text-sm font-bold uppercase mb-4 text-gray-700 border-b-2 border-gray-200 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href={applicationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold hover:text-primary hover:underline">
                  <span className="material-symbols-outlined !text-[18px]">open_in_new</span>
                  Apply for Deal
                </a>
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
          <div className="hidden md:block rounded-sm bg-black text-white p-6 shadow-[6px_6px_0px_#111111] text-center border-2 md:border-4 border-black">
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

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          <div className="rounded-sm border-2 md:border-3 border-black bg-white p-3 shadow-[2px_2px_0px_#111111] md:shadow-[3px_3px_0px_#111111]">
            <div className="text-[10px] md:text-xs font-bold uppercase text-gray-500 mb-0.5 font-mono">Time</div>
            <div className="text-base md:text-lg font-bold text-black font-mono">{deal.stats.appTime}</div>
          </div>
          <div className="rounded-sm border-2 md:border-3 border-black bg-white p-3 shadow-[2px_2px_0px_#111111] md:shadow-[3px_3px_0px_#111111]">
            <div className="text-[10px] md:text-xs font-bold uppercase text-gray-500 mb-0.5 font-mono">Approval</div>
            <div className="text-base md:text-lg font-bold text-black font-mono">{deal.stats.approval}</div>
          </div>
          <div className="rounded-sm border-2 md:border-3 border-black bg-white p-3 shadow-[2px_2px_0px_#111111] md:shadow-[3px_3px_0px_#111111]">
            <div className="text-[10px] md:text-xs font-bold uppercase text-gray-500 mb-0.5 font-mono">Difficulty</div>
            <div className="text-base md:text-lg font-bold text-green-600 font-mono">{deal.stats.difficulty}</div>
          </div>
          <div className="rounded-sm border-2 md:border-3 border-black bg-white p-3 shadow-[2px_2px_0px_#111111] md:shadow-[3px_3px_0px_#111111]">
            <div className="text-[10px] md:text-xs font-bold uppercase text-gray-500 mb-0.5 font-mono">Success</div>
            <div className="text-base md:text-lg font-bold text-blue-600 font-mono">{deal.stats.successRate}</div>
          </div>
        </div>

        {/* Overview Section */}
        <section className="rounded-sm border-2 md:border-4 border-black bg-white p-4 md:p-6 shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111]">
          <h2 className="mb-3 md:mb-4 flex items-center gap-2 border-b-2 md:border-b-3 border-black pb-2 md:pb-3 font-mono text-lg md:text-2xl font-bold uppercase">
            <span className="material-symbols-outlined text-primary !text-[20px] md:!text-[24px]">info</span>
            About This Deal
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-gray-800 whitespace-pre-line">{description}</p>
        </section>

        {/* What's Included / Benefits */}
        <section className="rounded-sm border-2 md:border-4 border-black bg-white p-4 md:p-6 shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111]">
          <h2 className="mb-3 md:mb-4 flex items-center gap-2 border-b-2 md:border-b-3 border-black pb-2 md:pb-3 font-mono text-lg md:text-2xl font-bold uppercase">
            <span className="material-symbols-outlined text-primary !text-[20px] md:!text-[24px]">inventory_2</span>
            {deal.benefits ? 'Benefits & Features' : 'What\'s Included'}
          </h2>
          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            {Array.isArray(benefits) && benefits.map((item, index) => (
              <div key={index} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-gray-50 rounded-sm border-2 border-gray-200">
                <span className="material-symbols-outlined text-green-600 mt-0.5 flex-shrink-0">check_circle</span>
                <div>
                  {typeof item === 'string' ? (
                    <p className="text-base font-medium">{item}</p>
                  ) : (
                    <>
                      <h3 className="font-bold font-mono text-sm md:text-base mb-1">{item.title}</h3>
                      <p className="text-xs md:text-sm text-gray-600">{item.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section className="rounded-sm border-2 md:border-4 border-black bg-white p-4 md:p-6 shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111]">
          <h2 className="mb-3 md:mb-4 flex items-center gap-2 border-b-2 md:border-b-3 border-black pb-2 md:pb-3 font-mono text-lg md:text-2xl font-bold uppercase">
            <span className="material-symbols-outlined text-primary !text-[20px] md:!text-[24px]">checklist</span>
            Eligibility Requirements
          </h2>
          <ul className="space-y-2 md:space-y-3">
            {eligibility.map((requirement, index) => (
              <li key={index} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-yellow-50 rounded-sm border-l-4 border-black">
                <span className="material-symbols-outlined text-primary flex-shrink-0 mt-0.5">arrow_right</span>
                <span className="text-base font-medium">{requirement}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How to Apply */}
        <section className="rounded-sm border-2 md:border-4 border-black bg-white p-4 md:p-6 shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111]">
          <h2 className="mb-3 md:mb-4 flex items-center gap-2 border-b-2 md:border-b-3 border-black pb-2 md:pb-3 font-mono text-lg md:text-2xl font-bold uppercase">
            <span className="material-symbols-outlined text-primary !text-[20px] md:!text-[24px]">directions_run</span>
            How to Apply
          </h2>
          <div className="space-y-4 md:space-y-6">
            {instructions.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className={`h-12 w-12 rounded-full border-4 border-black flex items-center justify-center font-bold font-mono text-lg shadow-[3px_3px_0px_#111111] ${index === 0 ? 'bg-yellow-400' : 'bg-white'
                    }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  {typeof step === 'string' ? (
                    <p className="text-base text-gray-700 leading-relaxed">{step}</p>
                  ) : (
                    <>
                      <h3 className="font-bold text-base md:text-lg font-mono mb-1 md:mb-2">{step.title}</h3>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">{step.description}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Apply button */}
          <div className="mt-8 pt-6 border-t-3 border-gray-200">
            {isLoadingPro ? (
              <div className="h-16 w-48 bg-gray-100 animate-pulse rounded-sm"></div>
            ) : (
              <a
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleApplyClick}
                className="inline-flex items-center gap-2 rounded-sm border-2 md:border-4 border-black bg-primary px-6 md:px-8 py-3 md:py-4 font-mono text-sm md:text-lg font-bold uppercase text-black shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111] hover:bg-yellow-300 transition-all cursor-pointer"
              >
                {freeAccess ? 'Apply Now' : isPro ? 'Apply Now' : 'Apply Now (Pro Only)'}
                <span className="material-symbols-outlined">{freeAccess || isPro ? 'arrow_forward' : 'lock'}</span>
              </a>
            )}
            <p className="mt-3 text-sm text-gray-600 font-mono flex items-center gap-1">
              <span className="material-symbols-outlined !text-[16px] text-green-600">verified</span>
              Verified deal application
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-sm border-2 md:border-4 border-black bg-white p-4 md:p-6 shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111]">
          <h2 className="mb-3 md:mb-4 flex items-center gap-2 border-b-2 md:border-b-3 border-black pb-2 md:pb-3 font-mono text-lg md:text-2xl font-bold uppercase">
            <span className="material-symbols-outlined text-primary !text-[20px] md:!text-[24px]">help</span>
            FAQ
          </h2>
          <div className="space-y-2 md:space-y-3">
            {faqs.map((faqItem, index) => (
              <div
                key={index}
                className="rounded-sm border-3 border-black bg-white shadow-[3px_3px_0px_#111111] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="flex cursor-pointer items-center justify-between p-3 md:p-4 text-sm md:text-base font-bold font-mono w-full text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="pr-4">{faqItem.question}</span>
                  <span className={`material-symbols-outlined transition-transform flex-shrink-0 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div className="border-t-2 md:border-t-3 border-gray-200 px-3 pb-3 pt-2 md:px-4 md:pb-4 md:pt-3 text-sm md:text-base text-gray-700 leading-relaxed bg-gray-50">
                    {faqItem.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Similar Deals */}
        {deal.similarDeals.length > 0 && (
          <section>
            <h2 className="mb-4 font-mono text-2xl font-bold uppercase text-black flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">recommend</span>
              {freeAccess ? 'Related Benefits' : 'Similar Deals'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deal.similarDeals.slice(0, 4).map((similarDeal, index) => (
                <a
                  key={index}
                  href={similarDeal.slug ? `${basePath}/${similarDeal.slug}` : '#'}
                  className="group rounded-sm border-2 md:border-4 border-black bg-white p-4 md:p-5 shadow-[3px_3px_0px_#111111] md:shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="bg-primary text-black text-xs px-3 py-1.5 rounded-sm border-2 border-black font-bold uppercase font-mono">
                      {similarDeal.value}
                    </span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                      arrow_forward
                    </span>
                  </div>
                  <h3 className="font-bold font-mono text-base mb-2 group-hover:text-primary transition-colors">{similarDeal.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{similarDeal.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      <ProUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  )
}