"use client";

import { useState, useMemo, useEffect } from "react";
import { YCCompany } from "@/types/startup";
import StartupCard from "./StartupCard";
import { Search, Filter } from "lucide-react";
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
            {/* Search and Filter Header */}
            <div className="mb-0">
                {/* Search Bar */}
                <div className="mb-6 relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full border-2 border-black bg-white py-3 pl-12 pr-4 text-base font-mono placeholder-gray-500 focus:border-black focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        placeholder="Search via name, description, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Industry Filters (Pill Buttons) */}
                <div className="mb-8">
                    <label className="font-mono text-xs font-bold text-gray-600 uppercase mb-3 block">
                        Filter by Industry
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                        {industries.map((industry) => (
                            <button
                                key={industry}
                                onClick={() => setSelectedIndustry(industry)}
                                className={`px-4 py-2 font-mono text-xs font-bold border-2 border-black whitespace-nowrap transition-all ${selectedIndustry === industry
                                        ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]'
                                        : 'bg-white text-black hover:bg-gray-100'
                                    }`}
                            >
                                {industry}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count and Clear Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b-2 border-dashed border-gray-300 gap-4">
                <div className="font-mono text-sm text-gray-600">
                    Showing <span className="font-bold text-black">{currentStartups.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredStartups.length)}</span> of{' '}
                    <span className="font-bold text-black">{filteredStartups.length}</span> startups
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={handleClearFilters}
                        className="px-3 py-1.5 font-mono text-xs font-bold bg-white border-2 border-black hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <span className="material-symbols-outlined text-sm">close</span>
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Grid */}
            {currentStartups.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currentStartups.map((startup) => (
                        <StartupCard key={startup.id} company={startup} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
