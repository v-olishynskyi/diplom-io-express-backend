import { model, Schema } from 'mongoose';
import { ICategory } from '../../@types';

const categorySchema = new Schema<ICategory>(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    isAccept: Boolean,
  },
  { collection: 'category', timestamps: true }
);

export const CategoryModel = model<ICategory & Document>(
  'Category',
  categorySchema
);
