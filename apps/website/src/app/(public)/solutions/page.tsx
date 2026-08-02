// apps/website/src/app/(public)/solutions/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, Check } from "lucide-react";
import IndustriesCarousel from "@/features/solutions/IndustriesCarousel";


export const metadata: Metadata = {
  title: "Solutions | ForgeTech Nobles",
  description:
    "Tailored technology solutions for SMEs, enterprises, and NGOs. From startup packages to full digital transformation, we have the expertise to help you grow.",
};

// ── Solution Cards ──────────────────────────────────────────────
const solutions = [
  {
    slug: "sme",
    title: "Small & Medium Enterprises",
    subtitle: "Affordable technology for growing businesses",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    description:
      "Get enterprise‑grade tools at a fraction of the cost. Our SME packages cover everything from your first website to fully managed IT, with flexible pricing and local support.",
    highlights: [
      "Packages starting from M4,000",
      "24‑hour response time",
      "100% local support",
      "Scalable as you grow",
    ],
    cta: "Explore SME Solutions",
  },
  {
    slug: "enterprise",
    title: "Enterprise & Government",
    subtitle: "Digital transformation at scale",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    description:
      "Fully managed, secure, and integrated technology ecosystems designed for large organisations and government agencies. We align technology with your strategic objectives.",
    highlights: [
      "99.9% uptime SLA",
      "24/7 proactive monitoring",
      "Advanced cybersecurity",
      "Compliance‑ready frameworks",
    ],
    cta: "Explore Enterprise Solutions",
  },
  {
    slug: "ngo",
    title: "NGOs & Development Organisations",
    subtitle: "Technology that amplifies your mission",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
    description:
      "We help non‑profits operate more efficiently, demonstrate impact to donors, and deliver programmes that change lives—all within realistic budgets.",
    highlights: [
      "Cut reporting time by 70%",
      "Offline‑capable field tools",
      "Donor‑ready dashboards",
      "Affordable, scalable pricing",
    ],
    cta: "Explore NGO Solutions",
  },
];

// ── Industries (static fallback) ─────────────────────────────────
const industries = [
  {
    id: "1",
    name: "Professional Services",
    slug: "professional-services",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
    shortDescription: "Law firms, consultancies, and accounting practices.",
    description: "We streamline client intake, case management, and billing systems so your firm can focus on delivering exceptional advice. Our secure cloud solutions ensure client data remains confidential and compliant.",
    benefits: ["Automated workflows", "Secure client portals", "Regulatory compliance", "Document management"],
    technologies: ["Next.js", "PostgreSQL", "AWS"],
    cta: "Explore for Professional Services",
  },
  {
    id: "2",
    name: "Healthcare",
    slug: "healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    shortDescription: "Clinics, hospitals, and private practices.",
    description: "Our HIPAA‑style secure platforms manage electronic health records, appointment scheduling, and telemedicine – ensuring your patients receive seamless care while protecting sensitive information.",
    benefits: ["EHR integration", "Patient portals", "Data encryption", "Telehealth ready"],
    technologies: ["React", "Node.js", "Azure"],
    cta: "Explore for Healthcare",
  },
  {
    id: "3",
    name: "Education",
    slug: "education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    shortDescription: "Schools, universities, and training institutes.",
    description: "From student information systems to virtual classrooms, we build custom solutions that enhance learning outcomes, simplify administration, and enable remote education.",
    benefits: ["Student management", "Virtual classrooms", "Parent engagement", "Data analytics"],
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    cta: "Explore for Education",
  },
  {
    id: "4",
    name: "Government",
    slug: "government",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    shortDescription: "Public sector agencies and local government.",
    description: "We modernise legacy systems, implement citizen‑facing portals, and provide secure infrastructure that meets strict regulatory requirements while improving service delivery.",
    benefits: ["Citizen portals", "Secure data handling", "Digital transformation", "Compliance frameworks"],
    technologies: ["NestJS", "PostgreSQL", "Terraform"],
    cta: "Explore for Government",
  },
  {
    id: "5",
    name: "Retail & E‑commerce",
    slug: "retail",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    shortDescription: "Online stores, marketplaces, and brick‑and‑mortar retailers.",
    description: "We design and deploy integrated e‑commerce platforms that connect inventory, POS, and customer data – giving you a 360° view of your business and driving sales growth.",
    benefits: ["Unified commerce", "Inventory sync", "Customer insights", "Scalable infrastructure"],
    technologies: ["Next.js", "Supabase", "Stripe"],
    cta: "Explore for Retail",
  },
];

