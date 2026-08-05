// apps/website/src/features/home/ServicesInteractive.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Code,
  Cloud,
  Server,
  Shield,
  BarChart3,
  Lightbulb,
  Headphones,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  software: <Code className="w-6 h-6" />,
  cloud: <Cloud className="w-6 h-6" />,
  infrastructure: <Server className="w-6 h-6" />,
  cybersecurity: <Shield className="w-6 h-6" />,
  analytics: <BarChart3 className="w-6 h-6" />,
  digital: <Lightbulb className="w-6 h-6" />,
  support: <Headphones className="w-6 h-6" />,
};

interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  description?: string;
  benefits?: string[];
  technologies?: string[];
  cta?: string;
  image1?: string;
  image2?: string;
  features?: string[];
}

export default function ServicesInteractive({
  services,
}: {
  services: Service[];
}) {
  const [activeId, setActiveId] = useState(services[0]?.id || null);
  const activeService =
    services.find((s) => s.id === activeId) || services[0];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A]">
          Solutions We Provide
        </h2>
        <p className="mt-4 text-base md:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed px-2">
          Helping businesses transform through modern technology, software
          engineering, cloud infrastructure, cybersecurity and digital
          innovation.
        </p>
      </div>

      {/* Two‑Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* LEFT – Service Selector (grid on mobile, single column on desktop) */}
        <div className="lg:w-1/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 md:gap-3">
          {services.map((service) => {
            const isActive = service.id === activeId;
            return (
              <button
                key={service.id}
                onClick={() => setActiveId(service.id)}
                onMouseEnter={() => setActiveId(service.id)}
                className={`
                  group flex items-center gap-3 px-3 py-3 md:px-4 md:py-4 rounded-xl transition-all duration-300 
                  w-full text-left
                  ${
                    isActive
                      ? "bg-[#0B1F3A] text-white shadow-lg shadow-[#0B1F3A]/20 border border-[#0B1F3A]"
                      : "bg-white text-slate-700 border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5"
                  }
                `}
              >
                <span
                  className={`flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg transition-colors duration-300 shrink-0 ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}
                >
                  {iconMap[service.icon] || <Code className="w-4 h-4 md:w-5 md:h-5" />}
                </span>
                <span className="font-semibold text-sm md:text-base leading-tight">
                  {service.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* RIGHT – Content Card */}
        <div className="lg:w-3/4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-4 md:p-8 lg:p-10"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Images Column – side-by-side on mobile, stacked on desktop */}
                <div className="md:w-[30%] flex flex-row md:flex-col gap-4">
                  <div className="relative w-1/2 md:w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={
                        (activeService as any).image1 ||
                        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
                      }
                      alt={activeService.title + " image 1"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative w-1/2 md:w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={
                        (activeService as any).image2 ||
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
                      }
                      alt={activeService.title + " image 2"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="md:w-[70%] flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] mb-3 md:mb-4">
                    {activeService.title}
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed mb-5 md:mb-6">
                    {activeService.description ||
                      activeService.shortDescription}
                  </p>

                  {/* Features – two columns */}
                  {activeService.features && activeService.features.length > 0 && (
                    <div className="grid grid-cols-2 gap-x-4 md:gap-x-6 gap-y-2 mb-6 md:mb-8">
                      {activeService.features.map((feat) => (
                        <div
                          key={feat}
                          className="flex items-center gap-2 text-xs md:text-sm lg:text-base font-semibold text-slate-700"
                        >
                          <span className="text-[#1558E9]">
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          {feat}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button + Arrow Square */}
                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href={`/services/${activeService.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#F5A623] text-[#0B1F3A] px-5 md:px-6 py-2.5 md:py-3 text-sm font-bold hover:bg-amber-400 transition-colors shadow-md"
                    >
                      {activeService.cta || "Learn More"}
                    <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#0B1F3A] text-white shadow-md">
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                    </a>

                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* All Services button */}
      <div className="mt-8 md:mt-10 flex justify-center">
        <Link
          href="/services"
          className="group inline-flex items-center gap-3 rounded-full bg-[#0B1F3A] text-[#F5A623] px-6 md:px-8 py-3 md:py-3.5 text-sm font-bold shadow-md hover:bg-amber-400 transition-colors overflow-hidden"
        >
          <span>All Services</span>
          <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#0B1F3A] text-white transition-transform duration-300 group-hover:translate-x-1">
                    <span className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#F5A623] text-white shadow-md">
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
          </span>
        </Link>
      </div>
    </div>
  );
}