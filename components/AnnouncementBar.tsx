'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  '47 new deals added this week',
  'Founder Yearly · $149/yr · unlimited deal access',
  '500+ verified credits, grants & accelerators inside',
  "Next'Founder $59/yr · built for student builders",
]

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % MESSAGES.length), 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative bg-black text-white text-[11px] md:text-xs font-mono py-2 px-4 text-center border-b-2 border-black tracking-wide overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent, rgba(255,221,0,0.2), transparent)',
          animation: 'announcementShimmer 4s linear infinite',
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        <span className="text-accent-yellow font-black">⚡</span>
        <span className="hidden sm:inline text-gray-400 text-[10px] uppercase tracking-widest">Live</span>
        <span className="hidden sm:inline text-gray-700">·</span>
        <span key={idx} className="inline-block animate-fadeIn font-semibold">{MESSAGES[idx]}</span>
        <span className="text-accent-yellow font-black">⚡</span>
      </span>

      <style jsx>{`
        @keyframes announcementShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}
