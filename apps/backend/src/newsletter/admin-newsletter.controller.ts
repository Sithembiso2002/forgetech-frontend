import { Controller, Get, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/auth.guard';
import { NewsletterService } from './newsletter.service';

@Controller('api/newsletter-subscriptions')
export class AdminNewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Get()
  @UseGuards(SupabaseAuthGuard)
  async findAll(@Req() req: any) {
    if (req.user?.role !== 'ADMIN') {
      throw new UnauthorizedException('Admin access required');
    }
    return this.newsletterService.findAll();
  }
}