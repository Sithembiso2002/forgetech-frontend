import { Module } from '@nestjs/common';
import { HomepageNewsController } from './homepage-news.controller';
import { HomepageNewsService } from './homepage-news.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HomepageNewsController],
  providers: [HomepageNewsService],
})
export class HomepageNewsModule {}