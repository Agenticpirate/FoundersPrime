'use client'

import { formatDateShort } from '@/lib/format-date'

type Props = {
  submission: any
  featuredPlanLabel: string
  featuredPlanPrice: string
  featuredPlanDuration: string
  paymentLink: string
  generatingLink: boolean
  onGeneratePaymentLink: () => void
  onCopyPaymentLink: () => void
}

/** Identical markup extracted from AdminSubmissionDetailClient — admin-only, no public UI impact */
export default function AdminSubmissionSidebar({
  submission,
  featuredPlanLabel,
  featuredPlanPrice,
  featuredPlanDuration,
  paymentLink,
  generatingLink,
  onGeneratePaymentLink,
  onCopyPaymentLink,
}: Props) {
  return (
                    <div className="space-y-4">
                        <div className="bg-[#0d0e12] border border-white/10 rounded-xl p-5">
                            <h2 className="text-[11px] font-black uppercase mb-3 text-zinc-400 tracking-wider">Logo preview</h2>
                            <div className="w-full aspect-square rounded-lg border border-white/10 bg-white/5 flex items-center justify-center p-4">
                                {submission.logo_url ? (
                                    <img src={submission.logo_url} alt="Logo" className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <span className="text-zinc-600 text-xs font-mono">No logo</span>
                                )}
                            </div>
                        </div>
                        <div className="bg-[#0d0e12] border border-white/10 rounded-xl p-5">
                            <h2 className="text-[11px] font-black uppercase mb-3 text-zinc-400 tracking-wider">Contact</h2>
                            <div>
                                <span className="block text-[10px] font-bold uppercase text-zinc-500 mb-1">Submitter email</span>
                                {submission.submitter_email ? (
                                    <a href={`mailto:${submission.submitter_email}`} className="text-sky-400 hover:underline font-bold text-sm break-all">
                                        {submission.submitter_email}
                                    </a>
                                ) : (
                                    <p className="text-zinc-600 text-sm font-mono">Not provided</p>
                                )}
                            </div>
                        </div>

                        {/* Featured Listing — only shown if requested */}
                        {submission.featured_requested && (
                            <div className="bg-[#0d0e12] border border-white/10 p-6 ">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-black uppercase flex items-center gap-1">
                                        <span className="text-amber-500">⭐</span> Featured Listing
                                    </h2>
                                    {submission.featured_paid ? (
                                        <span className="bg-emerald-600 text-white border border-white/15 px-2 py-0.5 text-[9px] font-black uppercase">PAID</span>
                                    ) : (
                                        <span className="bg-orange-500 text-white border border-white/15 px-2 py-0.5 text-[9px] font-black uppercase">UNPAID</span>
                                    )}
                                </div>

                                <div className="mb-3 flex items-center gap-2">
                                    <span className="bg-black text-accent-yellow border border-white/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide">
                                        {featuredPlanLabel} · {featuredPlanPrice}
                                    </span>
                                </div>

                                <p className="text-xs text-zinc-400 mb-3 leading-snug">
                                    Submitter requested a Featured listing ({featuredPlanPrice} / {featuredPlanDuration}).
                                    {submission.status === 'pending' && ' Approve the submission first, then generate the payment link.'}
                                </p>

                                {submission.featured_paid && submission.featured_until && (
                                    <div className="bg-green-50 border-2 border-green-500 p-2 mb-3 text-xs font-bold text-green-800">
                                        Pinned until {formatDateShort(submission.featured_until)}
                                    </div>
                                )}

                                {/* Generate payment link */}
                                {submission.status === 'approved' && !submission.featured_paid && (
                                    <>
                                        {!paymentLink ? (
                                            <button type="button"
                                                onClick={onGeneratePaymentLink}
                                                disabled={generatingLink}
                                                className="w-full px-3 py-2 bg-accent-yellow text-black font-black uppercase text-xs border border-accent-yellow  hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {generatingLink ? 'Generating…' : 'Generate Payment Link'}
                                            </button>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="bg-white/5 border border-white/15 p-2 text-[10px] font-mono break-all text-zinc-300">
                                                    {paymentLink}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button type="button"
                                                        onClick={onCopyPaymentLink}
                                                        className="px-2 py-1.5 bg-black text-white font-bold uppercase text-[10px] border border-white/15 hover:bg-gray-800"
                                                    >
                                                        Copy
                                                    </button>
                                                    <a
                                                        href={`mailto:${submission.submitter_email || ''}?subject=${encodeURIComponent('Your Featured Listing payment link')}&body=${encodeURIComponent(`Hi,\n\nThanks for choosing Featured listing for ${submission.company_name} on FoundersPrime.\n\nPay ${featuredPlanPrice} here to activate your ${featuredPlanDuration} pinned placement:\n\n${paymentLink}\n\n— FoundersPrime`)}`}
                                                        className="px-2 py-1.5 bg-blue-500 text-white font-bold uppercase text-[10px] border border-white/15 hover:bg-blue-600 text-center"
                                                    >
                                                        Email it
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {submission.status === 'pending' && (
                                    <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 p-2 font-bold">
                                        Approve the submission to enable payment link.
                                    </p>
                                )}

                                {(submission.status === 'rejected' || submission.status === 'changes_requested') && !submission.featured_paid && (
                                    <p className="text-[11px] text-zinc-500">
                                        No payment due — submission was {submission.status.replace('_', ' ')}.
                                    </p>
                                )}

                                {submission.featured_paid && (
                                    <a
                                        href="https://app.dodopayments.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-3 py-2 rounded-lg bg-transparent font-bold uppercase text-[11px] border border-red-500/50 text-red-400 hover:bg-red-500/10"
                                    >
                                        Refund in Dodo →
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
  )
}
