import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface Campaign extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;
  name: string;
  imageUrl: string;
  coverImageUrl: string;
  status: string;
  serial: number;
  createdAt: Date;
  updatedAt: Date;
}
