'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function PricingTestimonials() {
    const [activeIndex, setActiveIndex] = useState(0)

    const testimonials = [
        {
            quote: "The value is insane. I saved $5,000 on AWS credits within 10 minutes of signing up. The community access alone is worth the price.",
            author: "Sarah Chen",
            role: "Founder, TechFlow",
            avatar: "https://i.pravatar.cc/150?u=sarah",
            rating: 5
        },
        {
            quote: "FoundersPrime is the cheat code for bootstrapping. The grants database helped us secure $25k in non-dilutive funding.",
            author: "Marcus Johnson",
            role: "CEO, Nexa",
            avatar: "https://i.pravatar.cc/150?u=marcus",
            rating: 5
        },
        {
            quote: "I was skeptical at first, but the ROI is undeniable. It pays for itself 100x over. If you're building a startup, you need this.",
            author: "Elena Rodriguez",
            role: "Co-founder, Bloom",
            avatar: "https://i.pravatar.cc/150?u=elena",
            rating: 5
        }
    ]

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const activeTestimonial = testimonials[activeIndex]

    return (
        <section className="w-full py-20 px-4 bg-[#F4F3EF] border-b-3 border-[#111111]">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-12">
                    <h2 className="font-mono text-3xl font-black uppercase mb-4 text-[#111111] tracking-tight">
                        Don't Take Our Word For It
                    </h2>
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        Join thousands of founders who are building smarter, faster, and cheaper.
                    </p>
                </div>

                <div className="relative bg-white border-3 border-[#111111] shadow-neo p-6 md:p-12 mx-auto max-w-3xl">
                    <div className="flex gap-1 justify-center mb-6">
                        {[...Array(activeTestimonial.rating)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-[#ffd700] fill-current text-2xl drop-shadow-[1px_1px_0_#111]">star</span>
                        ))}
                    </div>

                    <h3 className="font-mono text-2xl md:text-3xl font-bold leading-relaxed mb-8 text-[#111111]">
                        "{activeTestimonial.quote}"
                    </h3>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gray-200 rounded-full border-2 border-[#111111] overflow-hidden">
                            <Image
                                src={activeTestimonial.avatar}
                                alt={activeTestimonial.author}
                                width={48}
                                height={48}
                            />
                        </div>
                        <div className="text-left">
                            <p className="font-black text-sm uppercase text-[#111111]">{activeTestimonial.author}</p>
                            <p className="text-xs font-bold text-gray-500">{activeTestimonial.role}</p>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="w-10 h-10 flex items-center justify-center bg-white border-2 border-[#111111] shadow-[4px_4px_0_0_#111111] hover:shadow-[2px_2px_0_0_#111111] hover:translate-y-[2px] hover:translate-x-[2px] transition-all rounded-full"
                        >
                            <span className="material-symbols-outlined text-[#111111]">arrow_back</span>
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="w-10 h-10 flex items-center justify-center bg-[#13b6ec] border-2 border-[#111111] shadow-[4px_4px_0_0_#111111] hover:shadow-[2px_2px_0_0_#111111] hover:translate-y-[2px] hover:translate-x-[2px] transition-all rounded-full"
                        >
                            <span className="material-symbols-outlined text-white">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
