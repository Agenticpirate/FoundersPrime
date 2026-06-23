import { redirect } from 'next/navigation'

export default function RedirectGrantsPage() {
  redirect('/programs?type=grants')
}
