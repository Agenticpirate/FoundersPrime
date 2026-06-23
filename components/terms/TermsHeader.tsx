import Mandala from '@/components/ui/Mandala'

export default function TermsHeader() {
  return (
    <div className="mb-4 md:mb-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs md:text-sm font-mono mb-4 md:mb-6">
        <a href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          Home
        </a>
        <span className="text-gray-400 dark:text-neutral-600">/</span>
        <span className="text-gray-900 dark:text-white font-bold">Terms of Service</span>
      </nav>

      {/* Page Header */}
      <div className="relative overflow-hidden bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-5 md:p-8 mb-4 md:mb-6">
        {/* Decorative spinning mandala */}
        <Mandala
          variant="rings"
          colorClass="text-gray-900 dark:text-white"
          opacity={0.06}
          speed={90}
          className="absolute -top-10 -right-10 w-36 h-36 md:w-48 md:h-48"
        />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="size-11 md:size-20 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-xl md:text-3xl text-primary">gavel</span>
              </div>
              <h1 className="font-mono text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Terms of Service
              </h1>
            </div>
            <p className="font-sans text-sm md:text-lg text-gray-700 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed">
              These terms govern your use of FoundersPrime and outline the rights and responsibilities of both parties. Please read them carefully.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined !text-[16px] md:!text-base text-primary">schedule</span>
                <span className="font-mono text-gray-600 dark:text-gray-400">Last updated: June 21, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined !text-[16px] md:!text-base text-primary">gavel</span>
                <span className="font-mono text-gray-600 dark:text-gray-400">Effective: June 21, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Points Summary */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-5 md:p-6">
        <h2 className="font-mono text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">
          Key Terms Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-500 mt-0.5 md:mt-1">account_circle</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white mb-1">User Responsibilities</h3>
              <p className="font-sans text-sm text-gray-700 dark:text-gray-400">Use our service responsibly and follow community guidelines.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-500 mt-0.5 md:mt-1">payment</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white mb-1">Billing & Payments</h3>
              <p className="font-sans text-sm text-gray-700 dark:text-gray-400">Clear terms for subscriptions, refunds, and billing cycles.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-500 mt-0.5 md:mt-1">verified</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white mb-1">Deals & Eligibility</h3>
              <p className="font-sans text-sm text-gray-700 dark:text-gray-400">We curate and list third-party deals. We don't guarantee their availability, eligibility, or terms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
