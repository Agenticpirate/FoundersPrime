'use client'

import { Shield } from 'lucide-react'
import PageBreadcrumb from '@/components/ui/PageBreadcrumb'

export default function RefundHeader() {
  return (
    <div className="mb-6">
      <PageBreadcrumb
        className="mb-4"
        items={[{ label: 'Home', href: '/' }, { label: 'Refund Policy' }]}
      />

      {/* Header */}
      <div className="bg-white dark:bg-[#09090b]/90 border border-gray-200 dark:border-neutral-900 shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-xl backdrop-blur-md p-6">
        <div className="flex items-start gap-4">
          <div className="bg-accent-yellow/10 border border-accent-yellow/30 p-2 rounded-xl hidden sm:block">
            <Shield className="w-6 h-6 text-accent-yellow" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-gray-900 dark:text-white mb-2 uppercase tracking-tight">
              REFUND_POLICY
            </h1>
            <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed max-w-2xl font-sans">
              FoundersPrime operates on a strict no-refund basis for all subscription plans and digital products. Please review our policy carefully before making a purchase.
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-800 flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            <span className="font-bold text-gray-900 dark:text-white">LAST_UPDATED:</span> JUN 21, 2026
          </p>
          <div className="bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded border border-gray-200 dark:border-neutral-700">
            <p className="text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Final Sale
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}