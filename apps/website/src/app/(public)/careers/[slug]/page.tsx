// apps/website/src/app/(public)/careers/[slug]/page.tsx
import { getVacancyBySlug, getVacancies } from "@/lib/api";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import RichText from "@/components/RichText";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";

const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:10000";

// ── Fetch all slugs at build time for static export ──
// Prefers the API so new vacancies created in the admin dashboard are
// automatically included. Falls back to a hardcoded list if the API is
// unreachable during the build.
async function getAllVacancySlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/vacancies`, {
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok) {
      console.error(`[getAllVacancySlugs] HTTP ${res.status}`);
      return [];
    }
    const data = (await res.json()) as { slug?: string; active?: boolean }[];
    return data
      .filter((v) => v.active !== false && v.slug)
      .map((v) => v.slug as string);
  } catch (error) {
    console.error(`[getAllVacancySlugs] fetch failed`, error);
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await getAllVacancySlugs();

  // If the API returned nothing (cold Render start, or DB empty), fall back
  // to the hardcoded list so the build doesn't fail. Add new vacancy slugs
  // here as a safety net if you like.
  const fallbackSlugs = ["digital-marketing-intern"];
  const finalSlugs = slugs.length > 0 ? slugs : fallbackSlugs;

  return finalSlugs.map((slug) => ({ slug }));
}

// ── Fallback vacancy data ──
// Only reached if the API is down. Keep this well-populated so visitors
// don't see empty placeholders. Add entries here for any slug you hardcode
// in the fallback list above.
const fallbackVacancies: Record<string, any> = {
  "digital-marketing-intern": {
    title: "Digital Marketing Intern",
    department: "Marketing",
    location: "Maseru, Lesotho",
    type: "Internship",
    description:
      "<p>We are looking for a motivated Digital Marketing Intern to join our team. You will help manage social media accounts, draft content, and support campaign reporting.</p><p>This is a paid internship with an opportunity to convert to full-time based on performance.</p>",
    requirements: [
      "Currently pursuing or recently completed a degree in Marketing, Communications, or a related field",
      "Strong written communication skills in English",
      "Familiarity with social media platforms (Facebook, Instagram, LinkedIn)",
      "Basic understanding of content marketing",
      "Ability to work in a fast-paced team environment",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {vacancy.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-200">
            {vacancy.department && (
              <span className="flex items-center gap-1">
                <Briefcase size={16} />
                {vacancy.department}
              </span>
            )}
            {vacancy.location && (
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {vacancy.location}
              </span>
            )}
            {vacancy.type && (
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {vacancy.type}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          {vacancy.description && (
            <RichText
              html={vacancy.description}
              className="prose prose-lg max-w-none mb-12"
            />
          )}

          {vacancy.requirements && vacancy.requirements.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-brand-deep mb-6">
                Requirements
              </h2>
              <ul className="space-y-3 mb-12">
                {vacancy.requirements.map((req: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-neutral-slate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-tech mt-2 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </>
          )}

          <Button
            href="/contact"
            variant="gold"
            className="inline-flex items-center gap-2"
          >
            Apply Now <ArrowRight size={18} />
          </Button>
        </div>
      </section>
    </>
  );
}