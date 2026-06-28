import { Metadata } from 'next'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminAuthGuard from '../../components/admin/AdminAuthGuard'

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Administrative interface for managing FoundersPrime platform.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#090a0f] antialiased flex flex-col md:flex-row overflow-x-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  )
}