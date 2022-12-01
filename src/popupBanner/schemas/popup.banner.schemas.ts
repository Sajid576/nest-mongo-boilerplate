import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

export const CollectionName = 'popupBanners';
export const Schema = new MongooseSchema(
  {
    name: { type: SchemaTypes.String, required: true },
    status: { type: SchemaTypes.String, required: true },
    imageUrl: { type: SchemaTypes.String, required: false, default: null },
  },
  {
    collection: CollectionName,
    timestamps: true,
  },
);
