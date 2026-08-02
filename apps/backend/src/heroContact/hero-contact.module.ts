// apps/backend/src/heroContact/hero-contact.module.ts
import { Module } from '@nestjs/common';
import { HeroContactController } from './hero-contact.controller';
import { HeroContactService } from './hero-contact.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HeroContactController],
  providers: [HeroContactService],
})
export class HeroContactModule {}