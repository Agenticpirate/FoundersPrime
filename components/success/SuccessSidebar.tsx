import { Trophy, Star, TrendingUp, Calendar, Shield, Gift, HelpCircle, MessageCircle, Zap, Target, CheckCircle, Crown } from 'lucide-react'
import Link from 'next/link'

export default function SuccessSidebar() {
  return (
    <div className="space-y-6">
      {/* Congratulations */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <div className="text-center">
          <div className="bg-yellow-500 border-3 border-black p-3 w-fit mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold font-mono text-black mb-3">
            CONGRATULATIONS!
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            You're now a Pro+ member! You've unlocked the full potential of FoundersPrime 
            and joined our elite community of successful founders.
          </p>
          <div className="bg-white border-3 border-yellow-500 p-3 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
            <div className="flex items-center justify-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-800">Pro+ Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Benefits */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Star className="w-5 h-5" />
          YOUR_BENEFITS
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Unlimited deal applications</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Advanced analytics dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">API access (10k calls/month)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Priority support (2hr response)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">10GB storage</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Exclusive Pro+ deals</span>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <p className="text-xs text-blue-700">
              <span className="font-bold">Pro+ Exclusive:</span> Access to deals not available to other plan members
            </p>
          </div>
        </div>
      </div>

      {/* Savings Summary */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          SAVINGS_SUMMARY
        </h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-3 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-800">$158</p>
              <p className="text-sm text-green-600">Annual Savings</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Monthly equivalent:</span>
              <span className="font-bold">$65.83</span>
            </div>
            <div className="flex justify-between">
              <span>vs Monthly billing:</span>
              <span className="font-bold text-green-600">Save 20%</span>
            </div>
            <div className="flex justify-between">
              <span>Free months:</span>
              <span className="font-bold text-blue-600">2 months</span>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-500 p-3 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
            <p className="text-xs text-yellow-700">
              <span className="font-bold">Smart Choice:</span> You're saving enough to cover a month of AWS credits!
            </p>
          </div>
        </div>
      </div>

      {/* Next Billing */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          BILLING_INFO
        </h3>
        <div className="space-y-3">
          <div className="bg-blue-50 border-3 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="text-center">
              <p className="text-xl font-bold text-blue-800">Jan 9</p>
              <p className="text-sm text-blue-600">2027</p>
              <p className="text-xs text-blue-600 mt-1">Next billing date</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Plan:</span>
              <span className="font-bold">Pro+ Annual</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-bold">$790.00</span>
            </div>
            <div className="flex justify-between">
              <span>Payment method:</span>
              <span className="font-bold">Visa •••• 4242</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-700">Auto-renewal enabled</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">QUICK_ACTIONS</h3>
        <div className="space-y-3">
          <Link 
            href="/deals"
            className="w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Browse Deals
          </Link>
          
          <Link 
            href="/dashboard/analytics"
            className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            View Analytics
          </Link>

          <Link 
            href="/dashboard/api"
            className="w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Target className="w-5 h-5" />
            API Setup
          </Link>
        </div>
      </div>

      {/* Welcome Gift */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5" />
          WELCOME_GIFT
        </h3>
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 border-3 border-black p-3 w-fit mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Download your exclusive Pro+ starter pack with curated deals worth over $10,000!
          </p>
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Download Now
          </button>
        </div>
      </div>

      {/* Support */}
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
            Priority Support Chat
          </Link>
          <a 
            href="mailto:support@foundersprime.com"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Email Pro+ Team
          </a>
          <Link 
            href="/dashboard/api"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <Target className="w-4 h-4" />
            API Documentation
          </Link>
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors">
            <Calendar className="w-4 h-4" />
            Schedule Onboarding Call
          </button>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-green-50 border-3 border-green-500 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] p-6">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-green-800 mb-2">
            You're All Set!
          </h3>
          <p className="text-sm text-green-700 mb-4">
            Pro+ members typically save 3x more than other plans and discover 5x more relevant deals.
          </p>
          <div className="bg-white border-2 border-green-500 p-3 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-green-800">3x</p>
                <p className="text-xs text-green-600">More Savings</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-800">5x</p>
                <p className="text-xs text-green-600">More Deals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}