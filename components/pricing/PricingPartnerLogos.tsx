'use client'

import React from 'react'

export default function PricingPartnerLogos() {
    const partners = [
        { name: 'AWS', domain: 'aws.amazon.com' },
        { name: 'Google Cloud', domain: 'cloud.google.com' },
        { name: 'Stripe', domain: 'stripe.com' },
        { name: 'Notion', domain: 'notion.so' },
        { name: 'Airtable', domain: 'airtable.com' },
        { name: 'HubSpot', domain: 'hubspot.com' },
        { name: 'Miro', domain: 'miro.com' },
        { name: 'Zendesk', domain: 'zendesk.com' },
        { name: 'Linear', domain: 'linear.app' },
        { name: 'Figma', domain: 'figma.com' },
        { name: 'Intercom', domain: 'intercom.com' },
        { name: 'Mixpanel', domain: 'mixpanel.com' },
        { name: 'Vercel', domain: 'vercel.com' },
        { name: 'Supabase', domain: 'supabase.com' },
        { name: 'Netlify', domain: 'netlify.com' },
        { name: 'DigitalOcean', domain: 'digitalocean.com' },
        { name: 'Twilio', domain: 'twilio.com' },
        { name: 'SendGrid', domain: 'sendgrid.com' },
        { name: 'Auth0', domain: 'auth0.com' },
        { name: 'Algolia', domain: 'algolia.com' },
        { name: 'Typeform', domain: 'typeform.com' },
        { name: 'ClickUp', domain: 'clickup.com' },
        { name: 'Monday', domain: 'monday.com' },
        { name: 'Asana', domain: 'asana.com' }
    ]

    // Duplicate partners to create seamless loop
    const seamlessPartners = [...partners, ...partners]

    return (
        <section className="w-full py-6 bg-white border-b-3 border-[#111111] overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">
                    Get instant access to $500k+ in deals from
                </p>

                <div className="relative w-full overflow-hidden mask-gradient-x">
                    <div className="flex gap-12 animate-marquee whitespace-nowrap items-center">
                        {seamlessPartners.map((partner, index) => (
                            <div key={`${partner.name}-${index}`} className="flex items-center justify-center w-24 h-12 flex-shrink-0 transition-all duration-300 hover:scale-110">
                                <img
                                    src={`https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`}
                                    alt={`${partner.name} logo`}
                                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                                    loading="lazy"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
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
