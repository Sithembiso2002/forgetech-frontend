// apps/website/src/app/(public)/resources/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Newspaper } from "lucide-react";
import { getBlogPosts } from "@/lib/api";
import NewsletterForm from "@/features/blog/NewsletterForm";

const fallbackPosts = [
  {
    id: "1",
    title: "Why SMEs Need Cybersecurity Now",
    slug: "cybersecurity-guide-for-small-businesses",
    excerpt:
      "With 72% of Basotho lacking security awareness, it's time for small businesses to act. Learn the top 5 threats and how to protect your business.",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    date: "15 May 2026",
    readingTime: "5 min read",
    published: true,
  },
  {
    id: "2",
    title: "Cloud Migration: A Step‑by‑Step Guide for African Businesses",
    slug: "cloud-migration-step-by-step-guide",
    excerpt:
      "Moving to the cloud doesn't have to be painful. Follow our proven process to minimise downtime and maximise ROI.",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    date: "28 April 2026",
    readingTime: "7 min read",
    published: true,
  },
  {
    id: "3",
    title: "The State of Digital Transformation in Lesotho",
    slug: "digital-transformation-in-lesotho",
    excerpt:
      "An in‑depth look at the government's National Digital Transformation Strategy and what it means for local businesses.",
    coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    date: "10 April 2026",
    readingTime: "6 min read",
    published: true,
  },
  {
    id: "4",
    title: "How to Build a Scalable IT Infrastructure on a Budget",
    slug: "scalable-it-infrastructure-for-smes",
    excerpt:
      "Practical tips for SMEs to design a network that grows with them without breaking the bank.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    date: "22 March 2026",
    readingTime: "4 min read",
    published: true,
  },
  {
    id: "5",
    title: "5 Signs Your Business Needs Custom Software",
    slug: "signs-you-need-custom-software",
    excerpt:
      "Off‑the‑shelf tools holding you back? Here's when it's time to invest in a bespoke solution.",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    date: "05 March 2026",
    readingTime: "5 min read",
    published: true,
  },
  {
    id: "6",
    title: "Data Analytics for Small Businesses: Where to Start",
    slug: "data-analytics-for-small-businesses",
    excerpt:
      "You don't need a data science team to gain insights. Learn how to use simple tools to make smarter decisions.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    date: "18 February 2026",
    readingTime: "5 min read",
    published: true,
  },
];

export default async function BlogPage() {
  let posts;
  try {
    const data = await getBlogPosts();
    if (data && data.length > 0) {
      posts = data.filter((item: any) => item.published !== false);
    } else {
      posts = fallbackPosts;
    }
  } catch {
    posts = fallbackPosts;
  }

  return (
    <>
      {/* Hero – deep navy with subtle gradient */}
      <section className="relative bg-brand-navy text-white py-12 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs md:text-sm font-semibold bg-brand-tech/20 text-brand-tech border border-brand-tech/30 rounded-full">
            Insights & Expertise
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4">
            Our Blog
          </h1>
          <p className="text-base md:text-lg text-neutral-200 max-w-2xl mx-auto">
            Stay informed with the latest technology insights, how‑to guides,
            and industry news from the ForgeTech Nobles team.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-20 bg-neutral-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="max-w-md mx-auto text-center">
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-neutral-border/60">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Newspaper className="w-7 h-7 text-brand-gold" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-deep mb-2">
                  No Articles Yet
                </h3>
                <p className="text-neutral-slate text-sm md:text-base mb-6">
                  We haven’t published any articles yet. Check back soon or subscribe to our newsletter for updates.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
              {posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/resources/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-40 md:h-52 overflow-hidden">
                    <Image
                      src={post.coverImage || "https://placehold.co/600x400/1E3A6D/ffffff?text=Blog"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 md:gap-3 text-xs text-neutral-slate mb-2 md:mb-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      {post.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readingTime}
                        </span>
                      )}
                    </div>
                    <h2 className="text-base md:text-xl font-bold text-brand-deep mb-2 group-hover:text-brand-tech transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-neutral-slate text-xs md:text-sm leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 md:mt-4 text-[13px] md:text-sm font-medium text-brand-tech group-hover:gap-2 transition-all">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-12 md:mt-16 bg-brand-deep rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Never Miss an Update
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter and get the latest articles delivered
              straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}