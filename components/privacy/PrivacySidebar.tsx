export default function PrivacySidebar() {
  const tableOfContents = [
    { title: 'Information We Collect', anchor: '#information-we-collect' },
    { title: 'How We Use Information', anchor: '#how-we-use-information' },
    { title: 'Information Sharing', anchor: '#information-sharing' },
    { title: 'Data Security', anchor: '#data-security' },
    { title: 'Your Rights', anchor: '#your-rights' },
    { title: 'Cookies & Tracking', anchor: '#cookies-tracking' },
    { title: 'International Transfers', anchor: '#international-transfers' },
    { title: 'Data Retention', anchor: '#data-retention' },
    { title: 'Children\'s Privacy', anchor: '#children-privacy' },
    { title: 'Policy Changes', anchor: '#policy-changes' }
  ]

  const quickActions = [
    { title: 'Download Your Data', icon: 'download', description: 'Export all your personal data' },
    { title: 'Update Preferences', icon: 'settings', description: 'Manage privacy settings' },
    { title: 'Delete Account', icon: 'delete', description: 'Permanently remove your account' },
    { title: 'Contact Privacy Team', icon: 'support_agent', description: 'Get help with privacy questions' }
  ]

  const certifications = [
    { name: 'SOC 2 Type II', icon: 'verified', description: 'Security and availability controls' },
    { name: 'GDPR Compliant', icon: 'gavel', description: 'European data protection standards' },
    { name: 'CCPA Compliant', icon: 'shield', description: 'California privacy rights' },
    { name: 'ISO 27001', icon: 'security', description: 'Information security management' }
  ]

  const privacyStats = [
    { metric: '0', label: 'Data Breaches', icon: 'security' },
    { metric: '256-bit', label: 'Encryption', icon: 'lock' },
    { metric: '24/7', label: 'Monitoring', icon: 'visibility' },
    { metric: '30 days', label: 'Response Time', icon: 'schedule' }
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
          Privacy Actions
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

      {/* Privacy Stats */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Security Stats
        </h3>
        <div className="space-y-4">
          {privacyStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">{stat.icon}</span>
                <span className="font-sans text-sm text-gray-700">{stat.label}</span>
              </div>
              <span className="font-mono text-lg font-bold text-black">{stat.metric}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Certifications
        </h3>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-green-600 mt-1">{cert.icon}</span>
              <div>
                <p className="font-mono text-sm font-bold text-black">{cert.name}</p>
                <p className="font-sans text-xs text-gray-600">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Processing Locations */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Data Locations
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-700">Primary (US)</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="font-mono text-xs text-green-600">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-700">EU (Ireland)</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="font-mono text-xs text-green-600">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-700">Backup (Canada)</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="font-mono text-xs text-blue-600">Standby</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t-2 border-gray-100">
          <p className="font-sans text-xs text-gray-600">
            All locations use the same security standards and encryption.
          </p>
        </div>
      </div>

      {/* Privacy Tools */}
      <div className="bg-primary/10 border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-4">
          Privacy Tools
        </h3>
        <div className="space-y-3">
          <a href="#" className="block font-mono text-sm text-primary hover:text-black transition-colors">
            Cookie Preference Center →
          </a>
          <a href="#" className="block font-mono text-sm text-primary hover:text-black transition-colors">
            Data Export Tool →
          </a>
          <a href="#" className="block font-mono text-sm text-primary hover:text-black transition-colors">
            Account Deletion →
          </a>
          <a href="#" className="block font-mono text-sm text-primary hover:text-black transition-colors">
            Privacy Request Form →
          </a>
        </div>
      </div>

      {/* Related Policies */}
      <div className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h3 className="font-mono text-lg font-bold text-black mb-6">
          Related Policies
        </h3>
        <div className="space-y-2">
          <a href="/terms" className="block font-mono text-sm text-primary hover:text-black transition-colors py-1">
            Terms of Service
          </a>
          <a href="/cookies" className="block font-mono text-sm text-primary hover:text-black transition-colors py-1">
            Cookie Policy
          </a>
          <a href="/refund" className="block font-mono text-sm text-primary hover:text-black transition-colors py-1">
            Refund Policy
          </a>
          <a href="/security" className="block font-mono text-sm text-primary hover:text-black transition-colors py-1">
            Security Policy
          </a>
        </div>
      </div>

      {/* Last Updated */}
      <div className="bg-gray-50 border-2 border-black rounded-sm p-4 text-center">
        <p className="font-mono text-sm text-gray-600 mb-2">
          Policy Version 3.1
        </p>
        <p className="font-sans text-xs text-gray-500">
          Last updated: January 8, 2024<br />
          Effective: January 1, 2024
        </p>
      </div>
    </div>
  )
}