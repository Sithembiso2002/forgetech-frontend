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
      <section className="relative bg-brand-navy text-white py-16 md:py-28 overflow-hidden">
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

      {/* Why Work With Us – quick highlights */}
      <section className="py-14 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* 2 columns on all phones, 3 on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8 text-center">
            <div className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-brand-deep/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 md:w-7 md:h-7 text-brand-tech" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-brand-deep mb-1 md:mb-2">Meaningful Work</h3>
              <p className="text-xs md:text-sm text-neutral-slate">
                Your code and ideas will directly impact businesses and communities across Lesotho.
              </p>
            </div>
            <div className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-brand-deep/10 flex items-center justify-center">
                <Clock className="w-6 h-6 md:w-7 md:h-7 text-brand-tech" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-brand-deep mb-1 md:mb-2">Flexible Environment</h3>
              <p className="text-xs md:text-sm text-neutral-slate">
                We offer remote‑friendly policies and flexible hours because we trust our team.
              </p>
            </div>
            <div className="p-4 md:p-6 col-span-2 sm:col-span-1">
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 rounded-full bg-brand-deep/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 md:w-7 md:h-7 text-brand-tech" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-brand-deep mb-1 md:mb-2">Based in Maseru</h3>
              <p className="text-xs md:text-sm text-neutral-slate">
                Work in the heart of Lesotho’s capital, with opportunities to collaborate locally and remotely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* No vacancies message – only when there are none */}
      {vacancies.length === 0 && (
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
      <div className="bg-brand-deep rounded-none">
        <div className="container mx-auto px-4 sm:px-6 py-14 md:py-16 text-center text-white">
          <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-3">
            Don’t See the Right Role?
          </h3>
          <p className="text-white/80 mb-5 md:mb-6 max-w-xl mx-auto text-sm md:text-base">
            We’re always interested in meeting talented people. Send us your CV and let’s talk.
          </p>
          <Button href="/contact" variant="gold" className="text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3">
            Get in Touch
          </Button>
        </div>
      </div>
    </>
  );
}