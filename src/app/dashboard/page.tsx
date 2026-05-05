import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from './LogoutButton'
import Link from 'next/link'

type Invoice = {
  id: string
  invoice_number: string
  client_name: string
  total: number
  status: 'paid' | 'unpaid'
  due_date: string
  created_at: string
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch invoices milik user
  const { data: invoices } = await supabase
    .from('invoices')
    .select('id, invoice_number, client_name, total, status, created_at, due_date')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString))
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-[#1A1A1A] font-heading tracking-tight">
                Halo, {user.email}!
              </h1>
              <p className="mt-2 text-[#1A1A1A]/70 font-body">
                Selamat datang kembali di dashboard InvoiceCepat
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* Create Invoice Button */}
        <div className="mb-8">
          <Link href="/dashboard/invoices/new">
            <button className="px-6 py-3 bg-[#E85D04] hover:bg-[#c94d03] text-white font-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[#E85D04]/20 shadow-lg">
              + Bikin Invoice Baru
            </button>
          </Link>
        </div>

        {/* Invoices List */}
        {!invoices || invoices.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-12 text-center">
            <div className="w-20 h-20 bg-[#E85D04]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#E85D04]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] font-heading mb-2">
              Belum ada invoice
            </h2>
            <p className="text-[#1A1A1A]/70 font-body mb-6">
              Yuk bikin invoice pertama kamu!
            </p>
            <Link href="/dashboard/invoices/new">
              <button className="px-6 py-3 bg-[#E85D04] hover:bg-[#c94d03] text-white font-heading font-semibold rounded-lg transition-all duration-300">
                + Bikin Invoice Sekarang
              </button>
            </Link>
          </div>
        ) : (
          // Invoices Table
          <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                      Tanggal Buat
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                      Nomor Invoice
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                      Client
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                      Jatuh Tempo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoices.map((invoice: Invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/dashboard/invoices/${invoice.id}`}
                          className="text-sm text-[#1A1A1A] font-heading hover:text-[#E85D04]"
                        >
                          {formatDate(invoice.created_at)}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/dashboard/invoices/${invoice.id}`}
                          className="text-sm font-semibold text-[#1A1A1A] font-heading hover:text-[#E85D04]"
                        >
                          {invoice.invoice_number}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/dashboard/invoices/${invoice.id}`}
                          className="text-sm text-[#1A1A1A] font-body hover:text-[#E85D04]"
                        >
                          {invoice.client_name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/dashboard/invoices/${invoice.id}`}
                          className="text-sm font-semibold text-[#1A1A1A] font-heading hover:text-[#E85D04]"
                        >
                          {formatRupiah(invoice.total)}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/dashboard/invoices/${invoice.id}`} className="block">
                          {invoice.status === 'paid' ? (
                            <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 font-heading">
                              Lunas
                            </span>
                          ) : (
                            <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 font-heading">
                              Belum Dibayar
                            </span>
                          )}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/dashboard/invoices/${invoice.id}`}
                          className="text-sm text-[#1A1A1A]/70 font-body hover:text-[#E85D04]"
                        >
                          {formatDate(invoice.due_date)}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
