import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BannerSearchDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'brand name' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'status' })
  status?: string;
}
