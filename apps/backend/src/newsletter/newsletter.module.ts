// apps/backend/src/newsletter/newsletter.module.ts
import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminNewsletterController } from './admin-newsletter.controller';

@Module({
  imports: [PrismaModule],
  controllers: [NewsletterController, AdminNewsletterController],   // add the new controller
  providers: [NewsletterService],
})
export class NewsletterModule {}