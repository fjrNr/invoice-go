"use client"

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 rounded-lg border-2 border-[#E85D04] text-[#E85D04] hover:bg-[#E85D04] hover:text-white font-semibold font-heading tracking-tight transition-all"
    >
      Logout
    </button>
  )
}
