import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CampaignModule } from './campaign/campaign.module';
import { BannerModule } from './banner/banner.module';
import { PopupBannerModule } from './popupBanner/popup.banner.module';
import { Url, Options } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    MongooseModule.forRoot(Url, Options),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    BrandModule,
    ProductModule,
    CategoryModule,
    CampaignModule,
    BannerModule,
    PopupBannerModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
