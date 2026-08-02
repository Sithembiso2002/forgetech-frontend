/* eslint-disable prettier/prettier */
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsString()
    title!: string;
  @IsString()
    slug!: string;
  @IsString()
    excerpt!: string;
  @IsString()
    content!: string;
  @IsOptional() @IsString() coverImage?: string;
  @IsBoolean() @IsOptional() published?: boolean;
}

export class UpdateBlogDto extends CreateBlogDto {}