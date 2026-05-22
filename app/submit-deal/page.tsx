'use client'

import { useState, useRef, useEffect } from 'react'
import Header from '@/components/Header'

export default function SubmitDealPage() {
    const [logoMethod, setLogoMethod] = useState<'url' | 'upload'>('url')
    const [previewUrl, setPreviewUrl] = useState<string>('')
    const [challenge, setChallenge] = useState({ num1: 0, num2: 0, answer: '' })
    const [securityAnswer, setSecurityAnswer] = useState('')
    const [isHuman, setIsHuman] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Generate dynamic challenge on client mount
    useEffect(() => {
        const num1 = Math.floor(Math.random() * 10) + 1
        const num2 = Math.floor(Math.random() * 10) + 1
        setChallenge({
            num1,
            num2,
            answer: (num1 + num2).toString()
        })
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    }

    const checkSecurity = (val: string) => {
        setSecurityAnswer(val)
        setIsHuman(val.trim() === challenge.answer)
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [tier, setTier] = useState<'standard' | 'featured'>('standard')

    // Track when the form was first rendered (for anti-bot fill-time check)
    const formLoadedAt = useRef<number>(Date.now())
    useEffect(() => {
        formLoadedAt.current = Date.now()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isHuman) {
            setErrorMessage('Please complete the security check correctly.')
            setSubmissionStatus('error')
            return
        }

        setIsSubmitting(true)
        setSubmissionStatus('idle')
        setErrorMessage('')

        const formData = new FormData(e.currentTarget)
        const data = {
            company_name: formData.get('company_name'),
            website_url: formData.get('website_url'),
            logo_url: logoMethod === 'url' ? formData.get('logo_url') : previewUrl,
            benefit_description: formData.get('benefit_description'),
            category: formData.get('category'),
            deal_value: formData.get('deal_value'),
            redemption_method: formData.get('redemption'),
            redemption_link: formData.get('redemption_link'),
            is_exclusive: formData.get('is_exclusive') === 'on',
            submitter_email: formData.get('submitter_email'),
            featured_requested: tier === 'featured',
            // Anti-bot signals
            website_link: formData.get('website_link'), // honeypot — should be empty
            fill_time_ms: Date.now() - formLoadedAt.current,
        }

        try {
            const response = await fetch('/api/submit-deal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json().catch(() => ({}))

            if (response.ok) {
                setSubmissionStatus('success')
                e.currentTarget.reset()
                setPreviewUrl('')
                setIsHuman(false)
                setSecurityAnswer('')
                const num1 = Math.floor(Math.random() * 10) + 1
                const num2 = Math.floor(Math.random() * 10) + 1
                setChallenge({ num1, num2, answer: (num1 + num2).toString() })
            } else {
                setSubmissionStatus('error')
                setErrorMessage(result?.error || `Submission failed (${response.status}). Please try again.`)
            }
        } catch (error) {
            console.error('Submission error:', error)
            setSubmissionStatus('error')
            setErrorMessage('Network error. Please check your connection and try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-background-light flex flex-col font-mono">
            <Header />

            <main className="flex-grow py-4 md:py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-4 md:mb-6 text-center">
                        <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 uppercase">Submit Your Deal</h1>
                        <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
                            Reach thousands of verified founders. We only list high-value, exclusive deals.
                            <div className="bg-accent-yellow px-2 py-0.5 mt-2 md:mt-0 md:inline-block border border-black font-bold text-black border-2 text-sm">Zero fees.</div>
                        </p>
                    </div>

                    {submissionStatus === 'success' ? (
                        <div className="bg-green-100 border-2 border-green-500 p-8 text-center shadow-[8px_8px_0px_0px_#22c55e]">
                            <span className="material-symbols-outlined text-6xl text-green-600 mb-4">check_circle</span>
                            <h2 className="text-2xl font-bold mb-2 uppercase">Submission Received!</h2>
                            <p className="mb-6">Thanks for submitting your deal. Our team will review it within 48 hours.</p>
                            <button
                                onClick={() => setSubmissionStatus('idle')}
                                className="px-6 py-2 bg-black text-white font-bold uppercase hover:bg-gray-800 transition-colors"
                            >
                                Submit Another Deal
                            </button>
                        </div>
                    ) : (
                        <form className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_#000] md:shadow-[8px_8px_0px_0px_#000] p-4 md:p-8 space-y-5 md:space-y-8" onSubmit={handleSubmit}>

                            {/* Section 1: Provider Info */}
                            <div className="space-y-3 md:space-y-4">
                                <h2 className="text-lg md:text-xl font-bold uppercase border-b-2 border-black pb-2 flex items-center gap-2">
                                    <span className="bg-black text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm rounded-none">1</span>
                                    Provider Details
                               </h2>

                               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Company Name *</label>
                                        <input name="company_name" type="text" placeholder="e.g. Acme Corp" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Website URL *</label>
                                        <input name="website_url" type="url" placeholder="https://" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                    </div>
                                </div>

                                {/* Honeypot — hidden from real users, visible to bots */}
                                <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none" tabIndex={-1}>
                                    <label>Leave this field blank
                                        <input type="text" name="website_link" tabIndex={-1} autoComplete="off" />
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Logo Upload *</label>

                                    <div className="flex gap-4 mb-2 text-xs font-bold">
                                        <button
                                            type="button"
                                            onClick={() => setLogoMethod('url')}
                                            className={`px-3 py-1 border-2 border-black ${logoMethod === 'url' ? 'bg-black text-white' : 'bg-white text-black'}`}
                                        >
                                            Use URL
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setLogoMethod('upload')}
                                            className={`px-3 py-1 border-2 border-black ${logoMethod === 'upload' ? 'bg-black text-white' : 'bg-white text-black'}`}
                                        >
                                            Upload File
                                        </button>
                                    </div>

                                    {logoMethod === 'url' ? (
                                        <div className="flex gap-2">
                                            <input
                                                name="logo_url"
                                                type="url"
                                                placeholder="https://domain.com/logo.png"
                                                className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light"
                                                required={logoMethod === 'url'}
                                                onChange={(e) => setPreviewUrl(e.target.value)}
                                            />
                                            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-black bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-400 text-sm">image</span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative w-full">
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    onChange={handleFileChange}
                                                    required={logoMethod === 'upload'}
                                                />
                                                <div className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black bg-background-light flex items-center justify-between">
                                                    <span className="text-gray-500 truncate text-xs md:text-sm">{fileInputRef.current?.files?.[0]?.name || "Select file..."}</span>
                                                    <span className="material-symbols-outlined text-sm md:text-base">upload_file</span>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-black bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-400 text-sm">image</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-[10px] text-gray-500 mt-1">
                                        {logoMethod === 'url' ? 'Direct link to a high-res PNG/SVG.' : 'Max 2MB. Square format recommended.'}
                                    </p>
                                </div>
                            </div>

                            {/* Section 2: Deal Info */}
                            <div className="space-y-3 md:space-y-4">
                                <h2 className="text-lg md:text-xl font-bold uppercase border-b-2 border-black pb-2 flex items-center gap-2">
                                    <span className="bg-black text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm rounded-none">2</span>
                                    Deal Configuration
                                </h2>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Benefit Description *</label>
                                    <input name="benefit_description" type="text" placeholder="e.g. $5,000 in Credits for 12 months" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Category *</label>
                                        <select name="category" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light appearance-none" required>
                                            <option value="">Select Category...</option>
                                            <option value="cloud">Cloud Credits</option>
                                            <option value="saas">SaaS Discount</option>
                                            <option value="marketing">Marketing/Ads</option>
                                            <option value="hiring">Hiring/Payroll</option>
                                            <option value="legal">Legal/Finance</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase mb-1">Deal Value ($) *</label>
                                        <input name="deal_value" type="text" placeholder="e.g. 5000" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Redemption Method *</label>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer border-2 border-transparent hover:border-black p-2 -ml-2 rounded text-sm md:text-base">
                                            <input type="radio" name="redemption" value="link" className="accent-black w-3.5 h-3.5 md:w-4 md:h-4" defaultChecked />
                                            <span className="font-bold">Unique URL</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer border-2 border-transparent hover:border-black p-2 rounded text-sm md:text-base">
                                            <input type="radio" name="redemption" value="code" className="accent-black w-3.5 h-3.5 md:w-4 md:h-4" />
                                            <span className="font-bold">Coupon Code</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Redemption Link / Code *</label>
                                    <input name="redemption_link" type="text" placeholder="https://your-site.com/founders-prime OR Code: PRIME2025" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" required />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Your Email (optional)</label>
                                    <input name="submitter_email" type="email" placeholder="hello@yourcompany.com" className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow bg-background-light" />
                                    <p className="text-[10px] text-gray-500 mt-1">We'll only use this to notify you about your submission status.</p>
                                </div>
                            </div>

                            {/* Section 3: Exclusivity */}
                            <div className="bg-accent-yellow/20 border-2 border-black p-3 md:p-4">
                                <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                                    <input name="is_exclusive" type="checkbox" className="mt-1 w-4 h-4 md:w-5 md:h-5 accent-black border-2 border-black" required />
                                    <div>
                                        <span className="font-bold uppercase block text-xs md:text-sm">Exclusivity Confirmation *</span>
                                        <span className="text-[11px] md:text-xs text-gray-800 tracking-tight md:tracking-normal leading-snug block mt-0.5">
                                            I confirm this deal offers a <span className="font-bold underline">special benefit</span> to FoundersPrime users (e.g., extra credits, extended trial, or higher discount) compared to our public pricing. We do not list generic referral links.
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {/* Section 4: Tier Selection */}
                            <div className="space-y-3 md:space-y-4">
                                <h2 className="text-lg md:text-xl font-bold uppercase border-b-2 border-black pb-2 flex items-center gap-2">
                                    <span className="bg-black text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm rounded-none">4</span>
                                    Listing Tier
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {/* Standard */}
                                    <label
                                        className={`relative cursor-pointer border-2 p-3 md:p-4 transition-all ${
                                            tier === 'standard'
                                                ? 'border-black bg-white shadow-[3px_3px_0px_#111]'
                                                : 'border-gray-300 bg-gray-50 hover:border-black'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="tier"
                                            value="standard"
                                            checked={tier === 'standard'}
                                            onChange={() => setTier('standard')}
                                            className="absolute opacity-0 pointer-events-none"
                                        />
                                        <div className="flex items-start gap-2 mb-2">
                                            <div className={`w-4 h-4 rounded-full border-2 border-black flex-shrink-0 mt-0.5 ${tier === 'standard' ? 'bg-black' : 'bg-white'}`}>
                                                {tier === 'standard' && (
                                                    <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full m-auto mt-[3px]" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline justify-between gap-2 mb-0.5">
                                                    <span className="font-mono text-sm md:text-base font-black uppercase">Standard</span>
                                                    <span className="font-mono text-base md:text-lg font-black">FREE</span>
                                                </div>
                                                <p className="text-[10px] md:text-xs text-gray-600 leading-snug">
                                                    Listed in standard order after admin approval. ~48 hour review.
                                                </p>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Featured */}
                                    <label
                                        className={`relative cursor-pointer border-2 p-3 md:p-4 transition-all ${
                                            tier === 'featured'
                                                ? 'border-black bg-accent-yellow/30 shadow-[3px_3px_0px_#111]'
                                                : 'border-gray-300 bg-gray-50 hover:border-black hover:bg-accent-yellow/10'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="tier"
                                            value="featured"
                                            checked={tier === 'featured'}
                                            onChange={() => setTier('featured')}
                                            className="absolute opacity-0 pointer-events-none"
                                        />
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white border border-black px-1.5 py-0.5 font-mono text-[8px] md:text-[9px] font-black uppercase tracking-widest shadow-[1px_1px_0px_#111] rotate-3">
                                            ⏳ Limited
                                        </span>
                                        <div className="flex items-start gap-2 mb-2">
                                            <div className={`w-4 h-4 rounded-full border-2 border-black flex-shrink-0 mt-0.5 ${tier === 'featured' ? 'bg-black' : 'bg-white'}`}>
                                                {tier === 'featured' && (
                                                    <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full m-auto mt-[3px]" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline justify-between gap-2 mb-0.5">
                                                    <span className="font-mono text-sm md:text-base font-black uppercase flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-base text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                        Featured
                                                    </span>
                                                    <span className="flex items-baseline gap-1">
                                                        <span className="font-mono text-xs font-bold line-through text-gray-400">$299</span>
                                                        <span className="font-mono text-base md:text-lg font-black">$99</span>
                                                    </span>
                                                </div>
                                                <ul className="text-[10px] md:text-xs text-gray-700 leading-snug space-y-0.5 mt-1">
                                                    <li>· Pinned at top for 30 days</li>
                                                    <li>· ⭐ Featured badge on listing</li>
                                                    <li>· Priority admin review</li>
                                                    <li>· Auto-refund if not approved</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {tier === 'featured' && (
                                    <p className="text-[10px] md:text-xs text-gray-600 bg-amber-50 border border-amber-200 px-3 py-2 leading-snug">
                                        <span className="font-bold">How it works:</span> Submit free → we review within 24 hours → if approved, you'll get a payment link for $99 → after payment, your deal goes live with the Featured badge for 30 days.
                                    </p>
                                )}
                            </div>

                            {/* Section 5: Security Check */}
                            <div className="border-t-2 border-black pt-3 md:pt-4">
                                <label className="block text-xs font-bold uppercase mb-2">Security Verification *</label>
                                <div className="bg-gray-100 p-3 md:p-4 border-2 border-black flex flex-col md:flex-row items-center justify-between md:justify-start gap-3 md:gap-4">
                                    <span className="font-mono text-base md:text-lg font-bold">Please solve: {challenge.num1} + {challenge.num2} = ?</span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="?"
                                            className={`w-16 p-2 text-sm md:text-base border-2 border-black text-center font-bold outline-none ring-2 ${isHuman ? 'ring-green-500 border-green-500' : 'ring-transparent'}`}
                                            value={securityAnswer}
                                            onChange={(e) => checkSecurity(e.target.value)}
                                            maxLength={3}
                                        />
                                        {isHuman && (
                                            <div className="flex items-center text-green-600 font-bold gap-1 mt-0">
                                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                <span className="text-xs md:text-sm">Verified</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 md:pt-4">
                                <button
                                    type="submit"
                                    disabled={!isHuman || isSubmitting}
                                    className={`w-full font-mono font-bold text-base md:text-lg uppercase py-3 md:py-4 border-[3px] border-[#101622] flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_0px_#888] md:shadow-[6px_6px_0px_0px_#888]
                                    ${isHuman && !isSubmitting
                                            ? 'bg-[#101622] text-white hover:bg-white hover:text-[#101622] cursor-pointer'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400 shadow-none'
                                        }`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'} <span className="material-symbols-outlined text-[18px] md:text-base">send</span>
                                </button>
                                <p className="text-center text-[9px] md:text-[10px] text-gray-500 mt-3 md:mt-4 uppercase font-bold">
                                    {submissionStatus === 'error' && (
                                        <span className="text-red-600 block mb-1 normal-case font-mono text-xs">
                                            ⚠ {errorMessage || 'Error submitting deal. Please try again.'}
                                        </span>
                                    )}
                                    Review time: ~48 Hours. You will be notified via email.
                                </p>
                            </div>

                        </form>
                    )}
                </div>
            </main>

            <footer className="bg-white border-t-2 border-black py-8 text-center">
                <div className="text-xs font-bold font-mono text-gray-400">© 2025 FoundersPrime. All rights reserved.</div>
            </footer>
        </div>
    )
}
