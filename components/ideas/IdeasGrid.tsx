"use client";

import { useState, useEffect } from "react";
import IdeaCard from "./IdeaCard";

interface IdeasGridProps {
  ideas: any[];
}

export default function IdeasGrid({ ideas }: IdeasGridProps) {
  const itemsPerPage = 12; // 3×4 grid per page like the screenshot
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ideas.length / itemsPerPage) || 1;

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [ideas.length, totalPages, currentPage]);

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const currentIdeas = ideas.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
          <span className="material-symbols-outlined text-gray-500 text-[24px]">search_off</span>
        </div>
        <h3 className="font-mono text-sm font-bold text-gray-300 mb-1">No ideas match your filters</h3>
        <p className="text-[12px] text-gray-500">Try a different category, source, or search term.</p>
      </div>
    );
  }

  // Build pagination page numbers (like screenshot: 1 2 3 4 5 ... 7)
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4, 5);
      if (safePage > 5) pages.push("...", safePage);
      if (safePage < totalPages - 1) {
        if (!pages.includes("...")) pages.push("...");
        pages.push(totalPages);
      } else {
        pages.push("...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div>
      {/* 3-column card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 grid-fill-row-startups gap-3 mb-5">
        {currentIdeas.map((idea: any, index: number) => (
          <IdeaCard key={startIndex + index} idea={idea} index={index} />
        ))}
      </div>

      {/* Pagination — matches screenshot: ← Previous | 1 2 3 4 5 ... 7 | Next → */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 pt-2">
          <button
            onClick={() => handlePageChange(safePage - 1)}
            disabled={safePage === 1}
            className="flex items-center gap-1.5 px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 font-mono text-[11px] font-bold rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Previous
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, i) =>
              page === "..." ? (
                <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center font-mono text-[12px] text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page as number)}
                  className={`w-8 h-8 flex items-center justify-center font-mono text-[12px] font-bold rounded-lg transition-all ${
                    safePage === page
                      ? "bg-accent-yellow text-black shadow-sm"
                      : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => handlePageChange(safePage + 1)}
            disabled={safePage === totalPages}
            className="flex items-center gap-1.5 px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 font-mono text-[11px] font-bold rounded-lg transition-all"
          >
            Next
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
