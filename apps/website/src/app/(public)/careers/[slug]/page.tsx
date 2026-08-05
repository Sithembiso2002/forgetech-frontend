// apps/website/src/app/(public)/careers/[slug]/page.tsx
import { getVacancyBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";

// Static fallback slugs for generateStaticParams
const careerSlugs = [

  "digital-marketing-intern",
];

export async function generateStaticParams() {
  return careerSlugs.map((slug) => ({ slug }));
}

// Fallback data for when API isn't available
const fallbackVacancies: Record<string, any> = {


  "digital-marketing-intern": {
    title: "",
    department: "",
    location: "",
    type: "",
    description:
      "<p>No Vacancy</p>",
    requirements: [
      "No Vacancy",
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