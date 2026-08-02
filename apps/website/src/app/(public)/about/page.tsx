import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { Target, Eye, Shield, Users, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* ── Hero – immersive photo with overlay text ── */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
            alt="ForgeTech Nobles team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/40" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 py-20 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 md:mb-6 text-xs md:text-sm font-semibold bg-white/10 text-brand-gold border border-white/20 rounded-full backdrop-blur-sm">
              Get to Know Us
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 md:mb-6">
              We Engineer Digital Success for Lesotho
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-xl mb-6 md:mb-8">
              ForgeTech Nobles is a full‑stack technology partner based in Maseru, building secure, scalable, and integrated digital solutions that help businesses modernise, grow, and thrive.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button href="/contact" variant="gold" className="px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base">
                Work With Us
              </Button>
              <Button
                href="#team"
                variant="outline"
                className="px-6 md:px-8 py-3 md:py-3.5 border-white/30 text-white hover:bg-white/10 text-sm md:text-base"
              >
                Meet the Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Are – side‑by‑side with a photo ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <div className="flex-1 order-2 lg:order-1 w-full">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=450&fit=crop"
                  alt="Our development team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/20 to-transparent" />
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 w-full">
              <SectionHeading
                title="Who We Are"
                subtitle="A team of engineers, consultants, and support specialists united by a passion for technology and client success."
                className="text-left"
              />
              <p className="text-sm md:text-base text-neutral-slate leading-relaxed mb-4 md:mb-6">
                ForgeTech Nobles is a Lesotho-based technology company dedicated to helping 
                businesses grow through innovative, reliable, and scalable digital solutions. 
                We specialize in custom software development, web applications, cloud solutions,
                infrastructure and networking, data & analytics, and digital transformation consulting.
              </p>
              <p className="text-sm md:text-base text-neutral-slate leading-relaxed mb-6 md:mb-8">
                Founded by a multidisciplinary team of technology and business professionals, 
                we combine technical expertise with strategic thinking to solve real business challenges.
                Our approach is centered on understanding each client's unique needs and delivering 
                solutions that improve efficiency, productivity, and long-term growth.
                At ForgeTech Nobles, we believe that technology should be practical, secure, and built to create measurable business value. 
                Guided by our commitment to quality, innovation, and integrity, we work closely with our clients to become trusted long-term technology partners.
              </p>
              <h3 className="text-base md:text-lg text-neutral-slate leading-relaxed mb-6 md:mb-8 font-bold">
                Smart Systems. Real Results.
              </h3>
              <Button href="/contact" variant="gold" className="inline-flex items-center gap-2 text-sm md:text-base">
                <Users size={16} />
                Join Our Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guiding Principles – clean card grid ── */}
      <section className="py-16 md:py-20 bg-neutral-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Our Guiding Principles"
            subtitle="The values that shape every project and partnership"
          />
          {/* Always at least 2 columns on phones */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-12">
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm hover:shadow-xl transition-shadow text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-brand-navy" />
              </div>
              <h3 className="text-base md:text-xl font-bold text-brand-deep mb-2 md:mb-3">Our Mission</h3>
              <p className="text-neutral-slate text-xs md:text-sm leading-relaxed">
                To deliver reliable digital solutions that connect our clients
                with authentic solutions while supporting businesses for
                sustainable growth.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm hover:shadow-xl transition-shadow text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                <Eye className="w-6 h-6 md:w-8 md:h-8 text-brand-navy" />
              </div>
              <h3 className="text-base md:text-xl font-bold text-brand-deep mb-2 md:mb-3">Our Vision</h3>
              <p className="text-neutral-slate text-xs md:text-sm leading-relaxed">
                To transform businesses and communities across the globe with
                digital solutions.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm hover:shadow-xl transition-shadow text-center group col-span-2 md:col-span-1">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-brand-navy" />
              </div>
              <h3 className="text-base md:text-xl font-bold text-brand-deep mb-2 md:mb-3">Our Promise</h3>
              <p className="text-neutral-slate text-xs md:text-sm leading-relaxed">
                Deliver smart, reliable, and scalable technology solutions with professionalism,
                transparency, and a commitment to helping your business succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership Team – with larger photos ── */}
      <section id="team" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Our Team"
            subtitle="Meet the people driving innovation at ForgeTech Nobles"
          />

          {/* Org Chart */}
          <div className="mt-12 md:mt-16 flex flex-col items-center">
            {/* Top Level: Managing Director */}
            <div className="mb-8 md:mb-10 text-center">
              <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden border-4 border-brand-gold shadow-xl">
                <Image
                  src="images/Picture4.png"
                  alt="Temoho Sekautu"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-xl md:text-2xl text-brand-deep">Temoho Sekautu</h3>
              <p className="text-brand-tech font-medium text-base md:text-lg">Managing Director</p>
              <p className="text-neutral-slate text-xs md:text-sm mt-1 max-w-xs mx-auto">
                Strategy • Leadership • Business Development
              </p>
            </div>

            {/* Connecting line (hidden on mobile) */}
            <div className="hidden md:flex items-center justify-center w-full mb-8">
              <div className="h-0.5 w-48 bg-brand-tech/30"></div>
              <div className="h-4 w-4 rounded-full bg-brand-tech"></div>
              <div className="h-0.5 w-48 bg-brand-tech/30"></div>
            </div>

            {/* Second Level: Department Leads – always 2 columns on phones */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-4xl mx-auto">
              <div className="text-center">
                <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden border-2 border-brand-gold">
                  <Image
                    src="images/Picture3.png"
                    alt="Motele Tseou"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-base md:text-lg text-brand-deep">Motele Tseou</h3>
                <p className="text-brand-tech font-medium text-xs md:text-sm">Business & Finance</p>
                <p className="text-neutral-slate text-xs mt-1">Marketing & Accounts</p>
              </div>

              <div className="text-center">
                <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden border-2 border-brand-gold">
                  <Image
                    src="images/Picture1.png"
                    alt="Sethembiso Sehlabane"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-base md:text-lg text-brand-deep">Sethembiso Sehlabane</h3>
                <p className="text-brand-tech font-medium text-xs md:text-sm">Software Engineering</p>
                <p className="text-neutral-slate text-xs mt-1">Lead Engineer</p>
              </div>

              <div className="text-center col-span-2 md:col-span-1 mx-auto max-w-[200px]">
                <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden border-2 border-brand-gold">
                  <Image
                    src="images/Picture2.png"
                    alt="Mosa Manyeli"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-base md:text-lg text-brand-deep">Mosa Manyeli</h3>
                <p className="text-brand-tech font-medium text-xs md:text-sm">Systems Analysis & Infrastructure</p>
                <p className="text-neutral-slate text-xs mt-1">Technical Architect</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call to Action – wave transition ── */}
      <section className="relative bg-brand-deep text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 200" className="block w-full h-[80px] md:h-[140px]" preserveAspectRatio="none">
            <path d="M0,200 Q720,40 1440,200 L1440,0 L0,0 Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-16 md:pb-20 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6">
            Want to Work With Us?
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-6 md:mb-8">
            Let’s discuss how ForgeTech Nobles can help your business modernise, optimise, and grow.
          </p>
          <Button
            href="/contact"
            variant="gold"
            className="px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base inline-flex items-center gap-2"
          >
            Get in Touch <ArrowRight size={16} />
          </Button>
        </div>
      </section>
    </>
  );
}