import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Check,
  ArrowRight,
  Shield,
  BarChart3,
  Cloud,
  Users,
  Globe,
  Heart,
  FileText,
  TrendingUp,
  Lock,
} from "lucide-react";


export default function NGOSolutionsPage() {
  return (
    <>
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Hero – immediate relevance to NGO mission                          */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&h=800&fit=crop"
            alt="NGO field work"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-deep/70 to-brand-tech/20" />
        </div>

        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold bg-white/10 text-brand-gold border border-white/20 rounded-full backdrop-blur-sm">
              Non‑Profits & Development Organisations
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Technology That Amplifies Your Mission
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              We help NGOs and development agencies operate more efficiently, demonstrate impact to donors, and deliver programmes that change lives — all within realistic budgets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="gold" className="px-8 py-3.5 text-base">
                Request a Consultation
              </Button>
              <Button href="#how-we-help" variant="outline" className="px-8 py-3.5 border-white/30 text-white hover:bg-white/10 text-base flex items-center gap-2">
                See How We Help <ArrowRight size={18} />
              </Button>
            </div>

            {/* Key metrics */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
{ value: "R4000.00", label: "Starting From" },
                { value: "24/7 ", label: "You can contact support at any time." },
                { value: "100%", label: "Local Support" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-brand-gold">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* How We Help – business outcomes for NGOs                          */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section id="how-we-help" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="How Our Solutions Help Your Organisation Deliver More Impact"
            subtitle="We go beyond technology – we help you strengthen accountability, satisfy donors, and reach more beneficiaries."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <FileText className="w-8 h-8 text-brand-tech" />,
                title: "Streamline Donor Reporting",
                desc: "Automate complex reports with accurate, real‑time data. Cut reporting time by up to 70% and always be audit‑ready.",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-brand-tech" />,
                title: "Demonstrate Impact Clearly",
                desc: "Turn programme data into compelling dashboards and visual stories that prove your results to funders.",
              },
              {
                icon: <Cloud className="w-8 h-8 text-brand-tech" />,
                title: "Enable Remote Field Operations",
                desc: "Cloud‑based tools allow your field teams to collect data, submit reports, and collaborate from anywhere, even offline.",
              },
              {
                icon: <Shield className="w-8 h-8 text-brand-tech" />,
                title: "Protect Beneficiary Data",
                desc: "Implement robust cybersecurity and data privacy measures that comply with international NGO standards and local regulations.",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-brand-tech" />,
                title: "Maximise Limited Budgets",
                desc: "Affordable, scalable solutions that grow with your programmes. No upfront capital expenditure – pay as you go.",
              },
              {
                icon: <Users className="w-8 h-8 text-brand-tech" />,
                title: "Empower Your Team",
                desc: "Provide your staff with modern tools and training, improving productivity and job satisfaction across the organisation.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-neutral-offwhite rounded-xl p-6 hover:shadow-lg transition-shadow group">
                <div className="w-12 h-12 rounded-full bg-brand-deep/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
      {/* NGO Service Packages – clear, practical, affordable                */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-offwhite">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="NGO Service Packages"
            subtitle="Flexible, affordable plans designed specifically for non‑profit organisations."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-full bg-brand-tech/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-brand-tech" />
                </div>
                <h3 className="text-2xl font-bold text-brand-deep mb-2">Starter</h3>
                <p className="text-sm text-neutral-slate mb-4">For small NGOs beginning their digital journey.</p>
                <p className="text-xs font-medium text-brand-deep mb-4">How it helps:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Professional website to showcase your mission and attract donors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Basic donor management and contact database.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Essential cybersecurity and data protection setup.</span>
                  </li>
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
                <div className="w-12 h-12 rounded-full bg-brand-tech/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-brand-tech" />
                </div>
                <h3 className="text-2xl font-bold text-brand-deep mb-2">Growth</h3>
                <p className="text-sm text-neutral-slate mb-4">For NGOs managing multiple programmes and donor relationships.</p>
                <p className="text-xs font-medium text-brand-deep mb-4">How it helps:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Custom programme management dashboard.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Automated donor reporting with real‑time data.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Cloud‑based field data collection (offline‑capable).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Staff cybersecurity awareness training.</span>
                  </li>
                </ul>
              </div>
              <Button href="/contact" variant="gold" className="mt-8 w-full">
                Start Your Growth
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-full bg-brand-tech/10 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-brand-tech" />
                </div>
                <h3 className="text-2xl font-bold text-brand-deep mb-2">Enterprise</h3>
                <p className="text-sm text-neutral-slate mb-4">For large NGOs, INGOs, and development agencies with complex operations.</p>
                <p className="text-xs font-medium text-brand-deep mb-4">How it helps:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Full cloud infrastructure migration and management.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Enterprise BI and analytics for organisation‑wide insights.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Advanced cybersecurity and compliance frameworks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Dedicated account manager and 24/7 support.</span>
                  </li>
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
      {/* How We Work with NGOs – transparent process                        */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Our NGO Engagement Process"
            subtitle="A collaborative, phased approach that respects your timelines and budget constraints."
          />
          <div className="relative mt-12">
            <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-brand-tech/30 -translate-x-1/2" />
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-5 md:gap-6">
              {[
                { step: "01", title: "Listen", desc: "We understand your mission, programmes, and current technology challenges." },
                { step: "02", title: "Assess", desc: "Identify gaps, quick wins, and a roadmap aligned with donor expectations." },
                { step: "03", title: "Design", desc: "Co‑create a solution blueprint that fits your budget and operational realities." },
                { step: "04", title: "Deliver", desc: "Phased rollout with training and change management to ensure adoption." },
                { step: "05", title: "Support", desc: "Ongoing maintenance, monitoring, and quarterly impact reviews." },
              ].map((item, i) => (
                <div key={i} className="relative flex md:flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-tech text-white flex items-center justify-center text-lg font-bold z-10 shadow-lg mb-4">
                    {item.step}
                  </div>
                  <div className="ml-4 md:ml-0">
                    <h4 className="font-bold text-brand-deep">{item.title}</h4>
                    <p className="text-xs text-neutral-slate mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Final CTA – warm, mission‑focused                                 */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-deep text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 200" className="block w-full h-[100px] md:h-[140px]" preserveAspectRatio="none">
            <path d="M0,200 Q720,40 1440,200 L1440,0 L0,0 Z" fill="#F8FAFC" />
          </svg>
        </div>
        <div className="relative container mx-auto px-6 pt-32 pb-20 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
            Let’s Discuss How Technology Can Amplify Your Mission
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Schedule a free discovery session and receive a complimentary digital readiness assessment for your organisation.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href="/contact" variant="gold" className="px-8 py-3.5 text-base">
              Request a Consultation
            </Button>
            <Button href="/services" variant="outline" className="px-8 py-3.5 border-white/30 text-white hover:bg-white/10 text-base">
              Explore All Services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}