'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function IncubatorsHero() {
  return (
    <SectionHero
      eyebrowIcon="lightbulb"
      eyebrowText="Incubators & Venture Studios"
      eyebrowClass="bg-teal-100 border-teal-300 text-teal-900"
      eyebrowAccentClass="text-teal-700"
      mandalaColorClass="text-teal-500"
      statsMinWidth="lg:min-w-[520px]"
      title={<>Build before you scale.</>}
      subtitle={
        <>
          Verified incubators, university programs, and venture studios &mdash; many{' '}
          <span className="font-bold text-gray-900 bg-teal-100 px-1 rounded-sm">equity-free</span>,
          offering lab space, co-founders, and 6&ndash;24 months of runway support.
        </>
      }
      stats={[
        {
          label: 'Programs',
          value: '180+',
          delta: 'Global directory',
          icon: 'lightbulb',
          iconColor: 'text-teal-600',
          iconBg: 'bg-teal-100',
        },
        {
          label: 'Support Window',
          value: '6–24mo',
          delta: 'Idea to MVP',
          icon: 'schedule',
          iconColor: 'text-cyan-700',
          iconBg: 'bg-cyan-100',
          highlight: true,
          accent: '45,212,191',
          valueGradient: 'from-teal-300 to-cyan-200',
          ornamentColor: 'text-teal-300',
        },
        {
          label: 'Equity',
          value: '0% – 8%',
          delta: 'Many equity-free',
          icon: 'shield',
          iconColor: 'text-emerald-600',
          iconBg: 'bg-emerald-100',
        },
      ]}
    />
  )
}
