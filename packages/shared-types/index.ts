export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  technologies: string[];
  industries: string[];
  process: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client?: string;
  industry: string;
  overview: string;
  objectives: string[];
  features: string[];
  technologies: string[];
  results: string;
  featured: boolean;
  mainImage?: string;
  screenshots: string[];
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;  // HTML
  coverImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image?: string;
  published: boolean;
  createdAt: string;
}

export interface Vacancy {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time';
  description: string;
  requirements: string[];
  active: boolean;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  order: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  content: string;
  avatarUrl?: string;
  featured: boolean;
}

export interface Media {
  id: string;
  fileName: string;
  url: string;
  altText?: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

// Add more as needed