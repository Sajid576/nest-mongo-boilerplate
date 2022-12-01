import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
// import { RandomHelper } from '../common/utils';
import { Banner } from './interfaces';
import { BannerCreateDto, BannerSearchDto, BannerUpdateDto } from './dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel('banners')
    private readonly bannerModel: Model<Banner>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public _castQuery(searchModel: BannerSearchDto) {
    const query: any = { $and: [] };
    const { status } = searchModel;

    if (status) {
      query.$and.push({ status: status });
    }

    if (query.$and && query.$and.length === 0) {
      delete query.$and;
    }

    return query;
  }

  public async create(payload: BannerCreateDto) {
    try {
      const result = await new this.bannerModel(payload).save();

      console.log('brand create', result);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async find(searchModel: BannerSearchDto) {
    try {
      const query = this._castQuery(searchModel);
      let runQuery = this.bannerModel.find(query);

      runQuery.sort({ createdAt: -1 });
      const result = await runQuery.exec();

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findByCustomer() {
    try {
      const query = this._castQuery({ status: 'active' });
      let runQuery = this.bannerModel.find(query);

      runQuery.sort({ serial: 1 });
      const result = await runQuery.exec();

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findById(_id: string) {
    try {
      const result = await this.bannerModel.findById(_id);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async update(_id: string, payload: BannerUpdateDto) {
    try {
      const updatedPayload: any = { ...payload };
      // if (brandUpdateDto.featured === true) {
      //   // if one brand is updated with true,   then other brands should be featured : false
      //   await this.bannerModel
      //     .updateMany({ featured: true }, { featured: false })
      //     .exec();
      // }
      const result = await this.bannerModel
        .findByIdAndUpdate(_id, updatedPayload, { new: true })
        .exec();

      console.log('brand update', result);

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async remove(id: string) {
    try {
      const result = await this.bannerModel.deleteOne({ _id: id }).exec();
      console.log('brand delete', result);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }
}
