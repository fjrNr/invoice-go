"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { redirect, useRouter} from 'next/navigation'

export default function LoginPage() {
  // const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        redirect('/dashboard')
      }
    }
    checkUser()

    // Check for error params
    // const errorParam = searchParams.get('error')
    // if (errorParam === 'auth_code_error') {
    //   setError('Terjadi kesalahan saat autentikasi. Silakan coba lagi.')
    // }
  }, [
    // searchParams
    router, supabase])

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setMessage('Cek email kamu untuk link login')
    } catch (err: any) {
      setError(err.message || 'Gagal mengirim magic link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#FFFBF5]">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[#1A1A1A] font-heading tracking-tight">
            Login
          </h1>
          <p className="mt-3 text-lg text-[#1A1A1A]/70 font-body">
            Masuk dengan magic link tanpa password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2 font-body">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent font-body text-[#1A1A1A] bg-white transition-all"
              placeholder="nama@email.com"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <p className="text-sm text-red-800 font-body">{error}</p>
            </div>
          )}

          {message && (
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <p className="text-sm text-green-800 font-body">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#E85D04] hover:bg-[#d95404] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85D04] font-heading tracking-tight transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Mengirim...' : 'Kirim Magic Link'}
          </button>
        </form>

        {/* Back to home */}
        <div className="text-center">
          <a
            href="/"
            className="text-sm font-medium text-[#E85D04] hover:text-[#d95404] font-body transition-colors"
          >
            ← Kembali ke halaman utama
          </a>
        </div>
      </div>
    </div>
  )
}
