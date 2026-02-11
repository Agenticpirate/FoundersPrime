import { CreditCard, Calendar, DollarSign, TrendingUp, Shield, HelpCircle, FileText, Settings, Bell, Download, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function BillingSidebar() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          QUICK_STATS
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Current Plan</span>
            <span className="text-sm text-green-600 font-bold">Pro+</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Monthly Cost</span>
            <span className="text-sm text-black font-bold">$79.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Annual Savings</span>
            <span className="text-sm text-blue-600 font-bold">$158</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Paid</span>
            <span className="text-sm text-gray-600 font-bold">$395.00</span>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 border-3 border-green-500 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-800">Account in Good Standing</span>
            </div>
            <p className="text-xs text-green-700">
              All payments up to date
            </p>
          </div>
        </div>
      </div>

      {/* Next Billing */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          NEXT_BILLING
        </h3>
        <div className="space-y-4">
          <div className="bg-blue-50 border-3 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-800">Feb 15</p>
              <p className="text-sm text-blue-600">2026</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Pro+ Monthly</span>
              <span className="text-sm font-bold">$79.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Tax (8.5%)</span>
              <span className="text-sm font-bold">$6.72</span>
            </div>
            <div className="border-t-2 border-gray-300 pt-2">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg">$85.72</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Pay Now
          </button>
        </div>
      </div>

      {/* Payment Security */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          PAYMENT_SECURITY
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">PCI DSS Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Stripe Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Bank-Level Security</span>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <p className="text-xs text-blue-700">
              <span className="font-bold">Protected by Stripe:</span> Your payment information is never stored on our servers.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">QUICK_ACTIONS</h3>
        <div className="space-y-3">
          <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            Update Payment
          </button>
          
          <button className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download Invoice
          </button>

          <Link 
            href="/pricing"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Change Plan
          </Link>
        </div>
      </div>

      {/* Billing Notifications */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          NOTIFICATIONS
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Payment Reminders</span>
            <div className="bg-green-500 w-10 h-5 rounded-full border-2 border-black relative">
              <div className="bg-white w-3 h-3 rounded-full border border-black absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Invoice Emails</span>
            <div className="bg-green-500 w-10 h-5 rounded-full border-2 border-black relative">
              <div className="bg-white w-3 h-3 rounded-full border border-black absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Usage Alerts</span>
            <div className="bg-gray-300 w-10 h-5 rounded-full border-2 border-black relative">
              <div className="bg-white w-3 h-3 rounded-full border border-black absolute left-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Plan Changes</span>
            <div className="bg-green-500 w-10 h-5 rounded-full border-2 border-black relative">
              <div className="bg-white w-3 h-3 rounded-full border border-black absolute right-0.5 top-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Savings */}
      <div className="bg-green-50 border-3 border-green-500 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-green-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          COST_SAVINGS
        </h3>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-800">$158</p>
            <p className="text-sm text-green-600">Potential Annual Savings</p>
          </div>
          
          <div className="bg-white border-2 border-green-500 p-3 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <p className="text-sm text-green-700 mb-2">
              <span className="font-bold">Switch to Annual:</span>
            </p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Pay $790/year instead of $948</li>
              <li>• Save 2 months of subscription</li>
              <li>• Lock in current pricing</li>
            </ul>
          </div>

          <button className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Switch to Annual
          </button>
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
            href="/contact"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Billing Support
          </Link>
          <Link 
            href="/refund-policy"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <FileText className="w-4 h-4" />
            Refund Policy
          </Link>
          <Link 
            href="/pricing"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <Settings className="w-4 h-4" />
            Plan Comparison
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

      {/* Payment Issues */}
      <div className="bg-yellow-50 border-3 border-yellow-500 shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] p-6">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-yellow-800 mb-2">
            Payment Issues?
          </h3>
          <p className="text-sm text-yellow-700 mb-4">
            If you're experiencing payment problems, we're here to help resolve them quickly.
          </p>
          <div className="space-y-2">
            <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Contact Support
            </button>
            <p className="text-xs text-yellow-600">
              Average response time: 2 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}