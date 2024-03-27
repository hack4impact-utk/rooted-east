import { Demographic } from '@/types/demographic';
import { Schema, Model, model, models } from 'mongoose';

const DemographicSchema = new Schema({
  age: {
    type: Number,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
});

export type DemographicDocument = Demographic & Document;

export default (models.Demographic as Model<DemographicDocument>) ||
  model<DemographicDocument>('Demographic', DemographicSchema);
