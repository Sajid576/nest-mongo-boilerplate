import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface Brand extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;
  name: string;
  imageUrl: string;
  status: string;
  serial: number;
  createdAt: Date;
  updatedAt: Date;
}
