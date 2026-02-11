'use client'

interface DealLogoProps {
  logoUrl?: string
  brandIcon?: string
  provider: string
  size?: 'sm' | 'md' | 'lg'
}

export default function DealLogo({ logoUrl, brandIcon, provider, size = 'md' }: DealLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 p-2',
    md: 'w-20 h-20 p-3',
    lg: 'w-24 h-24 p-4'
  }

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  }

  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(provider)}&background=f3f4f6&color=1f2937&size=80&bold=true`
  const imageUrl = logoUrl || brandIcon || fallbackUrl
  const hasValidLogo = imageUrl && !imageUrl.includes('ui-avatars.com')

  return (
    <div className={`${sizeClasses[size]} bg-white border-3 border-black rounded-lg flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_#111111] transition-colors ${!hasValidLogo ? 'group-hover:bg-yellow-50' : ''}`}>
      {hasValidLogo ? (
        <img 
          alt={`${provider} Logo`} 
          className="w-full h-full object-contain" 
          src={imageUrl}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.classList.add('group-hover:bg-yellow-50')
              parent.innerHTML = `<span class="material-symbols-outlined ${iconSizes[size]} text-yellow-500 group-hover:text-yellow-600 group-hover:scale-110 transition-all duration-200 animate-pulse">rocket_launch</span>`
            }
          }}
        />
      ) : (
        <span className={`material-symbols-outlined ${iconSizes[size]} text-yellow-500 group-hover:text-yellow-600 group-hover:scale-110 transition-all duration-200`}>
          rocket_launch
        </span>
      )}
    </div>
  )
}
