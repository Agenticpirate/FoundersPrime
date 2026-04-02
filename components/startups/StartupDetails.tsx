"use client";

import { useState } from 'react';
import { YCCompany } from "@/types/startup";
import { Globe, MapPin, Users, Calendar, Linkedin, Twitter, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface StartupDetailsProps {
    company: YCCompany;
}

const FounderAvatar = ({ founder }: { founder: { name: string, avatar?: string } }) => {
    const [error, setError] = useState(false);
    return (
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-black overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center relative">
            {founder.avatar && !error ? (
                <Image 
                    src={founder.avatar} 
                    alt={founder.name} 
                    fill 
                    sizes="(min-width: 768px) 60px, 48px" 
                    className="object-cover"
                    onError={() => setError(true)}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-lg md:text-xl font-bold text-gray-400 capitalize">{founder.name.charAt(0)}</div>
            )}
        </div>
    );
};

export default function StartupDetails({ company }: StartupDetailsProps) {
    return (
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-6 md:pb-10">
            {/* Breadcrumbs */}
            <nav className="flex mb-3" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 font-mono text-sm font-medium">
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
                            <span className="text-black bg-primary/20 px-2 py-0.5 rounded-sm border border-black">{company.name}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
                {/* Left Column: Main Content */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                    {/* Header Card */}
                    <div className="bg-white border-2 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-3 md:p-6">
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 items-start">
                            <div className="w-12 h-12 md:w-24 md:h-24 bg-white border-2 border-black flex items-center justify-center p-1 md:p-2 flex-shrink-0">
                                {company.small_logo_thumb_url ? (
                                    <div className="relative w-full h-full">
                                        <Image src={company.small_logo_thumb_url} alt={company.name} fill sizes="(min-width: 768px) 80px, 48px" className="object-contain" />
                                    </div>
                                ) : (
                                    <span className="text-xl md:text-4xl font-bold text-gray-400">{company.name.charAt(0)}</span>
                                )}
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 w-full">
                                    <h1 className="text-xl md:text-4xl font-black text-black uppercase tracking-tight leading-none truncate max-w-full">{company.name}</h1>
                                    <span className="inline-block px-1.5 md:px-2 py-0.5 bg-yellow-400 text-black text-[10px] md:text-xs font-bold border-2 border-black uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        {company.batch}
                                    </span>
                                </div>
                                <p className="text-sm md:text-lg font-medium text-gray-700 mb-3 md:mb-4 leading-snug md:leading-relaxed">
                                    {company.one_liner}
                                </p>

                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {company.tags.map((tag, idx) => (
                                        <span key={idx} className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 border border-black text-[10px] md:text-xs font-bold uppercase tracking-wide text-gray-800">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-white border-2 border-black p-3 md:p-6">
                        <h2 className="text-base md:text-xl font-black uppercase mb-3 md:mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 md:w-3 md:h-3 bg-orange-600 block border border-black"></span>
                            About Company
                        </h2>
                        <div className="prose prose-sm md:prose-base max-w-none text-gray-800 font-medium overflow-hidden">
                            <p className="whitespace-pre-line leading-relaxed text-xs md:text-base">{company.long_description}</p>
                        </div>
                    </div>

                    {/* Founders Section */}
                    {company.founders_enriched && company.founders_enriched.length > 0 && (
                        <div className="bg-orange-50 border-2 border-black p-3 md:p-6">
                            <h2 className="text-base md:text-xl font-black uppercase mb-3 md:mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 md:w-3 md:h-3 bg-black block"></span>
                                Active Founders
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                {company.founders_enriched.map((founder, i) => (
                                    <div key={i} className="bg-white border-2 border-black p-3 md:p-4 md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                                            <FounderAvatar founder={founder} />

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-black text-sm md:text-lg text-black leading-tight truncate">{founder.name}</h3>
                                                <p className="text-[10px] md:text-xs font-bold text-orange-600 uppercase tracking-widest mt-0.5 md:mt-0.5 mb-1.5 md:mb-2 truncate">
                                                    {founder.title || "FOUNDER"}
                                                </p>

                                                <div className="flex gap-1.5 md:gap-2">
                                                    {founder.linkedin && (
                                                        <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                                                            <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                        </a>
                                                    )}
                                                    {founder.twitter && (
                                                        <a href={founder.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
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
                    <div className="bg-white border-2 md:border-4 border-black p-3 md:p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:sticky top-6">
                        <h3 className="text-base md:text-xl font-black uppercase mb-3 md:mb-4 border-b-2 border-black pb-1.5 md:pb-2">Company Facts</h3>

                        <div className="space-y-3 md:space-y-4">
                            {company.website && (
                                <div>
                                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 md:gap-2 w-full bg-black text-white py-2 md:py-2.5 font-bold uppercase tracking-wide hover:bg-orange-600 transition-colors border-2 border-black text-xs md:text-sm">
                                        Visit Website
                                        <Globe className="w-3 h-3" />
                                    </a>
                                </div>
                            )}

                            <div className="flex gap-1.5 md:gap-2 justify-center pt-0.5 md:pt-1">
                                {company.linkedin_url && (
                                    <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-1 md:p-1.5 border-2 border-black bg-white hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </a>
                                )}
                                {company.twitter_url && (
                                    <a href={company.twitter_url} target="_blank" rel="noopener noreferrer" className="p-1 md:p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </a>
                                )}
                                {company.crunchbase_url && (
                                    <a href={company.crunchbase_url} target="_blank" rel="noopener noreferrer" className="p-1 md:p-1.5 border-2 border-black bg-white hover:bg-[#09c] hover:text-white hover:border-[#09c] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" title="Crunchbase">
                                        <span className="font-bold font-mono text-[10px] md:text-xs leading-none h-3.5 w-3.5 md:h-4 md:w-4 flex items-center justify-center">CB</span>
                                    </a>
                                )}
                            </div>

                            <div className="space-y-2 md:space-y-3 font-bold text-gray-800 text-xs md:text-sm">
                                <div className="flex items-center justify-between border-b border-gray-200 pb-1.5 md:pb-2">
                                    <span className="flex items-center gap-1.5 md:gap-2 text-gray-500 uppercase text-[9px] md:text-[10px] tracking-wider">
                                        <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" /> Location
                                    </span>
                                    <span className="text-right max-w-[50%] truncate">{company.all_locations || "Remote"}</span>
                                </div>

                                <div className="flex items-center justify-between border-b border-gray-200 pb-1.5 md:pb-2">
                                    <span className="flex items-center gap-1.5 md:gap-2 text-gray-500 uppercase text-[9px] md:text-[10px] tracking-wider">
                                        <Users className="w-2.5 h-2.5 md:w-3 md:h-3" /> Team Size
                                    </span>
                                    <span>{company.team_size}</span>
                                </div>

                                <div className="flex items-center justify-between border-b border-gray-200 pb-1.5 md:pb-2">
                                    <span className="flex items-center gap-1.5 md:gap-2 text-gray-500 uppercase text-[9px] md:text-[10px] tracking-wider">
                                        <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" /> Founded
                                    </span>
                                    <span>{company.launched_at ? new Date(company.launched_at * 1000).getFullYear() : "N/A"}</span>
                                </div>

                                <div className="flex items-center justify-between pb-0.5 md:pb-1">
                                    <span className="flex items-center gap-1.5 md:gap-2 text-gray-500 uppercase text-[9px] md:text-[10px] tracking-wider">
                                        Status
                                    </span>
                                    <span className={`inline-block px-1.5 md:px-2 py-0.5 text-[9px] md:text-[10px] rounded border border-black ${company.status === 'Active' ? 'bg-green-100 text-green-800' :
                                        company.status === 'Acquired' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
                                        }`}>
                                        {company.status || "Unknown"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
