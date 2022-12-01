import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
// import { RandomHelper } from '../common/utils';
import { PopupBanner } from './interfaces';
import {
  PopupBannerCreateDto,
  PopupBannerSearchDto,
  PopupBannerUpdateDto,
} from './dto';

@Injectable()
export class PopupBannerService {
  constructor(
    @InjectModel('popupBanners')
    private readonly popupBannerModel: Model<PopupBanner>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public _castQuery(searchModel: PopupBannerSearchDto) {
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

  public async create(payload: PopupBannerCreateDto) {
    try {
      if (payload.status === 'active') {
        await this.popupBannerModel
          .updateMany({ status: 'active' }, { status: 'inactive' })
          .exec();
      }
      const result = await new this.popupBannerModel(payload).save();

      console.log('popup banner create', result);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findByCustomer() {
    try {
      const query = this._castQuery({ status: 'active' });
      let runQuery = this.popupBannerModel.find(query);

      const result = await runQuery.exec();

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async find(searchModel: PopupBannerSearchDto) {
    try {
      const query = this._castQuery(searchModel);
      let runQuery = this.popupBannerModel.find(query);

      runQuery.sort({ createdAt: -1 });
      const result = await runQuery.exec();

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findById(_id: string) {
    try {
      const result = await this.popupBannerModel.findById(_id);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async update(_id: string, payload: PopupBannerUpdateDto) {
    try {
      const updatedPayload: any = { ...payload };

      if (updatedPayload.status === 'active') {
        await this.popupBannerModel
          .updateMany({ status: 'active' }, { status: 'inactive' })
          .exec();
      }
      const result = await this.popupBannerModel
        .findByIdAndUpdate(_id, updatedPayload, { new: true })
        .exec();

      console.log('popup banner update', result);

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async remove(id: string) {
    try {
      const result = await this.popupBannerModel.deleteOne({ _id: id }).exec();
      console.log('popup banner delete', result);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }
}
