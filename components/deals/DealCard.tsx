import Link from 'next/link'
import { useState } from 'react'
import { GlowingEffect } from '@/components/ui/GlowingEffect'

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
  basePath?: string
  overrideHref?: string
}

export default function DealCard({ deal, basePath = '/deals', overrideHref }: DealCardProps) {
  const { id, logo, badge, badgeColor, title, value, valueSubtext, description } = deal
  const [hasError, setHasError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const href = overrideHref ?? `${basePath}/${id}`
  const isExternal = href.startsWith('http')
  const LinkComponent = isExternal ? 'a' : Link
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href }

  const displayTitle = title.length > 50 ? title.substring(0, 50) + '…' : title

  return (
    <div className="relative h-full">
      <GlowingEffect
        spread={40}
        glow={false}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <LinkComponent
        {...linkProps}
        className="relative flex flex-col bg-white border-2 border-black shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all duration-200 overflow-hidden group h-full"
        aria-label={`View details for ${title}`}
      >
      {/* Badge row */}
      {badge && (
        <div className="px-4 pt-3">
          <span className={`inline-block px-2 py-0.5 ${badgeColor || 'bg-orange-500'} text-white text-[9px] font-bold uppercase tracking-wider`}>
            {badge}
          </span>
        </div>
      )}

      {/* Logo + Title */}
      <div className={`flex items-center gap-3 px-4 ${badge ? 'pt-3' : 'pt-4'} pb-3`}>
        <div className={`w-12 h-12 bg-white border-2 border-gray-200 flex items-center justify-center p-1.5 flex-shrink-0 rounded-sm ${!imageLoaded && logo && !hasError ? 'bg-gray-50' : ''}`}>
          {logo && !hasError ? (
            <img alt="" className={`w-full h-full object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity`}
              src={logo} loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setHasError(true)} />
          ) : (
            <span className="material-symbols-outlined text-2xl text-gray-300">rocket_launch</span>
          )}
        </div>
        <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-black transition-colors line-clamp-2 min-w-0">
          {displayTitle}
        </h3>
      </div>

      {/* Description */}
      <div className="px-4 pb-3 flex-grow">
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{description}</p>
      </div>

      {/* Value — pinned bottom */}
      <div className="px-4 pb-4 mt-auto border-t border-gray-100 pt-3">
        <p className="text-base font-bold text-green-600 font-mono">{value}</p>
        {valueSubtext && (
          <p className="text-[11px] text-gray-400 mt-0.5">{valueSubtext}</p>
        )}
      </div>
      </LinkComponent>
    </div>
  )
}
