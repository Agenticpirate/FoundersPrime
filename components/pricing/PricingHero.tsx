export default function PricingHero() {
  return (
    <div className="text-center mb-16">
      <div className="inline-block border-2 border-black bg-accent-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide rounded-sm mb-6">
        SIMPLE PRICING
      </div>
      <h1 className="font-mono text-5xl md:text-6xl font-bold tracking-tight text-black mb-6 leading-[1.1]">
        Choose Your Plan
      </h1>
      <p className="font-sans text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
        Start free and upgrade as you grow. All plans include access to our core database of deals, startups, and ideas. Premium features unlock advanced insights and exclusive content.
      </p>
      
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="font-mono text-sm font-bold">Monthly</span>
        <div className="relative">
          <input type="checkbox" id="billing-toggle" className="sr-only" />
          <label htmlFor="billing-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <div className="block bg-gray-300 w-14 h-8 rounded-full border-2 border-black"></div>
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition border-2 border-black"></div>
            </div>
          </label>
        </div>
        <span className="font-mono text-sm font-bold">
          Annual 
          <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-sm border border-green-900 ml-2">
            Save 20%
          </span>
        </span>
      </div>
      
      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-8 text-gray-500 font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-green-600">check_circle</span>
          <span>14-day free trial</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-green-600">check_circle</span>
          <span>Cancel anytime</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-green-600">check_circle</span>
          <span>No setup fees</span>
        </div>
      </div>
    </div>
  )
}