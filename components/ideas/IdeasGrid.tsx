"use client";

import { useState, useEffect } from 'react';
import IdeaCard from './IdeaCard';
import Pagination from "@/components/Pagination";

interface IdeasGridProps {
  ideas: any[]
}

export default function IdeasGrid({ ideas }: IdeasGridProps) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ideas.length / itemsPerPage) || 1;

  // Reset to page 1 whenever the filtered set shrinks below current page.
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [ideas.length, totalPages, currentPage]);

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIdeas = ideas.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  if (ideas.length === 0) {
    return (
      <div className="text-center py-12 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#111] rounded-sm">
        <span className="material-symbols-outlined text-5xl text-gray-300 mb-3 block">search_off</span>
        <p className="font-mono text-base font-bold text-gray-700">No ideas match your filters</p>
        <p className="font-sans text-sm text-gray-500 mt-1">Try a different category, source, or search term.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <h2 className="font-mono text-base md:text-xl font-bold text-black">
          Showing {startIndex + 1}–{Math.min(endIndex, ideas.length)} of {ideas.length} ideas
        </h2>
        <span className="bg-accent-yellow/30 px-2 py-0.5 font-mono text-[10px] md:text-xs rounded-sm border border-black whitespace-nowrap">
          Page {safePage} of {totalPages}
        </span>
      </div>

      {/* Ideas Grid */}
      <div className="space-y-3 md:space-y-4">
        {currentIdeas.map((idea: any, index: number) => (
          <IdeaCard key={startIndex + index} idea={idea} index={index} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 md:mt-10">
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}
