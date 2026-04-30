"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    let mounted = true
    
    const checkAuth = async () => {
      // Check user tanpa menyimpan reference ke supabase
      const { data: { user } } = await createClient().auth.getUser()
      
      if (mounted && user) {
        router.replace('/dashboard')
      } else if (mounted) {
        setIsChecking(false)
      }
    }
    
    checkAuth()
    
    // Cleanup untuk prevent memory leak
    return () => { mounted = false }
  }, [router]) // Hanya router sebagai dependency (stable)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await createClient().auth.signInWithOtp({
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

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5]">
        <div className="animate-spin h-8 w-8 border-4 border-[#E85D04] border-t-transparent rounded-full" />
      </div>
    )
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent font-body text-[#1A1A1A] bg-white"
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
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#E85D04] hover:bg-[#d95404] font-heading disabled:opacity-50"
          >
            {loading ? 'Mengirim...' : 'Kirim Magic Link'}
          </button>
        </form>

        <div className="text-center">
          <a href="/" className="text-sm font-medium text-[#E85D04] hover:text-[#d95404] font-body">
            ← Kembali ke halaman utama
          </a>
        </div>
      </div>
    </div>
  )
}