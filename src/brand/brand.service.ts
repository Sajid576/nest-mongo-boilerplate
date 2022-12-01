import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
// import { RandomHelper } from '../common/utils';
import { Brand } from './interfaces';
import { BrandCreateDto, BrandSearchDto, BrandUpdateDto } from './dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel('brands')
    private readonly brandModel: Model<Brand>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public _castQuery(searchModel: BrandSearchDto) {
    const query: any = { $and: [] };
    const { key, status } = searchModel;

    // key support search fields [name, remarks]
    if (key) {
      const regx = new RegExp(key, 'i');
      query.$and.push({
        $or: [
          {
            name: regx,
          },
          {
            remarks: regx,
          },
        ],
      });
    }

    if (status) {
      query.$and.push({ status: status });
    }

    if (query.$and && query.$and.length === 0) {
      delete query.$and;
    }

    return query;
  }

  public async create(payload: BrandCreateDto) {
    try {
      const result = await new this.brandModel(payload).save();

      console.log('brand create', result);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async find(searchModel: BrandSearchDto) {
    try {
      const query = this._castQuery(searchModel);
      let runQuery = this.brandModel.find(query);

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
      let runQuery = this.brandModel.find(query);

      runQuery.sort({ serial: 1 });
      const result = await runQuery.exec();

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findById(_id: string) {
    try {
      const result = await this.brandModel.findById(_id);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async update(_id: string, payload: BrandUpdateDto) {
    try {
      const updatedPayload: any = { ...payload };
      // if (brandUpdateDto.featured === true) {
      //   // if one brand is updated with true,   then other brands should be featured : false
      //   await this.brandModel
      //     .updateMany({ featured: true }, { featured: false })
      //     .exec();
      // }
      const result = await this.brandModel
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
      const result = await this.brandModel.deleteOne({ _id: id }).exec();
      console.log('brand delete', result);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }
}
