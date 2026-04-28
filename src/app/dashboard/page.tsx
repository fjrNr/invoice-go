import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from './LogoutButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-[#1A1A1A] font-heading tracking-tight">
                Dashboard
              </h1>
              <p className="mt-2 text-[#1A1A1A]/70 font-body">
                Selamat datang kembali!
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8">
          <h2 className="text-xl font-bold text-[#1A1A1A] font-heading tracking-tight mb-4">
            Informasi Akun
          </h2>
          <div className="space-y-3 font-body">
            <div>
              <span className="text-sm font-medium text-[#1A1A1A]/70">Email:</span>
              <p className="text-[#1A1A1A]">{user.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-[#1A1A1A]/70">User ID:</span>
              <p className="text-[#1A1A1A] text-sm font-mono">{user.id}</p>
            </div>
            {user.user_metadata?.full_name && (
              <div>
                <span className="text-sm font-medium text-[#1A1A1A]/70">Nama:</span>
                <p className="text-[#1A1A1A]">{user.user_metadata.full_name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Placeholder for future features */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8">
          <h2 className="text-xl font-bold text-[#1A1A1A] font-heading tracking-tight mb-4">
            Fitur akan segera hadir
          </h2>
          <p className="text-[#1A1A1A]/70 font-body">
            Dashboard ini masih dalam pengembangan. Fitur-fitur seperti pembuatan invoice,
            manajemen klien, dan laporan keuangan akan segera tersedia.
          </p>
        </div>
      </div>
    </div>
  )
}
