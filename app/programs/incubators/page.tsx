import { redirect } from 'next/navigation'

export default function IncubatorsPage() {
  redirect('/programs?type=incubators')
}
