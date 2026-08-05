// apps/website/src/app/(public)/careers/[slug]/page.tsx
import { getVacancyBySlug, getVacancies } from "@/lib/api";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";

// ---------------------------------------------
// REQUIRED for static export: generateStaticParams
// ---------------------------------------------
export async function generateStaticParams() {
  try {
    const vacancies = await getVacancies();
    if (vacancies && vacancies.length > 0) {
      return vacancies
        .filter((v: any) => v.slug && v.active !== false)
        .map((v: any) => ({ slug: v.slug }));
    }
  } catch (error) {
    // If the API is down, no career detail pages will be pre‑rendered.
    // The careers listing page will still work with its own logic.
  }
  // Return an empty array so that the build doesn't fail – just no static pages
  return [];
}

// ---------------------------------------------
// Page component – fully dynamic, no fallback
// ---------------------------------------------
export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let vacancy = null;
  try {
    vacancy = await getVacancyBySlug(slug);
  } catch {
    // if error, vacancy remains null → notFound()
  }

  if (!vacancy) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-deep text-white py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{vacancy.title}</h1>
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
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: vacancy.description }}
          />

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