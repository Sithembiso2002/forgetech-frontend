// apps/website/src/features/home/ProcessSection.tsx
"use client";

import { motion } from "framer-motion";

const phases = [
  {
    step: "01",
    title: "Briefing",
    description:
      "Your product vision is mapped to clear technical requirements.",
  },
  {
    step: "02",
    title: "Prototyping",
    description:
      "A functional proof‑of‑concept is built for early validation.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Crafting a user‑centric and market‑ready product design.",
  },
  {
    step: "04",
    title: "Implementation",
    description:
      "Developing secure software and compliant hardware.",
  },
  {
    step: "05",
    title: "Growth",
    description:
      "Continuous optimization, monitoring, and innovation.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ProcessSection() {
  return (
    <section className="py-24 bg-white/90 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold leading-[1.2] tracking-tight text-brand-deep max-w-4xl mx-auto">
            <span className="text-brand-gold">ForgeTech Nobles</span> provides a seamless
            journey from{" "}
            <span className="text-brand-deep">concept and prototyping</span> to{" "}
            <span className="text-brand-deep">production‑ready software</span> and{" "}
            <span className="text-brand-deep">scalable infrastructure</span>.
          </h2>
        </div>

        {/* Process Steps – horizontal row with arrows */}
        <motion.div
          className="flex flex-wrap items-start justify-center gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center"
            >
              {/* Phase content */}
              <div className="flex flex-col items-center text-center max-w-[160px]">
                {/* Step number */}
                <div className="text-4xl font-black text-brand-tech mb-2">
                  {phase.step}
                </div>
                {/* Title */}
                <h3 className="text-lg font-bold text-brand-deep mb-1">
                  {phase.title}
                </h3>
                {/* Description */}
                <p className="text-sm text-neutral-slate leading-relaxed">
                  {phase.description}
                </p>
              </div>

              {/* Arrow connector (except after the last phase) */}
              {index < phases.length - 1 && (
                <div className="flex items-center justify-center mx-2 lg:mx-4">
                  <svg
                    className="w-5 h-5 text-brand-tech/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}