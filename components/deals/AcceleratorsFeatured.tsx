import Link from 'next/link'

export default function AcceleratorsFeatured() {
  const featuredAccelerators = [
    {
      id: 'y-combinator',
      title: 'Y Combinator',
      gradient: 'from-orange-500 to-red-600',
      icon: 'rocket_launch',
      tags: [
        { label: 'TIER 1', color: 'bg-orange-100 text-orange-800 border-orange-900' },
        { label: 'POPULAR', color: 'bg-green-100 text-green-800 border-green-900' }
      ],
      value: '$500K investment',
      validity: '3-month program',
      href: '/deals/y-combinator'
    },
    {
      id: 'techstars',
      title: 'Techstars',
      gradient: 'from-blue-600 to-indigo-700',
      icon: 'stars',
      tags: [
        { label: 'TIER 1', color: 'bg-blue-100 text-blue-800 border-blue-900' }
      ],
      value: '$120K investment',
      validity: '3-month program',
      href: '/deals/techstars'
    },
    {
      id: 'plug-and-play',
      title: 'Plug and Play',
      gradient: 'from-purple-600 to-pink-700',
      icon: 'hub',
      tags: [
        { label: 'CORPORATE', color: 'bg-gray-100' }
      ],
      value: 'Up to $250K',
      validity: 'Industry focused',
      href: '/deals/plug-and-play'
    },
    {
      id: 'antler',
      title: 'Antler',
      gradient: 'from-green-600 to-teal-700',
      icon: 'nature',
      tags: [
        { label: 'GLOBAL', color: 'bg-gray-100' }
      ],
      value: '$250K investment',
      validity: 'Pre-seed focus',
      href: '/deals/antler'
    }
  ]

  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-center justify-between mb-4 md:mb-6 border-b-3 border-black pb-4">
        <h2 className="font-mono text-xl md:text-3xl font-bold text-black flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl">star</span>
          Top Tier Accelerators
        </h2>
        <span className="hidden md:inline-block font-mono text-sm font-bold bg-gray-200 px-3 py-1 rounded-sm border-2 border-black">
          MOST COMPETITIVE
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredAccelerators.map((accelerator) => (
          <div key={accelerator.id} className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm flex flex-col group hover:translate-y-[-4px] transition-transform">
            <div className={`h-32 bg-gradient-to-br ${accelerator.gradient} border-b-3 border-black relative overflow-hidden flex items-center justify-center p-6`}>
              <span className="material-symbols-outlined text-6xl text-white opacity-25 absolute rotate-12 -right-4 -bottom-4">
                {accelerator.icon}
              </span>
              <h3 className="font-mono text-2xl font-bold text-white relative z-10 text-center drop-shadow-md">
                {accelerator.title}
              </h3>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex gap-2 mb-4 flex-wrap">
                {accelerator.tags.map((tag, index) => (
                  <span key={index} className={`border-2 border-black px-2 py-1 font-mono text-xs font-bold uppercase tracking-wide rounded-sm ${tag.color}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-black text-lg">monetization_on</span>
                  <span className="font-mono text-sm font-bold">{accelerator.value}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-black text-lg">schedule</span>
                  <span className="font-mono text-sm text-gray-600">{accelerator.validity}</span>
                </div>
              </div>
              
              <Link className="w-full" href={accelerator.href}>
                <button className="w-full py-2 text-sm flex items-center justify-center gap-2 bg-primary text-black border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] font-mono font-bold rounded-sm hover:shadow-[2px_2px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group-hover:bg-black group-hover:text-white group-hover:border-black">
                  View Program <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}