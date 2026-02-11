import Link from 'next/link'

export default function CloudCreditsFeatured() {
  const featuredDeals = [
    {
      id: 'aws-activate',
      title: 'AWS Activate',
      gradient: 'from-orange-400 to-yellow-500',
      icon: 'cloud',
      tags: [
        { label: 'INFRA', color: 'bg-gray-100' },
        { label: 'POPULAR', color: 'bg-green-100 text-green-800 border-green-900' }
      ],
      value: 'Up to $100,000',
      validity: '2 years validity',
      href: '/deals/aws-activate'
    },
    {
      id: 'google-cloud',
      title: 'Google Cloud',
      gradient: 'from-blue-500 to-indigo-600',
      icon: 'terminal',
      tags: [
        { label: 'AI/ML', color: 'bg-gray-100' }
      ],
      value: 'Up to $200,000',
      validity: '2 years validity',
      href: '/deals/google-cloud'
    },
    {
      id: 'microsoft-azure',
      title: 'MS Startups',
      gradient: 'from-cyan-600 to-blue-700',
      icon: 'window',
      tags: [
        { label: 'ENTERPRISE', color: 'bg-gray-100' }
      ],
      value: 'Up to $150,000',
      validity: 'Duration varies',
      href: '/deals/microsoft-azure'
    },
    {
      id: 'digitalocean',
      title: 'DigitalOcean',
      gradient: 'from-blue-400 to-blue-500',
      icon: 'waves',
      tags: [
        { label: 'SMB', color: 'bg-gray-100' }
      ],
      value: '$10,000 credit',
      validity: '12 months',
      href: '/deals/digitalocean'
    }
  ]

  return (
    <div className="mb-20">
      <div className="flex items-center justify-between mb-8 border-b-3 border-black pb-4">
        <h2 className="font-mono text-3xl font-bold text-black flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl">star</span>
          Featured Programs
        </h2>
        <span className="hidden md:inline-block font-mono text-sm font-bold bg-gray-200 px-3 py-1 rounded-sm border-2 border-black">
          TOP TIER
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
                  <span className="material-symbols-outlined text-black text-lg">monetization_on</span>
                  <span className="font-mono text-sm font-bold">{deal.value}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-black text-lg">schedule</span>
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