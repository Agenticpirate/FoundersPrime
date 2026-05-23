'use client'

import Link from 'next/link'

const categories = [
  {
    name: 'Productivity',
    slug: 'productivity',
    examples: 'Notion, Airtable, ClickUp',
    icon: 'task_alt',
    bg: 'bg-yellow-100',
    accent: 'bg-yellow-500',
    text: 'text-yellow-900',
    tag: 'Stack',
  },
  {
    name: 'Marketing',
    slug: 'marketing-tools',
    examples: 'HubSpot, Mailchimp, Brevo',
    icon: 'campaign',
    bg: 'bg-orange-100',
    accent: 'bg-orange-500',
    text: 'text-orange-900',
    tag: 'Growth',
  },
  {
    name: 'Sales & CRM',
    slug: 'sales-crm',
    examples: 'Salesforce, Pipedrive, Close',
    icon: 'monetization_on',
    bg: 'bg-red-100',
    accent: 'bg-red-500',
    text: 'text-red-900',
    tag: 'Revenue',
  },
  {
    name: 'Support',
    slug: 'hr-ops',
    examples: 'Intercom, Zendesk, Freshdesk',
    icon: 'support_agent',
    bg: 'bg-purple-100',
    accent: 'bg-purple-500',
    text: 'text-purple-900',
    tag: 'CX',
  },
  {
    name: 'Analytics',
    slug: 'productivity',
    examples: 'Mixpanel, Amplitude, Segment',
    icon: 'bar_chart',
    bg: 'bg-blue-100',
    accent: 'bg-blue-500',
    text: 'text-blue-900',
    tag: 'Insights',
  },
  {
    name: 'Dev Tools',
    slug: 'dev-tools',
    examples: 'GitHub, Vercel, Netlify',
    icon: 'code',
    bg: 'bg-gray-100',
    accent: 'bg-gray-700',
    text: 'text-gray-900',
    tag: 'Build',
  },
  {
    name: 'Design',
    slug: 'design-tools',
    examples: 'Figma, Canva, Webflow',
    icon: 'palette',
    bg: 'bg-pink-100',
    accent: 'bg-pink-500',
    text: 'text-pink-900',
    tag: 'Visual',
  },
  {
    name: 'Comms',
    slug: 'productivity',
    examples: 'Slack, Zoom, Loom',
    icon: 'chat',
    bg: 'bg-green-100',
    accent: 'bg-green-500',
    text: 'text-green-900',
    tag: 'Team',
  },
]

export default function SaasGrid() {
  return (
    <section className="relative w-full mb-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-indigo-100 border-2 border-black shadow-[1px_1px_0px_#111]">
            <span className="material-symbols-outlined !text-[16px] text-indigo-700">apps</span>
          </span>
          <div>
            <h2 className="font-mono text-[14px] md:text-base font-black uppercase tracking-[0.06em] text-black leading-none">
              Browse by Category
            </h2>
            <p className="text-[10.5px] text-gray-500 mt-1">{categories.length} categories · stage-matched recommendations</p>
          </div>
        </div>
        <Link
          href="/deals"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10.5px] font-black uppercase tracking-wider border-2 border-black bg-white text-black rounded-sm shadow-[2px_2px_0px_#111] hover:bg-accent-yellow hover:shadow-[3px_3px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all"
        >
          All Deals
          <span className="material-symbols-outlined !text-[12px]">arrow_forward</span>
        </Link>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {categories.map((cat, idx) => (
          <Link
            key={cat.name}
            href={`/deals?category=saas-discounts&subcategory=${cat.slug}`}
            className={`relative group ${cat.bg} border-2 border-black rounded-sm p-3.5 md:p-4 shadow-[3px_3px_0px_#111] hover:shadow-[5px_5px_0px_#111] hover:-translate-x-px hover:-translate-y-px transition-all overflow-hidden saas-cat-fade-in`}
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            {/* Glow blob */}
            <div className={`absolute -top-3 -right-3 w-16 h-16 md:w-20 md:h-20 ${cat.accent} opacity-15 rounded-full blur-xl group-hover:opacity-30 transition-opacity`} />

            {/* Mandala — visible on hover */}
            <div className="absolute -bottom-8 -right-8 w-20 h-20 pointer-events-none opacity-[0.10] group-hover:opacity-[0.22] transition-opacity" aria-hidden="true">
              <svg viewBox="0 0 200 200" className={`w-full h-full ${cat.text} saas-cat-mandala-spin`} fill="none" stroke="currentColor" strokeWidth="0.7">
                <rect x="60" y="60" width="80" height="80" />
                <rect x="50" y="70" width="80" height="80" strokeDasharray="3 3" />
                {[...Array(5)].map((_, i) => (
                  <line key={i} x1={60 + i * 20} y1="60" x2={60 + i * 20} y2="140" strokeDasharray="1 3" />
                ))}
                <circle cx="100" cy="100" r="3" fill="currentColor" />
              </svg>
            </div>

            <div className="relative">
              {/* Icon row */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-white/80 border-2 border-black rounded-sm flex items-center justify-center shadow-[1px_1px_0px_#111] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110">
                  <span className={`material-symbols-outlined !text-[18px] md:!text-[20px] ${cat.text}`}>{cat.icon}</span>
                </div>
                <span className={`font-mono text-[8.5px] md:text-[9px] font-black ${cat.text} bg-white/80 border-2 border-black px-1.5 py-0.5 rounded-sm uppercase tracking-[0.1em] shadow-[1px_1px_0px_#111]`}>
                  {cat.tag}
                </span>
              </div>

              {/* Label */}
              <p className={`font-mono font-black text-[12px] md:text-[14px] uppercase tracking-tight ${cat.text} leading-tight mb-0.5`}>
                {cat.name}
              </p>
              <p className={`text-[10px] md:text-[11.5px] ${cat.text} opacity-75 leading-snug`}>{cat.examples}</p>

              {/* Hover arrow */}
              <div className={`mt-2.5 pt-2 border-t border-dashed ${cat.text} opacity-30 group-hover:opacity-70 transition-opacity flex items-center justify-between`}>
                <span className={`font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wide ${cat.text} opacity-80`}>
                  Browse
                </span>
                <span className={`material-symbols-outlined !text-[14px] ${cat.text} opacity-80 group-hover:translate-x-1 transition-transform`}>
                  arrow_forward
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-5 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-gray-500 inline-flex items-center justify-center gap-1.5 w-full">
        <span className="w-1 h-1 rounded-full bg-accent-yellow" />
        Discounts and eligibility set by each provider · Refreshed regularly
        <span className="w-1 h-1 rounded-full bg-accent-yellow" />
      </p>

      <style jsx>{`
        @keyframes saasCatFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes saasCatMandalaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        :global(.saas-cat-fade-in) {
          animation: saasCatFadeIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        :global(.saas-cat-mandala-spin) {
          animation: saasCatMandalaSpin 60s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.saas-cat-fade-in),
          :global(.saas-cat-mandala-spin) { animation: none; }
        }
      `}</style>
    </section>
  )
}
