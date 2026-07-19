import Link from 'next/link'
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


export default function PrivacySidebar() {




  return (
    <div className="space-y-6">
      {/* Table of Contents */}
      <div className="bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-6 sticky top-6">
        <h3 className="font-mono text-lg font-bold text-gray-900 dark:text-white mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {tableOfContents.map((item, index) => (
            <a
              key={item.title}
              href={item.anchor}
              className="block font-sans text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-6">
        <h3 className="font-mono text-lg font-bold text-gray-900 dark:text-white mb-6">
          Privacy Actions
        </h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <button type="button"
              key={action.title}
              className="w-full flex items-start gap-3 p-3 border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-xl transition-colors text-left"
            >
              <span className="material-symbols-outlined text-primary mt-0.5">{action.icon}</span>
              <div>
                <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">{action.title}</p>
                <p className="font-sans text-xs text-gray-600 dark:text-gray-400">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Privacy Stats */}
      <div className="bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-6">
        <h3 className="font-mono text-lg font-bold text-gray-900 dark:text-white mb-6">
          Security Stats
        </h3>
        <div className="space-y-4">
          {privacyStats.map((stat, index) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">{stat.icon}</span>
                <span className="font-sans text-sm text-gray-700 dark:text-gray-300">{stat.label}</span>
              </div>
              <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">{stat.metric}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-6">
        <h3 className="font-mono text-lg font-bold text-gray-900 dark:text-white mb-6">
          Certifications
        </h3>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={cert.name} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-green-500 mt-1">{cert.icon}</span>
              <div>
                <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">{cert.name}</p>
                <p className="font-sans text-xs text-gray-600 dark:text-gray-400">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Processing Locations */}
      <div className="bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-6">
        <h3 className="font-mono text-lg font-bold text-gray-900 dark:text-white mb-6">
          Data Locations
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-700 dark:text-gray-300">Primary (US)</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-mono text-xs text-green-600 dark:text-green-400">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-700 dark:text-gray-300">EU (Ireland)</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-mono text-xs text-green-600 dark:text-green-400">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-gray-700 dark:text-gray-300">Backup (Canada)</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-mono text-xs text-blue-600 dark:text-blue-400">Standby</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
          <p className="font-sans text-xs text-gray-600 dark:text-gray-400">
            All locations use the same security standards and encryption.
          </p>
        </div>
      </div>

      {/* Privacy Tools */}
      <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl backdrop-blur-md p-6">
        <h3 className="font-mono text-lg font-bold text-gray-900 dark:text-white mb-4">
          Privacy Tools
        </h3>
        <div className="space-y-3">
          <a href="#" className="block font-mono text-sm text-primary hover:text-gray-900 dark:hover:text-white transition-colors">
            Cookie Preference Center →
          </a>
          <a href="#" className="block font-mono text-sm text-primary hover:text-gray-900 dark:hover:text-white transition-colors">
            Data Export Tool →
          </a>
          <a href="#" className="block font-mono text-sm text-primary hover:text-gray-900 dark:hover:text-white transition-colors">
            Account Deletion →
          </a>
          <a href="#" className="block font-mono text-sm text-primary hover:text-gray-900 dark:hover:text-white transition-colors">
            Privacy Request Form →
          </a>
        </div>
      </div>

      {/* Related Policies */}
      <div className="bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-6">
        <h3 className="font-mono text-lg font-bold text-gray-900 dark:text-white mb-6">
          Related Policies
        </h3>
        <div className="space-y-2">
          <Link href="/terms" className="block font-mono text-sm text-primary hover:text-gray-900 dark:hover:text-white transition-colors py-1">
            Terms of Service
          </Link>
          <Link href="/cookies" className="block font-mono text-sm text-primary hover:text-gray-900 dark:hover:text-white transition-colors py-1">
            Cookie Policy
          </Link>
          <Link href="/refund" className="block font-mono text-sm text-primary hover:text-gray-900 dark:hover:text-white transition-colors py-1">
            Refund Policy
          </Link>
          <Link href="/security" className="block font-mono text-sm text-primary hover:text-gray-900 dark:hover:text-white transition-colors py-1">
            Security Policy
          </Link>
        </div>
      </div>

      {/* Last Updated */}
      <div className="bg-gray-50 dark:bg-neutral-900/50 border border-gray-200 dark:border-neutral-800 rounded-xl p-4 text-center">
        <p className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-2">
          Policy Version 3.1
        </p>
        <p className="font-sans text-xs text-gray-500 dark:text-gray-400">
          Last updated: June 21, 2026<br />
          Effective: June 21, 2026
        </p>
      </div>
    </div>
  )
}