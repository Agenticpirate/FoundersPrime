'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function SaasHero() {
  return (
    <SectionHero
      eyebrowIcon="apps"
      eyebrowText="SaaS Stack Deals"
      eyebrowClass="bg-indigo-100 border-indigo-300 text-indigo-900"
      eyebrowAccentClass="text-indigo-600"
      mandalaColorClass="text-indigo-500"
      statsMinWidth="lg:min-w-[520px]"
      title={<>Tools at founder rates.</>}
      subtitle={
        <>
          Vetted discount programs from{' '}
          <span className="font-bold text-gray-900 bg-indigo-100 px-1 rounded-sm">Notion, Linear, HubSpot, Stripe</span>{' '}
          and 200+ other tools — eligibility, application steps, and tips, all in one place.
        </>
      }
      stats={[
        {
          label: 'Tools',
          value: '200+',
          delta: 'In catalog',
          icon: 'apps',
          iconColor: 'text-indigo-600',
          iconBg: 'bg-indigo-100',
        },
        {
          label: 'Categories',
          value: '8+',
          delta: 'Stage-matched',
          icon: 'category',
          iconColor: 'text-purple-600',
          iconBg: 'bg-purple-50',
          highlight: true,
          accent: '196,181,253',
          valueGradient: 'from-purple-300 to-pink-200',
          ornamentColor: 'text-purple-300',
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
