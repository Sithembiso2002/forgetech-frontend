// apps/backend/src/heroContact/hero-contact.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { HeroContactService } from './hero-contact.service';
import { CreateHeroContactDto } from './dto/create-hero-contact.dto';

@Controller('hero-contact')
export class HeroContactController {
  constructor(private readonly heroContactService: HeroContactService) {}

  @Post()
  async submit(@Body() dto: CreateHeroContactDto) {
    return this.heroContactService.submit(dto);
  }
}