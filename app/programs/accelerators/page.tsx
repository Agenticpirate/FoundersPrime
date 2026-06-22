import { redirect } from 'next/navigation'

export default function AcceleratorsPage() {
  redirect('/programs?type=accelerators')
}
