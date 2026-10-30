// apps/website/src/features/home/CaseStudiesSection.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, FolderOpen, ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/api";

type Project = {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  industry: string;
  overview: string;
  results: string;
  featured: boolean;
  mainImage: string | null;
  technologies: string[] | null;
  liveUrl: string | null;
};

// ---------- Helpers ----------

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

// ---------- Component ----------

export default async function CaseStudiesSection() {
  let projects: Project[] = [];
  try {
    const data = await getProjects();
    if (Array.isArray(data)) projects = data as Project[];
  } catch {
    projects = [];
  }

  // Show only first 3 projects for homepage
  const displayedProjects = projects.slice(0, 3);

  // Nothing in the DB? Hide the entire section rather than show fake data.
  if (displayedProjects.length === 0) return null;

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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {displayedProjects.map((project) => {
            const plainOverview = stripHtml(project.overview);
            const excerpt = truncate(plainOverview, 180);
            const techs = project.technologies ?? [];
            const plainResults = stripHtml(project.results);

            return (
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
                      "https://placehold.co/600x400/1E3A6D/ffffff?text=Project"
                    }
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Badges — industry + live */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-brand-tech text-white text-xs font-semibold rounded-full">
                      {project.industry}
                    </span>
                    {project.liveUrl && (
                      <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full inline-flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                        </span>
                        Live
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold uppercase tracking-wide mb-2">
                    {project.industry}
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-brand-deep mb-2 leading-tight group-hover:text-brand-tech transition-colors">
                    {project.title}
                  </h3>

                  {excerpt && (
                    <p className="text-neutral-slate text-xs md:text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {excerpt}
                    </p>
                  )}

                  {/* Technologies */}
                  {techs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                      {techs.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 md:px-3 py-0.5 md:py-1 bg-neutral-offwhite border border-neutral-border/40 rounded-full text-xs font-medium text-brand-deep"
                        >
                          {tech}
                        </span>
                      ))}
                      {techs.length > 3 && (
                        <span className="px-2 md:px-3 py-0.5 md:py-1 text-neutral-slate text-xs">
                          +{techs.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Results */}
                  {plainResults && (
                    <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-brand-tech">
                      <Check size={14} className="flex-shrink-0" />
                      <span className="line-clamp-1">{plainResults}</span>
                    </div>
                  )}

                  {/* Footer: View Project + optional live link */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-tech group-hover:underline">
                      VIEW PROJECT <ArrowRight size={14} />
                    </span>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-brand-navy/70 hover:text-brand-tech transition-colors"
                        title={project.liveUrl}
                      >
                        <ExternalLink size={14} />
                        Live site
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
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