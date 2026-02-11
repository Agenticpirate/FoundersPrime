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

    // Load preference from localStorage on mount
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
            className="inline-flex border-3 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden"
            role="group"
            aria-label="View mode toggle"
        >
            <button
                onClick={() => handleViewChange('grid')}
                className={`px-3 py-2 font-mono text-xs font-bold transition-all duration-150 flex items-center gap-2 ${view === 'grid'
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                aria-label="Grid view"
                aria-pressed={view === 'grid'}
            >
                <LayoutGrid size={16} />
                <span className="hidden sm:inline">Grid</span>
            </button>

            <div className="w-[3px] bg-black" />

            <button
                onClick={() => handleViewChange('list')}
                className={`px-3 py-2 font-mono text-xs font-bold transition-all duration-150 flex items-center gap-2 ${view === 'list'
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                aria-label="List view"
                aria-pressed={view === 'list'}
            >
                <List size={16} />
                <span className="hidden sm:inline">List</span>
            </button>
        </div>
    )
}
