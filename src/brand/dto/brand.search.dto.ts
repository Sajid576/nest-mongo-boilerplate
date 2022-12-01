import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BrandSearchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  key?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'brand name' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'status' })
  status?: string;
}
