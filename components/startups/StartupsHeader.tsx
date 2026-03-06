"use client";

import { useMemo } from 'react';
import startupsData from "@/data/yc_companies_2024_2026.json";

export default function StartupsHeader() {
  const activeStartupsCount = (startupsData as any[]).length || 0;

  const trends = [
    { tip: 'AI-Native Vertical SaaS', description: 'Explosion of AI agents replacing services in law, medicine, and accounting.' },
    { tip: 'Hard Tech Revival', description: 'Surge in defense, aerospace, and huge manufacturing bets.' },
    { tip: 'Open Source Infrastructure', description: 'Dev tools moving from "growth at all costs" to monetization-first models.' },
    { tip: 'Climate & Energy', description: 'Founders building the operating system for the energy transition.' }
  ];

  return (
    <div className="mb-12">
      {/* Compact Header */}
      <div className="mb-6 md:mb-8">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
          DISCOVER + INVEST
        </div>
        <h1 className="font-mono text-3xl md:text-5xl font-bold tracking-tight text-black mb-3 md:mb-4 leading-tight">
          Verified Startups
        </h1>
        <p className="font-sans text-sm md:text-lg text-gray-700 leading-relaxed max-w-3xl">
          Access <span className="font-bold text-black bg-primary/20 px-1">{activeStartupsCount}+</span> verified high-potential startups. Direct data from Y Combinator and top accelerators. Real metrics, vetted founders, and breakout opportunities.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Verified Companies</p>
            <p className="font-mono text-2xl font-bold text-black">{activeStartupsCount}</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-black">verified</span>
        </div>

        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Valuation</p>
            <p className="font-mono text-2xl font-bold text-white">$4.2B+</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-primary">trending_up</span>
        </div>

        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Avg Seed Round</p>
            <p className="font-mono text-2xl font-bold text-black">$3.5M</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-black">paid</span>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-5 md:p-8 relative overflow-hidden h-full">
            {/* Decorative background pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[100px] md:text-[150px]">insights</span>
            </div>

            <h2 className="font-mono text-xl md:text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <span className="bg-black text-white size-8 flex items-center justify-center text-lg rounded-sm shrink-0">1</span>
              Startup Ecosystem Trends
            </h2>

            <div className="prose prose-neutral max-w-none">
              <h3 className="font-mono text-[10px] md:text-xs font-bold uppercase mb-3 text-primary bg-black inline-block px-2 text-white">
                Market Overview
              </h3>
              <p className="font-sans text-gray-700 mb-6 text-sm leading-relaxed">
                The current vintage of startups is defined by extreme efficiency and rapid deployment of AI. We are seeing a shift away from consumer social apps towards "serious" B2B infrastructure, defense tech, and bio-engineering.
              </p>

              <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-3 md:p-4 rounded-sm">
                <p className="font-mono text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-3">Key Themes</p>
                <div className="space-y-3">
                  {trends.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 border-b border-gray-300 pb-2 last:border-b-0">
                      <div className="bg-primary text-black size-6 flex items-center justify-center text-[10px] md:text-xs font-bold rounded-sm flex-shrink-0 mt-0.5">
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
          <div className="bg-accent-yellow border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 bg-white border-2 border-black rounded-full p-2 size-16 flex items-end justify-center">
              <span className="material-symbols-outlined text-3xl mb-1">lightbulb</span>
            </div>
            <h3 className="font-mono text-xl font-bold mb-3 uppercase">Valuation Benchmarks</h3>
            <p className="font-mono text-xs leading-relaxed font-medium">
              Post-money valuations for top-tier Seed rounds have stabilized at $12M-$15M, with AI companies often commanding a premium ($20M+).
            </p>
          </div>

          {/* Program Terms Card */}
          <div className="bg-black text-white border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
            <h3 className="font-mono text-lg font-bold mb-3 text-primary">Standard YC Deal</h3>
            <div className="space-y-3 text-sm">
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
            <div className="mt-4 pt-3 border-t border-gray-700">
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