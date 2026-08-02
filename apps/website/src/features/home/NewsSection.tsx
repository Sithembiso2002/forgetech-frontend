// apps/website/src/features/home/NewsSection.tsx
import { getHomepageNews } from "@/lib/api";
import NewsCarousel from "./NewsCarousel";

// Fallback news items – only used when API is completely unreachable
const fallbackNews = [
  {
    id: "1",
    title: "ForgeTech Nobles Sponsors Lesotho Tech Expo 2026",
    slug: "sponsors-tech-expo-2026",
    summary: "We were proud to be a platinum sponsor at this year's largest technology exhibition…",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop",
    date: "15 June 2026",
    published: true,
  },
  {
    id: "2",
    title: "Empowering Local SMEs with Free Cybersecurity Workshop",
    slug: "cybersecurity-workshop-smes",
    summary: "Our team conducted a hands-on cybersecurity awareness workshop…",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
    date: "28 May 2026",
    published: true,
  },
  {
    id: "3",
    title: "ForgeTech Nobles Partners with Ministry of Education",
    slug: "digital-schools-initiative",
    summary: "We have been selected to provide cloud infrastructure…",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop",
    date: "10 April 2026",
    published: true,
  },
  {
    id: "4",
    title: "ForgeTech Nobles Wins 'Best Tech Employer' Award",
    slug: "best-tech-employer-award",
    summary: "We are thrilled to be recognised…",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop",
    date: "02 March 2026",
    published: true,
  },
];

export default async function NewsSection() {
  let news: any[] = [];

  try {
    console.log("[NewsSection] Fetching homepage news…");
    const data = await getHomepageNews();
    console.log("[NewsSection] Received data:", JSON.stringify(data).slice(0, 200));
    if (Array.isArray(data) && data.length > 0) {
      news = data.filter((item: any) => item.published !== false);
      console.log(`[NewsSection] Using ${news.length} live articles.`);
    } else {
      console.warn("[NewsSection] API returned empty, using fallback.");
      news = fallbackNews;
    }
  } catch (err) {
    console.error("[NewsSection] Error fetching homepage news:", err);
    news = fallbackNews;
  }

  if (!Array.isArray(news) || news.length === 0) {
    news = fallbackNews;
  }

  return <NewsCarousel news={news} />;
}