'use client';

import React, { useState } from 'react';
import Image from 'next/image';


type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    avatar: string;
};

const testimonials: Testimonial[] = [
    {
        quote: "Honestly, I signed up just to try it out and ended up claiming $5,000 in AWS credits in like 10 minutes. That alone made up for years of membership. Wish I'd found this sooner.",
        name: "Arjun Mehta",
        designation: "Founder, CloudSync",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "We were struggling to find non-dilutive funding and had no clue about government grants. FoundersPrime's database helped us secure ₹18 lakh in funding we would've never found on our own.",
        name: "Priya Sharma",
        designation: "Co-founder, EduLeap",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "Every dollar counts when you're bootstrapping. I got $150K in Stripe fee credits and free Notion for my whole team through FoundersPrime. It's not even a question — just sign up.",
        name: "Daniel Okafor",
        designation: "CEO, PayStack Africa",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "The pitch deck template from their resources section was a lifesaver. Our investors actually complimented the structure. We closed our pre-seed round in just 3 weeks after using it.",
        name: "Maria Gonzalez",
        designation: "Founder, Sprout Labs",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "I tried like 15 different deal platforms before landing on FoundersPrime. Nothing else comes close. The deals are actually relevant and well-curated, not just random affiliate links.",
        name: "Raj Patel",
        designation: "CTO, DevOps.ai",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "The YC application templates and strategy guides on FoundersPrime gave me such a huge edge. I got into the W25 batch and I honestly credit a lot of my prep to this platform.",
        name: "Sophie Chen",
        designation: "Founder, Nimbus AI",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "Solo founder life is tough, but FoundersPrime makes it way easier. Google Cloud credits, HubSpot free tier, Notion Teams — my software costs are basically zero now. Love it.",
        name: "James Mitchell",
        designation: "Indie Hacker, ShipFast",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "I went with the Legend plan and honestly, best money I've spent on my startup. Lifetime access means no renewals, and their support team is surprisingly fast and helpful.",
        name: "Ananya Iyer",
        designation: "Co-founder, FinStack",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "In our first month, we saved over $12,000 on SaaS tools. Notion, Figma, Airtable — all covered. For a 4-person team, that's massive. Told every founder friend about this.",
        name: "Liam Torres",
        designation: "Founder, Nuvio",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "We weren't sure we'd qualify for some of the deals listed. The support team walked us through everything, checked our eligibility, and got us set up in a day. Really impressive service.",
        name: "Slavko Zafirovski",
        designation: "CEO, PixelForge",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "Was skeptical at first — seemed too good to be true. But after using it for 3 months, about 80% of our tool costs are covered through deals here. It's genuinely a cheat code.",
        name: "Kamran Abdul",
        designation: "Founder, Qanat Tech",
        avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "I've recommended FoundersPrime to every startup founder I know. You'll save way more than the membership costs. Plus their customer support actually replies quickly, which is rare.",
        name: "Colin Hirdman",
        designation: "Co-founder, Relay",
        avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "The ad credits alone were worth it for us. We got $500 in Google Ads and Meta Ads credits that helped us test our go-to-market strategy without burning our own cash. Super useful.",
        name: "Aisha Khan",
        designation: "Growth Lead, Zesto",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "What I love about FoundersPrime is that it's not just deals — the community is full of smart, scrappy founders who actually share knowledge. Made some amazing connections here.",
        name: "Nikhil Reddy",
        designation: "Founder, BuilderOS",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "My co-founder found FoundersPrime and honestly it changed how we operate. We used to pay full price for everything. Now we're saving thousands every quarter on tools we already use.",
        name: "Elena Petrova",
        designation: "COO, DriftLabs",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "I was spending hours every week hunting for startup deals and credits across 20 different sites. FoundersPrime puts it all in one place. Saves me so much time and I never miss a deal.",
        name: "Tom Bakker",
        designation: "CTO, Luminary",
        avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "The investor database is gold. Found 12 angel investors in our space that we didn't even know existed. Sent warm intros through the platform and closed a $200K angel round.",
        name: "Grace Obi",
        designation: "Founder, Launchbox",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "As someone building in India, the INR pricing and India-specific deals are amazing. Most platforms only cater to US founders. FoundersPrime actually understands the global market.",
        name: "Vikram Singh",
        designation: "Founder, ScaleUp India",
        avatar: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "I joined for the SaaS deals but stayed for the templates and guides. The financial model template saved me from hiring a consultant. Everything is well thought out and founder-friendly.",
        name: "Rachel Kim",
        designation: "Co-founder, Nova Health",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "FoundersPrime helped us cut our monthly burn by 40%. Between cloud credits, free tools, and SaaS discounts, we extended our runway by 6 months. That's not an exaggeration.",
        name: "Marcus Johnson",
        designation: "CEO, Nexa",
        avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=80&h=80&auto=format&fit=crop",
    },
    {
        quote: "We activated $100,000 in AWS credits through FoundersPrime in under 48 hours. Our infrastructure costs dropped to near zero for 12 months. That kind of runway extension is genuinely startup-changing.",
        name: "David Park",
        designation: "CTO & Co-founder, Stackwise",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=80&h=80&auto=format&fit=crop",
    },
];

