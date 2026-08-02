/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsString()
    name!: string;
  @IsString()
    role!: string;
  @IsString()
    bio!: string;
  @IsOptional() @IsString() photoUrl?: string;
  @IsOptional() @IsInt() order?: number;
}

export class UpdateTeamDto extends CreateTeamDto {}