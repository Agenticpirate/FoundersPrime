import Mandala from '@/components/ui/Mandala'

export default function PrivacyHeader() {
  return (
    <div className="mb-4 md:mb-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs md:text-sm font-mono mb-4 md:mb-6">
        <a href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          Home
        </a>
        <span className="text-gray-400 dark:text-neutral-600">/</span>
        <span className="text-gray-900 dark:text-white font-bold">Privacy Policy</span>
      </nav>

      {/* Page Header */}
      <div className="relative overflow-hidden bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-5 md:p-8 mb-4 md:mb-6">
        {/* Decorative spinning mandala */}
        <Mandala
          variant="orbital"
          colorClass="text-gray-900 dark:text-white"
          opacity={0.06}
          speed={90}
          direction="ccw"
          className="absolute -top-10 -right-10 w-36 h-36 md:w-48 md:h-48"
        />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="size-11 md:size-20 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-xl md:text-3xl text-primary">shield</span>
              </div>
              <h1 className="font-mono text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Privacy Policy
              </h1>
            </div>
            <p className="font-sans text-sm md:text-lg text-gray-700 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed">
              We take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use FoundersPrime.
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

      {/* Quick Summary */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-5 md:p-6">
        <h2 className="font-mono text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">
          Privacy at a Glance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-500 mt-0.5 md:mt-1">check_circle</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white mb-1">We Don&apos;t Sell Your Data</h3>
              <p className="font-sans text-sm text-gray-700 dark:text-gray-400">Your personal information is never sold to third parties.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-500 mt-0.5 md:mt-1">lock</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white mb-1">Secure by Design</h3>
              <p className="font-sans text-sm text-gray-700 dark:text-gray-400">Industry-standard encryption and security measures.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-500 mt-0.5 md:mt-1">person</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-gray-900 dark:text-white mb-1">You&apos;re in Control</h3>
              <p className="font-sans text-sm text-gray-700 dark:text-gray-400">Access, modify, or delete your data anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
