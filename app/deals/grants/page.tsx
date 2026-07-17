import { permanentRedirect } from 'next/navigation'

export default function RedirectGrantsPage() {
  permanentRedirect('/programs/grants')
}
