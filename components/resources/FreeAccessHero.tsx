'use client'

import SectionHero from '@/components/ui/SectionHero'

interface FreeAccessHeroProps {
  /** Number of free-access tools available. */
  toolCount?: number
  /** Number of distinct categories. */
  categoryCount?: number
}

export default function FreeAccessHero({ toolCount = 0, categoryCount = 0 }: FreeAccessHeroProps) {
  return (
    <SectionHero
      eyebrowIcon="workspace_premium"
      eyebrowText="Student Benefits"
      eyebrowClass="bg-accent-yellow/15 border-accent-yellow/40 text-gray-800"
      eyebrowAccentClass="text-accent-yellow"
      mandalaColorClass="text-gray-900"
      statsMinWidth="lg:min-w-[540px]"
      title={<>Free Access Tools</>}
      subtitle={
        <>
          Professional tools and licenses available at{' '}
          <span className="font-bold text-gray-900 bg-accent-yellow/30 px-1 rounded-sm">no cost</span>{' '}
          to students. Unlock premium software with your .edu email.
        </>
      }
      stats={[
        {
          label: 'Price',
          value: 'Free',
          delta: 'No cost to students',
          icon: 'card_giftcard',
          iconColor: 'text-amber-600',
          iconBg: 'bg-accent-yellow/30',
          highlight: true,
          accent: '255,221,0',
          valueGradient: 'from-accent-yellow to-amber-300',
          ornamentColor: 'text-accent-yellow',
        },
        {
          label: 'Tools Available',
          value: toolCount > 0 ? `${toolCount}+` : 'Curated',
          delta: 'Verified licenses',
          icon: 'apps',
          iconColor: 'text-sky-600',
          iconBg: 'bg-sky-100',
        },
        {
          label: 'Categories',
          value: categoryCount > 0 ? `${categoryCount}` : 'Multiple',
          delta: 'Across workflows',
          icon: 'category',
          iconColor: 'text-emerald-600',
          iconBg: 'bg-emerald-100',
        },
      ]}
    />
  )
}
