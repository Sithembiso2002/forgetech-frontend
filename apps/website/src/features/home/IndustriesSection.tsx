// apps/website/src/features/home/IndustriesSection.tsx
import IndustriesInteractive from "./IndustriesInteractive";

// Static fallback industries – each with an image, name, short description, and detailed info
const fallbackIndustries = [
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

export default async function IndustriesSection() {
  // In the future, replace with an API call to getIndustries()
  const industries = fallbackIndustries;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Who We Help
          </span>
          <h2 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
            <span className="text-brand-deep">Industries</span>{" "}
            <span className="text-brand-gold">We Serve</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-slate">
            Deep expertise across the sectors that drive Lesotho’s economy —
            and beyond.
          </p>
        </div>

        <IndustriesInteractive industries={industries} />
      </div>
    </section>
  );
}