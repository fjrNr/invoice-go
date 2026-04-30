'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { generateInvoiceNumber } from '@/lib/invoice'
import { createInvoice } from './actions'

type Item = {
  id: string
  name: string
  quantity: number
  price: number
}

export default function NewInvoicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('Loading...')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: '', quantity: 1, price: 0 }
  ])

  // Load invoice number on mount
  useEffect(() => {
    const loadInvoiceNumber = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { invoiceNumber: num } = await generateInvoiceNumber(user.id, supabase)
      setInvoiceNumber(num)
    }

    loadInvoiceNumber()
  }, [router])

  // Format number to Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Parse Rupiah string to number
  const parseRupiah = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, '')
    return cleaned ? parseInt(cleaned, 10) : 0
  }

  // Calculate total
  const total = items.reduce((sum, item) => {
    return sum + (item.quantity * item.price)
  }, 0)

  // Add new item
  const addItem = () => {
    const newId = Date.now().toString()
    setItems([...items, { id: newId, name: '', quantity: 1, price: 0 }])
  }

  // Remove item
  const removeItem = (id: string) => {
    if (items.length === 1) {
      setError('Minimal 1 item wajib diisi')
      return
    }
    setItems(items.filter(item => item.id !== id))
  }

  // Update item
  const updateItem = (id: string, field: keyof Item, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    }))
  }

  // Handle price input (Rupiah format)
  const handlePriceChange = (id: string, value: string) => {
    const numValue = parseRupiah(value)
    updateItem(id, 'price', numValue)
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validasi client
    if (!clientName.trim()) {
      setError('Nama client wajib diisi')
      return
    }

    // Validasi semua item harus memiliki nama
    const emptyItemIndex = items.findIndex(item => !item.name.trim())

    if (emptyItemIndex !== -1) {
      setError(`Item #${emptyItemIndex + 1}: Nama item wajib diisi`)
      return
    }

    const validItems = items.filter(item => item.name.trim() !== '')

    if (validItems.length === 0) {
      setError('Minimal 1 item wajib diisi')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('client_name', clientName)
      formData.append('client_email', clientEmail)
      formData.append('notes', notes)
      formData.append('due_date', dueDate)
      formData.append('items', JSON.stringify(validItems))

      const result = await createInvoice(formData)

      if (result?.error) {
        setError(result.error)
        setLoading(false)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#1A1A1A] font-heading tracking-tight">
            Bikin Invoice Baru
          </h1>
          <p className="mt-2 text-[#1A1A1A]/70 font-body">
            Isi form di bawah untuk membuat invoice baru
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Invoice Info Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8">
            <h2 className="text-xl font-bold text-[#1A1A1A] font-heading mb-6">
              Informasi Invoice
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Nomor Invoice */}
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2 font-body">
                  Nomor Invoice
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 font-mono text-sm"
                />
              </div>

              {/* Nama Client */}
              <div>
                <label htmlFor="client_name" className="block text-sm font-medium text-[#1A1A1A] mb-2 font-body">
                  Nama Client <span className="text-red-500">*</span>
                </label>
                <input
                  id="client_name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent"
                  placeholder="PT Contoh Indonesia"
                />
              </div>

              {/* Email Client */}
              <div>
                <label htmlFor="client_email" className="block text-sm font-medium text-[#1A1A1A] mb-2 font-body">
                  Email Client
                </label>
                <input
                  id="client_email"
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent"
                  placeholder="nama@contoh.com"
                />
              </div>

              {/* Jatuh Tempo */}
              <div>
                <label htmlFor="due_date" className="block text-sm font-medium text-[#1A1A1A] mb-2 font-body">
                  Jatuh Tempo
                </label>
                <input
                  id="due_date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent"
                />
              </div>
            </div>

            {/* Catatan */}
            <div className="mt-6">
              <label htmlFor="notes" className="block text-sm font-medium text-[#1A1A1A] mb-2 font-body">
                Catatan
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent"
                placeholder="Catatan tambahan untuk invoice ini..."
              />
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] font-heading">
                Items
              </h2>
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-[#E85D04]/10 text-[#E85D04] hover:bg-[#E85D04]/20 font-semibold rounded-lg font-heading text-sm transition-colors"
              >
                + Tambah Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-start p-4 bg-gray-50 rounded-lg">
                  {/* Nama Item */}
                  <div className="col-span-12 md:col-span-5">
                    <label className="block text-xs font-medium text-[#1A1A1A] mb-1 font-body">
                      Nama Item <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent text-sm"
                      placeholder="Jasa Web Development"
                    />
                  </div>

                  {/* Jumlah */}
                  <div className="col-span-4 md:col-span-2">
                    <label className="block text-xs font-medium text-[#1A1A1A] mb-1 font-body">
                      Jumlah
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Harga Satuan */}
                  <div className="col-span-5 md:col-span-3">
                    <label className="block text-xs font-medium text-[#1A1A1A] mb-1 font-body">
                      Harga
                    </label>
                    <input
                      type="text"
                      value={formatRupiah(item.price)}
                      onChange={(e) => handlePriceChange(item.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:border-transparent text-sm font-mono"
                      placeholder="Rp 0"
                    />
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="col-span-3 md:col-span-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#1A1A1A]/60 font-body mb-1">Subtotal</p>
                      <p className="text-sm font-semibold text-[#1A1A1A] font-heading">
                        {formatRupiah(item.quantity * item.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={items.length === 1}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-[#1A1A1A] font-heading">
                  Total
                </span>
                <span className="text-2xl font-bold text-[#E85D04] font-heading">
                  {formatRupiah(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <p className="text-sm text-red-800 font-body">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[#E85D04] hover:bg-[#c94d03] text-white font-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[#E85D04]/20 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Menyimpan...' : 'Simpan Invoice'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 border-2 border-[#E85D04] text-[#E85D04] hover:bg-[#E85D04] hover:text-white font-heading font-semibold rounded-lg transition-all duration-300"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
