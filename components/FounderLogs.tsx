'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

export default function FounderLogs() {
  const testimonials = [
    {
      quote: "Saved us $5k on AWS in the first week. The ROI on this is absolutely insane.",
      name: "Sarah Jenkins",
      title: "CTO, FinFlow",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5d4-Q9P1h1tTPpPXPBqpJ7J4mMLkrwRJFv9zGEo4odhwBoJ8IdoOT_UJ0gayHuB5eAafpdAxNdZ2M3bUMXrA3wEVh5xEMcbARixdAaVclLOa1b6e9HtjssMTn9iEUJQdNAOOPdYAk7LxyU9K4zmQvA7gS3gRJ45eMQ1UPya6ZmbVCNikhRc9IyIMGp0I3_c_C9WjbSI0KO50LPyaBlt0cnXXEzotw9NewrXhZPHUtj01zYTGPJ4gEbfkIRD33qXXrO9gclzUEool2"
    },
    {
      quote: "I found a non-dilutive grant I didn't even know existed. We got $15k fast.",
      name: "David Chen",
      title: "Founder, BioLabs",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfkkSY9Pew95IzHg4YoxCh_wzyOiX0bfJeIWFQRuLfjEQLRPyPXM9I8xMrbrXz1nUtoB7G1_2Whry-XoT6ksgKbrKjoM2IjdeCcA1hy5PA9wZ7pUf_uhphHamSDCemqRoQmExLwYbPv4adfA30oj2uTRpv-DnwYfNbdPX5W5kgKXhCod_bk5JhvJSBnSGZgfbGtJAxUD9CBRefvq3vhKLeMFDCAJY3NV5QeUFUac2G4sfihNkgBuAiSwfQcc9KgqECNPl-UEWEeT6n"
    },
    {
      quote: "The verified ideas database helped me pivot. Now we are profitable.",
      name: "Elena R.",
      title: "CEO, MarketPulse",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDWKOTW1Z4METWLmHRcQOqrZY_8W0vdfCfL-pcYbWkMcldNXkQTDNyoMD0pMG5KH-Y7sn68IbbpxsijgEuALAwjmzpomYSieRn06RqYVkEfdPv1Bco8tUegoNAnSbhMb4wf6G3bCQ3lbpRqs5EUBflZ3kkB9B7inbfIwPx7FNRhG8kjomp_1UkffjgH_yPZ1j_atI40hWzfLka-wORQEeYr4WEnts90LGX0r9OPtjyn20j5NmeeSGgiKWTa4u7ks4H2qjKgeZ51HTl"
    },
    {
      quote: "FoundersPrime is the only bookmark I need. It's just value, no fluff.",
      name: "Mark T.",
      title: "Founder, SaaS Kit",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJSfNuFAkHSSHXD66I3uU_LcarNZ1wvDrPQ33fyADxXkj6dg_IRrn9aZREfNLU3MrcPp8mAakxP2fQErIkFUYQrfADMyOfJEu-Y7_G8Wp3R7ofInaORoI_d7KqQH8Ztes_Vu9ugBrKwlXK2YgvwX2UcGp7KulF_lpspbqqli0PnieW-yKjNPUK7lL5mLu3nwjWJ1bugi3NjNZKyzN0oDPPB_kUlvFud95r-BnSfJTZIPMgK5fEss0Cb29xGDEgZZZPrjdaltR6VEyC"
    },
    {
      quote: "Literally paid for itself in 5 minutes. The Stripe fee credits are gold.",
      name: "James Wu",
      title: "Indie Hacker",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The accelerator database saved me weeks of research. Applied to 5, got into 2.",
      name: "Priya P.",
      title: "Co-founder, EdTech",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Finally a place that actually vets the deals. No broken links, just savings.",
      name: "Tom H.",
      title: "DevOps Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "If you're bootstrapping, you need this. It stretches your budget so far.",
      name: "Lisa Wong",
      title: "Product Designer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ]

  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = useCallback((idx: number) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[idx] as HTMLElement
    if (card) {
      container.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' })
      setActiveIdx(idx)
    }
  }, [])

  const goNext = useCallback(() => {
    const next = (activeIdx + 1) % testimonials.length
    goTo(next)
  }, [activeIdx, testimonials.length, goTo])

  // Auto-play carousel
  useEffect(() => {
    if (isHovered) return
    autoPlayRef.current = setInterval(goNext, 3200)
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
  }, [goNext, isHovered])

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return
    const scrollLeft = container.scrollLeft
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 0
    const idx = Math.round(scrollLeft / (cardWidth + 12))
    setActiveIdx(Math.min(idx, testimonials.length - 1))
  }

  return (
    <section className="py-8 md:py-20 bg-[#f6f8f8] border-y-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-5xl font-bold text-black mb-5 md:mb-16 text-center font-mono uppercase">
          <span className="bg-accent-yellow px-3 md:px-4 py-1 border-2 border-black shadow-[4px_4px_0px_#000]">Founder_Logs</span>
        </h2>

        {/* Mobile: auto-playing smooth carousel */}
        <div
          className="md:hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 mobile-scroll-hide"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border-2 border-black p-4 snap-start shrink-0 w-[82vw] shadow-[3px_3px_0px_#000] flex flex-col"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-xs text-accent-yellow"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="material-symbols-outlined text-gray-200 text-lg">format_quote</span>
                </div>

                <p className="text-xs font-medium font-mono leading-relaxed text-gray-700 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-2 border-t-2 border-dashed border-gray-200 pt-3 mt-3">
                  <FounderImage image={testimonial.image} />
                  <div className="text-xs">
                    <div className="font-bold uppercase">{testimonial.name}</div>
                    <div className="text-gray-500 font-mono">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeIdx === idx ? 'w-5 bg-black' : 'w-1.5 bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white border-2 border-black p-6 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] transition-all duration-300 rounded-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm text-accent-yellow drop-shadow-sm"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="material-symbols-outlined text-gray-300 group-hover:text-black transition-colors">format_quote</span>
              </div>

              <p className="text-sm font-medium mb-6 font-mono leading-relaxed text-gray-700 group-hover:text-black transition-colors">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t-2 border-dashed border-gray-200 group-hover:border-black pt-4 transition-colors">
                <FounderImage image={testimonial.image} />
                <div className="text-xs">
                  <div className="font-bold uppercase group-hover:text-primary transition-colors">{testimonial.name}</div>
                  <div className="text-gray-500 font-mono group-hover:text-gray-800">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FounderImage({ image }: { image: string }) {
  return (
    <div
      className="w-9 h-9 border-2 border-black rounded-full overflow-hidden transition-all duration-300 relative flex-shrink-0"
    >
      <Image src={image} alt="Founder" fill className="object-cover" sizes="36px" />
    </div>
  )
}