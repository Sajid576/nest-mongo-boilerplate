import { Test, TestingModule } from '@nestjs/testing';
import { PopupBannerService } from './popup.banner.service';

describe('PopupBannerService', () => {
  let service: PopupBannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopupBannerService],
    }).compile();

    service = module.get<PopupBannerService>(PopupBannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
