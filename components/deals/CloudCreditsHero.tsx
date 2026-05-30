'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function CloudCreditsHero() {
  return (
    <SectionHero
      eyebrowIcon="cloud"
      eyebrowText="Cloud Infrastructure Deals"
      eyebrowClass="bg-sky-100 border-sky-300 text-sky-900"
      eyebrowAccentClass="text-sky-600"
      mandalaColorClass="text-sky-500"
      statsMinWidth="lg:min-w-[520px]"
      title={<>Cloud credits for builders.</>}
      subtitle={
        <>
          Verified credit programs from{' '}
          <span className="font-bold text-gray-900 bg-sky-100 px-1 rounded-sm">AWS, GCP, Azure</span>{' '}
          and other infrastructure providers — eligibility, application steps, and tips, all in one place.
        </>
      }
      stats={[
        {
          label: 'Programs',
          value: '15+',
          delta: 'Active deals',
          icon: 'cloud',
          iconColor: 'text-sky-600',
          iconBg: 'bg-sky-100',
        },
        {
          label: 'Providers',
          value: '40+',
          delta: 'Vetted brands',
          icon: 'domain',
          iconColor: 'text-indigo-600',
          iconBg: 'bg-indigo-50',
          highlight: true,
          accent: '125,211,252',
          valueGradient: 'from-sky-300 to-cyan-200',
          ornamentColor: 'text-sky-300',
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
