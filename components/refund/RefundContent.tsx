'use client'

import { CheckCircle, XCircle, Clock, CreditCard, Mail, AlertTriangle } from 'lucide-react'

export default function RefundContent() {
  return (
    <div className="space-y-6">
      {/* Section 1: Strict No-Refund Policy */}
      <section id="policy" className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-4 flex items-center gap-3">
          <span className="bg-accent-yellow text-black px-2 py-0.5 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a]">
            01
          </span>
          STRICT_NO_REFUND_POLICY
        </h2>

        <div className="space-y-4">
          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-black mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-black mb-2 font-mono uppercase">All Sales Are Final</h3>
                <p className="text-sm text-gray-800 mb-4 font-sans leading-relaxed">
                  FoundersPrime maintains a <strong>Strict No-Refund Policy</strong>. We do not offer refunds, returns, or exchanges for any subscription plans, credits, or digital products once purchased.
                </p>
                <div className="bg-gray-50 border-2 border-black p-3 text-xs font-mono">
                  "Refunds are ONLY granted if FoundersPrime terminates the service entirely or if all deals are permanently removed from the platform."
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h3 className="text-sm font-bold text-black mb-2 font-mono flex items-center gap-2">
                <XCircle className="w-4 h-4 text-black" />
                No Refunds For:
              </h3>
              <ul className="space-y-2 text-xs text-gray-800 font-sans">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 bg-black rounded-full"></span>
                  Change of mind or accidental purchase
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 bg-black rounded-full"></span>
                  Unused subscription time or credits
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 bg-black rounded-full"></span>
                  Failure to use the platform features
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 bg-black rounded-full"></span>
                  Finding a lower price elsewhere
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h3 className="text-sm font-bold text-black mb-2 font-mono flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-black" />
                Only Exceptions:
              </h3>
              <ul className="space-y-2 text-xs text-gray-800 font-sans">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 bg-black rounded-full"></span>
                  <strong>Service Termination:</strong> If we shut down FoundersPrime completely.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 bg-black rounded-full"></span>
                  <strong>Total Content Removal:</strong> If absolutely NO deals are available on the platform globally.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-1 h-1 bg-black rounded-full"></span>
                  <strong>Billing Error:</strong> Proven double-charge for the same billing cycle.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Cancellation Policy */}
      <section id="cancellation" className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-4 flex items-center gap-3">
          <span className="bg-accent-yellow text-black px-2 py-0.5 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a]">
            02
          </span>
          CANCELLATION
        </h2>

        <div className="space-y-4">
          <p className="text-sm text-gray-800 leading-relaxed font-sans">
            You may cancel your subscription at any time. Cancellation simply prevents the subscription from auto-renewing for the next billing cycle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h3 className="text-sm font-bold text-black mb-2 font-mono">How to Cancel</h3>
              <ol className="list-decimal list-inside space-y-1 text-xs text-gray-800 font-sans">
                <li>Log in to your FoundersPrime account</li>
                <li>Go to <strong>Settings</strong> &gt; <strong>Billing</strong></li>
                <li>Click <strong>"Cancel Subscription"</strong></li>
                <li>Confirm your choice</li>
              </ol>
            </div>

            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h3 className="text-sm font-bold text-black mb-2 font-mono">After Cancellation</h3>
              <ul className="space-y-1 text-xs text-gray-800 font-sans">
                <li>• You retain access until the end of the current period</li>
                <li>• No further charges will be applied</li>
                <li>• No pro-rated refunds for remaining days</li>
                <li>• Account reverts to "Free" status after period ends</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Dispute Resolution */}
      <section id="disputes" className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-4 flex items-center gap-3">
          <span className="bg-accent-yellow text-black px-2 py-0.5 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a]">
            03
          </span>
          DISPUTES_AND_CHARGEBACKS
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-50 border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
            <p className="text-sm text-gray-800 leading-relaxed font-sans mb-3">
              By analyzing your usage logs, we can verify that services were delivered. Filing an illegitmate chargeback (claiming fraud on a valid purchase) is a violation of our Terms.
            </p>
            <p className="text-xs text-gray-800 font-bold font-mono uppercase">
              Consequences of Chargebacks:
            </p>
            <ul className="mt-2 space-y-1 text-xs text-gray-800 font-sans">
              <li>• Immediate and permanent account termination</li>
              <li>• Ban from all future FoundersPrime services</li>
              <li>• Dispute evidence submitted to your bank (Login logs, IP address, Usage data)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Contact Billing */}
      <section id="contact" className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-4 flex items-center gap-3">
          <span className="bg-accent-yellow text-black px-2 py-0.5 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a]">
            04
          </span>
          CONTACT_SUPPORT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
            <h3 className="text-sm font-bold text-black mb-2 font-mono">Billing Support</h3>
            <div className="space-y-1 text-xs text-gray-800 font-sans">
              <p>If you believe there has been a billing error (e.g., duplicate charge), please contact us immediately.</p>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p><span className="font-bold">Email:</span> support@foundersprime.com</p>
                <p><span className="font-bold">Response:</span> Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm flex flex-col justify-center items-center text-center">
            <p className="text-xs text-gray-600 mb-3 font-sans">
              Need to download an invoice or manage your card?
            </p>
            <button className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-xs font-mono">
              Go to Billing Portal
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}