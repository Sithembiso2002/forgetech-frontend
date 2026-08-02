import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-20 bg-brand-gold text-brand-navy text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Business?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let’s discuss how ForgeTech Nobles can help you modernise, optimise, and grow.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button href="/contact" variant="primary" className="bg-brand-navy hover:bg-brand-navy/90">
            Schedule a Consultation
          </Button>
          <Button href="/services" variant="outline" className="border-brand-navy text-brand-navy hover:bg-brand-navy/10">
            View Services
          </Button>
        </div>
      </div>
    </section>
  );
}