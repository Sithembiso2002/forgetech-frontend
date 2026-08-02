import {
  ShieldCheck,
  Handshake,
  Users,
  BadgeCheck,
  Sparkles,
  Target,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Quality & Reliability",
    desc: "Enterprise‑grade solutions built for security, performance, and long‑term stability.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    desc: "We work closely with every client, becoming a trusted technology partner — not just a service provider.",
  },
  {
    icon: Users,
    title: "Client‑Centered Approach",
    desc: "Your goals drive every decision. Every solution is tailored specifically to your business.",
  },
  {
    icon: BadgeCheck,
    title: "Certified Expertise",
    desc: "ISO 27001 certified, Microsoft Gold Partner, and AWS Advanced Consulting Partner — real credentials you can trust.",
  },
  {
    icon: Sparkles,
    title: "Affordable Innovation",
    desc: "Enterprise‑grade tools at SME‑friendly prices. Packages start at M4,000 — not tens of thousands.",
  },
  {
    icon: Target,
    title: "100% Lesotho Focused",
    desc: "Deep understanding of local challenges, budgets, and business culture, aligned with national digital transformation goals.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-neutral-offwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading
          title="Why Choose ForgeTech Nobles?"
          subtitle="We’re committed to delivering reliable technology solutions that help businesses innovate, grow, and succeed."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-8 mt-10 sm:mt-12 md:mt-16">
          {reasons.map((item, i) => (
            <div
              key={item.title}
              className="group relative bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-border/30 hover:border-brand-tech/20 flex flex-col items-start gap-4"
            >
              {/* Icon */}
              <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-gold/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>

              {/* Text */}
              <div className="flex-1">
                <h4 className="text-base sm:text-lg font-bold text-brand-deep mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-slate leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Subtle bottom accent line on hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 bg-brand-gold rounded-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}