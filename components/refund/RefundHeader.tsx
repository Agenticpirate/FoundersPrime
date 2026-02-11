'use client'

import { ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'

export default function RefundHeader() {
  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-4">
        <Link href="/" className="hover:text-black transition-colors uppercase">
          Home
        </Link>
        <span>/</span>
        <span className="text-black font-bold uppercase">Refund Policy</span>
      </div>

      {/* Header */}
      <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_#1a1a1a] rounded-sm p-6">
        <div className="flex items-start gap-4">
          <div className="bg-accent-yellow border-2 border-black p-2 shadow-[2px_2px_0px_0px_#1a1a1a] rounded-sm hidden sm:block">
            <Shield className="w-6 h-6 text-black" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-mono text-black mb-2 uppercase tracking-tight">
              REFUND_POLICY
            </h1>
            <p className="text-sm text-gray-800 leading-relaxed max-w-2xl font-sans">
              FoundersPrime operates on a strict no-refund basis for all subscription plans and digital products. Please review our policy carefully before making a purchase.
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-4 pt-4 border-t-2 border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-mono">
            <span className="font-bold text-black">LAST_UPDATED:</span> JAN 31, 2026
          </p>
          <div className="bg-gray-100 px-2 py-1 rounded-sm border border-gray-200">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
              Final Sale
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}