import { CreditCard, Calendar, Download, Edit, Trash2, Plus, CheckCircle, XCircle, Clock, DollarSign, Receipt, AlertTriangle } from 'lucide-react'

export default function BillingContent() {
  return (
    <div className="space-y-8">
      {/* Current Subscription */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            01
          </span>
          CURRENT_SUBSCRIPTION
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-3 border-green-500 p-6 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-green-800">Pro+ Plan</h3>
              <span className="bg-green-500 text-white px-3 py-1 text-sm font-bold border-2 border-black">
                ACTIVE
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-700">Monthly Price:</span>
                <span className="font-bold text-green-800">$79.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Billing Cycle:</span>
                <span className="font-bold text-green-800">Monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Started:</span>
                <span className="font-bold text-green-800">Aug 15, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Next Billing:</span>
                <span className="font-bold text-green-800">Feb 15, 2026</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                Change Plan
              </button>
              <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                Switch to Annual
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border-3 border-blue-500 p-6 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Usage This Month</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-blue-700">Deals Applied</span>
                  <span className="font-bold text-blue-800">8 / Unlimited</span>
                </div>
                <div className="w-full bg-blue-200 border-2 border-blue-500 h-3">
                  <div className="bg-blue-500 h-full w-1/4 border-r-2 border-blue-600"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-blue-700">API Calls</span>
                  <span className="font-bold text-blue-800">2,847 / 10,000</span>
                </div>
                <div className="w-full bg-blue-200 border-2 border-blue-500 h-3">
                  <div className="bg-blue-500 h-full w-1/3 border-r-2 border-blue-600"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-blue-700">Storage Used</span>
                  <span className="font-bold text-blue-800">1.2GB / 10GB</span>
                </div>
                <div className="w-full bg-blue-200 border-2 border-blue-500 h-3">
                  <div className="bg-blue-500 h-full w-1/8 border-r-2 border-blue-600"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-white border-2 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
              <p className="text-sm text-blue-700">
                <span className="font-bold">Pro+ Benefits:</span> Unlimited deals, Priority support, 
                Advanced analytics, API access, 10GB storage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-mono text-black flex items-center gap-3">
            <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              02
            </span>
            PAYMENT_METHODS
          </h2>
          <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Payment Method
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Primary Payment Method */}
          <div className="bg-green-50 border-3 border-green-500 p-6 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-green-500 border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green-800">Visa ending in 4242</h3>
                  <p className="text-sm text-green-700">Expires 12/2027</p>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600 font-bold">PRIMARY</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Payment Method */}
          <div className="bg-gray-50 border-3 border-gray-500 p-6 shadow-[4px_4px_0px_0px_rgba(107,114,128,1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-500 border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Mastercard ending in 8888</h3>
                  <p className="text-sm text-gray-700">Expires 08/2026</p>
                  <span className="text-xs text-gray-600">Backup payment method</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  Set Primary
                </button>
                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Billing History */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-mono text-black flex items-center gap-3">
            <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              03
            </span>
            BILLING_HISTORY
          </h2>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-3 border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-3 border-black p-4 text-left font-bold">Date</th>
                <th className="border-3 border-black p-4 text-left font-bold">Description</th>
                <th className="border-3 border-black p-4 text-left font-bold">Amount</th>
                <th className="border-3 border-black p-4 text-left font-bold">Status</th>
                <th className="border-3 border-black p-4 text-left font-bold">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border-3 border-black p-4">Jan 15, 2026</td>
                <td className="border-3 border-black p-4">Pro+ Monthly Subscription</td>
                <td className="border-3 border-black p-4 font-bold">$79.00</td>
                <td className="border-3 border-black p-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-bold border border-green-500 flex items-center gap-1 w-fit">
                    <CheckCircle className="w-3 h-3" />
                    PAID
                  </span>
                </td>
                <td className="border-3 border-black p-4">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    PDF
                  </button>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border-3 border-black p-4">Dec 15, 2025</td>
                <td className="border-3 border-black p-4">Pro+ Monthly Subscription</td>
                <td className="border-3 border-black p-4 font-bold">$79.00</td>
                <td className="border-3 border-black p-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-bold border border-green-500 flex items-center gap-1 w-fit">
                    <CheckCircle className="w-3 h-3" />
                    PAID
                  </span>
                </td>
                <td className="border-3 border-black p-4">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    PDF
                  </button>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-3 border-black p-4">Nov 15, 2025</td>
                <td className="border-3 border-black p-4">Pro+ Monthly Subscription</td>
                <td className="border-3 border-black p-4 font-bold">$79.00</td>
                <td className="border-3 border-black p-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-bold border border-green-500 flex items-center gap-1 w-fit">
                    <CheckCircle className="w-3 h-3" />
                    PAID
                  </span>
                </td>
                <td className="border-3 border-black p-4">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    PDF
                  </button>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border-3 border-black p-4">Oct 15, 2025</td>
                <td className="border-3 border-black p-4">Pro+ Monthly Subscription</td>
                <td className="border-3 border-black p-4 font-bold">$79.00</td>
                <td className="border-3 border-black p-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-bold border border-yellow-500 flex items-center gap-1 w-fit">
                    <Clock className="w-3 h-3" />
                    PENDING
                  </span>
                </td>
                <td className="border-3 border-black p-4">
                  <span className="text-gray-500 text-sm">Processing...</span>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border-3 border-black p-4">Sep 15, 2025</td>
                <td className="border-3 border-black p-4">Pro Monthly Subscription</td>
                <td className="border-3 border-black p-4 font-bold">$29.00</td>
                <td className="border-3 border-black p-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-bold border border-green-500 flex items-center gap-1 w-fit">
                    <CheckCircle className="w-3 h-3" />
                    PAID
                  </span>
                </td>
                <td className="border-3 border-black p-4">
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    PDF
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Load More History
          </button>
        </div>
      </section>

      {/* Billing Settings */}
      <section className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-black mb-6 flex items-center gap-3">
          <span className="bg-[#13b6ec] text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            04
          </span>
          BILLING_SETTINGS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-3 border-blue-500 p-6 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Billing Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Company Name</label>
                <input 
                  type="text" 
                  value="Acme Startup Inc."
                  className="w-full p-3 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] focus:shadow-[1px_1px_0px_0px_rgba(59,130,246,1)] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Tax ID</label>
                <input 
                  type="text" 
                  value="12-3456789"
                  className="w-full p-3 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] focus:shadow-[1px_1px_0px_0px_rgba(59,130,246,1)] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">Billing Email</label>
                <input 
                  type="email" 
                  value="billing@acmestartup.com"
                  className="w-full p-3 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] focus:shadow-[1px_1px_0px_0px_rgba(59,130,246,1)] transition-all"
                />
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Update Information
            </button>
          </div>

          <div className="bg-yellow-50 border-3 border-yellow-500 p-6 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-lg font-bold text-yellow-800 mb-4">Billing Address</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-yellow-700 mb-1">Street Address</label>
                <input 
                  type="text" 
                  value="123 Startup Street"
                  className="w-full p-3 border-3 border-yellow-500 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] focus:shadow-[1px_1px_0px_0px_rgba(234,179,8,1)] transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-yellow-700 mb-1">City</label>
                  <input 
                    type="text" 
                    value="San Francisco"
                    className="w-full p-3 border-3 border-yellow-500 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] focus:shadow-[1px_1px_0px_0px_rgba(234,179,8,1)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-700 mb-1">ZIP Code</label>
                  <input 
                    type="text" 
                    value="94105"
                    className="w-full p-3 border-3 border-yellow-500 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] focus:shadow-[1px_1px_0px_0px_rgba(234,179,8,1)] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-yellow-700 mb-1">Country</label>
                <select className="w-full p-3 border-3 border-yellow-500 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] focus:shadow-[1px_1px_0px_0px_rgba(234,179,8,1)] transition-all">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              Update Address
            </button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50 border-3 border-red-500 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] p-8">
        <h2 className="text-2xl font-bold font-mono text-red-800 mb-6 flex items-center gap-3">
          <span className="bg-red-500 text-white px-3 py-1 text-lg border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            ⚠️
          </span>
          DANGER_ZONE
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white border-3 border-red-500 p-6 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-800 mb-2">Cancel Subscription</h3>
                <p className="text-red-700 mb-4">
                  Canceling your subscription will downgrade your account to the free plan at the end of your current billing period. 
                  You'll lose access to Pro+ features but keep your data.
                </p>
                <div className="flex items-center gap-3">
                  <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                    Cancel Subscription
                  </button>
                  <span className="text-sm text-red-600">
                    Effective: February 15, 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-3 border-red-500 p-6 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-800 mb-2">Delete Account</h3>
                <p className="text-red-700 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone. 
                  You'll receive a final invoice and lose access immediately.
                </p>
                <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}