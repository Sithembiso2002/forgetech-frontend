// apps/website/src/app/(public)/resources/guides/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import NewsletterForm from "@/features/blog/NewsletterForm";

const guides = [
  {
    id: "1",
    title: "A Small Business Owner’s Guide to Cybersecurity in Lesotho",
    slug: "cybersecurity-guide-sme-lesotho",
    excerpt:
      "Understand the top five threats facing local SMEs and implement practical, low‑cost defences today.",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    readingTime: "8 min read",
    category: "Security",
    audience: "SMEs",
  },
  {
    id: "2",
    title: "How to Choose the Right Accounting System for Your Firm",
    slug: "choose-accounting-system",
    excerpt:
      "Compare cloud‑based and on‑premise solutions, and learn what features your professional service firm really needs.",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    readingTime: "6 min read",
    category: "Software",
    audience: "Professional Services",
  },
  {
    id: "3",
    title: "Cloud Computing for Lesotho Schools: A Practical Introduction",
    slug: "cloud-computing-schools-lesotho",
    excerpt:
      "Discover how cloud‑based tools can reduce IT costs, improve collaboration, and support remote learning in your institution.",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    readingTime: "10 min read",
    category: "Cloud",
    audience: "Education",
  },
  {
    id: "4",
    title: "Building a Reliable Network for Your Growing Business",
    slug: "reliable-network-growing-business",
    excerpt:
      "Learn the essentials of designing a wired and wireless network that won’t let you down — on a realistic budget.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    readingTime: "7 min read",
    category: "Infrastructure",
    audience: "SMEs",
  },
  {
    id: "5",
    title: "Data Privacy 101 for Professional Service Providers",
    slug: "data-privacy-professional-services",
    excerpt:
      "Protect your clients’ sensitive information and comply with local regulations with these straightforward policies.",
    coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    readingTime: "5 min read",
    category: "Security",
    audience: "Professional Services",
  },
  {
    id: "6",
    title: "Digital Transformation Roadmap for Lesotho NGOs",
    slug: "digital-transformation-ngo-lesotho",
    excerpt:
      "A step‑by‑step guide to modernising your nonprofit’s operations, from donor management to remote collaboration.",
    coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
    readingTime: "12 min read",
    category: "Strategy",
    audience: "NGOs",
  },
];

export default function GuidesPage() {
  return (
    <>
      {/* Hero – enhanced with subtle animation */}
      <section className="relative bg-brand-navy text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-brand-tech/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 md:mb-6 text-xs md:text-sm font-semibold bg-brand-tech/20 text-brand-tech border border-brand-tech/30 rounded-full">
              <Sparkles className="w-4 h-4" />
              Practical Knowledge
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 leading-tight">
              Technology Guides for Your Business
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Clear, actionable guides designed specifically for service‑based
              SMEs, professional firms, and educational institutions in Lesotho.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guides Grid – premium cards */}
      <section className="py-16 md:py-24 bg-neutral-offwhite">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
            {guides.map((guide) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 * parseInt(guide.id) }}
              >
                <Link
                  href={`/resources/guides/${guide.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                >
                  <div className="relative h-44 md:h-52 overflow-hidden">
                    <Image
                      src={guide.coverImage}
                      alt={guide.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-brand-tech text-white text-xs font-semibold rounded-full shadow">
                        {guide.category}
                      </span>
                      <span className="px-3 py-1 bg-brand-deep text-white text-xs font-semibold rounded-full shadow">
                        {guide.audience}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-deep text-xs font-medium rounded-full shadow">
                      <Clock size={12} />
                      {guide.readingTime}
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-brand-deep mb-2 leading-tight group-hover:text-brand-tech transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-neutral-slate text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                      {guide.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-tech group-hover:gap-2.5 transition-all">
                      Read guide <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-20 bg-brand-deep rounded-3xl p-8 md:p-14 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs font-semibold bg-white/10 text-brand-gold border border-white/20 rounded-full">
                <BookOpen className="w-4 h-4" />
                Stay Informed
              </span>
              <h3 className="text-2xl md:text-4xl font-bold mb-3">
                Guides That Work for Your Business
              </h3>
              <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Get free, practical technology guides delivered to your inbox — written for Lesotho’s service‑based businesses.
              </p>
              <NewsletterForm />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}