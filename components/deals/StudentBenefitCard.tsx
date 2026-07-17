'use client'

import { StudentBenefit } from '@/data/student-benefits-2026'
import { CardHoverGlow, cardHoverClass, cardLogoHoverClass, cardTitleHoverClass } from '@/components/ui/card-hover'
import BrandLogo from '@/components/ui/BrandLogo'
import { resolveBrandDomain } from '@/lib/brand-domain'
import { isUsableLogoUrl } from '@/lib/logo-utils'

function brandName(benefit: StudentBenefit): string {
  const title = `${benefit.title || ''} ${benefit.slug || ''}`
  if (/youtube/i.test(title)) return 'YouTube'
  if (/spotify/i.test(title) && !/spotify/i.test(benefit.company || '')) return 'Spotify'
  return benefit.company || benefit.title || 'Brand'
}

function BenefitLogo({ benefit }: { benefit: StudentBenefit }) {
  const name = brandName(benefit)
  const domain = resolveBrandDomain({
    name,
    website: benefit.claimUrl || benefit.url,
    logo: benefit.logo,
  })
  const logo =
    benefit.logo && isUsableLogoUrl(benefit.logo) ? benefit.logo : undefined

  return (
    <BrandLogo
      name={name}
      domain={domain}
      logo={logo}
      size="md"
      eager
      className="!w-full !h-full !rounded-none !border-0 !p-0 !bg-transparent !shadow-none !inline-flex"
    />
  )
}

export default function StudentBenefitCard({ benefit }: { benefit: StudentBenefit }) {
  return (
    <div
      className={`bg-white dark:bg-[#0c0c0c] border border-black/10 dark:border-white/10 rounded-xl md:rounded-2xl p-2.5 md:p-5 flex flex-col h-full min-w-0 ${cardHoverClass}`}
    >
      <CardHoverGlow />
      {/* Tag */}
      <div
        className={`absolute top-0 right-0 z-[1] px-1.5 py-0.5 text-[8px] md:text-[10px] font-mono font-bold uppercase border-l border-b border-black/10 rounded-bl-lg ${
          benefit.appCategory === 'Software & Tools'
            ? 'bg-accent-yellow'
            : benefit.appCategory === 'Credits & Savings'
              ? 'bg-accent-yellow'
              : 'bg-blue-400 text-white'
        }`}
      >
        {benefit.appCategory === 'Software & Tools'
          ? 'FREE'
          : benefit.appCategory === 'Credits & Savings'
            ? 'DEAL'
            : 'GRANT'}
      </div>

      <div className="relative flex items-start gap-2 md:gap-2.5 mb-1.5 md:mb-4 min-h-0 md:min-h-[3.25rem] pr-8 md:pr-0 min-w-0">
        <div
          className={`relative w-9 h-9 md:w-12 md:h-12 shrink-0 rounded-lg md:rounded-xl border border-black/10 dark:border-white/10 bg-white overflow-hidden ${cardLogoHoverClass}`}
        >
          <div className="absolute inset-0 flex items-center justify-center p-1 md:p-1.5">
            <BenefitLogo benefit={benefit} />
          </div>
        </div>
        <div className="min-w-0 flex-1 pt-0.5 overflow-hidden">
          <h3
            className={`font-bold text-[12px] md:text-lg leading-tight line-clamp-2 md:line-clamp-1 min-h-0 md:min-h-[1.75rem] ${cardTitleHoverClass}`}
          >
            {benefit.title}
          </h3>
          <p className="text-[10px] md:text-xs font-mono text-gray-500 truncate">{benefit.company}</p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-[10px] md:text-sm mb-1.5 md:mb-4 line-clamp-1 md:line-clamp-2 flex-grow">
        {benefit.offerSummary}
      </p>

      <div className="mt-auto space-y-1.5 md:space-y-2 min-w-0">
        <div className="hidden md:flex flex-wrap gap-1">
          {benefit.value && (
            <div className="inline-flex items-center gap-1 border border-black/10 dark:border-white/10 px-1.5 py-0.5 bg-amber-50 dark:bg-accent-yellow/10 rounded">
              <span className="material-symbols-outlined text-amber-700 dark:text-accent-yellow text-sm">
                attach_money
              </span>
              <span className="text-[10px] font-bold font-mono text-amber-800 dark:text-accent-yellow">
                {benefit.value}
              </span>
            </div>
          )}
          <div className="inline-flex items-center gap-1 border border-black/10 dark:border-white/10 px-1.5 py-0.5 bg-gray-50 dark:bg-white/5 rounded">
            <span className="material-symbols-outlined text-gray-500 text-sm">verified</span>
            <span className="text-[10px] font-bold font-mono text-gray-600 dark:text-gray-400">
              {benefit.verification}
            </span>
          </div>
        </div>

        <a
          href={benefit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 md:h-9 w-full items-center justify-center gap-1.5 bg-black dark:bg-white text-white dark:text-black font-mono text-[10px] md:text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-accent-yellow hover:text-black transition-colors leading-none"
        >
          <span className="leading-none md:hidden">Access</span>
          <span className="leading-none hidden md:inline">Get Access</span>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="block shrink-0" aria-hidden>
            <path
              d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
