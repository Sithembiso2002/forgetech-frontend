// apps/backend/src/homepage-services/homepage-services.module.ts
import { Module } from '@nestjs/common';
import { HomepageServicesController } from './homepage-services.controller';
import { HomepageServicesService } from './homepage-services.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HomepageServicesController],
  providers: [HomepageServicesService],
})
export class HomepageServicesModule {}