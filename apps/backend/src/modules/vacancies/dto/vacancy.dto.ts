/* eslint-disable prettier/prettier */
import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateVacancyDto {
  @IsString()
    title!: string;
  @IsString()
    slug!: string;
  @IsString()
    department!: string;
  @IsString()
    location!: string;
  @IsString()
    type!: string;
  @IsString()
    description!: string;
  @IsArray() @IsString({ each: true })
    requirements: string[] = [];
  @IsBoolean() @IsOptional() active?: boolean;
}

export class UpdateVacancyDto extends CreateVacancyDto {}