'use client'

import BrandLogo from '@/components/ui/BrandLogo'
import { resolveBrandDomain } from '@/lib/brand-domain'
import { isUsableLogoUrl } from '@/lib/logo-utils'

interface DealLogoProps {
  logoUrl?: string
  brandIcon?: string
  provider: string
  /** Optional website for better logo domain resolution (e.g. 500.co) */
  website?: string
  size?: 'sm' | 'md' | 'lg'
}

function usable(url?: string): string | undefined {
  if (!url) return undefined
  const u = url.trim()
  if (!u || !isUsableLogoUrl(u)) return undefined
  if (u.includes('rocket') || u.includes('placeholder')) return undefined
  if (!/^https?:\/\//i.test(u) && !u.startsWith('/')) return undefined
  return u
}

/**
 * Deal / student / program detail logo —
 * fixed plate size so brand marks always sit on the same origin.
 */
export default function DealLogo({
  logoUrl,
  brandIcon,
  provider,
  website,
  size = 'md',
}: DealLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  }
  const brandSize = size === 'sm' ? 'md' : 'lg'

  const domain = resolveBrandDomain({
    name: provider,
    website,
    logo: logoUrl || brandIcon,
  })
  const logo = usable(logoUrl) || usable(brandIcon)

  return (
    <div
      className={`relative ${sizeClasses[size]} bg-white border border-black/10 dark:border-white/10 rounded-xl flex-shrink-0 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden`}
    >
      <div className="absolute inset-0 flex items-center justify-center p-2">
        <BrandLogo
          name={provider}
          domain={domain}
          logo={logo}
          size={brandSize}
          eager
          className="!w-full !h-full !max-w-full !max-h-full !rounded-none !border-0 !p-0 !bg-transparent !shadow-none !inline-flex"
        />
      </div>
    </div>
  )
}
