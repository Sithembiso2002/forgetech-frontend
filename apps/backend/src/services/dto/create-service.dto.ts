import { IsString, IsNumber, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateServiceDto {
  @IsString() title!: string;
  @IsString() slug!: string;
  @IsString() icon!: string;
  @IsString() shortDescription!: string;
  @IsString() description!: string;

  @IsOptional() @IsArray() @IsString({ each: true })
  benefits?: string[];

  @IsOptional() @IsArray() @IsString({ each: true })
  technologies?: string[];

  @IsOptional() @IsArray() @IsString({ each: true })
  industries?: string[];

  @IsOptional() @IsArray() @IsString({ each: true })
  process?: string[];

  @IsOptional() @IsNumber() order?: number;

  @IsOptional() @IsString() heroImage?: string;
  @IsOptional() @IsString() secondaryImage?: string;

  @IsOptional() @IsObject() testimonial?: Record<string, any>;
  @IsOptional() @IsArray() subServices?: Record<string, any>[];
}