import InvoicePreview from "./InvoicePreview";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left side - Text Content (60% on desktop) */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#1A1A1A] font-heading leading-tight tracking-tight">
                Bikin Invoice dalam{" "}
                <span className="text-[#E85D04]">30 Detik</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#1A1A1A]/80 font-body max-w-2xl">
                Platform invoice yang simpel, cepat, dan profesional untuk bisnis
                Anda
              </p>
            </div>

            <div className="space-y-4 animate-fade-in-up animation-delay-200">
              <button className="px-8 py-4 bg-[#E85D04] hover:bg-[#c94d03] text-white font-heading font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[#E85D04]/20 shadow-lg text-lg">
                Mulai Gratis Sekarang
              </button>
              <p className="text-sm text-[#1A1A1A]/60 font-body">
                Tanpa kartu kredit. Gratis selamanya untuk paket basic.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-8 items-center pt-4 animate-fade-in-up animation-delay-300">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#1A1A1A] font-heading">
                  10K+
                </p>
                <p className="text-sm text-[#1A1A1A]/60 font-body">Invoice</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#1A1A1A] font-heading">
                  5K+
                </p>
                <p className="text-sm text-[#1A1A1A]/60 font-body">
                  Pengguna Aktif
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#1A1A1A] font-heading">
                  4.9
                </p>
                <p className="text-sm text-[#1A1A1A]/60 font-body">Rating</p>
              </div>
            </div>
          </div>

          {/* Right side - Invoice Preview (40% on desktop) */}
          <div className="lg:col-span-2 animate-fade-in-up animation-delay-400">
            <div className="lg:ml-auto">
              <InvoicePreview />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#E85D04]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E85D04]/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
