// apps/website/src/app/(public)/resources/guides/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";

// Known slugs
const guideSlugs = [
  "cybersecurity-guide-sme-lesotho",
  "choose-accounting-system",
  "cloud-computing-schools-lesotho",
  "reliable-network-growing-business",
  "data-privacy-professional-services",
  "digital-transformation-ngo-lesotho",
];

export async function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

// Rich fallback with full content for each guide
const fallbackGuides: Record<string, any> = {
  "cybersecurity-guide-sme-lesotho": {
    title: "A Small Business Owner’s Guide to Cybersecurity in Lesotho",
    slug: "cybersecurity-guide-sme-lesotho",
    date: "15 May 2026",
    readingTime: "8 min read",
    coverImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
    content: `
      <p>Cyber threats are on the rise, and small businesses are often the easiest targets. This guide walks you through the five most common attacks and simple, affordable measures you can take today to protect your business.</p>
      <h3>1. Phishing Attacks</h3>
      <p>Phishing emails trick employees into giving away passwords or clicking malicious links. Train your team to spot suspicious emails and use email filtering tools.</p>
      <h3>2. Ransomware</h3>
      <p>Ransomware can lock all your files until a ransom is paid. Regularly back up your data offline and keep your antivirus updated.</p>
      <h3>3. Weak Passwords</h3>
      <p>Using simple passwords across multiple accounts is a huge risk. Use a password manager and enable two‑factor authentication wherever possible.</p>
      <h3>4. Unpatched Software</h3>
      <p>Outdated software contains security holes. Set up automatic updates for your operating system, applications, and router firmware.</p>
      <h3>5. Insider Threats</h3>
      <p>Disgruntled employees or accidental mistakes can cause data breaches. Limit access to sensitive data and monitor user activity.</p>
      <p>ForgeTech Nobles offers affordable cybersecurity packages tailored for SMEs. <a href="/contact">Book a free assessment today</a>.</p>
    `,
  },
  "choose-accounting-system": {
    title: "How to Choose the Right Accounting System for Your Firm",
    slug: "choose-accounting-system",
    date: "22 April 2026",
    readingTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    content: `
      <p>Selecting the right accounting system is crucial for your firm's efficiency. In this guide, we compare cloud‑based and on‑premise options and highlight the must‑have features for professional service providers.</p>
      <h3>Cloud vs. On‑Premise</h3>
      <p>Cloud accounting software (like Xero, QuickBooks Online) offers accessibility from anywhere and automatic updates. On‑premise solutions give you more control but require upfront hardware investment.</p>
      <h3>Key Features to Look For</h3>
      <ul>
        <li>Multi‑currency support</li>
        <li>Integration with your bank and payment gateways</li>
        <li>Customizable invoice templates</li>
        <li>Real‑time financial reporting</li>
        <li>User access controls</li>
      </ul>
      <h3>Our Recommendation</h3>
      <p>For most small to medium professional firms in Lesotho, a cloud‑based solution with strong customer support is the best choice. It reduces IT overhead and keeps your data secure.</p>
      <p>Need help setting up your accounting system? <a href="/contact">Get in touch with our team</a>.</p>
    `,
  },
  "cloud-computing-schools-lesotho": {
    title: "Cloud Computing for Lesotho Schools: A Practical Introduction",
    slug: "cloud-computing-schools-lesotho",
    date: "10 March 2026",
    readingTime: "10 min read",
    coverImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    content: `
      <p>Cloud computing is transforming education worldwide. This guide explains how schools in Lesotho can leverage the cloud to save money, improve collaboration, and enable remote learning.</p>
      <h3>What is Cloud Computing?</h3>
      <p>Cloud computing means storing and accessing data and programs over the internet instead of your computer's hard drive. For schools, this includes tools like Google Workspace for Education, Microsoft 365, and cloud‑based learning management systems.</p>
      <h3>Benefits for Schools</h3>
      <ul>
        <li>Cost savings on hardware and maintenance</li>
        <li>Easy collaboration between teachers and students</li>
        <li>Access to learning materials anytime, anywhere</li>
        <li>Automatic backups and disaster recovery</li>
        <li>Scalability as your school grows</li>
      </ul>
      <h3>Getting Started</h3>
      <p>Start by assessing your current IT infrastructure and internet connectivity. Then choose a cloud provider that meets your needs. Many offer free or discounted plans for educational institutions.</p>
      <p>ForgeTech Nobles can help your school migrate to the cloud. <a href="/services/cloud">Learn more about our cloud solutions</a>.</p>
    `,
  },
  "reliable-network-growing-business": {
    title: "Building a Reliable Network for Your Growing Business",
    slug: "reliable-network-growing-business",
    date: "05 February 2026",
    readingTime: "7 min read",
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    content: `
      <p>As your business expands, so do your networking needs. This guide covers the essentials of designing a wired and wireless network that scales with you—without breaking the bank.</p>
      <h3>Understand Your Requirements</h3>
      <p>Determine how many devices need to connect, the types of applications you use (video conferencing, cloud apps), and your future growth plans.</p>
      <h3>Choose the Right Equipment</h3>
      <p>Invest in a business‑grade router and switch. Ubiquiti and MikroTik offer powerful features at a fraction of the cost of Cisco. For Wi‑Fi, access points that support mesh networking can provide seamless coverage.</p>
      <h3>Segment Your Network</h3>
      <p>Use VLANs to separate guest traffic, internal operations, and sensitive data. This improves security and performance.</p>
      <h3>Plan for Redundancy</h3>
      <p>Set up backup internet connections and power supplies to minimise downtime. Even a simple 4G failover can keep you online during outages.</p>
      <p>For a custom network design, <a href="/contact">speak with our infrastructure team</a>.</p>
    `,
  },
  "data-privacy-professional-services": {
    title: "Data Privacy 101 for Professional Service Providers",
    slug: "data-privacy-professional-services",
    date: "18 January 2026",
    readingTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    content: `
      <p>Professional service firms handle highly sensitive client data every day. This guide outlines simple data privacy practices that will protect your clients and your reputation.</p>
      <h3>Know Your Data</h3>
      <p>Start by identifying what personal data you collect, where it is stored, and who has access to it. Create a data inventory if you haven't already.</p>
      <h3>Implement Access Controls</h3>
      <p>Limit access to confidential files on a need‑to‑know basis. Use strong, unique passwords and enable two‑factor authentication.</p>
      <h3>Encrypt Sensitive Information</h3>
      <p>Encrypt files stored on your computers and use encrypted email services when sharing sensitive documents with clients.</p>
      <h3>Train Your Team</h3>
      <p>Your employees are your first line of defence. Regular training on data privacy best practices can prevent accidental leaks.</p>
      <h3>Have a Response Plan</h3>
      <p>If a breach occurs, you need a clear plan. Know who to contact, how to contain the breach, and how to notify affected clients.</p>
      <p>ForgeTech Nobles provides data privacy assessments and security training. <a href="/contact">Contact us to get started</a>.</p>
    `,
  },
  "digital-transformation-ngo-lesotho": {
    title: "Digital Transformation Roadmap for Lesotho NGOs",
    slug: "digital-transformation-ngo-lesotho",
    date: "02 December 2025",
    readingTime: "12 min read",
    coverImage:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=400&fit=crop",
    content: `
      <p>Digital transformation can help NGOs achieve their mission more effectively. This roadmap outlines a step‑by‑step approach to modernising your organisation's operations.</p>
      <h3>Step 1: Assess Your Current State</h3>
      <p>Evaluate your existing technology, processes, and staff skills. Identify bottlenecks and areas where technology could make the biggest impact.</p>
      <h3>Step 2: Define Your Vision</h3>
      <p>What does success look like? Set clear, measurable goals for your digital transformation, such as improving donor reporting or enabling remote fieldwork.</p>
      <h3>Step 3: Choose the Right Tools</h3>
      <p>Select tools that fit your budget and needs. Cloud‑based donor management systems, collaboration platforms like Microsoft Teams, and mobile data collection apps are great starting points.</p>
      <h3>Step 4: Train Your Team</h3>
      <p>Invest in training to ensure your staff can use the new tools effectively. Change management is critical—communicate the benefits and provide ongoing support.</p>
      <h3>Step 5: Measure and Iterate</h3>
      <p>Regularly review your progress against the goals you set. Use feedback from staff and beneficiaries to refine your approach.</p>
      <p>ForgeTech Nobles specialises in digital transformation for NGOs. <a href="/contact">Let's discuss how we can help your organisation</a>.</p>
    `,
  },
};

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = fallbackGuides[slug] ?? null;

  if (!guide) {
    return (
      <section className="py-24 bg-white text-center">
        <h1 className="text-4xl font-bold text-brand-deep mb-4">
          Guide Not Found
        </h1>
        <p className="text-neutral-slate mb-6">
          We couldn't find the guide you were looking for. Browse all guides or contact us for assistance.
        </p>
        <Link
          href="/resources/guides"
          className="inline-flex items-center gap-2 rounded-full bg-brand-gold text-brand-navy px-6 py-3 text-sm font-bold hover:bg-amber-400 transition-colors shadow-md"
        >
          <ArrowLeft size={16} />
          View All Guides
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-16 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-widest bg-white/10 text-brand-gold border border-white/20 rounded-full backdrop-blur-sm">
            <BookOpen className="w-4 h-4 inline mr-1.5" />
            Technology Guide
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 leading-tight">
            {guide.title}
          </h1>
          <div className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-white/60 mt-3 md:mt-4">
            {guide.date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {guide.date}
              </span>
            )}
            {guide.readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {guide.readingTime}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {guide.coverImage && (
            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg mb-10 md:mb-12">
              <Image
                src={guide.coverImage}
                alt={guide.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
          <div
            className="prose prose-sm sm:prose-lg max-w-none prose-headings:text-brand-deep prose-headings:font-bold prose-p:text-neutral-slate prose-p:leading-relaxed prose-a:text-brand-tech prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-deep prose-blockquote:border-l-brand-gold prose-blockquote:text-neutral-slate prose-li:text-neutral-slate prose-li:leading-relaxed prose-img:rounded-xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: guide.content || "" }}
          />

          <div className="mt-12 pt-8 border-t border-neutral-border/60">
            <Link
              href="/resources/guides"
              className="inline-flex items-center gap-2 text-brand-tech font-medium hover:underline text-sm md:text-base"
            >
              <ArrowLeft size={16} />
              Back to All Guides
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}