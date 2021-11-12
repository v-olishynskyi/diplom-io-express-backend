import { model } from 'mongoose';
import { Schema, Types } from 'mongoose';
import { IMarker } from '../../@types';

const markerSchema = new Schema<IMarker>(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    // @ts-ignore
    owner: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { collection: 'markers', timestamps: true }
);

const MarkerModel = model('Marker', markerSchema);

export default MarkerModel;
