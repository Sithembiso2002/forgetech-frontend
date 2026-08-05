// apps/website/src/app/(public)/resources/news/[slug]/page.tsx
import { getNewsBySlug, getNews } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

// Known slugs (used if API is unreachable)
const knownSlugs = [
  "forgetech-nobles-launches-official-corporate-website-for-digital-transformation-services-in-lesotho",
  "forgetech-nobles-unveils-new-corporate-brand-identity-and-professional-business-profile",
  "forgetech-nobles-expands-digital-transformation-and-enterprise-technology-service-portfolio",
  "forgetech-nobles-introduces-strategic-technology-partnership-model-for-enterprise-project-delivery",
  "forgetech-nobles-strengthens-commitment-to-support-small-and-medium-enterprises-through-digital-innovation",
  "forgetech-nobles-announces-mission-to-accelerate-digital-transformation-and-business-innovation-in-lesotho",
];

// Required for static export
export async function generateStaticParams() {
  try {
    const newsList = await getNews();
    if (newsList && newsList.length > 0) {
      return newsList.map((item: any) => ({ slug: item.slug }));
    }
  } catch (error) {
    // ignore – will fall back to known slugs
  }
  return knownSlugs.map((slug) => ({ slug }));
}

// Updated fallback articles – your six latest news items
const fallbackArticles: Record<string, any> = {
  "forgetech-nobles-launches-official-corporate-website-for-digital-transformation-services-in-lesotho": {
    id: "news-001",
    title: "ForgeTech Nobles Officially Launches Its Corporate Website",
    slug: "forgetech-nobles-launches-official-corporate-website-for-digital-transformation-services-in-lesotho",
    summary:
      "ForgeTech Nobles has officially launched its corporate website to showcase its technology services, portfolio, and digital transformation solutions.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80&auto=format&fit=crop",
    date: "2026-07-30",
    readingTime: "4 min",
    content: `<p>ForgeTech Nobles is proud to announce the official launch of its corporate website. The new platform has been developed to provide businesses across Lesotho with easy access to the company's comprehensive technology services, including custom software development, web development, cloud solutions, IT infrastructure, networking, business intelligence, and digital transformation consulting. The website also features the company portfolio, service packages, industry expertise, company news, and direct communication channels, reflecting ForgeTech Nobles' commitment to delivering modern, reliable, and scalable technology solutions.</p>`,
  },
  "forgetech-nobles-unveils-new-corporate-brand-identity-and-professional-business-profile": {
    id: "news-002",
    title: "ForgeTech Nobles Unveils New Corporate Identity and Brand Strategy",
    slug: "forgetech-nobles-unveils-new-corporate-brand-identity-and-professional-business-profile",
    summary:
      "ForgeTech Nobles introduces its refined corporate identity, including a modern logo, business profile, and marketing assets.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80&auto=format&fit=crop",
    date: "2026-07-31",
    readingTime: "3 min",
    content: `<p>As part of its long-term growth strategy, ForgeTech Nobles has completed a comprehensive corporate branding initiative. The project included the redesign of the company's visual identity, development of a professional company profile, marketing brochures, presentation materials, and a modern digital brand that reflects its enterprise-focused approach. The refreshed identity strengthens the company's positioning as a trusted technology partner for businesses seeking innovative and integrated IT solutions.</p>`,
  },
  "forgetech-nobles-expands-digital-transformation-and-enterprise-technology-service-portfolio": {
    id: "news-003",
    title: "ForgeTech Nobles Expands Technology Services to Support Business Growth",
    slug: "forgetech-nobles-expands-digital-transformation-and-enterprise-technology-service-portfolio",
    summary:
      "The company has expanded its technology portfolio to provide businesses with more integrated digital solutions.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80&auto=format&fit=crop",
    date: "2026-08-01",
    readingTime: "5 min",
    content: `<p>ForgeTech Nobles continues to strengthen its service offering by expanding its portfolio to include enterprise-grade software development, responsive web applications, IT infrastructure, networking, cloud technologies, managed IT support, business intelligence, and digital transformation consulting. The expanded portfolio enables organizations to work with a single technology partner capable of delivering end-to-end digital solutions that improve operational efficiency, security, and long-term scalability.</p>`,
  },
  "forgetech-nobles-introduces-strategic-technology-partnership-model-for-enterprise-project-delivery": {
    id: "news-004",
    title: "ForgeTech Nobles Introduces Strategic Partnership Delivery Model",
    slug: "forgetech-nobles-introduces-strategic-technology-partnership-model-for-enterprise-project-delivery",
    summary:
      "ForgeTech Nobles adopts a partnership-driven model to deliver specialized technology solutions for clients.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop",
    date: "2026-08-03",
    readingTime: "4 min",
    content: `<p>ForgeTech Nobles has introduced a strategic partnership model that enables the company to collaborate with trusted technology specialists and industry experts when delivering large-scale or highly specialized projects. This approach ensures that clients receive enterprise-quality solutions while benefiting from a single point of coordination. Through carefully selected partnerships, ForgeTech Nobles continues to strengthen its ability to deliver reliable, scalable, and innovative technology services across multiple industries.</p>`,
  },
  "forgetech-nobles-strengthens-commitment-to-support-small-and-medium-enterprises-through-digital-innovation": {
    id: "news-005",
    title: "ForgeTech Nobles Strengthens Commitment to Small and Medium-Sized Businesses in Lesotho",
    slug: "forgetech-nobles-strengthens-commitment-to-support-small-and-medium-enterprises-through-digital-innovation",
    summary:
      "ForgeTech Nobles continues to invest in affordable digital transformation services designed specifically for SMEs across Lesotho.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&q=80&auto=format&fit=crop",
    date: "2026-08-05",
    readingTime: "4 min",
    content: `<p>ForgeTech Nobles remains committed to helping small and medium-sized enterprises embrace digital transformation through practical, affordable, and scalable technology solutions. By combining software engineering, IT infrastructure, networking, cloud technologies, business intelligence, and ongoing technical support, the company aims to help local businesses improve productivity, enhance customer experiences, and compete effectively in an increasingly digital economy.</p>`,
  },
  "forgetech-nobles-announces-mission-to-accelerate-digital-transformation-and-business-innovation-in-lesotho": {
    id: "news-006",
    title: "ForgeTech Nobles Announces Mission to Accelerate Digital Transformation Across Lesotho",
    slug: "forgetech-nobles-announces-mission-to-accelerate-digital-transformation-and-business-innovation-in-lesotho",
    summary:
      "ForgeTech Nobles reaffirms its mission of helping organizations modernize through innovative technology solutions.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80&auto=format&fit=crop",
    date: "2026-08-08",
    readingTime: "5 min",
    content: `<p>ForgeTech Nobles has reaffirmed its commitment to supporting digital transformation across Lesotho by delivering integrated technology services that empower organizations to grow sustainably. Through innovation, strategic partnerships, and customer-focused service delivery, the company continues to position itself as a trusted technology partner capable of helping businesses modernize their operations, strengthen cybersecurity, improve decision-making through data, and build resilient digital infrastructure.</p>`,
  },
};

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* Hero Image */}
      <section className="relative w-full h-[50vh] min-h-[350px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <Link
            href="/resources/news"
            className="inline-flex items-center gap-1 text-sm text-brand-gold hover:underline mb-4"
          >
            <ArrowLeft size={14} /> All News
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-neutral-slate mb-10 pb-6 border-b border-neutral-border">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} />
              {article.readingTime || "5 min read"}
            </span>
          </div>

          {/* Body (HTML) */}
          <div
            className="prose prose-lg prose-brand max-w-none
              prose-headings:text-brand-deep
              prose-p:text-neutral-slate
              prose-a:text-brand-tech
              prose-blockquote:border-l-brand-gold prose-blockquote:text-neutral-slate
              prose-figure:my-8
              prose-img:rounded-xl prose-img:shadow-lg
              prose-li:text-neutral-slate
            "
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>

      {/* Back to News */}
      <section className="py-12 bg-neutral-offwhite text-center">
        <Link
          href="/resources/news"
          className="inline-flex items-center gap-2 text-brand-tech font-medium hover:underline"
        >
          <ArrowLeft size={16} /> View All News
        </Link>
      </section>
    </>
  );
}

// Fetch article by slug (try API, then fallback)
async function fetchArticle(slug: string) {
  // Try backend first
  try {
    const article = await getNewsBySlug(slug);
    if (article && article.content) return article;
  } catch {
    // ignore
  }

  // Use static fallback
  return fallbackArticles[slug] || null;
}