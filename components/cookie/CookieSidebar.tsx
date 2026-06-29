import { Settings, Cookie, Shield, Eye, BarChart3, Target, Globe, FileText, HelpCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function CookieSidebar() {
  return (
    <div className="space-y-6">
      {/* Cookie Preferences */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          COOKIE_PREFERENCES
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-red-50 border-3 border-red-500 shadow-[3px_3px_0px_0px_rgba(239,68,68,1)]">
            <div>
              <p className="font-bold text-red-800 text-sm">Essential</p>
              <p className="text-xs text-red-600">Required</p>
            </div>
            <div className="bg-red-500 w-12 h-6 rounded-full border-3 border-black relative">
              <div className="bg-white w-4 h-4 rounded-full border-2 border-black absolute right-1 top-0.5"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div>
              <p className="font-bold text-blue-800 text-sm">Analytics</p>
              <p className="text-xs text-blue-600">Enabled</p>
            </div>
            <div className="bg-blue-500 w-12 h-6 rounded-full border-3 border-black relative">
              <div className="bg-white w-4 h-4 rounded-full border-2 border-black absolute right-1 top-0.5"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 border-3 border-green-500 shadow-[3px_3px_0px_0px_rgba(34,197,94,1)]">
            <div>
              <p className="font-bold text-green-800 text-sm">Functional</p>
              <p className="text-xs text-green-600">Enabled</p>
            </div>
            <div className="bg-green-500 w-12 h-6 rounded-full border-3 border-black relative">
              <div className="bg-white w-4 h-4 rounded-full border-2 border-black absolute right-1 top-0.5"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 border-3 border-gray-500 shadow-[3px_3px_0px_0px_rgba(107,114,128,1)]">
            <div>
              <p className="font-bold text-gray-800 text-sm">Marketing</p>
              <p className="text-xs text-gray-600">Disabled</p>
            </div>
            <div className="bg-gray-300 w-12 h-6 rounded-full border-3 border-black relative">
              <div className="bg-white w-4 h-4 rounded-full border-2 border-black absolute left-1 top-0.5"></div>
            </div>
          </div>

          <button className="w-full bg-[#13b6ec] hover:bg-[#0ea5db] text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            Save Preferences
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">NAVIGATION</h3>
        <nav className="space-y-2">
          <a 
            href="#what-are-cookies" 
            className="block text-sm text-gray-700 hover:text-[#13b6ec] hover:bg-gray-50 p-2 rounded transition-colors"
          >
            01. What Are Cookies
          </a>
          <a 
            href="#cookie-types" 
            className="block text-sm text-gray-700 hover:text-[#13b6ec] hover:bg-gray-50 p-2 rounded transition-colors"
          >
            02. Cookie Types
          </a>
          <a 
            href="#cookie-control" 
            className="block text-sm text-gray-700 hover:text-[#13b6ec] hover:bg-gray-50 p-2 rounded transition-colors"
          >
            03. Cookie Control
          </a>
          <a 
            href="#third-party" 
            className="block text-sm text-gray-700 hover:text-[#13b6ec] hover:bg-gray-50 p-2 rounded transition-colors"
          >
            04. Third-Party Services
          </a>
          <a 
            href="#updates" 
            className="block text-sm text-gray-700 hover:text-[#13b6ec] hover:bg-gray-50 p-2 rounded transition-colors"
          >
            05. Updates and Changes
          </a>
          <a 
            href="#contact" 
            className="block text-sm text-gray-700 hover:text-[#13b6ec] hover:bg-gray-50 p-2 rounded transition-colors"
          >
            06. Contact Us
          </a>
        </nav>
      </div>

      {/* Cookie Statistics */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          COOKIE_STATS
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Cookies</span>
            <span className="text-sm text-gray-600 font-bold">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Essential</span>
            <span className="text-sm text-red-600 font-bold">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Analytics</span>
            <span className="text-sm text-blue-600 font-bold">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Functional</span>
            <span className="text-sm text-green-600 font-bold">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Marketing</span>
            <span className="text-sm text-purple-600 font-bold">3</span>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border-3 border-blue-500 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-800">Currently Active</span>
            </div>
            <p className="text-xs text-blue-700">
              6 cookies are currently active on your browser
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4">QUICK_ACTIONS</h3>
        <div className="space-y-3">
          <button className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2">
            <Cookie className="w-5 h-5" />
            Clear All Cookies
          </button>
          
          <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2">
            <Settings className="w-5 h-5" />
            Reset to Default
          </button>

          <button className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy Mode
          </button>
        </div>
      </div>

      {/* Browser Support */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          BROWSER_SUPPORT
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Chrome</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 border border-green-500">Supported</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Firefox</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 border border-green-500">Supported</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Safari</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 border border-green-500">Supported</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Edge</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 border border-green-500">Supported</span>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 border-3 border-yellow-500 shadow-[3px_3px_0px_0px_rgba(234,179,8,1)]">
            <p className="text-xs text-yellow-700">
              <span className="font-bold">Note:</span> Cookie management varies by browser. 
              Check your browser&apos;s help section for specific instructions.
            </p>
          </div>
        </div>
      </div>

      {/* Related Links */}
      <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h3 className="text-lg font-bold font-mono text-black mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          RELATED_LINKS
        </h3>
        <div className="space-y-3">
          <Link 
            href="/privacy"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <Shield className="w-4 h-4" />
            Privacy Policy
          </Link>
          <Link 
            href="/terms"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <FileText className="w-4 h-4" />
            Terms of Service
          </Link>
          <Link 
            href="/contact"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Contact Support
          </Link>
          <a 
            href="https://www.allaboutcookies.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#13b6ec] transition-colors"
          >
            <Globe className="w-4 h-4" />
            About Cookies (External)
          </a>
        </div>
      </div>

      {/* Last Updated */}
      <div className="bg-blue-50 border-3 border-blue-500 shadow-[6px_6px_0px_0px_rgba(59,130,246,1)] p-6">
        <div className="text-center">
          <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-blue-800 mb-2">
            Policy Updated
          </h3>
          <p className="text-sm text-blue-700 mb-4">
            This Cookie Policy was last updated on January 9, 2026. We review and update our policies regularly.
          </p>
          <div className="bg-white border-2 border-blue-500 p-3 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)]">
            <p className="text-xs text-blue-800 font-bold">
              Version 2.1
            </p>
            <p className="text-xs text-blue-600">
              Next review: July 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}