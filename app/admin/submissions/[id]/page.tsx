'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminSubmissionDetail() {
    const { id } = useParams()
    const router = useRouter()
    const [submission, setSubmission] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [adminNote, setAdminNote] = useState('')

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const res = await fetch(`/api/admin/submissions/${id}`)
                const json = await res.json()
                if (res.ok && json.submission) {
                    setSubmission(json.submission)
                    setAdminNote(json.submission.admin_notes || '')
                } else {
                    console.error('Error fetching submission:', json.error)
                }
            } catch (e) {
                console.error('Error fetching submission:', e)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchSubmission()
    }, [id])

    const [paymentLink, setPaymentLink] = useState<string>('')
    const [generatingLink, setGeneratingLink] = useState(false)

    const handleGeneratePaymentLink = async () => {
        setGeneratingLink(true)
        try {
            const res = await fetch('/api/admin/featured-payment-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ submissionId: submission.id }),
            })
            const data = await res.json()
            if (res.ok && data.url) {
                setPaymentLink(data.url)
            } else {
                alert(data.error || 'Failed to generate payment link')
            }
        } catch (err) {
            alert('Network error generating payment link')
        } finally {
            setGeneratingLink(false)
        }
    }

    const copyPaymentLink = () => {
        navigator.clipboard.writeText(paymentLink)
        alert('Payment link copied to clipboard')
    }

    const handleAction = async (action: 'approve' | 'reject' | 'request_changes') => {
        if (!confirm(`Are you sure you want to ${action.replace('_', ' ')} this submission?`)) return

        setProcessing(true)
        try {
            const response = await fetch('/api/admin/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: submission.id,
                    action,
                    admin_notes: adminNote
                })
            })

            if (response.ok) {
                alert('Action completed successfully!')
                router.push('/admin/submissions')
            } else {
                const error = await response.json()
                alert(`Error: ${error.message || 'Action failed'}`)
            }
        } catch (error) {
            console.error('Action error:', error)
            alert('An unexpected error occurred.')
        } finally {
            setProcessing(false)
        }
    }

    if (loading) return <div className="p-8 font-mono">Loading details...</div>
    if (!submission) return <div className="p-8 font-mono">Submission not found.</div>

    return (
        <div className="min-h-screen bg-background-light p-8 font-mono text-[#111]">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/submissions" className="inline-flex items-center gap-2 text-sm font-bold uppercase mb-6 hover:underline text-gray-600">
                    <span className="material-symbols-outlined text-sm">arrow_back</span> Back to List
                </Link>

                <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">{submission.company_name}</h1>
                        <div className="flex flex-wrap gap-2">
                            <span className={`inline-block px-2 py-1 text-[10px] font-black uppercase border border-black ${submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-blue-100 text-blue-800'
                                }`}>
                                {submission.status.replace('_', ' ')}
                            </span>
                            {submission.is_exclusive && (
                                <span className="inline-block px-2 py-1 text-[10px] font-black uppercase border border-black bg-purple-100 text-purple-800">
                                    Exclusive
                                </span>
                            )}
                            {submission.featured_requested && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-black uppercase border border-black bg-accent-yellow text-black">
                                    ⭐ Featured Requested
                                    {submission.featured_paid ? (
                                        <span className="ml-1 bg-green-500 text-white px-1 text-[9px]">PAID</span>
                                    ) : (
                                        <span className="ml-1 bg-orange-500 text-white px-1 text-[9px]">UNPAID</span>
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-500 uppercase">Submitted On</p>
                        <p className="font-bold">{new Date(submission.created_at).toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white border-3 border-[#111] p-6 shadow-[4px_4px_0_0_#000]">
                            <h2 className="text-lg font-black uppercase border-b-2 border-gray-100 pb-2 mb-4">Deal Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Benefit</label>
                                    <p className="font-bold text-lg">{submission.benefit_description}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category / Value</label>
                                    <p className="font-medium">{submission.category} • ${submission.deal_value}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Company Website</label>
                                    <a href={submission.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                        {submission.website_url}
                                    </a>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Redemption</label>
                                    <p className="font-medium">
                                        <span className="bg-gray-200 px-1 rounded uppercase text-xs">{submission.redemption_method}</span>
                                        <span className="ml-2 font-mono bg-gray-100 p-1">{submission.redemption_link}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div className="bg-white border-3 border-[#111] p-6 shadow-[4px_4px_0_0_#000]">
                            <h2 className="text-lg font-black uppercase border-b-2 border-gray-100 pb-2 mb-4">Admin Actions</h2>

                            <div className="mb-4">
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Admin Notes / Reason</label>
                                <textarea
                                    className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none font-medium h-24"
                                    placeholder="Enter notes for rejection or requested changes..."
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => handleAction('approve')}
                                    disabled={processing || submission.status === 'approved'}
                                    className="px-6 py-2 bg-green-500 text-white font-black uppercase border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-px hover:shadow-none hover:border-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Approve & Publish
                                </button>
                                <button
                                    onClick={() => handleAction('request_changes')}
                                    disabled={processing}
                                    className="px-6 py-2 bg-blue-500 text-white font-black uppercase border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-px hover:shadow-none hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Request Changes
                                </button>
                                <button
                                    onClick={() => handleAction('reject')}
                                    disabled={processing || submission.status === 'rejected'}
                                    className="px-6 py-2 bg-red-500 text-white font-black uppercase border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-px hover:shadow-none hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white border-3 border-[#111] p-6 shadow-[4px_4px_0_0_#000]">
                            <h2 className="text-sm font-black uppercase mb-4 text-center">Logo Preview</h2>
                            <div className="w-full aspect-square border-2 border-gray-100 flex items-center justify-center p-4">
                                {submission.logo_url ? (
                                    <img src={submission.logo_url} alt="Logo" className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <span className="text-gray-400 text-xs">No Logo</span>
                                )}
                            </div>
                        </div>
                        <div className="bg-white border-3 border-[#111] p-6 shadow-[4px_4px_0_0_#000]">
                            <h2 className="text-sm font-black uppercase mb-4">Contact Info</h2>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Submitter Email</label>
                                <a href={`mailto:${submission.submitter_email}`} className="text-blue-600 hover:underline font-bold text-sm truncate block">
                                    {submission.submitter_email}
                                </a>
                            </div>
                        </div>

                        {/* Featured Listing — only shown if requested */}
                        {submission.featured_requested && (
                            <div className="bg-white border-3 border-[#111] p-6 shadow-[4px_4px_0_0_#000]">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-black uppercase flex items-center gap-1">
                                        <span className="text-amber-500">⭐</span> Featured Listing
                                    </h2>
                                    {submission.featured_paid ? (
                                        <span className="bg-green-500 text-white border border-black px-2 py-0.5 text-[9px] font-black uppercase">PAID</span>
                                    ) : (
                                        <span className="bg-orange-500 text-white border border-black px-2 py-0.5 text-[9px] font-black uppercase">UNPAID</span>
                                    )}
                                </div>

                                <p className="text-xs text-gray-600 mb-3 leading-snug">
                                    Submitter requested a Featured listing ($99 / 30 days).
                                    {submission.status === 'pending' && ' Approve the submission first, then generate the payment link.'}
                                </p>

                                {submission.featured_paid && submission.featured_until && (
                                    <div className="bg-green-50 border-2 border-green-500 p-2 mb-3 text-xs font-bold text-green-800">
                                        Pinned until {new Date(submission.featured_until).toLocaleDateString()}
                                    </div>
                                )}

                                {/* Generate payment link */}
                                {submission.status === 'approved' && !submission.featured_paid && (
                                    <>
                                        {!paymentLink ? (
                                            <button
                                                onClick={handleGeneratePaymentLink}
                                                disabled={generatingLink}
                                                className="w-full px-3 py-2 bg-amber-400 text-black font-black uppercase text-xs border-2 border-black shadow-[2px_2px_0_0_#000] hover:translate-y-px hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {generatingLink ? 'Generating…' : 'Generate Payment Link'}
                                            </button>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="bg-gray-100 border border-gray-300 p-2 text-[10px] font-mono break-all">
                                                    {paymentLink}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={copyPaymentLink}
                                                        className="px-2 py-1.5 bg-black text-white font-bold uppercase text-[10px] border-2 border-black hover:bg-gray-800"
                                                    >
                                                        Copy
                                                    </button>
                                                    <a
                                                        href={`mailto:${submission.submitter_email || ''}?subject=${encodeURIComponent('Your Featured Listing payment link')}&body=${encodeURIComponent(`Hi,\n\nThanks for choosing Featured listing for ${submission.company_name} on FoundersPrime.\n\nPay $99 here to activate your 30-day pinned placement:\n\n${paymentLink}\n\n— FoundersPrime`)}`}
                                                        className="px-2 py-1.5 bg-blue-500 text-white font-bold uppercase text-[10px] border-2 border-black hover:bg-blue-600 text-center"
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
                                    <p className="text-[11px] text-gray-500">
                                        No payment due — submission was {submission.status.replace('_', ' ')}.
                                    </p>
                                )}

                                {submission.featured_paid && (
                                    <a
                                        href="https://app.dodopayments.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-3 py-2 bg-white text-black font-bold uppercase text-[11px] border-2 border-red-500 text-red-600 hover:bg-red-50"
                                    >
                                        Refund in Dodo →
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
