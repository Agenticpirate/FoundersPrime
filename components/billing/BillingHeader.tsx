import { CreditCard, Shield, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function BillingHeader() {
  return (
    <div className="mb-8">
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
        <span className="text-gray-900 font-medium">Billing</span>
      </div>

      {/* Header */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-[#13b6ec] border-3 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold font-mono text-black mb-3">
              BILLING_DASHBOARD
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Manage your subscription, billing information, and payment methods. 
              View your usage and billing history all in one place.
            </p>
          </div>
        </div>

        {/* Current Plan Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border-3 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">Pro+ Plan</span>
            </div>
            <p className="text-sm text-green-700">
              Active subscription with full access
            </p>
          </div>

          <div className="bg-blue-50 border-3 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-blue-800">Next Billing</span>
            </div>
            <p className="text-sm text-blue-700">
              February 15, 2026 - $79.00
            </p>
          </div>

          <div className="bg-purple-50 border-3 border-purple-500 p-4 shadow-[3px_3px_0px_0px_rgba(147,51,234,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-800">Payment Secure</span>
            </div>
            <p className="text-sm text-purple-700">
              Visa ending in 4242
            </p>
          </div>
        </div>

        {/* Account Summary */}
        <div className="mt-6 p-4 bg-gray-50 border-3 border-gray-300 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-black">$948</p>
              <p className="text-sm text-gray-600">Total Saved</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-black">23</p>
              <p className="text-sm text-gray-600">Deals Applied</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-black">156</p>
              <p className="text-sm text-gray-600">Days Active</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-black">$1,264</p>
              <p className="text-sm text-gray-600">Credits Secured</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}