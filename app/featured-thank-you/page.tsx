'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/Header'

function ThankYouContent() {
    const params = useSearchParams()
    const submissionId = params.get('submission')
    const status = params.get('status')

    // Dodo appends ?status=... on some return flows. Treat anything that isn't
    // an explicit failure as success, since the webhook is the source of truth.
    const failed = status === 'failed' || status === 'cancelled'

    return (
        <div className="min-h-screen bg-background-light flex flex-col font-mono">
            <Header />
            <main className="flex-grow flex items-center justify-center py-10 px-4 grid-bg">
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                    className="relative bg-white border-[3px] border-black p-6 md:p-10 text-center shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000] max-w-xl w-full overflow-hidden"
                >
                    {!failed && (
                        <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
                            {[...Array(8)].map((_, i) => {
                                const angle = (i / 8) * Math.PI * 2
                                return (
                                    <motion.span
                                        key={i}
                                        className="absolute top-[64px] md:top-[80px] w-2 h-2 bg-accent-yellow border border-black"
                                        initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            x: Math.cos(angle) * 90,
                                            y: Math.sin(angle) * 90,
                                            scale: [0, 1, 0.4],
                                        }}
                                        transition={{ duration: 0.9, delay: 0.25 + i * 0.02, ease: 'easeOut' }}
                                    />
                                )
                            })}
                        </div>
                    )}

                    <motion.div
                        initial={{ scale: 0, rotate: -25 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                        className={`relative inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border-2 mb-4 ${
                            failed ? 'bg-red-100 border-red-600' : 'bg-amber-100 border-amber-600'
                        }`}
                    >
                        <span
                            className={`material-symbols-outlined text-5xl md:text-6xl ${failed ? 'text-red-600' : 'text-amber-600'}`}
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            {failed ? 'error' : 'star'}
                        </span>
                    </motion.div>

                    {failed ? (
                        <>
                            <h1 className="text-xl md:text-2xl font-black mb-2 uppercase tracking-tight">Payment Not Completed</h1>
                            <p className="text-sm md:text-base text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                                It looks like your payment didn't go through. Your deal is safe — no charge was made.
                                You can retry from the payment link we emailed you, or reach out and we'll help.
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-xl md:text-2xl font-black mb-2 uppercase tracking-tight">You're Featured! 🎉</h1>
                            <p className="text-sm md:text-base text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                                Payment received. Your deal is being pinned to the top with a Featured badge.
                                It usually goes live within a few minutes once payment confirms.
                            </p>

                            <motion.ol
                                initial="hidden"
                                animate="show"
                                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } } }}
                                className="text-left max-w-md mx-auto space-y-3 mb-6"
                            >
                                {[
                                    { n: '1', t: 'Payment confirmed', d: 'We received your Featured listing payment.' },
                                    { n: '2', t: 'Listing pinned', d: 'Your deal is pinned to the top with the ⭐ Featured badge.' },
                                    { n: '3', t: 'Receipt on the way', d: 'A payment receipt is sent to your email.' },
                                ].map((step) => (
                                    <motion.li
                                        key={step.n}
                                        variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                                        className="flex items-start gap-3 bg-gray-50 border-2 border-black p-3 shadow-[2px_2px_0px_#111]"
                                    >
                                        <span className="bg-black text-accent-yellow w-6 h-6 flex items-center justify-center text-xs font-black shrink-0 shadow-[2px_2px_0px_#111]">
                                            {step.n}
                                        </span>
                                        <div>
                                            <p className="font-black uppercase text-xs md:text-sm tracking-tight">{step.t}</p>
                                            <p className="text-[11px] md:text-xs text-gray-600 leading-snug">{step.d}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ol>
                        </>
                    )}

                    {submissionId && (
                        <p className="text-[10px] md:text-[11px] text-gray-400 mb-4 uppercase tracking-wide">
                            Reference: {submissionId}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Link
                            href="/deals"
                            className="px-6 py-3 bg-black text-white font-mono font-bold text-sm uppercase border-2 border-black hover:bg-accent-yellow hover:text-black transition-colors shadow-[3px_3px_0px_#888]"
                        >
                            Browse Deals
                        </Link>
                        <Link
                            href="/contact"
                            className="px-6 py-3 bg-white text-black font-mono font-bold text-sm uppercase border-2 border-black hover:bg-gray-100 transition-colors shadow-[3px_3px_0px_#888]"
                        >
                            Contact Support
                        </Link>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

export default function FeaturedThankYouPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background-light" />}>
            <ThankYouContent />
        </Suspense>
    )
}
