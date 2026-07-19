'use client'

import React from 'react'
import Link from 'next/link'

interface ProUpgradeModalProps {
    isOpen: boolean
    onClose: () => void
    isStudentBenefit?: boolean
}

export default function ProUpgradeModal({ isOpen, onClose, isStudentBenefit = false }: ProUpgradeModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity upgrade-modal-fade"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Card */}
            <div
                className="relative w-full max-w-md bg-white dark:bg-[#0c0c0e] border-2 border-black dark:border-white/10 shadow-[6px_6px_0px_#111,9px_9px_0px_#FFD500] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.05),9px_9px_0px_#FFD500] overflow-hidden upgrade-modal-pop z-50 rounded-lg text-gray-900 dark:text-white"
                role="dialog"
                aria-modal="true"
                aria-labelledby="upgrade-modal-title"
            >
                {/* Decorative mandalas */}
                <div className="absolute -top-12 -right-12 w-44 h-44 pointer-events-none opacity-[0.10] dark:opacity-[0.15]" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-accent-yellow upgrade-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.7">
                        <circle cx="100" cy="100" r="40" />
                        <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                        <circle cx="100" cy="100" r="80" strokeDasharray="1 6" />
                        {[0, 60, 120, 180, 240, 300].map((deg) => (
                            <g key={deg} transform={`rotate(${deg} 100 100)`}>
                                <line x1="100" y1="40" x2="100" y2="20" />
                                <circle cx="100" cy="20" r="2" fill="currentColor" />
                            </g>
                        ))}
                        <circle cx="100" cy="100" r="3" fill="currentColor" />
                    </svg>
                </div>
                <div className="absolute -bottom-10 -left-10 w-36 h-36 pointer-events-none opacity-[0.07] dark:opacity-[0.12]" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 dark:text-accent-yellow upgrade-mandala-spin-reverse" fill="none" stroke="currentColor" strokeWidth="0.6">
                        {[20, 35, 50, 65].map((r, i) => (
                            <ellipse
                                key={r}
                                cx="100"
                                cy="100"
                                rx={r}
                                ry={r / 1.8}
                                transform={`rotate(${i * 30} 100 100)`}
                            />
                        ))}
                        <circle cx="100" cy="100" r="2" fill="currentColor" />
                    </svg>
                </div>

                {/* Header */}
                <div className="relative bg-accent-yellow px-5 md:px-6 py-3 md:py-3.5 border-b-2 border-black dark:border-white/10 flex justify-between items-center">
                    <h2
                        id="upgrade-modal-title"
                        className="font-mono text-[13px] md:text-[15px] font-black uppercase tracking-[0.1em] leading-tight flex items-center gap-2 text-black"
                    >
                        <span className="material-symbols-outlined !text-[16px] md:!text-[18px]">
                            {isStudentBenefit ? 'school' : 'workspace_premium'}
                        </span>
                        {isStudentBenefit ? 'Membership Required' : 'Founder Members Only'}
                    </h2>
                    <button type="button"
                        onClick={onClose}
                        aria-label="Close upgrade dialog"
                        className="w-7 h-7 flex items-center justify-center bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-white/10 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black text-black dark:text-white transition-colors rounded-sm shadow-[1px_1px_0px_#111] dark:shadow-[1px_1px_0px_rgba(255,255,255,0.1)]"
                    >
                        <span className="material-symbols-outlined !text-[14px]">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="relative p-5 md:p-6 bg-white dark:bg-[#0c0c0e]">
                    {/* Icon block */}
                    <div className="flex flex-col items-center mb-4 md:mb-5">
                        <div className="relative w-14 h-14 md:w-16 md:h-16 mb-3.5">
                            {/* Inner mandala behind icon */}
                            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-accent-yellow upgrade-icon-mandala-spin opacity-50" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
                                <circle cx="100" cy="100" r="80" strokeDasharray="2 4" />
                                <circle cx="100" cy="100" r="60" strokeDasharray="3 3" />
                                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                                    <line
                                        key={deg}
                                        x1="100"
                                        y1="100"
                                        x2={100 + Math.cos((deg * Math.PI) / 180) * 90}
                                        y2={100 + Math.sin((deg * Math.PI) / 180) * 90}
                                    />
                                ))}
                            </svg>
                            <div className="absolute inset-2.5 bg-accent-yellow border-2 border-black dark:border-white/10 flex items-center justify-center shadow-[2px_2px_0px_#111] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.05)] rounded-sm upgrade-icon-pulse">
                                <span className="material-symbols-outlined text-2xl md:text-3xl text-black">
                                    {isStudentBenefit ? 'local_library' : 'rocket_launch'}
                                </span>
                            </div>
                        </div>

                        <h3 className="font-mono text-base md:text-lg font-black uppercase text-center mb-1.5 leading-tight tracking-tight text-black dark:text-white">
                            {isStudentBenefit ? 'Unlock student & founder benefits.' : 'Unlock the entire founder catalog.'}
                        </h3>
                        <p className="text-center text-gray-600 dark:text-gray-400 leading-relaxed text-[12.5px] md:text-[13px] max-w-sm">
                            {isStudentBenefit
                                ? "This benefit is available to Next' Founder (Students), Founder, and Legend members. Upgrade your account to claim it instantly."
                                : "This deal is reserved for Founder members. Upgrade now to claim it instantly — plus every credit, grant, and program in the dashboard."}
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="bg-gray-50 dark:bg-neutral-900/40 border-2 border-black dark:border-white/10 border-dashed rounded-sm p-3.5 md:p-4 mb-5">
                        <p className="font-mono text-[9.5px] font-black uppercase tracking-[0.14em] text-gray-500 dark:text-gray-450 mb-2.5 inline-flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-accent-yellow" />
                            What you unlock
                        </p>
                        <ul className="space-y-2">
                            {(isStudentBenefit
                                ? [
                                    '1000+ student benefits and verified discounts',
                                    'Premium AI, cloud & developer credits',
                                    'Grants, hackathons, and early-stage fellowships',
                                    'Also included in Founder & Legend plans',
                                  ]
                                : [
                                    'Unlimited deal claims across every category',
                                    'Grants, accelerators, and incubator programs',
                                    'Startup Ideas hub & validated problem database',
                                  ]
                            ).map((item) => (
                                <li key={item} className="flex items-start gap-2.5">
                                    <span
                                        className="material-symbols-outlined !text-[16px] text-amber-700 dark:text-accent-yellow flex-shrink-0 mt-0.5"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        check_circle
                                    </span>
                                    <span className="text-[12px] md:text-[12.5px] font-semibold text-gray-800 dark:text-gray-200">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Primary CTA */}
                    <Link
                        href="/pricing"
                        onClick={onClose}
                        className="group/cta relative flex items-center justify-center w-full bg-accent-yellow text-black font-mono font-black text-[12px] md:text-[13px] uppercase tracking-[0.1em] py-3 md:py-3.5 border-2 border-black dark:border-white/10 shadow-[3px_3px_0px_#111] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.05)] hover:bg-amber-300 dark:hover:bg-accent-yellow hover:shadow-[5px_5px_0px_#111] dark:hover:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] hover:-translate-x-px hover:-translate-y-px transition-all gap-2 overflow-hidden rounded-sm"
                    >
                        <span className="relative">Unlock Full Access</span>
                        <span className="material-symbols-outlined relative !text-[16px] group-hover/cta:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>

                    {/* Trust line */}
                    <p className="mt-3 text-center text-[10px] text-gray-500 dark:text-gray-400 font-mono leading-snug inline-flex items-center justify-center gap-1.5 w-full">
                        <span className="material-symbols-outlined !text-[11px]">lock</span>
                        Cancel renewals anytime · Instant access
                    </p>

                    {/* Maybe later */}
                    <button type="button"
                        onClick={onClose}
                        className="w-full mt-2.5 text-[10.5px] font-mono font-bold text-gray-400 hover:text-black dark:hover:text-white uppercase tracking-[0.1em] transition-colors"
                    >
                        Maybe later
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes upgradeModalFade {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes upgradeModalPop {
                    from { opacity: 0; transform: translateY(8px) scale(0.96); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes upgradeMandalaSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes upgradeMandalaSpinReverse {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                @keyframes upgradeIconPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.04); }
                }
                :global(.upgrade-modal-fade) {
                    animation: upgradeModalFade 0.2s ease-out;
                }
                :global(.upgrade-modal-pop) {
                    animation: upgradeModalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                :global(.upgrade-mandala-spin) {
                    animation: upgradeMandalaSpin 90s linear infinite;
                    transform-origin: center;
                }
                :global(.upgrade-mandala-spin-reverse) {
                    animation: upgradeMandalaSpinReverse 110s linear infinite;
                    transform-origin: center;
                }
                :global(.upgrade-icon-mandala-spin) {
                    animation: upgradeMandalaSpin 30s linear infinite;
                    transform-origin: center;
                }
                :global(.upgrade-icon-pulse) {
                    animation: upgradeIconPulse 2s ease-in-out infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    :global(.upgrade-modal-fade),
                    :global(.upgrade-modal-pop),
                    :global(.upgrade-mandala-spin),
                    :global(.upgrade-mandala-spin-reverse),
                    :global(.upgrade-icon-mandala-spin),
                    :global(.upgrade-icon-pulse) {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    )
}
