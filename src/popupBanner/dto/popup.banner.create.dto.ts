import { IsString, IsMongoId, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PopupBannerCreateDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'popup banner name' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'status' })
  status?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'popup banner image url' })
  imageUrl?: string;
}
