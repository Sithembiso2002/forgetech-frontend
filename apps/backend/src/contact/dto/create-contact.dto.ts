// apps/backend/src/contact/dto/create-contact.dto.ts
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsIn(['general', 'services', 'vacancies'])
  enquiryType!: string;

  @IsOptional()
  @IsString()
  service?: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}