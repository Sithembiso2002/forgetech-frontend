// apps/website/src/app/(public)/projects/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/api";
import { ArrowRight, BarChart3, Briefcase, ExternalLink } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:10000";

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

/**
 * Strip HTML tags + decode common entities.
 * Card excerpts are shown inside a <p>, so they must be plain text —
 * otherwise Tiptap's <p>...</p> would render literally inside the card.
 */
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

// ---------- Data fetching ----------

async function fetchProjects(): Promise<Project[]> {
  try {
    // Prefer the shared lib (handles its own caching + error handling)
    const data = await getProjects();
    if (Array.isArray(data)) return data as Project[];

    // Fallback: direct fetch if getProjects returned nothing usable
    const res = await fetch(`${API_URL}/api/projects`, {
      next: { revalidate: 60, tags: ["projects"] },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as Project[];
    return Array.isArray(json) ? json : [];
  } catch {
    return [];
  }
}

export const revalidate = 60;

// ---------- Page ----------

export default async function ProjectsListPage() {
  const projects = await fetchProjects();

  return (
    <>
      {/* Hero — light background with subtle grid pattern */}
      <section className="relative bg-white text-brand-navy py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Our Experience
          </h1>
          <p className="text-lg text-brand-deeper-200 max-w-2xl mx-auto">
            Real projects, real results. See how we’ve helped businesses across
            Lesotho transform with technology.
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-20 bg-neutral-offwhite">
        <div className="container mx-auto px-6">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-neutral-slate mx-auto mb-4" />
              <p className="text-neutral-slate text-lg">
                Case studies coming soon. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => {
                const plainOverview = stripHtml(project.overview);
                const excerpt = truncate(plainOverview, 150);
                const techs = project.technologies ?? [];
                const plainResults = stripHtml(project.results);

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={
                          project.mainImage ||
                          "https://placehold.co/600x400/1E3A6D/ffffff?text=Case+Study"
                        }
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
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
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="text-xl font-bold text-brand-deep mb-2 group-hover:text-brand-tech transition-colors">
                        {project.title}
                      </h2>

                      {excerpt && (
                        <p className="text-neutral-slate text-sm leading-relaxed line-clamp-3 flex-1">
                          {excerpt}
                        </p>
                      )}

                      {/* Technologies */}
                      {techs.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {techs.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 bg-neutral-offwhite text-neutral-slate text-xs rounded-full border border-neutral-border"
                            >
                              {tech}
                            </span>
                          ))}
                          {techs.length > 3 && (
                            <span className="px-2 py-0.5 text-neutral-slate text-xs">
                              +{techs.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Results highlight */}
                      {plainResults && (
                        <div className="mt-3 flex items-center gap-1.5 text-sm text-brand-tech font-medium">
                          <BarChart3 size={16} className="flex-shrink-0" />
                          <span className="line-clamp-1">{plainResults}</span>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-tech group-hover:gap-2 transition-all">
                          View Project <ArrowRight size={16} />
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
          )}

          {/* Bottom CTA */}
          <div className="mt-16 bg-brand-deep rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Have a Similar Project in Mind?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Let’s discuss how we can deliver real results for your business,
              just like we did for these clients.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-semibold px-8 py-3.5 rounded-lg hover:bg-brand-orange transition-colors"
            >
              Start Your Project <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}