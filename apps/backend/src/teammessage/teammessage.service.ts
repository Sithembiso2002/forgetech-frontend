import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeammessageService {
  constructor(private prisma: PrismaService) {}

  async findOne() {
    const members = await this.prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
      take: 1,                                 // only the first team member
    });
    return members[0] || null;
  }
}