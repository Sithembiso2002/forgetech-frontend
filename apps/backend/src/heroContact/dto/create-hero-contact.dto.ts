// apps/backend/src/heroContact/dto/create-hero-contact.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHeroContactDto {
  @IsString() @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional() @IsString()
  phone?: string;

  @IsString() @IsNotEmpty()
  message!: string;

  @IsOptional() @IsString()
  budget?: string;

  @IsOptional() @IsString()
  attachmentBase64?: string;
}