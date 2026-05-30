'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function SaasDiscountsHero() {
  return (
    <SectionHero
      eyebrowIcon="apps"
      eyebrowText="SaaS Discount Programs"
      eyebrowClass="bg-indigo-100 border-indigo-300 text-indigo-900"
      eyebrowAccentClass="text-indigo-600"
      mandalaColorClass="text-indigo-500"
      statsMinWidth="lg:min-w-[520px]"
      title={<>SaaS discounts for startups.</>}
      subtitle={
        <>
          Cut your software costs by up to{' '}
          <span className="font-bold text-gray-900 bg-indigo-100 px-1 rounded-sm">90%</span>{' '}
          with exclusive startup discounts. Access Notion, Figma, Slack, and hundreds of other platforms.
        </>
      }
      stats={[
        {
          label: 'Tools',
          value: '240+',
          delta: 'Verified deals',
          icon: 'apps',
          iconColor: 'text-indigo-600',
          iconBg: 'bg-indigo-100',
        },
        {
          label: 'Savings',
          value: '$50K+',
          delta: 'Across the stack',
          icon: 'savings',
          iconColor: 'text-violet-600',
          iconBg: 'bg-violet-50',
          highlight: true,
          accent: '129,140,248',
          valueGradient: 'from-indigo-300 to-violet-200',
          ornamentColor: 'text-indigo-300',
        },
        {
          label: 'Categories',
          value: '25+',
          delta: 'Every workflow',
          icon: 'category',
          iconColor: 'text-emerald-600',
          iconBg: 'bg-emerald-100',
        },
      ]}
    />
  )
}
