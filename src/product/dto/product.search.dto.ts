import {
  IsArray,
  IsBoolean,
  IsString,
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  // ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductSearchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  key?: string;

  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  @ApiProperty({ description: 'product search by brand' })
  brandId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'status' })
  status?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'rarity' })
  rarity?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @ApiProperty({ description: 'Page number. Starts from 0' })
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  limit?: number;
}
