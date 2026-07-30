'use client'

import Link from 'next/link'
import ProfileManager from './ProfileManager'
import EmailPreferencesForm from '@/components/email/EmailPreferencesForm'

export default function AccountTab({
  userName,
  userEmail,
  memberSince,
  avatarUrl,
}: {
  userName: string
  userEmail: string
  memberSince: string
  avatarUrl: string | null
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-2.5 md:mb-3">
        <h2 className="font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.14em] text-gray-700 dark:text-gray-300 inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
          Account &amp; Settings
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 md:gap-5">
        <div className="lg:col-span-2 space-y-2.5 md:space-y-4">
          <ProfileManager
            initialName={userName}
            initialEmail={userEmail}
            initialAvatar={avatarUrl}
            memberSince={memberSince}
          />

          <div className="bg-white dark:bg-[#0d0d0d] border border-black/[0.08] dark:border-white/[0.1] md:border-2 md:border-black dark:md:border-white/10 shadow-sm md:shadow-[3px_3px_0px_#111] dark:md:shadow-[3px_3px_0px_rgba(255,255,255,0.06)] rounded-xl md:rounded-sm p-3.5 md:p-5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined !text-[16px] text-black dark:text-white">
                mail
              </span>
              <h3 className="font-mono text-[11px] md:text-[11.5px] font-black uppercase tracking-[0.06em] text-black dark:text-white">
                Email preferences
              </h3>
            </div>
            <p className="text-[11px] md:text-[12px] text-gray-600 dark:text-gray-400 mb-3">
              Choose which optional emails you receive. Off by default.
            </p>
            <EmailPreferencesForm />
          </div>
        </div>

        <div className="bg-white dark:bg-[#0d0d0d] border border-black/[0.08] dark:border-white/[0.1] md:border-2 md:border-black dark:md:border-white/10 shadow-sm md:shadow-[3px_3px_0px_#111] dark:md:shadow-[3px_3px_0px_rgba(255,255,255,0.06)] rounded-xl md:rounded-sm overflow-hidden divide-y divide-black/[0.06] dark:divide-white/10 md:divide-y-2 md:divide-dashed">
          {[
            { href: '/login?view=reset', icon: 'lock_reset', iconBg: 'bg-rose-100 dark:bg-rose-900/30', label: 'Change password', sub: 'Update credentials' },
            { href: '/dashboard?tab=billing', icon: 'credit_card', iconBg: 'bg-amber-100 dark:bg-amber-900/30', label: 'Billing', sub: 'Plan & renewals' },
            { href: '/contact', icon: 'support_agent', iconBg: 'bg-purple-100 dark:bg-purple-900/30', label: 'Help & Support', sub: 'Talk to our team' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center justify-between gap-2.5 px-3 md:px-4 py-2.5 md:py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
                <div className={`w-8 h-8 md:w-9 md:h-9 ${item.iconBg} border border-black/10 dark:border-white/20 md:border-2 rounded-lg md:rounded-sm flex items-center justify-center flex-shrink-0`}>
                  <span className="material-symbols-outlined !text-[15px] md:!text-[16px] text-black dark:text-white">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] md:text-[11.5px] font-black uppercase tracking-[0.04em] text-black dark:text-white leading-tight">{item.label}</p>
                  <p className="text-[9.5px] md:text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">{item.sub}</p>
                </div>
              </div>
              <span className="material-symbols-outlined !text-[15px] md:!text-[16px] text-gray-400 group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white transition-all flex-shrink-0">chevron_right</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
