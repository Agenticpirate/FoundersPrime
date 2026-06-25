'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Function to check and enforce theme constraints based on viewport
    const enforceThemeConstraints = () => {
      const isDesktop = window.innerWidth >= 1024
      const savedTheme = localStorage.getItem('theme')
      
      if (!isDesktop) {
        // Force dark mode on mobile/tablet
        if (document.documentElement.classList.contains('light')) {
          document.documentElement.classList.remove('light')
          document.documentElement.classList.add('dark')
        }
        setTheme('dark')
      } else {
        // On desktop, respect saved theme
        const currentTheme = savedTheme === 'light' ? 'light' : 'dark'
        if (currentTheme === 'light') {
          document.documentElement.classList.remove('dark')
          document.documentElement.classList.add('light')
        } else {
          document.documentElement.classList.remove('light')
          document.documentElement.classList.add('dark')
        }
        setTheme(currentTheme)
      }
    }

    // Run on mount
    enforceThemeConstraints()
    setMounted(true)

    // Listen for window resize
    window.addEventListener('resize', enforceThemeConstraints)

    // Listen for sync events from other toggle buttons
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<'light' | 'dark'>
      if (customEvent.detail) {
        if (window.innerWidth >= 1024 || customEvent.detail === 'dark') {
          setTheme(customEvent.detail)
        }
      }
    }
    window.addEventListener('theme-changed', handleSync)
    
    return () => {
      window.removeEventListener('resize', enforceThemeConstraints)
      window.removeEventListener('theme-changed', handleSync)
    }
  }, [])

  const toggleTheme = () => {
    // Only allow toggling theme on desktop
    if (window.innerWidth < 1024) return

    const nextTheme = theme === 'light' ? 'dark' : 'light'
    if (nextTheme === 'dark') {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
    localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: nextTheme }))
  }

  // Prevent layout shift before mount — show dark (sun) icon by default
  const isDark = !mounted || theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative hidden lg:flex items-center justify-center w-8 h-8 focus:outline-none group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Ambient glow halo — appears on hover */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-150"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255,215,0,0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(180,210,240,0.22) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Icon container */}
      <span className="relative flex items-center justify-center w-5 h-5 overflow-hidden">
        {/* ── Sun icon — visible in dark mode (hint: click to go light) ── */}
        <span
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? 'scale(1) rotate(0deg)' : 'scale(0.6) rotate(90deg)',
          }}
          aria-hidden={!isDark}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-[18px] h-[18px]"
            stroke="#FFD700"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" fill="rgba(255,215,0,0.15)" stroke="#FFD700" />
            <line x1="12" y1="2" x2="12" y2="4.5" />
            <line x1="12" y1="19.5" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="5.98" y2="5.98" />
            <line x1="18.02" y1="18.02" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="4.5" y2="12" />
            <line x1="19.5" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.98" y2="18.02" />
            <line x1="18.02" y1="5.98" x2="19.78" y2="4.22" />
          </svg>
        </span>

        {/* ── Moon icon — visible in light mode (hint: click to go dark) ── */}
        <span
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'scale(0.6) rotate(-90deg)' : 'scale(1) rotate(0deg)',
          }}
          aria-hidden={isDark}
        >
          <svg
            viewBox="0 0 24 24"
            fill="#c8d6e5"
            className="w-[17px] h-[17px]"
            stroke="#a0b8cf"
            strokeWidth="0.5"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>
      </span>

      {/* Accessible label for screen readers */}
      <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </button>
  )
}
