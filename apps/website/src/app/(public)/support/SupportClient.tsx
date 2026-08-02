"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MessageSquare,
  BookOpen,
  ChevronDown,
  Send,
} from "lucide-react";
import Link from "next/link";


const supportCards = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    description: "Reach our support team directly.",
    action: "tel:+26663013383",
    actionText: "+266 6301 3383",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Support",
    description: "Send us a message anytime.",
    action: "mailto:support@forgetechnobles.com",
    actionText: "support@forgetechnobles.com",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Live Chat",
    description: "Chat with an agent (coming soon).",
    action: "#",
    actionText: "Launch Chat",
    disabled: true,
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Knowledge Base",
    description: "Browse guides and tutorials.",
    action: "/resources/guides",
    actionText: "View Guides",
    isLink: true,
  },
];

const faqs = [
  {
    question: "How quickly can I expect a response?",
    answer:
      "We aim to respond to all inquiries within 2 hours during business hours (Mon-Fri, 8am-5pm). Critical issues are prioritised.",
  },
  {
    question: "Do you offer 24/7 emergency support?",
    answer:
      "Yes, for clients with an active support contract we provide round‑the‑clock critical incident response. Contact your account manager for details.",
  },
  {
    question: "Where can I find product documentation?",
    answer:
      "Our knowledge base at /resources/guides contains setup guides, API docs, and troubleshooting articles. You can also access it directly from the card above.",
  },
  {
    question: "How do I request a new feature or report a bug?",
    answer:
      "Please use the contact form below and select 'Feature Request' or 'Bug Report' from the dropdown. Our product team reviews every submission.",
  },
  {
    question: "What are your standard maintenance windows?",
    answer:
      "Scheduled maintenance typically occurs on Saturdays from 10 PM to 2 AM SAST. We notify all affected clients at least 48 hours in advance via email.",
  },
];

export default function SupportClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-brand-navy text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-brand-deeper to-brand-navy">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            We’re Here to Help
          </motion.h1>
          <motion.p
            className="text-white/70 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our support team is ready to assist with any technical questions, service requests, or troubleshooting.
          </motion.p>
        </div>
      </section>

      {/* Support Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportCards.map((card, idx) => {
            const content = (
              <div
                className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                  card.disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-deep mb-2">
                  {card.title}
                </h3>
                <p className="text-neutral-slate text-sm mb-4">
                  {card.description}
                </p>
                <span className="text-brand-tech font-semibold text-sm flex items-center gap-1">
                  {card.actionText}
                  {!card.isLink && !card.disabled && (
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  )}
                </span>
              </div>
            );

            if (card.isLink) {
              return (
                <Link key={idx} href={card.action}>
                  {content}
                </Link>
              );
            }
            return (
              <a key={idx} href={card.disabled ? undefined : card.action} className={card.disabled ? "pointer-events-none" : ""}>
                {content}
              </a>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-center text-brand-deep mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl bg-neutral-offwhite border border-neutral-border/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-brand-deep font-semibold hover:bg-brand-deep/5 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-tech transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-neutral-charcoal text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form (optional) */}
      <section className="py-16 bg-brand-navy">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.h2
            className="text-3xl font-extrabold text-center text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Still Need Help?
          </motion.h2>
          <p className="text-center text-white/70 mb-10">
            Send us a message and we’ll get back to you within a few hours.
          </p>
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>
            <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold transition-colors">
              <option value="" className="bg-brand-navy">Select Topic</option>
              <option value="general" className="bg-brand-navy">General Inquiry</option>
              <option value="technical" className="bg-brand-navy">Technical Support</option>
              <option value="billing" className="bg-brand-navy">Billing</option>
              <option value="feature" className="bg-brand-navy">Feature Request</option>
              <option value="bug" className="bg-brand-navy">Bug Report</option>
            </select>
            <textarea
              rows={5}
              placeholder="Describe your issue or question..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-gold transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-navy font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}