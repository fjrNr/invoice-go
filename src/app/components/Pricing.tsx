"use client";

import { useEffect, useRef } from "react";

export default function Pricing() {
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

    const cards = sectionRef.current?.querySelectorAll(".pricing-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: "Gratis",
      price: "Rp 0",
      period: "selamanya",
      description: "Untuk bisnis yang baru mulai",
      features: [
        "5 Invoice per bulan",
        "Template invoice standar",
        "Watermark InvoiceGo",
      ],
      cta: "Mulai Gratis",
      highlighted: false,
      delay: "animation-delay-100",
    },
    {
      name: "Pro",
      price: "Rp 49.000",
      period: "/bulan",
      description: "Untuk bisnis yang berkembang",
      features: [
        "Invoice unlimited",
        "Custom branding (Logo)",
        "Hapus watermark",
        "Support prioritas",
      ],
      cta: "Coba Gratis 14 Hari",
      highlighted: true,
      delay: "animation-delay-200",
    },
  ];

  return (
    <section
      id="harga"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] font-heading tracking-tight mb-4">
            Pilih Paket Anda
          </h2>
          <p className="text-lg text-[#1A1A1A]/70 font-body max-w-2xl mx-auto">
            Mulai gratis, upgrade kapanpun bisnis Anda berkembang
          </p>
        </div>

        {/* Asymmetric Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card opacity-0 ${plan.delay} bg-white rounded-lg p-8 shadow-[#E85D04]/10 shadow-lg hover:shadow-[#E85D04]/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col ${
                plan.highlighted
                  ? "border-2 border-[#E85D04] relative"
                  : "border border-gray-200"
              }`}
              style={{
                transform:
                  index === 1
                    ? "translateY(20px) scale(1.05)"
                    : "translateY(0) scale(1)",
              }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#E85D04] text-white px-4 py-1 rounded-full text-sm font-bold font-heading">
                    POPULER
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1A1A1A] font-heading mb-2">
                  {plan.name}
                </h3>
                <p className="text-[#1A1A1A]/60 font-body mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] font-heading">
                    {plan.price}
                  </span>
                  <span className="text-[#1A1A1A]/60 font-body ml-2">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#E85D04] mr-3 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[#1A1A1A]/80 font-body">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-auto w-full py-3 px-6 rounded-lg font-heading font-semibold transition-all duration-300 transform hover:scale-105 ${
                  plan.highlighted
                    ? "bg-[#E85D04] hover:bg-[#c94d03] text-white shadow-[#E85D04]/20 shadow-lg"
                    : "bg-gray-100 hover:bg-gray-200 text-[#1A1A1A]"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
