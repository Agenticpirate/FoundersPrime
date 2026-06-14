'use client'

import { Suspense } from 'react'
import AcceleratorsHeader from '@/components/deals/AcceleratorsHeader'
import AcceleratorsHero from '@/components/deals/AcceleratorsHero'
import AcceleratorsStrategy from '@/components/deals/AcceleratorsStrategy'
import AcceleratorsGrid from '@/components/deals/AcceleratorsGrid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AcceleratorsPage() {
 return (
 <>
 <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
 <Header />
 <main className="flex-1">
 <div className="max-w-[1600px] mx-auto px-4 lg:px-6 pt-6 md:pt-8 pb-2 lg:pb-4">
 <AcceleratorsHeader />

 <Suspense fallback={<HeroSkeleton />}>
 <AcceleratorsHero />
 </Suspense>

 <Suspense fallback={<StrategySkeleton />}>
 <AcceleratorsStrategy />
 </Suspense>

 <Suspense fallback={<GridSkeleton />}>
 <AcceleratorsGrid />
 </Suspense>
 </div>
 </main>
 <Footer />
 </div>
 </>
 )
}

// Loading Skeletons
function HeroSkeleton() {
 return (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10 md:mb-14 animate-pulse">
 <div className="lg:col-span-7 space-y-4">
 <div className="h-8 w-48 bg-gray-300 rounded" />
 <div className="h-16 w-full bg-gray-300 rounded" />
 <div className="h-24 w-full bg-gray-300 rounded" />
 </div>
 <div className="lg:col-span-5 space-y-5">
 <div className="h-24 bg-gray-300 rounded" />
 <div className="h-24 bg-gray-300 rounded" />
 <div className="h-24 bg-gray-300 rounded" />
 </div>
 </div>
 )
}

function StrategySkeleton() {
 return (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 md:mb-14 animate-pulse">
 <div className="lg:col-span-8">
 <div className="h-96 bg-gray-300 rounded" />
 </div>
 <div className="lg:col-span-4 space-y-6">
 <div className="h-48 bg-gray-300 rounded" />
 <div className="h-48 bg-gray-300 rounded" />
 </div>
 </div>
 )
}

function GridSkeleton() {
 return (
 <div className="space-y-8">
 <div className="h-12 bg-gray-300 rounded animate-pulse" />
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {[...Array(6)].map((_, i) => (
 <div key={i} className="h-64 bg-gray-300 rounded animate-pulse" />
 ))}
 </div>
 </div>
 )
}
