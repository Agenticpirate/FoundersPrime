'use client'

import React from 'react'
import Link from 'next/link'

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
            <div className="relative w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#111111] overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">

                {/* Header */}
                <div className="bg-primary px-6 py-4 border-b-4 border-black flex justify-between items-center">
                    <h2 className="font-mono text-xl font-bold uppercase leading-tight flex items-center gap-2">
                        <span className="material-symbols-outlined">lock</span> Unlock Deal
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-black/10 rounded-full transition-colors flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined text-black font-bold">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 bg-white">
                    <div className="flex flex-col items-center mb-6">
                        <div className="h-16 w-16 bg-yellow-100 rounded-full border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)] mb-4">
                            <span className="material-symbols-outlined text-4xl text-black">workspace_premium</span>
                        </div>

                        <h3 className="text-xl font-black uppercase text-center mb-2">Pro Access Required</h3>
                        <p className="text-center text-gray-600 leading-relaxed text-sm max-w-xs">
                            This verified deal is exclusive to FoundersPrime Pro members.
                        </p>
                    </div>

                    <div className="bg-gray-50 border-2 border-black p-4 mb-6 rounded-sm">
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-600 text-lg mt-0.5 shrink-0">check_circle</span>
                                <span className="text-sm font-bold">Instant Access to Application</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-600 text-lg mt-0.5 shrink-0">check_circle</span>
                                <span className="text-sm font-bold">Concierge Support Team</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-600 text-lg mt-0.5 shrink-0">check_circle</span>
                                <span className="text-sm font-bold">Verified Grant Database</span>
                            </li>
                        </ul>
                    </div>

                    <Link
                        href="/pricing"
                        className="flex items-center justify-center w-full bg-black text-white font-mono font-bold text-base uppercase py-4 border-2 border-transparent shadow-[4px_4px_0px_#666] hover:shadow-[2px_2px_0px_#666] hover:translate-x-[2px] hover:translate-y-[2px] transition-all gap-2"
                    >
                        Upgrade to Pro <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>

                    <button
                        onClick={onClose}
                        className="w-full mt-4 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-wide hover:underline text-center"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    )
}
