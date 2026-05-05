export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Siap Mulai?
          </h2>
          <p className="text-[#1A1A1A]/60 font-body mb-8 max-w-2xl mx-auto text-gray-300">
            Bergabung dengan ribuan bisnis yang sudah menggunakan InvoiceCepat
          </p>
          <button className="px-8 py-4 bg-[#E85D04] hover:bg-[#c94d03] text-white font-heading font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[#E85D04]/20 shadow-lg text-lg">
            Mulai Gratis Sekarang
          </button>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
          <div>
            <h4 className="font-heading font-bold mb-4">Product</h4>
            <ul className="space-y-2 font-body">
              <li>
                <a
                  href="#fitur"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Fitur
                </a>
              </li>
              <li>
                <a
                  href="#harga"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Harga
                </a>
              </li>
              <li>
                <a
                  href="#testimoni"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Testimoni
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Company</h4>
            <ul className="space-y-2 font-body">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Karir
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Support</h4>
            <ul className="space-y-2 font-body">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Legal</h4>
            <ul className="space-y-2 font-body">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-extrabold font-heading tracking-tight">
              InvoiceCepat
            </h3>
          </div>
          <p className="text-gray-400 font-body text-sm">
            © {currentYear} InvoiceCepat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
