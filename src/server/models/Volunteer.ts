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
    type: [
      {
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
      },
    ],
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
