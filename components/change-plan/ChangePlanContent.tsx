import { Check, X, Star, Crown, Zap, TrendingUp, Calendar, CreditCard, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function ChangePlanContent() {
  return (
    <div className="space-y-8">
      {/* Billing Cycle Toggle */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            01
          </span>
          BILLING_CYCLE
        </h2>
        
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gray-100 border-3 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex">
            <button className="bg-white border-3 border-black px-6 py-3 font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              Monthly
            </button>
            <button className="bg-green-500 text-white border-3 border-black px-6 py-3 font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative">
              Annual
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            <span className="font-bold text-green-600">Save up to $158/year</span> with annual billing
          </p>
          <p className="text-sm text-gray-600">
            All annual plans include 2 months free
          </p>
        </div>
      </section>

      {/* Plan Comparison */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            02
          </span>
          PLAN_COMPARISON
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="bg-gray-50 border-3 border-gray-500 p-6 shadow-[4px_4px_0px_0px_rgba(107,114,128,1)] relative">
            <div className="text-center mb-6">
              <div className="bg-gray-500 border-3 border-black p-3 w-fit mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-800 mb-2">$0</div>
              <p className="text-sm text-gray-600">Forever free</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">5 deals per month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Basic startup database</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Community access</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-500">Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-500">Advanced analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-500">API access</span>
              </div>
            </div>

            <button className="w-full bg-gray-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-blue-50 border-3 border-blue-500 p-6 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] relative">
            <div className="text-center mb-6">
              <div className="bg-blue-500 border-3 border-black p-3 w-fit mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-blue-800 mb-2">$29</div>
              <p className="text-sm text-blue-600">per month</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">50 deals per month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Full startup database</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Basic analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Email notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-500">API access</span>
              </div>
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Downgrade to Pro
            </button>
          </div>

          {/* Pro+ Plan */}
          <div className="bg-green-50 border-3 border-green-500 p-6 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-500 text-white px-4 py-1 text-sm font-bold border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                CURRENT
              </span>
            </div>
            
            <div className="text-center mb-6">
              <div className="bg-green-500 border-3 border-black p-3 w-fit mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Pro+</h3>
              <div className="text-4xl font-bold text-green-800 mb-2">$79</div>
              <p className="text-sm text-green-600">per month</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Unlimited deals</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Full startup database</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">Advanced analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">API access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">10GB storage</span>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-not-allowed">
              Current Plan
            </button>
          </div>
        </div>
      </section>

      {/* Annual Savings Calculator */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            03
          </span>
          ANNUAL_SAVINGS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-3 border-blue-500 p-6 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Pro Annual
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-700">Monthly Price:</span>
                <span className="font-bold text-blue-800">$29.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Annual Price:</span>
                <span className="font-bold text-blue-800">$290.00</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="font-bold">You Save:</span>
                <span className="font-bold">$58.00</span>
              </div>
              <div className="bg-white border-2 border-blue-500 p-3 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
                <p className="text-sm text-blue-700">
                  <span className="font-bold">Equivalent to:</span> $24.17/month
                </p>
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Switch to Pro Annual
            </button>
          </div>

          <div className="bg-green-50 border-3 border-green-500 p-6 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Pro+ Annual
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-700">Monthly Price:</span>
                <span className="font-bold text-green-800">$79.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Annual Price:</span>
                <span className="font-bold text-green-800">$790.00</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="font-bold">You Save:</span>
                <span className="font-bold">$158.00</span>
              </div>
              <div className="bg-white border-2 border-green-500 p-3 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
                <p className="text-sm text-green-700">
                  <span className="font-bold">Equivalent to:</span> $65.83/month
                </p>
              </div>
            </div>
            <button className="w-full mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Switch to Pro+ Annual
            </button>
          </div>
        </div>
      </section>

      {/* Plan Change Preview */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            04
          </span>
          CHANGE_PREVIEW
        </h2>
        
        <div className="bg-yellow-50 border-3 border-yellow-500 p-6 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
          <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Billing Preview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-yellow-500 p-4 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
              <h4 className="font-bold text-yellow-800 mb-3">Current Plan</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Pro+ Monthly</span>
                  <span>$79.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Days remaining</span>
                  <span>21 days</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Prorated credit</span>
                  <span>+$52.67</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-yellow-500 p-4 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
              <h4 className="font-bold text-yellow-800 mb-3">New Plan</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Pro+ Annual</span>
                  <span>$790.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Prorated charge</span>
                  <span>$737.33</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total due today</span>
                  <span>$737.33</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-100 border-2 border-green-500 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-bold text-green-800">Annual Savings: $158.00</span>
            </div>
            <p className="text-sm text-green-700">
              By switching to annual billing, you'll save $158 over the next 12 months compared to monthly billing.
            </p>
          </div>
        </div>
      </section>

      {/* Confirmation Section */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            05
          </span>
          CONFIRM_CHANGE
        </h2>
        
        <div className="bg-red-50 border-3 border-red-500 p-6 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-red-800 mb-2">Important Information</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Plan changes are processed immediately</li>
                <li>• Upgrades are prorated and charged today</li>
                <li>• Downgrades take effect at the end of your current billing period</li>
                <li>• Annual plans cannot be refunded after 30 days</li>
                <li>• You can change or cancel your plan anytime</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              className="w-5 h-5 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
            <span className="text-sm">
              I understand the billing changes and agree to the 
              <Link href="/terms" className="text-[#13b6ec] hover:underline ml-1">Terms of Service</Link>
            </span>
          </label>
        </div>

        <div className="flex gap-4 mt-6">
          <Link 
            href="/billing"
            className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Cancel
          </Link>
          <button className="bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Confirm Plan Change
          </button>
        </div>
      </section>
    </div>
  )
}