// ── Process steps ───────────────────────────────────────────────
const processSteps = [
  { title: "Discover", desc: "We learn your business, goals, and challenges." },
  { title: "Design", desc: "Architect a tailored solution blueprint." },
  { title: "Build", desc: "Engineers develop and rigorously test the system." },
  { title: "Deploy", desc: "Launch securely into your environment." },
  { title: "Support", desc: "24/7 monitoring, maintenance, and optimisation." },
];



// ── Page Component ──────────────────────────────────────────────
export default function SolutionsPage() {
  return (
    <>
      {/* ─────────────── Hero ─────────────── */}
      <section className="relative bg-brand-navy text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold bg-brand-tech/20 text-brand-tech border border-brand-tech/30 rounded-full">
            Tailored Solutions
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Solutions for Every Stage of Growth
          </h1>
          <p className="text-lg text-neutral-200 max-w-2xl mx-auto">
            Whether you’re a small business just starting out, a large enterprise modernising operations, or an NGO driving social impact—we have the expertise and the right package for you.
          </p>
        </div>
      </section>

      {/* ─────────────── Solutions Cards ─────────────── */}
      <section className="py-24 bg-neutral-offwhite">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {solutions.map((solution) => (
              <div
                key={solution.slug}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-md shadow-slate-200/50 transition-all duration-500 hover:shadow-xl hover:shadow-brand-deep/10 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                        {solution.icon}
                      </div>
                      <span className="text-sm font-semibold">{solution.subtitle}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 md:p-8 flex flex-col">
                  <h3 className="text-2xl font-extrabold text-brand-deep mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-neutral-slate leading-relaxed mb-6 flex-1">
                    {solution.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {solution.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-slate">
                        <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/solutions/${solution.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold text-brand-navy font-semibold px-6 py-3 text-sm shadow-md hover:bg-brand-orange transition-colors"
                  >
                    {solution.cta}
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Industries We Serve (Interactive Carousel) ─────────────── */}
      {/* ─── Industries We Serve (Interactive Carousel) ─── */}
<section className="py-15 bg-white">
  <div className="container mx-auto px-6 lg:px-12">
    <SectionHeading
      title="Industries We Serve"
      subtitle="Deep expertise across the sectors that drive Lesotho’s economy — and beyond."
    />
    <div className="mt-16">
      <IndustriesCarousel industries={industries} />
    </div>
  </div>
</section>

      {/* ─────────────── Our Process ─────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeading
            title="Our Proven Process"
            subtitle="A structured methodology that delivers on time and on budget."
          />
          <div className="relative mt-16">
            <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-brand-tech/20 -translate-x-1/2" />
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-5 md:gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative flex md:flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-brand-tech text-brand-tech flex items-center justify-center text-xl font-bold z-10 shadow-lg mb-6">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="ml-4 md:ml-0">
                    <h4 className="text-lg font-bold text-brand-deep">{step.title}</h4>
                    <p className="text-sm text-neutral-slate mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Final CTA ─────────────── */}
      <section className="py-20 bg-brand-gold text-brand-navy text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-brand-navy/80">
            Let’s discuss your goals and we’ll recommend the perfect solution for your organisation.
          </p>
          <Button href="/contact" variant="primary" className="bg-brand-navy hover:bg-brand-navy/90 text-white px-8 py-4 text-base">
            Schedule a Free Consultation
          </Button>
        </div>
      </section>
    </>
  );
}