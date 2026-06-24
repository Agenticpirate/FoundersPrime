"use client";

import { useState, useMemo } from "react";
import StartupGrid from "./StartupGrid";
import StartupsHeader from "./StartupsHeader";
import StartupsSidebar from "./StartupsSidebar";
import { StartupCardData } from "@/lib/startups-data";

interface StartupsContentProps {
  startups: StartupCardData[];
  count: number;
}

export default function StartupsContent({ startups, count }: StartupsContentProps) {
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    startups.forEach((s) => {
      if (s.industry) {
        counts[s.industry] = (counts[s.industry] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [startups]);

  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <StartupsHeader count={count} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 mt-4">
        <div className="lg:col-span-8 xl:col-span-9">
          <StartupGrid 
            startups={startups} 
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
          />
        </div>
        <div className="lg:col-span-4 xl:col-span-3">
          <StartupsSidebar 
            categories={categories}
            selectedCategory={selectedIndustry}
            onSelectCategory={(cat) => setSelectedIndustry(prev => prev === cat ? "All" : cat)}
          />
        </div>
      </div>
    </div>
  );
}
