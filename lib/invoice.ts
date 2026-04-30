import { SupabaseClient } from '@supabase/supabase-js'

type InvoiceNumberResult = {
  invoiceNumber: string
  sequence: number
}

/**
 * Generate nomor invoice unik untuk user
 * Format: INV-001, INV-002, INV-003, dst
 *
 * @param userId - UUID user dari Supabase auth
 * @param supabase - Supabase client (server atau browser)
 * @returns Nomor invoice dengan format INV-XXX
 */
export async function generateInvoiceNumber(
  userId: string,
  supabase: SupabaseClient
): Promise<InvoiceNumberResult> {
  // Query invoice terakhir milik user, diurutkan by created_at desc
  const { data: lastInvoice } = await supabase
    .from('invoices')
    .select('invoice_number')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  let nextSequence = 1

  if (lastInvoice?.invoice_number) {
    // Parse nomor urut dari invoice terakhir
    // Contoh: "INV-001" -> extract "001" -> convert to 1
    const match = lastInvoice.invoice_number.match(/INV-(\d+)/)
    if (match && match[1]) {
      const lastSequence = parseInt(match[1], 10)
      nextSequence = lastSequence + 1
    }
  }

  // Format dengan leading zeros (3 digit)
  // 1 -> "001", 12 -> "012", 123 -> "123"
  const paddedNumber = nextSequence.toString().padStart(3, '0')
  const invoiceNumber = `INV-${paddedNumber}`

  return {
    invoiceNumber,
    sequence: nextSequence,
  }
}

/**
 * Helper function untuk extract sequence number dari invoice
 * Contoh: "INV-001" -> 1
 */
export function parseInvoiceSequence(invoiceNumber: string): number | null {
  const match = invoiceNumber.match(/INV-(\d+)/)
  if (match && match[1]) {
    return parseInt(match[1], 10)
  }
  return null
}
