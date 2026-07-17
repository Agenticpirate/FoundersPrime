"use client";

import Link from "next/link";
import { useState } from "react";
import { Bookmark, Download, Eye } from "lucide-react";
import { CardHoverGlow, cardHoverClass, cardTitleHoverClass } from "@/components/ui/card-hover";

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    category: string;
    type: string;
    format: string;
    price: string;
    rating: number;
    downloads: string;
    description: string;
    author: string;
    tags: string[];
    features: string[];
    thumbnail: string;
    isPremium: boolean;
    lastUpdated: string;
  };
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getFormatBg = (thumbnail: string) => {
    const char = thumbnail.toUpperCase().charAt(0);
    const bgColors: Record<string, string> = {
      P: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      B: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      M: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      F: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      R: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      L: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      C: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      T: "bg-teal-500/20 text-teal-400 border-teal-500/30",
      S: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    };
    return bgColors[char] || "bg-white/10 text-white/70 border-white/10";
  };

  const getCategoryColor = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes("planning") || lower.includes("strategy")) return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    if (lower.includes("legal") || lower.includes("compliance")) return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    if (lower.includes("marketing") || lower.includes("sales")) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (lower.includes("fundraising")) return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    if (lower.includes("finance") || lower.includes("accounting")) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    return "bg-white/5 text-gray-400 border-white/5";
  };

  return (
    <div className={`flex flex-col bg-[#0c0c0c] border border-white/10 rounded-xl p-4 h-full ${cardHoverClass}`}>
      <CardHoverGlow />
      {/* Top Header: icon badge + rating badge */}
      <div className="relative flex items-start justify-between gap-2 mb-3">
        {/* Format Initial Icon Badge */}
        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-mono font-black text-sm flex-shrink-0 ${getFormatBg(resource.thumbnail)}`}>
          {resource.thumbnail}
        </div>

        {/* Rating bubble */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full text-[10.5px] font-mono text-gray-300">
          <span className="material-symbols-outlined text-[12px] text-accent-yellow">star</span>
          <span className="font-bold">{resource.rating}</span>
        </div>
      </div>

      {/* Main Title & Badges */}
      <div className="mb-2">
        <h3 className={`relative font-mono text-[13.5px] font-bold text-white leading-tight truncate ${cardTitleHoverClass}`} title={resource.title}>
          <Link href={`/resources/${resource.id}`}>{resource.title}</Link>
        </h3>
        
        {/* Row of pill tags */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <span className={`px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide rounded-full border ${getCategoryColor(resource.category)}`}>
            {resource.category}
          </span>
          <span className="px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide rounded-full border border-white/5 bg-white/5 text-gray-400">
            {resource.type}
          </span>
          <span className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide rounded-full border ${
            resource.price === 'Free' 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-accent-yellow/15 text-accent-yellow border-accent-yellow/20'
          }`}>
            {resource.price}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="flex-grow mb-4 mt-1">
        <p className="font-sans text-[12px] text-gray-400 leading-relaxed line-clamp-3">
          {resource.description}
        </p>
      </div>

      {/* Grid statistics: Downloads + Author */}
      <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 mb-4 text-[11px] font-mono text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px]">download</span>
          <span>{resource.downloads}</span>
        </div>
        <div className="flex items-center gap-1.5 truncate">
          <span className="material-symbols-outlined text-[14px]">person</span>
          <span className="truncate">{resource.author}</span>
        </div>
      </div>

      {/* Footer: View Details CTA */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <Link
          href={`/resources/${resource.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-mono text-[11px] font-bold transition-all"
        >
          <span>View Details</span>
        </Link>
        
        {/* Redirection Direct Download Arrow Button */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#ffd700] text-black hover:bg-[#ffe033] transition-colors"
          title={resource.price === 'Free' ? 'Get Free' : 'Access'}
          aria-label={resource.price === 'Free' ? 'Get Free Resource' : 'Access Resource'}
        >
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}