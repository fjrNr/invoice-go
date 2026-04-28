"use client";

import { useEffect, useRef } from "react";

export default function Features() {
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

    const cards = sectionRef.current?.querySelectorAll(".feature-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Cepat",
      description:
        "Buat invoice profesional dalam waktu kurang dari 30 detik. Tidak perlu keahlian teknis.",
      delay: "animation-delay-100",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      ),
      title: "Bisa Share Link",
      description:
        "Kirim invoice ke klien melalui link yang mudah. Tidak perlu lampirkan file PDF.",
      delay: "animation-delay-200",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Bisa Track Status",
      description:
        "Pantau status pembayaran invoice secara realtime. Tahu kapan invoice dibayar atau overdue.",
      delay: "animation-delay-300",
    },
  ];

  return (
    <section id="fitur" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] font-heading tracking-tight mb-4">
            Kenapa InvoiceGo?
          </h2>
          <p className="text-lg text-[#1A1A1A]/70 font-body max-w-2xl mx-auto">
            Fitur lengkap untuk mengelola invoice bisnis Anda dengan efisien
          </p>
        </div>

        {/* Asymmetric Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card opacity-0 ${feature.delay} bg-white rounded-lg p-8 shadow-[#E85D04]/10 shadow-lg hover:shadow-[#E85D04]/20 transition-all duration-300 transform hover:-translate-y-2`}
              style={{
                transform: index === 1 ? "translateY(20px)" : "translateY(0)",
              }}
            >
              <div className="w-16 h-16 bg-[#E85D04]/10 rounded-lg flex items-center justify-center text-[#E85D04] mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] font-heading mb-3">
                {feature.title}
              </h3>
              <p className="text-[#1A1A1A]/70 font-body leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