// Split into 3 columns for masonry
const col1 = testimonials.filter((_, i) => i % 3 === 0);
const col2 = testimonials.filter((_, i) => i % 3 === 1);
const col3 = testimonials.filter((_, i) => i % 3 === 2);

function AvatarImage({ src, name }: { src: string; name: string }) {
    const [imgError, setImgError] = useState(false)
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    const colors = ['#f5d000','#13b6ec','#ff6b35','#6c63ff','#00c896']
    const bg = colors[name.charCodeAt(0) % colors.length]

    if (imgError) {
        return (
            <div
                className="w-full h-full flex items-center justify-center font-black font-mono text-xs text-black"
                style={{ backgroundColor: bg }}
            >
                {initials}
            </div>
        )
    }

    return (
        <Image
            src={src}
            alt={name}
            width={40}
            height={40}
            className="object-cover w-full h-full"
            onError={() => setImgError(true)}
        />
    )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="bg-white border-2 border-[#e5e5e5] rounded-lg p-5 hover:border-[#38bdf8] hover:shadow-md transition-all duration-300">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <AvatarImage src={testimonial.avatar} name={testimonial.name} />
                </div>
                <div>
                    <p className="font-bold text-sm text-[#111111] leading-tight">{testimonial.name}</p>
                    <p className="text-xs text-gray-500 leading-tight">{testimonial.designation}</p>
                </div>
            </div>

            {/* Quote */}
            <p className="text-[13px] leading-relaxed text-gray-700">
                &ldquo;{testimonial.quote}&rdquo;
            </p>
        </div>
    );
}


export default function Pricing3DTestimonials() {
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [activeIdx, setActiveIdx] = React.useState(0)
    const totalMobile = Math.min(8, testimonials.length)

    React.useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        const cardWidth = el.scrollWidth / totalMobile
        const timer = setInterval(() => {
            setActiveIdx(prev => {
                const next = (prev + 1) % totalMobile
                el.scrollTo({ left: next * cardWidth, behavior: 'smooth' })
                return next
            })
        }, 3000)
        return () => clearInterval(timer)
    }, [totalMobile])

    return (
        <section className="w-full py-8 md:py-8 md:py-6 md:py-8 bg-background-light border-b-3 border-[#111111] overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
                {/* Header */}
                <div className="text-center mb-4 md:mb-6 md:mb-4 md:mb-6">
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-black uppercase mb-1.5 md:mb-4 tracking-tighter text-[#111111]">
                        Don&apos;t Take Our Word For It
                    </h2>
                    <p className="text-xs md:text-base font-medium text-gray-500 max-w-2xl mx-auto">
                        Real founders. Real results. See how FoundersPrime is helping startups save thousands.
                    </p>
                </div>

                <div
                    ref={scrollRef}
                    className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 mobile-scroll-hide -mx-4 px-4 items-stretch"
                >
                    {testimonials.slice(0, totalMobile).map((t) => (
                        <div key={t.name} className="snap-center shrink-0 w-[85vw] bg-white border-2 border-[#111111] shadow-[2px_2px_0_0_#111111] p-3.5">
                            <div className="flex gap-0.5 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="material-symbols-outlined text-xs text-[#ffd700]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                ))}
                            </div>
                            <p className="text-[11px] leading-relaxed text-gray-800 font-medium mb-3">&ldquo;{t.quote}&rdquo;</p>
                            <div className="flex items-center gap-2 border-t border-gray-100 pt-2.5">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                                    <AvatarImage src={t.avatar} name={t.name} />
                                </div>
                                <div>
                                    <p className="font-bold text-xs text-[#111111] leading-tight">{t.name}</p>
                                    <p className="text-[9px] text-gray-500 leading-tight">{t.designation}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Mobile dot indicators */}
                <div className="flex md:hidden justify-center items-center gap-1.5 mt-3 mb-2">
                    {Array.from({ length: totalMobile }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setActiveIdx(i)
                                const el = scrollRef.current
                                if (el) {
                                    const cardWidth = el.scrollWidth / totalMobile
                                    el.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
                                }
                            }}
                            className={`transition-all duration-300 ${i === activeIdx ? 'w-4 h-1.5 bg-black rounded-sm' : 'w-1.5 h-1.5 bg-gray-300 rounded-full'}`}
                        />
                    ))}
                </div>

                {/* Desktop: Infinite Vertical Scrolling Marquee — uses globals.css keyframes */}
                <div className="hidden md:flex justify-center gap-4 h-[600px] overflow-hidden mask-fade-v mt-8">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-4 animate-marquee-v hover:[animation-play-state:paused] flex-1 max-w-[350px]">
                        {[...col1, ...col1].map((t, i) => (
                            <TestimonialCard key={`col1-${i}`} testimonial={t} />
                        ))}
                    </div>
                    {/* Column 2 */}
                    <div className="flex flex-col gap-4 animate-marquee-v-reverse hover:[animation-play-state:paused] flex-1 max-w-[350px]">
                        {[...col2, ...col2].map((t, i) => (
                            <TestimonialCard key={`col2-${i}`} testimonial={t} />
                        ))}
                    </div>
                    {/* Column 3 */}
                    <div className="hidden lg:flex flex-col gap-4 animate-marquee-v hover:[animation-play-state:paused] flex-1 max-w-[350px]">
                        {[...col3, ...col3].map((t, i) => (
                            <TestimonialCard key={`col3-${i}`} testimonial={t} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

