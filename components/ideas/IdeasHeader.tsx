"use client";

import { useMemo } from 'react';
import ideasData from "@/data/startup_ideas.json";

export default function IdeasHeader() {
  const totalIdeas = ideasData.length;
  const highDemandIdeas = ideasData.filter((idea: any) => idea.itchScore && parseFloat(idea.itchScore) >= 80).length;

  const categories = Array.from(new Set(ideasData.map((idea: any) => idea.category)));

  return (
    <div className="mb-6 md:mb-4 md:mb-6">
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

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 md:mb-6">
        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Ideas</p>
            <p className="font-mono text-2xl font-bold text-black">{totalIdeas}</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-black">lightbulb</span>
        </div>

        <div className="bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">High Demand</p>
            <p className="font-mono text-2xl font-bold text-white">{highDemandIdeas}</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-primary">trending_up</span>
        </div>

        <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_#1a1a1a] hover:-translate-x-px hover:-translate-y-px transition-all">
          <div>
            <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Categories</p>
            <p className="font-mono text-2xl font-bold text-black">{categories.length}</p>
          </div>
          <span className="material-symbols-outlined text-2xl text-black">category</span>
        </div>
      </div>

      {/* Motivation Card */}
      <div className="bg-gradient-to-r from-primary via-accent-yellow to-primary border-2 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 md:p-8 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 bg-white border-2 border-black rounded-full p-4 size-24 flex items-center justify-center rotate-12">
          <span className="material-symbols-outlined text-5xl text-black">emoji_objects</span>
        </div>

        <h2 className="font-mono text-2xl font-bold text-black mb-3 uppercase">Stop Waiting. Start Building.</h2>
        <p className="font-sans text-sm md:text-base text-gray-900 leading-relaxed max-w-3xl mb-4">
          These aren't just ideas—they're <span className="font-bold bg-white px-1">validated problems</span> identified by industry experts and thousands of real users. The market has already spoken. The demand exists. All that's missing is <span className="font-bold bg-white px-1">your solution</span>.
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="bg-black text-white px-3 py-1 text-xs font-bold uppercase border-2 border-black">
            ✓ Real Problems
          </div>
          <div className="bg-black text-white px-3 py-1 text-xs font-bold uppercase border-2 border-black">
            ✓ Validated Demand
          </div>
          <div className="bg-black text-white px-3 py-1 text-xs font-bold uppercase border-2 border-black">
            ✓ Ready to Build
          </div>
        </div>
      </div>
    </div>
  );
}