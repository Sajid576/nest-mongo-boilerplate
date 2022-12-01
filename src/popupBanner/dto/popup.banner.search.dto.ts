import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PopupBannerSearchDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'Popup Banner name' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'status' })
  status?: string;
}
