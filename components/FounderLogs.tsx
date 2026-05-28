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
  {
    quote: "Closed our seed round faster after using the investor database. Game changer.",
    name: "Aarav K.",
    title: "Founder, StackedAI",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "Got into Antler because I knew the deadline a month before everyone else.",
    name: "Nadia S.",
    title: "Founder, GreenCart",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "Notion + Linear + HubSpot — got all three discounted. Saved us $4k year one.",
    name: "Ravi M.",
    title: "Co-founder, Loop",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "The student perks under NextFounder are unreal. Built my MVP for $0.",
    name: "Maya O.",
    title: "Student, NUS",
    image: "https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "Just the Google Cloud credits alone covered our entire infra for 18 months.",
    name: "Kenji T.",
    title: "Co-founder, Volt",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "I subscribed for $149/yr and applied to 3 grants in week one. Insane value.",
    name: "Sofia R.",
    title: "Founder, Lumen",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "I run on 2 hours a week of admin now. The filters do the heavy lifting.",
    name: "Diego A.",
    title: "Indie SaaS",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
]

// Distribute testimonials across 3 columns with no overlap.
// Each column gets a unique slice; the loop comes from triplicating that slice for seamless scroll.
const col1 = testimonials.filter((_, i) => i % 3 === 0)
const col2 = testimonials.filter((_, i) => i % 3 === 1)
const col3 = testimonials.filter((_, i) => i % 3 === 2)

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="bg-white border-2 border-black shadow-[3px_3px_0_0_#111] p-4 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#111] transition-all duration-200">
      {/* Stars */}
      <div className="flex gap-0.5 mb-2.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="material-symbols-outlined text-[14px] md:text-base text-[#f5c800]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 24" }}
          >
            star
          </span>
        ))}
      </div>

      {/* Quote */}
      <p className="font-sans text-[12px] md:text-[13px] text-gray-800 leading-relaxed mb-3 line-clamp-4">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-2.5 border-t border-dashed border-gray-200 pt-2.5">
        <div className="w-8 h-8 md:w-9 md:h-9 border-2 border-black overflow-hidden flex-shrink-0 relative bg-gray-100">
          {!imgError ? (
            <Image
              src={t.image}
              alt={t.name}
              fill
              className="object-cover"
              sizes="36px"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-[10px] font-bold text-gray-700">
              {t.name[0]}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-mono font-black text-[10px] md:text-[11px] uppercase tracking-tight truncate text-black flex items-center gap-1">
            {t.name}
            <span
              className="material-symbols-outlined text-[12px] text-blue-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
          </p>
          <p className="font-mono text-[9px] md:text-[10px] text-gray-500 truncate">{t.title}</p>
        </div>
      </div>
    </div>
  )
}

function ScrollCol({ items, reverse }: { items: typeof testimonials; reverse?: boolean }) {
  const repeated = [...items, ...items, ...items]
  return (
    <div className={`flex flex-col gap-3 md:gap-4 flex-1 ${reverse ? 'animate-marquee-v-reverse' : 'animate-marquee-v'}`}>
      {repeated.map((t, i) => (
        <TestimonialCard key={i} t={t} />
      ))}
    </div>
  )
}

export default function FounderLogs() {
  return (
    <section className="py-8 md:py-14 bg-background-light border-y-2 border-black overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-6 md:mb-10">
          <span className="inline-flex items-center gap-1.5 bg-black text-accent-yellow font-mono text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black mb-3">
            <span className="material-symbols-outlined text-[12px]">forum</span>
            Founder logs
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-black font-mono uppercase tracking-tight mb-1">
            From "I wish I knew" to{' '}
            <span className="bg-gradient-to-r from-accent-yellow via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              "I just claimed it."
            </span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-sans max-w-xl mx-auto">
            What founders said after they stopped leaving money on the table.
          </p>
        </div>

        {/* Vertical scrolling columns */}
        <div className="flex gap-3 md:gap-4 h-[420px] md:h-[520px] overflow-hidden mask-fade-v">
          {/* Mobile shows 2 columns, desktop adds the 3rd */}
          <ScrollCol items={col1} />
          <ScrollCol items={col2} reverse />
          <div className="hidden md:flex flex-col gap-4 flex-1 animate-marquee-v">
            {[...col3, ...col3, ...col3].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
