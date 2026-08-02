// src/app/(public)/resources/news/page.tsx

import { getNews } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Newspaper } from "lucide-react";

// Fallback static data (unchanged)
const fallbackNews = [
  {
    id: "1",
    title: "ForgeTech Nobles Sponsors Lesotho Tech Expo 2026",
    slug: "sponsors-tech-expo-2026",
    summary:
      "We were proud to be a platinum sponsor at this year's largest technology exhibition, showcasing our latest digital transformation solutions to over 2,000 attendees.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    date: "15 June 2026",
    readingTime: "4 min read",
    published: true,
  },
  {
    id: "2",
    title: "Empowering Local SMEs with Free Cybersecurity Workshop",
    slug: "cybersecurity-workshop-smes",
    summary:
      "Our team conducted a hands-on cybersecurity awareness workshop for 50 small business owners in Maseru, addressing the 72% security awareness gap identified in recent studies.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    date: "28 May 2026",
    readingTime: "3 min read",
    published: true,
  },
  {
    id: "3",
    title: "ForgeTech Nobles Partners with Ministry of Education for Digital Schools Initiative",
    slug: "digital-schools-initiative",
    summary:
      "We have been selected to provide cloud infrastructure and custom school management software to 30 public schools across Lesotho, supporting the National Digital Transformation Strategy.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
    date: "10 April 2026",
    readingTime: "5 min read",
    published: true,
  },
 
  

];



export default async function NewsPage() {

let news;

  try {
    const data = await getNews();
    if (data && data.length > 0) {
      news = data.filter((item: any) => item.published !== false);
    } else {
      news = fallbackNews;
    }
  } catch {
    news = fallbackNews;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-deep text-white py-14 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            News & Insights
          </h1>
          <p className="text-base md:text-lg text-neutral-200 max-w-3xl mx-auto">
            Stay informed about our latest events, community impact, and
            industry thought leadership.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 md:py-20 bg-neutral-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          {news.length === 0 ? (
            <div className="max-w-md mx-auto text-center">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-neutral-border/60">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Newspaper className="w-7 h-7 text-brand-gold" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-deep mb-2">
                  No News Articles Yet
                </h3>
                <p className="text-neutral-slate text-sm md:text-base mb-6">
                  We haven’t published any articles yet. Check back soon or explore our blog for the latest insights.
                </p>
                <Link
                  href="/resources/blog"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-gold text-brand-navy px-6 py-2.5 text-sm font-bold hover:bg-amber-400 transition-colors shadow-md"
                >
                  Visit Our Blog <Newspaper size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {news.map((article: any) => (
                <Link
                  key={article.id}
                  href={`/resources/news/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col"
                >
                  <div className="relative w-full h-40 md:h-52 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 md:gap-3 text-xs text-neutral-slate mb-2 md:mb-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="md:size-14" />
                        {article.date}
                      </span>
                      {article.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {article.readingTime}
                        </span>
                      )}
                    </div>
                    <h2 className="text-base md:text-xl font-bold text-brand-deep mb-2 group-hover:text-brand-tech transition-colors leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-neutral-slate text-xs md:text-sm leading-relaxed line-clamp-3 flex-1">
                      {article.summary}
                    </p>
                    <span className="inline-block mt-3 md:mt-4 text-xs md:text-sm font-medium text-brand-tech group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}