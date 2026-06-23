"use client";

import Link from 'next/link';
import SectionHero from '@/components/ui/SectionHero';
import Mandala from '@/components/ui/Mandala';

interface StartupsHeaderProps {
  count: number;
}

export default function StartupsHeader({ count }: StartupsHeaderProps) {
  const activeStartupsCount = count || 0;


  return (
    <div className="mb-4 md:mb-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex mb-3">
        <ol className="inline-flex items-center space-x-1 font-mono text-sm font-medium">
          <li className="inline-flex items-center">
            <Link className="text-gray-500 hover:text-black" href="/">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
              <Link className="text-gray-500 hover:text-black" href="/resources">Resources</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
              <span className="text-black bg-accent-yellow/30 px-2 py-0.5 rounded-sm border border-black">Verified Startups</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Premium hero — shared SectionHero (mandala + stat cards) */}
      <SectionHero
        eyebrowIcon="rocket_launch"
        eyebrowText="Discover + Invest"
        eyebrowClass="bg-accent-yellow/15 border-accent-yellow/40 text-gray-800"
        eyebrowAccentClass="text-accent-yellow"
        mandalaColorClass="text-gray-900"
        statsMinWidth="lg:min-w-[560px]"
        title={<>Verified Startups</>}
        subtitle={
          <>
            Access{' '}
            <span className="font-bold text-gray-900 bg-accent-yellow/30 px-1 rounded-sm">verified</span>{' '}
            high-potential startups. Direct data from Y Combinator and top accelerators — real metrics, vetted founders, breakout opportunities.
          </>
        }
        stats={[
          {
            label: 'Total Valuation',
            value: '$4.2B+',
            delta: 'Across companies',
            icon: 'trending_up',
            iconColor: 'text-amber-600',
            iconBg: 'bg-accent-yellow/30',
            highlight: true,
            accent: '255,221,0',
            valueGradient: 'from-accent-yellow to-amber-300',
            ornamentColor: 'text-accent-yellow',
          },
          {
            label: 'Verified',
            value: activeStartupsCount.toLocaleString(),
            delta: 'YC + accelerators',
            icon: 'verified',
            iconColor: 'text-sky-600',
            iconBg: 'bg-sky-100',
          },
          {
            label: 'Avg Seed',
            value: '$3.5M',
            delta: 'Per round',
            icon: 'paid',
            iconColor: 'text-emerald-600',
            iconBg: 'bg-emerald-100',
          },
        ]}
      />

      {/* Motivation Card — premium, with mandala */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#111] rounded-sm p-4 md:p-6 overflow-hidden mt-4 md:mt-6">
        <Mandala
          variant="orbital"
          colorClass="text-accent-yellow"
          opacity={0.12}
          speed={70}
          className="absolute -bottom-12 -right-12 w-44 h-44"
        />
        <Mandala
          variant="rings"
          colorClass="text-accent-yellow"
          opacity={0.07}
          speed={100}
          direction="ccw"
          className="absolute -top-14 -left-14 w-40 h-40 hidden md:block"
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent" />

        <div className="relative">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-accent-yellow mb-2 inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent-yellow animate-pulse" />
            Acquisition & Investment Database
          </p>
          <h2 className="font-mono text-base md:text-xl font-black text-white mb-2 leading-tight">
            Vetted startups with real metrics and revenue.
          </h2>
          <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed max-w-2xl mb-3">
            Skip the broker fees. Connect directly with founders from top accelerators like Y Combinator.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Verified Revenue', 'Vetted Founders', 'Direct Contact'].map(tag => (
              <div key={tag} className="inline-flex items-center gap-1 bg-white/5 text-gray-200 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wide border border-white/10 rounded-sm">
                <span className="material-symbols-outlined text-[12px] text-accent-yellow">check</span>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
