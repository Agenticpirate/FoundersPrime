'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function GrantsHero() {
  return (
    <SectionHero
      eyebrowIcon="payments"
      eyebrowText="Non-Dilutive Funding"
      eyebrowClass="bg-amber-100 dark:bg-accent-yellow/10 border-amber-300 dark:border-accent-yellow/30 text-amber-900 dark:text-accent-yellow"
      eyebrowAccentClass="text-amber-800"
      mandalaColorClass="text-accent-yellow dark:text-accent-yellow/10"
      statsMinWidth="lg:min-w-[520px]"
      title={<>Get funded. Keep your equity.</>}
      subtitle={
        <>
          Verified grants, competitions, and{' '}
          <span className="font-bold text-gray-900 dark:text-accent-yellow bg-amber-100 dark:bg-accent-yellow/10 px-1 rounded-sm">non-dilutive capital</span>{' '}
          from government agencies, foundations, and global programs &mdash; eligibility, deadlines, and award sizes in one place.
        </>
      }
      stats={[
        {
          label: 'Tracked Funding',
          value: '$237M+',
          delta: 'Across programs',
          icon: 'account_balance',
          iconColor: 'text-amber-700',
          iconBg: 'bg-amber-100',
          highlight: true,
          accent: '52,211,153',
          valueGradient: 'from-amber-300 to-yellow-200',
          ornamentColor: 'text-accent-yellow',
        },
        {
          label: 'Equity Taken',
          value: '0%',
          delta: 'Fully non-dilutive',
          icon: 'shield',
          iconColor: 'text-amber-800',
          iconBg: 'bg-amber-100',
        },
        {
          label: 'Sources',
          value: 'Gov · Foundation',
          delta: 'Vetted issuers',
          icon: 'verified',
          iconColor: 'text-violet-600',
          iconBg: 'bg-violet-100',
        },
      ]}
    />
  )
}
