import Link from 'next/link'
import { useState } from 'react'
import { getProviderUrl } from '@/lib/provider-urls'

interface Deal {
  id: string
  logo: string
  category: string
  badge?: string
  badgeColor?: string
  title: string
  provider: string
  value: string
  valueSubtext: string
  valueStyle: string
  description: string
  eligibility?: string
  validFor?: string
  applicationUrl?: string
  verified?: boolean
}

interface DealCardProps {
  deal: Deal
  basePath?: string  // Optional base path for routing (default: '/deals')
  overrideHref?: string // If set, overrides the default href entirely
}

export default function DealCard({ deal, basePath = '/deals', overrideHref }: DealCardProps) {
  const {
    id,
    logo,
    category,
    badge,
    badgeColor,
    title,
    provider,
    value,
    valueSubtext,
    description,
    applicationUrl
  } = deal

  const [hasError, setHasError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Use overrideHref if provided (e.g. redirect non-Pro users to /pricing)
  const href = overrideHref ?? `${basePath}/${id}`
  const isExternal = false

  const linkProps = {
    href
  }

  const LinkComponent = isExternal ? 'a' : Link

  return (
    <LinkComponent
      {...linkProps}
      className="flex flex-col bg-white border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden group relative h-full focus:outline-none focus:ring-4 focus:ring-accent-yellow focus:ring-offset-2"
      aria-label={`View details for ${title}`}
      tabIndex={0}
    >
      {/* Apply Now Badge - Shows on Hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <span className="inline-block px-3 py-1.5 bg-yellow-400 text-black text-xs font-bold rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
          Apply Now
        </span>
      </div>

      {/* Badge */}
      {badge && (
        <div className="px-3 pt-2.5 pb-1.5 md:px-4 md:pt-3 md:pb-2">
          <span
            className={`inline-block px-2 py-0.5 ${badgeColor || 'bg-orange-500'} text-white text-[9px] md:text-[10px] font-bold rounded uppercase tracking-wide`}
            role="status"
            aria-label={`Status: ${badge}`}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Header with Logo and Title */}
      <div className={`px-3 md:px-4 ${badge ? 'pt-2' : 'pt-3'} pb-2 md:pb-3`}>
        <div className="flex items-center gap-2">
          {/* Logo Container */}
          <div className={`w-10 h-10 md:w-16 md:h-16 bg-white border-2 border-black rounded flex items-center justify-center p-1.5 md:p-2.5 flex-shrink-0 transition-all duration-200 ${hasError || !logo ? 'group-hover:bg-yellow-50' : ''} ${!imageLoaded && logo && !hasError ? 'animate-pulse bg-gray-100' : ''}`}>
            {logo && !hasError ? (
              <img
                alt={`${title} logo`}
                className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                src={logo}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setHasError(true)}
              />
            ) : (
              <span
                className="material-symbols-outlined text-2xl md:text-4xl text-gray-400 group-hover:text-yellow-500 transition-all duration-200"
                aria-hidden="true"
              >
                rocket_launch
              </span>
            )}
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0 flex items-center">
            <h3 className="text-xs md:text-sm font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-3 md:px-4 pb-2 md:pb-3 flex-grow">
        <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-3">
          {description}
        </p>
      </div>

      {/* Value Section - Always at bottom */}
      <div className="px-3 md:px-4 pb-3 md:pb-4 mt-auto">
        <p className="text-sm md:text-base font-bold text-green-600 leading-tight mb-0.5">
          {value}
        </p>
        {valueSubtext && (
          <p className="text-[10px] md:text-[11px] text-gray-500 leading-tight">
            {valueSubtext}
          </p>
        )}
      </div>
    </LinkComponent>
  )
}
