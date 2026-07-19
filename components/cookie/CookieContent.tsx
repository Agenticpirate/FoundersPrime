'use client'

import { Cookie, Shield, BarChart3, Target, Settings } from 'lucide-react'
import { useCookieConsent } from '@/context/CookieConsentContext'
import CookieContentMore from './CookieContentMore'

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

      <CookieContentMore openModal={openModal} />
    </div>
  )
}