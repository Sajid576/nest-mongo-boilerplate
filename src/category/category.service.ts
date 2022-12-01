import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
// import { RandomHelper } from '../common/utils';
import { Category } from './interfaces';
import { CategoryCreateDto, CategorySearchDto, CategoryUpdateDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('categories')
    private readonly categoryModel: Model<Category>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public _castQuery(searchModel: CategorySearchDto) {
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

  public async create(payload: CategoryCreateDto) {
    try {
      const result = await new this.categoryModel(payload).save();

      console.log('Category create', result);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async find(searchModel: CategorySearchDto) {
    try {
      const query = this._castQuery(searchModel);
      let runQuery = this.categoryModel.find(query);

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
      let runQuery = this.categoryModel.find(query);

      runQuery.sort({ serial: 1 });
      const result = await runQuery.exec();

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findById(_id: string) {
    try {
      const result = await this.categoryModel.findById(_id);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async update(_id: string, payload: CategoryUpdateDto) {
    try {
      const updatedPayload: any = { ...payload };
      // if (brandUpdateDto.featured === true) {
      //   // if one CategorySearchDto is updated with true,   then other brands should be featured : false
      //   await this.categoryModel
      //     .updateMany({ featured: true }, { featured: false })
      //     .exec();
      // }
      const result = await this.categoryModel
        .findByIdAndUpdate(_id, updatedPayload, { new: true })
        .exec();

      console.log('Category update', result);

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async remove(id: string) {
    try {
      const result = await this.categoryModel.deleteOne({ _id: id }).exec();
      console.log('Category delete', result);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }
}
