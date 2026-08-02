// apps/website/src/app/(public)/services/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { FadeInSection } from "@/features/services/ServiceDetailClient";
import { getServiceBySlug } from "@/lib/api";
import { Check, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import IndustriesMarquee from "@/features/services/IndustriesMarquee";

// Known service slugs for static generation
const serviceSlugs = [
  "infrastructure",
  "software",
  "analytics",
  "cloud",
  "support",
  "consulting",
  "cloud-solutions",
];

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

// ── Complete fallback data (unchanged) – used only when API is offline ──
const fallbackServices: Record<string, any> = { /* … same as before … */ };

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fallback = fallbackServices[slug] ?? null;

  let service;
  try {
    const apiService = await getServiceBySlug(slug);
    if (apiService) {
      service = {
        ...fallback,
        ...apiService,
        benefits: apiService.benefits || fallback?.benefits || [],
        technologies: apiService.technologies || fallback?.technologies || [],
        industries: apiService.industries || fallback?.industries || [],
        process: apiService.process || fallback?.process || [],
        subServices: apiService.subServices || fallback?.subServices || [],
        caseStudies: apiService.caseStudies || fallback?.caseStudies || [],
        testimonial: apiService.testimonial || fallback?.testimonial || null,
      };
    } else {
      service = fallback;
    }
  } catch {
    service = fallback;
  }

  if (!service) notFound();

  const heroImg = service.heroImage || service.mainImage || "https://placehold.co/1200x600/1E3A6D/ffffff?text=Service";
  const secondaryImg = service.secondaryImage || "https://placehold.co/600x400/1E3A6D/ffffff?text=Detail";
  const testimonial = service.testimonial || null;

  const industries = service.industries && service.industries.length > 0
    ? service.industries
    : [];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-brand-navy text-white overflow-hidden min-h-[50vh] md:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src={heroImg} alt={service.title} fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/70 to-brand-navy/90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 py-20 lg:py-32">
          <FadeInSection className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider bg-brand-tech/20 text-brand-tech border border-brand-tech/30 rounded-full">
              Service Overview
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 md:mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
              {service.shortDescription}
            </p>
            <div className="mt-8 md:mt-10 flex flex-wrap gap-4">
              <Button href="/contact" variant="gold" className="px-6 md:px-8 py-3 md:py-4 text-sm md:text-base">
                Request a Consultation
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── What We Deliver (Benefits) ── */}
      <section id="details" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16 lg:gap-24">
            <div className="flex-1 order-2 lg:order-1 w-full">
              <div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">
                <Image src={secondaryImg} alt={`${service.title} illustration`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/20 to-transparent" />
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 w-full">
              <SectionHeading
                title="What We Deliver"
                subtitle="A complete, integrated solution engineered for your business."
                className="text-left"
              />
              <p className="text-neutral-slate text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                {service.description}
              </p>
              {/* Benefits – always 2 columns */}
              <div className="grid grid-cols-2 gap-3 md:gap-5">
                {service.benefits.slice(0, 4).map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-xl bg-neutral-offwhite hover:shadow-md transition-shadow">
                    <div className="w-5 h-5 rounded-full bg-brand-tech/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check size={12} className="text-brand-tech" />
                    </div>
                    <span className="text-xs sm:text-sm text-brand-deep font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 md:mt-10">
                <Button href="/contact" variant="gold" className="w-full sm:w-auto">Discuss Your Needs</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sub‑services (What’s Included) ── */}
      {service.subServices && service.subServices.length > 0 && (
        <FadeInSection className="py-16 md:py-24 bg-neutral-offwhite">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionHeading
              title="What’s Included"
              subtitle="Everything you need, delivered by our expert team."
            />
            {/* Sub‑services grid – always 2 columns */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 mt-10 md:mt-12">
              {service.subServices.map((sub: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative w-full h-36 md:h-48">
                    <Image
                      src={sub.image || "https://placehold.co/400x200/1E3A6D/ffffff?text=Sub+Service"}
                      alt={sub.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-1">
                    <h4 className="text-base md:text-xl font-bold text-brand-deep mb-2">{sub.name}</h4>
                    <p className="text-neutral-slate text-xs md:text-sm leading-relaxed mb-3 md:mb-4 flex-1">
                      {sub.description}
                    </p>
                    <div className="flex items-start gap-2 text-xs md:text-sm font-medium text-brand-tech">
                      <Check size={14} className="mt-0.5" />
                      <span>{sub.benefit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* ── Technology Stack ── */}
      <FadeInSection className="py-16 md:py-24 bg-neutral-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Technologies We Use"
            subtitle="Modern, battle‑tested tools that ensure performance and reliability."
          />
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10 md:mt-12">
            {service.technologies.map((tech: string) => (
              <span key={tech} className="px-4 md:px-6 py-2 md:py-3 bg-white rounded-full shadow-sm text-xs md:text-sm font-medium text-brand-deep hover:shadow-md hover:scale-105 transition-all duration-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ── Industries Served – Infinite Marquee ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Industries We Serve"
            subtitle="We have deep experience across a wide range of sectors."
          />
          <div className="mt-10 md:mt-12">
            <IndustriesMarquee industries={industries} />
          </div>
        </div>
      </section>

      {/* ── Our Process – 2 columns on mobile, 5 on desktop ── */}
      <FadeInSection className="py-16 md:py-24 bg-neutral-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Our Process"
            subtitle="A proven methodology that keeps your project on track."
          />
          <div className="relative mt-12 md:mt-16">
            <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-brand-tech/20 -translate-x-1/2" />
            {/* Grid – 2 columns on mobile, 5 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
              {service.process.map((step: string, idx: number) => (
                <div key={idx} className="relative flex flex-col items-center text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-brand-tech text-brand-tech flex items-center justify-center text-lg md:text-xl font-bold z-10 shadow-lg mb-4 md:mb-6">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <p className="text-xs md:text-sm text-brand-deep font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* ── Case Studies ── */}
      {service.caseStudies && service.caseStudies.length > 0 && (
        <FadeInSection className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionHeading
              title="Case Studies"
              subtitle="Real projects we’ve delivered for our clients."
            />
            {/* Case studies grid – always 2 columns */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 mt-10 md:mt-12">
              {service.caseStudies.map((project: any) => (
                <div
                  key={project.id}
                  className="bg-neutral-offwhite rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative w-full h-36 md:h-48">
                    <Image
                      src={project.mainImage || "https://placehold.co/400x200/1E3A6D/ffffff?text=Project"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold uppercase tracking-wide mb-2">
                      {project.industry}
                    </div>
                    <h4 className="text-base md:text-xl font-bold text-brand-deep mb-2">
                      {project.title}
                    </h4>
                    <p className="text-neutral-slate text-xs md:text-sm leading-relaxed mb-4 flex-1">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 md:px-3 py-0.5 md:py-1 bg-white rounded-full text-xs font-medium text-brand-deep border border-neutral-border/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-brand-tech">
                      <Check size={14} />
                      {project.results}
                    </div>
                    <Link
                      href={`/case-studies/${project.slug}`}
                      className="mt-3 md:mt-4 inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-tech hover:underline"
                    >
                      View full case study <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      )}

      {/* ── Client Reviews (Testimonial) ── */}
      {testimonial && (
        <FadeInSection className="py-16 md:py-24 bg-neutral-offwhite">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <SectionHeading
              title="Client Reviews"
              subtitle="What our clients say about working with us."
            />
            <div className="mt-10 md:mt-12 bg-white rounded-2xl shadow-sm p-6 md:p-12 relative">
              <Quote className="w-10 h-10 md:w-12 md:h-12 text-brand-gold/20 mx-auto mb-4 md:mb-6" />
              <blockquote className="text-lg md:text-2xl text-brand-deep font-medium italic leading-relaxed">
                “{testimonial.quote}”
              </blockquote>
              <div className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.client}
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-brand-gold"
                />
                <div className="text-left">
                  <div className="font-bold text-brand-deep text-sm md:text-base">{testimonial.client}</div>
                  <div className="text-xs md:text-sm text-neutral-slate">{testimonial.company}</div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      )}

      {/* ── Final CTA ── */}
      <section className="relative bg-brand-deep text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 200" className="block w-full h-[80px] md:h-[140px]" preserveAspectRatio="none">
            <path d="M0,200 Q720,40 1440,200 L1440,0 L0,0 Z" fill="#F8FAFC" />
          </svg>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-20 md:pb-24 text-center">
          <FadeInSection>
            <h2 className="text-2xl md:text-5xl font-extrabold mb-4 md:mb-6">
              Ready to Modernise Your Operations?
            </h2>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-10">
              Let’s discuss how {service.title} can drive real results for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/contact" variant="gold" className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 text-sm md:text-base inline-flex items-center gap-2">
                Schedule a Consultation <ArrowRight size={18} />
              </Button>
              <Button href="/services" variant="outline" className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 border-white/30 text-white hover:bg-white/10 text-sm md:text-base">
                Explore All Services
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}