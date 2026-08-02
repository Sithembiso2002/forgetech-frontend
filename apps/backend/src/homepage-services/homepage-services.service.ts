// apps/backend/src/homepage-services/homepage-services.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomepageServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.homepageService.findMany({
      orderBy: { order: 'asc' },
      include: { Service: true },   // ← capital S
    });

    return data.map((item) => ({
      id: item.id,
      serviceId: item.serviceId,
      slug: item.Service.slug,                     // item.Service.slug
      title: item.title || item.Service.title,
      shortDescription: item.shortDescription || item.Service.shortDescription,
      description: item.description || item.Service.description,
      features: item.features,
      image1: item.image1,
      image2: item.image2,
      cta: item.cta || 'Learn More',
      order: item.order,
    }));
  }
}