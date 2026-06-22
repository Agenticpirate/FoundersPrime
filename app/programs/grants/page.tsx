import { redirect } from 'next/navigation'

export default function GrantsPage() {
  redirect('/programs?type=grants')
}
