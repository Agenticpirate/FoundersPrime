import { redirect } from 'next/navigation'

export default function RedirectAcceleratorsPage() {
  redirect('/programs?type=accelerators')
}
