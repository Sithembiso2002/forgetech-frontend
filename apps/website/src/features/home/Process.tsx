import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { step: "01", title: "Discover", desc: "We learn about your business, goals, and challenges." },
  { step: "02", title: "Design", desc: "We architect a tailored solution blueprint." },
  { step: "03", title: "Build", desc: "Our engineers develop and rigorously test the system." },
  { step: "04", title: "Deploy", desc: "We launch the solution securely into your environment." },
  { step: "05", title: "Support", desc: "Ongoing maintenance, monitoring, and optimisation." },
];

export default function Process() {
  return (
    <section className="py-16 md:py-20 bg-neutral-offwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading
          title="How We Work"
          subtitle="A proven five‑step methodology that delivers projects on time and on budget."
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mt-10 md:mt-12">
          {steps.map((item, i) => (
            <div key={i} className="text-center relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-tech text-white flex items-center justify-center mx-auto text-base sm:text-lg font-bold mb-3 sm:mb-4">
                {item.step}
              </div>
              <h4 className="font-semibold text-brand-deep mb-1 sm:mb-2 text-sm sm:text-base">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-slate leading-relaxed">
                {item.desc}
              </p>
              {/* Connecting line – only on md+ screens */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-brand-tech/30 -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}