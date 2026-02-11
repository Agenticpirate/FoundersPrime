import { Zap, Star, Target, BarChart3, Shield, Rocket, Gift, CheckCircle, ArrowRight, Download, Mail } from 'lucide-react'
import Link from 'next/link'

export default function SuccessContent() {
  return (
    <div className="space-y-8">
      {/* What's New */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            01
          </span>
          WHATS_NEW_FOR_YOU
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Unlimited Deals */}
          <div className="bg-green-50 border-3 border-green-500 p-6 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Unlimited Deals</h3>
            </div>
            <p className="text-green-700 mb-4">
              Apply to as many deals as you want! No more monthly limits - explore every opportunity 
              that matches your startup.
            </p>
            <div className="bg-white border-2 border-green-500 p-3 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
              <p className="text-sm text-green-700">
                <span className="font-bold">Previously:</span> 50 deals/month<br />
                <span className="font-bold">Now:</span> Unlimited deals
              </p>
            </div>
          </div>

          {/* Advanced Analytics */}
          <div className="bg-blue-50 border-3 border-blue-500 p-6 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">Advanced Analytics</h3>
            </div>
            <p className="text-blue-700 mb-4">
              Get detailed insights into your deal applications, success rates, and potential savings 
              with our advanced analytics dashboard.
            </p>
            <div className="bg-white border-2 border-blue-500 p-3 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
              <p className="text-sm text-blue-700">
                Track ROI, application success rates, and discover optimization opportunities
              </p>
            </div>
          </div>

          {/* API Access */}
          <div className="bg-purple-50 border-3 border-purple-500 p-6 shadow-[4px_4px_0px_0px_rgba(147,51,234,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-800">API Access</h3>
            </div>
            <p className="text-purple-700 mb-4">
              Integrate FoundersPrime data into your own tools and workflows with our comprehensive API. 
              Perfect for automating deal discovery.
            </p>
            <div className="bg-white border-2 border-purple-500 p-3 shadow-[3px_3px_0px_0px_rgba(147,51,234,1)]">
              <p className="text-sm text-purple-700">
                10,000 API calls/month included with comprehensive documentation
              </p>
            </div>
          </div>

          {/* Priority Support */}
          <div className="bg-yellow-50 border-3 border-yellow-500 p-6 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-500 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-yellow-800">Priority Support</h3>
            </div>
            <p className="text-yellow-700 mb-4">
              Get faster responses from our support team with dedicated Pro+ support channels 
              and priority queue access.
            </p>
            <div className="bg-white border-2 border-yellow-500 p-3 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
              <p className="text-sm text-yellow-700">
                Average response time: 2 hours (vs 24 hours for other plans)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            02
          </span>
          NEXT_STEPS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border-3 border-blue-500 p-6 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
            <div className="text-center">
              <div className="bg-blue-500 border-3 border-black p-3 w-fit mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-blue-800 mb-3">Explore Deals</h3>
              <p className="text-blue-700 mb-4 text-sm">
                Start browsing our complete database of startup deals. With unlimited access, 
                you can apply to every relevant opportunity.
              </p>
              <Link 
                href="/deals"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 inline-flex items-center gap-2"
              >
                Browse Deals
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-green-50 border-3 border-green-500 p-6 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
            <div className="text-center">
              <div className="bg-green-500 border-3 border-black p-3 w-fit mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-3">View Analytics</h3>
              <p className="text-green-700 mb-4 text-sm">
                Check out your new analytics dashboard to track your deal applications 
                and optimize your success rate.
              </p>
              <Link 
                href="/dashboard/analytics"
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 inline-flex items-center gap-2"
              >
                View Analytics
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-purple-50 border-3 border-purple-500 p-6 shadow-[4px_4px_0px_0px_rgba(147,51,234,1)]">
            <div className="text-center">
              <div className="bg-purple-500 border-3 border-black p-3 w-fit mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-purple-800 mb-3">API Setup</h3>
              <p className="text-purple-700 mb-4 text-sm">
                Get started with our API to integrate FoundersPrime data into your 
                existing tools and workflows.
              </p>
              <Link 
                href="/dashboard/api"
                className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 inline-flex items-center gap-2"
              >
                API Docs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Bonus */}
      <section className="bg-gradient-to-r from-yellow-50 to-orange-50 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-yellow-500 text-black px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            🎁
          </span>
          WELCOME_BONUS
        </h2>
        
        <div className="bg-white border-3 border-yellow-500 p-6 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-500 border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-black mb-3">Exclusive Pro+ Starter Pack</h3>
              <p className="text-gray-700 mb-4">
                As a thank you for upgrading, we've prepared a special starter pack with curated deals 
                and resources specifically for Pro+ members.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border-2 border-green-500 p-4 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-800">Curated Deal List</span>
                  </div>
                  <p className="text-sm text-green-700">
                    50 hand-picked deals worth over $10,000 in potential savings
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-500 p-4 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-blue-800">Startup Toolkit</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Essential templates, guides, and resources for scaling your startup
                  </p>
                </div>

                <div className="bg-purple-50 border-2 border-purple-500 p-4 shadow-[3px_3px_0px_0px_rgba(147,51,234,1)]">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <span className="font-bold text-purple-800">API Quick Start</span>
                  </div>
                  <p className="text-sm text-purple-700">
                    Code examples and integration guides to get you started quickly
                  </p>
                </div>

                <div className="bg-orange-50 border-2 border-orange-500 p-4 shadow-[3px_3px_0px_0px_rgba(249,115,22,1)]">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                    <span className="font-bold text-orange-800">1-on-1 Onboarding</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    30-minute call with our team to optimize your deal strategy
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Starter Pack
                </button>
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Schedule Onboarding
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Receipt & Invoice */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            03
          </span>
          RECEIPT_&_INVOICE
        </h2>
        
        <div className="bg-gray-50 border-3 border-gray-300 p-6 shadow-[4px_4px_0px_0px_rgba(107,114,128,1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Transaction Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="font-mono">#TXN-2026-001234</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>January 9, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span>Visa ending in 4242</span>
                </div>
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span>Pro+ Annual</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Amount Charged:</span>
                  <span>$737.33</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Billing Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Acme Startup Inc.</span><br />
                  <span>123 Startup Street</span><br />
                  <span>San Francisco, CA 94105</span><br />
                  <span>United States</span>
                </div>
                <div className="mt-3">
                  <span className="font-medium">Tax ID:</span> 12-3456789
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-gray-300 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to your registered email address.
            </p>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Invoice
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}