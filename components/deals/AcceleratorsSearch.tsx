'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface AcceleratorsSearchProps {
    onSearch: (query: string) => void
    placeholder?: string
}

export default function AcceleratorsSearch({
    onSearch,
    placeholder = "Search by name, location, or focus area..."
}: AcceleratorsSearchProps) {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query)
        }, 300)

        return () => clearTimeout(timer)
    }, [query, onSearch])

    // Keyboard shortcut (Cmd+K / Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                document.getElementById('accelerators-search')?.focus()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleClear = () => {
        setQuery('')
        onSearch('')
    }

    return (
        <div className="relative w-full">
            <div
                className={`relative flex items-center transition-all duration-200 ${isFocused
                        ? 'transform -translate-y-0.5 -translate-x-0.5'
                        : ''
                    }`}
            >
                {/* Search Icon */}
                <div className="absolute left-4 pointer-events-none">
                    <Search
                        className={`transition-colors duration-200 ${isFocused ? 'text-black' : 'text-gray-400'
                            }`}
                        size={20}
                    />
                </div>

                {/* Search Input */}
                <input
                    id="accelerators-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={`w-full pl-12 pr-24 py-3 font-mono text-sm bg-white border-3 border-black rounded-sm outline-none transition-all duration-200 ${isFocused
                            ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                            : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        }`}
                    aria-label="Search accelerators"
                />

                {/* Clear Button */}
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-14 p-1 hover:bg-gray-100 rounded-sm transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={16} className="text-gray-500" />
                    </button>
                )}

                {/* Keyboard Shortcut Hint */}
                {!query && !isFocused && (
                    <div className="absolute right-4 flex items-center gap-1 pointer-events-none">
                        <kbd className="px-2 py-0.5 text-xs font-mono bg-gray-100 border border-gray-300 rounded-sm">
                            ⌘K
                        </kbd>
                    </div>
                )}
            </div>

            {/* Search Results Count (will be shown by parent) */}
        </div>
    )
}
