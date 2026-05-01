import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

type InvoiceItem = {
  name: string
  quantity: number
  price: number
}

type Invoice = {
  id: string
  invoice_number: string
  client_name: string
  client_email: string | null
  total: number
  status: 'paid' | 'unpaid'
  due_date: string | null
  created_at: string
  notes: string | null
  items: InvoiceItem[]
  user_id: string
}

async function getPublicInvoice(invoiceId: string): Promise<Invoice | null> {
  const supabase = await createClient()

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', invoiceId)
    .single()

  if (error || !invoice) {
    return null
  }

  return invoice as Invoice
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invoice = await getPublicInvoice(id)

  if (!invoice) {
    return {
      title: 'Invoice Tidak Ditemukan - InvoiceGo',
    }
  }

  return {
    title: `Invoice ${invoice.invoice_number} - ${invoice.client_name}`,
  }
}

export default async function PublicInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const invoice = await getPublicInvoice(id)

  if (!invoice) {
    notFound()
  }

  const items: InvoiceItem[] = invoice.items || []

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString))
  }

  const total = items.reduce((sum, item) => {
    return sum + (item.quantity * item.price)
  }, 0)

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            box-shadow: none !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
      <div className="min-h-screen bg-[#FFFBF5] py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button - Hidden when printing */}
          <div className="mb-6 no-print">
            <a
              href="/"
              className="inline-flex items-center text-[#E85D04] hover:text-[#c94d03] font-body font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Beranda
            </a>
          </div>

          {/* Print Button - Hidden when printing */}
          <div className="mb-6 no-print">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-6 py-3 bg-[#E85D04] hover:bg-[#c94d03] text-white font-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[#E85D04]/20 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Invoice
            </button>
          </div>

          {/* Invoice Container */}
          <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8 sm:p-12 print-container">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b-2 border-gray-200">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#E85D04] font-heading tracking-tight">
                  InvoiceGo
                </h1>
                <p className="text-sm text-[#1A1A1A]/60 font-body mt-1">
                  Platform Invoice Profesional
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <p className="text-xs text-[#1A1A1A]/60 font-body mb-1">INVOICE</p>
                <p className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-heading">
                  {invoice.invoice_number}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-8">
              {invoice.status === 'paid' ? (
                <span className="inline-flex px-4 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-700 font-heading">
                  ✓ Lunas
                </span>
              ) : (
                <span className="inline-flex px-4 py-2 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-700 font-heading">
                  Menunggu Pembayaran
                </span>
              )}
            </div>

            {/* From & To */}
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              {/* From */}
              <div>
                <p className="text-xs font-semibold text-[#1A1A1A]/60 uppercase tracking-wider font-heading mb-3">
                  Dari
                </p>
                <p className="text-base font-semibold text-[#1A1A1A] font-heading">
                  InvoiceGo
                </p>
                <p className="text-sm text-[#1A1A1A]/70 font-body">
                  Platform Invoice Profesional
                </p>
              </div>

              {/* To */}
              <div>
                <p className="text-xs font-semibold text-[#1A1A1A]/60 uppercase tracking-wider font-heading mb-3">
                  Kepada
                </p>
                <p className="text-base font-semibold text-[#1A1A1A] font-heading">
                  {invoice.client_name}
                </p>
                {invoice.client_email && (
                  <p className="text-sm text-[#1A1A1A]/70 font-body">
                    {invoice.client_email}
                  </p>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="grid sm:grid-cols-2 gap-8 mb-8 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-[#1A1A1A]/60 uppercase tracking-wider font-heading mb-2">
                  Tanggal Dibuat
                </p>
                <p className="text-base font-semibold text-[#1A1A1A] font-heading">
                  {formatDate(invoice.created_at)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1A1A1A]/60 uppercase tracking-wider font-heading mb-2">
                  Jatuh Tempo
                </p>
                <p className="text-base font-semibold text-[#1A1A1A] font-heading">
                  {formatDate(invoice.due_date)}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-heading">
                        Deskripsi
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider font-heading">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider font-heading">
                        Harga
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider font-heading">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-4 py-4">
                          <p className="text-sm font-medium text-[#1A1A1A] font-heading">
                            {item.name}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <p className="text-sm text-[#1A1A1A] font-body">
                            {item.quantity}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <p className="text-sm text-[#1A1A1A] font-body font-mono">
                            {formatRupiah(item.price)}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <p className="text-sm font-semibold text-[#1A1A1A] font-heading font-mono">
                            {formatRupiah(item.quantity * item.price)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Section */}
            <div className="flex justify-end mb-8">
              <div className="w-full sm:w-64">
                <div className="bg-[#E85D04]/5 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[#1A1A1A]/70 font-heading">
                      Subtotal
                    </span>
                    <span className="text-base font-semibold text-[#1A1A1A] font-heading">
                      {formatRupiah(total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[#E85D04]/20">
                    <span className="text-lg font-bold text-[#1A1A1A] font-heading">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#E85D04] font-heading">
                      {formatRupiah(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-semibold text-[#1A1A1A]/60 uppercase tracking-wider font-heading mb-2">
                  Catatan
                </p>
                <p className="text-sm text-[#1A1A1A]/80 font-body whitespace-pre-wrap">
                  {invoice.notes}
                </p>
              </div>
            )}

            {/* Footer - Branding */}
            <div className="pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-[#1A1A1A]/60 font-body">
                Dibuat dengan{' '}
                <span className="font-semibold text-[#E85D04]">InvoiceGo</span>
                {' '}— Platform Invoice Profesional
              </p>
              <p className="text-xs text-[#1A1A1A]/40 font-body mt-2">
                {new Date().getFullYear()} InvoiceGo. All rights reserved.
              </p>
            </div>
          </div>

          {/* Print Button Bottom - Hidden when printing */}
          <div className="mt-6 text-center no-print">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-6 py-3 bg-[#E85D04] hover:bg-[#c94d03] text-white font-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[#E85D04]/20 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
