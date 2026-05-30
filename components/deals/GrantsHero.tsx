'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function GrantsHero() {
  return (
    <SectionHero
      eyebrowIcon="payments"
      eyebrowText="Non-Dilutive Funding"
      eyebrowClass="bg-emerald-100 border-emerald-300 text-emerald-900"
      eyebrowAccentClass="text-emerald-700"
      mandalaColorClass="text-emerald-500"
      statsMinWidth="lg:min-w-[520px]"
      title={<>Get funded. Keep your equity.</>}
      subtitle={
        <>
          Verified grants, competitions, and{' '}
          <span className="font-bold text-gray-900 bg-emerald-100 px-1 rounded-sm">non-dilutive capital</span>{' '}
          from government agencies, foundations, and global programs &mdash; eligibility, deadlines, and award sizes in one place.
        </>
      }
      stats={[
        {
          label: 'Tracked Funding',
          value: '$237M+',
          delta: 'Across programs',
          icon: 'account_balance',
          iconColor: 'text-emerald-600',
          iconBg: 'bg-emerald-100',
          highlight: true,
          accent: '52,211,153',
          valueGradient: 'from-emerald-300 to-green-200',
          ornamentColor: 'text-emerald-300',
        },
        {
          label: 'Equity Taken',
          value: '0%',
          delta: 'Fully non-dilutive',
          icon: 'shield',
          iconColor: 'text-green-700',
          iconBg: 'bg-green-100',
        },
        {
          label: 'Sources',
          value: 'Gov · Foundation',
          delta: 'Vetted issuers',
          icon: 'verified',
          iconColor: 'text-teal-600',
          iconBg: 'bg-teal-100',
        },
      ]}
    />
  )
}
