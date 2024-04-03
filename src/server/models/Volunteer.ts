import {
    Volunteer,
  } from '@/types/dataModel/volunteer';
  import { Model, Schema, model, models } from 'mongoose';
  
  const VolunteerSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      userName: {
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
      active: {
        type: Boolean,
        required: false,
      },
      totalHours: {
        type: Number,
        required: true,
      },
     /*events: {
        type: [Schema.Types.ObjectId],
        ref: 'EventHours', // link to the Events Schmea if made
        required: false,
      },*/
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
        required: true,
      },
      admin: {
        type: Boolean,
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  export type VolunteerDocument = Volunteer & Document;
  
  export default (models.Volunteer as Model<VolunteerDocument>) ||
    model<VolunteerDocument>('Volunteer', VolunteerSchema);
  
