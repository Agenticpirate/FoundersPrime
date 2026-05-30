"use client";

import { useState, useEffect } from 'react';
import { YCCompany } from "@/types/startup";
import { Globe, Linkedin, Twitter, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Mandala from "@/components/ui/Mandala";

interface StartupDetailsProps {
    company: YCCompany;
}

/** Resilient brand-logo loader — plain <img> + fallback chain, no Next optimizer.
 *  Mirrors the StartupCard fix so production never shows blank logos. */
function useLogoChain(opts: { logoUrl?: string; website?: string; name: string }) {
    const buildChain = () => {
        const chain: string[] = [];
        if (opts.logoUrl) chain.push(opts.logoUrl);
        if (opts.website) {
            try {
                const domain = new URL(opts.website).hostname.replace('www.', '');
                chain.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
                chain.push(`https://logo.clearbit.com/${domain}`);
                chain.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
            } catch { /* ignore bad URL */ }
        }
        chain.push(`https://ui-avatars.com/api/?name=${encodeURIComponent(opts.name)}&background=f3f4f6&color=111111&bold=true&size=128`);
        return chain;
    };
    const chain = buildChain();
    const [index, setIndex] = useState(0);
    useEffect(() => { setIndex(0); }, [opts.logoUrl, opts.website]);
    return {
        src: chain[index] ?? null,
        onError: () => setIndex((p) => Math.min(p + 1, chain.length - 1)),
    };
}

const FounderAvatar = ({ founder }: { founder: { name: string; avatar?: string } }) => {
    const { src, onError } = useLogoChain({ logoUrl: founder.avatar, name: founder.name });
    return (
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-black overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center relative">
            {src ? (
                <img
                    src={src}
                    alt={founder.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={onError}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-lg md:text-xl font-bold text-gray-400 capitalize">{founder.name.charAt(0)}</div>
            )}
        </div>
    );
};

export default function StartupDetails({ company }: StartupDetailsProps) {
    const c = company as any;
    const logo = useLogoChain({ logoUrl: company.small_logo_thumb_url, website: company.website, name: company.name });

    const foundedYear = company.launched_at
        ? new Date(company.launched_at * 1000).getFullYear()
        : (c.year_founded || null);

    const statusStyle = company.status === 'Active'
        ? 'bg-emerald-100 text-emerald-800'
        : company.status === 'Acquired'
            ? 'bg-sky-100 text-sky-800'
            : 'bg-gray-100 text-gray-700';

    // Surface long-form Q&A answers when available (richer than long_description).
    const qa: { question: string; answer: string }[] = Array.isArray(c.free_response_question_answers)
        ? c.free_response_question_answers.filter((q: any) => q.answer && q.answer.trim().length > 0)
        : [];

    const facts: { label: string; value: string; icon: string }[] = [
        { label: 'Batch', value: company.batch || '—', icon: 'workspace_premium' },
        { label: 'Team Size', value: company.team_size ? `${company.team_size}` : '—', icon: 'group' },
        { label: 'Founded', value: foundedYear ? `${foundedYear}` : 'N/A', icon: 'calendar_month' },
        { label: 'Stage', value: c.stage || '—', icon: 'trending_up' },
        { label: 'Industry', value: company.industry || '—', icon: 'category' },
        { label: 'Location', value: company.all_locations || 'Remote', icon: 'location_on' },
    ];

    return (
        <div className="relative w-full overflow-hidden">
            {/* Ambient page background — grid + drifting mandalas (matches site theme) */}
            <div className="absolute inset-0 grid-bg opacity-[0.5] pointer-events-none" aria-hidden="true" />
            <Mandala
                variant="rings"
                colorClass="text-gray-900"
                opacity={0.05}
                speed={120}
                className="absolute -top-24 -right-24 w-80 h-80 hidden md:block"
            />
            <Mandala
                variant="orbital"
                colorClass="text-accent-yellow"
                opacity={0.06}
                speed={150}
                direction="ccw"
                className="absolute top-1/3 -left-28 w-72 h-72 hidden lg:block"
            />

            <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-6 md:pb-10">
                {/* Breadcrumbs */}
                <nav className="flex mb-3" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 font-mono text-xs md:text-sm font-medium flex-wrap">
                        <li className="inline-flex items-center">
                            <Link className="text-gray-500 hover:text-black" href="/">Home</Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
                                <Link className="text-gray-500 hover:text-black" href="/resources">Resources</Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
                                <Link className="text-gray-500 hover:text-black" href="/startups">Verified Startups</Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <span className="material-symbols-outlined text-gray-400 text-base mx-1">chevron_right</span>
                                <span className="text-black bg-accent-yellow/30 px-2 py-0.5 rounded-sm border border-black truncate max-w-[160px] md:max-w-none inline-block align-bottom">{company.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Back link */}
                <Link
                    href="/startups"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] md:text-xs font-bold uppercase tracking-wide text-gray-600 hover:text-black transition-colors mb-4"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    All Startups
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-2 space-y-4 md:space-y-6">
                        {/* Header Card — premium, mandala + grid */}
                        <div className="relative bg-white border-2 md:border-4 border-black shadow-[3px_3px_0px_0px_#111] md:shadow-[8px_8px_0px_0px_#111] p-3 md:p-6 overflow-hidden fp-fade-up">
                            <Mandala
                                variant="rings"
                                colorClass="text-gray-900"
                                opacity={0.05}
                                speed={90}
                                className="absolute -top-16 -right-16 w-56 h-56 hidden md:block"
                            />
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-yellow via-amber-300 to-accent-yellow" />

                            <div className="relative flex flex-col sm:flex-row gap-3 md:gap-6 items-start">
                                <div className="w-14 h-14 md:w-24 md:h-24 bg-white border-2 border-black shadow-[2px_2px_0px_#111] flex items-center justify-center p-1.5 md:p-2.5 flex-shrink-0 overflow-hidden">
                                    {logo.src ? (
                                        <img src={logo.src} alt={company.name} className="w-full h-full object-contain" onError={logo.onError} />
                                    ) : (
                                        <span className="text-xl md:text-4xl font-bold text-gray-400">{company.name.charAt(0)}</span>
                                    )}
                                </div>

                                <div className="flex-1 w-full min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 w-full">
                                        <h1 className="font-mono text-xl md:text-4xl font-black text-black uppercase tracking-tight leading-none truncate max-w-full">{company.name}</h1>
                                        {company.batch && (
                                            <span className="inline-block px-1.5 md:px-2 py-0.5 bg-accent-yellow text-black text-[10px] md:text-xs font-bold border-2 border-black uppercase tracking-wide shadow-[2px_2px_0px_0px_#111]">
                                                {company.batch}
                                            </span>
                                        )}
                                        {c.isHiring && (
                                            <span className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] md:text-xs font-bold border-2 border-black uppercase tracking-wide">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                Hiring
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm md:text-lg font-medium text-gray-700 mb-3 md:mb-4 leading-snug md:leading-relaxed">
                                        {company.one_liner}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {(company.tags && company.tags.length > 0
                                            ? company.tags
                                            : [company.industry, c.subindustry?.split('->').pop()?.trim()].filter(Boolean)
                                        ).slice(0, 6).map((tag: string, idx: number) => (
                                            <span key={idx} className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 border border-black text-[10px] md:text-xs font-bold uppercase tracking-wide text-gray-800 rounded-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="relative bg-white border-2 border-black p-3 md:p-6 overflow-hidden fp-fade-up" style={{ animationDelay: '0.05s' }}>
                            <h2 className="font-mono text-base md:text-xl font-black uppercase mb-3 md:mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 md:w-3 md:h-3 bg-accent-yellow block border border-black"></span>
                                About Company
                            </h2>
                            <div className="prose prose-sm md:prose-base max-w-none text-gray-800 font-medium overflow-hidden">
                                <p className="whitespace-pre-line leading-relaxed text-xs md:text-base">{company.long_description || company.one_liner}</p>
                            </div>
                        </div>

                        {/* Founder Q&A — vision / problem (rich content when present) */}
                        {qa.length > 0 && (
                            <div className="relative bg-white border-2 border-black p-3 md:p-6 overflow-hidden fp-fade-up" style={{ animationDelay: '0.1s' }}>
                                <h2 className="font-mono text-base md:text-xl font-black uppercase mb-3 md:mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 md:w-3 md:h-3 bg-accent-yellow block border border-black"></span>
                                    In Their Words
                                </h2>
                                <div className="space-y-4">
                                    {qa.slice(0, 3).map((item, i) => (
                                        <div key={i} className="border-l-2 border-accent-yellow pl-3 md:pl-4">
                                            <p className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wide text-gray-500 mb-1.5">
                                                {item.question.replace(/&#x27;/g, "'")}
                                            </p>
                                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-line">
                                                {item.answer.replace(/\\r\\n|\\n/g, '\n').replace(/&#x27;/g, "'").trim()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Founders Section */}
                        {company.founders_enriched && company.founders_enriched.length > 0 && (
                            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white border-2 border-black p-3 md:p-6 overflow-hidden fp-fade-up" style={{ animationDelay: '0.15s' }}>
                                <Mandala
                                    variant="orbital"
                                    colorClass="text-accent-yellow"
                                    opacity={0.08}
                                    speed={80}
                                    className="absolute -bottom-16 -right-16 w-56 h-56"
                                />
                                <h2 className="relative font-mono text-base md:text-xl font-black uppercase mb-3 md:mb-4 flex items-center gap-2 text-accent-yellow">
                                    <span className="w-2 h-2 md:w-3 md:h-3 bg-accent-yellow block"></span>
                                    Active Founders
                                </h2>
                                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    {company.founders_enriched.map((founder, i) => (
                                        <div key={i} className="bg-white text-black border-2 border-black p-3 md:p-4 rounded-sm md:shadow-[4px_4px_0px_0px_rgba(255,221,0,0.4)]">
                                            <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                                                <FounderAvatar founder={founder} />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-black text-sm md:text-lg text-black leading-tight truncate">{founder.name}</h3>
                                                    <p className="text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-widest mt-0.5 mb-1.5 md:mb-2 truncate">
                                                        {founder.title || "FOUNDER"}
                                                    </p>
                                                    <div className="flex gap-1.5 md:gap-2">
                                                        {founder.linkedin && (
                                                            <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors" aria-label={`${founder.name} on LinkedIn`}>
                                                                <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                            </a>
                                                        )}
                                                        {founder.twitter && (
                                                            <a href={founder.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" aria-label={`${founder.name} on X`}>
                                                                <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {founder.bio && (
                                                <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium line-clamp-3 md:line-clamp-4">
                                                    {founder.bio}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sidebar Stats */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="relative bg-white border-2 md:border-4 border-black p-3 md:p-6 shadow-[3px_3px_0px_0px_#111] md:shadow-[8px_8px_0px_0px_#111] lg:sticky lg:top-20 overflow-hidden fp-fade-up" style={{ animationDelay: '0.1s' }}>
                            <Mandala
                                variant="rings"
                                colorClass="text-gray-900"
                                opacity={0.05}
                                speed={100}
                                className="absolute -top-14 -right-14 w-44 h-44"
                            />
                            <div className="relative">
                                <h3 className="font-mono text-base md:text-xl font-black uppercase mb-3 md:mb-4 border-b-2 border-black pb-1.5 md:pb-2">Company Facts</h3>

                                <div className="space-y-3 md:space-y-4">
                                    {company.website && (
                                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 md:gap-2 w-full bg-black text-white py-2.5 font-bold uppercase tracking-wide hover:bg-accent-yellow hover:text-black transition-colors border-2 border-black text-xs md:text-sm shadow-[2px_2px_0px_#333] hover:shadow-[3px_3px_0px_#111]">
                                            Visit Website
                                            <Globe className="w-3.5 h-3.5" />
                                        </a>
                                    )}

                                    <div className="flex gap-1.5 md:gap-2 justify-center pt-0.5 md:pt-1">
                                        {company.linkedin_url && (
                                            <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-1.5 border-2 border-black bg-white hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all shadow-[2px_2px_0px_0px_#111]" aria-label="Company LinkedIn">
                                                <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                            </a>
                                        )}
                                        {company.twitter_url && (
                                            <a href={company.twitter_url} target="_blank" rel="noopener noreferrer" className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_#111]" aria-label="Company X">
                                                <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                            </a>
                                        )}
                                        {company.crunchbase_url && (
                                            <a href={company.crunchbase_url} target="_blank" rel="noopener noreferrer" className="p-1.5 border-2 border-black bg-white hover:bg-[#09c] hover:text-white hover:border-[#09c] transition-all shadow-[2px_2px_0px_0px_#111]" title="Crunchbase" aria-label="Crunchbase">
                                                <span className="font-bold font-mono text-[10px] md:text-xs leading-none h-3.5 w-3.5 md:h-4 md:w-4 flex items-center justify-center">CB</span>
                                            </a>
                                        )}
                                    </div>

                                    <div className="space-y-0 font-bold text-gray-800 text-xs md:text-sm">
                                        {facts.map((fact, i) => (
                                            <div key={i} className="flex items-center justify-between border-b border-gray-200 py-2 last:border-b-0">
                                                <span className="flex items-center gap-1.5 md:gap-2 text-gray-500 uppercase text-[9px] md:text-[10px] tracking-wider">
                                                    <span className="material-symbols-outlined text-[14px] md:text-[16px] text-gray-400">{fact.icon}</span>
                                                    {fact.label}
                                                </span>
                                                <span className="text-right max-w-[55%] truncate">{fact.value}</span>
                                            </div>
                                        ))}

                                        <div className="flex items-center justify-between py-2">
                                            <span className="flex items-center gap-1.5 md:gap-2 text-gray-500 uppercase text-[9px] md:text-[10px] tracking-wider">
                                                <span className="material-symbols-outlined text-[14px] md:text-[16px] text-gray-400">bolt</span>
                                                Status
                                            </span>
                                            <span className={`inline-block px-1.5 md:px-2 py-0.5 text-[9px] md:text-[10px] rounded border border-black ${statusStyle}`}>
                                                {company.status || "Unknown"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
