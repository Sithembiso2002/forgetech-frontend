import SectionHeading from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/api";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default async function FeaturedProjects() {
  let projects;
  try {
    projects = await getProjects();
    projects = projects.filter((p: any) => p.featured).slice(0, 3);
  } catch {
    projects = [
      {
        id: "1",
        title: "E‑Commerce Platform",
        slug: "ecommerce",
        industry: "Retail",
        mainImage: "/placeholder-project.jpg",
        technologies: ["Next.js", "Supabase", "Tailwind"],
      },
      {
        id: "2",
        title: "School Management System",
        slug: "school-management",
        industry: "Education",
        mainImage: "/placeholder-project.jpg",
        technologies: ["NestJS", "React", "PostgreSQL"],
      },
      {
        id: "3",
        title: "NGO Monitoring Dashboard",
        slug: "ngo-dashboard",
        industry: "Non‑profit",
        mainImage: "/placeholder-project.jpg",
        technologies: ["Next.js", "Prisma", "AWS"],
      },
    ];
  }

  if (!projects.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Our Recent Work"
          subtitle="A selection of projects we've delivered for forward‑thinking organisations."
        />
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {projects.map((project: any) => (
            <motion.a
              key={project.id}
              href={`/projects/${project.slug}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-48 bg-gray-200 relative">
                {project.mainImage ? (
                  <Image
                    src={project.mainImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-deep to-brand-tech flex items-center justify-center text-white text-6xl">
                    {project.title.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              </div>
              <div className="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white">
                <span className="text-xs text-brand-gold uppercase tracking-wide">{project.industry}</span>
                <h3 className="text-xl font-bold mt-1">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-white/20 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/projects" variant="gold">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}