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
  Server,
  Lock,
  Globe,
  TrendingUp,
  Clock,
  FileCheck,
} from "lucide-react";


export default function EnterpriseSolutionsPage() {
  return (
    <>
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Hero – immediate value proposition and trust signals               */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop"
            alt="Enterprise technology"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-deep/70 to-brand-tech/20" />
        </div>

        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold bg-white/10 text-brand-gold border border-white/20 rounded-full backdrop-blur-sm">
              Enterprise & Government
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Digital Transformation That Delivers Measurable Business Impact
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              We engineer integrated, secure, and scalable technology ecosystems that modernise operations, reduce costs, and create new revenue streams – all aligned to your strategic goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="gold" className="px-8 py-3.5 text-base">
                Request a Consultation
              </Button>
              <Button href="#how-we-help" variant="outline" className="px-8 py-3.5 border-white/30 text-white hover:bg-white/10 text-base flex items-center gap-2">
                See How We Help <ArrowRight size={18} />
              </Button>
            </div>

            {/* Trust metrics */}
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
      {/* How We Help – direct business outcomes                            */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section id="how-we-help" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="How Our Enterprise Solutions Help Your Organisation"
            subtitle="We go beyond technology – we deliver tangible business results that your board and stakeholders care about."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <TrendingUp className="w-8 h-8 text-brand-tech" />,
                title: "Accelerate Growth",
                desc: "Streamline operations, automate manual tasks, and launch new digital services faster – directly increasing revenue and market share.",
              },
              {
                icon: <Shield className="w-8 h-8 text-brand-tech" />,
                title: "Reduce Risk",
                desc: "Implement enterprise‑grade cybersecurity and compliance frameworks that protect sensitive data and keep you audit‑ready at all times.",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-brand-tech" />,
                title: "Make Smarter Decisions",
                desc: "Turn fragmented data into unified dashboards and predictive insights, enabling leadership to act on facts, not gut feelings.",
              },
              {
                icon: <Clock className="w-8 h-8 text-brand-tech" />,
                title: "Increase Efficiency",
                desc: "Eliminate bottlenecks with integrated systems that talk to each other, reducing manual work and freeing your team for high‑value tasks.",
              },
              {
                icon: <FileCheck className="w-8 h-8 text-brand-tech" />,
                title: "Ensure Compliance",
                desc: "Stay ahead of regulatory changes with built‑in governance, audit trails, and reporting that satisfies local and international standards.",
              },
              {
                icon: <Users className="w-8 h-8 text-brand-tech" />,
                title: "Empower Your Workforce",
                desc: "Provide modern tools and training that improve employee satisfaction, collaboration, and productivity – whether in‑office or remote.",
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
      {/* Services that deliver the outcomes (detailed)                     */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-neutral-offwhite">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Enterprise Services Tailored to Your Needs"
            subtitle="Each engagement is customised to your unique challenges. Here’s how we typically help."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Managed Infrastructure */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-full bg-brand-tech/10 flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-brand-tech" />
                </div>
                <h3 className="text-2xl font-bold text-brand-deep mb-2">Managed Infrastructure</h3>
                <p className="text-sm text-neutral-slate mb-4">
                  We design, migrate, and run your entire IT backbone – networks, servers, cloud – so you can focus on your mission.
                </p>
                <p className="text-xs font-medium text-brand-deep mb-4">How it helps:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Reduce infrastructure costs by 30‑50% through optimisation and cloud migration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Eliminate downtime with 24/7 proactive monitoring and guaranteed SLAs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Simplify vendor management – we become your single point of accountability.</span>
                  </li>
                </ul>
              </div>
              <Button href="/contact" variant="primary" className="mt-8 w-full bg-brand-deep hover:bg-brand-deep/90">
                Discuss Infrastructure
              </Button>
            </div>

            {/* Digital Transformation Consulting */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-brand-gold scale-105 flex flex-col">
              <span className="inline-block px-3 py-1 bg-brand-gold text-brand-navy text-xs font-bold rounded-full mb-4 self-start">Most Popular</span>
              <div className="flex-1">
                <div className="w-12 h-12 rounded-full bg-brand-tech/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-brand-tech" />
                </div>
                <h3 className="text-2xl font-bold text-brand-deep mb-2">Digital Transformation</h3>
                <p className="text-sm text-neutral-slate mb-4">
                  From strategy to execution, we guide your organisation through every stage of modernisation.
                </p>
                <p className="text-xs font-medium text-brand-deep mb-4">How it helps:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Align technology investments with business objectives, avoiding wasted spend.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Reduce time‑to‑market for new services by 40% through agile delivery.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Ensure adoption with our change management and staff training programmes.</span>
                  </li>
                </ul>
              </div>
              <Button href="/contact" variant="gold" className="mt-8 w-full">
                Start Your Transformation
              </Button>
            </div>

            {/* Data & Analytics */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-full bg-brand-tech/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-brand-tech" />
                </div>
                <h3 className="text-2xl font-bold text-brand-deep mb-2">Data & Analytics</h3>
                <p className="text-sm text-neutral-slate mb-4">
                  Unlock the value hidden in your data with enterprise BI and AI solutions.
                </p>
                <p className="text-xs font-medium text-brand-deep mb-4">How it helps:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Make faster, evidence‑based decisions with real‑time dashboards for every department.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Identify revenue opportunities and cost savings through predictive analytics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-brand-tech mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-slate">Automate regulatory reporting, cutting preparation time by up to 80%.</span>
                  </li>
                </ul>
              </div>
              <Button href="/contact" variant="primary" className="mt-8 w-full bg-brand-deep hover:bg-brand-deep/90">
                Explore Data Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* How We Work – transparent process with business focus               */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Our Proven Enterprise Engagement Process"
            subtitle="A structured, transparent methodology that keeps your business goals at the centre."
          />
          <div className="relative mt-12">
            <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-brand-tech/30 -translate-x-1/2" />
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-6 md:gap-6">
              {[
                { step: "01", title: "Discover", desc: "We map your strategic objectives, current pain points, and desired outcomes." },
                { step: "02", title: "Assess", desc: "Technical and operational audits reveal gaps, risks, and quick‑win opportunities." },
                { step: "03", title: "Architect", desc: "We design a solution blueprint with clear ROI projections and milestones." },
                { step: "04", title: "Implement", desc: "Phased delivery minimises disruption; your team is trained throughout." },
                { step: "05", title: "Manage", desc: "24/7 support, proactive monitoring, and a dedicated account manager." },
                { step: "06", title: "Optimise", desc: "Quarterly business reviews ensure continuous improvement and value realisation." },
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
      {/* Final CTA – clear next step                                       */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-deep text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 200" className="block w-full h-[100px] md:h-[140px]" preserveAspectRatio="none">
            <path d="M0,200 Q720,40 1440,200 L1440,0 L0,0 Z" fill="#F8FAFC" />
          </svg>
        </div>
        <div className="relative container mx-auto px-6 pt-32 pb-20 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
            Let’s Discuss Your Enterprise Digital Roadmap
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Schedule a discovery session with our enterprise architects and receive a complimentary digital maturity assessment.
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