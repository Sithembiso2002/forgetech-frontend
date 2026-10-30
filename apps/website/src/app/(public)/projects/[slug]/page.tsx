// apps/website/src/app/(public)/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Image from "next/image";
import Button from "@/components/ui/Button";
import RichText from "@/components/RichText";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { CheckCircle, ArrowRight, ExternalLink, Camera } from "lucide-react";

// Prefer server-only API_URL (not bundled into the client); fall back to the
// public one, then to localhost for dev. In production, one of the first two
// MUST be set — otherwise every fetch targets a URL that doesn't exist.
const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:10000";

type Project = {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  industry: string;
  overview: string;
  objectives: string[] | null;
  features: string[] | null;
  technologies: string[] | null;
  results: string;
  featured: boolean;
  mainImage: string | null;
  screenshots: string[] | null;
  liveUrl: string | null;
  createdAt: string;
  updatedAt: string;
  serviceId: string | null;
  service?: { title: string; testimonial: unknown } | null;
};

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

function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

async function getProject(slug: string): Promise<Project | null> {
  const url = `${API_URL}/api/projects/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, {
      // ISR cache at the fetch level: fresh for 60s, invalidated by tag.
      next: { revalidate: 60, tags: ["projects", `project:${slug}`] },
      // 60s covers Render free-tier cold starts (usually 20–30s) with margin.
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok) {
      console.error(
        `[getProject] ${slug}: HTTP ${res.status} ${res.statusText} from ${url}`,
      );
      return null;
    }
    return (await res.json()) as Project;
  } catch (error) {
    console.error(`[getProject] ${slug}: fetch failed for ${url}`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const plainOverview = stripHtml(project.overview);
  const description =
    plainOverview.length > 160
      ? plainOverview.slice(0, 157).trimEnd() + "…"
      : plainOverview;
  return {
    title: `${project.title} | Projects`,
    description,
    openGraph: {
      title: project.title,
      description,
      images: project.mainImage ? [project.mainImage] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Force runtime rendering. Prevents a failed build-time fetch (e.g. Render
  // cold start) from baking a 404 into the static HTML for this slug.
  await connection();

  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const heroImg =
    project.mainImage ||
    "https://placehold.co/1200x600/1E3A6D/ffffff?text=Project";
  const secondaryImg =
    project.screenshots?.[0] ||
    project.mainImage ||
    "https://placehold.co/600x400/1E3A6D/ffffff?text=Detail";

  const objectives = project.objectives ?? [];
  const features = project.features ?? [];
  const technologies = project.technologies ?? [];
  const screenshots = project.screenshots ?? [];

  const rawTestimonial = project.service?.testimonial as
    | { quote?: string; client?: string; company?: string; avatar?: string }
    | null
    | undefined;
  const testimonial =
    rawTestimonial && typeof rawTestimonial === "object" && rawTestimonial.quote
      ? rawTestimonial
      : null;

  const plainOverview = stripHtml(project.overview);
  const heroTagline =
    plainOverview.length > 220
      ? plainOverview.slice(0, 220).trimEnd() + "…"
      : plainOverview;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt={project.title}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
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
            {heroTagline && (
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                {heroTagline}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-navy font-semibold rounded-lg hover:bg-brand-gold transition-colors shadow-lg"
                >
                  <ExternalLink size={18} />
                  Visit Live Website
                </a>
              )}
              <Button
                href="/contact"
                variant="gold"
                className="px-8 py-4 text-base inline-flex items-center"
              >
                Start Your Project
                <ArrowRight size={18} className="inline ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Objectives */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="flex-1">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={secondaryImg}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold text-brand-deep mb-6">
                About the Project
              </h2>
              <RichText
                html={project.overview}
                className="text-lg text-neutral-slate leading-relaxed mb-8"
              />
              {objectives.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-brand-deep mb-4">
                    Objectives
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {objectives.map((obj, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-neutral-slate"
                      >
                        <CheckCircle
                          size={20}
                          className="text-brand-tech mt-0.5 flex-shrink-0"
                        />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {features.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-brand-deep mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-neutral-slate"
                      >
                        <CheckCircle
                          size={20}
                          className="text-brand-tech mt-0.5 flex-shrink-0"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Visit live website — simple button section */}
      {project.liveUrl && (
        <section className="py-16 bg-gradient-to-br from-brand-navy to-brand-deep">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              See It Live
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              This project is deployed and running in production. Visit the real
              website to explore it yourself.
            </p>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-gold text-brand-navy font-bold text-lg rounded-lg hover:bg-brand-orange transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              <ExternalLink size={22} />
              Visit Live Website
              <ArrowRight size={20} />
            </a>
            <p className="mt-5 text-sm text-white/50 break-all">
              {prettyUrl(project.liveUrl)}
            </p>
          </div>
        </section>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <section className="py-24 bg-neutral-offwhite">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            <h2 className="text-3xl font-extrabold text-brand-deep mb-12">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-4">
              {technologies.map((tech) => (
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
      )}

      {/* Results */}
      {project.results && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            <h2 className="text-3xl font-extrabold text-brand-deep mb-6">
              Results
            </h2>
            <RichText
              html={project.results}
              className="text-lg text-neutral-slate leading-relaxed"
            />
          </div>
        </section>
      )}

      {/* Screenshots gallery */}
      {screenshots.length > 0 && (
        <section className="py-24 bg-neutral-offwhite">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <Camera className="text-brand-tech" size={28} />
              <h2 className="text-3xl font-extrabold text-brand-deep">
                Screenshots
              </h2>
              <span className="px-3 py-1 bg-brand-tech/10 text-brand-tech text-sm font-semibold rounded-full">
                {screenshots.length}
              </span>
            </div>
            <ScreenshotGallery
              screenshots={screenshots}
              projectTitle={project.title}
            />
            {project.liveUrl && (
              <div className="mt-10 text-center">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-white font-semibold rounded-lg hover:bg-brand-deep transition-colors"
                >
                  <ExternalLink size={18} />
                  Visit the live website
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonial */}
      {testimonial && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            <div className="bg-neutral-offwhite rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-start gap-8">
              <div className="text-brand-gold/40">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-neutral-slate italic text-xl leading-relaxed mb-6">
                  “{testimonial.quote}”
                </p>
                <div className="flex items-center gap-4">
                  {testimonial.avatar && (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.client ?? "Client"}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-brand-gold"
                    />
                  )}
                  <div>
                    <div className="font-bold text-brand-deep">
                      {testimonial.client ?? project.client ?? "Client"}
                    </div>
                    {testimonial.company && (
                      <div className="text-sm text-neutral-400">
                        {testimonial.company}
                      </div>
                    )}
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
            Let’s discuss how we can deliver real results for your business,
            just like we did for {project.client ?? "our clients"}.
          </p>
          <Button
            href="/contact"
            variant="primary"
            className="bg-brand-navy hover:bg-brand-deep text-white px-8 py-4 text-base inline-flex items-center gap-2"
          >
            Start Your Project
            <ArrowRight size={18} />
          </Button>
        </div>
      </section>
    </>
  );
}