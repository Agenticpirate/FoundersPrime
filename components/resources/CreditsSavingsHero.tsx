'use client'

import SectionHero from '@/components/ui/SectionHero'

interface CreditsSavingsHeroProps {
  /** Number of credit/savings benefits available. */
  toolCount?: number
  /** Number of distinct categories. */
  categoryCount?: number
}

export default function CreditsSavingsHero({ toolCount = 0, categoryCount = 0 }: CreditsSavingsHeroProps) {
  return (
    <SectionHero
      eyebrowIcon="savings"
      eyebrowText="Student Benefits"
      eyebrowClass="bg-accent-yellow/15 border-accent-yellow/40 text-gray-800"
      eyebrowAccentClass="text-accent-yellow"
      mandalaColorClass="text-gray-900"
      statsMinWidth="lg:min-w-[540px]"
      title={<>Credits &amp; Savings</>}
      subtitle={
        <>
          Exclusive savings and cloud credits to help you{' '}
          <span className="font-bold text-gray-900 bg-accent-yellow/30 px-1 rounded-sm">build for less</span>.
          Stretch your runway with student-only discounts.
        </>
      }
      stats={[
        {
          label: 'Potential Savings',
          value: '$100K+',
          delta: 'Across providers',
          icon: 'savings',
          iconColor: 'text-amber-600',
          iconBg: 'bg-accent-yellow/30',
          highlight: true,
          accent: '255,221,0',
          valueGradient: 'from-accent-yellow to-amber-300',
          ornamentColor: 'text-accent-yellow',
        },
        {
          label: 'Offers Available',
          value: toolCount > 0 ? `${toolCount}+` : 'Curated',
          delta: 'Verified discounts',
          icon: 'sell',
          iconColor: 'text-sky-600',
          iconBg: 'bg-sky-100',
        },
        {
          label: 'Categories',
          value: categoryCount > 0 ? `${categoryCount}` : 'Multiple',
          delta: 'Cloud · SaaS · Tools',
          icon: 'category',
          iconColor: 'text-emerald-600',
          iconBg: 'bg-emerald-100',
        },
      ]}
    />
  )
}
