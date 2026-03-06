"use client";

import { motion } from "framer-motion";
import { YCCompany } from "@/types/startup";
import { Users, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface StartupCardProps {
  company: YCCompany;
}

export default function StartupCard({ company }: StartupCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 overflow-hidden group relative h-full"
    >
      {/* Header with Logo and Title */}
      <div className="px-4 pt-6 pb-3">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center p-2 flex-shrink-0 group-hover:bg-yellow-50 transition-colors">
            {company.small_logo_thumb_url ? (
              <div className="relative w-full h-full">
                <Image
                  src={company.small_logo_thumb_url}
                  alt={`${company.name} logo`}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-400">
                {company.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
              <Link href={`/startups/${company.slug}`} className="hover:underline focus:outline-none before:absolute before:inset-0">
                {company.name}
              </Link>
            </h3>
            <div className="mt-1 flex items-center gap-1 text-xs font-bold text-gray-500">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{company.all_locations || "Remote"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 pb-3 flex-grow">
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 font-medium">
          {company.one_liner}
        </p>
      </div>

      {/* Founders & Stats */}
      <div className="px-4 pb-4 mt-auto border-t-2 border-gray-100 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2 overflow-hidden">
            {company.founders_enriched?.slice(0, 3).map((founder, i) => (
              <div key={i} className="h-8 w-8 rounded-full ring-2 ring-white border border-black bg-gray-200 flex items-center justify-center overflow-hidden relative z-0 hover:z-10 transition-all" title={founder.name}>
                {founder.avatar ? (
                  <Image src={founder.avatar} alt={founder.name} fill sizes="32px" className="object-cover" />
                ) : (
                  <span className="text-[10px] font-bold text-gray-500">{founder.name.charAt(0)}</span>
                )}
              </div>
            ))}
          </div>

          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 flex items-center gap-1 text-xs font-bold text-black border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-colors"
          >
            Visit
            <Globe className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Tags Footer */}
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        {(company.tags || []).slice(0, 2).map((tag, idx) => (
          <span key={idx} className="text-[10px] font-bold uppercase tracking-wide text-gray-600 bg-gray-100 px-2 py-1 border border-gray-200">
            {tag}
          </span>
        ))}
      </div>

    </motion.div>
  );
}