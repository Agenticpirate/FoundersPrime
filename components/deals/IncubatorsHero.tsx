'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function IncubatorsHero() {
  return (
    <SectionHero
      eyebrowIcon="lightbulb"
      eyebrowText="Incubators & Venture Studios"
      eyebrowClass="bg-violet-100 dark:bg-violet-950/20 border-violet-300 dark:border-violet-500/30 text-violet-900 dark:text-violet-300"
      eyebrowAccentClass="text-violet-700"
      mandalaColorClass="text-violet-500 dark:text-violet-500/10"
      statsMinWidth="lg:min-w-[520px]"
      title={<>Build before you scale.</>}
      subtitle={
        <>
          Verified incubators, university programs, and venture studios &mdash; many{' '}
          <span className="font-bold text-gray-900 dark:text-violet-300 bg-violet-100 dark:bg-violet-950/40 px-1 rounded-sm">equity-free</span>,
          offering lab space, co-founders, and 6&ndash;24 months of runway support.
        </>
      }
      stats={[
        {
          label: 'Programs',
          value: '180+',
          delta: 'Global directory',
          icon: 'lightbulb',
          iconColor: 'text-violet-600',
          iconBg: 'bg-violet-100',
        },
        {
          label: 'Support Window',
          value: '6–24mo',
          delta: 'Idea to MVP',
          icon: 'schedule',
          iconColor: 'text-sky-600',
          iconBg: 'bg-sky-100',
          highlight: true,
          accent: '45,212,191',
          valueGradient: 'from-violet-300 to-sky-200',
          ornamentColor: 'text-violet-300',
        },
        {
          label: 'Equity',
          value: '0% – 8%',
          delta: 'Many equity-free',
          icon: 'shield',
          iconColor: 'text-amber-700',
          iconBg: 'bg-amber-100',
        },
      ]}
    />
  )
}
