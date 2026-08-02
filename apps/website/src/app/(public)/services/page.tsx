// apps/website/src/app/(public)/services/page.tsx
import ServicesPageClient from "./ServicesPageClient";
import { getServices, getTeamMessage } from "@/lib/api"; 
// Rich fallback data – unchanged
const fallbackServices = [
  {
    id: "1",
    title: "Modern IT Infrastructure",
    slug: "infrastructure",
    icon: "infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
    shortDescription:
      "Secure, scalable, high‑performance IT environments that businesses depend on every day.",
    description:
      "Your IT infrastructure is the foundation of everything you do. We design, deploy, and maintain robust networks, cloud platforms, and cybersecurity measures that keep your operations running smoothly. From small office setups to multi‑site enterprises, our solutions are tailored to your exact needs, budget, and growth plans.",
    keyBenefits: [
      "99.9% uptime guarantee with proactive monitoring",
      "Scalable architecture – add new sites or users without disruption",
      "Enhanced security against ransomware, phishing, and data breaches",
      "Reduced IT overhead through centralised management",
      "Future‑proof designs that support emerging technologies",
    ],
    subServices: [
      {
        name: "Network Design & Setup",
        description:
          "We plan and install complete business networks – wired, wireless, and VPN – ensuring reliable connectivity across all locations. Our designs follow industry best practices (Cisco, Ubiquiti, etc.) and include redundancy for critical links.",
        benefit:
          "Eliminate downtime, improve collaboration, and support bandwidth‑intensive applications.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
      },
      {
        name: "Cloud Migration",
        description:
          "Move your servers, applications, and data to secure cloud platforms (AWS, Azure, or private cloud). We handle the entire process – assessment, migration, and post‑migration optimisation – with zero data loss.",
        benefit:
          "Reduce hardware costs, gain flexibility, and access your systems from anywhere.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      },
      {
        name: "Router & Firewall Configuration",
        description:
          "Intelligent traffic control and advanced threat protection. We configure enterprise‑grade firewalls (pfSense, Fortinet, Sophos) to block attacks, filter content, and prioritise business‑critical traffic.",
        benefit:
          "Protect sensitive data, prevent unauthorised access, and ensure compliance.",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop",
      },
      {
        name: "IT Asset Management",
        description:
          "Track every piece of hardware, software licence, and cloud subscription in one place. Our asset management system helps you avoid over‑spending, plan refreshes, and maintain compliance.",
        benefit:
          "Cut waste, reduce audit risks, and make informed procurement decisions.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      },
    ],
    features: [],
  },
  {
    id: "2",
    title: "Custom Software Development",
    slug: "software",
    icon: "software",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
    shortDescription:
      "Bespoke applications that solve your exact business challenges – not a generic off‑the‑shelf tool.",
    description:
      "Every business is unique, and so are its processes. Our software engineers work closely with you to understand your workflows, pain points, and objectives, then build a solution that fits like a glove. Using agile methodologies, we deliver working software early, gather feedback, and refine until it’s perfect.",
    keyBenefits: [
      "100% tailored to your operational needs",
      "Seamless integration with existing systems (ERP, CRM, legacy databases)",
      "Ownership of the source code – no vendor lock‑in",
      "Faster time‑to‑market compared to traditional development",
      "Continuous improvement and long‑term support",
    ],
    subServices: [
      {
        name: "Web Application Development",
        description:
          "Powerful, responsive web apps that your team can access from any browser. We use modern frameworks (Next.js, React, NestJS) to build dashboards, portals, and internal tools.",
        benefit:
          "Streamline operations, improve customer experience, and enable remote work.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      },
      {
        name: "Mobile App Development",
        description:
          "Native iOS and Android applications that engage your customers on their favourite devices. From e‑commerce to field service management, we design and build apps that users love.",
        benefit:
          "Increase customer reach, boost loyalty, and open new revenue channels.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      },
      {
        name: "Enterprise Software Solutions",
        description:
          "Complex, scalable systems for resource planning, customer relationship management, inventory, and more. We build software that grows with your business.",
        benefit:
          "Automate core processes, improve data accuracy, and empower your teams.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop",
      },
      {
        name: "API Integration & Automation",
        description:
          "Connect your disparate tools and automate repetitive tasks. We design and implement RESTful APIs, webhooks, and robotic process automation (RPA) bots.",
        benefit:
          "Eliminate manual data entry, reduce errors, and speed up workflows.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      },
    ],
    features: [],
  },
  {
    id: "3",
    title: "Data Analytics & BI",
    slug: "analytics",
    icon: "analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    shortDescription:
      "Transform raw numbers into clear, interactive dashboards that drive smarter decisions.",
    description:
      "Data is one of your most valuable assets – if you can make sense of it. Our business intelligence (BI) solutions consolidate data from multiple sources, clean it, and present it in beautiful, real‑time dashboards. Whether you need to track sales, monitor production, or forecast demand, we give you the insights to act confidently.",
    keyBenefits: [
      "Real‑time visibility of KPIs across your organisation",
      "Identify trends and opportunities before your competitors",
      "Reduce manual reporting effort by up to 80%",
      "Customisable dashboards for every role (CEO, finance, operations)",
      "Advanced predictive analytics powered by machine learning",
    ],
    subServices: [
      {
        name: "Business Intelligence Dashboards",
        description:
          "We build interactive dashboards using tools like Power BI, Tableau, and open‑source alternatives. Connect to any database (SQL, Supabase, Excel) and start visualising data immediately.",
        benefit:
          "Empower your team with self‑service analytics and reduce reliance on IT.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      },
      {
        name: "Basic Data Analytics",
        description:
          "Identify patterns, correlations, and outliers in your historical data. We use statistical methods and exploratory analysis to uncover hidden opportunities.",
        benefit:
          "Make informed marketing, inventory, and pricing decisions backed by evidence.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop",
      },
      {
        name: "Custom Reporting",
        description:
          "Automated, pixel‑perfect reports delivered to your inbox on schedule. We handle complex calculations and formatting, saving your team hours of manual work.",
        benefit:
          "Free up staff to focus on analysis instead of data wrangling.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      },
      {
        name: "Predictive Analytics",
        description:
          "Use machine learning models to forecast demand, customer churn, or equipment failure. We build, train, and deploy models tailored to your data.",
        benefit:
          "Stay ahead of demand, reduce waste, and proactively address risks.",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop",
      },
    ],
    features: [],
  },
  {
    id: "4",
    title: "Cloud Solutions",
    slug: "cloud",
    icon: "cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    shortDescription:
      "Design, migrate, and manage workloads on leading cloud platforms.",
    description:
      "We help you leverage the full power of the cloud. From readiness assessments to seamless migration and ongoing cost optimization, our certified engineers ensure your cloud journey is smooth, secure, and aligned with your business goals.",
    keyBenefits: [
      "Lower infrastructure costs with pay‑as‑you‑go models",
      "Increased agility – scale resources up or down in minutes",
      "Enhanced disaster recovery and business continuity",
      "Global accessibility for remote teams",
      "Automatic security updates and compliance management",
    ],
    subServices: [
      {
        name: "Cloud Readiness Assessment",
        description:
          "Evaluate your current infrastructure, applications, and workloads to create a tailored migration plan that minimises risk and maximises ROI.",
        benefit: "Avoid costly mistakes by knowing exactly what to move and when.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
      },
      {
        name: "Migration Services",
        description:
          "Seamlessly move applications, databases, and storage to AWS, Azure, or Google Cloud with zero data loss and minimal downtime.",
        benefit: "Start your cloud journey with confidence – we handle the heavy lifting.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      },
      {
        name: "Cloud Management & Optimisation",
        description:
          "Continuous monitoring, cost management, and performance tuning of your cloud environment. We ensure you only pay for what you need.",
        benefit: "Cut cloud waste by 30‑40% while maintaining peak performance.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      },
      {
        name: "Disaster Recovery & Backup",
        description:
          "Implement automated backup policies and geo‑redundant disaster recovery plans that guarantee business continuity.",
        benefit: "Sleep better knowing your data is safe and your business can recover in minutes.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
      },
    ],
    features: [],
  },
  {
    id: "5",
    title: "IT Support Services",
    slug: "support",
    icon: "support",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
    shortDescription:
      "Act as your outsourced IT department – from helpdesk to proactive monitoring.",
    description:
      "We provide comprehensive IT support tailored to your business needs. From daily troubleshooting to long‑term IT planning, our team acts as your dedicated IT department, ensuring smooth operations, reduced downtime, and predictable IT performance.",
    keyBenefits: [
      "24/7 help desk support with fast response times",
      "Proactive monitoring – we catch issues before they affect you",
      "Predictable monthly costs – no surprise repair bills",
      "Access to a team of experts without hiring full‑time staff",
      "Strategic IT planning to align technology with your business goals",
    ],
    subServices: [
      {
        name: "Help Desk Support",
        description:
          "Fast, reliable assistance for all technical issues – from password resets to printer troubleshooting. Our team responds within 24 hours.",
        benefit: "Your staff stays productive, and IT problems don’t slow down your business.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
      },
      {
        name: "Proactive Monitoring",
        description:
          "We monitor your servers, networks, and endpoints 24/7. Alerts are escalated instantly, often fixing issues before you notice them.",
        benefit: "Minimise downtime and avoid emergency repair costs.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      },
      {
        name: "Backup & Disaster Recovery",
        description:
          "Automated daily backups with off‑site replication. In the event of a failure, we restore your systems quickly.",
        benefit: "Protect your data against ransomware, hardware failure, and human error.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
      },
      {
        name: "IT Asset Management",
        description:
          "Track hardware, software licences, and warranties in a single dashboard. Never miss a renewal or compliance audit again.",
        benefit: "Reduce costs by avoiding over‑purchasing and ensuring compliance.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      },
    ],
    features: [],
  },
  {
    id: "6",
    title: "Digital Transformation Consulting",
    slug: "consulting",
    icon: "consulting",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop",
    shortDescription:
      "Strategic guidance to modernise your operations and culture.",
    description:
      "Our consulting practice helps you navigate the complexities of digital transformation. We assess your current state, define a clear digital strategy, and guide you through the implementation of new technologies and processes that create lasting business value.",
    keyBenefits: [
      "A clear, actionable digital roadmap aligned to your business goals",
      "Identification of quick wins that deliver immediate ROI",
      "Change management support to ensure user adoption",
      "Reduced risk through phased, iterative implementation",
      "Ongoing measurement and optimisation to sustain results",
    ],
    subServices: [
      {
        name: "Digital Strategy Development",
        description:
          "We facilitate workshops with your leadership to define a 3‑5 year digital roadmap aligned to your mission and funding cycles.",
        benefit: "A clear, actionable plan that rallies your team and satisfies donors.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      },
      {
        name: "Process Automation",
        description:
          "Identify repetitive manual tasks and implement RPA (Robotic Process Automation) and workflow tools that save hundreds of hours.",
        benefit: "Free your staff for high‑value work and reduce human error.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      },
      {
        name: "Technology Roadmap Planning",
        description:
          "Prioritise technology investments based on impact, cost, and feasibility. We help you budget and plan for the next 1‑3 years.",
        benefit: "Avoid ad‑hoc spending and make every Maloti count.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
      },
      {
        name: "Change Management",
        description:
          "Adoption is everything. We design communication plans, training sessions, and support structures so your team embraces new tools.",
        benefit: "Maximise the return on your technology investment by ensuring it’s actually used.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
      },

      
    ],
    features: [],
  },
];



export default async function ServicesPage() {
  let services;

   let teamMember = null;   // ← declared outside try block

  try {
    services = await getServices();
    if (!services || services.length < 3) {
      services = fallbackServices;
    } else {
      services = services.map((apiService: any) => ({
        id: apiService.id,
        title: apiService.title,
        slug: apiService.slug,
        icon: apiService.icon,
        image: apiService.image || apiService.heroImage || apiService.secondaryImage || null,
        shortDescription: apiService.shortDescription || "",
        description: apiService.description || "",
        keyBenefits: apiService.benefits || [],
        subServices: apiService.subServices || [],
        features: apiService.features || [],
        technologies: apiService.technologies || [],
        industries: apiService.industries || [],
        process: apiService.process || [],
        testimonial: apiService.testimonial || null,
        order: apiService.order || 0,
      }));
    }
  } catch {
    services = fallbackServices;
  }

  // Fetch the first team member for the leadership message
  try {
  const message = await getTeamMessage();
  teamMember = message;   // already an object, not an array
} catch {
    // silent – fallback will be used
  }

  return <ServicesPageClient services={services} leadership={teamMember} />;
}