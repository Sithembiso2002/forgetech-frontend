// apps/admin-dashboard/src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Briefcase,
  FileText,
  Newspaper,
  Users,
  Star,
  Image,
  Plus,
  ArrowUpRight,
  ServerOff,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { authFetch } from "@/lib/api";

type Stats = {
  services: number;
  projects: number;
  blogPosts: number;
  newsItems: number;
  teamMembers: number;
  testimonials: number;
  mediaFiles: number;
};

export default function DashboardHome() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendDown, setBackendDown] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    setBackendDown(false);

    try {
      const [services, projects, blog, news, team, testimonials, media] =
        await Promise.all([
          authFetch("/api/services"),
          authFetch("/api/projects"),
          authFetch("/api/blog/admin"),
          authFetch("/api/news/admin"),
          authFetch("/api/team"),
          authFetch("/api/testimonials"),
          authFetch("/api/media"),
        ]);

      setStats({
        services: Array.isArray(services) ? services.length : 0,
        projects: Array.isArray(projects) ? projects.length : 0,
        blogPosts: Array.isArray(blog) ? blog.length : 0,
        newsItems: Array.isArray(news) ? news.length : 0,
        teamMembers: Array.isArray(team) ? team.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        mediaFiles: Array.isArray(media) ? media.length : 0,
      });
      setBackendDown(false);
    } catch (err: any) {
      // Try to extract the real error from the response body
      let message = err?.message || "Unknown error";
      if (message.includes("Unauthorized") || message.includes("401")) {
        setError("Your session has expired. Please log out and log back in.");
      } else if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
        setBackendDown(true);
      } else {
        // Show the exact backend error message (e.g., "No admin profile for user …")
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-neutral-200 rounded" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-28 bg-neutral-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (backendDown) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ServerOff size={64} className="text-neutral-300 mb-6" />
        <h2 className="text-2xl font-bold text-brand-deep mb-2">
          Backend is not running
        </h2>
        <p className="text-neutral-slate max-w-md mb-4">
          The dashboard requires the NestJS backend on{" "}
          <code className="bg-neutral-100 px-1 rounded">http://localhost:4000</code>.
        </p>
        <button
          onClick={loadStats}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-navy rounded-full font-medium hover:bg-brand-orange transition shadow-sm"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ServerOff size={64} className="text-neutral-300 mb-6" />
        <h2 className="text-2xl font-bold text-brand-deep mb-2">
          Could not load dashboard
        </h2>
        <p className="text-neutral-slate max-w-md mb-4 text-sm whitespace-pre-wrap">
          {error}
        </p>
        <button
          onClick={loadStats}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-navy rounded-full font-medium hover:bg-brand-orange transition shadow-sm"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  const statCards = [
    {
      label: "Services",
      value: stats?.services || 0,
      icon: <BarChart3 size={24} />,
      href: "/dashboard/services",
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Projects",
      value: stats?.projects || 0,
      icon: <Briefcase size={24} />,
      href: "/dashboard/projects",
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Blog Posts",
      value: stats?.blogPosts || 0,
      icon: <FileText size={24} />,
      href: "/dashboard/blog",
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "News Items",
      value: stats?.newsItems || 0,
      icon: <Newspaper size={24} />,
      href: "/dashboard/news",
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Team Members",
      value: stats?.teamMembers || 0,
      icon: <Users size={24} />,
      href: "/dashboard/team",
      color: "bg-pink-100 text-pink-600",
    },
    {
      label: "Testimonials",
      value: stats?.testimonials || 0,
      icon: <Star size={24} />,
      href: "/dashboard/testimonials",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Media Files",
      value: stats?.mediaFiles || 0,
      icon: <Image size={24} />,
      href: "/dashboard/media",
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-deep">
          Welcome back, Admin
        </h1>
        <p className="text-neutral-slate mt-1">
          Here’s what’s happening with your website today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative bg-white rounded-xl p-5 shadow-sm border border-neutral-border/60 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <div className={`inline-flex p-2 rounded-lg ${card.color}`}>
              {card.icon}
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-brand-deep">
                {card.value}
              </span>
              <p className="text-sm text-neutral-slate mt-1">{card.label}</p>
            </div>
            <ArrowUpRight
              size={16}
              className="absolute top-4 right-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-bold text-brand-deep mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add Service", href: "/dashboard/services" },
            { label: "Add Project", href: "/dashboard/projects" },
            { label: "Write Blog Post", href: "/dashboard/blog" },
            { label: "Add News Item", href: "/dashboard/news" },
            { label: "Upload Media", href: "/dashboard/media" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-deep text-white rounded-full text-sm font-medium hover:bg-brand-tech transition-colors shadow-sm"
            >
              <Plus size={16} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}