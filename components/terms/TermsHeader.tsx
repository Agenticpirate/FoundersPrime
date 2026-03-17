export default function TermsHeader() {
  return (
    <div className="mb-4 md:mb-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-mono mb-6">
        <a href="/" className="text-gray-500 hover:text-black transition-colors">
          Home
        </a>
        <span className="text-gray-400">/</span>
        <span className="text-black font-bold">Terms of Service</span>
      </nav>
      
      {/* Page Header */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_#1a1a1a] rounded-sm p-8 mb-4 md:mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="font-mono text-4xl font-bold text-black mb-4">
              Terms of Service
            </h1>
            <p className="font-sans text-lg text-gray-700 mb-6 leading-relaxed">
              These terms govern your use of FoundersPrime and outline the rights and responsibilities of both parties. Please read them carefully.
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
              <span className="material-symbols-outlined text-3xl text-black">gavel</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Points Summary */}
      <div className="bg-primary/10 border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="font-mono text-xl font-bold text-black mb-4">
          Key Terms Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600 mt-1">account_circle</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-black mb-1">User Responsibilities</h3>
              <p className="font-sans text-sm text-gray-700">Use our service responsibly and follow community guidelines.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600 mt-1">payment</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-black mb-1">Billing & Payments</h3>
              <p className="font-sans text-sm text-gray-700">Clear terms for subscriptions, refunds, and billing cycles.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-600 mt-1">copyright</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-black mb-1">Intellectual Property</h3>
              <p className="font-sans text-sm text-gray-700">Respect for content ownership and usage rights.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}