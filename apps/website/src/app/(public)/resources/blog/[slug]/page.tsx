// apps/website/src/app/(public)/resources/blog/[slug]/page.tsx
import { getBlogPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

// Advanced, user‑friendly slugs
const blogSlugs = [
  "cybersecurity-guide-for-small-businesses",
  "cloud-migration-step-by-step-guide",
  "digital-transformation-in-lesotho",
  "scalable-it-infrastructure-for-smes",
  "signs-you-need-custom-software",
  "data-analytics-for-small-businesses",
];

export async function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

// Rich fallback with updated slug keys (unchanged)
const fallbackArticles: Record<string, any> = {
  "cybersecurity-guide-for-small-businesses": {
    title: "Why SMEs Need Cybersecurity Now",
    slug: "cybersecurity-guide-for-small-businesses",
    date: "15 May 2026",
    readingTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
    content: `
      <p>With 72% of Basotho lacking basic security awareness, small and medium enterprises are at high risk. Cybercriminals increasingly target SMEs because they often have weaker defences than large corporations.</p>
      <p>In this article, we outline the top five threats facing local businesses and provide practical, low‑cost steps to protect your company.</p>
      <h3>1. Phishing Attacks</h3>
      <p>Phishing emails trick employees into revealing passwords or transferring funds. Implement email filtering and train your staff to recognise suspicious messages.</p>
      <h3>2. Ransomware</h3>
      <p>Ransomware locks your files until a ransom is paid. Regular offline backups and endpoint protection are your best defence.</p>
      <h3>3. Weak Passwords</h3>
      <p>Using the same password across multiple services is a major vulnerability. Use a password manager and enforce multi‑factor authentication.</p>
      <h3>4. Unpatched Software</h3>
      <p>Outdated software contains known security holes. Set up automatic updates and schedule regular vulnerability scans.</p>
      <h3>5. Insider Threats</h3>
      <p>Disgruntled employees or accidental mistakes can cause data breaches. Limit access privileges and monitor user activity.</p>
      <p>ForgeTech Nobles offers affordable cybersecurity packages tailored for SMEs. <a href="/contact">Contact us</a> for a free assessment.</p>
    `,
  },
  "cloud-migration-step-by-step-guide": {
    title: "Cloud Migration: A Step‑by‑Step Guide for African Businesses",
    slug: "cloud-migration-step-by-step-guide",
    date: "28 April 2026",
    readingTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    content: `
      <p>Moving to the cloud doesn't have to be painful. In this guide, we walk through the five phases of a successful cloud migration, specifically tailored for African businesses with limited bandwidth and budget constraints.</p>
      <h3>Phase 1: Assessment</h3>
      <p>Inventory your existing applications and data. Determine which workloads are suitable for the cloud and estimate costs.</p>
      <h3>Phase 2: Planning</h3>
      <p>Choose a cloud provider (AWS, Azure, Google Cloud), define a migration timeline, and set up a test environment.</p>
      <h3>Phase 3: Migration</h3>
      <p>Move your applications using a phased approach. Start with non‑critical systems, validate, then migrate production workloads.</p>
      <h3>Phase 4: Optimisation</h3>
      <p>Right‑size your cloud resources, set up auto‑scaling, and configure cost alerts to avoid bill shock.</p>
      <h3>Phase 5: Management</h3>
      <p>Ongoing monitoring, security updates, and performance tuning ensure your cloud environment runs efficiently.</p>
      <p>Need help? ForgeTech Nobles provides end‑to‑end cloud migration services. <a href="/services/cloud">Learn more</a>.</p>
    `,
  },
  "digital-transformation-in-lesotho": {
    title: "The State of Digital Transformation in Lesotho",
    slug: "digital-transformation-in-lesotho",
    date: "10 April 2026",
    readingTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    content: `
      <p>The Government of Lesotho launched the National Digital Transformation Strategy in June 2025, allocating M1.8 billion to stimulate private sector activity and modernise public services. This article examines what the strategy means for local businesses.</p>
      <p>Key initiatives include expanding internet access (currently at 48% penetration), digitising government services, and providing SME support through targeted investments.</p>
      <p>ForgeTech Nobles is proud to be a partner in several of these initiatives, providing cloud infrastructure and custom software to schools and healthcare facilities. <a href="/case-studies">Read our case studies</a>.</p>
    `,
  },
  "scalable-it-infrastructure-for-smes": {
    title: "How to Build a Scalable IT Infrastructure on a Budget",
    slug: "scalable-it-infrastructure-for-smes",
    date: "22 March 2026",
    readingTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    content: `
      <p>You don't need a massive budget to have a reliable IT backbone. In this guide, we show you how to design a network that grows with your business using cost‑effective hardware and cloud services.</p>
      <h3>Start with a Solid Foundation</h3>
      <p>Invest in a good router and firewall. Ubiquiti and MikroTik offer enterprise features at a fraction of the cost of Cisco.</p>
      <h3>Embrace the Cloud</h3>
      <p>Use cloud‑based servers for email, file storage, and backups. This eliminates the need for expensive on‑premise hardware.</p>
      <h3>Plan for Growth</h3>
      <p>Choose equipment that supports VLANs and can be managed remotely. This allows you to add new users and locations without re‑architecting your network.</p>
      <p>For a tailored network design, <a href="/contact">schedule a consultation</a> with our infrastructure team.</p>
    `,
  },
  "signs-you-need-custom-software": {
    title: "5 Signs Your Business Needs Custom Software",
    slug: "signs-you-need-custom-software",
    date: "05 March 2026",
    readingTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
    content: `
      <p>Off‑the‑shelf software is great for generic tasks, but when your business has unique processes, it can become a bottleneck. Here are five signs it's time to invest in a bespoke solution.</p>
      <h3>1. You're using spreadsheets for everything</h3>
      <p>Spreadsheets are error‑prone and don't scale. Custom software automates data entry and provides real‑time visibility.</p>
      <h3>2. Your team uses multiple disconnected tools</h3>
      <p>Custom software integrates all your workflows into a single platform, reducing manual data transfer and improving collaboration.</p>
      <h3>3. You can't find an off‑the‑shelf product that fits</h3>
      <p>If you've tried multiple solutions and none work perfectly, custom development is the answer.</p>
      <h3>4. Your competitors are outpacing you</h3>
      <p>Custom software gives you a competitive edge by enabling features and efficiencies your competitors can't replicate.</p>
      <h3>5. You're planning to scale rapidly</h3>
      <p>Custom solutions are built to grow with you, avoiding the limitations of packaged software.</p>
      <p>Ready to build? <a href="/contact">Let's discuss your project</a>.</p>
    `,
  },
  "data-analytics-for-small-businesses": {
    title: "Data Analytics for Small Businesses: Where to Start",
    slug: "data-analytics-for-small-businesses",
    date: "18 February 2026",
    readingTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    content: `
      <p>You don't need a data science team to gain valuable insights. With the right tools and approach, even small businesses can leverage analytics to make smarter decisions.</p>
      <h3>Start with your existing data</h3>
      <p>Look at your sales records, customer feedback, and website analytics. These are goldmines of information waiting to be explored.</p>
      <h3>Choose the right tool</h3>
      <p>Tools like Power BI, Tableau, and even Google Data Studio can connect to your existing systems and create visual dashboards with minimal setup.</p>
      <h3>Define your key metrics</h3>
      <p>Identify the 3‑5 metrics that matter most to your business—revenue, customer acquisition cost, inventory turnover—and focus on those.</p>
      <h3>Make it a habit</h3>
      <p>Schedule a weekly review of your dashboards. Over time, you'll spot trends and opportunities that you'd otherwise miss.</p>
      <p>ForgeTech Nobles builds custom BI dashboards for businesses of all sizes. <a href="/services/analytics">Explore our analytics services</a>.</p>
    `,
  },
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    post = null;
  }

  if (!post) {
    post = fallbackArticles[slug] ?? null;
  }

  if (!post) {
    return (
      <section className="py-24 bg-white text-center">
        <h1 className="text-4xl font-bold text-brand-deep mb-4">
          Blog Post: {slug}
        </h1>
        <p className="text-neutral-slate">This blog post is not yet available.</p>
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
            Blog Post
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 leading-tight">
            {post.title}
          </h1>
          {post.date && (
            <div className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-white/60 mt-3 md:mt-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="md:size-16" />
                {post.date}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.readingTime}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {post.coverImage && (
            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg mb-10 md:mb-12">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
          <div
            className="
              prose prose-sm sm:prose-lg max-w-none
              prose-headings:text-brand-deep prose-headings:font-bold
              prose-p:text-neutral-slate prose-p:leading-relaxed
              prose-a:text-brand-tech prose-a:no-underline hover:prose-a:underline
              prose-strong:text-brand-deep
              prose-blockquote:border-l-brand-gold prose-blockquote:text-neutral-slate
              prose-li:text-neutral-slate prose-li:leading-relaxed
              prose-img:rounded-xl prose-img:shadow-md
            "
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-neutral-border/60">
            <Link
              href="/resources/blog"
              className="inline-flex items-center gap-2 text-brand-tech font-medium hover:underline text-sm md:text-base"
            >
              <ArrowLeft size={16} />
              Back to All Articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}