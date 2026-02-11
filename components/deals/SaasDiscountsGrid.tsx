export default function SaasDiscountsGrid() {
  const saasDeals = [
    { name: 'Airtable', value: '1 year free', category: 'Database', initial: 'A' },
    { name: 'Canva Pro', value: '45% discount', category: 'Design', initial: 'C' },
    { name: 'Typeform', value: '50% off', category: 'Forms', initial: 'T' },
    { name: 'Mailchimp', value: '6 months free', category: 'Email', initial: 'M' },
    { name: 'Zoom Pro', value: '1 year free', category: 'Video', initial: 'Z' },
    { name: 'Asana', value: '6 months free', category: 'Project Mgmt', initial: 'A' },
    { name: 'Intercom', value: '95% discount', category: 'Support', initial: 'I' },
    { name: 'Mixpanel', value: '1 year free', category: 'Analytics', initial: 'M' },
    { name: 'Webflow', value: '1 year free', category: 'Web Design', initial: 'W' },
    { name: 'Loom', value: '6 months free', category: 'Video', initial: 'L' },
    { name: 'Calendly', value: '1 year free', category: 'Scheduling', initial: 'C' }
  ]

  return (
    <div>
      <div className="flex items-center gap-4 mb-8 border-b-3 border-black pb-4">
        <h2 className="font-mono text-3xl font-bold text-black">All SaaS Discounts</h2>
        <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded-sm border border-black font-bold">240</span>
        <div className="ml-auto hidden md:flex gap-2">
          <button className="px-3 py-1 font-mono text-xs border-2 border-black bg-black text-white rounded-sm">
            Grid
          </button>
          <button className="px-3 py-1 font-mono text-xs border-2 border-black bg-white text-black rounded-sm hover:bg-gray-100">
            List
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {saasDeals.map((deal, index) => (
          <div key={index} className="bg-white border-2 border-black p-4 hover:shadow-[3px_3px_0px_0px_#1a1a1a] hover:border-primary cursor-pointer transition-all group rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 bg-gray-100 border border-gray-300 rounded-sm flex items-center justify-center">
                <span className="font-bold text-gray-400">{deal.initial}</span>
              </div>
              <span className="material-symbols-outlined text-gray-300 group-hover:text-primary">arrow_outward</span>
            </div>
            <h4 className="font-mono font-bold text-lg mb-1">{deal.name}</h4>
            <p className="font-mono text-xs text-gray-500 mb-3">{deal.value}</p>
            <div className="flex gap-2">
              <span className="text-[10px] font-mono border border-gray-300 px-1 rounded-sm bg-gray-50">
                {deal.category}
              </span>
            </div>
          </div>
        ))}
        
        {/* View All Card */}
        <div className="bg-white border-2 border-black p-4 hover:shadow-[3px_3px_0px_0px_#1a1a1a] hover:border-primary cursor-pointer transition-all group flex items-center justify-center rounded-sm">
          <span className="font-mono text-sm font-bold text-primary underline underline-offset-4">
            View All 240 Deals →
          </span>
        </div>
      </div>
    </div>
  )
}