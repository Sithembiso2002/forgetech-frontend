// apps/website/src/features/home/ServicesSection.tsx
import ServicesInteractive from "./ServicesInteractive";

// Preferred server-side env var, falls back to public one, then to local dev.
// In production, at least one of the env vars must be set — otherwise every
// fetch targets localhost, which doesn't exist on Vercel's build machine.
const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:10000";

// Fallback services — used only if the API returns nothing or fails.
// Includes ALL fields required by ServicesInteractive (image1, image2, features, cta).
const fallbackServices = [
  {
    id: "1",
    title: "Software Development",
    slug: "software",
    icon: "software",
    shortDescription: "Custom software built for your business",
    description:
      "We design and build bespoke web, mobile, and enterprise applications that fit your exact processes. Using agile methodologies, we deliver working software early, gather feedback, and refine until it's perfect.",
    features: [
      "Custom Software",
      "Business Systems",
      "Mobile Applications",
      "API Integration",
      "Cloud Ready",
      "Maintenance",
    ],
    image1:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    cta: "Learn More",
  },
  {
    id: "2",
    title: "Cloud Solutions",
    slug: "cloud",
    icon: "cloud",
    shortDescription: "Cloud migration and infrastructure",
    description:
      "Leverage the full power of AWS, Azure, or Google Cloud. We handle readiness assessments, seamless migration, cost optimization, and ongoing management.",
    features: [
      "Cloud Migration",
      "Hybrid Cloud",
      "DevOps",
      "Auto-scaling",
      "Disaster Recovery",
      "Cost Optimization",
    ],
    image1:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
    cta: "Learn More",
  },
  {
    id: "3",
    title: "IT Infrastructure",
    slug: "infrastructure",
    icon: "infrastructure",
    shortDescription: "Reliable networking and hardware",
    description:
      "We design, deploy, and manage the backbone of your digital operations – from structured cabling to advanced firewall configurations.",
    features: [
      "Network Setup",
      "Firewall & Security",
      "Wi-Fi Solutions",
      "VPN & Remote Access",
      "Hardware Provisioning",
      "Ongoing Support",
    ],
    image1:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
    cta: "Learn More",
  },
  {
    id: "4",
    title: "Cybersecurity",
    slug: "cybersecurity",
    icon: "cybersecurity",
    shortDescription: "Protect your data and systems",
    description:
      "Safeguard your business with threat monitoring, penetration testing, compliance audits, and employee training.",
    features: [
      "Risk Assessment",
      "Penetration Testing",
      "Compliance (ISO 27001)",
      "Security Audits",
      "Incident Response",
      "User Training",
    ],
    image1:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    cta: "Learn More",
  },
  {
    id: "5",
    title: "Data & Analytics",
    slug: "analytics",
    icon: "analytics",
    shortDescription: "Turn data into actionable insights",
    description:
      "Transform raw numbers into real‑time dashboards, automated reports, and predictive models that drive smarter decisions.",
    features: [
      "BI Dashboards",
      "Data Warehousing",
      "Predictive Analytics",
      "ETL Pipelines",
      "Real‑time Reporting",
      "AI & ML",
    ],
    image1:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop",
    cta: "Learn More",
  },
  {
    id: "6",
    title: "Digital Transformation",
    slug: "consulting",
    icon: "digital",
    shortDescription: "Modernise your operations",
    description:
      "We help you re‑think processes, adopt new technologies, and build a culture of innovation that creates lasting business value.",
    features: [
      "Process Automation",
      "Workflow Optimisation",
      "Legacy System Modernisation",
      "Change Management",
      "Technology Roadmap",
      "Innovation Workshops",
    ],
    image1:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    cta: "Learn More",
  },
];

// Default images used if neither the API nor the fallback supplies one.
const DEFAULT_IMAGE_1 =
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop";
const DEFAULT_IMAGE_2 =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop";

/**
 * Fetch homepage services from the backend with a timeout, JSON error handling,
 * and a defensive fallback so the build never fails on a slow backend.
 *
 * Note: with `output: 'export'`, this runs once at build time. Changing content
 * in the admin dashboard requires a rebuild to reflect on the live site.
 */
async function getHomepageServices(): Promise<any[]> {
  const url = `${API_URL}/api/homepage-services`;
  try {
    const res = await fetch(url, {
      // 60s timeout — Render free tier cold starts take 20-40s
      signal: AbortSignal.timeout(60000),
      // Cached for 60s during dev; ignored in static export (build-time only).
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error(`[getHomepageServices] HTTP ${res.status} from ${url}`);
      return [];
    }
    // Guard against HTML error pages being fed to .json()
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error(
        `[getHomepageServices] Unexpected content-type "${contentType}" from ${url}`,
      );
      return [];
    }
    return (await res.json()) as any[];
  } catch (error) {
    console.error(`[getHomepageServices] fetch failed for ${url}`, error);
    return [];
  }
}

export default async function ServicesSection() {
  let services: any[] = [];

  try {
    const apiServices = await getHomepageServices();
    if (!apiServices || apiServices.length === 0) {
      services = fallbackServices;
    } else {
      // HomepageService rows don't have a `slug` field, so we merge by
      // position/order — the fallback's fields simply fill any gaps.
      services = apiServices.map((apiService: any, index: number) => {
        const fb = fallbackServices[index] ?? fallbackServices[0];
        return {
          id: apiService.id ?? fb.id,
          title: apiService.title ?? fb.title,
          slug: apiService.slug ?? fb.slug,
          icon: apiService.icon ?? fb.icon,
          shortDescription:
            apiService.shortDescription ?? fb.shortDescription ?? "",
          description: apiService.description ?? fb.description ?? "",
          features:
            apiService.features && apiService.features.length > 0
              ? apiService.features
              : fb.features ?? [],
          image1: apiService.image1 || fb.image1 || DEFAULT_IMAGE_1,
          image2: apiService.image2 || fb.image2 || DEFAULT_IMAGE_2,
          cta: apiService.cta || fb.cta || "Learn More",
        };
      });
    }
  } catch (error) {
    console.error("[ServicesSection] falling back to static data", error);
    services = fallbackServices;
  }

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <ServicesInteractive services={services} />
      </div>
    </section>
  );
}