import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const services = await this.prisma.service.findMany({
      orderBy: { order: 'asc' },
      include: {
        SubService: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            name: true,
            description: true,
            benefit: true,
            image: true,
          },
        },
      },
    });

    return services.map((service) => ({
      id: service.id,
      title: service.title,
      slug: service.slug,
      icon: service.icon,
      shortDescription: service.shortDescription,
      description: service.description,
      benefits: service.benefits,
      technologies: service.technologies,
      industries: service.industries,
      process: service.process,
      image: service.heroImage || service.secondaryImage || null,
      subServices: service.SubService,
      testimonial: service.testimonial,
      order: service.order,
    }));
  }

  async findBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({
      where: { slug },
      include: {
        SubService: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            name: true,
            description: true,
            benefit: true,
            image: true,
          },
        },
        Project: {                   // ✅ include linked projects
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            slug: true,
            industry: true,
            overview: true,
            mainImage: true,
            technologies: true,
            results: true,
          },
        },
      },
    });

    if (!service) return null;

    return {
      id: service.id,
      title: service.title,
      slug: service.slug,
      icon: service.icon,
      shortDescription: service.shortDescription,
      description: service.description,
      benefits: service.benefits,
      technologies: service.technologies,
      industries: service.industries,
      process: service.process,
      heroImage: service.heroImage,
      secondaryImage: service.secondaryImage,
      image: service.heroImage || service.secondaryImage || null,
      subServices: service.SubService,
      caseStudies: service.Project.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        industry: p.industry,
        shortDescription: p.overview,
        mainImage: p.mainImage,
        technologies: p.technologies,
        results: p.results,
      })),
      testimonial: service.testimonial,
      order: service.order,
    };
  }
}