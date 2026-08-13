// apps/backend/src/modules/sub-services/sub-services.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubServiceDto, UpdateSubServiceDto } from './dto/sub-service.dto';

@Injectable()
export class SubServicesService {
  constructor(private prisma: PrismaService) {}

  // Admin dashboard overview
  async findAll() {
    return this.prisma.subService.findMany({
      orderBy: { order: 'asc' },
    });
  }

  // Get a single sub-service
  async findOne(id: string) {
    return this.prisma.subService.findUnique({
      where: { id },
    });
  }

  // Create a new sub-service
  async create(dto: CreateSubServiceDto) {
    return this.prisma.subService.create({
      data: {
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // Update an existing sub-service
  async update(id: string, dto: UpdateSubServiceDto) {
    return this.prisma.subService.update({
      where: { id },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }

  // Remove a sub-service
  async remove(id: string) {
    return this.prisma.subService.delete({
      where: { id },
    });
  }
}