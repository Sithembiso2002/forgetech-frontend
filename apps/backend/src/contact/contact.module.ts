// apps/backend/src/contact/contact.module.ts
import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { AdminContactController } from './admin-contact.controller';

@Module({
  controllers: [ContactController, AdminContactController],   // add the new controller
  providers: [ContactService],
})
export class ContactModule {}