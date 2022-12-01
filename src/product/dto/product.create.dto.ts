import {
  IsBoolean,
  IsString,
  IsNumber,
  IsMongoId,
  IsOptional,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCreateDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'product name' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'image url' })
  imageUrl?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'price' })
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'cost price' })
  discountPrice?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'status' })
  status?: string;
}
