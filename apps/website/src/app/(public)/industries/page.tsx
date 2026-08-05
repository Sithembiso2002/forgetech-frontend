// apps/website/src/app/(public)/industries/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Shield, Wrench, MapPin, Coins } from "lucide-react";


export const metadata: Metadata = {
  title: "Industries | ForgeTech Nobles",
  description:
    "From professional services to retail, healthcare, education, government, and more – we deliver tailored technology solutions for every industry.",
};

// Static industry data – identical to your existing fallback
const industries = [
  {
    id: "1",
    name: "Professional Services",
    slug: "professional-services",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
    shortDescription: "Law firms, consultancies, and accounting practices.",
  },
  {
    id: "2",
    name: "Healthcare",
    slug: "healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    shortDescription: "Clinics, hospitals, and private practices.",
  },
  {
    id: "3",
    name: "Education",
    slug: "education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    shortDescription: "Schools, universities, and training institutes.",
  },
  {
    id: "4",
    name: "Government",
    slug: "government",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    shortDescription: "Public sector agencies and local government.",
  },
  {
    id: "5",
    name: "Retail & E‑commerce",
    slug: "retail",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    shortDescription: "Online stores, marketplaces, and brick‑and‑mortar retailers.",
  },
  {
    id: "6",
    name: "Logistics",
    slug: "logistics",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&h=600&fit=crop",
    shortDescription: "Transport and supply‑chain companies.",
  },
  {
    id: "7",
    name: "NGOs & Non‑profits",
    slug: "ngo",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
    shortDescription: "Development organisations and charities.",
  },
  {
    id: "8",
    name: "Technology Startups",
    slug: "technology-startups",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    shortDescription: "Early‑stage tech companies and innovators.",
  },
];

// Why choose us points
const differentiators = [
  {
    icon: <Wrench className="h-6 w-6" />,
    title: "Tailored Solutions",
    desc: "Every industry gets a custom approach, not a one‑size‑fits‑all template.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security",
    desc: "We protect sensitive data with the highest standards, regardless of sector.",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Local Expertise",
    desc: "Deep understanding of Lesotho’s regulatory and business environment.",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Flexible Pricing",
    desc: "Packages that grow with you, from startups to large organisations.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-white text-brand-navy py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold bg-brand-tech/20 text-brand-tech border border-brand-tech/30 rounded-full">
            Who We Help
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Industries We Serve
          </h1>
          <p className="text-lg text-brand-deeper-200 max-w-3xl mx-auto leading-relaxed">
            From professional services to retail, healthcare, education, government,
            and more — we deliver tailored technology solutions that address the
            unique challenges of each sector.
          </p>
        </div>
      </section>

      {/* ── Industries Grid ── */}
      <section className="py-24 bg-neutral-offwhite">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-200/50 transition-all duration-500 hover:shadow-xl hover:shadow-brand-deep/10 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-brand-deep mb-2 group-hover:text-brand-tech transition-colors">
                    {industry.name}
                  </h2>
                  <p className="text-sm text-neutral-slate leading-relaxed flex-1">
                    {industry.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-tech group-hover:gap-2 transition-all">
                    Explore solutions <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why We're Different ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-deep mb-4">
              Why <span className="text-brand-gold">ForgeTech Nobles</span>?
            </h2>
            <p className="text-lg text-neutral-slate max-w-2xl mx-auto">
              We don’t just deliver technology — we deliver a partnership that understands your industry inside and out.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-neutral-offwhite hover:bg-brand-deep hover:text-white transition-colors duration-300"
              >
                <div className="inline-flex p-3 rounded-full bg-brand-tech/10 text-brand-tech group-hover:bg-white/10 group-hover:text-brand-gold mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-slate group-hover:text-white/70 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-brand-gold text-brand-navy text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-brand-navy/80">
            Let’s discuss your unique challenges and build the perfect solution for your sector.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-navy text-white font-semibold px-8 py-4 shadow-xl hover:bg-brand-deep transition-colors"
          >
            Schedule a Free Consultation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}