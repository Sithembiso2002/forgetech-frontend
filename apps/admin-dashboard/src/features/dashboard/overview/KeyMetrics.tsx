// features/dashboard/overview/KeyMetrics.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BarChart3, Briefcase, FileText, Newspaper, Users, Star, Image,
  BriefcaseBusiness, Mail, Layers, Layout, MessageSquare, MessagesSquare,
  ArrowUpRight,
} from 'lucide-react';
import type { Stats } from '@/hooks/useDashboardStats';

interface KeyMetricsProps {
  stats: Stats;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function KeyMetrics({ stats }: KeyMetricsProps) {
  const cards = [
    { label: "Services", value: stats.services, icon: <BarChart3 size={24} />, href: "/dashboard/services", color: "bg-blue-100 text-blue-600" },
    { label: "Projects", value: stats.projects, icon: <Briefcase size={24} />, href: "/dashboard/projects", color: "bg-green-100 text-green-600" },
    { label: "Blog Posts", value: stats.blogPosts, icon: <FileText size={24} />, href: "/dashboard/blog", color: "bg-purple-100 text-purple-600" },
    { label: "News Items", value: stats.newsItems, icon: <Newspaper size={24} />, href: "/dashboard/news", color: "bg-orange-100 text-orange-600" },
    { label: "Team Members", value: stats.teamMembers, icon: <Users size={24} />, href: "/dashboard/team", color: "bg-pink-100 text-pink-600" },
    { label: "Testimonials", value: stats.testimonials, icon: <Star size={24} />, href: "/dashboard/testimonials", color: "bg-yellow-100 text-yellow-600" },
    { label: "Media Files", value: stats.mediaFiles, icon: <Image size={24} />, href: "/dashboard/media", color: "bg-indigo-100 text-indigo-600" },
    { label: "Vacancies", value: stats.vacancies, icon: <BriefcaseBusiness size={24} />, href: "/dashboard/vacancies", color: "bg-cyan-100 text-cyan-600" },
    { label: "Applications", value: stats.applications, icon: <FileText size={24} />, href: "/dashboard/applications", color: "bg-teal-100 text-teal-600" },
    { label: "Contact Messages", value: stats.contactSubmissions, icon: <MessageSquare size={24} />, href: "/dashboard/contacts", color: "bg-rose-100 text-rose-600" },
    { label: "Newsletter Subs", value: stats.newsletterSubscriptions, icon: <Mail size={24} />, href: "/dashboard/newsletter", color: "bg-amber-100 text-amber-600" },
    { label: "Sub-Services", value: stats.subServices, icon: <Layers size={24} />, href: "/dashboard/sub-services", color: "bg-violet-100 text-violet-600" },
    { label: "Homepage Services", value: stats.homepageServices, icon: <Layout size={24} />, href: "/dashboard/homepage-services", color: "bg-lime-100 text-lime-600" },
    { label: "Homepage News", value: stats.homepageNewsItems, icon: <Newspaper size={24} />, href: "/dashboard/homepage-news", color: "bg-fuchsia-100 text-fuchsia-600" },
    { label: "Team Messages", value: stats.teamMessages, icon: <MessagesSquare size={24} />, href: "/dashboard/team-messages", color: "bg-sky-100 text-sky-600" },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card) => (
        <motion.div key={card.label} variants={item}>
          <Link
            href={card.href}
            className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <div className={`inline-flex p-2 rounded-xl ${card.color}`}>
              {card.icon}
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-brand-deep">{card.value}</span>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
            </div>
            <ArrowUpRight
              size={16}
              className="absolute top-4 right-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}