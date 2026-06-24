"use client";

import { useState } from "react";
import Mandala from "@/components/ui/Mandala";

interface CategoryCount {
  name: string;
  count: number;
}

interface StartupsSidebarProps {
  categories: CategoryCount[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function StartupsSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: StartupsSidebarProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 8);

  const validationSteps = [
    "Search volume analysis",
    "Competitor funding & traction",
    "Technical feasibility review",
    "Market size & monetization potential"
  ];

  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      {/* Browse Categories */}
      <div className="relative bg-[#0c0c0c] border border-white/10 rounded-xl p-4 md:p-5 overflow-hidden">
        <Mandala
          variant="rings"
          colorClass="text-white/5"
          opacity={0.05}
          speed={95}
          className="absolute -top-12 -right-12 w-40 h-40"
        />
        <div className="relative">
          <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.15em] mb-4 flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-[16px] text-accent-yellow">category</span>
            Browse Categories
          </h3>
          <div className="space-y-1">
            {visibleCategories.map((category) => {
              const active = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => onSelectCategory(category.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all text-[12px] font-mono ${
                    active
                      ? "bg-white text-black font-bold shadow-[0_4px_12px_rgba(255,255,255,0.08)] scale-[1.01]"
                      : "hover:bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="truncate">{category.name}</span>
                  <span
                    className={`font-mono text-[10px] tabular-nums flex-shrink-0 ml-2 px-1.5 py-0.5 rounded-full transition-colors ${
                      active
                        ? "bg-accent-yellow text-black font-bold"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
          {categories.length > 8 && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="w-full mt-3 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-gray-400 hover:text-white flex items-center justify-center gap-1.5"
            >
              <span>{showAll ? "Show Less" : `View All ${categories.length} Categories`}</span>
              <span className="material-symbols-outlined text-[14px]">
                {showAll ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* How We Validate */}
      <div className="relative bg-[#0c0c0c] border border-white/10 rounded-xl p-4 md:p-5 overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-yellow/40 to-transparent" />
        <Mandala
          variant="orbital"
          colorClass="text-accent-yellow"
          opacity={0.05}
          speed={75}
          direction="ccw"
          className="absolute -bottom-12 -right-12 w-40 h-40"
        />
        <div className="relative">
          <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.15em] mb-4 flex items-center gap-2 text-accent-yellow">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            How We Validate
          </h3>
          <div className="space-y-3">
            {validationSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[16px] text-accent-yellow flex-shrink-0 mt-0.5">
                  check_circle
                </span>
                <p className="font-sans text-[12px] text-gray-300 leading-snug">{step}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 flex items-center gap-1 text-[11px] font-mono font-bold text-accent-yellow hover:underline uppercase tracking-wide">
            Learn more
            <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Weekly Digest */}
      <div className="relative bg-[#0c0c0c] border border-white/10 rounded-xl p-4 md:p-5 overflow-hidden">
        <Mandala
          variant="petal"
          colorClass="text-white/5"
          opacity={0.03}
          speed={110}
          className="absolute -bottom-10 -left-10 w-36 h-36"
        />
        <div className="relative">
          <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.15em] mb-2 text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-accent-yellow">mail</span>
            Weekly Ideas Digest
          </h3>
          <p className="font-sans text-[11.5px] text-gray-400 mb-3.5 leading-relaxed">
            Get fresh validated startup ideas delivered to your inbox every week.
          </p>
          <div className="space-y-2">
            <input
              className="w-full h-9 bg-white/5 hover:bg-white/8 focus:bg-[#111] border border-white/10 text-white px-3 font-mono text-[12px] focus:outline-none focus:ring-1 focus:ring-accent-yellow focus:border-accent-yellow placeholder:text-gray-500 rounded-lg transition-colors"
              placeholder="you@email.com"
              type="email"
            />
            <button className="w-full h-9 text-[12px] bg-[#ffd700] text-black hover:bg-[#ffe033] font-mono font-bold rounded-lg transition-colors">
              Subscribe
            </button>
            <p className="font-mono text-[9px] text-gray-500 text-center mt-1">
              Join 12,543+ builders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}