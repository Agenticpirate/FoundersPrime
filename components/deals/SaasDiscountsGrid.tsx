import Link from 'next/link'
import Image from 'next/image'

export default function SaasDiscountsGrid() {
  const saasDeals = [
    { name: 'Airtable', value: '1 year free', category: 'Database', initial: 'A' },
    { name: 'Canva Pro', value: '45% discount', category: 'Design', initial: 'C' },
    { name: 'Typeform', value: '50% off', category: 'Forms', initial: 'T' },
    { name: 'Mailchimp', value: '6 months free', category: 'Email', initial: 'M' },
    { name: 'Zoom Pro', value: '1 year free', category: 'Video', initial: 'Z' },
    { name: 'Asana', value: '6 months free', category: 'PM', initial: 'A' },
    { name: 'Intercom', value: '95% discount', category: 'Support', initial: 'I' },
    { name: 'Mixpanel', value: '1 year free', category: 'Analytics', initial: 'M' },
    { name: 'Webflow', value: '1 year free', category: 'Web', initial: 'W' },
    { name: 'Loom', value: '6 months free', category: 'Video', initial: 'L' },
    { name: 'Calendly', value: '1 year free', category: 'Scheduling', initial: 'C' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
        <div className="flex items-center gap-2">
          <h2 className="font-mono text-lg md:text-2xl font-bold text-black">SaaS Discounts</h2>
          <span className="font-mono text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-sm border border-black font-bold">240</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {saasDeals.map((deal, index) => (
          <div key={index} className="bg-white border-2 border-black p-2.5 md:p-3 hover:shadow-[2px_2px_0px_#111] cursor-pointer transition-all group rounded-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0">
                <Image
                  src={`https://www.google.com/s2/favicons?domain=${deal.name.toLowerCase().replace(/\s+/g, '')}.com&sz=64`}
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <h4 className="font-mono font-bold text-xs md:text-sm truncate">{deal.name}</h4>
            </div>
            <p className="font-mono text-[10px] md:text-xs text-green-600 font-bold mb-1">{deal.value}</p>
            <span className="text-[8px] md:text-[9px] font-mono border border-gray-200 px-1 rounded-sm bg-gray-50 text-gray-500">{deal.category}</span>
          </div>
        ))}
        <Link href="/deals" className="bg-white border-2 border-black p-2.5 md:p-3 hover:shadow-[2px_2px_0px_#111] cursor-pointer transition-all flex items-center justify-center rounded-sm">
          <span className="font-mono text-[10px] md:text-xs font-bold text-primary">View All 240 →</span>
        </Link>
      </div>
    </div>
  )
}
