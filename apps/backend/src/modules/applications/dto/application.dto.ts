/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
    vacancyId!: string;
  @IsString()
    fullName!: string;
  @IsEmail()
    email!: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() coverLetter?: string;
}