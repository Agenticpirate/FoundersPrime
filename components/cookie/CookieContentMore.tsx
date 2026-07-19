'use client'

import { Globe, Clock, AlertTriangle, Settings } from 'lucide-react'

/** Identical remaining cookie policy sections (control + third-party + updates). */
export default function CookieContentMore({ openModal }: { openModal: () => void }) {
  return (
    <>
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
              <button type="button"
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

    </>
  )
}
