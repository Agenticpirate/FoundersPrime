import Link from 'next/link'

export default function GrantsFeatured() {
  const featuredGrants = [
    {
      id: 'sbir-phase-1',
      title: 'SBIR Phase I',
      gradient: 'from-blue-600 to-blue-800',
      icon: 'flag',
      tags: [
        { label: 'GOVERNMENT', color: 'bg-blue-100 text-blue-800 border-blue-900' },
        { label: 'POPULAR', color: 'bg-green-100 text-green-800 border-green-900' }
      ],
      value: 'Up to $275,000',
      validity: 'R&D focused',
      href: '/deals/sbir-phase-1'
    },
    {
      id: 'nist-mep',
      title: 'NIST MEP',
      gradient: 'from-indigo-600 to-purple-700',
      icon: 'precision_manufacturing',
      tags: [
        { label: 'MANUFACTURING', color: 'bg-gray-100' }
      ],
      value: 'Up to $150,000',
      validity: 'Manufacturing focus',
      href: '/deals/nist-mep'
    },
    {
      id: 'nsf-i-corps',
      title: 'NSF I-Corps',
      gradient: 'from-green-600 to-teal-700',
      icon: 'school',
      tags: [
        { label: 'RESEARCH', color: 'bg-gray-100' }
      ],
      value: '$50,000',
      validity: 'Customer discovery',
      href: '/deals/nsf-i-corps'
    },
    {
      id: 'epa-sbir',
      title: 'EPA SBIR',
      gradient: 'from-emerald-600 to-green-700',
      icon: 'eco',
      tags: [
        { label: 'CLEANTECH', color: 'bg-gray-100' }
      ],
      value: 'Up to $100,000',
      validity: 'Environmental tech',
      href: '/deals/epa-sbir'
    }
  ]

  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-center justify-between mb-4 md:mb-6 border-b-3 border-black pb-4">
        <h2 className="font-mono text-xl md:text-3xl font-bold text-black flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl">star</span>
          Featured Grant Programs
        </h2>
        <span className="hidden md:inline-block font-mono text-sm font-bold bg-gray-200 px-3 py-1 rounded-sm border-2 border-black">
          HIGH SUCCESS RATE
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredGrants.map((grant) => (
          <div key={grant.id} className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm flex flex-col group hover:translate-y-[-4px] transition-transform">
            <div className={`h-32 bg-gradient-to-br ${grant.gradient} border-b-3 border-black relative overflow-hidden flex items-center justify-center p-6`}>
              <span className="material-symbols-outlined text-6xl text-white opacity-25 absolute rotate-12 -right-4 -bottom-4">
                {grant.icon}
              </span>
              <h3 className="font-mono text-2xl font-bold text-white relative z-10 text-center drop-shadow-md">
                {grant.title}
              </h3>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex gap-2 mb-4 flex-wrap">
                {grant.tags.map((tag, index) => (
                  <span key={index} className={`border-2 border-black px-2 py-1 font-mono text-xs font-bold uppercase tracking-wide rounded-sm ${tag.color}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-black text-lg">monetization_on</span>
                  <span className="font-mono text-sm font-bold">{grant.value}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-black text-lg">info</span>
                  <span className="font-mono text-sm text-gray-600">{grant.validity}</span>
                </div>
              </div>
              
              <Link className="w-full" href={grant.href}>
                <button className="w-full py-2 text-sm flex items-center justify-center gap-2 bg-primary text-black border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] font-mono font-bold rounded-sm hover:shadow-[2px_2px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group-hover:bg-black group-hover:text-white group-hover:border-black">
                  View Grant <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}