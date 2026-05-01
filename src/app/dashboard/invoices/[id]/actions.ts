'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getInvoice(invoiceId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', invoiceId)
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.error('Error fetching invoice:', error)
    if (error.code === '42P01') {
      console.error('Tabel invoices belum dibuat. Jalankan migration!')
    }
    redirect('/dashboard')
  }

  if (!invoice) {
    console.error('Invoice tidak ditemukan atau bukan milik user')
    redirect('/dashboard')
  }

  return invoice
}

export async function toggleInvoiceStatus(invoiceId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { data: currentInvoice } = await supabase
    .from('invoices')
    .select('status')
    .eq('id', invoiceId)
    .eq('user_id', user.id)
    .single()

  if (!currentInvoice) {
    return { error: 'Invoice tidak ditemukan' }
  }

  const newStatus = currentInvoice.status === 'paid' ? 'unpaid' : 'paid'

  const { error } = await supabase
    .from('invoices')
    .update({ status: newStatus })
    .eq('id', invoiceId)
    .eq('user_id', user.id)

  if (error) {
    return { error: 'Gagal update status invoice' }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/invoices/${invoiceId}`)

  return { success: true, newStatus }
}

export async function deleteInvoice(invoiceId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', invoiceId)
    .eq('user_id', user.id)

  if (error) {
    return { error: 'Gagal menghapus invoice' }
  }

  revalidatePath('/dashboard')

  return { success: true }
}
