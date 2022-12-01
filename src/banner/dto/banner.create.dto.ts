import { IsString, IsMongoId, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BannerCreateDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'banner name' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'status' })
  status?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false, description: 'serial' })
  serial?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'banner image url' })
  imageUrl?: string;
}
