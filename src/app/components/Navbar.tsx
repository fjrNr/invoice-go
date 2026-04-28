"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFFBF5]/90 backdrop-blur-md shadow-[#E85D04]/20 shadow-md md:shadow-xl md:mx-8 lg:mx-16 md:mt-4 md:rounded-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-extrabold text-[#1A1A1A] font-heading tracking-tight">
              InvoiceGo
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#fitur"
              className="text-[#1A1A1A] hover:text-[#E85D04] transition-colors font-body font-semibold text-sm"
            >
              Fitur
            </a>
            <a
              href="#harga"
              className="text-[#1A1A1A] hover:text-[#E85D04] transition-colors font-body font-semibold text-sm"
            >
              Harga
            </a>
            <a
              href="#testimoni"
              className="text-[#1A1A1A] hover:text-[#E85D04] transition-colors font-body font-semibold text-sm"
            >
              Testimoni
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="/login">
              <button className="px-6 py-2.5 bg-[#E85D04] hover:bg-[#c94d03] text-white font-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[#E85D04]/20 shadow-lg">
                Mulai Gratis
              </button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#1A1A1A] hover:text-[#E85D04] transition-colors"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#FFFBF5] border-t border-gray-200 animate-fade-in-up">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <a
                href="#fitur"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#1A1A1A] hover:text-[#E85D04] hover:bg-gray-50 transition-all font-body"
              >
                Fitur
              </a>
              <a
                href="#harga"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#1A1A1A] hover:text-[#E85D04] hover:bg-gray-50 transition-all font-body"
              >
                Harga
              </a>
              <a
                href="#testimoni"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#1A1A1A] hover:text-[#E85D04] hover:bg-gray-50 transition-all font-body"
              >
                Testimoni
              </a>
              <div className="pt-2">
                <button className="w-full px-6 py-2.5 bg-[#E85D04] hover:bg-[#c94d03] text-white font-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[#E85D04]/20 shadow-lg">
                  Mulai Gratis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
