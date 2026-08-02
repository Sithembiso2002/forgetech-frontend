import { Controller, Get } from '@nestjs/common';
import { HomepageNewsService } from './homepage-news.service';

@Controller('api/homepage-news')
export class HomepageNewsController {
  constructor(private readonly service: HomepageNewsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}