export default function AboutCTA() {
  return (
    <div className="mb-20">
      {/* Main CTA Section */}
      <div className="bg-primary border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-12 text-center mb-12">
        <h2 className="font-mono text-4xl font-bold text-black mb-6">
          Ready to Join 50,000+ Founders?
        </h2>
        <p className="font-sans text-lg text-gray-800 mb-8 max-w-3xl mx-auto">
          Stop wasting time searching for deals and resources. Join FoundersPrime today and get instant access to $500K+ in startup credits, exclusive deals, and a community of ambitious founders.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-mono font-bold rounded-sm transition-all border-2 border-black">
            Start Free Trial
          </button>
          <button className="px-8 py-4 bg-white hover:bg-gray-100 text-black font-mono font-bold rounded-sm transition-all border-2 border-black">
            View Pricing
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600">check_circle</span>
            <span className="font-sans">Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600">check_circle</span>
            <span className="font-sans">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600">check_circle</span>
            <span className="font-sans">Cancel anytime</span>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Get in Touch */}
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
          <h3 className="font-mono text-2xl font-bold text-black mb-6">
            Get in Touch
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">email</span>
              <div>
                <p className="font-mono text-sm font-bold text-black">General Inquiries</p>
                <p className="font-sans text-sm text-gray-600">support@foundersprime.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">support_agent</span>
              <div>
                <p className="font-mono text-sm font-bold text-black">Support</p>
                <p className="font-sans text-sm text-gray-600">support@foundersprime.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">business</span>
              <div>
                <p className="font-mono text-sm font-bold text-black">Partnerships</p>
                <p className="font-sans text-sm text-gray-600">support@foundersprime.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">newspaper</span>
              <div>
                <p className="font-mono text-sm font-bold text-black">Press</p>
                <p className="font-sans text-sm text-gray-600">support@foundersprime.com</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Follow Us */}
        <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8">
          <h3 className="font-mono text-2xl font-bold text-black mb-6">
            Follow Our Journey
          </h3>
          <p className="font-sans text-sm text-gray-600 mb-6">
            Stay updated with the latest deals, startup insights, and community highlights.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <a 
              href="#" 
              className="flex items-center gap-3 p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors"
            >
              <span className="material-symbols-outlined text-primary">alternate_email</span>
              <div>
                <p className="font-mono text-xs font-bold text-black">Twitter</p>
                <p className="font-sans text-xs text-gray-600">@foundersprime</p>
              </div>
            </a>
            
            <a 
              href="#" 
              className="flex items-center gap-3 p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors"
            >
              <span className="material-symbols-outlined text-primary">work</span>
              <div>
                <p className="font-mono text-xs font-bold text-black">LinkedIn</p>
                <p className="font-sans text-xs text-gray-600">Company Page</p>
              </div>
            </a>
            
            <a 
              href="#" 
              className="flex items-center gap-3 p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors"
            >
              <span className="material-symbols-outlined text-primary">code</span>
              <div>
                <p className="font-mono text-xs font-bold text-black">GitHub</p>
                <p className="font-sans text-xs text-gray-600">Open Source</p>
              </div>
            </a>
            
            <a 
              href="#" 
              className="flex items-center gap-3 p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors"
            >
              <span className="material-symbols-outlined text-primary">forum</span>
              <div>
                <p className="font-mono text-xs font-bold text-black">Discord</p>
                <p className="font-sans text-xs text-gray-600">Community</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}