// apps/website/src/features/home/SolutionCardsSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const solutions = [
  {
    slug: "sme",
    title: "Small & Medium Enterprises",
    subtitle: "Affordable technology for growing businesses",
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    description:
      "Get enterprise‑grade tools at a fraction of the cost. Our SME packages cover everything from your first website to fully managed IT, with flexible pricing and local support.",
    highlights: [
      "Packages from M4,000",
      "24‑hour response",
      "100% local support",
      "Scalable as you grow",
    ],
    cta: "Explore SME",
  },
  {
    slug: "enterprise",
    title: "Enterprise & Government",
    subtitle: "Digital transformation at scale",
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    description:
      "Fully managed, secure, and integrated technology ecosystems for large organisations and government agencies.",
    highlights: [
      "99.9% uptime SLA",
      "24/7 monitoring",
      "Advanced security",
      "Compliance‑ready",
    ],
    cta: "Explore Enterprise",
  },
  {
    slug: "ngo",
    title: "NGOs & Development",
    subtitle: "Technology that amplifies your mission",
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
    description:
      "We help non‑profits operate more efficiently, demonstrate impact, and deliver programmes that change lives.",
    highlights: [
      "Cut reporting by 70%",
      "Offline field tools",
      "Donor dashboards",
      "Affordable pricing",
    ],
    cta: "Explore NGO",
  },
];

export default function SolutionCardsSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-offwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-deep">
            Solutions for Every Organisation
          </h2>
          <p className="mt-4 text-base md:text-lg text-neutral-slate max-w-3xl mx-auto">
            Whether you’re a startup, a government ministry, or an NGO, we have
            a tailored technology package to accelerate your mission.
          </p>
        </motion.div>

        {/* Cards grid – two columns on mobile, three on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-border/30"
            >
              {/* Top icon area – stacked on mobile, horizontal on larger screens */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 px-3 sm:px-5 pt-4 sm:pt-5 pb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-brand-tech/10 text-brand-tech shrink-0">
                  {solution.icon}
                </span>
                <div className="text-center sm:text-left min-w-0">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-brand-deep leading-tight">
                    {solution.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-neutral-slate mt-0.5">
                    {solution.subtitle}
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content – compact text */}
              <div className="p-3 sm:p-5 flex flex-col flex-1">
                <p className="text-[12px] sm:text-sm lg:text-base text-neutral-slate leading-relaxed mb-3 sm:mb-4">
                  {solution.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 flex-1">
                  {solution.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs lg:text-sm text-brand-deep">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-tech mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-gold text-brand-navy px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs lg:text-sm font-bold hover:bg-amber-400 transition-colors shadow-md group/btn"
                >
                  <span>{solution.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}