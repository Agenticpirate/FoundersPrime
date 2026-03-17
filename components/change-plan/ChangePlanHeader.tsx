import { TrendingUp, Shield, Calendar, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ChangePlanHeader() {
  return (
    <div className="mb-4 md:mb-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/billing"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#13b6ec] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Billing
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-[#13b6ec] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/dashboard" className="hover:text-[#13b6ec] transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/billing" className="hover:text-[#13b6ec] transition-colors">
          Billing
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Change Plan</span>
      </div>

      {/* Header */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mb-4 md:mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-[#13b6ec] border-3 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold font-mono text-black mb-3">
              CHANGE_PLAN
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Upgrade, downgrade, or switch billing cycles for your FoundersPrime subscription. 
              Changes take effect immediately with prorated billing.
            </p>
          </div>
        </div>

        {/* Current Plan Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border-3 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">Current Plan</span>
            </div>
            <p className="text-sm text-green-700">
              Pro+ Monthly - $79.00/month
            </p>
          </div>

          <div className="bg-blue-50 border-3 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">Next Billing</span>
            </div>
            <p className="text-sm text-blue-700">
              February 15, 2026
            </p>
          </div>

          <div className="bg-purple-50 border-3 border-purple-500 p-4 shadow-[3px_3px_0px_0px_rgba(147,51,234,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-800">Prorated Billing</span>
            </div>
            <p className="text-sm text-purple-700">
              Instant changes, fair pricing
            </p>
          </div>
        </div>

        {/* Plan Change Notice */}
        <div className="mt-6 p-4 bg-yellow-50 border-3 border-yellow-500 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
          <div className="flex items-start gap-3">
            <div className="bg-yellow-500 border-2 border-black p-1 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <p className="font-bold text-yellow-800 mb-1">Plan Change Information</p>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Upgrades take effect immediately with prorated billing</li>
                <li>• Downgrades take effect at the end of your current billing period</li>
                <li>• Annual plans offer significant savings (up to 20% off)</li>
                <li>• You can cancel or change plans anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}