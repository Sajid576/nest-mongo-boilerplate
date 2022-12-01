import { IsString, IsMongoId, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CampaignCreateDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'campaign name' })
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
  @ApiProperty({ required: false, description: 'campaign image url' })
  imageUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'campaign cover image url' })
  coverImageUrl?: string;
}
