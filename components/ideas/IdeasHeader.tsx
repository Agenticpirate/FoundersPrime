"use client";

import Link from 'next/link';
import { useMemo } from 'react';
import ideasData from "@/data/startup_ideas.json";

export default function IdeasHeader() {
  const totalIdeas = ideasData.length;
  const highDemandIdeas = ideasData.filter((idea: any) => idea.itchScore && parseFloat(idea.itchScore) >= 80).length;

  const categories = Array.from(new Set(ideasData.map((idea: any) => idea.category)));

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
              <span className="text-black bg-primary/20 px-2 py-0.5 rounded-sm border border-black">Startup Ideas</span>
            </div>
          </li>
        </ol>
      </nav>
      {/* Compact Header */}
      <div className="mb-6 md:mb-4 md:mb-6">
        <div className="inline-block border-2 border-black bg-accent-yellow px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide rounded-sm mb-2">
          BUILD + SHIP
        </div>
        <h1 className="font-mono text-3xl md:text-5xl font-bold tracking-tight text-black mb-3 md:mb-4 leading-tight">
          Validated Startup Ideas
        </h1>
        <p className="font-sans text-sm md:text-lg text-gray-700 leading-relaxed max-w-3xl">
          <span className="font-bold text-black bg-primary/20 px-1">{totalIdeas} validated problems</span> worth solving. Curated from top accelerators and real user pain points. Stop waiting for validation—these problems are <span className="font-bold text-primary">already proven</span>. Start building today.
        </p>
      </div>

      {/* Stats Bar — always 3-col on mobile */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] transition-all">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Total Ideas</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-black">{totalIdeas}</p>
          </div>
          <span className="material-symbols-outlined text-xl text-black hidden sm:block">lightbulb</span>
        </div>

        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] transition-all">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">High Demand</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-white">{highDemandIdeas}</p>
          </div>
          <span className="material-symbols-outlined text-xl text-primary hidden sm:block">trending_up</span>
        </div>

        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-2 md:p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] transition-all">
          <div>
            <p className="font-mono text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Categories</p>
            <p className="font-mono text-xl md:text-2xl font-bold text-black">{categories.length}</p>
          </div>
          <span className="material-symbols-outlined text-xl text-black hidden sm:block">category</span>
        </div>
      </div>

      {/* Motivation Card — compact */}
      <div className="bg-gradient-to-r from-primary via-accent-yellow to-primary border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-4 md:p-6 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 bg-white border-2 border-black rounded-full p-2 size-16 flex items-center justify-center rotate-12">
          <span className="material-symbols-outlined text-3xl text-black">emoji_objects</span>
        </div>

        <h2 className="font-mono text-base md:text-xl font-bold text-black mb-2 uppercase">Stop Waiting. Start Building.</h2>
        <p className="font-sans text-xs md:text-sm text-gray-900 leading-relaxed max-w-3xl mb-3">
          These aren't just ideas—they're <span className="font-bold bg-white px-1">validated problems</span>. The market has already spoken. All that's missing is <span className="font-bold bg-white px-1">your solution</span>.
        </p>
        <div className="flex flex-wrap gap-2">
          {['✓ Real Problems', '✓ Validated Demand', '✓ Ready to Build'].map(tag => (
            <div key={tag} className="bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase border border-black">{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}