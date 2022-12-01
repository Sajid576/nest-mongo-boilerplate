import { Module } from '@nestjs/common';
import { PopupBannerService } from './popup.banner.service';
import { PopupBannerController } from './popup.banner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema, CollectionName } from './schemas/popup.banner.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CollectionName, schema: Schema }]),
  ],
  controllers: [PopupBannerController],
  providers: [PopupBannerService],
  exports: [PopupBannerService],
})
export class PopupBannerModule {}
