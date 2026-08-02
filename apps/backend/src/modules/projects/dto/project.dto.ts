import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString() title: string;
  @IsString() slug: string;
  @IsOptional() @IsString() client?: string;
  @IsString() industry: string;
  @IsString() overview: string;
  @IsArray() @IsString({ each: true }) objectives: string[];
  @IsArray() @IsString({ each: true }) features: string[];
  @IsArray() @IsString({ each: true }) technologies: string[];
  @IsString() results: string;
  @IsBoolean() @IsOptional() featured?: boolean;
  @IsOptional() @IsString() mainImage?: string;
  @IsArray() @IsString({ each: true }) screenshots: string[];
}

export class UpdateProjectDto extends CreateProjectDto {}