import { Module } from '@nestjs/common';
import { SubServicesController } from './sub-services.controller';
import { SubServicesService } from './sub-services.service';
import { AdminSubServicesController } from './admin-sub-services.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [
    SubServicesController,               // existing
    AdminSubServicesController,          // new
  ],
  providers: [SubServicesService],
})
export class SubServicesModule {}
