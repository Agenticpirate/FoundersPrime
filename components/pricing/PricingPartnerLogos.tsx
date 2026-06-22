'use client'

import React, { useState } from 'react'

function PartnerLogo({ partner }: { partner: { name: string; domain: string } }) {
    const [fallbackIndex, setFallbackIndex] = useState(0)
    const [failed, setFailed] = useState(false)

    const fallbackChain = [
        `https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`,
        `https://logo.clearbit.com/${partner.domain}`,
    ]

    if (failed) return null

    return (
        <img
            src={fallbackChain[fallbackIndex]}
            alt={`${partner.name}`}
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
            loading="eager"
            onError={() => {
                const next = fallbackIndex + 1
                if (next < fallbackChain.length) setFallbackIndex(next)
                else setFailed(true)
            }}
        />
    )
}

const partners = [
    { name: 'AWS', domain: 'aws.amazon.com' },
    { name: 'Google Cloud', domain: 'cloud.google.com' },
    { name: 'Stripe', domain: 'stripe.com' },
    { name: 'Notion', domain: 'notion.so' },
    { name: 'OpenAI', domain: 'openai.com' },
    { name: 'Vercel', domain: 'vercel.com' },
    { name: 'Supabase', domain: 'supabase.com' },
    { name: 'Figma', domain: 'figma.com' },
    { name: 'Slack', domain: 'slack.com' },
    { name: 'Linear', domain: 'linear.app' },
    { name: 'Framer', domain: 'framer.com' },
    { name: 'Webflow', domain: 'webflow.com' },
    { name: 'Airtable', domain: 'airtable.com' },
    { name: 'HubSpot', domain: 'hubspot.com' },
    { name: 'Intercom', domain: 'intercom.com' },
    { name: 'Datadog', domain: 'datadoghq.com' },
    { name: 'Sentry', domain: 'sentry.io' },
    { name: 'Mixpanel', domain: 'mixpanel.com' },
    { name: 'Twilio', domain: 'twilio.com' },
    { name: 'DigitalOcean', domain: 'digitalocean.com' },
    { name: 'Discord', domain: 'discord.com' },
    { name: 'Canva', domain: 'canva.com' },
    { name: 'Adobe', domain: 'adobe.com' },
    { name: 'Salesforce', domain: 'salesforce.com' },
    { name: 'Brex', domain: 'brex.com' },
    { name: 'Ramp', domain: 'ramp.com' },
]

const seamlessPartners = [...partners, ...partners]

export default function PricingPartnerLogos() {
    return (
        <section className="w-full py-4 md:py-6 bg-[#050505] border-y border-[#1b2028] overflow-hidden relative">
            <div className="text-center">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">
                    Access $500K+ in deals from
                </p>
                <div className="relative w-full overflow-hidden mask-gradient-x">
                    <div className="flex gap-6 md:gap-10 animate-marquee-fast whitespace-nowrap items-center brightness-90 contrast-125 dark:brightness-100">
                        {seamlessPartners.map((partner, index) => (
                            <div key={`${partner.name}-${index}`} className="flex items-center justify-center w-10 md:w-16 h-8 md:h-10 flex-shrink-0">
                                <PartnerLogo partner={partner} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .animate-marquee-fast {
                    animation: marquee-fast 20s linear infinite;
                }
                @keyframes marquee-fast {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .mask-gradient-x {
                    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                }
            `}</style>
        </section>
    )
}
