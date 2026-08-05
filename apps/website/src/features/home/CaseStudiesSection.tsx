// apps/website/src/features/home/CaseStudiesSection.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, FolderOpen } from "lucide-react";
import { getProjects } from "@/lib/api";

// Static fallback – used when the backend isn't reachable
const fallbackProjects = [
  {
    id: "1",
    title: "Custom Website & Business Emails for 3ranges Trail",
    slug: "3ranges-trail",
    industry: "Tourism & Hospitality",
    overview:
      "Designed and developed a modern, responsive website for 3ranges Trail, complete with professional business emails and reliable cPanel hosting.",
    mainImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    technologies: ["Next.js", "Tailwind CSS", "cPanel"],
    results: "Professional online presence with 99.9% uptime",
  },
  {
    id: "2",
    title: "Business Email Setup & Hosting for PREEMINENT",
    slug: "preeminent-emails",
    industry: "Professional Services",
    overview:
      "Configured and hosted professional business emails for PREEMINENT on cPanel, ensuring reliable communication and brand consistency.",
    mainImage:
      "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&h=400&fit=crop",
    technologies: ["cPanel", "DNS Configuration", "Email Security"],
    results: "Seamless email setup with zero downtime",
  },
  {
    id: "3",
    title: "Smart City IoT Network",
    slug: "smart-city-iot",
    industry: "Government",
    overview:
      "Deployed an IoT‑enabled infrastructure for real‑time monitoring of public utilities, improving service delivery by 40%.",
    mainImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    technologies: ["AWS IoT", "Node.js", "React"],
    results: "40% improvement in service delivery",
  },
];

export default async function CaseStudiesSection() {
  let projects;

  try {
    projects = await getProjects();
    if (!projects || projects.length === 0) {
      projects = fallbackProjects;
    }
  } catch {
    projects = fallbackProjects;
  }

  // Show only first 3 projects for homepage
  const displayedProjects = projects.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-neutral-offwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-tech/10 text-brand-tech text-xs sm:text-sm font-semibold uppercase tracking-widest border border-brand-tech/20">
            <FolderOpen className="w-4 h-4" />
            Our Work
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-deep leading-tight">
            Experience
          </h2>
          <p className="mt-4 text-base md:text-lg text-neutral-slate max-w-2xl mx-auto">
            Real projects we’ve delivered for clients across Lesotho and beyond.
          </p>
        </div>

        {/* Projects Grid – always at least 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {displayedProjects.map((project: any) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-neutral-border/30 flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-40 md:h-52 overflow-hidden">
                <Image
                  src={
                    project.mainImage ||
                    project.image ||
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                  }
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold uppercase tracking-wide mb-2">
                  {project.industry}
                </div>
                <h3 className="text-base md:text-lg font-bold text-brand-deep mb-2 leading-tight group-hover:text-brand-tech transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-slate text-xs md:text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {project.overview || project.shortDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                  {project.technologies?.slice(0, 3).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 md:px-3 py-0.5 md:py-1 bg-neutral-offwhite border border-neutral-border/40 rounded-full text-xs font-medium text-brand-deep"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Results */}
                {project.results && (
                  <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-brand-tech">
                    <Check size={14} />
                    {project.results}
                  </div>
                )}

                <span className="mt-4 inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-tech group-hover:underline">
                  VIEW PROJECT <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link – premium upgrade */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-gold px-8 py-4 text-sm font-bold text-brand-navy shadow-xl shadow-brand-gold/20 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/30 hover:scale-105 active:scale-100"
          >
            <span>View All Projects</span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}