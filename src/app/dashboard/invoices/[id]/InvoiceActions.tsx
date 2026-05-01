'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toggleInvoiceStatus, deleteInvoice } from './actions'

type InvoiceActionsProps = {
  invoiceId: string
  currentStatus: 'paid' | 'unpaid'
}

export default function InvoiceActions({ invoiceId, currentStatus }: InvoiceActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [message, setMessage] = useState('')

  const handleToggleStatus = async () => {
    setStatusLoading(true)
    setMessage('')

    const result = await toggleInvoiceStatus(invoiceId)

    if (result?.error) {
      setMessage(result.error)
    } else if (result?.success) {
      setMessage(result.newStatus === 'paid' ? 'Invoice ditandai lunas!' : 'Invoice ditandai belum bayar')
      setTimeout(() => {
        router.refresh()
      }, 1000)
    }

    setStatusLoading(false)
  }

  const handleShareLink = async () => {
    // Use public invoice URL (/invoice/[id] instead of /dashboard/invoices/[id])
    const publicUrl = window.location.origin + `/invoice/${invoiceId}`
    try {
      await navigator.clipboard.writeText(publicUrl)
      setMessage('Link publik berhasil disalin!')
    } catch (err) {
      setMessage('Gagal menyalin link')
    }
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      return
    }

    setLoading(true)
    const result = await deleteInvoice(invoiceId)

    if (result?.error) {
      setMessage(result.error)
      setLoading(false)
      setShowDeleteConfirm(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="space-y-4">
      {message && (
        <div className={`rounded-lg p-4 border ${
          message.includes('Gagal') || message.includes('gagal')
            ? 'bg-red-50 border-red-200'
            : 'bg-green-50 border-green-200'
        }`}>
          <p className={`text-sm font-body ${
            message.includes('Gagal') || message.includes('gagal')
              ? 'text-red-800'
              : 'text-green-800'
          }`}>
            {message}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleToggleStatus}
          disabled={statusLoading}
          className={`px-6 py-3 font-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            currentStatus === 'paid'
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-500/20'
              : 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20'
          }`}
        >
          {statusLoading ? 'Memproses...' : currentStatus === 'paid' ? 'Tandai Belum Bayar' : 'Tandai Lunas'}
        </button>

        <button
          onClick={handleShareLink}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-blue-500/20 shadow-lg"
        >
          Share Link Publik
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-red-500/20 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Menghapus...' : showDeleteConfirm ? 'Konfirmasi Hapus' : 'Hapus Invoice'}
        </button>

        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 border-2 border-[#E85D04] text-[#E85D04] hover:bg-[#E85D04] hover:text-white font-heading font-semibold rounded-lg transition-all duration-300"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  )
}
