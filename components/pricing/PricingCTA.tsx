export default function PricingCTA() {
  return (
    <div className="bg-black text-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-12 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono text-4xl font-bold text-primary mb-6">
          Ready to Accelerate Your Startup?
        </h2>
        <p className="font-sans text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed">
          Join 50,000+ founders who use FoundersPrime to discover deals, validate ideas, and build successful startups. Start your free trial today.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="font-mono text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="font-sans text-gray-400">Active Founders</div>
          </div>
          <div>
            <div className="font-mono text-3xl font-bold text-primary mb-2">$2.8B</div>
            <div className="font-sans text-gray-400">Deals Accessed</div>
          </div>
          <div>
            <div className="font-mono text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="font-sans text-gray-400">User Rating</div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4 md:mb-6">
          <button className="px-8 py-4 bg-primary hover:bg-white hover:text-black border-3 border-white text-black font-mono font-bold text-lg rounded-sm shadow-[4px_4px_0px_0px_#888] hover:shadow-[2px_2px_0px_0px_#888] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Start Free Trial
          </button>
          <button className="px-8 py-4 bg-transparent hover:bg-white hover:text-black border-3 border-white text-white font-mono font-bold text-lg rounded-sm transition-all">
            View Demo
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 text-gray-400 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-400">security</span>
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-400">support</span>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-400">verified</span>
            <span>Money-back Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}