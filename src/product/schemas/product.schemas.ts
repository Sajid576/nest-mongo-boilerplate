import { Schema as MongooseSchema, SchemaTypes } from 'mongoose';

export const CollectionName = 'products';
export const Schema = new MongooseSchema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    status: {
      type: SchemaTypes.String,
      enum: ['active', 'inactive'],
      required: true,
      default: 'inactive',
    },

    imageUrl: {
      type: SchemaTypes.String,
      required: true,
      default: null,
    },

    price: {
      type: SchemaTypes.Number,
      default: 0,
      required: true,
    },

    discountPrice: {
      type: SchemaTypes.Number,
      default: 0,
      required: true,
    },

    serial: {
      type: SchemaTypes.Number,
      default: 999,
      required: true,
    },

    features: {
      type: SchemaTypes.Array,
      required: true,
    },
  },
  {
    collection: CollectionName,
    timestamps: true,
  },
);
