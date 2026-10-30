// apps/backend/src/modules/media/media.controller.ts
import {
  Controller,
  Post,
  Get,
  Delete,
  UseInterceptors,
  UploadedFile,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { SupabaseService } from '../../supabase/supabase.service';
import { SupabaseAuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

// Only these buckets may be written to. Add new ones here, nowhere else.
const ALLOWED_BUCKETS = ['media', 'project-images', 'avatars'] as const;
type AllowedBucket = (typeof ALLOWED_BUCKETS)[number];

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
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('altText') altText?: string,
    @Body('bucket') bucket?: string,
  ) {
    if (!file) throw new BadRequestException('No file provided');

    // Validate bucket against the whitelist; default to `media`
    const targetBucket: AllowedBucket = (
      bucket && ALLOWED_BUCKETS.includes(bucket as AllowedBucket)
        ? bucket
        : 'media'
    ) as AllowedBucket;

    // Sanitize the filename and make it unique
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const random = Math.random().toString(36).slice(2, 10);
    const path = `${Date.now()}-${random}-${safeName}`;

    await this.supabaseService.uploadFile(
      targetBucket,
      path,
      file.buffer,
      file.mimetype,
    );

    const url = this.supabaseService.getPublicUrl(targetBucket, path);

    return this.mediaService.saveFile(
      file.originalname,
      url,
      file.mimetype,
      file.size,
      altText,
    );
  }

  @Get()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.mediaService.findAll();
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}