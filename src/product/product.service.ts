import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Product } from './interfaces';
import { ProductCreateDto, ProductSearchDto, ProductUpdateDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('products')
    private readonly productModel: Model<Product>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public _castQuery(searchModel: ProductSearchDto) {
    const query: any = { $and: [] };
    const { key, status } = searchModel;

    // key support search fields [name, ]
    if (key) {
      const regx = new RegExp(key, 'i');
      query.$and.push({
        $or: [
          {
            name: regx,
          },
          {
            txHash: regx,
          },
          {
            albumName: regx,
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

  public async create(payload: ProductCreateDto) {
    try {
      const result = await new this.productModel(payload).save();

      console.log('product create', result);

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async find(searchModel: ProductSearchDto) {
    try {
      const query = this._castQuery(searchModel);
      const runQuery = this.productModel.find(query);

      if (searchModel.limit && searchModel.page) {
        runQuery.skip(searchModel.limit * searchModel.page);
        runQuery.limit(searchModel.limit);
      }
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
      let runQuery = this.productModel.find(query);

      runQuery.sort({ serial: 1 });
      const result = await runQuery.exec();

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findById(_id: string) {
    try {
      const result = await this.productModel.findById(_id);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async update(_id: string, payload: ProductUpdateDto) {
    try {
      const updatedPayload: any = { ...payload };

      const result = await this.productModel
        .findByIdAndUpdate(_id, updatedPayload, { new: true })
        .exec();

      console.log('product update', result);

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async remove(id: string) {
    try {
      const result = await this.productModel.deleteOne({ _id: id }).exec();
      console.log('product delete', result);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }
}
