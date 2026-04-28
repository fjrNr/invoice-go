"use client";

import { useEffect, useRef } from "react";

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(".testimonial-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      quote:
        "InvoiceGo memudahkan saya mengelola invoice klien. Sangat cepat dan mudah digunakan!",
      name: "Budi Santoso",
      role: "Freelancer Web Developer",
      company: "BudiWeb Studio",
      delay: "animation-delay-100",
    },
    {
      quote:
        "Sejak menggunakan InvoiceGo, administrasi keuangan bisnis saya jadi lebih rapi dan profesional.",
      name: "Sari Wijaya",
      role: "Owner",
      company: "Toko Online Sari",
      delay: "animation-delay-200",
    },
    {
      quote:
        "Fitur share link-nya sangat membantu. Klien saya bisa langsung bayar tanpa perlu download PDF.",
      name: "Ahmad Rizki",
      role: "CEO",
      company: "Digital Agency Rizki",
      delay: "animation-delay-300",
    },
  ];

  return (
    <section
      id="testimoni"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center md:text-left">
            <p className="text-4xl sm:text-5xl font-bold text-[#E85D04] font-heading mb-2">
              10,000+
            </p>
            <p className="text-[#1A1A1A]/70 font-body">Invoice Dibuat</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-4xl sm:text-5xl font-bold text-[#E85D04] font-heading mb-2">
              5,000+
            </p>
            <p className="text-[#1A1A1A]/70 font-body">Pengguna Aktif</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-4xl sm:text-5xl font-bold text-[#E85D04] font-heading mb-2">
              99.9%
            </p>
            <p className="text-[#1A1A1A]/70 font-body">Uptime</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-4xl sm:text-5xl font-bold text-[#E85D04] font-heading mb-2">
              4.9/5
            </p>
            <p className="text-[#1A1A1A]/70 font-body">Rating User</p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] font-heading tracking-tight mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-lg text-[#1A1A1A]/70 font-body max-w-2xl mx-auto">
            Ribuan pengguna telah merasakan kemudahan mengelola invoice dengan
            InvoiceGo
          </p>
        </div>

        {/* Asymmetric Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card opacity-0 ${testimonial.delay} bg-[#FFFBF5] rounded-lg p-8 shadow-[#E85D04]/10 shadow-lg hover:shadow-[#E85D04]/20 transition-all duration-300`}
              style={{
                transform:
                  index === 1
                    ? "translateY(30px)"
                    : index === 2
                    ? "translateY(15px)"
                    : "translateY(0)",
              }}
            >
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-[#E85D04]/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-[#1A1A1A]/80 font-body text-base leading-relaxed mb-6">
                &quot;{testimonial.quote}&quot;
              </p>
              <div>
                <p className="font-bold text-[#1A1A1A] font-heading">
                  {testimonial.name}
                </p>
                <p className="text-sm text-[#1A1A1A]/60 font-body">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
