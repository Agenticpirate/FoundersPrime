'use client'

import { BrandLogoPlate } from '@/components/ui/BrandLogo'

export interface CardBrandHeaderProps {
  name: string
  domain?: string
  logo?: string | null
  /** Use white text on permanently dark card surfaces. */
  onDark?: boolean
  /** Reserve room for an absolute badge or folded corner without moving the logo. */
  endClearance?: 'none' | 'badge' | 'corner'
  className?: string
  plateClassName?: string
  textClassName?: string
}

/**
 * Canonical card brand track.
 * Every card gets the same 40px logo column, 10px gap, 44px row, and text baseline.
 * Parent cards own the shared 14px mobile / 16px desktop outer inset.
 */
export function CardBrandHeader({
  name,
  domain,
  logo,
  onDark = false,
  endClearance = 'none',
  className = '',
  plateClassName = '',
  textClassName = '',
}: CardBrandHeaderProps) {
  const clearanceClass =
    endClearance === 'badge'
      ? 'pr-9 md:pr-12'
      : endClearance === 'corner'
        ? 'pr-6'
        : ''

  return (
    <div
      data-card-brand-header="v1"
      className={`relative z-[1] grid h-11 w-full min-w-0 shrink-0 items-center gap-2.5 ${clearanceClass} ${className}`}
      style={{ gridTemplateColumns: '40px minmax(0, 1fr)' }}
    >
      <BrandLogoPlate
        name={name}
        domain={domain}
        logo={logo}
        size="md"
        plateClassName={plateClassName}
      />
      <h3
        className={`min-w-0 overflow-hidden text-[12px] font-black leading-[1.2] line-clamp-2 md:text-[14px] ${
          onDark ? 'text-white' : 'text-gray-900 dark:text-white'
        } ${textClassName}`}
        title={name}
      >
        {name}
      </h3>
    </div>
  )
}

export default CardBrandHeader
