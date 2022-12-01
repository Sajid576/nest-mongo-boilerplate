import { PartialType } from '@nestjs/swagger';
import { PopupBannerCreateDto } from './popup.banner.create.dto';

export class PopupBannerUpdateDto extends PartialType(PopupBannerCreateDto) {}
