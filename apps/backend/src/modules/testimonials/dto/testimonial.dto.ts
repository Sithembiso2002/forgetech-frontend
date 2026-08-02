import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTestimonialDto {
  @IsString() clientName!: string;
  @IsOptional() @IsString() company?: string;
  @IsString() content!: string;
  @IsOptional() @IsString() avatarUrl?: string;
  @IsBoolean() @IsOptional() featured?: boolean;
}

export class UpdateTestimonialDto extends CreateTestimonialDto {}