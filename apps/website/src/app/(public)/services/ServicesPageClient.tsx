// apps/website/src/app/(public)/services/ServicesPageClient.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  FaCode,
  FaCloud,
  FaMobileAlt,
  FaChartBar,
  FaNetworkWired,
  FaCogs,
  FaArrowRight,
  FaCheck,
  FaShieldAlt,
  FaRocket,
  FaHeadset,
  FaQuoteLeft,
} from "react-icons/fa";
import { useState, useEffect } from "react";

// Icon map – unchanged
const iconMap: Record<string, React.ReactNode> = {
  software: <FaCode />,
  web: <FaCode />,
  mobile: <FaMobileAlt />,
  cloud: <FaCloud />,
  analytics: <FaChartBar />,
  infrastructure: <FaNetworkWired />,
  consulting: <FaCogs />,
  support: <FaHeadset />,
};

export default function ServicesPageClient({
  services,
  leadership: initialLeadership,
}: {
  services: any[];
  leadership: any | null;
}) {
  const [leadership, setLeadership] = useState(initialLeadership);

  useEffect(() => {
    if (!leadership) {
      fetch("http://localhost:10000/api/teammessage")
        .then((res) => res.json())
        .then((data) => data && setLeadership(data))
        .catch(() => {});
    }
  }, [leadership]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#0B1F3A] via-[#122d5e] to-[#0B1F3A] text-white py-16 md:py-28 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-brand-tech/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 text-xs sm:text-sm rounded-full bg-white/10 backdrop-blur-sm border border-white/10 font-medium mb-4 md:mb-6"
          >
            <FaRocket className="text-brand-gold text-sm" />
            What We Offer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 md:mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-xl text-white/70 max-w-3xl mx-auto"
          >
            End‑to‑end technology solutions engineered for your business.
            Everything you need, under one roof.
          </motion.p>
        </div>
      </section>

      {/* ── Services Deep Dive ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {services.map((service: any, index: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-20 md:mb-32 last:mb-0"
            >
              {/* Main Service Row */}
              <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
                <div
                  className={`flex-1 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="text-4xl md:text-6xl text-brand-tech mb-4 md:mb-5">
                    {iconMap[service.icon] || <FaCogs />}
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-brand-deep mb-3 md:mb-4 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-base md:text-lg text-brand-tech font-medium mb-3 md:mb-4">
                    {service.shortDescription}
                  </p>
                  <p className="text-sm md:text-lg text-neutral-slate leading-relaxed mb-6 md:mb-8">
                    {service.description}
                  </p>

                  {/* Key Benefits */}
                  {service.keyBenefits && service.keyBenefits.length > 0 && (
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-lg md:text-xl font-bold text-brand-deep mb-3 md:mb-4 flex items-center gap-2">
                        <FaRocket className="text-brand-gold" /> Key Benefits
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                        {service.keyBenefits.map((benefit: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-xl bg-neutral-offwhite border border-neutral-border/40"
                          >
                            <FaCheck className="text-brand-tech mt-0.5 flex-shrink-0 text-sm" />
                            <span className="text-xs md:text-sm text-brand-deep font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Premium Learn More button */}
                  <motion.div whileHover="hover" className="inline-flex items-center">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group relative inline-flex items-center gap-2 md:gap-3 rounded-full bg-brand-gold text-brand-navy px-5 md:px-7 py-3 md:py-3.5 text-xs md:text-sm font-bold shadow-xl shadow-brand-gold/20 hover:shadow-brand-gold/40 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10">Learn More</span>
                      <span className="relative z-10 flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand-navy text-white transition-transform duration-300 group-hover:translate-x-1">
                        <FaArrowRight size={12} className="md:size-14" />
                      </span>
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                    </Link>
                  </motion.div>
                </div>

                {/* Image side – with hover zoom */}
                <div
                  className={`flex-1 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                    <Image
                      src={service.image || "https://placehold.co/600x450/1E3A6D/ffffff?text=Service"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>

              {/* Sub‑services Grid – always 2 columns */}
              {service.subServices && service.subServices.length > 0 && (
                <div className="mt-16 md:mt-20">
                  <h3 className="text-xl md:text-3xl font-extrabold text-brand-deep mb-8 md:mb-10 text-center">
                    What’s Included
                  </h3>
                  <div className="grid grid-cols-2 gap-4 md:gap-8">
                    {service.subServices.map((sub: any, idx: number) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-border/40"
                      >
                        <div className="relative w-full h-32 md:h-44 overflow-hidden">
                          <Image
                            src={sub.image || "https://placehold.co/400x160/1E3A6D/ffffff?text=Sub+Service"}
                            alt={sub.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-4 md:p-6">
                          <h4 className="font-bold text-brand-deep text-base md:text-xl mb-2">{sub.name}</h4>
                          <p className="text-neutral-slate text-xs md:text-sm leading-relaxed">{sub.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features – always 2 columns on mobile */}
              {service.features && service.features.length > 0 && (
                <div className="mt-12 md:mt-16">
                  <h3 className="text-xl md:text-2xl font-extrabold text-brand-deep mb-6 md:mb-8 text-center">
                    Core Features
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
                    {service.features.map((feat: string) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl bg-neutral-offwhite border border-neutral-border/30 hover:border-brand-tech/30 transition-colors"
                      >
                        <FaCheck className="text-brand-tech flex-shrink-0 text-sm" />
                        <span className="text-xs md:text-sm font-semibold text-brand-deep">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Leadership Message ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-brand-deep via-brand-navy to-[#0B1F3A] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl p-6 md:p-14"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#ffffff_1px,_transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-brand-gold/30 shadow-xl">
                  <Image
                    src={leadership?.photoUrl || "images/logo/logo.png"}
                    alt={leadership?.name || "Leadership"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <FaQuoteLeft className="text-brand-gold/40 text-2xl md:text-4xl mb-3 md:mb-4 mx-auto md:mx-0" />
                <blockquote className="text-base md:text-xl text-white/90 leading-relaxed mb-4 md:mb-6 italic">
                  {leadership?.bio ||
                    "“Please note that Some specialized infrastructure services are delivered in collaboration with certified technology partners to ensure the highest standards of quality and reliability.”"}
                </blockquote>
                <div className="font-bold text-lg md:text-2xl text-white">
                  {leadership?.name || "From ForgeTech Team"}
                </div>
                <div className="text-brand-gold font-semibold mt-1 text-sm md:text-base">
                  {leadership?.role || "Team Management"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-16 md:py-24 bg-brand-gold text-brand-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #0B1F3A 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6"
          >
            Not sure which service fits your needs?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto text-brand-navy/80"
          >
            Schedule a free consultation and we'll help you build the perfect solution.
          </motion.p>
          <Button
            href="/contact"
            variant="primary"
            className="bg-brand-navy hover:bg-brand-navy/90 px-8 md:px-10 py-3 md:py-4 text-base md:text-lg shadow-2xl shadow-brand-navy/20 inline-flex items-center gap-2 md:gap-3 transition-transform hover:scale-105"
          >
            Book a Consultation <FaArrowRight />
          </Button>
        </div>
      </section>
    </>
  );
}