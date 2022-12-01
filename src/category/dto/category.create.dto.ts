import { IsString, IsMongoId, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'category name' })
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
  @ApiProperty({ required: false, description: 'category image url' })
  imageUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'category cover image url' })
  coverImageUrl?: string;
}
