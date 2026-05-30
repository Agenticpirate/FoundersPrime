'use client'

import { useEffect, useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'

export type ViewMode = 'grid' | 'list'

interface ViewToggleProps {
  onViewChange: (view: ViewMode) => void
  defaultView?: ViewMode
}

export default function ViewToggle({ onViewChange, defaultView = 'grid' }: ViewToggleProps) {
  const [view, setView] = useState<ViewMode>(defaultView)

  useEffect(() => {
    const savedView = localStorage.getItem('accelerators-view') as ViewMode
    if (savedView && (savedView === 'grid' || savedView === 'list')) {
      setView(savedView)
      onViewChange(savedView)
    }
  }, [onViewChange])

  const handleViewChange = (newView: ViewMode) => {
    setView(newView)
    onViewChange(newView)
    localStorage.setItem('accelerators-view', newView)
  }

  return (
    <div
      className="inline-flex border-2 border-black rounded-sm shadow-[2px_2px_0px_#111] bg-white overflow-hidden"
      role="group"
      aria-label="View mode toggle"
    >
      <button
        onClick={() => handleViewChange('grid')}
        className={`px-2.5 py-1.5 font-mono text-[10.5px] font-black uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5 ${
          view === 'grid'
            ? 'bg-black text-white'
            : 'bg-white text-black hover:bg-gray-50'
        }`}
        aria-label="Grid view"
        aria-pressed={view === 'grid'}
      >
        <LayoutGrid size={13} />
        <span className="hidden sm:inline">Grid</span>
      </button>

      <div className="w-[2px] bg-black" />

      <button
        onClick={() => handleViewChange('list')}
        className={`px-2.5 py-1.5 font-mono text-[10.5px] font-black uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5 ${
          view === 'list'
            ? 'bg-black text-white'
            : 'bg-white text-black hover:bg-gray-50'
        }`}
        aria-label="List view"
        aria-pressed={view === 'list'}
      >
        <List size={13} />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  )
}
