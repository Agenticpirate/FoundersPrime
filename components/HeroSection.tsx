'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [totalSavings, setTotalSavings] = useState(125400)
  const [displaySavings, setDisplaySavings] = useState(125400)

  // Animate savings increase every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Add random amount between $5 and $50
      const increase = Math.floor(Math.random() * 46) + 5
      setTotalSavings(prev => {
        const newValue = prev + increase
        // Reset if it goes over 1 billion
        if (newValue >= 1000000000) {
          return 125400
        }
        return newValue
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Smooth animation for display value
  useEffect(() => {
    const animationDuration = 1000 // 1 second
    const steps = 20
    const stepDuration = animationDuration / steps
    const difference = totalSavings - displaySavings
    const stepValue = difference / steps

    let currentStep = 0
    const animationInterval = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setDisplaySavings(totalSavings)
        clearInterval(animationInterval)
      } else {
        setDisplaySavings(prev => prev + stepValue)
      }
    }, stepDuration)

    return () => clearInterval(animationInterval)
  }, [totalSavings])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  return (
    <section className="relative pt-4 pb-0 md:pt-8 lg:pt-16 lg:pb-0 overflow-hidden grid-bg flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow mb-6 md:mb-12 lg:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center h-full">
          <div className="lg:col-span-7 flex flex-col justify-center items-start pt-2 lg:pt-0">
            <div className="inline-flex items-center gap-2 bg-white neo-border px-2 py-0.5 mb-3 neo-shadow-static">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] sm:text-xs font-mono font-bold text-black uppercase tracking-wide">VERIFIED SAVINGS OPPORTUNITIES IDENTIFIED THIS WEEK</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black tracking-tight mb-3 leading-none font-mono">
              FREE CREDITS.<br />
              REAL GRANTS.<br />
              <span className="bg-accent-yellow px-2 mt-1 inline-block neo-border box-decoration-clone">ZERO DILUTION.</span>
            </h1>

            <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-black mb-4 font-medium max-w-lg border-l-4 border-black pl-3">
              FoundersPrime is a founder intelligence platform.<br />
              Discover verified startup credits, non-dilutive grants, and accelerator opportunities in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mb-4 mt-1 w-full sm:w-auto">
              <Link href="/deals" className="bg-black text-white text-sm md:text-base font-medium py-2.5 md:py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-gray-800 shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto font-sans">
                Access Deals <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>

              <div className="flex flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-start">
                <Link href="/deals/grants" className="text-gray-600 font-medium hover:text-black transition-colors flex items-center justify-center sm:justify-start gap-1.5 text-sm font-sans">
                  Find Grants <span className="material-symbols-outlined text-base leading-none">arrow_outward</span>
                </Link>
                <Link href="/deals/accelerators" className="text-gray-600 font-medium hover:text-black transition-colors flex items-center justify-center sm:justify-start gap-1.5 text-sm font-sans">
                  View Accelerators <span className="material-symbols-outlined text-base leading-none">arrow_outward</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-1 text-[9px] sm:text-xs font-mono font-bold text-black uppercase border-t-2 border-black pt-3 w-full pr-0 lg:pr-12">
              <span>VERIFIED DEALS</span> • <span>NON-DILUTIVE GRANTS</span> • <span>TOP ACCELERATORS</span>
            </div>

            {/* ── Mobile-only Brand Icons Scroller ── */}
            <div className="md:hidden mt-5 w-full">
              <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-2">Credits &amp; grants from</p>
              <div className="relative w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right,transparent,black 12%,black 88%,transparent)', WebkitMaskImage: 'linear-gradient(to right,transparent,black 12%,black 88%,transparent)' }}>
                <div className="mobile-brand-marquee flex items-center gap-6 whitespace-nowrap">
                  {[
                    { name: 'AWS', domain: 'aws.amazon.com' },
                    { name: 'Google Cloud', domain: 'cloud.google.com' },
                    { name: 'Stripe', domain: 'stripe.com' },
                    { name: 'Notion', domain: 'notion.so' },
                    { name: 'HubSpot', domain: 'hubspot.com' },
                    { name: 'Airtable', domain: 'airtable.com' },
                    { name: 'Figma', domain: 'figma.com' },
                    { name: 'Linear', domain: 'linear.app' },
                    { name: 'Vercel', domain: 'vercel.com' },
                    { name: 'Supabase', domain: 'supabase.com' },
                    { name: 'DigitalOcean', domain: 'digitalocean.com' },
                    { name: 'Twilio', domain: 'twilio.com' },
                    { name: 'Algolia', domain: 'algolia.com' },
                    { name: 'Intercom', domain: 'intercom.com' },
                    { name: 'Miro', domain: 'miro.com' },
                    { name: 'Mixpanel', domain: 'mixpanel.com' },
                    { name: 'Monday', domain: 'monday.com' },
                    { name: 'Asana', domain: 'asana.com' },
                    { name: 'ClickUp', domain: 'clickup.com' },
                    { name: 'Typeform', domain: 'typeform.com' },
                    { name: 'Netlify', domain: 'netlify.com' },
                    { name: 'Auth0', domain: 'auth0.com' },
                    { name: 'SendGrid', domain: 'sendgrid.com' },
                    { name: 'Zendesk', domain: 'zendesk.com' },
                    /* duplicate for seamless loop */
                    { name: 'AWS', domain: 'aws.amazon.com' },
                    { name: 'Google Cloud', domain: 'cloud.google.com' },
                    { name: 'Stripe', domain: 'stripe.com' },
                    { name: 'Notion', domain: 'notion.so' },
                    { name: 'HubSpot', domain: 'hubspot.com' },
                    { name: 'Airtable', domain: 'airtable.com' },
                    { name: 'Figma', domain: 'figma.com' },
                    { name: 'Linear', domain: 'linear.app' },
                    { name: 'Vercel', domain: 'vercel.com' },
                    { name: 'Supabase', domain: 'supabase.com' },
                    { name: 'DigitalOcean', domain: 'digitalocean.com' },
                    { name: 'Twilio', domain: 'twilio.com' },
                    { name: 'Algolia', domain: 'algolia.com' },
                    { name: 'Intercom', domain: 'intercom.com' },
                    { name: 'Miro', domain: 'miro.com' },
                    { name: 'Mixpanel', domain: 'mixpanel.com' },
                    { name: 'Monday', domain: 'monday.com' },
                    { name: 'Asana', domain: 'asana.com' },
                    { name: 'ClickUp', domain: 'clickup.com' },
                    { name: 'Typeform', domain: 'typeform.com' },
                    { name: 'Netlify', domain: 'netlify.com' },
                    { name: 'Auth0', domain: 'auth0.com' },
                    { name: 'SendGrid', domain: 'sendgrid.com' },
                    { name: 'Zendesk', domain: 'zendesk.com' },
                  ].map((b, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${b.domain}&sz=64`}
                          alt={b.name}
                          className="w-5 h-5 object-contain"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      </div>
                      <span className="text-[8px] font-mono text-gray-400 font-bold uppercase truncate max-w-[36px] text-center">{b.name.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-4 lg:mt-0 hidden md:block">
            <div className="bg-white neo-border neo-shadow p-2 relative z-10 mx-auto max-w-md lg:max-w-none">
              <div className="bg-black text-white p-2 text-[10px] md:text-xs font-mono flex justify-between border-b-2 border-black mb-0">
                <span>FOUNDERSPRIME INDEX</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  VERIFIED
                </span>
              </div>
              <div className="p-4 bg-[#f6f6f8] flex flex-col gap-3">

                {/* Savings Opportunity Block */}
                <div className="bg-white neo-border p-4">
                  <div className="text-[10px] md:text-xs font-mono text-gray-500 mb-1">SAVINGS OPPORTUNITY</div>
                  <div className="text-2xl md:text-3xl font-mono font-bold text-black">$847,293.00</div>
                  <div className="text-[10px] md:text-xs font-mono text-green-600 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    tracked this week
                  </div>
                </div>

                {/* Grid Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#ff9900] neo-border p-3">
                    <div className="text-[10px] md:text-xs font-bold mb-1">☁ CLOUD CREDITS</div>
                    <div className="text-xs text-black font-medium">programs</div>
                    <div className="font-mono font-bold text-sm md:text-base">up to $100K</div>
                  </div>
                  <div className="bg-[#7ed6e0] neo-border p-3">
                    <div className="text-[10px] md:text-xs font-bold mb-1">💳 PAYMENT SAVINGS</div>
                    <div className="text-xs text-black font-medium">fee waivers</div>
                    <div className="font-mono font-bold text-sm md:text-base">up to $50K</div>
                  </div>
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-2">
                  <div className="bg-accent-yellow neo-border p-2 flex justify-between items-center px-3">
                    <span className="text-[10px] md:text-xs font-bold flex items-center gap-2">● GRANT SPOTLIGHT</span>
                    <span className="font-mono font-bold text-sm md:text-base">$250,000</span>
                  </div>
                  <div className="bg-white neo-border p-2 flex justify-between items-center px-3">
                    <span className="text-xs font-bold flex items-center gap-2">● ACCELERATOR WINDOW</span>
                    <span className="font-mono font-bold bg-green-100 px-1 text-green-700">OPEN</span>
                  </div>
                  <div className="bg-white neo-border p-2 flex justify-between items-center px-3">
                    <span className="text-xs font-bold flex items-center gap-2">● OPPORTUNITIES EXPIRING</span>
                    <span className="font-mono font-bold">12</span>
                  </div>
                </div>

              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-black bg-transparent z-0"></div>
          </div>
        </div>
      </div>

      {/* Integrated Marquee Ticker */}
      <div className="bg-black py-3 overflow-hidden border-t-2 border-b-2 border-black w-full relative z-20">
        <div className="marquee flex items-center gap-12 whitespace-nowrap">
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-yellow">terminal</span> AWS ACTIVATE // $100K CREDITS
          </span>
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-cyan">code</span> GITHUB // ENTERPRISE PACK
          </span>
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">dataset</span> NOTION // 6 MONTHS FREE
          </span>
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-red">payments</span> STRIPE // ZERO FEES $20K
          </span>
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-yellow">hub</span> HUBSPOT // 90% OFF
          </span>
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-cyan">dns</span> DIGITALOCEAN // $500 CREDIT
          </span>
          {/* Duplicate for seamless loop */}
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-yellow">terminal</span> AWS ACTIVATE // $100K CREDITS
          </span>
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-cyan">code</span> GITHUB // ENTERPRISE PACK
          </span>
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">dataset</span> NOTION // 6 MONTHS FREE
          </span>
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-red">payments</span> STRIPE // ZERO FEES $20K
          </span>
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-yellow">hub</span> HUBSPOT // 90% OFF
          </span>
          <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-cyan">dns</span> DIGITALOCEAN // $500 CREDIT
          </span>
        </div>
      </div>
    </section>
  )
}
