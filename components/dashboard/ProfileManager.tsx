'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface ProfileManagerProps {
  initialName: string
  initialEmail: string
  initialAvatar: string | null
  memberSince: string
}

export default function ProfileManager({ initialName, initialEmail, initialAvatar, memberSince }: ProfileManagerProps) {
  const [name, setName] = useState(initialName)
  const [avatar, setAvatar] = useState(initialAvatar)
  const [avatarError, setAvatarError] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleSave = async () => {
    if (!name.trim() || name.trim().length < 2) {
      showMessage('error', 'Name must be at least 2 characters')
      return
    }
    setSaving(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name.trim() }
      })
      if (error) throw error
      showMessage('success', 'Name updated successfully')
      setIsEditing(false)
      router.refresh()
    } catch (err: any) {
      showMessage('error', err.message || 'Failed to update')
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      showMessage('error', 'Image must be under 2MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please upload an image file')
      return
    }
    setUploading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const ext = file.name.split('.').pop() || 'jpg'
      const filePath = `avatars/${user.id}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true, contentType: file.type })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const avatarUrl = publicUrl + '?v=' + Date.now()

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl }
      })
      if (updateError) throw updateError

      setAvatar(avatarUrl)
      setAvatarError(false)
      showMessage('success', 'Photo updated')
      router.refresh()
    } catch (err: any) {
      showMessage('error', err.message || 'Upload failed. Make sure the avatars bucket exists in Supabase Storage.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const hasValidAvatar = avatar && !avatarError

  return (
    <div className="bg-white dark:bg-[#0d0d0d] border border-black/[0.08] dark:border-white/[0.1] md:border-2 md:border-black dark:md:border-white/10 shadow-sm md:shadow-[3px_3px_0px_#111] dark:md:shadow-[3px_3px_0px_rgba(255,255,255,0.06)] rounded-xl md:rounded-none p-3.5 md:p-6">
      <div className="flex items-center justify-between mb-3 md:mb-5">
        <h2 className="font-mono font-bold text-[11px] md:text-sm uppercase text-gray-400 dark:text-gray-500">Profile</h2>
        {!isEditing ? (
          <button type="button" onClick={() => setIsEditing(true)} className="text-[10px] md:text-xs font-mono font-bold text-primary hover:underline uppercase flex items-center gap-1">
            <span className="material-symbols-outlined !text-[14px]">edit</span> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => { setIsEditing(false); setName(initialName) }}
              className="text-[10px] md:text-xs font-mono font-bold text-gray-400 hover:text-black dark:hover:text-white uppercase px-2 py-1">
              Cancel
            </button>
            <button type="button" onClick={handleSave} disabled={saving}
              className="text-[10px] md:text-xs font-mono font-bold bg-black dark:bg-white text-white dark:text-black px-3 py-1 uppercase hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 flex items-center gap-1 rounded-md md:rounded-none">
              {saving ? <><span className="material-symbols-outlined text-xs animate-spin">progress_activity</span> Saving</> : 'Save'}
            </button>
          </div>
        )}
      </div>

      {message && (
        <div className={`mb-3 md:mb-4 px-2.5 md:px-3 py-1.5 md:py-2 text-[11px] md:text-xs font-mono font-bold flex items-center gap-2 rounded-lg md:rounded-none ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'}`}>
          <span className="material-symbols-outlined !text-[14px]">{message.type === 'success' ? 'check_circle' : 'error'}</span>
          {message.text}
        </div>
      )}

      <div className="flex items-start gap-3 md:gap-5">
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="relative group cursor-pointer disabled:cursor-wait focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <div className="w-12 h-12 md:w-20 md:h-20 bg-gray-100 dark:bg-white/5 flex items-center justify-center overflow-hidden border border-black/10 dark:border-white/20 md:border-2 rounded-xl md:rounded-none">
              {hasValidAvatar ? (
                <img
                  src={avatar!}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span className="material-symbols-outlined !text-[28px] md:text-4xl text-gray-400 dark:text-gray-600">account_circle</span>
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl md:rounded-none">
              {uploading ? (
                <span className="material-symbols-outlined text-white text-lg animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined text-white text-lg">photo_camera</span>
              )}
            </div>
          </button>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleAvatarUpload} />
          <p className="text-[8px] md:text-[9px] text-gray-400 text-center mt-1 font-mono">
            {uploading ? '…' : 'Photo'}
          </p>
        </div>

        <div className="flex-1 space-y-2 md:space-y-3 min-w-0">
          <div>
            <label htmlFor="profile-display-name" className="text-[9px] md:text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase block mb-0.5 md:mb-1">Display Name</label>
            {isEditing ? (
              <input
                id="profile-display-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                className="w-full px-2.5 md:px-3 py-1.5 md:py-2 border border-black/15 dark:border-white/20 md:border-2 bg-gray-50 dark:bg-white/5 text-black dark:text-white outline-none transition-all font-mono text-[13px] md:text-sm font-medium rounded-lg md:rounded-none"
                placeholder="Your name"
                autoFocus
              />
            ) : (
              <p className="text-[13px] md:text-sm font-bold text-black dark:text-white">{name}</p>
            )}
          </div>
          <div>
            <span className="text-[9px] md:text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase block mb-0.5 md:mb-1">Email</span>
            <p className="text-[12px] md:text-sm font-mono text-gray-600 dark:text-gray-400 truncate">{initialEmail}</p>
          </div>
          <div>
            <span className="text-[9px] md:text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase block mb-0.5 md:mb-1">Member Since</span>
            <p className="text-[12px] md:text-sm text-gray-600 dark:text-gray-400">{memberSince}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
