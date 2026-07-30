'use client'

import { useCallback, useEffect, useState } from 'react'

interface Category {
  key: string
  label: string
  description: string
}

interface Preferences {
  dealAlerts: boolean
  membershipOffers: boolean
  productUpdates: boolean
  optedInAt: string | null
  unsubscribedAllAt: string | null
}

const CATEGORY_TO_FIELD: Record<string, keyof Preferences> = {
  deal_alerts: 'dealAlerts',
  membership_offers: 'membershipOffers',
  product_updates: 'productUpdates',
}

/**
 * Email preference controls, shared by the dashboard panel and the public
 * page reached from an email link.
 *
 * When `token` is supplied the component works without a session, which is what
 * makes unsubscribing possible straight from an email.
 */
export default function EmailPreferencesForm({
  token,
  autoUnsubscribe = false,
}: {
  token?: string
  autoUnsubscribe?: boolean
}) {
  const [categories, setCategories] = useState<Category[]>([])
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const [storageAvailable, setStorageAvailable] = useState(true)

  const endpoint = token
    ? `/api/email/preferences?token=${encodeURIComponent(token)}`
    : '/api/email/preferences'

  const load = useCallback(async () => {
    try {
      const res = await fetch(endpoint)
      const data = await res.json()
      if (!res.ok) {
        setMessage({ ok: false, text: data.error || 'Could not load your preferences.' })
        return
      }
      setCategories(data.categories || [])
      setPreferences(data.preferences)
      setStorageAvailable(data.storageAvailable !== false)
    } catch {
      setMessage({ ok: false, text: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    load()
  }, [load])

  const submit = useCallback(
    async (payload: Record<string, unknown>, busyKey: string) => {
      setSaving(busyKey)
      setMessage(null)
      try {
        const res = await fetch('/api/email/preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, ...(token ? { token } : {}) }),
        })
        const data = await res.json()
        if (!res.ok || !data.success) {
          setMessage({ ok: false, text: data.error || 'Could not save your preferences.' })
          return
        }
        setPreferences(data.preferences)
        setMessage({
          ok: true,
          text: data.unsubscribedAll
            ? 'You are unsubscribed from all optional emails.'
            : 'Preferences saved.',
        })
      } catch {
        setMessage({ ok: false, text: 'Network error. Please try again.' })
      } finally {
        setSaving(null)
      }
    },
    [token]
  )

  // Arriving from an "unsubscribe" link applies the change immediately, so the
  // recipient is not asked to click a second time.
  const [autoRan, setAutoRan] = useState(false)
  useEffect(() => {
    if (!autoUnsubscribe || autoRan || loading || !preferences) return
    setAutoRan(true)
    const alreadyOff =
      !preferences.dealAlerts && !preferences.membershipOffers && !preferences.productUpdates
    if (alreadyOff) {
      setMessage({ ok: true, text: 'You are already unsubscribed from all optional emails.' })
      return
    }
    submit({ unsubscribeAll: true }, 'all')
  }, [autoUnsubscribe, autoRan, loading, preferences, submit])

  const toggle = (categoryKey: string, next: boolean) => {
    submit({ preferences: { [categoryKey]: next } }, categoryKey)
  }

  if (loading) {
    return (
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-500">
        Loading preferences…
      </p>
    )
  }

  if (!preferences) {
    return (
      <div
        role="alert"
        className="border-2 border-red-500/40 bg-red-50 dark:bg-red-900/20 p-4 rounded-sm"
      >
        <p className="text-[13px] text-gray-800 dark:text-gray-200">
          {message?.text || 'These preferences could not be loaded.'}
        </p>
        <p className="mt-2 text-[12px] text-gray-600 dark:text-gray-400">
          Email support@foundersprime.com and we will update your preferences manually.
        </p>
      </div>
    )
  }

  const allOff =
    !preferences.dealAlerts && !preferences.membershipOffers && !preferences.productUpdates

  return (
    <div className="space-y-4">
      {!storageAvailable && (
        <p
          role="status"
          className="border-2 border-amber-500/40 bg-amber-50 dark:bg-amber-900/20 p-3 text-[12px] text-amber-900 dark:text-amber-200 rounded-sm"
        >
          Preference storage is not ready on this environment yet. Nothing is saved, and no optional
          email will be sent.
        </p>
      )}

      {message && (
        <p
          role="status"
          className={`border-2 p-3 text-[12px] rounded-sm ${
            message.ok
              ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-200'
              : 'border-red-500/40 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200'
          }`}
        >
          {message.text}
        </p>
      )}

      <ul className="divide-y-2 divide-dashed divide-black/[0.08] dark:divide-white/10">
        {categories.map((category) => {
          const field = CATEGORY_TO_FIELD[category.key]
          const enabled = field ? Boolean(preferences[field]) : false
          const busy = saving === category.key
          return (
            <li key={category.key} className="flex items-start justify-between gap-4 py-3.5">
              <div className="min-w-0">
                <p className="font-mono text-[11.5px] font-black uppercase tracking-[0.05em] text-black dark:text-white">
                  {category.label}
                </p>
                <p className="mt-1 text-[12px] text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                aria-label={`${enabled ? 'Turn off' : 'Turn on'} ${category.label}`}
                disabled={busy || !storageAvailable}
                onClick={() => toggle(category.key, !enabled)}
                className={`relative shrink-0 h-7 w-12 border-2 border-black dark:border-white/30 transition-colors disabled:opacity-50 ${
                  enabled ? 'bg-accent-yellow' : 'bg-gray-200 dark:bg-white/10'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 bg-black dark:bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="button"
          disabled={saving !== null || allOff || !storageAvailable}
          onClick={() => submit({ unsubscribeAll: true }, 'all')}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 border-2 border-black dark:border-white/30 font-mono text-[11px] font-black uppercase tracking-[0.08em] text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-black dark:disabled:hover:text-white"
        >
          {saving === 'all' ? 'Unsubscribing…' : 'Unsubscribe from all'}
        </button>
        {allOff && (
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gray-500">
            All optional emails are off
          </p>
        )}
      </div>

      <p className="text-[11px] text-gray-500 dark:text-gray-500 leading-relaxed">
        You will still receive essential account emails such as purchase receipts, membership
        activation and password resets. Those are required to run your account and cannot be turned
        off.
      </p>
    </div>
  )
}
