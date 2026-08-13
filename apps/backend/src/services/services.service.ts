// apps/backend/src/services/services.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

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
        Project: {
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

  // ── NEW CRUD methods ─────────────────────────────
  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        icon: dto.icon,
        shortDescription: dto.shortDescription,
        description: dto.description,
        benefits: dto.benefits ?? [],
        technologies: dto.technologies ?? [],
        industries: dto.industries ?? [],
        process: dto.process ?? [],
        order: dto.order ?? 0,
        heroImage: dto.heroImage ?? null,
        secondaryImage: dto.secondaryImage ?? null,
        testimonial: dto.testimonial ?? undefined,
      },
    });
  }

  async update(id: string, dto: UpdateServiceDto) {
    // Ensure the service exists
    await this.prisma.service.findUniqueOrThrow({ where: { id } });

    return this.prisma.service.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.slug !== undefined && { slug: dto.slug }),
        ...(dto.icon !== undefined && { icon: dto.icon }),
        ...(dto.shortDescription !== undefined && { shortDescription: dto.shortDescription }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.benefits !== undefined && { benefits: dto.benefits }),
        ...(dto.technologies !== undefined && { technologies: dto.technologies }),
        ...(dto.industries !== undefined && { industries: dto.industries }),
        ...(dto.process !== undefined && { process: dto.process }),
        ...(dto.order !== undefined && { order: dto.order }),
        ...(dto.heroImage !== undefined && { heroImage: dto.heroImage }),
        ...(dto.secondaryImage !== undefined && { secondaryImage: dto.secondaryImage }),
        ...(dto.testimonial !== undefined && { testimonial: dto.testimonial }),
      },
    });
  }

  async remove(id: string) {
    await this.prisma.service.findUniqueOrThrow({ where: { id } });
    return this.prisma.service.delete({ where: { id } });
  }
}