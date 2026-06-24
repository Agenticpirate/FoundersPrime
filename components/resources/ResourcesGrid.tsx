import ResourceCard from './ResourceCard'
import { useState, useEffect } from 'react'
import { ResourceItem } from './resources-data'

interface ResourcesGridProps {
  resources: ResourceItem[];
}

export default function ResourcesGrid({ resources }: ResourcesGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset to page 1 if list length changes (due to filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [resources.length]);
  
  const totalPages = Math.max(1, Math.ceil(resources.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResources = resources.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-4 md:mb-5 pb-2.5 border-b border-dashed border-white/10">
        <p className="font-mono text-[11px] text-gray-400">
          Showing{" "}
          <span className="font-bold text-white">
            {currentResources.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + itemsPerPage, resources.length)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-white">{resources.length}</span>{" "}
          resources
        </p>

        {/* View mode toggle icons */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-gray-500 uppercase mr-1">View:</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#ffd700] text-black" aria-label="Grid view">
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white" aria-label="List view">
            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
          </button>
        </div>
      </div>

      {/* Resources Grid - 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-fill-row-resources gap-4 mb-6">
        {currentResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 pt-6 border-t border-white/5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 font-mono text-[11px] font-bold rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 flex items-center justify-center font-mono text-[12px] font-bold rounded-lg transition-all ${
                  currentPage === page
                    ? "bg-[#ffd700] text-black shadow-sm"
                    : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 font-mono text-[11px] font-bold rounded-lg transition-all"
          >
            Next
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      )}

      {/* Curated Indicators Footer Panel */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-[#0c0c0c] border border-white/10 rounded-xl">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-accent-yellow">verified_user</span>
          <div>
            <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">Curated &amp; Verified</h4>
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
            <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">Always Updated</h4>
            <p className="font-sans text-[11px] text-gray-400 mt-0.5">Fresh items added weekly</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-accent-yellow">group</span>
          <div>
            <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">Built for Founders</h4>
            <p className="font-sans text-[11px] text-gray-400 mt-0.5">From zero to scale playbooks</p>
          </div>
        </div>
      </div>
    </div>
  )
}