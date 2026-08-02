import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HomepageNewsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const items = await this.prisma.homepageNewsItem.findMany({
      orderBy: { order: 'asc' },
      include: {
        newsItem: {
          select: {
            id: true,
            title: true,
            slug: true,
            summary: true,
            image: true,
            createdAt: true,
            readingTime: true,
            published: true,
          },
        },
      },
    });

    return items
      .filter((item) => item.newsItem.published)
      .map((item) => ({
        id: item.newsItem.id,
        title: item.newsItem.title,
        slug: item.newsItem.slug,
        summary: item.customSummary || item.newsItem.summary,
        image: item.customImage || item.newsItem.image,
        date: this.formatDate(item.newsItem.createdAt),
        readingTime: item.newsItem.readingTime,
        published: true,
      }));
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}