import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

enum Status {
  Active = 'active',
  InActive = 'inactive',
}
export interface PopupBanner extends Document {
  /**
   * unique ID for document
   */
  _id: ObjectId;
  name: string;
  imageUrl: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
