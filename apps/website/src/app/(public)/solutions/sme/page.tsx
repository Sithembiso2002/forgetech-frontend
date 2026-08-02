import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check, ArrowRight, Shield, BarChart3, Cloud, Users, ChevronRight, Play } from "lucide-react";

// ----------------------------------------------------------------------
// SME Solutions Page – ForgeTech Nobles
// ----------------------------------------------------------------------
export default function SMESolutionsPage() {
  return (
    <>
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Hero Section                                                      */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop"
            alt="SME team working"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-tech/30" />
        </div>

        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold bg-white/10 text-brand-gold border border-white/20 rounded-full backdrop-blur-sm">
              Small & Medium Enterprises
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Affordable Technology for Growing Businesses
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
              From your first website to fully managed IT, our SME packages give you enterprise‑grade tools at a fraction of the cost.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="gold" className="px-8 py-3.5 text-base">
                Get a Free Consultation
              </Button>
              <Button href="#packages" variant="outline" className="px-8 py-3.5 border-white/30 text-white hover:bg-white/10 text-base flex items-center gap-2">
                View Packages <ChevronRight size={18} />
              </Button>
            </div>

            {/* Key stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "R4000.00", label: "Starting From" },
                { value: "24/7 ", label: "You can contact support at any time." },
                { value: "100%", label: "Local Support" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-brand-gold">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Why Choose Us (Value Props)                                       */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Why SMEs Choose ForgeTech Nobles"
            subtitle="We understand the unique challenges of running a small business in Lesotho."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                icon: <Shield className="w-8 h-8 text-brand-tech" />,
                title: "Security‑First",
                desc: "72% of Basotho lack security awareness. We protect you from day one.",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-brand-tech" />,
                title: "Data‑Driven",
                desc: "Turn your numbers into actionable insights without a data science team.",
              },
              {
                icon: <Cloud className="w-8 h-8 text-brand-tech" />,
                title: "Cloud‑Native",
                desc: "Access your systems anywhere, anytime, on any device.",
              },
              {
                icon: <Users className="w-8 h-8 text-brand-tech" />,
                title: "Local Experts",
                desc: "100% Lesotho‑focused team that understands your market.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-neutral-offwhite rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-brand-deep/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-deep mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-slate">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Service Packages (Starter, Growth, Enterprise)                    */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section id="packages" className="py-20 bg-neutral-offwhite">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="SME Service Packages"
            subtitle="Flexible, affordable plans designed to grow with your business."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-brand-deep mb-2">Starter</h3>
                <p className="text-sm text-neutral-slate mb-6">Perfect for small service businesses starting their digital journey.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-brand-tech">M4,000</span>
                  <span className="text-neutral-slate text-sm"> setup</span>
                  <br />
                  <span className="text-neutral-slate">M400‑800/month</span>
                </div>
                <ul className="space-y-3 text-sm">
                  {["Basic network setup", "Professional website", "Accounting system setup", "Helpdesk support", "Essential security guide"].map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-slate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button href="/contact" variant="primary" className="mt-8 w-full bg-brand-deep hover:bg-brand-deep/90">
                Get Started
              </Button>
            </div>

            {/* Growth */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-brand-gold scale-105 flex flex-col">
              <span className="inline-block px-3 py-1 bg-brand-gold text-brand-navy text-xs font-bold rounded-full mb-4 self-start">Most Popular</span>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-brand-deep mb-2">Growth</h3>
                <p className="text-sm text-neutral-slate mb-6">For growing businesses needing structured operations.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-brand-tech">M8,000</span>
                  <span className="text-neutral-slate text-sm"> setup</span>
                  <br />
                  <span className="text-neutral-slate">M1,000‑2,000/month</span>
                </div>
                <ul className="space-y-3 text-sm">
                  {["Everything in Starter", "Custom business web app", "Basic BI dashboard", "Data backup setup", "Weekly technical support", "Security awareness workshop"].map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-slate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button href="/contact" variant="gold" className="mt-8 w-full">
                Get Started
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-brand-deep mb-2">Enterprise</h3>
                <p className="text-sm text-neutral-slate mb-6">For established organisations scaling operations.</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-brand-tech">M15,000+</span>
                  <span className="text-neutral-slate text-sm"> setup</span>
                  <br />
                  <span className="text-neutral-slate">M2,500‑5,000/month</span>
                </div>
                <ul className="space-y-3 text-sm">
                  {["Everything in Growth", "Full cloud migration", "Managed IT services", "Advanced security (antivirus, policies)", "Monthly performance reviews", "Priority support"].map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-slate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button href="/contact" variant="primary" className="mt-8 w-full bg-brand-deep hover:bg-brand-deep/90">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Process Timeline (How We Work)                                    */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Our SME Engagement Process"
            subtitle="A proven five‑step methodology that delivers results on time and on budget."
          />
          <div className="relative mt-12">
            {/* Vertical line (desktop) */}
            <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-brand-tech/30 -translate-x-1/2" />
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-5 md:gap-8">
              {[
                { step: "01", title: "Discover", desc: "We learn about your business, goals, and challenges." },
                { step: "02", title: "Design", desc: "We architect a tailored solution blueprint." },
                { step: "03", title: "Build", desc: "Our engineers develop and rigorously test the system." },
                { step: "04", title: "Deploy", desc: "We launch the solution securely into your environment." },
                { step: "05", title: "Support", desc: "Ongoing maintenance, monitoring, and optimisation." },
              ].map((item, i) => (
                <div key={i} className="relative flex md:flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-tech text-white flex items-center justify-center text-lg font-bold z-10 shadow-lg mb-4">
                    {item.step}
                  </div>
                  <div className="ml-4 md:ml-0">
                    <h4 className="font-bold text-brand-deep">{item.title}</h4>
                    <p className="text-sm text-neutral-slate">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Footer CTA with Wave Effect                                        */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-deep text-white overflow-hidden">
        {/* Wave top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 200" className="block w-full h-[100px] md:h-[140px]" preserveAspectRatio="none">
            <path d="M0,200 Q720,40 1440,200 L1440,0 L0,0 Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="relative container mx-auto px-6 pt-32 pb-20 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
            Ready to Take Your SME to the Next Level?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Book a free consultation today and discover how affordable technology can drive real growth for your business.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="/contact" variant="gold" className="px-8 py-3.5 text-base">
              Schedule a Consultation
            </Button>
            <Button href="/contact" variant="outline" className="px-8 py-3.5 border-white/30 text-white hover:bg-white/10 text-base">
              Call +266 6301 3383
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}