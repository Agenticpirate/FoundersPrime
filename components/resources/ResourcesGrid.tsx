import ResourceCard from './ResourceCard'
import Pagination from '@/components/Pagination'
import { useState, useEffect } from 'react'
import { ResourceItem } from './resources-data'

interface ResourcesGridProps {
  resources: ResourceItem[];
}

export default function ResourcesGrid({ resources }: ResourcesGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset to page 1 if list length changes (due to filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [resources.length]);
  
  const totalPages = Math.max(1, Math.ceil(resources.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResources = resources.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="font-mono text-2xl md:text-2xl font-bold">Showing {resources.length} resources</h2>
          <span className="bg-gray-200 px-2 py-1 font-mono text-[10px] md:text-xs rounded-sm border border-black whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <div className="hidden md:flex gap-2">
          <button className="px-3 py-1 font-mono text-xs border-2 border-black bg-black text-white rounded-sm">
            Grid
          </button>
          <button className="px-3 py-1 font-mono text-xs border-2 border-black bg-white text-black rounded-sm hover:bg-gray-100">
            List
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="space-y-6">
        {currentResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {/* Pagination component */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}