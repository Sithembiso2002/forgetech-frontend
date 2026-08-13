import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SupabaseAuthGuard } from '../../auth/auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('api/admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get('profile')
  @UseGuards(SupabaseAuthGuard)
  async getProfile(@Req() req: any) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId: req.user.sub },
    });

    return {
      fullName: profile?.fullName || 'Admin',
      role: profile?.role,
      email: req.user.email,
      avatarUrl: req.user.user_metadata?.avatar_url || null,
    };
  }
}