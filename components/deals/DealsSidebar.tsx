export default function DealsSidebar() {
  return (
    <div className="lg:col-span-3 flex flex-col gap-6 sticky top-24">
      {/* Quick Stats Widget */}
      <div className="bg-white border-3 border-ink p-0">
        <div className="bg-ink p-3 text-white border-b-3 border-ink">
          <h4 className="font-bold font-display uppercase tracking-widest text-sm">Quick Insights</h4>
        </div>
        <div className="divide-y-2 divide-ink">
          <div className="p-4 group cursor-pointer hover:bg-primary/5">
            <p className="text-xs text-gray-500 font-mono uppercase mb-1">Most Saved</p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">savings</span>
              <span className="font-bold text-sm">AWS Activate</span>
            </div>
          </div>
          <div className="p-4 group cursor-pointer hover:bg-primary/5">
            <p className="text-xs text-gray-500 font-mono uppercase mb-1">Highest Value</p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-accent-yellow">diamond</span>
              <span className="font-bold text-sm">Microsoft for Startups</span>
            </div>
          </div>
          <div className="p-4 group cursor-pointer hover:bg-primary/5">
            <p className="text-xs text-gray-500 font-mono uppercase mb-1">Easiest Application</p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-500">check_circle</span>
              <span className="font-bold text-sm">Notion for Startups</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white border-3 border-ink p-0 shadow-hard-sm">
        <div className="p-3 border-b-3 border-ink bg-gray-50">
          <h4 className="font-bold font-display uppercase tracking-widest text-sm">Popular Categories</h4>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <a className="flex justify-between items-center group" href="/deals/cloud-credits">
            <span className="text-sm font-medium group-hover:underline decoration-2 underline-offset-2">1. Cloud Credits</span>
            <span className="bg-ink text-white text-xs px-2 py-0.5 font-mono rounded-sm">67</span>
          </a>
          <a className="flex justify-between items-center group" href="#">
            <span className="text-sm font-medium group-hover:underline decoration-2 underline-offset-2">2. SaaS Discounts</span>
            <span className="bg-ink text-white text-xs px-2 py-0.5 font-mono rounded-sm">203</span>
          </a>
          <a className="flex justify-between items-center group" href="#">
            <span className="text-sm font-medium group-hover:underline decoration-2 underline-offset-2">3. Grants</span>
            <span className="bg-ink text-white text-xs px-2 py-0.5 font-mono rounded-sm">89</span>
          </a>
          <a className="flex justify-between items-center group" href="#">
            <span className="text-sm font-medium group-hover:underline decoration-2 underline-offset-2">4. Accelerators</span>
            <span className="bg-ink text-white text-xs px-2 py-0.5 font-mono rounded-sm">94</span>
          </a>
          <a className="flex justify-between items-center group" href="#">
            <span className="text-sm font-medium group-hover:underline decoration-2 underline-offset-2">5. Incubators</span>
            <span className="bg-ink text-white text-xs px-2 py-0.5 font-mono rounded-sm">62</span>
          </a>
        </div>
        <div className="p-3 border-t-2 border-dashed border-gray-300">
          <a className="text-xs font-bold text-primary uppercase hover:text-ink flex items-center gap-1" href="#">
            View all categories <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Expiring Soon Widget */}
      <div className="bg-white border-3 border-accent-red p-0 shadow-hard-sm">
        <div className="p-3 border-b-3 border-accent-red bg-red-50 flex items-center gap-2 text-accent-red">
          <span className="material-symbols-outlined text-sm">timer</span>
          <h4 className="font-bold font-display uppercase tracking-widest text-sm">Expiring Soon</h4>
        </div>
        <div className="divide-y-2 divide-red-100">
          <div className="p-3 hover:bg-red-50 transition-colors cursor-pointer">
            <div className="flex justify-between mb-1">
              <span className="font-bold text-sm">Y Combinator S25</span>
              <span className="text-xs text-accent-red font-mono font-bold">2 days</span>
            </div>
            <p className="text-xs text-gray-500 truncate">Early deadline for summer batch</p>
          </div>
          <div className="p-3 hover:bg-red-50 transition-colors cursor-pointer">
            <div className="flex justify-between mb-1">
              <span className="font-bold text-sm">TechStars London</span>
              <span className="text-xs text-accent-red font-mono font-bold">5 days</span>
            </div>
            <p className="text-xs text-gray-500 truncate">Application closing soon</p>
          </div>
          <div className="p-3 hover:bg-red-50 transition-colors cursor-pointer">
            <div className="flex justify-between mb-1">
              <span className="font-bold text-sm">Sequoia Arc</span>
              <span className="text-xs text-accent-red font-mono font-bold">1 week</span>
            </div>
            <p className="text-xs text-gray-500 truncate">US & Europe founders</p>
          </div>
        </div>
      </div>

      {/* Ad/CTA Spot */}
      <div className="bg-primary border-3 border-ink p-6 text-center shadow-hard-sm">
        <h5 className="font-bold text-xl mb-2 font-display">Are you an Investor?</h5>
        <p className="text-sm mb-4 font-medium">Get exclusive access to verified deal flow.</p>
        <button className="bg-white text-ink border-2 border-ink w-full py-2 font-bold text-sm hover:shadow-hard-hover transition-all">
          Partner With Us
        </button>
      </div>
    </div>
  )
}