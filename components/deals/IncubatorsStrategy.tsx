export default function IncubatorsStrategy() {
  return (
    <div className="bg-white border-2 border-black p-6 mb-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 bg-primary border-2 border-black"></div>
        <h2 className="font-mono text-2xl font-bold">Incubator vs Accelerator: What's the Difference?</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border-2 border-black p-5 bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-xl">factory</span>
            <h3 className="font-mono font-bold text-base">Incubators & Venture Studios</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
              <span><strong>Longer timeline:</strong> 6-24 months of support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
              <span><strong>Earlier stage:</strong> Pre-idea to MVP</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
              <span><strong>Infrastructure:</strong> Lab space, prototyping, co-working</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
              <span><strong>Often equity-free:</strong> 30% don't take equity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
              <span><strong>Venture Studios:</strong> Co-found companies with you</span>
            </li>
          </ul>
        </div>

        <div className="border-2 border-black p-5 bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-xl">rocket_launch</span>
            <h3 className="font-mono font-bold text-base">Accelerators</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
              <span><strong>Fixed timeline:</strong> 3-6 month cohorts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
              <span><strong>Later stage:</strong> MVP to early traction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
              <span><strong>Mentorship:</strong> Intensive coaching & network access</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
              <span><strong>Investment:</strong> $50k-$500k for equity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
              <span><strong>Demo Day:</strong> Pitch to investors at graduation</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 p-4 bg-accent-yellow border-2 border-black">
        <p className="text-sm font-mono">
          <strong>💡 Pro Tip:</strong> If you're pre-idea or need lab space, start with an incubator. If you have an MVP and need to scale fast, apply to accelerators.
        </p>
      </div>
    </div>
  )
}