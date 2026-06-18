export default function TermsSidebar() {
  const tableOfContents = [
    { title: 'Acceptance of Terms', anchor: '#acceptance-of-terms' },
    { title: 'Description of Service', anchor: '#description-of-service' },
    { title: 'Deals, Offers & Eligibility', anchor: '#deals-offers-eligibility' },
    { title: 'User Accounts', anchor: '#user-accounts' },
    { title: 'Acceptable Use Policy', anchor: '#acceptable-use' },
    { title: 'Subscription & Billing', anchor: '#subscription-billing' },
    { title: 'Intellectual Property', anchor: '#intellectual-property' },
    { title: 'Privacy & Data', anchor: '#privacy-data' },
    { title: 'Disclaimers & Warranties', anchor: '#disclaimers-warranties' },
    { title: 'Limitation of Liability', anchor: '#limitation-liability' },
    { title: 'Indemnification', anchor: '#indemnification' },
    { title: 'Termination', anchor: '#termination' },
    { title: 'Governing Law', anchor: '#governing-law' }
  ]

  const quickActions = [
    { title: 'Download Terms PDF', icon: 'download', description: 'Get a PDF copy of these terms' },
    { title: 'Contact Legal Team', icon: 'gavel', description: 'Questions about legal matters' },
    { title: 'Report Violations', icon: 'report', description: 'Report terms violations' },
    { title: 'Account Settings', icon: 'settings', description: 'Manage your account' }
  ]

  const keyDates = [
    { event: 'Terms Effective', date: 'January 1, 2024' },
    { event: 'Last Updated', date: 'June 17, 2026' },
    { event: 'Next Review', date: 'December 1, 2026' },
    { event: 'Version', date: '3.2' }
  ]

  const legalCompliance = [
    { law: 'GDPR', region: 'European Union', status: 'Compliant' },
    { law: 'CCPA', region: 'California', status: 'Compliant' },
    { law: 'CAN-SPAM', region: 'United States', status: 'Compliant' },
    { law: 'COPPA', region: 'United States', status: 'Compliant' }
  ]

  const subscriptionInfo = [
    { plan: 'Free', price: '$0/month', features: 'Basic access' },
    { plan: 'Pro', price: '$29/month', features: 'Enhanced features' },
    { plan: 'Pro+', price: '$79/month', features: 'Full access' }
  ]

  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6 sticky top-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {tableOfContents.map((item, index) => (
            <a
              key={index}
              href={item.anchor}
              className="block font-sans text-sm text-gray-700 hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Legal Actions
        </h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="w-full flex items-start gap-3 p-3 border-2 border-black bg-white hover:bg-gray-100 rounded-sm transition-colors text-left"
            >
              <span className="material-symbols-outlined text-primary mt-0.5">{action.icon}</span>
              <div>
                <p className="font-mono text-sm font-bold text-black">{action.title}</p>
                <p className="font-sans text-xs text-gray-600">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Key Dates */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Important Dates
        </h3>
        <div className="space-y-3">
          {keyDates.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-sans text-sm text-gray-700">{item.event}</span>
              <span className="font-mono text-sm font-bold text-black">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Subscription Plans
        </h3>
        <div className="space-y-4">
          {subscriptionInfo.map((plan, index) => (
            <div key={index} className="border-b-2 border-gray-100 last:border-b-0 pb-3 last:pb-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm font-bold text-black">{plan.plan}</span>
                <span className="font-mono text-sm text-primary font-bold">{plan.price}</span>
              </div>
              <p className="font-sans text-xs text-gray-600">{plan.features}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t-2 border-gray-100">
          <a href="/pricing" className="font-mono text-sm text-primary hover:text-black transition-colors">
            View detailed pricing →
          </a>
        </div>
      </div>

      {/* Legal Compliance */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Legal Compliance
        </h3>
        <div className="space-y-3">
          {legalCompliance.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-mono text-sm font-bold text-black">{item.law}</p>
                <p className="font-sans text-xs text-gray-600">{item.region}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="font-mono text-xs text-green-600">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Rights */}
      <div className="bg-primary/10 border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Your Rights
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">account_circle</span>
            <div>
              <p className="font-mono font-bold text-black mb-1">Account Control</p>
              <p className="font-sans text-gray-700">Modify or delete your account anytime</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">download</span>
            <div>
              <p className="font-mono font-bold text-black mb-1">Data Export</p>
              <p className="font-sans text-gray-700">Download your data in portable format</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">cancel</span>
            <div>
              <p className="font-mono font-bold text-black mb-1">Cancellation</p>
              <p className="font-sans text-gray-700">Cancel subscription without penalty</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">support_agent</span>
            <div>
              <p className="font-mono font-bold text-black mb-1">Support Access</p>
              <p className="font-sans text-gray-700">Get help with any issues or questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Documents */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Related Documents
        </h3>
        <div className="space-y-2">
          <a href="/privacy" className="block font-mono text-sm text-primary hover:text-black transition-colors py-1">
            Privacy Policy
          </a>
          <a href="/refund" className="block font-mono text-sm text-primary hover:text-black transition-colors py-1">
            Refund Policy
          </a>
          <a href="/cookies" className="block font-mono text-sm text-primary hover:text-black transition-colors py-1">
            Cookie Policy
          </a>
          <a href="/community-guidelines" className="block font-mono text-sm text-primary hover:text-black transition-colors py-1">
            Community Guidelines
          </a>
        </div>
      </div>

      {/* Dispute Resolution */}
      <div className="bg-yellow-50 border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Dispute Resolution
        </h3>
        <p className="font-sans text-sm text-gray-700 mb-4">
          We encourage resolving disputes through direct communication before formal proceedings.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-black">Step 1:</span>
            <span className="font-sans text-xs text-gray-700">Contact support team</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-black">Step 2:</span>
            <span className="font-sans text-xs text-gray-700">Escalate to legal team</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-black">Step 3:</span>
            <span className="font-sans text-xs text-gray-700">Binding arbitration</span>
          </div>
        </div>
      </div>

      {/* Version History */}
      <div className="bg-gray-50 border-2 border-black rounded-sm p-4 text-center">
        <p className="font-mono text-sm text-gray-600 mb-2">
          Terms Version 3.2
        </p>
        <p className="font-sans text-xs text-gray-500">
          Last updated: June 17, 2026<br />
          Effective: January 1, 2024
        </p>
      </div>
    </div>
  )
}