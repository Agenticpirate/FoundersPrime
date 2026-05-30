"use client";

import { useState } from 'react';
import Link from 'next/link';
import startupsData from "@/data/yc_companies_2024_2026.json";
import SectionHero from '@/components/ui/SectionHero';
import Mandala from '@/components/ui/Mandala';

export default function StartupsHeader() {
  const activeStartupsCount = (startupsData as any[]).length || 0;
  const [showInsights, setShowInsights] = useState(false);

  const trends = [
    { tip: 'AI-Native Vertical SaaS', description: 'Explosion of AI agents replacing services in law, medicine, and accounting.' },
    { tip: 'Hard Tech Revival', description: 'Surge in defense, aerospace, and huge manufacturing bets.' },
    { tip: 'Open Source Infrastructure', description: 'Dev tools moving from "growth at all costs" to monetization-first models.' },
    { tip: 'Climate & Energy', description: 'Founders building the operating system for the energy transition.' }
  ];

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

      {/* Insights — collapsible on mobile to surface the startup list faster; always open on desktop */}
      <button
        type="button"
        onClick={() => setShowInsights((v) => !v)}
        aria-expanded={showInsights}
        className="md:hidden mt-4 w-full flex items-center justify-between gap-2 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#111] rounded-sm px-3.5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.1em] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0px_0px_#111] transition-all"
      >
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined !text-[16px] text-accent-yellow bg-black rounded-sm p-0.5">insights</span>
          Market Insights &amp; Benchmarks
        </span>
        <span className={`material-symbols-outlined !text-[18px] transition-transform ${showInsights ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Insights Grid */}
      <div className={`${showInsights ? 'grid' : 'hidden'} md:grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mt-3 md:mt-6`}>
        <div className="lg:col-span-8">
          <div className="relative bg-white border-2 border-black shadow-[4px_4px_0px_0px_#111] rounded-sm p-5 md:p-8 overflow-hidden h-full">
            {/* Decorative spinning mandala */}
            <Mandala
              variant="rings"
              colorClass="text-gray-900"
              opacity={0.05}
              speed={90}
              className="absolute -top-12 -right-12 w-48 h-48 hidden md:block"
            />

            <h2 className="relative font-mono text-xl md:text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <span className="bg-black text-white size-8 flex items-center justify-center text-lg rounded-sm shrink-0">1</span>
              Startup Ecosystem Trends
            </h2>

            <div className="relative prose prose-neutral max-w-none">
              <h3 className="font-mono text-[10px] md:text-xs font-bold uppercase mb-3 text-accent-yellow bg-black inline-block px-2 py-0.5 rounded-sm">
                Market Overview
              </h3>
              <p className="font-sans text-gray-700 mb-6 text-sm leading-relaxed">
                The current vintage of startups is defined by extreme efficiency and rapid deployment of AI. We are seeing a shift away from consumer social apps towards "serious" B2B infrastructure, defense tech, and bio-engineering.
              </p>

              <div className="bg-gray-50 border border-gray-200 p-3 md:p-4 rounded-lg">
                <p className="font-mono text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-3 tracking-[0.1em]">Key Themes</p>
                <div className="space-y-3">
                  {trends.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 border-b border-gray-200 pb-2 last:border-b-0 last:pb-0">
                      <div className="bg-accent-yellow text-black size-6 flex items-center justify-center text-[10px] md:text-xs font-bold rounded-sm flex-shrink-0 mt-0.5 border border-black">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-mono font-bold text-[10px] md:text-xs mb-1 leading-snug">{item.tip}</div>
                        <p className="font-sans text-[10px] md:text-xs text-gray-600 leading-snug">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          {/* Pro Tip Card */}
          <div className="relative bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_0px_#111] rounded-sm p-6 overflow-hidden">
            <Mandala
              variant="orbital"
              colorClass="text-black"
              opacity={0.08}
              speed={70}
              direction="ccw"
              className="absolute -bottom-10 -left-10 w-36 h-36"
            />
            <div className="absolute -right-4 -top-4 bg-white border-2 border-black rounded-full p-2 size-16 flex items-end justify-center">
              <span className="material-symbols-outlined text-3xl mb-1">lightbulb</span>
            </div>
            <h3 className="relative font-mono text-xl font-bold mb-3 uppercase">Valuation Benchmarks</h3>
            <p className="relative font-mono text-xs leading-relaxed font-medium">
              Post-money valuations for top-tier Seed rounds have stabilized at $12M-$15M, with AI companies often commanding a premium ($20M+).
            </p>
          </div>

          {/* Program Terms Card */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#111] rounded-sm p-6 overflow-hidden">
            <Mandala
              variant="rings"
              colorClass="text-accent-yellow"
              opacity={0.1}
              speed={80}
              className="absolute -top-10 -right-10 w-36 h-36"
            />
            <h3 className="relative font-mono text-lg font-bold mb-3 text-accent-yellow">Standard YC Deal</h3>
            <div className="relative space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-gray-300">Investment</span>
                <span className="font-bold text-right text-xs text-gray-400">Total<br /><span className="text-white">$500,000</span></span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-gray-300">Equity</span>
                <span className="font-bold text-right text-xs text-gray-400">Standard<br /><span className="text-white">7%</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Structure</span>
                <span className="font-bold text-right text-xs text-gray-400">Instrument<br /><span className="text-white">Post-Money SAFE</span></span>
              </div>
            </div>
            <div className="relative mt-4 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-400 font-mono">
                💡 Most recent batch companies raise additional capital immediately after Demo Day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
