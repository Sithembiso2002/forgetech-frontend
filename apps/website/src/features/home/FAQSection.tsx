// apps/website/src/features/home/FAQSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does ForgeTech Nobles offer?",
    answer:
      "We provide end‑to‑end technology solutions including custom software development, IT infrastructure, cloud solutions, data analytics, IT support, and digital transformation consulting.",
  },
  {
    question: "Where is ForgeTech Nobles based?",
    answer:
      "We are headquartered in Maseru, Lesotho, and serve clients across Lesotho and internationally.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Absolutely. Our SME packages start at M4,000 and are designed specifically for growing businesses.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A simple website may take 2‑4 weeks, while a custom enterprise platform can take 3‑6 months.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern technologies including Next.js, React, TypeScript, NestJS, PostgreSQL, Supabase, AWS, Azure, Docker, and Kubernetes.",
  },
  {
    question: "How do you ensure data security?",
    answer:
      "Security is built into every layer—from firewalls and encryption to secure coding practices and regular audits.",
  },
  {
    question: "Can you maintain our existing systems?",
    answer:
      "Yes, our managed IT support covers maintenance, monitoring, and improvement of legacy systems.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer both project‑based and monthly retainer models with a free initial consultation and transparent quotes.",
  },
];

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-offwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Support
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.15] tracking-tight">
            <span className="text-brand-deep">Frequently</span>{" "}
            <span className="text-brand-gold">Asked Questions</span>
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-neutral-slate max-w-2xl mx-auto">
            Got questions? We’ve got answers. Can’t find what you’re looking for?{" "}
            <a href="/contact" className="text-brand-tech underline">
              Contact us
            </a>
            .
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-12 md:mb-16">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 md:py-4 border border-neutral-border/60 rounded-2xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent bg-white shadow-sm"
          />
        </div>

        {/* FAQ Grid – always two columns */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {filteredFaqs.length === 0 ? (
            <p className="col-span-2 text-center text-neutral-slate py-12">
              No matching questions found.
            </p>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-neutral-border/60 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <button
                    onClick={() => toggleIndex(index)}
                    className="flex items-start justify-between w-full px-3 sm:px-4 md:px-5 py-3 md:py-4 text-left"
                  >
                    <span className="text-xs sm:text-sm md:text-base font-bold text-brand-deep pr-2 leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 mt-0.5"
                    >
                      <ChevronDown size={16} className="text-brand-tech" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 sm:px-4 md:px-5 pb-3 md:pb-4 text-neutral-slate leading-relaxed text-[11px] sm:text-xs md:text-sm">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}