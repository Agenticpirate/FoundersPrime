export default function PrivacyHeader() {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-mono mb-6">
        <a href="/" className="text-gray-500 hover:text-black transition-colors">
          Home
        </a>
        <span className="text-gray-400">/</span>
        <span className="text-black font-bold">Privacy Policy</span>
      </nav>
      
      {/* Page Header */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="font-mono text-4xl font-bold text-black mb-4">
              Privacy Policy
            </h1>
            <p className="font-sans text-lg text-gray-700 mb-6 leading-relaxed">
              We take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use FoundersPrime.
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <span className="font-mono text-gray-600">Last updated: January 8, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">gavel</span>
                <span className="font-mono text-gray-600">Effective: January 1, 2024</span>
              </div>
            </div>
          </div>
          
          <div className="ml-8">
            <div className="size-20 bg-primary border-2 border-black rounded-sm flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-black">shield</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Summary */}
      <div className="bg-primary/10 border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="font-mono text-xl font-bold text-black mb-4">
          Privacy at a Glance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-600 mt-1">check_circle</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-black mb-1">We Don't Sell Your Data</h3>
              <p className="font-sans text-sm text-gray-700">Your personal information is never sold to third parties.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-600 mt-1">lock</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-black mb-1">Secure by Design</h3>
              <p className="font-sans text-sm text-gray-700">Industry-standard encryption and security measures.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-600 mt-1">person</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-black mb-1">You're in Control</h3>
              <p className="font-sans text-sm text-gray-700">Access, modify, or delete your data anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}