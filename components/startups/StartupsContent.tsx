"use client";

import StartupGrid from "./StartupGrid";
import StartupsHeader from "./StartupsHeader";
import { StartupCardData } from "@/lib/startups-data";

interface StartupsContentProps {
  startups: StartupCardData[];
  count: number;
}

export default function StartupsContent({ startups, count }: StartupsContentProps) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      <StartupsHeader count={count} />
      <StartupGrid startups={startups} />
    </div>
  );
}
