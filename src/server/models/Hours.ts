import { Hours } from '@/types/dataModel/hours';
import { Model, Schema, model, models } from 'mongoose';

const HoursSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  // unsure if Hours is the right place to put signedInTime and signedOutTime as dates
  // since its connected to Volunteer and not Event???
  signedInTime: {
    type: Date,
  },
  signedOutTime: {
    type: Date,
  },
});

export type HoursDocument = Hours & Document;

export default (models.Hours as Model<HoursDocument>) ||
  model<HoursDocument>('Hours', HoursSchema);
