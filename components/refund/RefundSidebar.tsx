'use client'

import { Mail, HelpCircle, FileText } from 'lucide-react'
import Link from 'next/link'

export default function RefundSidebar() {
  return (
    <div className="space-y-6">
      {/* Support Actions */}
      <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-5">
        <h3 className="text-sm font-bold font-mono text-black mb-3 border-b-2 border-black pb-2">NEED_HELP?</h3>
        <div className="space-y-3">
          <Link
            href="/contact"
            className="w-full bg-white hover:bg-gray-50 text-black font-bold py-2 px-3 border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200 flex items-center justify-center gap-2 text-xs font-mono"
          >
            <Mail className="w-4 h-4" />
            Contact Support
          </Link>
          <Link
            href="/help"
            className="w-full bg-white hover:bg-gray-50 text-black font-bold py-2 px-3 border-2 border-black shadow-[2px_2px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200 flex items-center justify-center gap-2 text-xs font-mono"
          >
            <HelpCircle className="w-4 h-4" />
            Help Center
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-5">
        <h3 className="text-sm font-bold font-mono text-black mb-3 border-b-2 border-black pb-2">ON_THIS_PAGE</h3>
        <nav className="space-y-1">
          <a
            href="#policy"
            className="block text-xs text-gray-600 hover:text-black hover:bg-accent-yellow/10 p-1.5 rounded-sm transition-colors font-mono"
          >
            01. Strict Policy
          </a>
          <a
            href="#cancellation"
            className="block text-xs text-gray-600 hover:text-black hover:bg-accent-yellow/10 p-1.5 rounded-sm transition-colors font-mono"
          >
            02. Cancellation
          </a>
          <a
            href="#disputes"
            className="block text-xs text-gray-600 hover:text-black hover:bg-accent-yellow/10 p-1.5 rounded-sm transition-colors font-mono"
          >
            03. Disputes
          </a>
          <a
            href="#contact"
            className="block text-xs text-gray-600 hover:text-black hover:bg-accent-yellow/10 p-1.5 rounded-sm transition-colors font-mono"
          >
            04. Contact Billing
          </a>
        </nav>
      </div>

      {/* Related Documents */}
      <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-5">
        <h3 className="text-sm font-bold font-mono text-black mb-3 border-b-2 border-black pb-2">LEGAL_DOCS</h3>
        <div className="space-y-2">
          <Link
            href="/terms"
            className="flex items-center gap-2 text-xs text-gray-600 hover:text-black transition-colors font-sans hover:underline"
          >
            <FileText className="w-3 h-3" />
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="flex items-center gap-2 text-xs text-gray-600 hover:text-black transition-colors font-sans hover:underline"
          >
            <FileText className="w-3 h-3" />
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}