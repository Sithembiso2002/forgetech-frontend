"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Upload,
  ChevronDown,
  Loader2,
  CheckCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budget: "",
    attachment: null as File | null,
    privacyAccepted: false,
    marketingAccepted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, attachment: file }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) {
      setError("Please accept the privacy policy.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      let attachmentBase64: string | undefined;
      if (formData.attachment) {
        attachmentBase64 = await fileToBase64(formData.attachment);
      }

      const res = await fetch(`${API_URL}/hero-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message,
          budget: formData.budget || undefined,
          attachmentBase64,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24">
          {/* ───── LEFT COLUMN ───── */}
          <div className="lg:w-[40%]">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-brand-deep leading-tight mb-4 md:mb-6">
              Let’s set up a call
            </h2>
            <p className="text-sm md:text-lg text-neutral-slate mb-8 md:mb-10 leading-relaxed">
              Leave your info and a few words about the project. We’ll review it
              and reach out to book a call.
            </p>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-deep">Email</p>
                  <a
                    href="mailto:info@forgetechnobles.com"
                    className="text-brand-tech hover:underline text-xs sm:text-sm"
                  >
                    info@forgetechnobles.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-deep">Phone</p>
                  <a
                    href="tel:+26663013383"
                    className="text-brand-tech hover:underline text-xs sm:text-sm"
                  >
                    +266 6301 3383
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-deep">Address</p>
                  <p className="text-neutral-slate text-xs sm:text-sm">
                    Lesotho Housing and Land Development Corporation
                    <br />
                    MFQH+FMP, Maseru
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-deep">
                    Working Hours
                  </p>
                  <p className="text-neutral-slate text-xs sm:text-sm">
                    Monday – Friday, 08:00 AM – 17:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ───── RIGHT COLUMN – Request Form ───── */}
          <div className="lg:w-[60%]">
            {submitted ? (
              <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-8 md:p-10 text-center">
                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-brand-tech mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-brand-deep mb-2">
                  Thank you for your request!
                </h3>
                <p className="text-neutral-slate text-sm md:text-base">
                  We'll get back to you within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-brand-tech hover:underline text-sm font-medium"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-neutral-offwhite rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm border border-neutral-border/60"
              >
                {/* ---- Always 2 columns – even on smallest phones ---- */}
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent bg-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent bg-white"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent bg-white"
                      placeholder="+266 5XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">
                      Approximate Budget
                    </label>
                    <div className="relative">
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 md:px-4 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent bg-white"
                      >
                        <option value="">Select budget range</option>
                        <option value="0-5000">R0 – R5,000</option>
                        <option value="5000-10000">R5,000 – R10,000</option>
                        <option value="10000-25000">R10,000 – R25,000</option>
                        <option value="25000-50000">R25,000 – R50,000</option>
                        <option value="50000+">R50,000+</option>
                      </select>
                      <ChevronDown
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                        size={16}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-6">
                  <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2.5 md:px-4 md:py-3 border border-neutral-border rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-tech focus:border-transparent bg-white resize-none"
                    placeholder="Tell us about your project and goals..."
                  />
                </div>

                <div className="mt-4 md:mt-6">
                  <label className="block text-xs sm:text-sm font-medium text-brand-deep mb-1">
                    Attach a File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.docx,.odt,.ods,.ppt,.pptx,.xls,.xlsx,.rtf,.txt"
                    />
                    <div className="flex items-center gap-2 px-3 py-2.5 md:px-4 md:py-3 border border-dashed border-neutral-border rounded-lg text-xs sm:text-sm text-neutral-slate bg-white hover:bg-neutral-offwhite transition-colors">
                      <Upload size={16} />
                      <span className="truncate">
                        {formData.attachment
                          ? formData.attachment.name
                          : "Upload a file (.pdf, .docx, .xlsx, etc.)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleCheckbox}
                      className="mt-1 rounded border-neutral-border text-brand-tech focus:ring-brand-tech"
                    />
                    <span className="text-xs sm:text-sm text-neutral-slate">
                      I accept your{" "}
                      <a
                        href="/privacy-policy"
                        className="text-brand-tech underline"
                      >
                        Privacy Policy
                      </a>{" "}
                      *
                    </span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="marketingAccepted"
                      checked={formData.marketingAccepted}
                      onChange={handleCheckbox}
                      className="mt-1 rounded border-neutral-border text-brand-tech focus:ring-brand-tech"
                    />
                    <span className="text-xs sm:text-sm text-neutral-slate">
                      I agree to receive marketing materials and updates from
                      ForgeTech Nobles
                    </span>
                  </label>
                </div>

                <p className="text-[10px] sm:text-xs text-neutral-400 mt-4">
                  We guarantee privacy. This site is protected by reCAPTCHA and
                  the{" "}
                  <a href="/privacy-policy" className="underline">
                    Privacy Policy
                  </a>
                  .
                </p>

                {error && (
                  <div className="mt-4 text-red-500 text-xs sm:text-sm flex items-center gap-2">
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 md:mt-8 w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 flex items-center justify-center gap-2 bg-brand-gold text-brand-navy font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {loading ? "Sending..." : "Send My Request Now"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}