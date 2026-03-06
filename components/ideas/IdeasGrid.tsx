"use client";

import { useState, useMemo, useEffect } from 'react';
import IdeaCard from './IdeaCard';
import ideasData from "@/data/startup_ideas.json";
import Pagination from "@/components/Pagination";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function IdeasGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const itemsPerPage = 12;
  const allIdeas = ideasData;

  // Pagination Logic
  const pageParam = searchParams.get('page');
  const rawPage = Number(pageParam) || 1;
  const totalPages = Math.ceil(allIdeas.length / itemsPerPage) || 1;
  const currentPage = Math.min(Math.max(1, rawPage), totalPages);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIdeas = allIdeas.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(pathname + '?' + params.toString(), { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 sm:gap-0">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-mono text-lg md:text-2xl font-bold">
            Showing {startIndex + 1}-{Math.min(endIndex, allIdeas.length)} of {allIdeas.length} ideas
          </h2>
          <span className="bg-gray-200 px-2 py-1 font-mono text-[10px] md:text-xs rounded-sm border border-black whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="space-y-6">
        {currentIdeas.map((idea: any, index: number) => (
          <IdeaCard key={startIndex + index} idea={idea} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}