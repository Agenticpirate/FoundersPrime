"use client";

import StartupGrid from "./StartupGrid";
import StartupsHeader from "./StartupsHeader";

export default function StartupsContent() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <StartupsHeader />
      <StartupGrid />
    </div>
  );
}
