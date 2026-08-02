// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    next: { revalidate: 60 }, // ISR for public pages
    ...options,
  });
  if (!res.ok) {
    console.error(`API error: ${res.status}`);
    throw new Error(`API request failed: ${res.status} ${res.statusText}`
);
  }
  return res.json();
}

// Services
export async function getServices(): Promise<any[]> {
  try {
    return await fetchAPI<any[]>('/api/services');
  } catch {
    return []; // fallback if backend not running
  }
}

// Projects
export async function getProjects(): Promise<any[]> {
  try {
    return await fetchAPI<any[]>('/api/projects');
  } catch {
    return [];
  }
}

export async function getFeaturedProjects(): Promise<any[]> {
  try {
    return await fetchAPI<any[]>('/api/projects?featured=true');
  } catch {
    return [];
  }
}

export async function getNews(): Promise<any[]> {
  try {
    return await fetchAPI<any[]>('/api/news');
  } catch {
    return [];
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    return await fetchAPI<any>(`/api/news/${slug}`);
  } catch {
    return null;
  }
}

export async function getTestimonials(): Promise<any[]> {
  try {
    return await fetchAPI<any[]>('/api/testimonials');
  } catch {
    return [];
  }
}
// Blog, News, Vacancies, etc. can be added later

export async function getBlogPosts(): Promise<any[]> {
  try {
    return await fetchAPI<any[]>('/api/blog');
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await fetchAPI<any>(`/api/blog/${slug}`);
  } catch {
    return null;
  }
}

export async function getVacancies(): Promise<any[]> {
  try {
    return await fetchAPI<any[]>('/api/vacancies');
  } catch {
    return [];
  }
}

export async function getVacancyBySlug(slug: string) {
  try {
    return await fetchAPI<any>(`/api/vacancies/${slug}`);
  } catch {
    return null;
  }
}

export async function getServiceBySlug(slug: string): Promise<any> {
  try {
    return await fetchAPI<any>(`/api/services/${slug}`);
  } catch {
    return null;
  }
}

export async function getTeamMessage() {
  return fetchAPI("/api/teammessage");   // ✅ add /api/
}

export async function getHomepageNews() {
  return fetchAPI("/api/homepage-news"); // ✅ add /api/
}


