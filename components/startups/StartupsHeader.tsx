"use client";

import Link from "next/link";
import SectionHero from "@/components/ui/SectionHero";

interface StartupsHeaderProps {
  count: number;
}

export default function StartupsHeader({ count }: StartupsHeaderProps) {
  const activeStartupsCount = count || 0;

  return (
    <div className="mb-4 md:mb-6">
      {/* Breadcrumb — matches DealsHeader exactly */}
      <nav aria-label="Breadcrumb" className="flex mb-3 md:mb-3.5">
        <ol className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <li>
            <Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href="/">
              Home
            </Link>
          </li>
          <li className="text-gray-300 dark:text-white/20">/</li>
          <li>
            <Link className="hover:text-gray-900 dark:hover:text-white transition-colors" href="/resources">
              Resources
            </Link>
          </li>
          <li className="text-gray-300 dark:text-white/20">/</li>
          <li aria-current="page">
            <span className="text-gray-900 dark:text-white font-semibold">Verified Startups</span>
          </li>
        </ol>
      </nav>

      {/* Premium hero — shared SectionHero (mandala + stat cards) */}
      <SectionHero
        eyebrowIcon="rocket_launch"
        eyebrowText="Discover + Invest"
        eyebrowClass="bg-accent-yellow/15 border-accent-yellow/40 text-gray-800 dark:text-gray-300 dark:border-accent-yellow/20"
        eyebrowAccentClass="text-accent-yellow"
        mandalaColorClass="text-gray-900 dark:text-white/5"
        statsMinWidth="lg:min-w-[560px]"
        title={<>Verified Startups</>}
        subtitle={
          <>
            Access{" "}
            <span className="font-bold text-gray-900 dark:text-accent-yellow bg-accent-yellow/20 dark:bg-accent-yellow/10 px-1 rounded-sm">
              verified
            </span>{" "}
            high-potential startups. Direct data from Y Combinator and top
            accelerators — real metrics, vetted founders, breakout opportunities.
          </>
        }
        stats={[
          {
            label: "Total Valuation",
            value: "$4.2B+",
            delta: "Across companies",
            icon: "trending_up",
            iconColor: "text-amber-600",
            iconBg: "bg-accent-yellow/30",
            highlight: true,
            accent: "255,221,0",
            valueGradient: "from-accent-yellow to-amber-300",
            ornamentColor: "text-accent-yellow",
          },
          {
            label: "Verified",
            value: activeStartupsCount.toLocaleString(),
            delta: "YC + accelerators",
            icon: "verified",
            iconColor: "text-sky-600",
            iconBg: "bg-sky-100 dark:bg-sky-900/30",
          },
          {
            label: "Avg Seed",
            value: "$3.5M",
            delta: "Per round",
            icon: "paid",
            iconColor: "text-emerald-600",
            iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
          },
        ]}
      />

      {/* Motivation banner — dark band matching the deals design */}
      <div className="relative bg-gray-900 dark:bg-[#0c0c0c] border border-gray-800 dark:border-white/10 rounded-xl px-5 py-4 overflow-hidden mt-4 md:mt-5">
        {/* Gradient top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-yellow/60 to-transparent" />
        {/* Soft glow */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-accent-yellow/5 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-yellow mb-1 inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-yellow animate-pulse" />
              Acquisition &amp; Investment Database
            </p>
            <h2 className="font-mono text-sm md:text-base font-black text-white mb-1 leading-tight">
              Vetted startups with real metrics and revenue.
            </h2>
            <p className="font-sans text-[12px] text-gray-400 leading-relaxed">
              Skip broker fees. Connect directly with founders from Y Combinator and top accelerators.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-1.5">
            {["Verified Revenue", "Vetted Founders", "Direct Contact"].map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center gap-1 bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold uppercase tracking-wide"
              >
                <span className="material-symbols-outlined text-[11px] text-accent-yellow">check</span>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
