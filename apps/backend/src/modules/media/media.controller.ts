import { Controller, Post, Get, Delete, UseInterceptors, UploadedFile, Body, Param, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { SupabaseService } from '../../supabase/supabase.service';
import { SupabaseAuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';   // <-- import from decorator
import { Role } from '@prisma/client';

@Controller('api/media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post('upload')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('altText') altText?: string) {
    const path = `media/${Date.now()}-${file.originalname}`;
    await this.supabaseService.uploadFile('media', path, file.buffer, file.mimetype);
    const url = this.supabaseService.getPublicUrl('media', path);
    return this.mediaService.saveFile(file.originalname, url, file.mimetype, file.size, altText);
  }

  @Get()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() { return this.mediaService.findAll(); }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) { return this.mediaService.remove(id); }
}
