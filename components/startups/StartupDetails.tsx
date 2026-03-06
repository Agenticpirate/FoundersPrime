"use client";

import { YCCompany } from "@/types/startup";
import { Globe, MapPin, Users, Calendar, Linkedin, Twitter, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface StartupDetailsProps {
    company: YCCompany;
}

export default function StartupDetails({ company }: StartupDetailsProps) {
    return (
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-6 md:py-10">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 text-xs md:text-sm font-bold uppercase tracking-wide mb-6">
                <Link className="text-black/60 hover:text-orange-600 hover:underline decoration-2" href="/">Home</Link>
                <span className="text-black/60">/</span>
                <Link className="text-black/60 hover:text-orange-600 hover:underline decoration-2" href="/startups">Startups</Link>
                <span className="text-black/60">/</span>
                <span className="text-black">{company.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header Card */}
                    <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-white border-2 border-black flex items-center justify-center p-2 flex-shrink-0">
                                {company.small_logo_thumb_url ? (
                                    <div className="relative w-full h-full">
                                        <Image src={company.small_logo_thumb_url} alt={company.name} fill sizes="(min-width: 768px) 80px, 48px" className="object-contain" />
                                    </div>
                                ) : (
                                    <span className="text-2xl md:text-4xl font-bold text-gray-400">{company.name.charAt(0)}</span>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                                    <h1 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight">{company.name}</h1>
                                    <span className="inline-block px-2 py-0.5 bg-yellow-400 text-black text-xs font-bold border-2 border-black uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        {company.batch}
                                    </span>
                                </div>
                                <p className="text-base md:text-lg font-medium text-gray-700 mb-4 leading-relaxed">
                                    {company.one_liner}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {company.tags.map((tag, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-gray-100 border border-black text-[10px] md:text-xs font-bold uppercase tracking-wide text-gray-800">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-white border-2 border-black p-4 md:p-6">
                        <h2 className="text-lg md:text-xl font-black uppercase mb-4 flex items-center gap-2">
                            <span className="w-3 h-3 bg-orange-600 block border border-black"></span>
                            About Company
                        </h2>
                        <div className="prose prose-sm md:prose-base max-w-none text-gray-800 font-medium">
                            <p className="whitespace-pre-line leading-relaxed">{company.long_description}</p>
                        </div>
                    </div>

                    {/* Founders Section */}
                    {company.founders_enriched && company.founders_enriched.length > 0 && (
                        <div className="bg-orange-50 border-2 border-black p-4 md:p-6">
                            <h2 className="text-lg md:text-xl font-black uppercase mb-4 flex items-center gap-2">
                                <span className="w-3 h-3 bg-black block"></span>
                                Active Founders
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {company.founders_enriched.map((founder, i) => (
                                    <div key={i} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-black overflow-hidden flex-shrink-0 bg-gray-100">
                                                {founder.avatar ? (
                                                    <Image src={founder.avatar} alt={founder.name} fill sizes="(min-width: 768px) 60px, 52px" className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-400">{founder.name.charAt(0)}</div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-black text-lg text-black leading-tight truncate">{founder.name}</h3>
                                                <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-0.5 mb-2 truncate">
                                                    {founder.title || "FOUNDER"}
                                                </p>

                                                <div className="flex gap-2">
                                                    {founder.linkedin && (
                                                        <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                                                            <Linkedin className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    {founder.twitter && (
                                                        <a href={founder.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                                                            <Twitter className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {founder.bio && (
                                            <p className="text-sm text-gray-700 leading-relaxed font-medium line-clamp-4">
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
                <div className="space-y-6">
                    <div className="bg-white border-4 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-6">
                        <h3 className="text-lg md:text-xl font-black uppercase mb-4 border-b-2 border-black pb-2">Company Facts</h3>

                        <div className="space-y-4">
                            {company.website && (
                                <div>
                                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-black text-white py-2.5 font-bold uppercase tracking-wide hover:bg-orange-600 transition-colors border-2 border-black text-sm">
                                        Visit Website
                                        <Globe className="w-3 h-3" />
                                    </a>
                                </div>
                            )}

                            <div className="flex gap-2 justify-center pt-1">
                                {company.linkedin_url && (
                                    <a href={company.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-1.5 border-2 border-black bg-white hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                )}
                                {company.twitter_url && (
                                    <a href={company.twitter_url} target="_blank" rel="noopener noreferrer" className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                )}
                                {company.crunchbase_url && (
                                    <a href={company.crunchbase_url} target="_blank" rel="noopener noreferrer" className="p-1.5 border-2 border-black bg-white hover:bg-[#09c] hover:text-white hover:border-[#09c] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" title="Crunchbase">
                                        <span className="font-bold font-mono text-xs leading-none h-4 w-4 flex items-center justify-center">CB</span>
                                    </a>
                                )}
                            </div>

                            <div className="space-y-3 font-bold text-gray-800 text-sm">
                                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="flex items-center gap-2 text-gray-500 uppercase text-[10px] tracking-wider">
                                        <MapPin className="w-3 h-3" /> Location
                                    </span>
                                    <span className="text-right max-w-[50%] truncate">{company.all_locations || "Remote"}</span>
                                </div>

                                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="flex items-center gap-2 text-gray-500 uppercase text-[10px] tracking-wider">
                                        <Users className="w-3 h-3" /> Team Size
                                    </span>
                                    <span>{company.team_size}</span>
                                </div>

                                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="flex items-center gap-2 text-gray-500 uppercase text-[10px] tracking-wider">
                                        <Calendar className="w-3 h-3" /> Founded
                                    </span>
                                    <span>{company.launched_at ? new Date(company.launched_at * 1000).getFullYear() : "N/A"}</span>
                                </div>

                                <div className="flex items-center justify-between pb-1">
                                    <span className="flex items-center gap-2 text-gray-500 uppercase text-[10px] tracking-wider">
                                        Status
                                    </span>
                                    <span className={`inline-block px-2 py-0.5 text-[10px] rounded border border-black ${company.status === 'Active' ? 'bg-green-100 text-green-800' :
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
