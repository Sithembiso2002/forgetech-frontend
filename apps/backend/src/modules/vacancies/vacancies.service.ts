/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVacancyDto, UpdateVacancyDto } from './dto/vacancy.dto';

@Injectable()
export class VacanciesService {
  constructor(private prisma: PrismaService) {}

  findAll(onlyActive = true) {
    return this.prisma.vacancy.findMany({
      where: onlyActive ? { active: true } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.vacancy.findUnique({ where: { slug } });
  }

  create(dto: CreateVacancyDto) {
    return this.prisma.vacancy.create({ data: dto });
  }

  update(id: string, dto: UpdateVacancyDto) {
    return this.prisma.vacancy.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.vacancy.delete({ where: { id } });
  }
}
