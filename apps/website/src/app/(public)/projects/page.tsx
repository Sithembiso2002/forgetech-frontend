import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/api";
import { ArrowRight, BarChart3, Briefcase } from "lucide-react";


// Fallback case studies – rich, real‑world examples
const fallbackProjects = [
{
  id: "1",
  title: "Custom Website & Business Emails for 3ranges Trail",
  slug: "3ranges-trail",
  industry: "Tourism & Hospitality",
  shortDescription:
    "Designed and developed a modern, responsive website for 3ranges Trail (3rangestrail.co.ls), complete with professional business emails and reliable cPanel hosting.",
  mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  technologies: ["Modern JavaScript framework", "Tailwind CSS", "cPanel server", "Configurations"],
  results: "Professional online presence with 99.9% uptime",
},
{
  id: "2",
  title: "Business Email Setup & Hosting for PREEMINENT",
  slug: "preeminent-emails",
  industry: "Professional Services",
  shortDescription:
    "Configured and hosted professional business emails for PREEMINENT on cPanel, ensuring reliable communication and brand consistency.",
  mainImage: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&h=400&fit=crop",
  technologies: ["cPanel", "DNS Configuration", "Email Security"],
  results: "Seamless email setup with zero downtime",
},

];

export default async function CaseStudiesPage() {
  let projects;
  try {
    const data = await getProjects();
    if (data && data.length > 0) {
      projects = data;
    } else {
      projects = fallbackProjects;
    }
  } catch {
    projects = fallbackProjects;
  }

  return (
    <>
      {/* Hero – deep navy with subtle pattern */}
      <section className="relative bg-white text-brand-navy py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Our Experience
          </h1>
          <p className="text-lg text-brand-deeper-200 max-w-2xl mx-auto">
            Real projects, real results. See how we’ve helped businesses across Lesotho transform with technology.
          </p>
        </div>
      </section>



      {/* Case Studies Grid */}
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
              {projects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/case-studies/${project.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.mainImage || "https://placehold.co/600x400/1E3A6D/ffffff?text=Case+Study"}
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

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-xl font-bold text-brand-deep mb-2 group-hover:text-brand-tech transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-neutral-slate text-sm leading-relaxed line-clamp-3 flex-1">
                      {project.shortDescription || project.overview}
                    </p>

                    {/* Technologies used */}
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
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 text-neutral-slate text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Results highlight */}
                    {project.results && (
                      <div className="mt-3 flex items-center gap-1 text-sm text-brand-tech font-medium">
                        <BarChart3 size={16} />
                        <span>{project.results}</span>
                      </div>
                    )}

                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-tech group-hover:gap-2 transition-all">
                      Read case study <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 bg-brand-deep rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Have a Similar Project in Mind?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Let’s discuss how we can deliver real results for your business, just like we did for these clients.
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