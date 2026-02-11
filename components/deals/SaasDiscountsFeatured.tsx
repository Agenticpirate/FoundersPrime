import Link from 'next/link'

export default function SaasDiscountsFeatured() {
  const featuredDeals = [
    {
      id: 'notion-startup',
      title: 'Notion for Startups',
      gradient: 'from-gray-800 to-black',
      icon: 'description',
      tags: [
        { label: 'PRODUCTIVITY', color: 'bg-gray-100' },
        { label: 'POPULAR', color: 'bg-green-100 text-green-800 border-green-900' }
      ],
      value: '6 months free',
      validity: 'Plus plan included',
      href: '/deals/notion-startup'
    },
    {
      id: 'figma-startup',
      title: 'Figma for Startups',
      gradient: 'from-purple-500 to-pink-600',
      icon: 'design_services',
      tags: [
        { label: 'DESIGN', color: 'bg-gray-100' }
      ],
      value: '1 year free',
      validity: 'Professional plan',
      href: '/deals/figma-startup'
    },
    {
      id: 'slack-startup',
      title: 'Slack for Startups',
      gradient: 'from-green-500 to-teal-600',
      icon: 'chat',
      tags: [
        { label: 'COMMUNICATION', color: 'bg-gray-100' }
      ],
      value: '85% discount',
      validity: 'Pro plan for 1 year',
      href: '/deals/slack-startup'
    },
    {
      id: 'hubspot-startup',
      title: 'HubSpot for Startups',
      gradient: 'from-orange-500 to-red-600',
      icon: 'campaign',
      tags: [
        { label: 'CRM', color: 'bg-gray-100' }
      ],
      value: '90% discount',
      validity: 'Up to $25,000 value',
      href: '/deals/hubspot-startup'
    }
  ]

  return (
    <div className="mb-20">
      <div className="flex items-center justify-between mb-8 border-b-3 border-black pb-4">
        <h2 className="font-mono text-3xl font-bold text-black flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl">star</span>
          Featured SaaS Deals
        </h2>
        <span className="hidden md:inline-block font-mono text-sm font-bold bg-gray-200 px-3 py-1 rounded-sm border-2 border-black">
          MOST POPULAR
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredDeals.map((deal) => (
          <div key={deal.id} className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm flex flex-col group hover:translate-y-[-4px] transition-transform">
            <div className={`h-32 bg-gradient-to-br ${deal.gradient} border-b-3 border-black relative overflow-hidden flex items-center justify-center p-6`}>
              <span className="material-symbols-outlined text-6xl text-white opacity-25 absolute rotate-12 -right-4 -bottom-4">
                {deal.icon}
              </span>
              <h3 className="font-mono text-2xl font-bold text-white relative z-10 text-center drop-shadow-md">
                {deal.title}
              </h3>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex gap-2 mb-4">
                {deal.tags.map((tag, index) => (
                  <span key={index} className={`border-2 border-black px-2 py-1 font-mono text-xs font-bold uppercase tracking-wide rounded-sm ${tag.color}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-black text-lg">local_offer</span>
                  <span className="font-mono text-sm font-bold">{deal.value}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-black text-lg">info</span>
                  <span className="font-mono text-sm text-gray-600">{deal.validity}</span>
                </div>
              </div>
              
              <Link className="w-full" href={deal.href}>
                <button className="w-full py-2 text-sm flex items-center justify-center gap-2 bg-primary text-black border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] font-mono font-bold rounded-sm hover:shadow-[2px_2px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group-hover:bg-black group-hover:text-white group-hover:border-black">
                  View Deal <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}