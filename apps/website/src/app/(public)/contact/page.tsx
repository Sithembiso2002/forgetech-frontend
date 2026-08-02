import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle } from "lucide-react";
import ContactForm from "@/features/contact/ContactForm";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Contact Us | ForgeTech Nobles",
  description: "Get in touch with ForgeTech Nobles for a free consultation. We're based in Maseru, Lesotho.",
};



export default async function ContactPage() {
  return (
    <>
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Clean, Modern Hero with Two‑Column Layout                          */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/5 via-white to-brand-tech/5" />

        <div className="relative container mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            {/* Left Column – Text & CTA */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 md:mb-6 text-xs md:text-sm font-semibold bg-brand-tech/10 text-brand-tech rounded-full">
                <MessageCircle size={14} />
                Let’s Talk
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-deep mb-3 md:mb-4 leading-tight">
                We’d Love to Hear From You
              </h1>
              <p className="text-base md:text-lg text-neutral-slate max-w-xl mb-6 md:mb-8">
                Whether you have a project idea, a question about our services,
                or just want to say hello — our team is ready to help.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
                <Button href="#contact-form" variant="gold" className="px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base">
                  Send a Message
                </Button>
                <Button
                  href="tel:+26663013383"
                  variant="primary"
                  className="px-6 md:px-8 py-3 md:py-3.5 bg-brand-deep hover:bg-brand-deep/90 text-sm md:text-base inline-flex items-center gap-2"
                >
                  <Phone size={16} />
                  +266 6301 3383
                </Button>
              </div>
            </div>

            {/* Right Column – Real Image */}
            <div className="flex-1 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=450&fit=crop"
                  alt="ForgeTech Nobles team collaborating"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Contact Form & Details Section                                     */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section id="contact-form" className="py-16 md:py-20 bg-neutral-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Form Column */}
            <div className="flex-1">
              <h2 className="text-xl md:text-3xl font-bold text-brand-deep mb-4 md:mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Details & Map */}
            <div className="flex-1 space-y-6 md:space-y-8">
              <div>
                <h2 className="text-xl md:text-3xl font-bold text-brand-deep mb-4 md:mb-6">
                  Our Office
                </h2>
                {/* Contact info – 2 columns on all phones */}
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-tech/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-brand-tech" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-deep text-xs md:text-sm">Address</h3>
                      <p className="text-neutral-slate text-xs leading-relaxed">
                        Lesotho Housing and Land Development Corporation
                        <br />
                        MFQH+FMP, Maseru
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-tech/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-brand-tech" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-deep text-xs md:text-sm">Phone</h3>
                      <a
                        href="tel:+26663013383"
                        className="text-brand-tech hover:underline text-xs"
                      >
                        +266 6301 3383
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-tech/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-brand-tech" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-deep text-xs md:text-sm">Email</h3>
                      <a
                        href="mailto:info@forgetechnobles.com"
                        className="text-brand-tech hover:underline text-xs break-all"
                      >
                        info@forgetechnobles.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-tech/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-brand-tech" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-deep text-xs md:text-sm">Working Hours</h3>
                      <p className="text-neutral-slate text-xs leading-relaxed">
                        Monday – Friday
                        <br />
                        08:00 AM – 17:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Larger Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-md h-56 md:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.123456789!2d27.4800!3d-29.3100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE4JzM2LjAiUyAyN8KwMjgnNDguMCJF!5e0!3m2!1sen!2sls!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ForgeTech Nobles Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* Final CTA with Wave                                                */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-deep text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 200" className="block w-full h-[80px] md:h-[140px]" preserveAspectRatio="none">
            <path d="M0,200 Q720,40 1440,200 L1440,0 L0,0 Z" fill="#F8FAFC" />
          </svg>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-16 md:pb-20 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-6 md:mb-8">
            Schedule a free consultation and discover how we can help your business thrive.
          </p>
          <Button href="/services" variant="gold" className="px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base inline-flex items-center gap-2">
            Explore Services <ArrowRight size={16} />
          </Button>
        </div>
      </section>
    </>
  );
}