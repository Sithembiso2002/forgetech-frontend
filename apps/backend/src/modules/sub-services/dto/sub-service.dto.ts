import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateSubServiceDto {
  @IsString() serviceId!: string;
  @IsString() name!: string;
  @IsString() description!: string;
  @IsString() benefit!: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsInt() order?: number;
}

export class UpdateSubServiceDto extends CreateSubServiceDto {}