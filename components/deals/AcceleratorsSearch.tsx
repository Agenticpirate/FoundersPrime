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
    }, 250)
    return () => clearTimeout(timer)
  }, [query, onSearch])

  // Cmd+K / Ctrl+K shortcut
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
        className={`relative flex items-center transition-all duration-200 ${
          isFocused ? 'translate-x-[-1px] translate-y-[-1px]' : ''
        }`}
      >
        {/* Search Icon */}
        <div className="absolute left-3.5 pointer-events-none">
          <Search
            className={`transition-colors duration-200 ${
              isFocused ? 'text-black' : 'text-gray-400'
            }`}
            size={16}
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
          className={`w-full pl-10 pr-20 py-2.5 font-mono text-[12.5px] bg-white border-2 border-black rounded-sm outline-none transition-all duration-200 placeholder:text-gray-400 ${
            isFocused
              ? 'shadow-[3px_3px_0px_#FFD500]'
              : 'shadow-[2px_2px_0px_#111]'
          }`}
          aria-label="Search accelerators"
        />

        {/* Clear / Shortcut */}
        {query ? (
          <button
            onClick={handleClear}
            className="absolute right-3 inline-flex items-center justify-center w-6 h-6 rounded-sm border border-black bg-white hover:bg-accent-yellow transition-colors"
            aria-label="Clear search"
          >
            <X size={12} className="text-black" />
          </button>
        ) : (
          !isFocused && (
            <div className="absolute right-3 hidden sm:flex items-center gap-1 pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-gray-50 border border-gray-300 rounded-sm text-gray-500">
                ⌘K
              </kbd>
            </div>
          )
        )}
      </div>
    </div>
  )
}
