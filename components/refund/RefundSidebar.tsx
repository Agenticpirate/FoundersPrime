'use client'

import { Mail, HelpCircle, FileText } from 'lucide-react'
import Link from 'next/link'

export default function RefundSidebar() {
  return (
    <div className="space-y-6">
      {/* Support Actions */}
      <div className="bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-5">
        <h3 className="text-sm font-bold font-mono text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-neutral-800 pb-2">NEED_HELP?</h3>
        <div className="space-y-3 mt-4">
          <Link
            href="/contact"
            className="w-full bg-gray-50 dark:bg-neutral-900/50 hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-900 dark:text-white font-bold py-2.5 px-3 border border-gray-200 dark:border-neutral-800 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-xs font-mono"
          >
            <Mail className="w-4 h-4" />
            Contact Support
          </Link>
          <Link
            href="/help"
            className="w-full bg-gray-50 dark:bg-neutral-900/50 hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-900 dark:text-white font-bold py-2.5 px-3 border border-gray-200 dark:border-neutral-800 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-xs font-mono"
          >
            <HelpCircle className="w-4 h-4" />
            Help Center
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-5 sticky top-6">
        <h3 className="text-sm font-bold font-mono text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-neutral-800 pb-2">ON_THIS_PAGE</h3>
        <nav className="space-y-1 mt-3">
          <a
            href="#policy"
            className="block text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-accent-yellow/10 p-2 rounded-lg transition-colors font-mono"
          >
            01. Strict Policy
          </a>
          <a
            href="#cancellation"
            className="block text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-accent-yellow/10 p-2 rounded-lg transition-colors font-mono"
          >
            02. Cancellation
          </a>
          <a
            href="#disputes"
            className="block text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-accent-yellow/10 p-2 rounded-lg transition-colors font-mono"
          >
            03. Disputes
          </a>
          <a
            href="#contact"
            className="block text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-accent-yellow/10 p-2 rounded-lg transition-colors font-mono"
          >
            04. Contact Billing
          </a>
        </nav>
      </div>

      {/* Related Documents */}
      <div className="bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-5">
        <h3 className="text-sm font-bold font-mono text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-neutral-800 pb-2">LEGAL_DOCS</h3>
        <div className="space-y-2 mt-3">
          <Link
            href="/terms"
            className="flex items-center gap-2 text-xs text-primary hover:text-gray-900 dark:hover:text-white transition-colors font-sans py-1"
          >
            <FileText className="w-3 h-3" />
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="flex items-center gap-2 text-xs text-primary hover:text-gray-900 dark:hover:text-white transition-colors font-sans py-1"
          >
            <FileText className="w-3 h-3" />
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}