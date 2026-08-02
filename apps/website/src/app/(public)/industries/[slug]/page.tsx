// apps/website/src/app/(public)/industries/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowRight, ShieldCheck, Clock, MapPin, Quote } from "lucide-react";
import IndustryServicesClient from "@/features/industries/IndustryServicesClient";

// Known slugs
const industrySlugs = [
  "professional-services",
  "healthcare",
  "education",
  "government",
  "retail",
  "logistics",
  "ngo",
  "technology-startups",
];

export async function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

// Hero data (lightweight)
const heroData: Record<string, { name: string; image: string; intro: string }> = {
  "professional-services": {
    name: "Professional Services",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop",
    intro: "We help law firms, consultancies, and accounting practices modernise client operations, automate workflows, and secure sensitive data.",
  },
  healthcare: {
    name: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    intro: "Clinics, hospitals, and private practices trust us to implement secure digital systems that improve patient care and streamline administration.",
  },
  education: {
    name: "Education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop",
    intro: "We build custom solutions for schools, universities, and training institutes — from student management to virtual classrooms.",
  },
  government: {
    name: "Government",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    intro: "Public sector agencies rely on us for digital transformation, secure infrastructure, and citizen‑facing services.",
  },
  retail: {
    name: "Retail & E‑commerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    intro: "We create integrated e‑commerce platforms that unify online and physical stores, boosting sales and customer loyalty.",
  },
  logistics: {
    name: "Logistics",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&h=600&fit=crop",
    intro: "Transport and supply‑chain companies increase efficiency with our custom tracking, routing, and warehouse solutions.",
  },
  ngo: {
    name: "NGOs & Non‑profits",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&h=600&fit=crop",
    intro: "We help development organisations improve transparency, donor reporting, and programme impact with robust digital tools.",
  },
  "technology-startups": {
    name: "Technology Startups",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop",
    intro: "From MVP to scale, we provide startups with cloud architecture, engineering support, and rapid development capabilities.",
  },
};

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = heroData[slug];
  if (!industry) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <Image src={industry.image} alt={industry.name} fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-navy/40" />
        </div>
        <div className="relative container mx-auto px-6 py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest bg-white/10 text-brand-gold border border-white/20 rounded-full backdrop-blur-sm">
              Industry Focus
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">{industry.name}</h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">{industry.intro}</p>
            <Button href="/contact" variant="gold" className="px-8 py-4 text-base">
              Get a Free Consultation <ArrowRight size={18} className="inline ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Services Section (now with full details) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep mb-12 text-center">
            What We Offer <span className="text-brand-gold">{industry.name}</span>
          </h2>
          <IndustryServicesClient industrySlug={slug} />
        </div>
      </section>

      {/* Why Choose Us – common to all industries */}
      <section className="py-24 bg-neutral-offwhite">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep mb-12 text-center">
            Why Work With ForgeTech Nobles?
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="h-7 w-7" />,
                title: "Enterprise Security",
                desc: "We protect your data with the same standards used by large corporations.",
              },
              {
                icon: <Clock className="h-7 w-7" />,
                title: "Fast Delivery",
                desc: "Agile sprints mean you see results in weeks, not months.",
              },
              {
                icon: <MapPin className="h-7 w-7" />,
                title: "Local Presence",
                desc: "We're based in Maseru and understand the regional business landscape.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="inline-flex p-3 rounded-full bg-brand-tech/10 text-brand-tech mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-deep mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-slate">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-gold text-brand-navy text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Transform Your {industry.name} Operations?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Let’s discuss how ForgeTech Nobles can build the right solution for your industry.
          </p>
          <Button href="/contact" variant="primary" className="bg-brand-navy hover:bg-brand-deep text-white px-8 py-4 text-base">
            Schedule a Consultation <ArrowRight size={18} className="inline ml-2" />
          </Button>
        </div>
      </section>
    </>
  );
}