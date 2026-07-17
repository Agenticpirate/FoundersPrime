'use client'

import { useState, useEffect } from 'react'
import IdeaCard from './IdeaCard'
import Pagination from '@/components/Pagination'
import { StaggerGrid, StaggerGridItem } from '@/components/ui/premium-motion'

interface IdeasGridProps {
  ideas: any[]
  onClearFilters?: () => void
}

export default function IdeasGrid({ ideas, onClearFilters }: IdeasGridProps) {
  const itemsPerPage = 12
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(ideas.length / itemsPerPage) || 1

  // Reset to page 1 when the filtered set changes
  useEffect(() => {
    setCurrentPage(1)
  }, [ideas])

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [totalPages, currentPage])

  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * itemsPerPage
  const currentIdeas = ideas.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const el = document.getElementById('ideas-results')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 180, behavior: 'smooth' })
    }
  }

  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 md:py-20 px-6 text-center rounded-2xl border border-dashed border-black/[0.08] dark:border-white/10 bg-white/60 dark:bg-white/[0.02]">
        <div className="w-12 h-12 rounded-2xl bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-amber-700 dark:text-accent-yellow !text-[24px]">
            search_off
          </span>
        </div>
        <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white mb-1.5">
          No ideas match
        </h3>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 max-w-sm mb-5 leading-relaxed">
          Try another market, source, or search term — the hub has more validated problems to
          explore.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex h-9 items-center gap-1.5 px-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-mono text-[11px] font-bold uppercase tracking-wide hover:bg-accent-yellow hover:text-black transition-colors"
          >
            <span className="material-symbols-outlined !text-[15px]">restart_alt</span>
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div id="ideas-results">
      <StaggerGrid
        animKey={`${safePage}-${ideas.length}-${currentIdeas[0]?.title || ''}`}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 md:gap-4 mb-8"
      >
        {currentIdeas.map((idea: any, index: number) => (
          <StaggerGridItem
            key={idea.id || idea.slug || idea.title || startIndex + index}
            layout={false}
          >
            <IdeaCard idea={idea} index={index} />
          </StaggerGridItem>
        ))}
      </StaggerGrid>

      {totalPages > 1 && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
