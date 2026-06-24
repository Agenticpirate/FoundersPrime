"use client";

import { useEffect, useState } from "react";

export default function BrandedLoader() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#000000] flex flex-col items-center justify-center px-6">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Orbit paths & glowing center */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-4">
        {/* Glow */}
        <div className="absolute w-24 h-24 rounded-full bg-[#ffd700]/10 blur-xl pointer-events-none animate-pulse" />

        {/* Orbit Ring 1 */}
        <div className="absolute w-44 h-44 rounded-full border border-white/5 animate-[spin_12s_linear_infinite]" />
        
        {/* Orbit Ring 2 with dots */}
        <div className="absolute w-36 h-36 rounded-full border border-white/10 animate-[spin_8s_linear_infinite_reverse]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ffd700] shadow-[0_0_8px_#ffd700]" />
          <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-[#ffd700]/50" />
        </div>

        {/* Orbit Ring 3 */}
        <div className="absolute w-28 h-28 rounded-full border border-white/5 animate-[spin_6s_linear_infinite]" />

        {/* Logo Tile */}
        <div className="relative w-14 h-14 bg-[#0c0c0c] border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.1)] z-10">
          <img
            src="/FPLogo.png"
            alt=""
            className="w-10 h-10 object-contain"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Wordmark */}
      <div className="font-mono text-xl font-bold tracking-[0.2em] text-white uppercase mb-3 flex items-center justify-center">
        <span>FOUNDERS</span>
        <span className="text-[#ffd700] mx-0.5">[</span>
        <span>PRIME</span>
        <span className="text-[#ffd700] mx-0.5">]</span>
      </div>

      {/* Tagline */}
      <p className="font-sans text-[12.5px] text-gray-400 text-center mb-8 max-w-sm tracking-wide">
        Curated resources. Verified insights. Built for founders.
      </p>

      {/* Progress Bar Loader Container */}
      <div className="w-full max-w-sm flex flex-col items-center gap-2.5 mb-14">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-accent-yellow">
          Loading Resources
        </span>
        <div className="w-full flex items-center gap-3.5">
          <div className="flex-1 h-[6px] bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-accent-yellow to-amber-500 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,215,0,0.5)]"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="font-mono text-[12.5px] font-bold text-accent-yellow w-9 text-right tabular-nums">
            {percent}%
          </span>
        </div>
      </div>

      {/* Footer Indicators Row */}
      <div className="flex items-center justify-center gap-5 border-t border-white/5 pt-4 text-[10.5px] font-mono text-gray-500 w-full max-w-xl flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-accent-yellow">verified_user</span>
          <span>Verified</span>
        </div>
        <div className="h-3 w-[1px] bg-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-accent-yellow">bolt</span>
          <span>Updated Weekly</span>
        </div>
        <div className="h-3 w-[1px] bg-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-accent-yellow">bookmark</span>
          <span>Founder Focused</span>
        </div>
        <div className="h-3 w-[1px] bg-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-accent-yellow">group</span>
          <span>Zero Noise</span>
        </div>
      </div>
    </div>
  );
}
