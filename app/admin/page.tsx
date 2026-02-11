import { Metadata } from 'next'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminDashboard from '../../components/admin/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard | FoundersPrime',
  description: 'Administrative dashboard for managing FoundersPrime platform content, users, and analytics.',
}

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader />
      <AdminDashboard />
    </>
  )
}