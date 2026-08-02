/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
  }

  create(dto: CreateTeamDto) {
    return this.prisma.teamMember.create({ data: dto });
  }

  update(id: string, dto: UpdateTeamDto) {
    return this.prisma.teamMember.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.teamMember.delete({ where: { id } });
  }
}
