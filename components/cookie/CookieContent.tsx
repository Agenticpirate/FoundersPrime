'use client'

import { Cookie, Shield, BarChart3, Target, Settings, Globe, Clock, AlertTriangle } from 'lucide-react'
import { useCookieConsent } from '@/context/CookieConsentContext'

export default function CookieContent() {
  const { openModal } = useCookieConsent()
  return (
    <div className="space-y-6">
      {/* Section 1: What Are Cookies */}
      <section id="what-are-cookies" className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-4 flex items-center gap-3">
          <span className="bg-accent-yellow text-black px-2 py-0.5 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a]">
            01
          </span>
          WHAT_ARE_COOKIES
        </h2>

        <div className="space-y-4">
          <p className="text-sm text-gray-800 leading-relaxed font-sans">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to website owners.
          </p>

          <div className="bg-gray-50 border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
            <h3 className="text-base font-bold text-black mb-2 flex items-center gap-2 font-mono">
              <Cookie className="w-4 h-4" />
              How Cookies Work
            </h3>
            <div className="space-y-1">
              <p className="text-xs text-gray-800 font-sans border-l-2 border-black pl-2 py-0.5">Cookies store small pieces of information about your visit.</p>
              <p className="text-xs text-gray-800 font-sans border-l-2 border-black pl-2 py-0.5">They help websites remember your preferences and settings.</p>
              <p className="text-xs text-gray-800 font-sans border-l-2 border-black pl-2 py-0.5">Some cookies are essential for website functionality.</p>
              <p className="text-xs text-gray-800 font-sans border-l-2 border-black pl-2 py-0.5">Others help us improve our service and understand usage patterns.</p>
              <p className="text-xs text-gray-800 font-sans border-l-2 border-black pl-2 py-0.5">You can control which cookies are stored on your device.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h4 className="font-bold text-black mb-1 font-mono text-sm">First-Party Cookies</h4>
              <p className="text-xs text-gray-800 font-sans">
                Set directly by FoundersPrime to provide core functionality and remember your preferences.
              </p>
            </div>
            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h4 className="font-bold text-black mb-1 font-mono text-sm">Third-Party Cookies</h4>
              <p className="text-xs text-gray-800 font-sans">
                Set by external services we use, like analytics providers and payment processors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Types of Cookies We Use */}
      <section id="cookie-types" className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-4 flex items-center gap-3">
          <span className="bg-accent-yellow text-black px-2 py-0.5 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a]">
            02
          </span>
          COOKIE_TYPES
        </h2>

        <div className="space-y-4">
          {/* Essential Cookies */}
          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
            <h3 className="text-base font-bold text-black mb-2 flex items-center gap-2 font-mono">
              <Shield className="w-4 h-4" />
              Essential Cookies (Required)
            </h3>
            <p className="text-xs text-gray-800 mb-3 font-sans">
              These cookies are necessary for the website to function properly. They cannot be disabled.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black bg-white text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Cookie Name</th>
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Purpose</th>
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-2 font-mono">session_id</td>
                    <td className="border-2 border-black p-2 font-sans">Maintains your login session</td>
                    <td className="border-2 border-black p-2 font-sans">Session</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-black p-2 font-mono">csrf_token</td>
                    <td className="border-2 border-black p-2 font-sans">Security protection against attacks</td>
                    <td className="border-2 border-black p-2 font-sans">Session</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 font-mono">cookie_consent</td>
                    <td className="border-2 border-black p-2 font-sans">Remembers your cookie preferences</td>
                    <td className="border-2 border-black p-2 font-sans">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
            <h3 className="text-base font-bold text-black mb-2 flex items-center gap-2 font-mono">
              <BarChart3 className="w-4 h-4" />
              Analytics Cookies (Optional)
            </h3>
            <p className="text-xs text-gray-800 mb-3 font-sans">
              These cookies help us understand how visitors use our website so we can improve it.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black bg-white text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Cookie Name</th>
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Purpose</th>
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-2 font-mono">_ga</td>
                    <td className="border-2 border-black p-2 font-sans">Google Analytics - distinguishes users</td>
                    <td className="border-2 border-black p-2 font-sans">2 years</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-black p-2 font-mono">_ga_*</td>
                    <td className="border-2 border-black p-2 font-sans">Google Analytics - session data</td>
                    <td className="border-2 border-black p-2 font-sans">2 years</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 font-mono">_gid</td>
                    <td className="border-2 border-black p-2 font-sans">Google Analytics - distinguishes users</td>
                    <td className="border-2 border-black p-2 font-sans">24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Functional Cookies */}
          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
            <h3 className="text-base font-bold text-black mb-2 flex items-center gap-2 font-mono">
              <Settings className="w-4 h-4" />
              Functional Cookies (Optional)
            </h3>
            <p className="text-xs text-gray-800 mb-3 font-sans">
              These cookies enable enhanced functionality and personalization.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black bg-white text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Cookie Name</th>
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Purpose</th>
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-2 font-mono">theme_preference</td>
                    <td className="border-2 border-black p-2 font-sans">Remembers your theme choice</td>
                    <td className="border-2 border-black p-2 font-sans">1 year</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-black p-2 font-mono">language_pref</td>
                    <td className="border-2 border-black p-2 font-sans">Stores language preference</td>
                    <td className="border-2 border-black p-2 font-sans">1 year</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 font-mono">dashboard_layout</td>
                    <td className="border-2 border-black p-2 font-sans">Saves your dashboard customization</td>
                    <td className="border-2 border-black p-2 font-sans">6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
            <h3 className="text-base font-bold text-black mb-2 flex items-center gap-2 font-mono">
              <Target className="w-4 h-4" />
              Marketing Cookies (Optional)
            </h3>
            <p className="text-xs text-gray-800 mb-3 font-sans">
              These cookies are used to deliver relevant advertisements and track campaign effectiveness.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black bg-white text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Cookie Name</th>
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Purpose</th>
                    <th className="border-2 border-black p-2 text-left font-bold font-mono">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-2 font-mono">_fbp</td>
                    <td className="border-2 border-black p-2 font-sans">Facebook Pixel - tracks conversions</td>
                    <td className="border-2 border-black p-2 font-sans">3 months</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-black p-2 font-mono">_gcl_au</td>
                    <td className="border-2 border-black p-2 font-sans">Google Ads - conversion tracking</td>
                    <td className="border-2 border-black p-2 font-sans">3 months</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 font-mono">utm_source</td>
                    <td className="border-2 border-black p-2 font-sans">Tracks marketing campaign source</td>
                    <td className="border-2 border-black p-2 font-sans">30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How to Control Cookies */}
      <section id="cookie-control" className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-4 flex items-center gap-3">
          <span className="bg-accent-yellow text-black px-2 py-0.5 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a]">
            03
          </span>
          COOKIE_CONTROL
        </h2>

        <div className="space-y-4">
          <p className="text-sm text-gray-800 leading-relaxed font-sans">
            You have several options to control and manage cookies on our website and in your browser.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h3 className="text-base font-bold text-black mb-2 flex items-center gap-2 font-mono">
                <Settings className="w-4 h-4" />
                Our Cookie Settings
              </h3>
              <ul className="space-y-1 text-xs text-gray-800 font-sans mb-3">
                <li>• Use our cookie preference center</li>
                <li>• Enable/disable cookie categories</li>
                <li>• View detailed cookie information</li>
                <li>• Update preferences anytime</li>
              </ul>
              <button
                onClick={openModal}
                className="w-full bg-accent-yellow hover:bg-black hover:text-white text-black font-bold py-2 px-3 border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-xs font-mono"
              >
                Manage Cookie Preferences
              </button>
            </div>

            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h3 className="text-base font-bold text-black mb-2 flex items-center gap-2 font-mono">
                <Globe className="w-4 h-4" />
                Browser Settings
              </h3>
              <ul className="space-y-1 text-xs text-gray-800 font-sans mb-3">
                <li>• Block all cookies in browser settings</li>
                <li>• Delete existing cookies</li>
                <li>• Set up automatic cookie deletion</li>
                <li>• Use private/incognito browsing</li>
              </ul>
              <a
                href="https://www.allaboutcookies.org/how-to-manage-cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-3 border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 block text-center text-xs font-mono"
              >
                Browser Cookie Guide
              </a>
            </div>
          </div>

          <div className="bg-gray-50 border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-black mb-1 font-mono">Important Note</h3>
                <p className="text-xs text-gray-800 mb-2 font-sans">
                  Disabling certain cookies may affect website functionality. Essential cookies cannot be disabled
                  as they are required for basic website operations like security and user authentication.
                </p>
                <ul className="space-y-1 text-xs text-gray-800 font-sans">
                  <li>• Some features may not work properly without functional cookies</li>
                  <li>• Analytics cookies help us improve the website experience</li>
                  <li>• Marketing cookies enable personalized content and ads</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Third-Party Services */}
      <section id="third-party" className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-4 flex items-center gap-3">
          <span className="bg-accent-yellow text-black px-2 py-0.5 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a]">
            04
          </span>
          THIRD_PARTY_SERVICES
        </h2>

        <div className="space-y-4">
          <p className="text-sm text-gray-800 leading-relaxed font-sans">
            We use several third-party services that may set their own cookies. Here&apos;s what you need to know:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h3 className="text-sm font-bold text-black mb-2 font-mono">Google Analytics</h3>
              <ul className="space-y-1 text-xs text-gray-800 font-sans mb-3">
                <li>• Tracks website usage and performance</li>
                <li>• Helps us understand user behavior</li>
                <li>• Data is anonymized and aggregated</li>
                <li>• You can opt-out via browser settings</li>
              </ul>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-black underline font-mono"
              >
                Google Privacy Policy →
              </a>
            </div>

            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h3 className="text-sm font-bold text-black mb-2 font-mono">Stripe</h3>
              <ul className="space-y-1 text-xs text-gray-800 font-sans mb-3">
                <li>• Processes payments securely</li>
                <li>• Fraud detection and prevention</li>
                <li>• Required for subscription management</li>
                <li>• Complies with PCI DSS standards</li>
              </ul>
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-black underline font-mono"
              >
                Stripe Privacy Policy →
              </a>
            </div>

            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h3 className="text-sm font-bold text-black mb-2 font-mono">Intercom</h3>
              <ul className="space-y-1 text-xs text-gray-800 font-sans mb-3">
                <li>• Powers our customer support chat</li>
                <li>• Remembers conversation history</li>
                <li>• Enables personalized support</li>
                <li>• Can be disabled in chat widget</li>
              </ul>
              <a
                href="https://www.intercom.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-black underline font-mono"
              >
                Intercom Privacy Policy →
              </a>
            </div>

            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h3 className="text-sm font-bold text-black mb-2 font-mono">Social Media</h3>
              <ul className="space-y-1 text-xs text-gray-800 font-sans mb-3">
                <li>• Facebook and Twitter pixels</li>
                <li>• Social sharing functionality</li>
                <li>• Conversion tracking for ads</li>
                <li>• Can be blocked via browser settings</li>
              </ul>
              <p className="text-xs text-gray-600 font-mono">
                See individual platform privacy policies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Updates and Changes */}
      <section id="updates" className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <h2 className="text-xl font-bold font-mono text-black mb-4 flex items-center gap-3">
          <span className="bg-accent-yellow text-black px-2 py-0.5 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a]">
            05
          </span>
          UPDATES_AND_CHANGES
        </h2>

        <div className="space-y-4">
          <p className="text-sm text-gray-800 leading-relaxed font-sans">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons.
          </p>

          <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
            <h3 className="text-base font-bold text-black mb-2 flex items-center gap-2 font-mono">
              <Clock className="w-4 h-4" />
              How We Handle Updates
            </h3>
            <ul className="space-y-1 text-xs text-gray-800 font-sans">
              <li>• We&apos;ll notify you of significant changes via email or website banner</li>
              <li>• Minor updates will be reflected in the &quot;Last Updated&quot; date</li>
              <li>• You&apos;ll be asked to review and accept major changes</li>
              <li>• Previous versions are archived for reference</li>
              <li>• Changes take effect 30 days after notification</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h4 className="font-bold text-black mb-1 font-mono text-sm">Stay Informed</h4>
              <p className="text-xs text-gray-800 font-sans">
                Subscribe to our newsletter to receive notifications about policy updates and changes.
              </p>
            </div>
            <div className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm">
              <h4 className="font-bold text-black mb-1 font-mono text-sm">Your Rights</h4>
              <p className="text-xs text-gray-800 font-sans">
                You can always review your cookie preferences and update them at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}