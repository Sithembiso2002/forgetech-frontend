/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Get, UseInterceptors, UploadedFile, Body, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/application.dto';
import { SupabaseService } from '../../supabase/supabase.service';
import { SupabaseAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('api/applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('resume'))
  async submit(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateApplicationDto,
  ) {
    let resumeUrl = '';
    if (file) {
      const path = `resumes/${Date.now()}-${file.originalname}`;
      await this.supabaseService.uploadFile('resumes', path, file.buffer, file.mimetype);
      resumeUrl = this.supabaseService.getPublicUrl('resumes', path);
    }
    return this.applicationsService.create(dto, resumeUrl);
  }

  @Get()
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.applicationsService.findAll();
  }
}
