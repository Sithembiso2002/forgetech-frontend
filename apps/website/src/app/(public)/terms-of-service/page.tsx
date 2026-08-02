import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Terms of Service | ForgeTech Nobles",
  description:
    "Read the Terms of Service for ForgeTech Nobles. This agreement governs your use of our website and technology services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-deep text-white py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-neutral-200 max-w-3xl mx-auto">
            The agreement between you and ForgeTech Nobles for the use of our
            website and services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-brand-deep prose-p:text-neutral-slate prose-a:text-brand-tech prose-li:text-neutral-slate prose-strong:text-brand-deep">
            <p><strong>Effective Date:</strong> 16 February 2026</p>
            <p>
              Welcome to ForgeTech Nobles. By accessing our website at{" "}
              <a href="https://forgetechnobles.com">forgetechnobles.com</a> or
              engaging our services, you agree to be bound by these Terms of
              Service ("Terms"). Please read them carefully before using our
              website or services.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the ForgeTech Nobles website, you
              acknowledge that you have read, understood, and agree to be
              legally bound by these Terms. If you do not agree with any part
              of these Terms, you must not use our website or services.
            </p>

            <h2>2. Services Provided</h2>
            <p>
              ForgeTech Nobles provides technology consulting, custom software
              development, cloud infrastructure management, IT support, data
              analytics, and other related services as described on our website
              and in individual client agreements. The specific scope,
              deliverables, timeline, and fees for each engagement will be
              outlined in a separate Statement of Work (SOW) or service
              agreement executed by both parties.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue any
              aspect of our services at any time with reasonable notice to
              affected clients.
            </p>

            <h2>3. User Obligations</h2>
            <p>When using our website or services, you agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information as required.</li>
              <li>Use the website and services only for lawful purposes and in compliance with all applicable laws and regulations.</li>
              <li>Not engage in any activity that disrupts or interferes with the website, its servers, or networks.</li>
              <li>Not attempt to gain unauthorized access to any part of the website, other accounts, or computer systems.</li>
              <li>Respect our intellectual property rights and those of third parties.</li>
            </ul>

            <h2>4. Intellectual Property Rights</h2>
            <p>
              <strong>Our IP:</strong> All content on the ForgeTech Nobles
              website, including text, graphics, logos, images, videos,
              software, and design elements, is owned by or licensed to
              ForgeTech Nobles and is protected by copyright, trademark, and
              other intellectual property laws. You may not reproduce,
              distribute, modify, or create derivative works without our
              express written permission.
            </p>
            <p>
              <strong>Client IP:</strong> Unless otherwise agreed in writing,
              you retain ownership of any materials, data, or intellectual
              property you provide to us. For custom development projects, the
              ownership of deliverables will be specified in the individual
              service agreement.
            </p>

            <h2>5. Confidentiality</h2>
            <p>
              Both parties agree to treat any non-public, proprietary
              information disclosed during the course of the engagement as
              confidential. This includes but is not limited to business
              strategies, trade secrets, technical specifications, client data,
              and financial information. This obligation survives the
              termination of the agreement.
            </p>

            <h2>6. Payment Terms</h2>
            <p>
              Fees for our services are specified in the applicable SOW or
              invoice. Unless otherwise stated, invoices are due within 15 days
              of receipt. Late payments may incur interest at a rate of 1.5% per
              month or the maximum allowed by law. We reserve the right to
              suspend services if payment is not received within the agreed
              timeframe.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, ForgeTech Nobles shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to
              loss of profits, data, or business opportunities, arising from
              your use of our website or services.
            </p>
            <p>
              Our total liability for any claim arising out of or relating to
              these Terms or our services shall not exceed the total amount paid
              by you to ForgeTech Nobles for the specific service giving rise to
              the claim during the 12 months prior to the event.
            </p>

            <h2>8. Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided on an "as is" and "as
              available" basis. We make no warranties, expressed or implied,
              regarding the accuracy, reliability, or availability of the
              website or services. We disclaim all implied warranties of
              merchantability, fitness for a particular purpose, and
              non‑infringement.
            </p>

            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless ForgeTech
              Nobles, its officers, employees, and agents from and against any
              claims, liabilities, damages, losses, or expenses arising from
              your use of the website or services, your violation of these
              Terms, or your infringement of any third‑party rights.
            </p>

            <h2>10. Third‑Party Links</h2>
            <p>
              Our website may contain links to external websites or services
              that are not owned or controlled by us. We are not responsible
              for the content, privacy practices, or terms of those sites. We
              encourage you to review the policies of any third‑party site you
              visit.
            </p>

            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your access to our website or
              services immediately, without prior notice, if you breach these
              Terms. Upon termination, your right to use the website and
              services will cease. Provisions relating to intellectual property,
              confidentiality, limitation of liability, and payment obligations
              shall survive termination.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the Kingdom of Lesotho, without regard to its conflict
              of law provisions. Any disputes arising from these Terms or our
              services shall be subject to the exclusive jurisdiction of the
              courts located in Maseru, Lesotho.
            </p>

            <h2>13. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              post the updated Terms on this page and update the effective date.
              Your continued use of the website or services after any changes
              constitutes your acceptance of the new Terms.
            </p>

            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>ForgeTech Nobles</strong><br />
              Lesotho Housing and Land Development Corporation, MFQH+FMP,
              Maseru<br />
              Email:{" "}
              <a href="mailto:info@forgetechnobles.com">
                info@forgetechnobles.com
              </a>
              <br />
              Phone: <a href="tel:+26663013383">+266 6301 3383</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}