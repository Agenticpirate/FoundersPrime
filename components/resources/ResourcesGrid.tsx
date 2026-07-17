'use client'

import ResourceCard from './ResourceCard'
import { useState, useEffect } from 'react'
import { ResourceItem } from './resources-data'
import Pagination from '@/components/Pagination'
import { StaggerGrid, StaggerGridItem } from '@/components/ui/premium-motion'

interface ResourcesGridProps {
  resources: ResourceItem[]
}

export default function ResourcesGrid({ resources }: ResourcesGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    setCurrentPage(1)
  }, [resources.length])

  const totalPages = Math.max(1, Math.ceil(resources.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentResources = resources.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 200, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-5 pb-2.5 border-b border-dashed border-white/10">
        <p className="font-mono text-[11px] text-gray-400">
          Showing{' '}
          <span className="font-bold text-white">
            {currentResources.length > 0 ? startIndex + 1 : 0}–
            {Math.min(startIndex + itemsPerPage, resources.length)}
          </span>{' '}
          of <span className="font-bold text-white">{resources.length}</span> resources
        </p>

        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-gray-500 uppercase mr-1">View:</span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-yellow text-black"
            aria-label="Grid view"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            aria-label="List view"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
          </button>
        </div>
      </div>

      <StaggerGrid
        animKey={`${currentPage}-${resources.length}`}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-fill-row-resources gap-4 mb-6"
      >
        {currentResources.map((resource) => (
          <StaggerGridItem key={resource.id}>
            <ResourceCard resource={resource} />
          </StaggerGridItem>
        ))}
      </StaggerGrid>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-[#0c0c0c] border border-white/10 rounded-xl">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-accent-yellow">verified_user</span>
          <div>
            <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
              Curated &amp; Verified
            </h4>
            <p className="font-sans text-[11px] text-gray-400 mt-0.5">Handpicked by founders &amp; experts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-accent-yellow">bolt</span>
          <div>
            <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">Actionable</h4>
            <p className="font-sans text-[11px] text-gray-400 mt-0.5">Practical ready-to-use resources</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-accent-yellow">update</span>
          <div>
            <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
              Always Updated
            </h4>
            <p className="font-sans text-[11px] text-gray-400 mt-0.5">Fresh items added weekly</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-accent-yellow">group</span>
          <div>
            <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
              Built for Founders
            </h4>
            <p className="font-sans text-[11px] text-gray-400 mt-0.5">From zero to scale playbooks</p>
          </div>
        </div>
      </div>
    </div>
  )
}
