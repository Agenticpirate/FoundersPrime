export default function DealsFooter() {
  return (
    <footer className="bg-ink text-white py-12 border-t-4 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined">rocket_launch</span>
              <span className="font-bold font-display text-xl">FoundersPrime</span>
            </div>
            <p className="text-gray-400 text-sm">Empowering the next generation of founders with the resources they need to succeed.</p>
          </div>
          <div>
            <h5 className="font-bold mb-4 font-mono text-primary">PLATFORM</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a className="hover:text-white" href="#">Deals</a></li>
              <li><a className="hover:text-white" href="#">Grants</a></li>
              <li><a className="hover:text-white" href="#">Programs</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 font-mono text-primary">COMPANY</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a className="hover:text-white" href="#">About Us</a></li>
              <li><a className="hover:text-white" href="#">Contact</a></li>
              <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 font-mono text-primary">NEWSLETTER</h5>
            <div className="flex gap-2">
              <input 
                className="w-full bg-gray-800 border border-gray-700 p-2 text-sm text-white focus:outline-none focus:border-primary" 
                placeholder="Email address" 
                type="email"
              />
              <button className="bg-primary text-ink px-3 font-bold">OK</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 font-mono">
          © 2025 FoundersPrime Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}