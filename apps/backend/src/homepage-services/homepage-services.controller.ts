// apps/backend/src/homepage-services/homepage-services.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HomepageServicesService } from './homepage-services.service';

@Controller('api/homepage-services')
export class HomepageServicesController {
  constructor(private readonly service: HomepageServicesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}