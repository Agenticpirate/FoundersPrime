import { redirect } from 'next/navigation'

export default function FreeAccessPage() {
  redirect('/student-benefits?type=free-access')
}
