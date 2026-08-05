// apps/website/src/app/(public)/case-studies/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { CheckCircle, ArrowRight } from "lucide-react";

// Known slugs for static generation
const caseStudySlugs = [
  "3ranges-trail",
  "preeminent-emails",
  // keep other existing slugs if you have them
];

export async function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

// Rich fallback data – real project details
const fallbackCaseStudies: Record<string, any> = {
  "3ranges-trail": {
    title: "Custom Website & Business Emails for 3ranges Trail",
    slug: "3ranges-trail",
    industry: "Tourism & Hospitality",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    overview:
      "3ranges Trail, a tourism and hospitality business in Lesotho, needed a modern, fast, and mobile‑friendly website to attract visitors, showcase their offerings, and establish a professional online presence. They also required reliable business email addresses to communicate with customers and partners.",
    description:
      "We designed and developed a fully responsive, search‑engine‑optimized website from the ground up. The site features stunning imagery, clear navigation, and integrated contact forms. We then deployed the website on a cPanel server, ensuring fast loading times and easy management. We also set up professional business emails (e.g., info@3rangestrail.co.ls) directly through cPanel's email service, and configured all DNS records for optimal performance.",
    objectives: [
      "Create a modern, mobile‑responsive website",
      "Establish professional business email addresses on cPanel",
      "Deploy the website on a reliable cPanel server",
      "Provide easy content management for future updates",
    ],
    features: [
      "Responsive design optimized for mobile and desktop",
      "Photo gallery showcasing trails and accommodations",
      "Contact form with email notifications",
      "cPanel email accounts with webmail access",
    ],
    technologies: ["Next.js", "Tailwind CSS", "cPanel", "DNS Configuration"],
    results:
      "The new website launched on time and within budget. 3ranges Trail now has a professional digital storefront hosted on cPanel, professional business emails set up through cPanel, and a platform they can easily update. Since launch, the site has maintained 99.9% uptime.",
    testimonial: {
      quote:
        "ForgeTech Nobles built us exactly what we needed – a beautiful website and reliable business emails, all managed through cPanel. They handled everything from design to hosting. Highly professional!",
      client: "3ranges Trail",
      company: "3ranges Trail",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    cta: "Get a Website Like 3ranges Trail",
  },
  "preeminent-emails": {
    title: "Business Email Setup & Hosting for PREEMINENT on cPanel",
    slug: "preeminent-emails",
    industry: "Professional Services",
    heroImage: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=1200&h=600&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&h=400&fit=crop",
    overview:
      "PREEMINENT, a professional services firm in Lesotho, needed secure, reliable business email addresses to improve brand consistency and streamline communication with clients. Their existing email setup was fragmented and lacked professionalism.",
    description:
      "We set up professional business email addresses (e.g., info@preeminent.co.ls) directly on PREEMINENT's cPanel server. This included creating email accounts, configuring webmail access, setting up email clients (Outlook, mobile devices), and implementing DNS records (MX, SPF, DKIM, DMARC) for maximum deliverability and security. The entire setup was completed with zero disruption to their existing operations.",
    objectives: [
      "Set up professional business email addresses on cPanel",
      "Configure DNS for maximum deliverability and security",
      "Provide training on webmail and email clients",
      "Ensure seamless transition with zero downtime",
    ],
    features: [
      "Professional email addresses with custom domain",
      "cPanel email accounts with webmail access",
      "Advanced email security (spam filtering, authentication)",
      "Assistance with email client setup (Outlook, mobile)",
    ],
    technologies: ["cPanel", "DNS Configuration", "Email Security"],
    results:
      "PREEMINENT now communicates with clients using professional, branded email addresses. Email deliverability improved significantly, and the team can access their emails via webmail or their preferred email client. The setup was completed with zero data loss and zero downtime.",
    testimonial: {
      quote:
        "ForgeTech Nobles handled our email setup flawlessly. We now have professional emails hosted on our own cPanel, and everything works perfectly.",
      client: "PREEMINENT",
      company: "PREEMINENT",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    cta: "Set Up Professional Emails on cPanel",
  },
};

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project;
  try {
    // In the future, you can fetch from the backend
    project = fallbackCaseStudies[slug] ?? null;
  } catch {
    project = null;
  }

  if (!project) notFound();

  const heroImg = project.heroImage || "https://placehold.co/1200x600/1E3A6D/ffffff?text=Case+Study";
  const secondaryImg = project.secondaryImage || "https://placehold.co/600x400/1E3A6D/ffffff?text=Detail";
  const testimonial = project.testimonial || null;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <Image src={heroImg} alt={project.title} fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-navy/40" />
        </div>
        <div className="relative container mx-auto px-6 py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest bg-white/10 text-brand-gold border border-white/20 rounded-full backdrop-blur-sm">
              {project.industry}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">{project.overview}</p>
            <Button href="/contact" variant="gold" className="px-8 py-4 text-base">
              Start Your Project <ArrowRight size={18} className="inline ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Overview & Objectives */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="flex-1">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src={secondaryImg} alt={project.title} fill className="object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold text-brand-deep mb-6">About the Project</h2>
              <p className="text-lg text-neutral-slate leading-relaxed mb-8">{project.description}</p>

              <h3 className="text-xl font-bold text-brand-deep mb-4">Objectives</h3>
              <ul className="space-y-3 mb-8">
                {project.objectives.map((obj: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-slate">
                    <CheckCircle size={20} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-brand-deep mb-4">Key Features</h3>
              <ul className="space-y-3">
                {project.features.map((feat: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-slate">
                    <CheckCircle size={20} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 bg-neutral-offwhite">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <h2 className="text-3xl font-extrabold text-brand-deep mb-12">Technologies Used</h2>
          <div className="flex flex-wrap gap-4">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-6 py-3 bg-white rounded-full shadow-sm text-sm font-medium text-brand-deep hover:shadow-md transition-shadow"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <h2 className="text-3xl font-extrabold text-brand-deep mb-6">Results</h2>
          <p className="text-lg text-neutral-slate leading-relaxed">{project.results}</p>
        </div>
      </section>

      {/* Testimonial (if available) */}
      {testimonial && (
        <section className="py-24 bg-neutral-offwhite">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-start gap-8">
              <div className="text-brand-gold/40">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-neutral-slate italic text-xl leading-relaxed mb-6">
                  “{testimonial.quote}”
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.client}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-brand-gold"
                  />
                  <div>
                    <div className="font-bold text-brand-deep">{testimonial.client}</div>
                    <div className="text-sm text-neutral-400">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-brand-gold text-brand-navy text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-brand-navy/80">
            Let’s discuss how we can deliver real results for your business, just like we did for {project.client || "this client"}.
          </p>
          <Button
            href="/contact"
            variant="primary"
            className="bg-brand-navy hover:bg-brand-deep text-white px-8 py-4 text-base inline-flex items-center gap-2"
          >
            {project.cta || "Start Your Project"}
            <ArrowRight size={18} />
          </Button>
        </div>
      </section>
    </>
  );
}