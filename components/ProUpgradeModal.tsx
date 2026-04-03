'use client'

import React from 'react'
import Link from 'next/link'
import { GlowingEffect } from '@/components/ui/GlowingEffect'

interface ProUpgradeModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ProUpgradeModal({ isOpen, onClose }: ProUpgradeModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-sm md:max-w-md bg-white border-3 md:border-4 border-black shadow-[4px_4px_0px_#111111] md:shadow-[8px_8px_0px_#111111] overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">

                {/* Header */}
                <div className="bg-[#00D4FF] px-4 md:px-6 py-3 md:py-4 border-b-3 border-black flex justify-between items-center">
                    <h2 className="font-mono text-base md:text-xl font-bold uppercase leading-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-base md:text-xl">workspace_premium</span> Unlock Full Access
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-black/10 rounded-full transition-colors flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined text-black font-bold text-base md:text-xl">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 md:p-6 bg-white">
                    <div className="flex flex-col items-center mb-4 md:mb-6">
                        <div className="h-12 w-12 md:h-16 md:w-16 bg-yellow-100 border-2 md:border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,0.1)] mb-3 md:mb-4">
                            <span className="material-symbols-outlined text-3xl md:text-4xl text-black">rocket_launch</span>
                        </div>

                        <h3 className="text-base md:text-xl font-black uppercase text-center mb-1.5 md:mb-2">This is a Founder Plan Deal</h3>
                        <p className="text-center text-gray-600 leading-relaxed text-xs md:text-sm max-w-xs">
                            Upgrade to access this verified deal along with hundreds of credits, grants, and opportunities.
                        </p>
                    </div>

                    <div className="bg-gray-50 border-2 border-black p-3 md:p-4 mb-4 md:mb-6">
                        <ul className="space-y-2 md:space-y-3">
                            <li className="flex items-start gap-2 md:gap-3">
                                <span className="material-symbols-outlined text-green-600 text-base md:text-lg mt-0.5 shrink-0">check_circle</span>
                                <span className="text-xs md:text-sm font-bold">Instant Access to All Deals</span>
                            </li>
                            <li className="flex items-start gap-2 md:gap-3">
                                <span className="material-symbols-outlined text-green-600 text-base md:text-lg mt-0.5 shrink-0">check_circle</span>
                                <span className="text-xs md:text-sm font-bold">Grants, Accelerators & Programs</span>
                            </li>
                            <li className="flex items-start gap-2 md:gap-3">
                                <span className="material-symbols-outlined text-green-600 text-base md:text-lg mt-0.5 shrink-0">check_circle</span>
                                <span className="text-xs md:text-sm font-bold">Priority Concierge Support</span>
                            </li>
                        </ul>
                    </div>

                    <div className="relative">
                      <GlowingEffect
                        spread={40}
                        glow={false}
                        disabled={false}
                        proximity={48}
                        inactiveZone={0.01}
                        borderWidth={2}
                      />
                      <Link
                        href="/pricing"
                        className="relative flex items-center justify-center w-full bg-black text-white font-mono font-bold text-sm md:text-base uppercase py-3 md:py-4 border-2 border-transparent shadow-[3px_3px_0px_#666] hover:shadow-[1px_1px_0px_#666] hover:translate-x-[2px] hover:translate-y-[2px] transition-all gap-2"
                      >
                        View Pricing Plans <span className="material-symbols-outlined text-base md:text-lg">arrow_forward</span>
                      </Link>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full mt-3 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-wide hover:underline text-center"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    )
}
