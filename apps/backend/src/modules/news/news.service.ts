import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  // ── Get all published news (for listing & homepage carousel) ──
  async findPublished() {
    const items = await this.prisma.newsItem.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        image: true,
        createdAt: true,
        readingTime: true,
      },
      take: 20,
    });

    return items.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      image: item.image,
      date: this.formatDate(item.createdAt),
      readingTime: item.readingTime || this.estimateReadingTime(item.summary),
      published: true,
    }));
  }

  // ── Get a single news article by slug (for detail page) ──
  async findBySlug(slug: string) {
    const item = await this.prisma.newsItem.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        content: true,
        image: true,
        createdAt: true,
        readingTime: true,
        published: true,
      },
    });

    if (!item) return null;

    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      content: item.content,
      image: item.image,
      date: this.formatDate(item.createdAt),
      readingTime: item.readingTime || this.estimateReadingTime(item.summary),
      published: item.published,
    };
  }

  // ── Helpers ──
  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  private estimateReadingTime(text: string): string {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }
}