import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()          // ← add this to make it available everywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService],   // ← crucial
})
export class PrismaModule {}