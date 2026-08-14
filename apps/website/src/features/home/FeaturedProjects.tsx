// apps/website/src/components/home/FeaturedProjects.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3 } from "lucide-react";
import Button from "@/components/ui/Button"; // default import

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";

async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/api/projects?featured=true`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const fallbackProjects = [
  {
    id: "1",
    title: "Custom Website & Business Emails for 3ranges Trail",
    slug: "3ranges-trail",
    industry: "Tourism & Hospitality",
    shortDescription:
      "Designed and developed a modern, responsive website for 3ranges Trail, complete with professional business emails and reliable cPanel hosting.",
    mainImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    technologies: ["Next.js", "Tailwind CSS", "cPanel"],
    results: "Professional online presence with 99.9% uptime",
  },
  {
    id: "2",
    title: "Preeminent Business Emails & Hosting Setup",
    slug: "preeminent-emails",
    industry: "Corporate Services",
    shortDescription:
      "Configured professional business emails and reliable hosting for Preeminent, ensuring secure and efficient communication.",
    mainImage:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop",
    technologies: ["cPanel", "DNS Configuration", "Email Setup"],
    results: "Enhanced communication and uptime",
  },
];

export default async function FeaturedProjects() {
  let projects = await fetchProjects();

  if (!projects || projects.length === 0) {
    projects = fallbackProjects;
  }

  // Show only top 3 for homepage
  const featured = projects.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="py-20 bg-neutral-offwhite">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-deep mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-neutral-slate max-w-2xl mx-auto">
            A selection of our recent work and real results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project: any) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.mainImage || "https://placehold.co/600x400/1E3A6D/ffffff?text=Project"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-brand-tech text-white text-xs font-semibold rounded-full">
                    {project.industry}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-brand-deep mb-2 group-hover:text-brand-tech transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-slate text-sm leading-relaxed line-clamp-3 flex-1">
                  {project.shortDescription || project.overview}
                </p>

                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-neutral-offwhite text-neutral-slate text-xs rounded-full border border-neutral-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.results && (
                  <div className="mt-3 flex items-center gap-1 text-sm text-brand-tech font-medium">
                    <BarChart3 size={16} />
                    <span>{project.results}</span>
                  </div>
                )}

                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-tech group-hover:gap-2 transition-all">
                  View Project <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button href="/projects" variant="primary" className="bg-brand-deep hover:bg-brand-navy text-white px-8 py-3.5 inline-flex items-center gap-2">
            View All Projects <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}