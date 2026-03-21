'use client'

import Image from 'next/image'
import { useState } from 'react'

const testimonials = [
  {
    quote: "Saved us $5k on AWS in the first week. The ROI on this is absolutely insane.",
    name: "Sarah Jenkins",
    title: "CTO, FinFlow",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5d4-Q9P1h1tTPpPXPBqpJ7J4mMLkrwRJFv9zGEo4odhwBoJ8IdoOT_UJ0gayHuB5eAafpdAxNdZ2M3bUMXrA3wEVh5xEMcbARixdAaVclLOa1b6e9HtjssMTn9iEUJQdNAOOPdYAk7LxyU9K4zmQvA7gS3gRJ45eMQ1UPya6ZmbVCNikhRc9IyIMGp0I3_c_C9WjbSI0KO50LPyaBlt0cnXXEzotw9NewrXhZPHUtj01zYTGPJ4gEbfkIRD33qXXrO9gclzUEool2",
  },
  {
    quote: "I found a non-dilutive grant I didn't even know existed. We got $15k fast.",
    name: "David Chen",
    title: "Founder, BioLabs",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfkkSY9Pew95IzHg4YoxCh_wzyOiX0bfJeIWFQRuLfjEQLRPyPXM9I8xMrbrXz1nUtoB7G1_2Whry-XoT6ksgKbrKjoM2IjdeCcA1hy5PA9wZ7pUf_uhphHamSDCemqRoQmExLwYbPv4adfA30oj2uTRpv-DnwYfNbdPX5W5kgKXhCod_bk5JhvJSBnSGZgfbGtJAxUD9CBRefvq3vhKLeMFDCAJY3NV5QeUFUac2G4sfihNkgBuAiSwfQcc9KgqECNPl-UEWEeT6n",
  },
  {
    quote: "The verified ideas database helped me pivot. Now we are profitable.",
    name: "Elena R.",
    title: "CEO, MarketPulse",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDWKOTW1Z4METWLmHRcQOqrZY_8W0vdfCfL-pcYbWkMcldNXkQTDNyoMD0pMG5KH-Y7sn68IbbpxsijgEuALAwjmzpomYSieRn06RqYVkEfdPv1Bco8tUegoNAnSbhMb4wf6G3bCQ3lbpRqs5EUBflZ3kkB9B7inbfIwPx7FNRhG8kjomp_1UkffjgH_yPZ1j_atI40hWzfLka-wORQEeYr4WEnts90LGX0r9OPtjyn20j5NmeeSGgiKWTa4u7ks4H2qjKgeZ51HTl",
  },
  {
    quote: "FoundersPrime is the only bookmark I need. It's just value, no fluff.",
    name: "Mark T.",
    title: "Founder, SaaS Kit",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJSfNuFAkHSSHXD66I3uU_LcarNZ1wvDrPQ33fyADxXkj6dg_IRrn9aZREfNLU3MrcPp8mAakxP2fQErIkFUYQrfADMyOfJEu-Y7_G8Wp3R7ofInaORoI_d7KqQH8Ztes_Vu9ugBrKwlXK2YgvwX2UcGp7KulF_lpspbqqli0PnieW-yKjNPUK7lL5mLu3nwjWJ1bugi3NjNZKyzN0oDPPB_kUlvFud95r-BnSfJTZIPMgK5fEss0Cb29xGDEgZZZPrjdaltR6VEyC",
  },
  {
    quote: "Literally paid for itself in 5 minutes. The Stripe fee credits are gold.",
    name: "James Wu",
    title: "Indie Hacker",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "The accelerator database saved me weeks of research. Applied to 5, got into 2.",
    name: "Priya P.",
    title: "Co-founder, EdTech",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "Finally a place that actually vets the deals. No broken links, just savings.",
    name: "Tom H.",
    title: "DevOps Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "If you're bootstrapping, you need this. It stretches your budget so far.",
    name: "Lisa Wong",
    title: "Product Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
]

// Split into 2 columns (offset so they start at different points)
const col1 = testimonials.filter((_, i) => i % 2 === 0)
const col2 = testimonials.filter((_, i) => i % 2 === 1)

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="bg-white border-2 border-[#111111] shadow-[2px_2px_0_0_#111111] p-3 md:p-4 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111111] transition-all duration-200">
      {/* Stars */}
      <div className="flex gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="material-symbols-outlined text-[11px] md:text-sm text-[#f5c800]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        ))}
      </div>

      {/* Quote */}
      <p className="font-mono text-[9px] md:text-[11px] text-gray-700 leading-relaxed mb-3 line-clamp-3">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-2 border-t border-dashed border-gray-200 pt-2">
        <div className="w-6 h-6 md:w-7 md:h-7 border border-black overflow-hidden flex-shrink-0 relative bg-gray-100">
          {!imgError ? (
            <Image
              src={t.image}
              alt={t.name}
              fill
              className="object-cover"
              sizes="28px"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[8px] font-bold text-gray-600">
              {t.name[0]}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-mono font-black text-[8px] md:text-[9px] uppercase tracking-tight truncate text-black">{t.name}</p>
          <p className="font-mono text-[7px] md:text-[8px] text-gray-400 truncate">{t.title}</p>
        </div>
      </div>
    </div>
  )
}

function ScrollCol({ items, reverse }: { items: typeof testimonials; reverse?: boolean }) {
  // Triplicate for seamless loop
  const repeated = [...items, ...items, ...items]
  return (
    <div className={`flex flex-col gap-2 md:gap-3 flex-1 ${reverse ? 'animate-marquee-v-reverse' : 'animate-marquee-v'}`}>
      {repeated.map((t, i) => (
        <TestimonialCard key={i} t={t} />
      ))}
    </div>
  )
}

export default function FounderLogs() {
  return (
    <section className="py-4 md:py-10 bg-background-light border-y-2 border-black overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-3 md:mb-6">
          <h2 className="text-sm md:text-4xl font-black text-black font-mono uppercase tracking-tight">
            <span className="bg-accent-yellow px-2 md:px-4 py-0.5 md:py-1 border-2 border-black shadow-[3px_3px_0px_#000]">
              Founder_Logs
            </span>
          </h2>
          <p className="font-mono text-[9px] md:text-sm text-gray-500 mt-2 uppercase tracking-widest">
            Real founders · Real results
          </p>
        </div>

        {/* Vertical scrolling columns */}
        <div className="flex gap-2 md:gap-4 h-[260px] md:h-[420px] overflow-hidden mask-fade-v">
          <ScrollCol items={col1} />
          <ScrollCol items={col2} reverse />
          {/* Third col — desktop only */}
          <div className="hidden md:flex flex-col gap-3 flex-1 animate-marquee-v">
            {[...col1.slice(1), ...col2, ...col1.slice(1), ...col2].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}