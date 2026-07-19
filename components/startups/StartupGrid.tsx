"use client";

import { useState, useMemo, useEffect } from "react";
import StartupCard from "./StartupCard";
import { StartupCardData } from "@/lib/startups-data";
import Pagination from "@/components/Pagination";
import { StaggerGrid, StaggerGridItem } from "@/components/ui/premium-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface StartupGridProps {
  startups: StartupCardData[];
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
}

export default function StartupGrid({ startups, selectedIndustry, setSelectedIndustry }: StartupGridProps) {
  const allStartups = startups;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 12;

  // Unique industries
  const industries = useMemo(() => {
    const set = new Set(allStartups.map((s) => s.industry).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [allStartups]);

  // Filtered list
  const filteredStartups = useMemo(() => {
    return allStartups.filter((s) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        s.name.toLowerCase().includes(q) ||
        s.one_liner.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      const matchesIndustry = selectedIndustry === "All" || s.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [searchQuery, selectedIndustry, allStartups]);

  // Pagination
  const pageParam = searchParams.get("page");
  const rawPage = Number(pageParam) || 1;
  const totalPages = Math.ceil(filteredStartups.length / itemsPerPage) || 1;
  const currentPage = Math.min(Math.max(1, rawPage), totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStartups = filteredStartups.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(pathname + "?" + params.toString(), { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 on filter change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("page") !== "1") {
      params.set("page", "1");
      router.replace(pathname + "?" + params.toString(), { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedIndustry]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("All");
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    router.replace(pathname + "?" + params.toString(), { scroll: false });
  };

  const hasActiveFilters = searchQuery !== "" || selectedIndustry !== "All";

  return (
    <div className="w-full">
      {/* ── Filter bar — mirrors DealsFilterBar ── */}
      <div className="relative bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-white/10 rounded-xl p-3 md:p-3.5 sticky top-14 md:top-20 z-30 shadow-sm overflow-hidden transition-colors duration-300 mb-4">
        {/* Decorative mandala */}
        <div className="absolute -top-10 -right-10 w-32 h-32 pointer-events-none opacity-[0.04]" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-white startups-filterbar-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
            <circle cx="100" cy="100" r="40" />
            <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
            {Array.from({ length: 8 }, (_, i) => i * 45).map((deg) => (
              <line
                key={`ray-${deg}`}
                x1="100" y1="100"
                x2={100 + Math.cos((deg * Math.PI) / 180) * 80}
                y2={100 + Math.sin((deg * Math.PI) / 180) * 80}
              />
            ))}
            <circle cx="100" cy="100" r="2" fill="currentColor" />
          </svg>
        </div>

        <div className="relative">
          {/* Search */}
          <div className="relative mb-2.5">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-[18px] pointer-events-none">search</span>
            <input
              type="text"
              className="w-full h-9 pl-10 pr-9 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow text-[12.5px] bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/8 focus:bg-white dark:focus:bg-[#0c0c0c] transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-800 dark:text-white"
              placeholder="Search by name, tag or keyword…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Industry pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto mobile-scroll-hide">
            <span className="hidden md:inline-flex font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500 mr-1 flex-shrink-0">
              Industry:
            </span>
            {industries.map((industry) => (
              <button type="button"
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedIndustry === industry
                    ? "bg-gray-900 dark:bg-white text-white dark:text-black shadow-sm"
                    : "bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {industry}
              </button>
            ))}
            {hasActiveFilters && (
              <button type="button"
                onClick={handleClearFilters}
                className="ml-auto px-2.5 py-1 text-[11px] font-semibold rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
                Clear
              </button>
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes startupsFilterBarSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          :global(.startups-filterbar-spin) {
            animation: startupsFilterBarSpin 70s linear infinite;
            transform-origin: center;
          }
          @media (prefers-reduced-motion: reduce) {
            :global(.startups-filterbar-spin) { animation: none; }
          }
        `}</style>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-3 md:mb-4 pb-2.5 border-b border-dashed border-gray-200 dark:border-white/10">
        <p className="font-mono text-[11px] text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {currentStartups.length > 0 ? startIndex + 1 : 0}–{Math.min(endIndex, filteredStartups.length)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-gray-900 dark:text-white">{filteredStartups.length}</span>{" "}
          startups
        </p>
      </div>

      {/* Grid */}
      {currentStartups.length > 0 ? (
        <StaggerGrid
          animKey={`${currentPage}-${searchQuery}-${selectedIndustry}`}
          className="grid grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3.5 grid-fill-row-startups"
        >
          {currentStartups.map((startup) => (
            <StaggerGridItem key={startup.id}>
              <StartupCard company={startup} />
            </StaggerGridItem>
          ))}
        </StaggerGrid>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-gray-500 text-[24px]">search_off</span>
          </div>
          <h3 className="font-mono text-sm font-bold text-gray-300 mb-1">No startups found</h3>
          <p className="text-[12px] text-gray-500">Try adjusting your search or industry filter.</p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
