import { Calculator, Shield, HelpCircle, FileText, Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function ChangePlanSidebar() {
  return (
    <div className="space-y-6">
      {/* Current Plan Summary */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          CURRENT_PLAN
        </h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-3 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="text-center">
              <p className="text-xl font-bold text-green-800">Pro+</p>
              <p className="text-sm text-green-600">Monthly</p>
              <p className="text-2xl font-bold text-green-800 mt-2">$79.00</p>
              <p className="text-xs text-green-600">per month</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Started:</span>
              <span className="font-bold">Aug 15, 2025</span>
            </div>
            <div className="flex justify-between">
              <span>Next billing:</span>
              <span className="font-bold">Feb 15, 2026</span>
            </div>
            <div className="flex justify-between">
              <span>Days remaining:</span>
              <span className="font-bold text-blue-600">21 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Calculator */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          SAVINGS_CALCULATOR
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Plan
            </label>
            <select className="w-full p-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
              <option>Pro+ Annual - $790</option>
              <option>Pro Annual - $290</option>
              <option>Pro+ Monthly - $79</option>
              <option>Pro Monthly - $29</option>
            </select>
          </div>
          
          <div className="bg-green-50 border-3 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-800">$158</p>
              <p className="text-sm text-green-600">Annual Savings</p>
            </div>
            <div className="mt-3 space-y-1 text-xs text-green-700">
              <div className="flex justify-between">
                <span>Monthly cost:</span>
                <span>$65.83</span>
              </div>
              <div className="flex justify-between">
                <span>You save:</span>
                <span className="font-bold">20%</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Calculate Savings
          </button>
        </div>
      </div>

      {/* Billing Information */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          BILLING_INFO
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Visa ending in 4242</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Auto-renewal enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">Prorated billing</span>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <p className="text-xs text-blue-700">
              <span className="font-bold">Secure Payment:</span> All transactions are encrypted and processed securely through Stripe.
            </p>
          </div>
        </div>
      </div>

      {/* Plan Features Comparison */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">FEATURE_COMPARISON</h3>
        <div className="space-y-3">
          <div className="text-sm">
            <div className="font-bold mb-2">Free Plan</div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 5 deals/month</li>
              <li>• Basic database</li>
              <li>• Community access</li>
            </ul>
          </div>
          
          <div className="text-sm">
            <div className="font-bold mb-2">Pro Plan</div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 50 deals/month</li>
              <li>• Full database</li>
              <li>• Priority support</li>
              <li>• Basic analytics</li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="font-bold mb-2 text-green-600">Pro+ Plan (Current)</div>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Unlimited deals</li>
              <li>• Full database</li>
              <li>• Priority support</li>
              <li>• Advanced analytics</li>
              <li>• API access</li>
              <li>• 10GB storage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">QUICK_ACTIONS</h3>
        <div className="space-y-3">
          <button className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Switch to Annual
          </button>
          
          <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2">
            <DollarSign className="w-5 h-5" />
            Downgrade to Pro
          </button>

          <Link 
            href="/billing"
            className="w-full bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Back to Billing
          </Link>
        </div>
      </div>

      {/* Support & Help */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          SUPPORT_&_HELP
        </h3>
        <div className="space-y-3">
          <Link 
            href="/pricing"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <FileText className="w-4 h-4" />
            View All Plans
          </Link>
          <Link 
            href="/contact"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Contact Support
          </Link>
          <Link 
            href="/refund-policy"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <Shield className="w-4 h-4" />
            Refund Policy
          </Link>
          <a 
            href="mailto:support@foundersprime.com"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <FileText className="w-4 h-4" />
            Email Billing Team
          </a>
        </div>
      </div>

      {/* Plan Change Warning */}
      <div className="bg-yellow-50 border-3 border-yellow-500 shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] p-6">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-yellow-800 mb-2">
            Plan Change Notice
          </h3>
          <p className="text-sm text-yellow-700 mb-4">
            Plan changes take effect immediately. Downgrades will be processed at the end of your current billing period.
          </p>
          <div className="bg-white border-2 border-yellow-500 p-3 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
            <p className="text-xs text-yellow-800 font-bold">
              Need help choosing?
            </p>
            <p className="text-xs text-yellow-600">
              Contact our team for personalized recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}