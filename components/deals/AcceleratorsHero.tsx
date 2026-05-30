'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function AcceleratorsHero() {
  return (
    <SectionHero
      eyebrowIcon="rocket_launch"
      eyebrowText="Accelerator Programs"
      eyebrowClass="bg-orange-100 border-orange-300 text-orange-900"
      eyebrowAccentClass="text-orange-600"
      mandalaColorClass="text-orange-500"
      statsMinWidth="lg:min-w-[520px]"
      title={<>Accelerators that move you forward.</>}
      subtitle={
        <>
          Funding, mentorship, and demo-day networks from{' '}
          <span className="font-bold text-gray-900 bg-orange-100 px-1 rounded-sm">YC, Techstars, 500 Global</span>{' '}
          and 280+ programs &mdash; verified terms, deadlines, and equity in one place.
        </>
      }
      stats={[
        {
          label: 'Programs',
          value: '280+',
          delta: 'Global coverage',
          icon: 'rocket_launch',
          iconColor: 'text-orange-600',
          iconBg: 'bg-orange-100',
        },
        {
          label: 'Avg Investment',
          value: '$250K',
          delta: 'Pre-seed to seed',
          icon: 'payments',
          iconColor: 'text-amber-700',
          iconBg: 'bg-amber-100',
          highlight: true,
          accent: '255,165,68',
          valueGradient: 'from-orange-300 to-amber-200',
          ornamentColor: 'text-orange-300',
        },
        {
          label: 'Acceptance',
          value: '~2%',
          delta: 'Top programs',
          icon: 'filter_alt',
          iconColor: 'text-rose-600',
          iconBg: 'bg-rose-100',
        },
      ]}
    />
  )
}
