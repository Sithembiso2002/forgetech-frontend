import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Newspaper, Lightbulb } from "lucide-react";


export const metadata: Metadata = {
  title: "Resources | ForgeTech Nobles",
  description:
    "Explore our blog, news & insights, and technology guides — practical resources to help your business grow with technology.",
};

const resourceCards = [
  {
    title: "Blog",
    description:
      "In‑depth articles on cybersecurity, cloud migration, digital transformation, and more — written for Lesotho’s businesses.",
    icon: <BookOpen className="h-7 w-7" />,
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    href: "/resources/blog",
    cta: "Read the Blog",
  },
  {
    title: "News & Insights",
    description:
      "Stay updated with our latest events, community involvement, and industry perspectives.",
    icon: <Newspaper className="h-7 w-7" />,
    image: "https://images.unsplash.com/photo-1504711434969-e33886168d6b?w=600&h=400&fit=crop",
    href: "/resources/news",
    cta: "View News",
  },
  {
    title: "Technology Guides",
    description:
      "Practical, step‑by‑step guides tailored for SMEs, professional firms, and educational institutions.",
    icon: <Lightbulb className="h-7 w-7" />,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    href: "/resources/guides",
    cta: "Explore Guides",
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold bg-brand-tech/20 text-brand-tech border border-brand-tech/30 rounded-full">
            Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Resources
          </h1>
          <p className="text-lg text-neutral-200 max-w-2xl mx-auto">
            Explore our blog, news & insights, and technology guides — practical
            resources to help your business grow with technology.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-24 bg-neutral-offwhite">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-10">
            {resourceCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-md shadow-slate-200/50 transition-all duration-500 hover:shadow-xl hover:shadow-brand-deep/10 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                        {card.icon}
                      </div>
                      <span className="text-sm font-semibold">{card.title}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col">
                  <p className="text-neutral-slate leading-relaxed mb-6 flex-1">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold text-brand-navy font-semibold px-6 py-3 text-sm shadow-md hover:bg-brand-orange transition-colors">
                    {card.cta}
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}