'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function StudentFundingHero() {
  return (
    <SectionHero
      eyebrowIcon="school"
      eyebrowText="Grants + Scholarships"
      eyebrowClass="bg-accent-yellow/15 border-accent-yellow/40 text-gray-800"
      eyebrowAccentClass="text-accent-yellow"
      mandalaColorClass="text-gray-900"
      statsMinWidth="lg:min-w-[540px]"
      title={<>Student Funding &amp; Opportunities</>}
      subtitle={
        <>
          Grants, scholarships, and competitions for student founders. Over{' '}
          <span className="font-bold text-gray-900 bg-accent-yellow/30 px-1 rounded-sm">$500K+</span>{' '}
          in funding available — no equity, no payback.
        </>
      }
      stats={[
        {
          label: 'Total Value',
          value: '$500K+',
          delta: 'Across programs',
          icon: 'payments',
          iconColor: 'text-amber-600',
          iconBg: 'bg-accent-yellow/30',
          highlight: true,
          accent: '255,221,0',
          valueGradient: 'from-accent-yellow to-amber-300',
          ornamentColor: 'text-accent-yellow',
        },
        {
          label: 'Eligibility',
          value: 'Students',
          delta: 'School verified',
          icon: 'school',
          iconColor: 'text-sky-600',
          iconBg: 'bg-sky-100',
        },
        {
          label: 'Funding Type',
          value: 'Non-Dilutive',
          delta: '0% equity',
          icon: 'shield',
          iconColor: 'text-emerald-600',
          iconBg: 'bg-emerald-100',
        },
      ]}
    />
  )
}
