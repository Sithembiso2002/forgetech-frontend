import { Injectable } from '@nestjs/common';
import { CreateSubServiceDto } from './dto/sub-service.dto';
import { UpdateSubServiceDto } from './dto/sub-service.dto';

@Injectable()
export class SubServicesService {
  findAll() {
    throw new Error('Method not implemented.');
  }
  findOne(id: string) {
    throw new Error('Method not implemented.');
  }
  create(dto: CreateSubServiceDto) {
    throw new Error('Method not implemented.');
  }
  update(id: string, dto: UpdateSubServiceDto) {
    throw new Error('Method not implemented.');
  }
  remove(id: string) {
    throw new Error('Method not implemented.');
  }
}
