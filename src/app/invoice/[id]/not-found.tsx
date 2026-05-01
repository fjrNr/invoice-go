import Link from 'next/link'

export default function InvoiceNotFound() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-[#E85D04]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#E85D04]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#1A1A1A] font-heading mb-2">
          Invoice Tidak Ditemukan
        </h1>
        <p className="text-[#1A1A1A]/70 font-body mb-6">
          Invoice yang Anda cari mungkin telah dihapus atau link tidak valid.
        </p>
        <Link href="/">
          <button className="px-6 py-3 bg-[#E85D04] hover:bg-[#c94d03] text-white font-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[#E85D04]/20 shadow-lg">
            Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  )
}
