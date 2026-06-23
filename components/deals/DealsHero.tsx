'use client'

import SectionHero from '@/components/ui/SectionHero'

export default function DealsHero() {
    return (
        <SectionHero
            eyebrowText="Verified Opportunities"
            eyebrowClass="bg-accent-yellow/15 border-accent-yellow/40 text-gray-800 dark:text-gray-300 dark:border-accent-yellow/20"
            eyebrowAccentClass="text-accent-yellow"
            mandalaColorClass="text-gray-900 dark:text-white/5"
            statsMinWidth="lg:min-w-[560px]"
            title={<>Startup Deals &amp; Credits</>}
            subtitle={
                <>
                    Verified opportunities to save money and grow faster. Access{' '}
                    <span className="font-bold text-gray-900 dark:text-accent-yellow bg-accent-yellow/30 dark:bg-accent-yellow/10 px-1 rounded-sm">$2.4M+</span>{' '}
                    in cloud credits, SaaS discounts, grants, and more.
                </>
            }
            stats={[
                {
                    label: 'Active Deals',
                    value: '523',
                    delta: 'Live now',
                    icon: 'local_offer',
                    iconColor: 'text-sky-600',
                    iconBg: 'bg-sky-100',
                },
                {
                    label: 'Total Value',
                    value: '$2.4M+',
                    delta: 'Across all deals',
                    icon: 'payments',
                    iconColor: 'text-amber-600',
                    iconBg: 'bg-accent-yellow/30',
                    highlight: true,
                    accent: '255,221,0',
                    valueGradient: 'from-accent-yellow to-amber-300',
                    ornamentColor: 'text-accent-yellow',
                },
                {
                    label: 'New This Week',
                    value: '47',
                    delta: 'Latest adds',
                    icon: 'new_releases',
                    iconColor: 'text-emerald-600',
                    iconBg: 'bg-emerald-100',
                },
            ]}
        />
    )
}
