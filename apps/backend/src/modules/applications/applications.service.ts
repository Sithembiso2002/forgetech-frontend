/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
 
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateApplicationDto } from './dto/application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateApplicationDto, resumeUrl: string) {
    return this.prisma.application.create({
      data: {
        ...dto,
        resumeUrl,
      },
    });
  }

  findAll() {
    return this.prisma.application.findMany({ include: { vacancy: true }, orderBy: { createdAt: 'desc' } });
  }
}
