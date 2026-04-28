export default function InvoicePreview() {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-[#E85D04]/20 shadow-xl max-w-md mx-auto lg:max-w-none lg:mx-0 lg:-translate-y-8">
      {/* Invoice Header */}
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E85D04] rounded-lg mb-2 sm:mb-3"></div>
          <h3 className="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wider font-heading">
            INVOICE
          </h3>
          <p className="text-xs sm:text-sm font-bold text-gray-900 font-heading">
            INV-2024-001
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] sm:text-xs text-gray-500 font-body">
            Tanggal: 31 Mar 2024
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 font-body">
            Jatuh Tempo: 30 Apr 2024
          </p>
        </div>
      </div>

      {/* Client Info */}
      <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <p className="text-[10px] sm:text-xs text-gray-500 mb-1 font-body">
          Kepada:
        </p>
        <p className="text-xs sm:text-sm font-semibold text-gray-900 font-heading">
          PT Contoh Indonesia
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 font-body">
          Jl. Bisnis Sukses No. 123
        </p>
        <p className="text-[10px] sm:text-xs text-gray-600 font-body">
          Jakarta Selatan, 12345
        </p>
      </div>

      {/* Line Items */}
      <div className="mb-3 sm:mb-4">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-1 sm:py-2 text-[10px] sm:text-xs font-semibold text-gray-500 font-heading">
                DESKRIPSI
              </th>
              <th className="text-center py-1 sm:py-2 text-[10px] sm:text-xs font-semibold text-gray-500 font-heading">
                QTY
              </th>
              <th className="text-right py-1 sm:py-2 text-[10px] sm:text-xs font-semibold text-gray-500 font-heading">
                JUMLAH
              </th>
            </tr>
          </thead>
          <tbody className="font-body">
            <tr className="border-b border-gray-100">
              <td className="py-1 sm:py-2 text-gray-900 text-[10px] sm:text-xs hidden sm:table-cell">
                Jasa Web Development
              </td>
              <td className="py-1 sm:py-2 text-gray-900 text-[10px] sm:text-xs sm:hidden">
                Web Dev
              </td>
              <td className="py-1 sm:py-2 text-center text-gray-600 text-[10px] sm:text-xs">
                1
              </td>
              <td className="py-1 sm:py-2 text-right text-gray-900 text-[10px] sm:text-xs">
                5jt
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-1 sm:py-2 text-gray-900 text-[10px] sm:text-xs hidden sm:table-cell">
                Hosting (1 thn)
              </td>
              <td className="py-1 sm:py-2 text-gray-900 text-[10px] sm:text-xs sm:hidden">
                Hosting
              </td>
              <td className="py-1 sm:py-2 text-center text-gray-600 text-[10px] sm:text-xs">
                1
              </td>
              <td className="py-1 sm:py-2 text-right text-gray-900 text-[10px] sm:text-xs">
                1.2jt
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-1 sm:py-2 text-gray-900 text-[10px] sm:text-xs">
                Maintenance
              </td>
              <td className="py-1 sm:py-2 text-center text-gray-600 text-[10px] sm:text-xs">
                1
              </td>
              <td className="py-1 sm:py-2 text-right text-gray-900 text-[10px] sm:text-xs">
                500rb
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Total Section */}
      <div className="flex justify-between items-center pt-2">
        <div>
          <span className="inline-block px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-[10px] sm:text-xs font-semibold rounded-full font-heading">
            Lunas
          </span>
        </div>
        <div className="text-right">
          <p className="text-[10px] sm:text-xs text-gray-500 mb-1 font-body">
            TOTAL
          </p>
          <p className="text-xl sm:text-2xl font-bold text-[#E85D04] font-heading">
            Rp 6.7jt
          </p>
        </div>
      </div>
    </div>
  );
}
