import { Module } from '@nestjs/common';
import { TeammessageController } from './teammessage.controller';
import { TeammessageService } from './teammessage.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TeammessageController],
  providers: [TeammessageService],
})
export class TeammessageModule {}