// apps/backend/src/search/search.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchResultDto } from './dto/search-result.dto';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string): Promise<SearchResultDto[]> {
    const q = query.trim();
    if (!q) return [];

    // Run all searches in parallel
    const [services, blogs, news, projects] = await Promise.all([
      this.prisma.service.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
        },
        select: { id: true, title: true, description: true, slug: true },
        take: 5,
      }),
      this.prisma.blogPost.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { excerpt: { contains: q, mode: 'insensitive' } },       // ✅ changed from summary
          ],
        },
        select: { id: true, title: true, excerpt: true, slug: true }, // ✅ changed
        take: 5,
      }),
      this.prisma.newsItem.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { summary: { contains: q, mode: 'insensitive' } },        // ✅ remains summary
          ],
        },
        select: { id: true, title: true, summary: true, slug: true },
        take: 5,
      }),
      this.prisma.project.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { overview: { contains: q, mode: 'insensitive' } },       // ✅ changed from description
          ],
        },
        select: { id: true, title: true, overview: true, slug: true },// ✅ changed
        take: 5,
      }),
    ]);

    // Build unified results array
    const results: SearchResultDto[] = [
      ...services.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        href: `/services/${s.slug}`,
        type: 'service',
      })),
      ...blogs.map((b) => ({
        id: b.id,
        title: b.title,
        description: b.excerpt,        // ✅ map excerpt → description
        href: `/resources/blog/${b.slug}`,
        type: 'blog',
      })),
      ...news.map((n) => ({
        id: n.id,
        title: n.title,
        description: n.summary,
        href: `/resources/news/${n.slug}`,
        type: 'news',
      })),
      ...projects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.overview,       // ✅ map overview → description
        href: `/case-studies/${p.slug}`,
        type: 'project',
      })),
    ];

    // Limit total results to 10
    return results.slice(0, 10);
  }
}