// apps/backend/src/newsletter/dto/create-newsletter.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateNewsletterDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}