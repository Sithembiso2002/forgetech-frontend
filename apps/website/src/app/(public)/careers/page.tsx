// apps/website/src/app/(public)/careers/page.tsx
import Link from "next/link";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { getVacancies } from "@/lib/api";

export default async function CareersPage() {
  let vacancies: any[] = [];
  try {
    const data = await getVacancies();
    if (data && data.length > 0) {
      vacancies = data.filter((v: any) => v.active !== false);
    }
  } catch {
    vacancies = [];
  }

  return (
    <>
      {/* Hero – deep navy with subtle pattern */}
      <section className="relative bg-brand-navy text-white py-12 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs md:text-sm font-semibold bg-brand-tech/20 text-brand-tech border border-brand-tech/30 rounded-full">
            Join Our Team
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4">
            Careers at ForgeTech Nobles
          </h1>
          <p className="text-base md:text-lg text-neutral-200 max-w-2xl mx-auto">
            Help us build the digital future of Lesotho. We’re always looking for
            talented, passionate people to join our growing team.
          </p>
        </div>
      </section>

      {/* Vacancies list */}
      {vacancies.length > 0 ? (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="space-y-6">
              {vacancies.map((vacancy: any) => (
                <Link
                  key={vacancy.id}
                  href={`/careers/${vacancy.slug || vacancy.id}`}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 md:p-6 bg-neutral-offwhite rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-neutral-border/30"
                >
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-brand-deep group-hover:text-brand-tech transition-colors">
                      {vacancy.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs md:text-sm text-neutral-slate">
                      {vacancy.department && (
                        <span className="flex items-center gap-1">
                          <Briefcase size={14} className="text-brand-tech" />
                          {vacancy.department}
                        </span>
                      )}
                      {vacancy.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-brand-tech" />
                          {vacancy.location}
                        </span>
                      )}
                      {vacancy.type && (
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-brand-tech" />
                          {vacancy.type}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-tech group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* No vacancies message – only when there are none */
        <section className="py-16 md:py-20 bg-neutral-offwhite">
          <div className="container mx-auto px-4 sm:px-6 max-w-lg text-center">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-neutral-border/60">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-brand-gold/10 flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-deep mb-2">
                No Open Positions Right Now
              </h3>
              <p className="text-neutral-slate text-sm md:text-base mb-6">
                There are no available vacancies at the moment. However, we are always looking for talented people.
                Feel free to send us your CV, and we’ll keep you in mind for future opportunities.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold text-brand-navy px-6 py-2.5 text-sm font-bold hover:bg-amber-400 transition-colors shadow-md"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA – always visible */}

    </>
  );
}