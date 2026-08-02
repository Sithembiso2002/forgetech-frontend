// apps/website/src/app/(public)/careers/[slug]/page.tsx
import { getVacancyBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";

// Static fallback slugs for generateStaticParams
const careerSlugs = [
  "senior-software-engineer",
  "it-support-specialist",
  "cloud-solutions-architect",
  "ui-ux-designer",
  "digital-marketing-intern",
];

export async function generateStaticParams() {
  return careerSlugs.map((slug) => ({ slug }));
}

// Fallback data for when API isn't available
const fallbackVacancies: Record<string, any> = {
  "senior-software-engineer": {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Maseru",
    type: "Full‑time",
    description:
      "<p>We are looking for an experienced full‑stack developer to lead client projects and mentor junior engineers. You'll work directly with clients to understand requirements and deliver high‑quality solutions.</p><p>The ideal candidate has a strong background in JavaScript/TypeScript, modern frameworks, and cloud services.</p>",
    requirements: [
      "5+ years of software development experience",
      "Proficiency in JavaScript/TypeScript",
      "Experience with React, Next.js, or NestJS",
      "Strong understanding of relational databases (PostgreSQL)",
      "Excellent communication and leadership skills",
    ],
  },
  "it-support-specialist": {
    title: "IT Support Specialist",
    department: "Support",
    location: "Maseru",
    type: "Full‑time",
    description:
      "<p>Join our helpdesk team and provide first‑class technical support to our growing client base. You'll handle tickets, troubleshoot issues, and ensure our clients' IT environments run smoothly.</p>",
    requirements: [
      "2+ years of IT support experience",
      "Familiarity with Windows and Linux environments",
      "Knowledge of networking fundamentals",
      "Strong problem‑solving and customer service skills",
    ],
  },
  "cloud-solutions-architect": {
    title: "Cloud Solutions Architect",
    department: "Infrastructure",
    location: "Maseru",
    type: "Full‑time",
    description:
      "<p>Design and implement scalable cloud infrastructures for businesses across Lesotho. You'll assess client needs, architect solutions on AWS/Azure/GCP, and oversee migration projects.</p>",
    requirements: [
      "AWS or Azure certification",
      "Experience with Docker and Kubernetes",
      "Knowledge of Terraform or CloudFormation",
      "Understanding of security best practices",
    ],
  },
  "ui-ux-designer": {
    title: "UI/UX Designer (Contract)",
    department: "Design",
    location: "Remote",
    type: "Contract",
    description:
      "<p>Create intuitive, beautiful interfaces for web and mobile applications. 3‑month contract with possible extension based on performance.</p>",
    requirements: [
      "Strong portfolio demonstrating UI/UX skills",
      "Proficiency in Figma or similar design tools",
      "Understanding of accessibility standards",
      "Experience with design systems is a plus",
    ],
  },
  "digital-marketing-intern": {
    title: "Digital Marketing Intern",
    department: "Marketing",
    location: "Maseru",
    type: "Internship",
    description:
      "<p>Gain hands‑on experience in content creation, social media management, and SEO for a growing tech company. Ideal for students or recent graduates.</p>",
    requirements: [
      "Interest in digital marketing and technology",
      "Basic knowledge of social media platforms",
      "Good writing and communication skills",
      "Willingness to learn",
    ],
  },
};

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let vacancy;
  try {
    vacancy = await getVacancyBySlug(slug);
    if (!vacancy) vacancy = fallbackVacancies[slug] ?? null;
  } catch {
    vacancy = fallbackVacancies[slug] ?? null;
  }

  if (!vacancy) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-deep text-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{vacancy.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-200">
            <span className="flex items-center gap-1">
              <Briefcase size={16} />
              {vacancy.department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {vacancy.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {vacancy.type}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: vacancy.description }} />

          <h2 className="text-2xl font-bold text-brand-deep mb-6">Requirements</h2>
          <ul className="space-y-3 mb-12">
            {vacancy.requirements?.map((req: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-neutral-slate">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-tech mt-2 flex-shrink-0" />
                {req}
              </li>
            ))}
          </ul>

          <Button href="/contact" variant="gold" className="inline-flex items-center gap-2">
            Apply Now <ArrowRight size={18} />
          </Button>
        </div>
      </section>
    </>
  );
}