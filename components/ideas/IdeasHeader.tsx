"use client";

import Link from "next/link";
import ideasData from "@/data/startup_ideas.json";
import SectionHero from "@/components/ui/SectionHero";

export default function IdeasHeader() {
  const totalIdeas = ideasData.length;
  const categories = Array.from(new Set(ideasData.map((idea: any) => idea.category)));
  const sources = Array.from(new Set(ideasData.map((idea: any) => idea.source)));

  return (
    <div className="mb-4 md:mb-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex mb-3 md:mb-3.5">
        <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <li><Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href="/">Home</Link></li>
          <li className="text-gray-300 dark:text-white/20">/</li>
          <li><Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href="/resources">Resources</Link></li>
          <li className="text-gray-300 dark:text-white/20">/</li>
          <li aria-current="page"><span className="text-gray-900 dark:text-white font-semibold">Startup Ideas</span></li>
        </ol>
      </nav>

      {/* SectionHero — eyebrow: VALIDATED & CURATED */}
      <SectionHero
        eyebrowIcon="verified"
        eyebrowText="Validated & Curated"
        eyebrowClass="bg-accent-yellow/15 border-accent-yellow/40 text-gray-800 dark:text-gray-300 dark:border-accent-yellow/20"
        eyebrowAccentClass="text-accent-yellow"
        mandalaColorClass="text-gray-900 dark:text-white/5"
        statsMinWidth="lg:min-w-[520px]"
        title={
          <>
            Validated{" "}
            <span className="text-accent-yellow">Startup</span>{" "}
            Ideas
          </>
        }
        subtitle={
          <>
            <span className="font-bold text-gray-900 dark:text-white">{totalIdeas} validated problems</span>{" "}
            worth solving — curated from top accelerators and real user pain points.{" "}
            The market has already spoken. All that&apos;s missing is{" "}
            <span className="italic font-bold text-accent-yellow">your solution.</span>
          </>
        }
        stats={[
          {
            label: "Validated Ideas",
            value: `${totalIdeas}`,
            delta: "Proven Demand",
            icon: "lightbulb",
            iconColor: "text-amber-600",
            iconBg: "bg-accent-yellow/30",
            highlight: true,
            accent: "255,221,0",
            valueGradient: "from-accent-yellow to-amber-300",
            ornamentColor: "text-accent-yellow",
          },
          {
            label: "Categories",
            value: `${categories.length}`,
            delta: "Across Markets",
            icon: "category",
            iconColor: "text-sky-600",
            iconBg: "bg-sky-100 dark:bg-sky-900/30",
          },
          {
            label: "Sources",
            value: `${sources.length}`,
            delta: "Vetted Sources",
            icon: "verified",
            iconColor: "text-emerald-600",
            iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
          },
        ]}
      />

      {/* Motivation dark banner */}
      <div className="relative bg-gray-900 dark:bg-[#0c0c0c] border border-gray-800 dark:border-white/10 rounded-xl px-4 md:px-6 py-4 overflow-hidden mt-4 md:mt-5">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-yellow/60 to-transparent" />
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-accent-yellow/5 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent-yellow mb-1.5 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-yellow animate-pulse" />
              Top Notions, Smart Builders.
            </p>
            <h2 className="font-mono text-sm md:text-base font-black text-white mb-1 leading-tight">
              These aren&apos;t just ideas — they&apos;re validated problems.
            </h2>
            <p className="font-sans text-[12px] text-gray-400 leading-relaxed">
              The market has already spoken. All that&apos;s missing is{" "}
              <span className="font-bold text-accent-yellow italic">your solution.</span>
            </p>
          </div>

          <div className="flex flex-col gap-1.5 sm:items-end flex-shrink-0">
            {["Real Problems", "Validated Demand", "Ready to Build"].map((tag) => (
              <div key={tag} className="inline-flex items-center gap-1.5 text-gray-300 text-[11px] font-mono font-semibold">
                <span className="material-symbols-outlined text-[14px] text-emerald-400">check_circle</span>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
