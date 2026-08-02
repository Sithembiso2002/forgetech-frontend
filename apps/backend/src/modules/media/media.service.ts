import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async saveFile(fileName: string, url: string, mimeType: string, size: number, altText?: string) {
    return this.prisma.media.create({ data: { fileName, url, mimeType, size, altText } });
  }

  findAll() { return this.prisma.media.findMany({ orderBy: { createdAt: 'desc' } }); }
  remove(id: string) { return this.prisma.media.delete({ where: { id } }); }
}