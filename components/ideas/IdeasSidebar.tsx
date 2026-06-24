"use client";

import { useState } from "react";
import Mandala from "@/components/ui/Mandala";

interface CategoryCount {
  name: string;
  count: number;
}

interface IdeasSidebarProps {
  categories: CategoryCount[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  totalIdeas: number;
}

export default function IdeasSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  totalIdeas,
}: IdeasSidebarProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 8);

  const validationSteps = [
    {
      title: "Search Volume",
      desc: "Analyzing keyword demand across search engines and forums."
    },
    {
      title: "Market Traction",
      desc: "Evaluating competitor funding, revenue, and product updates."
    },
    {
      title: "Technical Audits",
      desc: "Feasibility checks, architecture mapping, and API viability."
    },
    {
      title: "Monetization Path",
      desc: "Assessing target demographic pricing tolerance and business models."
    }
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
          <div className="space-y-3.5">
            {validationSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-md flex-shrink-0 mt-0.5 font-mono">
                  0{i + 1}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">{step.title}</h4>
                  <p className="font-sans text-[11.5px] text-gray-400 leading-snug">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
