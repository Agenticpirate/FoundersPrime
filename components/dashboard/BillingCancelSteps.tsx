'use client'

import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { CancelStep } from './BillingCancelModal'

const FEEDBACK_OPTIONS = [
  'Too expensive / pricing',
  'Found a better alternative',
  'Missing features I need',
  'No longer need these credits/deals',
  'Other (please specify below)',
]

const stepSlide = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 18 : -18 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -18 : 18 }),
}

type Props = {
  cancelStep: CancelStep
  stepDir: number
  cancelReason: string
  setCancelReason: (v: string) => void
  cancelComments: string
  setCancelComments: (v: string) => void
  isCancelling: boolean
  cancelResult: { ok: boolean; message: string } | null
  renewalDate: string | null
  goStep: (next: CancelStep) => void
  handleCancel: () => void | Promise<void>
  closeModal: () => void
}

export default function BillingCancelSteps(props: Props) {
  const {
    cancelStep, stepDir, cancelReason, setCancelReason, cancelComments, setCancelComments,
    isCancelling, cancelResult, renewalDate, goStep, handleCancel, closeModal,
  } = props
  const reduce = useReducedMotion()

  return (
                <AnimatePresence mode="wait" custom={stepDir}>
                  {cancelStep === 'why' && (
                    <motion.div
                      key="why"
                      custom={stepDir}
                      variants={reduce ? undefined : stepSlide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3.5 mb-4 flex items-start gap-2.5">
                        <span className="material-symbols-outlined !text-[18px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                          verified_user
                        </span>
                        <p className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed">
                          You keep{' '}
                          <span className="font-semibold text-gray-900 dark:text-white">
                            full access until {renewalDate || 'period end'}
                          </span>
                          . We only stop future charges — nothing is cut off today.
                        </p>
                      </div>

                      <p className="text-[12px] font-medium text-gray-600 dark:text-zinc-400 mb-3">
                        What&apos;s the main reason? (helps us improve)
                      </p>
                      <div className="space-y-2 mb-4" role="radiogroup" aria-label="Cancellation reason">
                        {FEEDBACK_OPTIONS.map((opt) => {
                          const selected = cancelReason === opt
                          return (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3.5 min-h-[48px] rounded-xl border cursor-pointer transition-all ${
                                selected
                                  ? 'border-accent-yellow/50 bg-accent-yellow/[0.08] dark:bg-accent-yellow/[0.06] shadow-[0_0_0_1px_rgba(255,215,0,0.15)]'
                                  : 'border-black/[0.08] dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5'
                              }`}
                            >
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                  selected
                                    ? 'border-accent-yellow bg-accent-yellow'
                                    : 'border-gray-300 dark:border-white/25'
                                }`}
                              >
                                {selected && (
                                  <motion.span
                                    layoutId="reason-dot"
                                    className="h-2 w-2 rounded-full bg-black"
                                  />
                                )}
                              </span>
                              <input
                                type="radio"
                                name="cancelReason"
                                value={opt}
                                checked={selected}
                                onChange={(e) => setCancelReason(e.target.value)}
                                className="sr-only"
                              />
                              <span className="text-[12.5px] text-gray-800 dark:text-gray-200 font-medium">
                                {opt}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                      <textarea
                        value={cancelComments}
                        onChange={(e) => setCancelComments(e.target.value)}
                        placeholder="Anything else we should know? (optional)"
                        className="w-full h-20 p-3 text-[13px] rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white border border-black/10 dark:border-white/15 outline-none focus:border-accent-yellow/50 font-sans mb-5 resize-none transition-colors"
                        maxLength={500}
                      />
                      <div className="flex flex-col-reverse sm:flex-row gap-2.5">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex-1 min-h-[48px] rounded-xl border border-black/10 dark:border-white/15 font-mono text-[11px] font-bold uppercase text-gray-800 dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/5 transition-colors"
                        >
                          Keep my plan
                        </button>
                        <button
                          type="button"
                          onClick={() => goStep('review')}
                          className="flex-1 min-h-[48px] rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-mono text-[11px] font-black uppercase inline-flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-[0.99] transition-all"
                        >
                          Continue
                          <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {cancelStep === 'review' && (
                    <motion.div
                      key="review"
                      custom={stepDir}
                      variants={reduce ? undefined : stepSlide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <div className="rounded-2xl border border-black/[0.08] dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] p-4 mb-4">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">
                          What happens next
                        </p>
                        <ul className="space-y-3">
                          {[
                            {
                              icon: 'event_available',
                              title: 'Access stays active',
                              body: `Until ${renewalDate || 'the end of your period'}`,
                              tone: 'good' as const,
                            },
                            {
                              icon: 'credit_card_off',
                              title: 'No more charges',
                              body: 'Auto-renewal stops after this period',
                              tone: 'good' as const,
                            },
                            {
                              icon: 'restart_alt',
                              title: 'Easy to come back',
                              body: 'Resubscribe anytime before period end',
                              tone: 'good' as const,
                            },
                            {
                              icon: 'info',
                              title: 'Past payments',
                              body: 'Already-paid amounts are non-refundable',
                              tone: 'warn' as const,
                            },
                          ].map((row, i) => (
                            <motion.li
                              key={row.title}
                              initial={reduce ? false : { opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <span
                                className={`material-symbols-outlined !text-[18px] mt-0.5 ${
                                  row.tone === 'warn'
                                    ? 'text-amber-600'
                                    : 'text-emerald-600 dark:text-emerald-400'
                                }`}
                              >
                                {row.icon}
                              </span>
                              <span>
                                <span className="block text-[13px] font-semibold text-gray-900 dark:text-white">
                                  {row.title}
                                </span>
                                <span className="block text-[12px] text-gray-500 dark:text-zinc-400 mt-0.5">
                                  {row.body}
                                </span>
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-black/[0.06] dark:border-white/10 px-3.5 py-2.5 mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined !text-[16px] text-gray-400">
                          chat
                        </span>
                        <p className="text-[11px] text-gray-500 dark:text-zinc-500 font-mono truncate">
                          Reason:{' '}
                          <span className="text-gray-800 dark:text-zinc-300">{cancelReason}</span>
                        </p>
                      </div>

                      <div className="flex flex-col-reverse sm:flex-row gap-2.5">
                        <button
                          type="button"
                          onClick={() => goStep('why')}
                          disabled={isCancelling}
                          className="flex-1 min-h-[48px] rounded-xl border border-black/10 dark:border-white/15 font-mono text-[11px] font-bold uppercase disabled:opacity-50 hover:bg-black/[0.03] dark:hover:bg-white/5 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleCancel}
                          disabled={isCancelling}
                          className="flex-1 min-h-[48px] rounded-xl bg-red-500 hover:bg-red-600 text-white font-mono text-[11px] font-black uppercase inline-flex items-center justify-center gap-1.5 disabled:opacity-60 transition-colors active:scale-[0.99]"
                        >
                          {isCancelling ? (
                            <>
                              <span className="material-symbols-outlined !text-[16px] animate-spin">
                                progress_activity
                              </span>
                              Cancelling…
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined !text-[16px]">check</span>
                              Confirm cancel renewal
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {cancelStep === 'done' && (
                    <motion.div
                      key="done"
                      custom={stepDir}
                      variants={reduce ? undefined : stepSlide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="text-center py-2"
                    >
                      <motion.div
                        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 relative"
                      >
                        <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-40" />
                        <span className="material-symbols-outlined !text-[32px] text-emerald-500 relative">
                          check_circle
                        </span>
                      </motion.div>
                      <h3 className="font-mono text-lg font-black text-gray-900 dark:text-white mb-2">
                        Auto-renewal cancelled
                      </h3>
                      <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed mb-2 max-w-sm mx-auto">
                        {cancelResult?.message ||
                          `You keep full access until ${renewalDate || 'period end'}. No further charges.`}
                      </p>
                      {renewalDate && (
                        <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-6">
                          <span className="material-symbols-outlined !text-[14px]">event</span>
                          Access through {renewalDate}
                        </p>
                      )}
                      {!renewalDate && <div className="mb-6" />}
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex-1 min-h-[48px] rounded-xl bg-accent-yellow text-black font-mono text-[11px] font-black uppercase hover:bg-yellow-300 transition-colors"
                        >
                          Back to billing
                        </button>
                        <Link
                          href="/deals"
                          onClick={closeModal}
                          className="flex-1 min-h-[48px] rounded-xl border border-black/10 dark:border-white/15 font-mono text-[11px] font-bold uppercase inline-flex items-center justify-center text-gray-800 dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/5 transition-colors"
                        >
                          Browse deals
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

  )
}
