import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Privacy Policy | ForgeTech Nobles",
  description:
    "ForgeTech Nobles' privacy policy explains how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-deep text-white py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-neutral-200 max-w-3xl mx-auto">
            We take your privacy seriously. This policy explains how we handle your personal data.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-brand-deep prose-p:text-neutral-slate prose-a:text-brand-tech prose-li:text-neutral-slate">
            <p><strong>Effective Date:</strong> 1 January 2026</p>
            <p>
              ForgeTech Nobles ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, store, and share your personal information when you visit our website, use our services, or interact with us.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Identification Information:</strong> Name, email address, phone number, company name, and job title when you fill out a form, subscribe to our newsletter, or request a consultation.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, operating system, referring URLs, and usage data collected automatically through cookies and analytics tools.</li>
              <li><strong>Communication Data:</strong> Emails, chat messages, or other correspondence you send to us.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>To respond to your inquiries and provide our services.</li>
              <li>To send you relevant updates, newsletters, and marketing materials (with your consent).</li>
              <li>To improve our website and services based on analytics and feedback.</li>
              <li>To comply with legal obligations and enforce our terms of service.</li>
            </ul>

            <h2>3. How We Share Your Information</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share data with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website, conducting business, or serving you (e.g., hosting providers, analytics tools). They are obligated to keep your information confidential.</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety.</li>
            </ul>

            <h2>4. Cookies & Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement industry‑standard security measures (encryption, firewalls, secure servers) to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul>
              <li>Access: Request a copy of the data we hold about you.</li>
              <li>Correction: Request that we correct any inaccurate or incomplete data.</li>
              <li>Deletion: Request that we delete your personal data, subject to legal obligations.</li>
              <li>Opt‑out: Unsubscribe from marketing communications at any time.</li>
            </ul>
            <p>To exercise these rights, please contact us at <a href="mailto:info@forgetechnobles.com">info@forgetechnobles.com</a>.</p>

            <h2>8. Third‑Party Links</h2>
            <p>
              Our website may contain links to external sites not operated by us. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              <strong>ForgeTech Nobles</strong><br />
              Lesotho Housing and Land Development Corporation, MFQH+FMP, Maseru<br />
              Email: <a href="mailto:info@forgetechnobles.com">info@forgetechnobles.com</a><br />
              Phone: <a href="tel:+26663013383">+266 6301 3383</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}