import { CheckCircle, Crown, Calendar, CreditCard, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function SuccessHeader() {
  return (
    <div className="mb-4 md:mb-6">
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
        <span className="text-gray-900 font-medium">Upgrade Success</span>
      </div>

      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mb-4 md:mb-6 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4">
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Sparkles className="w-6 h-6 text-blue-500" />
        </div>
        <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
          <Sparkles className="w-4 h-4 text-green-500" />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-4 md:mb-6">
            <div className="bg-green-500 border-3 border-black p-4 w-fit mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold font-mono text-black mb-4">
              UPGRADE_SUCCESS!
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              🎉 Congratulations! Your subscription has been successfully upgraded to Pro+. 
              You now have access to all premium features and unlimited deals.
            </p>
          </div>

          {/* Upgrade Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border-3 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-800">New Plan</span>
              </div>
              <p className="text-sm text-green-700">
                Pro+ Annual - $790.00/year
              </p>
            </div>

            <div className="bg-white border-3 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-800">Next Billing</span>
              </div>
              <p className="text-sm text-blue-700">
                January 9, 2027
              </p>
            </div>

            <div className="bg-white border-3 border-purple-500 p-4 shadow-[3px_3px_0px_0px_rgba(147,51,234,1)]">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-800">Amount Charged</span>
              </div>
              <p className="text-sm text-purple-700">
                $737.33 (prorated)
              </p>
            </div>
          </div>

          {/* Savings Highlight */}
          <div className="mt-6 p-4 bg-yellow-400 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center">
              <p className="font-bold text-black text-lg">
                🎯 You're saving $158.00 per year with annual billing!
              </p>
              <p className="text-sm text-gray-800">
                That's like getting 2 months free compared to monthly billing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}