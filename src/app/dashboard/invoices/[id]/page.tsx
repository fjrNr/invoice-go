import { getInvoice } from './actions'
import InvoiceActions from './InvoiceActions'

type InvoiceItem = {
  name: string
  quantity: number
  price: number
}

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const invoice = await getInvoice(id)
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
    <div className="min-h-screen bg-[#FFFBF5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-extrabold text-[#1A1A1A] font-heading tracking-tight">
                  {invoice.invoice_number}
                </h1>
                {invoice.status === 'paid' ? (
                  <span className="inline-flex px-4 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-700 font-heading">
                    Lunas
                  </span>
                ) : (
                  <span className="inline-flex px-4 py-2 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-700 font-heading">
                    Belum Dibayar
                  </span>
                )}
              </div>
              <p className="text-[#1A1A1A]/70 font-body">
                Dibuat pada {formatDate(invoice.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Client Info Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8 mb-6">
          <h2 className="text-xl font-bold text-[#1A1A1A] font-heading mb-6">
            Informasi Client
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A]/70 mb-2 font-body">
                Nama Client
              </label>
              <p className="text-base font-semibold text-[#1A1A1A] font-heading">
                {invoice.client_name}
              </p>
            </div>
            {invoice.client_email && (
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A]/70 mb-2 font-body">
                  Email Client
                </label>
                <p className="text-base text-[#1A1A1A] font-body">
                  {invoice.client_email}
                </p>
              </div>
            )}
            {invoice.due_date && (
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A]/70 mb-2 font-body">
                  Jatuh Tempo
                </label>
                <p className="text-base text-[#1A1A1A] font-body">
                  {formatDate(invoice.due_date)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Items Table Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8 mb-6">
          <h2 className="text-xl font-bold text-[#1A1A1A] font-heading mb-6">
            Detail Items
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                    Item
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                    Harga
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
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

          {/* Total */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-[#1A1A1A] font-heading">
                Total
              </span>
              <span className="text-3xl font-bold text-[#E85D04] font-heading">
                {formatRupiah(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes Card (if exists) */}
        {invoice.notes && (
          <div className="bg-white rounded-2xl shadow-lg shadow-[#E85D04]/20 p-8 mb-6">
            <h2 className="text-xl font-bold text-[#1A1A1A] font-heading mb-4">
              Catatan
            </h2>
            <p className="text-[#1A1A1A]/80 font-body whitespace-pre-wrap">
              {invoice.notes}
            </p>
          </div>
        )}

        {/* Actions */}
        <InvoiceActions
          invoiceId={invoice.id}
          currentStatus={invoice.status}
        />
      </div>
    </div>
  )
}
