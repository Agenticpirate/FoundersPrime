'use client'

import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { RefObject, Dispatch, SetStateAction } from 'react'
import BillingCancelSteps from './BillingCancelSteps'

const CANCEL_STEPS = [
    { id: 'why' as const, label: 'Reason' },
    { id: 'review' as const, label: 'Review' },
    { id: 'done' as const, label: 'Done' },
  ]

export type CancelStep = 'why' | 'review' | 'done'

export type BillingCancelModalProps = {
  show: boolean
  cancelStep: CancelStep
  stepDir: number
  cancelReason: string
  setCancelReason: Dispatch<SetStateAction<string>>
  cancelComments: string
  setCancelComments: Dispatch<SetStateAction<string>>
  isCancelling: boolean
  cancelResult: { ok: boolean; message: string } | null
  renewalDate: string | null
  // useRef(null) typing vs motion.div ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalRef: any
  goStep: (next: CancelStep) => void
  handleCancel: () => void | Promise<void>
  closeModal: () => void
}

export default function BillingCancelModal({
  show,
  cancelStep,
  stepDir,
  cancelReason,
  setCancelReason,
  cancelComments,
  setCancelComments,
  isCancelling,
  cancelResult,
  renewalDate,
  modalRef,
  goStep,
  handleCancel,
  closeModal,
}: BillingCancelModalProps) {
  const reduce = useReducedMotion()
  const cancelStepIndex = CANCEL_STEPS.findIndex((s) => s.id === cancelStep)

  return (
      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
              onClick={() => {
                if (isCancelling) return
                // Allow backdrop close on why/done; soft-block on review
                if (cancelStep !== 'review') closeModal()
              }}
              aria-hidden
            />
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cancel-modal-title"
              tabIndex={-1}
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0c0c0c] shadow-2xl outline-none"
            >
              {/* Drag handle (mobile) */}
              <div className="sm:hidden flex justify-center pt-2.5 pb-0" aria-hidden>
                <div className="w-10 h-1 rounded-full bg-black/15 dark:bg-white/20" />
              </div>

              {/* Progress header */}
              <div className="px-5 pt-4 sm:pt-5 pb-3 border-b border-black/5 dark:border-white/10 sticky top-0 bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-md z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    id="cancel-modal-title"
                    className="font-mono text-[12px] font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white"
                  >
                    {cancelStep === 'why' && 'Cancel auto-renewal'}
                    {cancelStep === 'review' && 'Confirm your choice'}
                    {cancelStep === 'done' && "You're all set"}
                  </h2>
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isCancelling}
                    aria-label="Close"
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/10 dark:border-white/15 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
                  >
                    <span className="material-symbols-outlined !text-[16px]">close</span>
                  </button>
                </div>

                {/* Step indicators */}
                <div className="flex items-center gap-0">
                  {CANCEL_STEPS.map((s, i) => {
                    const done = i < cancelStepIndex || cancelStep === 'done'
                    const active = s.id === cancelStep
                    return (
                      <div key={s.id} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1.5 min-w-[56px]">
                          <motion.div
                            animate={{
                              scale: active ? 1.05 : 1,
                              backgroundColor:
                                done || active
                                  ? 'rgb(255, 215, 0)'
                                  : 'rgba(128,128,128,0.15)',
                            }}
                            className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] font-black ${
                              done || active
                                ? 'text-black'
                                : 'text-gray-400 dark:text-zinc-500'
                            }`}
                          >
                            {done && !active ? (
                              <span className="material-symbols-outlined !text-[14px]">check</span>
                            ) : (
                              i + 1
                            )}
                          </motion.div>
                          <span
                            className={`font-mono text-[9px] font-bold uppercase tracking-wide ${
                              active || done
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-400 dark:text-zinc-600'
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                        {i < CANCEL_STEPS.length - 1 && (
                          <div className="flex-1 h-0.5 mx-1 mb-5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                            <motion.div
                              initial={false}
                              animate={{
                                scaleX: i < cancelStepIndex || cancelStep === 'done' ? 1 : 0,
                              }}
                              transition={{ duration: 0.35, ease: 'easeOut' }}
                              style={{ transformOrigin: 'left center' }}
                              className="h-full w-full bg-accent-yellow"
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="p-5 md:p-6">
                <BillingCancelSteps
                  cancelStep={cancelStep}
                  stepDir={stepDir}
                  cancelReason={cancelReason}
                  setCancelReason={setCancelReason}
                  cancelComments={cancelComments}
                  setCancelComments={setCancelComments}
                  isCancelling={isCancelling}
                  cancelResult={cancelResult}
                  renewalDate={renewalDate}
                  goStep={goStep}
                  handleCancel={handleCancel}
                  closeModal={closeModal}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

  )
}
