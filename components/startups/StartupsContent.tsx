"use client";

import StartupGrid from "./StartupGrid";
import StartupsHeader from "./StartupsHeader";

export default function StartupsContent() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      <StartupsHeader />
      <StartupGrid />
    </div>
  );
}
