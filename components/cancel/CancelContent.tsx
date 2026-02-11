import { MessageSquare, Gift, Pause, TrendingDown, XCircle, AlertTriangle, CheckCircle, DollarSign, Calendar, Shield } from 'lucide-react'
import Link from 'next/link'

export default function CancelContent() {
  return (
    <div className="space-y-8">
      {/* Retention Offers */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            01
          </span>
          BEFORE_YOU_GO
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pause Subscription */}
          <div className="bg-blue-50 border-3 border-blue-500 p-6 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Pause className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">Pause Subscription</h3>
            </div>
            <p className="text-blue-700 mb-4">
              Take a break for up to 3 months. Your account will be paused and you won't be charged, 
              but you can reactivate anytime.
            </p>
            <ul className="text-sm text-blue-700 space-y-1 mb-4">
              <li>• No charges during pause period</li>
              <li>• Keep all your data and settings</li>
              <li>• Reactivate with one click</li>
              <li>• Available for up to 3 months</li>
            </ul>
            <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Pause Instead
            </button>
          </div>

          {/* Discount Offer */}
          <div className="bg-green-50 border-3 border-green-500 p-6 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Special Offer</h3>
            </div>
            <p className="text-green-700 mb-4">
              Stay with us and get 50% off your next 3 months. That's just $39.50/month 
              for full Pro+ access.
            </p>
            <div className="bg-white border-2 border-green-500 p-3 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)] mb-4">
              <div className="flex justify-between items-center">
                <span className="text-green-700">Regular Price:</span>
                <span className="text-green-800 line-through">$79.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-800">Special Price:</span>
                <span className="font-bold text-green-800 text-xl">$39.50</span>
              </div>
              <p className="text-xs text-green-600 mt-2">Valid for 3 months, then regular pricing</p>
            </div>
            <button className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Accept Offer
            </button>
          </div>

          {/* Downgrade Option */}
          <div className="bg-yellow-50 border-3 border-yellow-500 p-6 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-500 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-yellow-800">Downgrade to Pro</h3>
            </div>
            <p className="text-yellow-700 mb-4">
              Keep essential features at a lower cost. Pro plan includes 50 deals per month 
              and priority support for just $29/month.
            </p>
            <ul className="text-sm text-yellow-700 space-y-1 mb-4">
              <li>• 50 deals per month (vs unlimited)</li>
              <li>• Full startup database access</li>
              <li>• Priority support</li>
              <li>• Save $50/month</li>
            </ul>
            <Link 
              href="/dashboard/billing/change-plan"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 block text-center"
            >
              Downgrade to Pro
            </Link>
          </div>

          {/* Free Plan */}
          <div className="bg-gray-50 border-3 border-gray-500 p-6 shadow-[4px_4px_0px_0px_rgba(107,114,128,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-500 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Switch to Free</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Keep your account active with our free plan. You'll have limited access 
              but can upgrade anytime.
            </p>
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li>• 5 deals per month</li>
              <li>• Basic startup database</li>
              <li>• Community access</li>
              <li>• No cost, forever</li>
            </ul>
            <button className="w-full bg-gray-500 hover:bg-gray-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Switch to Free
            </button>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            02
          </span>
          TELL_US_WHY
        </h2>
        
        <div className="space-y-6">
          <p className="text-gray-700">
            Your feedback helps us improve FoundersPrime for everyone. Please let us know why you're canceling:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-4 bg-gray-50 border-3 border-gray-300 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:bg-gray-100 cursor-pointer">
              <input type="radio" name="reason" value="too-expensive" className="w-5 h-5" />
              <span className="text-gray-800">Too expensive</span>
            </label>
            
            <label className="flex items-center gap-3 p-4 bg-gray-50 border-3 border-gray-300 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:bg-gray-100 cursor-pointer">
              <input type="radio" name="reason" value="not-using" className="w-5 h-5" />
              <span className="text-gray-800">Not using it enough</span>
            </label>

            <label className="flex items-center gap-3 p-4 bg-gray-50 border-3 border-gray-300 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:bg-gray-100 cursor-pointer">
              <input type="radio" name="reason" value="missing-features" className="w-5 h-5" />
              <span className="text-gray-800">Missing features I need</span>
            </label>

            <label className="flex items-center gap-3 p-4 bg-gray-50 border-3 border-gray-300 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:bg-gray-100 cursor-pointer">
              <input type="radio" name="reason" value="found-alternative" className="w-5 h-5" />
              <span className="text-gray-800">Found a better alternative</span>
            </label>

            <label className="flex items-center gap-3 p-4 bg-gray-50 border-3 border-gray-300 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:bg-gray-100 cursor-pointer">
              <input type="radio" name="reason" value="technical-issues" className="w-5 h-5" />
              <span className="text-gray-800">Technical issues</span>
            </label>

            <label className="flex items-center gap-3 p-4 bg-gray-50 border-3 border-gray-300 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)] hover:bg-gray-100 cursor-pointer">
              <input type="radio" name="reason" value="other" className="w-5 h-5" />
              <span className="text-gray-800">Other reason</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional feedback (optional)
            </label>
            <textarea 
              rows={4}
              placeholder="Tell us more about your experience and how we can improve..."
              className="w-full p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-5 h-5 border-3 border-black" />
            <span className="text-sm text-gray-700">
              I'd like to receive an email if you address my concerns
            </span>
          </div>
        </div>
      </section>

      {/* Final Cancellation */}
      <section className="bg-red-50 border-3 border-red-500 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-red-800 mb-6 flex items-center gap-3">
          <span className="bg-red-500 text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            03
          </span>
          FINAL_CANCELLATION
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white border-3 border-red-500 p-6 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Cancellation Summary</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Your Pro+ subscription will be cancelled</li>
                  <li>• You'll keep access until February 15, 2026</li>
                  <li>• No further charges will be made</li>
                  <li>• Your data will be retained for 90 days</li>
                  <li>• You can reactivate anytime before access expires</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-500 p-4 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-yellow-800">Data Protection</span>
              </div>
              <p className="text-sm text-yellow-700">
                Your account data, saved deals, and preferences will be safely stored for 90 days. 
                If you reactivate within this period, everything will be restored exactly as you left it.
              </p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" className="w-5 h-5 border-3 border-red-500" />
              <span className="text-sm text-red-700">
                I understand that my subscription will be cancelled and I will lose access to Pro+ features after February 15, 2026
              </span>
            </div>

            <div className="flex gap-4">
              <Link 
                href="/billing"
                className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                Keep Subscription
              </Link>
              <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message (Hidden by default) */}
      <section className="bg-green-50 border-3 border-green-500 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] p-8 hidden" id="success-message">
        <div className="text-center">
          <div className="bg-green-500 border-3 border-black p-4 w-fit mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Subscription Cancelled</h2>
          <p className="text-green-700 mb-6">
            Your subscription has been successfully cancelled. You'll continue to have access to all Pro+ features until February 15, 2026.
          </p>
          <div className="space-y-3">
            <p className="text-sm text-green-600">
              We've sent a confirmation email to your registered email address.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/dashboard"
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/pricing"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}