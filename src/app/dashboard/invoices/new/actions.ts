'use server'

import { createClient } from '@/lib/supabase/server'
import { generateInvoiceNumber } from '@/lib/invoice'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type InvoiceItem = {
  name: string
  quantity: number
  price: number
}

export async function createInvoice(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Generate nomor invoice
  const { invoiceNumber } = await generateInvoiceNumber(user.id, supabase)

  // Extract form data
  const clientName = formData.get('client_name') as string
  const clientEmail = formData.get('client_email') as string
  const notes = formData.get('notes') as string
  const dueDate = formData.get('due_date') as string

  // Parse items dari JSON string
  const itemsJson = formData.get('items') as string
  let items: InvoiceItem[] = []

  try {
    items = JSON.parse(itemsJson)
  } catch (error) {
    return { error: 'Format items tidak valid' }
  }

  // Validasi
  if (!clientName || clientName.trim() === '') {
    return { error: 'Nama client wajib diisi' }
  }

  if (!items || items.length === 0) {
    return { error: 'Minimal 1 item wajib diisi' }
  }

  // Validasi setiap item harus memiliki nama
  for (let i = 0; i < items.length; i++) {
    const item = items[i]

    if (!item.name || item.name.trim() === '') {
      return { error: `Item #${i + 1}: Nama item wajib diisi` }
    }

    if (!item.quantity || item.quantity < 1) {
      return { error: `Item #${i + 1}: Jumlah minimal 1` }
    }

    if (item.price === undefined || item.price === null || item.price < 0) {
      return { error: `Item #${i + 1}: Harga wajib diisi dengan benar` }
    }
  }

  // Calculate total
  const total = items.reduce((sum, item) => {
    return sum + (item.quantity * item.price)
  }, 0)

  // Insert ke database
  const { error } = await supabase.from('invoices').insert({
    user_id: user.id,
    invoice_number: invoiceNumber,
    client_name: clientName,
    client_email: clientEmail || null,
    items: items,
    total: total,
    status: 'unpaid',
    notes: notes || null,
    due_date: dueDate ? new Date(dueDate).toISOString() : null,
  })

  if (error) {
    console.error('Error creating invoice:', error)

    // Error message yang lebih spesifik
    if (error.code === '42P01') {
      return { error: 'Tabel invoices belum dibuat. Jalankan migration terlebih dahulu.' }
    }

    if (error.code === '42501') {
      return { error: 'Anda tidak punya akses. Periksa RLS policy di Supabase.' }
    }

    return {
      error: `Gagal menyimpan invoice: ${error.message || 'Unknown error'} (Code: ${error.code})`
    }
  }

  // Revalidate dashboard cache
  revalidatePath('/dashboard')

  // Redirect ke dashboard
  redirect('/dashboard')
}
