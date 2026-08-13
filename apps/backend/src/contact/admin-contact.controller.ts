import { Controller, Get, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/auth.guard';
import { ContactService } from './contact.service';

@Controller('api/contact-submissions')
export class AdminContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @UseGuards(SupabaseAuthGuard)
  async findAll(@Req() req: any) {
    if (req.user?.role !== 'ADMIN') {
      throw new UnauthorizedException('Admin access required');
    }
    return this.contactService.findAll();
  }
}