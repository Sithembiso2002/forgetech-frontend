// hooks/useDashboardStats.ts
import { useState, useEffect } from 'react';
import { authFetch } from '@/lib/api';

export type Stats = {
  services: number;
  projects: number;
  blogPosts: number;
  newsItems: number;
  teamMembers: number;
  testimonials: number;
  mediaFiles: number;
  vacancies: number;
  applications: number;
  contactSubmissions: number;
  newsletterSubscriptions: number;
  subServices: number;
  homepageServices: number;
  homepageNewsItems: number;
  teamMessages: number;
};

export type RawData = {
  services: any[];
  projects: any[];
  blog: any[];
  news: any[];
  team: any[];
  testimonials: any[];
  media: any[];
  vacancies: any[];
  applications: any[];
  contactSubmissions: any[];
  newsletterSubscriptions: any[];
  subServices: any[];
  homepageServices: any[];
  homepageNews: any[];
  teamMessages: any[];
};

export function useDashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [rawData, setRawData] = useState<RawData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendDown, setBackendDown] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    setBackendDown(false);

    const safeFetch = async (url: string) => {
      try {
        const data = await authFetch(url);
        return Array.isArray(data) ? data : [];
      } catch {
        return [];
      }
    };

    try {
      const [
        services, projects, blog, news, team, testimonials, media,
        vacancies, applications, contactSubmissions, newsletterSubscriptions,
        subServices, homepageServices, homepageNews, teamMessages,
      ] = await Promise.all([
        safeFetch("/api/services"),
        safeFetch("/api/projects"),
        safeFetch("/api/blog"),
        safeFetch("/api/news"),
        safeFetch("/api/team"),
        safeFetch("/api/testimonials"),
        safeFetch("/api/media"),
        safeFetch("/api/vacancies"),
        safeFetch("/api/applications"),
        safeFetch("/api/contact-submissions"),
        safeFetch("/api/newsletter-subscriptions"),
        safeFetch("/api/sub-services"),
        safeFetch("/api/homepage-services"),
        safeFetch("/api/homepage-news"),
        safeFetch("/api/team-messages"),
      ]);

      setRawData({
        services, projects, blog, news, team, testimonials, media,
        vacancies, applications, contactSubmissions, newsletterSubscriptions,
        subServices, homepageServices, homepageNews, teamMessages,
      });

      setStats({
        services: services.length,
        projects: projects.length,
        blogPosts: blog.length,
        newsItems: news.length,
        teamMembers: team.length,
        testimonials: testimonials.length,
        mediaFiles: media.length,
        vacancies: vacancies.length,
        applications: applications.length,
        contactSubmissions: contactSubmissions.length,
        newsletterSubscriptions: newsletterSubscriptions.length,
        subServices: subServices.length,
        homepageServices: homepageServices.length,
        homepageNewsItems: homepageNews.length,
        teamMessages: teamMessages.length,
      });
      setBackendDown(false);
    } catch (err: any) {
      let message = err?.message || "Unknown error";
      if (message.includes("Unauthorized") || message.includes("401")) {
        setError("Your session has expired. Please log out and log back in.");
      } else if (
        message.includes("Failed to fetch") ||
        message.includes("NetworkError")
      ) {
        setBackendDown(true);
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return { stats, rawData, loading, error, backendDown, retry: loadStats };
}