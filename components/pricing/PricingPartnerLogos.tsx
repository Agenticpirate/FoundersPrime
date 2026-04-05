'use client'

import React, { useState } from 'react'

function PartnerLogo({ partner }: { partner: { name: string; domain: string } }) {
    const [fallbackIndex, setFallbackIndex] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [failed, setFailed] = useState(false)

    const fallbackChain = [
        `https://logo.clearbit.com/${partner.domain}`,
        `https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`,
    ]

    const handleError = () => {
        const nextIndex = fallbackIndex + 1
        if (nextIndex < fallbackChain.length) {
            setFallbackIndex(nextIndex)
            setLoaded(false)
        } else {
            setFailed(true)
        }
    }

    if (failed) return null

    return (
        <img
            src={fallbackChain[fallbackIndex]}
            alt={`${partner.name} logo`}
            className={`w-7 h-7 md:w-10 md:h-10 object-contain transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={handleError}
        />
    )
}

export default function PricingPartnerLogos() {
    const partners = [
        { name: 'AWS', domain: 'aws.amazon.com' },
        { name: 'Google Cloud', domain: 'cloud.google.com' },
        { name: 'Stripe', domain: 'stripe.com' },
        { name: 'Notion', domain: 'notion.so' },
        { name: 'OpenAI', domain: 'openai.com' },
        { name: 'Anthropic', domain: 'anthropic.com' },
        { name: 'Perplexity', domain: 'perplexity.ai' },
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
        { name: 'Postman', domain: 'postman.com' },
        { name: 'Datadog', domain: 'datadog.com' },
        { name: 'Sentry', domain: 'sentry.io' },
        { name: 'Mixpanel', domain: 'mixpanel.com' },
        { name: 'Retool', domain: 'retool.com' },
        { name: 'Twilio', domain: 'twilio.com' },
        { name: 'SendGrid', domain: 'sendgrid.com' },
        { name: 'DigitalOcean', domain: 'digitalocean.com' },
        { name: 'Auth0', domain: 'auth0.com' },
        { name: 'Typeform', domain: 'typeform.com' },
        { name: 'ClickUp', domain: 'clickup.com' },
        { name: 'Monday', domain: 'monday.com' },
        { name: 'Asana', domain: 'asana.com' },
        { name: 'Discord', domain: 'discord.com' },
        { name: 'Zoom', domain: 'zoom.us' },
        { name: 'Loom', domain: 'loom.com' },
        { name: 'Canva', domain: 'canva.com' },
        { name: 'Adobe', domain: 'adobe.com' },
        { name: 'Mailchimp', domain: 'mailchimp.com' },
        { name: 'Klaviyo', domain: 'klaviyo.com' },
        { name: 'Salesforce', domain: 'salesforce.com' },
        { name: 'Deel', domain: 'deel.com' },
        { name: 'Rippling', domain: 'rippling.com' },
        { name: 'Gusto', domain: 'gusto.com' },
        { name: 'Brex', domain: 'brex.com' },
        { name: 'Ramp', domain: 'ramp.com' },
        { name: 'Attio', domain: 'attio.com' }
    ]

    // Triple partners for a very smooth long loop
    const seamlessPartners = [...partners, ...partners, ...partners]

    return (
        <section className="w-full py-4 bg-white border-b-2 border-black overflow-hidden relative">
            <div className="max-w-[1600px] mx-auto text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
                    Get instant access to $500k+ in deals from
                </p>

                <div className="relative w-full overflow-hidden mask-gradient-x">
                    <div className="flex gap-8 md:gap-12 animate-marquee whitespace-nowrap items-center">
                        {seamlessPartners.map((partner, index) => (
                            <div key={`${partner.name}-${index}`} className="flex items-center justify-center w-20 md:w-24 h-12 flex-shrink-0 transition-all duration-300 hover:scale-110">
                                <PartnerLogo partner={partner} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
        </section>
    )
}
