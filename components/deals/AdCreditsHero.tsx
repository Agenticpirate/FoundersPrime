'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function AdCreditsHero() {
  return (
    <SectionHero
      eyebrowIcon="campaign"
      eyebrowText="Ad Credit Programs"
      eyebrowClass="bg-pink-100 border-pink-300 text-pink-900"
      eyebrowAccentClass="text-pink-600"
      mandalaColorClass="text-pink-500"
      statsMinWidth="lg:min-w-[520px]"
      title={<>Acquire your first users.</>}
      subtitle={
        <>
          Verified ad credit programs from{' '}
          <span className="font-bold text-gray-900 bg-pink-100 px-1 rounded-sm">Google, Meta, LinkedIn, X, TikTok</span>{' '}
          and more — eligibility, application steps, and platform tips, all in one place.
        </>
      }
      stats={[
        {
          label: 'Programs',
          value: '12+',
          delta: 'Active deals',
          icon: 'campaign',
          iconColor: 'text-pink-600',
          iconBg: 'bg-pink-100',
        },
        {
          label: 'Platforms',
          value: '10+',
          delta: 'Search · social · B2B',
          icon: 'public',
          iconColor: 'text-rose-600',
          iconBg: 'bg-rose-50',
          highlight: true,
          accent: '244,114,182',
          valueGradient: 'from-pink-300 to-rose-200',
          ornamentColor: 'text-pink-300',
        },
        {
          label: 'Refresh',
          value: 'Weekly',
          delta: 'Reviewed',
          icon: 'update',
          iconColor: 'text-emerald-600',
          iconBg: 'bg-emerald-100',
        },
      ]}
    />
  )
}
