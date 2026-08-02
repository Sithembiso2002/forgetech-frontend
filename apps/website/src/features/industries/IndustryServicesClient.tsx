// apps/website/src/features/industries/IndustryServicesClient.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaCloud,
  FaChartBar,
  FaNetworkWired,
  FaHeadphones,
  FaCogs,
} from "react-icons/fa";
import { CheckCircle, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";

// ---------- Icon map ----------
const iconMap: Record<string, React.ReactNode> = {
  software: <FaCode />,
  cloud: <FaCloud />,
  analytics: <FaChartBar />,
  infrastructure: <FaNetworkWired />,
  support: <FaHeadphones />,
  consulting: <FaCogs />,
};

// ---------- Extended service data type ----------
type IndustryServiceData = {
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  technologies: string[];
  cta: string;
  // New – detailed sales content
  longDescription?: string;      // multiple paragraphs
  howItWorks?: string[];        // numbered steps
  results?: string;             // expected outcome
  caseStudy?: {
    quote: string;
    client: string;
    company: string;
    avatar: string;
  };
};

// ---------- Service slugs order ----------
const serviceSlugs = [
  "software",
  "support",
  "cloud",
  "infrastructure",
  "analytics",
  "consulting",
];

// ---------- Industry‑specific service data ----------
// (Retail example fully filled; others can be extended later)
const industryServiceData: Record<string, Record<string, IndustryServiceData>> = {
  retail: {
    software: {
      title: "Custom Software Development",
      slug: "software",
      icon: "software",
      shortDescription: "Tailored e‑commerce platforms, POS integration, and inventory systems.",
      description:
        "We design and develop bespoke software that unifies your online store, physical point‑of‑sale, and back‑end inventory management into one seamless ecosystem. Using agile methodologies, we deliver working features every two weeks, allowing you to start seeing ROI quickly.",
      benefits: [
        "Omnichannel commerce – sell online, in‑store, and on mobile with a single system",
        "Real‑time inventory synchronisation across all channels",
        "Personalised customer experiences powered by data",
        "Scalable architecture that handles peak traffic without downtime",
      ],
      technologies: ["Next.js", "Supabase", "Stripe", "Tailwind CSS", "Node.js"],
      cta: "Start Your Digital Store",
      longDescription:
        "Our custom software solutions go beyond off‑the‑shelf platforms. We start by understanding your unique product catalogue, supplier relationships, and customer journey. Then we architect a solution that automates repetitive tasks, integrates with your accounting and shipping partners, and gives you a 360‑degree view of your business. Whether you need a simple online storefront or a complex marketplace with multiple vendors, we have the expertise to deliver.",
      howItWorks: [
        "Discovery & requirements gathering – we map your current operations and define success metrics.",
        "UX/UI design & prototyping – we create clickable wireframes to validate the user experience.",
        "Agile development sprints – we build, test, and demo every two weeks.",
        "Integration & data migration – we connect to your existing systems with zero data loss.",
        "Launch & post‑launch support – we ensure a smooth go‑live and provide ongoing maintenance.",
      ],
      results:
        "Clients typically see a 25‑40% increase in online revenue within the first six months and a 30% reduction in manual inventory work.",
      caseStudy: {
        quote:
          "ForgeTech Nobles built our entire e‑commerce platform from scratch. Our online sales tripled in the first quarter, and the inventory automation saved us 20 hours a week.",
        client: "Thabo Ndlovu",
        company: "Ndlovu Retail",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    },
    support: {
      title: "IT Support",
      slug: "support",
      icon: "support",
      shortDescription: "24/7 help desk, proactive monitoring, and backup for your retail operations.",
      description:
        "Downtime means lost sales. Our managed IT support ensures your networks, POS terminals, and cloud services are always operational. We monitor your systems 24/7, resolve issues remotely, and provide on‑site support when needed—all at a predictable monthly cost.",
      benefits: [
        "24/7 help desk with fast response times (under 1 hour critical)",
        "Proactive monitoring that prevents 80% of issues before they affect sales",
        "Automated backup & disaster recovery for transaction data",
        "IT asset management – track hardware and licences across all store locations",
      ],
      technologies: ["RMM Tools", "Microsoft 365", "Acronis Backup", "Zendesk"],
      cta: "Secure Your Store's IT",
      longDescription:
        "Your IT infrastructure is the backbone of your retail business. From the point of sale to the customer Wi‑Fi, every component must work flawlessly. We take full responsibility for your technology stack, providing a single point of accountability. Our team becomes your virtual IT department, handling everything from password resets to complex network outages. With proactive monitoring, we often fix problems before your staff even notices. And with our flat monthly fee, you can budget with confidence.",
      howItWorks: [
        "Onboarding & system audit – we inventory all your hardware, software, and network devices.",
        "Proactive monitoring setup – we install agents that watch your systems 24/7.",
        "Help desk activation – your staff can contact us via phone, email, or chat.",
        "Monthly reporting – we provide a detailed health report and recommendations.",
        "Quarterly strategy review – we align your IT with your business goals.",
      ],
      results:
        "Our clients experience 99.9% uptime on critical systems and a 50% reduction in IT‑related service disruptions.",
      caseStudy: {
        quote:
          "Since switching to ForgeTech Nobles for IT support, our POS systems have had zero unplanned downtime. Their proactive monitoring saved us during a ransomware attempt last year.",
        client: "Mpho Tau",
        company: "Tau Logistics",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
    },
    cloud: {
      title: "Cloud Solutions",
      slug: "cloud",
      icon: "cloud",
      shortDescription: "Migrate, host, and manage your retail systems securely in the cloud.",
      description:
        "Move your retail platform to the cloud and gain flexibility, scalability, and cost savings. We handle migration, security, and ongoing optimisation so your team can focus on selling, not servers.",
      benefits: [
        "Scale resources up during sales peaks and down during quiet periods",
        "Eliminate on‑premise hardware costs and maintenance",
        "Built‑in disaster recovery with geo‑redundant backups",
        "Secure access for remote managers and multi‑location teams",
      ],
      technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes"],
      cta: "Migrate to the Cloud",
      longDescription:
        "The cloud is the great equaliser – it gives even small retailers access to enterprise‑grade infrastructure at a fraction of the cost. Our cloud architects design a tailored migration plan that minimises downtime and ensures data integrity. After migration, we continuously monitor and optimise your environment, ensuring you only pay for what you actually use. We also implement robust security controls that protect customer payment data and comply with PCI‑DSS standards.",
      howItWorks: [
        "Cloud readiness assessment – we evaluate your current systems and workloads.",
        "Migration planning & execution – we move your applications with zero data loss.",
        "Architecture optimisation – right‑sizing resources for cost and performance.",
        "Security & compliance configuration – firewalls, encryption, access controls.",
        "Ongoing managed services – 24/7 monitoring, backup, and cost review.",
      ],
      results:
        "Clients typically reduce infrastructure costs by 30‑50% and gain the ability to launch new features in days instead of weeks.",
      caseStudy: {
        quote:
          "Migrating to the cloud with ForgeTech was seamless. We cut our IT costs by 35% and now we can launch promotions in hours, not days.",
        client: "Lerato Mokoena",
        company: "Mokoena & Associates",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
    },
    infrastructure: {
      title: "Infrastructure & Networking",
      slug: "infrastructure",
      icon: "infrastructure",
      shortDescription: "Reliable Wi‑Fi, secure networks, and firewalls for your stores.",
      description:
        "A fast, secure network is the foundation of modern retail. We design and manage wired and wireless networks that keep your POS systems, inventory scanners, and customer Wi‑Fi running without interruption.",
      benefits: [
        "Enterprise‑grade firewalls to protect customer data",
        "Seamless Wi‑Fi roaming across large store floors",
        "VPN for secure remote access by managers",
        "Network monitoring with automatic alerts",
      ],
      technologies: ["Cisco", "Ubiquiti", "pfSense", "Sophos"],
      cta: "Strengthen Your Network",
      longDescription:
        "We understand the unique networking challenges of retail – from high‑density environments during sales to the need for PCI‑DSS compliance. Our engineers design networks that prioritise critical traffic, segment guest Wi‑Fi from business systems, and include redundancy so a single cable cut doesn’t bring down your entire store. Every installation comes with detailed documentation and remote management capabilities.",
      howItWorks: [
        "Site survey & requirements analysis",
        "Network design & proposal",
        "Hardware procurement & installation",
        "Configuration & security hardening",
        "Ongoing monitoring & support",
      ],
      results:
        "Our retail clients report zero network‑related downtime since implementation and a 40% improvement in Wi‑Fi coverage.",
      caseStudy: {
        quote:
          "Our old network would crash every Saturday during peak hours. ForgeTech Nobles redesigned everything and now it handles triple the traffic without a hiccup.",
        client: "Palesa Letsie",
        company: "Letsie Healthcare",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
    },
    analytics: {
      title: "Data & Analytics",
      slug: "analytics",
      icon: "analytics",
      shortDescription: "Turn sales data into actionable insights with dashboards and reports.",
      description:
        "Understand your customers, track inventory performance, and forecast demand with powerful analytics dashboards. We build custom BI solutions that pull data from your POS, e‑commerce platform, and marketing tools to give you a complete picture of your business.",
      benefits: [
        "Real‑time sales dashboards for store managers",
        "Customer segmentation and buying patterns",
        "Inventory turnover analysis",
        "Predictive demand forecasting to optimise stock levels",
      ],
      technologies: ["Power BI", "Tableau", "Python", "Supabase"],
      cta: "Analyse Your Sales",
      longDescription:
        "Retail generates vast amounts of data—every transaction, every website visit, every stock movement holds valuable insights. We help you harness that data with custom dashboards that are easy to use and tailored to your key performance indicators. From daily sales reports emailed to your inbox, to advanced machine learning models that predict which products will sell out next week, we turn your data into a strategic asset.",
      howItWorks: [
        "Data source identification & integration",
        "Data cleaning & modelling",
        "Dashboard design & development",
        "User training & adoption",
        "Ongoing support & refinement",
      ],
      results:
        "Retailers using our analytics solutions see a 20% reduction in stock‑outs and a 15% increase in average transaction value.",
      caseStudy: {
        quote:
          "The dashboards ForgeTech built gave us instant clarity on which products were underperforming. We adjusted our purchasing and increased margins by 12% in three months.",
        client: "Khosi Molefe",
        company: "Molefe Manufacturing",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
    },
    consulting: {
      title: "Digital Transformation Consulting",
      slug: "consulting",
      icon: "consulting",
      shortDescription: "Strategic guidance to modernise your retail operations and culture.",
      description:
        "Digital transformation is more than technology—it’s about people, processes, and strategy. Our consultants work with your leadership to define a clear roadmap, implement change, and measure results.",
      benefits: [
        "Digital maturity assessment",
        "Roadmap aligned to business goals",
        "Change management & staff training",
        "Ongoing measurement & optimisation",
      ],
      technologies: ["Business Process Modelling", "Agile Methodologies"],
      cta: "Start Your Transformation",
      longDescription:
        "The retail landscape is changing fast. Customers expect seamless omnichannel experiences, personalised offers, and instant service. Our consulting practice helps you navigate this complexity. We assess your current capabilities, identify quick wins, and build a phased transformation plan that respects your budget and timelines. With our guidance, you’ll not only adopt new technology—you’ll build a culture of innovation that keeps you ahead of the competition.",
      howItWorks: [
        "Initial discovery & digital maturity assessment",
        "Strategy development & prioritisation",
        "Pilot implementation & proof of concept",
        "Organisation‑wide rollout with training",
        "Continuous improvement & value tracking",
      ],
      results:
        "Clients who follow our consulting roadmap achieve an average 25% increase in operational efficiency within the first year.",
      caseStudy: {
        quote:
          "ForgeTech’s strategic guidance was instrumental in helping us reimagine our customer experience. We launched a new omnichannel strategy that boosted customer loyalty by 40%.",
        client: "Mpho Tau",
        company: "Tau Logistics",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
    },
  },
  // Add other industries similarly when ready (they fall back to default)
};

// ---------- Default service data if no industry match ----------
const defaultServiceData: Record<string, IndustryServiceData> = {
  software: {
    title: "Custom Software Development",
    slug: "software",
    icon: "software",
    shortDescription: "Custom software engineered to automate operations.",
    description: "We build tailored software solutions that address your unique business challenges, using modern technologies and agile processes.",
    benefits: ["Tailored to your workflows", "Seamless integration", "Faster time‑to‑market", "Ownership of source code"],
    technologies: ["Next.js", "NestJS", "React", "TypeScript", "PostgreSQL"],
    cta: "Explore Software Development",
    longDescription: "We deliver bespoke software solutions that fit your exact needs. From initial concept to final deployment, our team works closely with you to ensure every feature adds value.",
    howItWorks: ["Discovery", "Design", "Development", "Testing", "Launch"],
    results: "Clients typically see a 30% increase in process efficiency.",
  },
  support: {
    title: "IT Support",
    slug: "support",
    icon: "support",
    shortDescription: "Managed IT services from helpdesk to proactive monitoring.",
    description: "Our managed IT services cover daily troubleshooting, 24/7 monitoring, backup & disaster recovery, and long‑term IT planning.",
    benefits: ["24/7 help desk", "Proactive monitoring", "Predictable costs", "Strategic IT planning"],
    technologies: ["RMM Tools", "Microsoft 365", "Backup Solutions"],
    cta: "Get IT Support",
    longDescription: "We act as your dedicated IT department, keeping your systems running smoothly so you can focus on your core business.",
    howItWorks: ["Onboarding", "Monitoring", "Support", "Reporting", "Optimisation"],
    results: "Our clients experience 99.9% uptime on critical systems.",
  },
  cloud: {
    title: "Cloud Solutions",
    slug: "cloud",
    icon: "cloud",
    shortDescription: "Cloud migration, hosting, and management.",
    description: "Leverage AWS, Azure, or Google Cloud with our migration, optimization, and management services.",
    benefits: ["Reduced infrastructure costs", "Scalable resources", "Disaster recovery", "Global accessibility"],
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
    cta: "Move to the Cloud",
    longDescription: "We help you migrate to the cloud securely and cost‑effectively, then manage your environment to ensure peak performance.",
    howItWorks: ["Assessment", "Migration", "Optimisation", "Security", "Management"],
    results: "Infrastructure costs reduced by up to 50%.",
  },
  infrastructure: {
    title: "Infrastructure & Networking",
    slug: "infrastructure",
    icon: "infrastructure",
    shortDescription: "Reliable networks, firewalls, and secure IT environments.",
    description: "We design, deploy, and manage the backbone of your digital operations – from structured cabling to advanced firewall configurations.",
    benefits: ["99.9% uptime", "Scalable architecture", "Enterprise security", "Future‑proof designs"],
    technologies: ["Cisco", "Ubiquiti", "pfSense", "Sophos"],
    cta: "Strengthen Your Network",
    longDescription: "Your network is the foundation of your IT. We ensure it is fast, secure, and reliable.",
    howItWorks: ["Site survey", "Design", "Implementation", "Testing", "Support"],
    results: "Zero network‑related downtime after implementation.",
  },
  analytics: {
    title: "Data & Analytics",
    slug: "analytics",
    icon: "analytics",
    shortDescription: "Business intelligence dashboards and predictive analytics.",
    description: "Turn raw data into real‑time insights with custom dashboards, automated reporting, and machine learning.",
    benefits: ["Real‑time KPI visibility", "Trend identification", "Reduce manual reporting by 80%", "Predictive analytics"],
    technologies: ["Power BI", "Tableau", "Python", "Supabase"],
    cta: "Unlock Insights",
    longDescription: "We transform your data into a strategic asset, enabling smarter, faster decisions.",
    howItWorks: ["Data integration", "Modelling", "Dashboard design", "Training", "Support"],
    results: "Clients reduce reporting time by 70%.",
  },
  consulting: {
    title: "Digital Transformation Consulting",
    slug: "consulting",
    icon: "consulting",
    shortDescription: "Strategic guidance to modernise your operations.",
    description: "Our consulting practice assesses your current state, defines a digital strategy, and guides implementation.",
    benefits: ["Actionable roadmap", "Change management", "Risk reduction", "Continuous optimisation"],
    technologies: ["Business Process Modelling", "Agile Methodologies"],
    cta: "Start Transforming",
    longDescription: "We help you navigate the complexities of digital change, ensuring your investments deliver real business value.",
    howItWorks: ["Discovery", "Strategy", "Pilot", "Rollout", "Optimisation"],
    results: "Operational efficiency increases by 25% on average.",
  },
};

export default function IndustryServicesClient({
  industrySlug,
}: {
  industrySlug: string;
}) {
  const [activeService, setActiveService] = useState(serviceSlugs[0]);

  const dataSource = industryServiceData[industrySlug] || defaultServiceData;
  const services = serviceSlugs.map((slug) => ({
    
    ...(dataSource[slug] || defaultServiceData[slug]),
  }));

  const active = services.find((s) => s.slug === activeService)!;

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
      {/* ─────────── LEFT COLUMN – Service list ─────────── */}
      <div className="lg:w-[40%] flex flex-col gap-4">
        {services.map((service, index) => {
          const isActive = service.slug === activeService;
          return (
            <motion.button
              key={service.slug}
              onClick={() => setActiveService(service.slug)}
              onMouseEnter={() => setActiveService(service.slug)}
              whileHover="hover"
              className={`group relative flex items-start gap-4 text-left p-5 rounded-2xl transition-all duration-300 border ${
                isActive
                  ? "border-brand-tech/40 bg-brand-tech/5 shadow-md"
                  : "border-neutral-border/60 bg-white hover:border-brand-tech/20 hover:shadow-sm"
              }`}
            >
              <div className="flex-shrink-0 w-8 text-right">
                <span
                  className={`text-xl font-extrabold transition-colors duration-300 ${
                    isActive ? "text-brand-gold" : "text-neutral-border group-hover:text-brand-gold"
                  }`}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1">
                <h3
                  className={`text-lg font-bold transition-colors duration-300 ${
                    isActive ? "text-brand-deep" : "text-brand-deep group-hover:text-brand-tech"
                  }`}
                >
                  {service.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-slate line-clamp-2">
                  {service.shortDescription}
                </p>
              </div>
              <motion.div
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-neutral-border text-neutral-slate transition-colors duration-300 group-hover:border-brand-tech group-hover:text-brand-tech"
                animate={{ rotate: isActive ? 0 : 0 }}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* ─────────── RIGHT COLUMN – Comprehensive service detail ─────────── */}
      <div className="lg:w-[60%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:sticky lg:top-28 rounded-3xl border border-neutral-border/60 bg-white p-8 md:p-10 shadow-xl shadow-slate-200/30"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-5 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-deep/10 to-brand-tech/10 text-brand-tech">
                <span className="text-3xl">{iconMap[active.icon] || <FaCode />}</span>
              </div>
              <h3 className="text-3xl font-extrabold text-brand-deep">{active.title}</h3>
            </div>

            {/* Main description (two paragraphs) */}
            <p className="text-lg text-neutral-slate leading-relaxed mb-6">
              {active.description}
            </p>
            {active.longDescription && (
              <p className="text-base text-neutral-slate leading-relaxed mb-8 whitespace-pre-line">
                {active.longDescription}
              </p>
            )}

            {/* Benefits */}
            {active.benefits.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-gold mb-4">Key Benefits</h4>
                <ul className="space-y-3">
                  {active.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-slate">
                      <CheckCircle size={18} className="text-brand-tech mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How It Works */}
            {active.howItWorks && active.howItWorks.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-gold mb-4">How We Deliver</h4>
                <ol className="space-y-3 list-decimal list-inside">
                  {active.howItWorks.map((step, i) => (
                    <li key={i} className="text-neutral-slate pl-2">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Results */}
            {active.results && (
              <div className="mb-8 p-4 bg-brand-deep/5 rounded-xl border border-brand-deep/10">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-gold mb-2">Expected Results</h4>
                <p className="text-neutral-slate text-sm">{active.results}</p>
              </div>
            )}

            {/* Technologies */}
            {active.technologies.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-gold mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {active.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-brand-deep/5 px-3 py-1 text-xs font-medium text-brand-deep">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Case Study snippet */}
            {active.caseStudy && (
              <div className="mb-8 bg-neutral-offwhite rounded-xl p-5 flex gap-4 items-start">
                <Quote className="text-brand-gold shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm italic text-neutral-slate mb-3">“{active.caseStudy.quote}”</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={active.caseStudy.avatar}
                      alt={active.caseStudy.client}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-xs font-semibold text-brand-deep">{active.caseStudy.client}</p>
                      <p className="text-xs text-neutral-400">{active.caseStudy.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <a
              href={`/services/${active.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-bold text-brand-navy shadow-lg transition-all duration-300 hover:bg-brand-orange hover:shadow-xl hover:scale-105"
            >
              {active.cta}
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}