'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function StudentBenefitsHero() {
  return (
    <SectionHero
      eyebrowIcon="school"
      eyebrowText="Student Benefits"
      eyebrowClass="bg-cyan-100 dark:bg-cyan-950/20 border-cyan-300 dark:border-cyan-500/30 text-cyan-900 dark:text-cyan-300"
      eyebrowAccentClass="text-cyan-600"
      mandalaColorClass="text-cyan-500 dark:text-cyan-500/10"
      statsMinWidth="lg:min-w-[560px]"
      title={<>Free Software, Credits &amp; Funding.</>}
      subtitle={
        <>
          Over{' '}
          <span className="font-bold text-gray-900 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/40 px-1 rounded-sm">
            $200k+ in free licenses, cloud credits, and opportunities
          </span>{' '}
          exclusively for verified student founders and builders.
        </>
      }
      stats={[
        {
          label: 'Student Deals',
          value: '900+',
          delta: 'Verified &amp; active',
          icon: 'school',
          iconColor: 'text-cyan-600',
          iconBg: 'bg-cyan-100',
          highlight: true,
          accent: '6,182,212',
          valueGradient: 'from-cyan-400 to-sky-300',
          ornamentColor: 'text-cyan-300',
        },
        {
          label: 'Free Value',
          value: '$200K+',
          delta: 'Per eligible founder',
          icon: 'savings',
          iconColor: 'text-emerald-600',
          iconBg: 'bg-emerald-100',
        },
        {
          label: 'Categories',
          value: '15+',
          delta: 'Developer, design &amp; retail',
          icon: 'apps',
          iconColor: 'text-indigo-600',
          iconBg: 'bg-indigo-100',
        },
      ]}
    />
  )
}
