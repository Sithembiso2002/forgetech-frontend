import { Controller, Get } from '@nestjs/common';
import { TeammessageService } from './teammessage.service';

@Controller('api/teammessage')
export class TeammessageController {
  constructor(private readonly teammessageService: TeammessageService) {}

  @Get()
  findOne() {
    return this.teammessageService.findOne();
  }
}