// apps/website/src/app/(public)/resources/news/[slug]/page.tsx
import { getNewsBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

// Known slugs for static generation – add more as you publish news articles
const newsSlugs = [
  "sponsors-tech-expo-2026",
  "cybersecurity-workshop-smes",
  "digital-schools-initiative",
];

export async function generateStaticParams() {
  return newsSlugs.map((slug) => ({ slug }));
}

// Rich fallback with full article content and images
const fallbackArticles: Record<string, any> = {
  "sponsors-tech-expo-2026": {
    id: "1",
    title: "ForgeTech Nobles Sponsors Lesotho Tech Expo 2026",
    slug: "sponsors-tech-expo-2026",
    summary:
      "We were proud to be a platinum sponsor at this year's largest technology exhibition, showcasing our latest digital transformation solutions to over 2,000 attendees.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    date: "15 June 2026",
    readingTime: "4 min read",
    content: `
      <p>The 2026 Lesotho Tech Expo was a landmark event for the country's growing technology sector. Held at the Maseru Convention Centre from 12–14 June, the expo attracted over 2,000 attendees, 50 exhibitors, and speakers from across Africa.</p>
      
      <p>As a platinum sponsor, ForgeTech Nobles played a central role in shaping the conversation around digital transformation in Lesotho. Our booth, located in the main hall, featured live demonstrations of our latest solutions:</p>
      
      <ul>
        <li><strong>Smart SME Dashboard</strong> – a real-time business intelligence platform for small businesses</li>
        <li><strong>Secure Cloud Migration Toolkit</strong> – showing how we migrate legacy systems to the cloud with zero downtime</li>
        <li><strong>AI Chatbot for Customer Support</strong> – an interactive demo that answered attendees' questions about our services</li>
      </ul>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1540317580384-e5d438967f90?w=800&h=400&fit=crop" alt="ForgeTech booth at Tech Expo" />
        <figcaption>Our team engaging with visitors at the ForgeTech booth</figcaption>
      </figure>
      
      <p>Our CEO, Ms. Mpho Tau, delivered a keynote address titled <em>"Bridging the Digital Divide: A Lesotho Perspective"</em>, where she highlighted the 72% security awareness gap and announced our new free cybersecurity workshop initiative for SMEs.</p>
      
      <blockquote>
        "Technology is not just for the big players. It's for every entrepreneur, every school, every hospital. Our mission is to make world-class digital solutions accessible to all Basotho." – Ms. Mpho Tau, CEO
      </blockquote>
      
      <p>The expo also provided a platform for networking with government officials, potential clients, and fellow tech innovators. We are already in discussions with several organisations for pilot projects in education and healthcare.</p>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=400&fit=crop" alt="Keynote speech" />
        <figcaption>CEO delivering the keynote on digital inclusion</figcaption>
      </figure>
      
      <p>We extend our gratitude to the event organisers and everyone who visited our booth. Stay tuned for more updates on the partnerships and projects that emerged from this event.</p>
    `,
  },
  "cybersecurity-workshop-smes": {
    id: "2",
    title: "Empowering Local SMEs with Free Cybersecurity Workshop",
    slug: "cybersecurity-workshop-smes",
    summary:
      "Our team conducted a hands-on cybersecurity awareness workshop for 50 small business owners in Maseru, addressing the 72% security awareness gap identified in recent studies.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    date: "28 May 2026",
    readingTime: "3 min read",
    content: `
      <p>On 25 May 2026, ForgeTech Nobles hosted a free cybersecurity awareness workshop at the Maseru Business Hub. The event attracted 50 small business owners from various sectors including retail, hospitality, and professional services.</p>
      
      <p>The workshop was designed to address the findings of the Mayet & Associates 2025 report, which revealed that <strong>72% of citizens lacked basic security awareness</strong>, leaving them vulnerable to scams and cyber attacks.</p>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop" alt="Workshop participants" />
        <figcaption>Small business owners learning about password hygiene</figcaption>
      </figure>
      
      <p>Topics covered included:</p>
      <ul>
        <li>Recognising phishing emails and smishing (SMS phishing)</li>
        <li>Creating strong passwords and using password managers</li>
        <li>Securing business Wi-Fi networks</li>
        <li>Backing up data and creating disaster recovery plans</li>
        <li>Introduction to multi-factor authentication (MFA)</li>
      </ul>
      
      <p>Each participant received a free security assessment checklist and a one-month trial of our basic IT support package. The feedback was overwhelmingly positive, with 92% of attendees rating the workshop "very useful" or "extremely useful".</p>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop" alt="Security checklist" />
        <figcaption>Participants received practical take-home materials</figcaption>
      </figure>
      
      <p>We plan to run these workshops quarterly as part of our corporate social responsibility programme. If you'd like to attend the next one, please <a href="/contact">contact us</a> to register your interest.</p>
    `,
  },
  "digital-schools-initiative": {
    id: "3",
    title: "ForgeTech Nobles Partners with Ministry of Education for Digital Schools Initiative",
    slug: "digital-schools-initiative",
    summary:
      "We have been selected to provide cloud infrastructure and custom school management software to 30 public schools across Lesotho, supporting the National Digital Transformation Strategy.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop",
    date: "10 April 2026",
    readingTime: "5 min read",
    content: `
      <p>In a landmark partnership announced on 8 April 2026, ForgeTech Nobles has been selected by the Ministry of Education and Training to implement a comprehensive digital infrastructure programme in 30 public schools across Lesotho.</p>
      
      <p>The initiative is part of the government's National Digital Transformation Strategy, launched in June 2025, which aims to modernise the education sector through technology.</p>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop" alt="School classroom" />
        <figcaption>Our team visiting a pilot school in Maseru</figcaption>
      </figure>
      
      <h3>What the Programme Includes</h3>
      <ul>
        <li><strong>Cloud Infrastructure:</strong> Each school will receive a secure cloud environment for student records, timetabling, and communication.</li>
        <li><strong>Custom School Management Software:</strong> A bespoke platform that handles admissions, attendance, grade reporting, and parent communication.</li>
        <li><strong>Teacher Training:</strong> We will train 200 teachers in basic digital literacy and the use of the new systems.</li>
        <li><strong>Ongoing Support:</strong> Our IT support team will provide helpdesk services and quarterly maintenance visits.</li>
      </ul>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop" alt="Digital classroom" />
        <figcaption>Teachers exploring the new digital tools</figcaption>
      </figure>
      
      <p>The rollout will happen in three phases, with the first 10 schools going live by September 2026. The remaining 20 will follow by March 2027.</p>
      
      <blockquote>
        "Education is the cornerstone of national development. By bringing modern technology to our schools, we are investing in the future of Lesotho." – Honourable Minister of Education
      </blockquote>
      
      <p>We are honoured to be part of this transformative journey and look forward to sharing progress updates as the project unfolds.</p>
    `,
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