import { Controller, Get, Param } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findPublished() {
    return this.newsService.findPublished();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.newsService.findBySlug(slug);
  }
}