import { Heart, HelpCircle, MessageCircle, Gift, Shield, Calendar, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function CancelSidebar() {
  return (
    <div className="space-y-6">
      {/* We'll Miss You */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="text-center">
          <div className="bg-red-500 border-3 border-black p-3 w-fit mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold font-mono text-black mb-3">
            WE'LL_MISS_YOU
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            You've been with us for 156 days and saved $948 on startup deals. 
            Thank you for being part of the FoundersPrime community!
          </p>
          <div className="bg-gray-50 border-3 border-gray-300 p-3 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)]">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-black">23</p>
                <p className="text-xs text-gray-600">Deals Applied</p>
              </div>
              <div>
                <p className="text-xl font-bold text-black">$948</p>
                <p className="text-xs text-gray-600">Total Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Chance Offers */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5" />
          LAST_CHANCE
        </h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-3 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="text-center">
              <p className="font-bold text-green-800">50% OFF</p>
              <p className="text-sm text-green-600">Next 3 months</p>
              <p className="text-xs text-green-600 mt-1">Just $39.50/month</p>
            </div>
            <button className="w-full mt-3 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Accept Offer
            </button>
          </div>

          <div className="bg-blue-50 border-3 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="text-center">
              <p className="font-bold text-blue-800">Pause Plan</p>
              <p className="text-sm text-blue-600">Up to 3 months</p>
              <p className="text-xs text-blue-600 mt-1">No charges, keep data</p>
            </div>
            <button className="w-full mt-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Pause Instead
            </button>
          </div>
        </div>
      </div>

      {/* Cancellation Details */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          CANCELLATION_DETAILS
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Current Plan</span>
            <span className="text-sm text-green-600 font-bold">Pro+</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Access Until</span>
            <span className="text-sm text-black font-bold">Feb 15, 2026</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Days Remaining</span>
            <span className="text-sm text-blue-600 font-bold">21 days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Data Retention</span>
            <span className="text-sm text-purple-600 font-bold">90 days</span>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border-3 border-yellow-500 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-800">No Immediate Loss</span>
            </div>
            <p className="text-xs text-yellow-700">
              You'll keep full access for 21 more days and can reactivate anytime within 90 days.
            </p>
          </div>
        </div>
      </div>

      {/* Alternative Plans */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          ALTERNATIVES
        </h3>
        <div className="space-y-3">
          <div className="bg-blue-50 border-2 border-blue-500 p-3 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-800">Pro Plan</span>
              <span className="text-blue-800 font-bold">$29</span>
            </div>
            <p className="text-xs text-blue-600">50 deals/month, priority support</p>
            <p className="text-xs text-green-600 font-bold mt-1">Save $50/month</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-500 p-3 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-gray-800">Free Plan</span>
              <span className="text-gray-800 font-bold">$0</span>
            </div>
            <p className="text-xs text-gray-600">5 deals/month, basic access</p>
            <p className="text-xs text-green-600 font-bold mt-1">Keep your account</p>
          </div>

          <Link 
            href="/dashboard/billing/change-plan"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 block text-center"
          >
            View All Plans
          </Link>
        </div>
      </div>

      {/* Support Options */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          NEED_HELP?
        </h3>
        <div className="space-y-3">
          <Link 
            href="/contact"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Talk to Support
          </Link>
          <Link 
            href="/refund-policy"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <Shield className="w-4 h-4" />
            Refund Policy
          </Link>
          <Link 
            href="/pricing"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <DollarSign className="w-4 h-4" />
            Compare Plans
          </Link>
          <a 
            href="mailto:support@foundersprime.com"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Email Support Team
          </a>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-green-50 border-3 border-green-500 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] p-6">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-green-800 mb-2">
            Success Story
          </h3>
          <p className="text-sm text-green-700 mb-4">
            "I almost cancelled but decided to pause instead. When I came back 2 months later, 
            I found 3 amazing deals that saved me $2,400!"
          </p>
          <div className="bg-white border-2 border-green-500 p-3 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <p className="text-xs text-green-800 font-bold">
              Sarah K., YC Founder
            </p>
            <p className="text-xs text-green-600">
              Paused for 2 months, saved $2,400
            </p>
          </div>
        </div>
      </div>

      {/* Final Warning */}
      <div className="bg-red-50 border-3 border-red-500 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] p-6">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-red-800 mb-2">
            Are You Sure?
          </h3>
          <p className="text-sm text-red-700 mb-4">
            Once cancelled, you'll miss out on new deals, startup insights, and exclusive offers. 
            Consider pausing instead!
          </p>
          <div className="space-y-2">
            <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Pause Instead
            </button>
            <p className="text-xs text-red-600">
              Or talk to our team first
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}