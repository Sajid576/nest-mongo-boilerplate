import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

export const CollectionName = 'campaigns';
export const Schema = new MongooseSchema(
  {
    name: { type: SchemaTypes.String, required: true },
    status: { type: SchemaTypes.String, required: true },
    serial: { type: SchemaTypes.Number, required: true, default: 999 },
    imageUrl: { type: SchemaTypes.String, required: false, default: null },
    coverImageUrl: { type: SchemaTypes.String, required: false, default: null },
  },
  {
    collection: CollectionName,
    timestamps: true,
  },
);
