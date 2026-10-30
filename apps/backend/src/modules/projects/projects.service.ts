// apps/backend/src/modules/projects/projects.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findFeatured() {
    return this.prisma.project.findMany({ where: { featured: true } });
  }

  findBySlug(slug: string) {
    return this.prisma.project.findUnique({
      where: { slug },
      include: {
        service: { select: { title: true, testimonial: true } },
      },
    });
  }

  async create(dto: CreateProjectDto) {
    // Strip any slug the admin form may have sent; always generate it here.
    const { slug: _ignored, ...rest } = dto;
    const slug = await this.generateUniqueSlug(rest.title);

    // ⬇️ Typed as the *unchecked* input — accepts `serviceId` as a scalar FK.
    const data: Prisma.ProjectUncheckedCreateInput = {
      ...rest,
      slug,
    };

    const project = await this.prisma.project.create({ data });

    await this.notifyWebsite(project.slug);
    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    const existing = await this.prisma.project.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Project ${id} not found`);

    const { slug: _ignored, ...rest } = dto;

    // ⬇️ Same unchecked variant for update.
    const data: Prisma.ProjectUncheckedUpdateInput = { ...rest };

    if (rest.title && rest.title !== existing.title) {
      data.slug = await this.generateUniqueSlug(rest.title, id);
    }

    const project = await this.prisma.project.update({ where: { id }, data });

    await this.notifyWebsite(project.slug, existing.slug);
    return project;
  }

  async remove(id: string) {
    const existing = await this.prisma.project.findUnique({ where: { id } });
    const deleted = await this.prisma.project.delete({ where: { id } });
    if (existing) await this.notifyWebsite(existing.slug);
    return deleted;
  }

  // ---------- helpers ----------

  private async generateUniqueSlug(
    title: string,
    excludeId?: string,
  ): Promise<string> {
    const base =
      title
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80) || 'project';

    let slug = base;
    let n = 1;

    while (true) {
      const clash = await this.prisma.project.findFirst({
        where: {
          slug,
          ...(excludeId ? { NOT: { id: excludeId } } : {}),
        },
        select: { id: true },
      });
      if (!clash) return slug;
      slug = `${base}-${n++}`;
    }
  }

  private async notifyWebsite(newSlug: string, oldSlug?: string) {
    const url = process.env.WEBSITE_URL;
    const secret = process.env.REVALIDATE_SECRET;
    if (!url || !secret) {
      this.logger.warn(
        'WEBSITE_URL or REVALIDATE_SECRET not set; skipping revalidation',
      );
      return;
    }

    const jobs: Array<{ tag?: string; path?: string }> = [
      { tag: 'projects' },
      { path: '/projects' },
      { path: `/projects/${newSlug}` },
    ];
    if (oldSlug && oldSlug !== newSlug) {
      jobs.push({ path: `/projects/${oldSlug}` });
    }

    await Promise.all(
      jobs.map((body) =>
        fetch(`${url}/api/revalidate`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-revalidate-secret': secret,
          },
          body: JSON.stringify(body),
        }).catch((err) =>
          this.logger.error(
            `Revalidate failed for ${JSON.stringify(body)}`,
            err,
          ),
        ),
      ),
    );
  }
}