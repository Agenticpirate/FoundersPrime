interface Deal {
  id: string
  title: string
  provider: string
  category: string
  value: string
  status: string
  description: string
  badges: string[]
  stats: {
    appTime: string
    approval: string
    difficulty: string
    successRate: string
  }
  overview: string
  included: Array<{
    title: string
    description: string
  }>
  eligibility: string[]
  steps: Array<{
    title: string
    description: string
  }>
  proTips: string[]
  faq: Array<{
    question: string
    answer: string
  }>
  similarDeals: Array<{
    title: string
    value: string
    description: string
  }>
  verification: {
    lastVerified: string
    appliedCount: number | null
  }
}

interface SingleDealSidebarProps {
  deal: Deal
}

export default function SingleDealSidebar({ deal }: SingleDealSidebarProps) {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Apply Box */}
      <div className="rounded-sm border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-5">
        <h3 className="font-mono text-xl font-bold uppercase mb-4">Ready to Apply?</h3>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Value</span>
            <span className="font-bold">{deal.value}</span>
          </div>
          <div className="h-px bg-gray-200"></div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Time Required</span>
            <span className="font-bold">{deal.stats.appTime}</span>
          </div>
          <div className="h-px bg-gray-200"></div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Deadline</span>
            <span className="font-bold text-amber-700">Rolling Basis</span>
          </div>
        </div>
        <button className="w-full rounded-sm border-3 border-black bg-primary py-3 font-mono text-base font-bold uppercase tracking-wide text-black shadow-[6px_6px_0px_#111111] hover:bg-primary-dark hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-3 flex items-center justify-center gap-2">
          Apply Now 
          <span className="material-symbols-outlined !text-[20px]">arrow_forward</span>
        </button>
        <div className="flex gap-2">
          <button className="flex-1 rounded-sm border-3 border-black bg-white py-2 font-mono text-sm font-bold uppercase text-black hover:bg-gray-50 hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-1">
            <span className="material-symbols-outlined !text-[18px]">bookmark</span> Save
          </button>
          <button className="flex-1 rounded-sm border-3 border-black bg-white py-2 font-mono text-sm font-bold uppercase text-black hover:bg-gray-50 hover:shadow-[4px_4px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-1">
            <span className="material-symbols-outlined !text-[18px]">ios_share</span> Share
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="rounded-sm border-3 border-black bg-white shadow-[6px_6px_0px_#111111] p-5">
        <h4 className="font-mono text-sm font-bold uppercase mb-3 text-gray-500">Quick Links</h4>
        <ul className="space-y-3">
          <li>
            <a className="flex items-center gap-2 text-sm font-bold hover:text-primary-dark hover:underline" href="#">
              <span className="material-symbols-outlined !text-[18px]">open_in_new</span>
              Official Program Page
            </a>
          </li>
          <li>
            <a className="flex items-center gap-2 text-sm font-bold hover:text-primary-dark hover:underline" href="#">
              <span className="material-symbols-outlined !text-[18px]">library_books</span>
              {deal.provider} Resources
            </a>
          </li>
          <li>
            <a className="flex items-center gap-2 text-sm font-bold hover:text-primary-dark hover:underline" href="#">
              <span className="material-symbols-outlined !text-[18px]">description</span>
              {deal.provider} Documentation
            </a>
          </li>
        </ul>
      </div>

      {/* Promo Ad */}
      <div className="rounded-sm bg-black text-white p-5 shadow-[6px_6px_0px_#111111] text-center">
        <div className="inline-block p-2 rounded-full bg-accent-yellow border-2 border-white mb-3 text-black">
          <span className="material-symbols-outlined block">rocket_launch</span>
        </div>
        <h4 className="font-mono font-bold text-lg mb-2">Need help applying?</h4>
        <p className="text-sm text-gray-300 mb-4">Our concierge team can review your application before you submit.</p>
        <button className="w-full py-2 bg-white text-black font-bold font-mono text-sm uppercase rounded-sm hover:bg-gray-200 shadow-[3px_3px_0px_#888] hover:shadow-[2px_2px_0px_#888] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
          Get Help
        </button>
      </div>
    </div>
  )
}