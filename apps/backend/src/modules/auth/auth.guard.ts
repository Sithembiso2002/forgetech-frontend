import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    private supabaseService: SupabaseService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const user = await this.supabaseService.verifyToken(token);
      const profile = await this.prisma.profile.findUnique({
        where: { userId: user.id },
      });

      if (!profile) {
        throw new UnauthorizedException(
          `No admin profile for user ${user.id}. Please create a Profile row with role ADMIN.`,
        );
      }

      request.user = { ...user, role: profile.role };
      return true;
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      throw new UnauthorizedException('Invalid token or missing profile');
    }
  }
}