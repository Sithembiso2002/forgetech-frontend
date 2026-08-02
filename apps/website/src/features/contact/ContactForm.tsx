// apps/website/src/features/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [enquiryType, setEnquiryType] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message || !enquiryType) {
      setError("Please fill in all required fields.");
      return;
    }
    if (enquiryType === "services" && !selectedService) {
      setError("Please select a service.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          enquiryType,
          service: enquiryType === "services" ? selectedService : undefined,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setEnquiryType("");
      setSelectedService("");
    } catch (err: any) {
      setError(err.message || "Network error.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnquiryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEnquiryType(e.target.value);
    setSelectedService("");
    setError("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-10">
      {submitted ? (
        <div className="text-center py-8 md:py-12">
          <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-brand-tech mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-bold text-brand-deep mb-2">Thank You!</h3>
          <p className="text-neutral-slate text-sm md:text-base">
            Your message has been sent. We’ll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 md:mt-6 text-brand-tech hover:underline text-xs md:text-sm font-medium"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent transition"
              placeholder="Your full name"
            />
          </div>

          {/* Email + Phone – always 2 columns */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent transition"
                placeholder="+266 5XXX XXXX"
              />
            </div>
          </div>

          {/* Enquiry Type */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">Enquiry Type *</label>
            <select
              value={enquiryType}
              onChange={handleEnquiryChange}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent transition bg-white appearance-none"
            >
              <option value="" disabled>How can we help you?</option>
              <option value="general">General Enquiries</option>
              <option value="services">Services</option>
              <option value="vacancies">Vacancies Enquiry</option>
            </select>
          </div>

          {/* Conditional Service Dropdown */}
          <AnimatePresence>
            {enquiryType === "services" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">Select Service *</label>
                  <select
                    value={selectedService}
                    onChange={(e) => { setSelectedService(e.target.value); setError(""); }}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent transition bg-white appearance-none"
                  >
                    <option value="" disabled>Choose a service</option>
                    <option value="software-development">Software Development</option>
                    <option value="cloud-services">Cloud Services</option>
                    <option value="infrastructure-networking">Infrastructure & Networking</option>
                    <option value="data-analytics">Data & Analytics</option>
                    <option value="digital-transformation">Digital Transformation Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">Message *</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent transition resize-none"
              placeholder="Tell us about your project or enquiry..."
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs sm:text-sm">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 md:py-3.5 text-sm md:text-base inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-navy font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}