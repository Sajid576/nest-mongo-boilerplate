import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

enum Status {
  Active = 'active',
  InActive = 'inactive',
}
export interface Product extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;
  name: string;
  imageUrl?: string;
  status: Status;
  price: number;
  serial: number;
  discountPrice: number;
  features: [];

  createdAt: Date;
  updatedAt: Date;
}
