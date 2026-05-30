"use client";

import { useState, useMemo, useEffect } from "react";
import { YCCompany } from "@/types/startup";
import StartupCard from "./StartupCard";
import { Search } from "lucide-react";
import startupsData from "@/data/yc_companies_2024_2026.json";
import Pagination from "@/components/Pagination";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

// Type assertion for the imported JSON
const allStartups = startupsData as unknown as YCCompany[];

export default function StartupGrid() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("All");
    const itemsPerPage = 12;

    // Extract unique industries
    const industries = useMemo(() => {
        const uniqueIndustries = new Set(allStartups.map((s) => s.industry).filter(Boolean));
        return ["All", ...Array.from(uniqueIndustries).sort()];
    }, []);

    // Filter startups based on search and industry
    const filteredStartups = useMemo(() => {
        return allStartups.filter((startup) => {
            const matchesSearch =
                startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                startup.one_liner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                startup.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesIndustry =
                selectedIndustry === "All" || startup.industry === selectedIndustry;

            return matchesSearch && matchesIndustry;
        });
    }, [searchQuery, selectedIndustry]);

    // Pagination Logic
    const pageParam = searchParams.get('page');
    const rawPage = Number(pageParam) || 1;
    const totalPages = Math.ceil(filteredStartups.length / itemsPerPage) || 1;
    const currentPage = Math.min(Math.max(1, rawPage), totalPages);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStartups = filteredStartups.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(pathname + '?' + params.toString(), { scroll: false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset to page 1 when filters change
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (params.get('page') !== '1') {
            params.set('page', '1');
            router.replace(pathname + '?' + params.toString(), { scroll: false });
        }
    }, [searchQuery, selectedIndustry]);


    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedIndustry("All");
        // Reset to page 1
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        router.replace(pathname + '?' + params.toString(), { scroll: false });
    };

    const hasActiveFilters = searchQuery !== "" || selectedIndustry !== "All";

    return (
        <div className="w-full">
            {/* Premium filter panel — mirrors DealsFilterBar */}
            <div className="relative bg-white border-2 border-black rounded-sm shadow-[3px_3px_0px_0px_#111] md:border md:border-gray-200 md:rounded-xl md:shadow-sm p-2 md:p-3.5 overflow-hidden mb-3 md:mb-4">
                {/* Decorative mandala — top-right corner */}
                <div className="absolute -top-10 -right-10 w-32 h-32 pointer-events-none opacity-[0.05]" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-gray-900 startups-mandala-spin" fill="none" stroke="currentColor" strokeWidth="0.6">
                        <circle cx="100" cy="100" r="40" />
                        <circle cx="100" cy="100" r="60" strokeDasharray="2 4" />
                        {[...Array(8)].map((_, i) => (
                            <line
                                key={i}
                                x1="100"
                                y1="100"
                                x2={100 + Math.cos((i * Math.PI) / 4) * 80}
                                y2={100 + Math.sin((i * Math.PI) / 4) * 80}
                            />
                        ))}
                        <circle cx="100" cy="100" r="2" fill="currentColor" />
                    </svg>
                </div>

                <div className="relative">
                    {/* Search Bar */}
                    <div className="relative mb-2 md:mb-2.5">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 md:pl-3">
                            <Search className="h-4 w-4 md:h-[18px] md:w-[18px] text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full h-9 md:h-9 border-2 border-black rounded-sm bg-white md:border md:border-gray-200 md:bg-gray-50 md:rounded-lg hover:bg-white focus:bg-white pl-8 md:pl-10 pr-3 text-[12px] md:text-[12.5px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-yellow/40 focus:border-accent-yellow transition-colors"
                            placeholder="Search name, tags…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Industry Filters (Pill Buttons) */}
                    <div className="flex items-center gap-1 md:gap-1.5 overflow-x-auto mobile-scroll-hide">
                        <span className="hidden md:inline-flex font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mr-1 flex-shrink-0">Industry:</span>
                        {industries.map((industry) => (
                            <button
                                key={industry}
                                onClick={() => setSelectedIndustry(industry)}
                                className={`px-2.5 py-0.5 md:py-1 text-[10px] md:text-[11px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 border md:border ${selectedIndustry === industry
                                    ? 'bg-gray-900 text-white border-black md:border-transparent shadow-sm'
                                    : 'bg-white text-gray-600 border-black/15 md:border-gray-200 hover:bg-white hover:border-gray-300 hover:text-gray-900'
                                    }`}
                            >
                                {industry}
                            </button>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    @keyframes startupsMandalaSpin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    :global(.startups-mandala-spin) {
                        animation: startupsMandalaSpin 70s linear infinite;
                        transform-origin: center;
                    }
                    @media (prefers-reduced-motion: reduce) {
                        :global(.startups-mandala-spin) { animation: none; }
                    }
                `}</style>
            </div>

            {/* Results Count and Clear Filters */}
            <div className="flex flex-row items-center justify-between mb-3 md:mb-6 pb-2.5 md:pb-3 border-b border-dashed border-gray-300 gap-2">
                <div className="font-mono text-[11px] md:text-sm text-gray-600">
                    Showing <span className="font-bold text-black">{currentStartups.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredStartups.length)}</span> of{' '}
                    <span className="font-bold text-black">{filteredStartups.length}</span> startups
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={handleClearFilters}
                        className="px-2.5 py-1 font-mono text-[10px] md:text-[11px] font-bold bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-1 flex-shrink-0"
                    >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                        Clear
                    </button>
                )}
            </div>

            {/* Grid */}
            {currentStartups.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currentStartups.map((startup) => (
                        <StartupCard key={startup.id} company={startup} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-5 md:py-6 md:py-14 text-center border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="bg-gray-100 p-4 mb-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No startups found</h3>
                    <p className="mt-1 text-gray-600 font-medium">Try adjusting your search or filters.</p>
                </div>
            )}

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
