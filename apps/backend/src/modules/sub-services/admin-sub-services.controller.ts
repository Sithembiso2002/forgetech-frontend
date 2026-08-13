import { Controller, Get, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { SupabaseAuthGuard } from '../../auth/auth.guard';
import { SubServicesService } from './sub-services.service';

@Controller('api/sub-services')
export class AdminSubServicesController {
  constructor(private readonly subServicesService: SubServicesService) {}

  @Get()
  @UseGuards(SupabaseAuthGuard)
  async findAll(@Req() req: any) {
    if (req.user?.role !== 'ADMIN') {
      throw new UnauthorizedException('Admin access required');
    }
    return this.subServicesService.findAll();
  }
}