import { Volunteer, roles } from '@/types/dataModel/volunteer';
import { Model, Schema, model, models } from 'mongoose';

const VolunteerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  demographic: {
    type: {
      age: {
        type: Number,
        required: false,
      },
      race: {
        type: String,
        required: false,
      },
      sex: {
        type: String,
        required: false,
      },
      income: {
        type: Number,
        required: false,
      },
      zipcode: {
        type: Number,
        required: false,
      },
      occupation: {
        type: String,
        required: false,
      },
      pronoun: {
        type: String,
        required: false,
      },
    },
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: roles,
  },
});

export type VolunteerDocument = Volunteer & Document;

export default (models.Volunteer as Model<VolunteerDocument>) ||
  model<VolunteerDocument>('Volunteer', VolunteerSchema);
