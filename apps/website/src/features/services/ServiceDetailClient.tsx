// apps/website/src/features/services/ServiceDetailClient.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaCheck,
  FaArrowRight,
  FaRocket,
  FaShieldAlt,
  FaQuoteLeft,
} from "react-icons/fa";

interface ServiceDetailProps {
  service: {
    id: string;
    title: string;
    slug: string;
    icon: string;
    shortDescription?: string;
    description?: string;
    heroImage?: string;
    secondaryImage?: string;
    keyBenefits?: string[];
    subServices?: {
      name: string;
      description: string;
      benefit?: string;
      image?: string;
    }[];
    features?: string[];
    benefits?: string[];
    technologies?: string[];
    industries?: string[];
    process?: string[];
    caseStudies?: {
      id: string;
      title: string;
      slug: string;
      industry: string;
      shortDescription: string;
      mainImage: string;
      technologies: string[];
      results: string;
    }[];
    testimonial?: {
      quote: string;
      client: string;
      company: string;
      avatar: string;
    };
  };
}

export const FadeInSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function ServiceDetailClient({ service }: ServiceDetailProps) {
  const heroImg = service.heroImage || service.secondaryImage || "https://placehold.co/1200x600/1E3A6D/ffffff?text=Service";
  const secondaryImg = service.secondaryImage || "https://placehold.co/600x400/1E3A6D/ffffff?text=Detail";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-brand-navy text-white overflow-hidden min-h-[70vh] flex items-center">
        {/* ... (your existing hero code – unchanged) ... */}
      </section>

      {/* ── What We Deliver ── */}
      <section id="details" className="py-24 bg-white">
        {/* ... (your existing What We Deliver code – unchanged) ... */}
      </section>

      {/* ── Sub‑services (What’s Included) ── */}
      {service.subServices && service.subServices.length > 0 && (
        <FadeInSection className="py-24 bg-neutral-offwhite" children={undefined}>
          {/* ... (your existing sub‑services code – unchanged) ... */}
        </FadeInSection>
      )}

      {/* ── Features (if available) ── */}
      {service.features && service.features.length > 0 && (
        <FadeInSection className="py-24 bg-white" children={undefined}>
          {/* ... (your existing features code – unchanged) ... */}
        </FadeInSection>
      )}

      {/* ── Technology Stack ── */}
      {service.technologies && service.technologies.length > 0 && (
        <FadeInSection className="py-24 bg-neutral-offwhite">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep">
                Technologies We Use
              </h2>
              <p className="text-neutral-slate mt-2">
                Modern, battle‑tested tools that ensure performance and reliability.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {service.technologies.map((tech) => (
                <span key={tech} className="px-6 py-3 bg-white rounded-full shadow-sm text-sm font-medium text-brand-deep hover:shadow-md hover:scale-105 transition-all duration-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* ── Industries Served ── */}
      {service.industries && service.industries.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep">
                Industries We Serve
              </h2>
              <p className="text-neutral-slate mt-2">
                We have deep experience across a wide range of sectors.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {service.industries.map((industry) => (
                <div key={industry} className="bg-neutral-offwhite rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-2xl font-bold text-brand-deep mb-2">{industry}</div>
                  <p className="text-xs text-neutral-slate uppercase tracking-wide">Trusted Partner</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Our Process ── */}
      {service.process && service.process.length > 0 && (
        <FadeInSection className="py-24 bg-neutral-offwhite">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep">
                Our Process
              </h2>
              <p className="text-neutral-slate mt-2">
                A proven methodology that keeps your project on track.
              </p>
            </div>
            <div className="relative mt-16">
              <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-brand-tech/20 -translate-x-1/2" />
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-5 md:gap-8">
                {service.process.map((step, idx) => (
                  <div key={idx} className="relative flex md:flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-brand-tech text-brand-tech flex items-center justify-center text-xl font-bold z-10 shadow-lg mb-6">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="ml-4 md:ml-0">
                      <p className="text-sm text-brand-deep font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      )}

      {/* ── Case Studies ── */}
      {service.caseStudies && service.caseStudies.length > 0 && (
        <FadeInSection className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep">
                Case Studies
              </h2>
              <p className="text-neutral-slate mt-2">
                Real projects we’ve delivered for our clients.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {service.caseStudies.map((project) => (
                <div
                  key={project.id}
                  className="bg-neutral-offwhite rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={project.mainImage || "https://placehold.co/400x200/1E3A6D/ffffff?text=Project"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold uppercase tracking-wide mb-2">
                      {project.industry}
                    </div>
                    <h4 className="text-xl font-bold text-brand-deep mb-2">
                      {project.title}
                    </h4>
                    <p className="text-neutral-slate text-sm leading-relaxed mb-4 flex-1">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white rounded-full text-xs font-medium text-brand-deep border border-neutral-border/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-brand-tech">
                      <FaCheck size={16} />
                      {project.results}
                    </div>
                    <Link
                      href={`/case-studies/${project.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-tech hover:underline"
                    >
                      View full case study <FaArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* ── Client Reviews (Testimonial) ── */}
      {service.testimonial && (
        <FadeInSection className="py-24 bg-neutral-offwhite">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep">
                Client Reviews
              </h2>
              <p className="text-neutral-slate mt-2">
                What our clients say about working with us.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 relative">
              <FaQuoteLeft className="w-12 h-12 text-brand-gold/20 mx-auto mb-6" />
              <blockquote className="text-xl md:text-2xl text-brand-deep font-medium italic leading-relaxed">
                “{service.testimonial.quote}”
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Image
                  src={service.testimonial.avatar}
                  alt={service.testimonial.client}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold"
                />
                <div className="text-left">
                  <div className="font-bold text-brand-deep">{service.testimonial.client}</div>
                  <div className="text-sm text-neutral-slate">{service.testimonial.company}</div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      )}

      {/* ── Final CTA ── */}
      <section className="relative bg-brand-deep text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 200" className="block w-full h-[100px] md:h-[140px]" preserveAspectRatio="none">
            <path d="M0,200 Q720,40 1440,200 L1440,0 L0,0 Z" fill="#F8FAFC" />
          </svg>
        </div>
        <div className="relative container mx-auto px-6 pt-32 pb-24 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Ready to Modernise Your Operations?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Let’s discuss how {service.title} can drive real results for your business.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold text-brand-navy px-8 py-4 text-base font-bold hover:bg-brand-orange transition-colors shadow-md"
              >
                Schedule a Consultation <FaArrowRight size={20} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-8 py-4 text-base font-bold hover:bg-white/10 transition-colors"
              >
                Explore All Services
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}