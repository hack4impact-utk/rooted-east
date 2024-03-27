import {
    Volunteer,
  } from '@/types/volunteer';
  import { Model, Schema, model, models } from 'mongoose';
  
  const VolunteerSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      events: {
        type: [Schema.Types.ObjectId],
        ref: 'Events', // link to the Events Schmea if made
        required: false,
      },
      active: {
        type: Boolean,
        required: false,
      },
      hoursLogged: {
        type: Schema.Types.ObjectId,
        ref: 'Hours', // link to the Hours Schmea if made
        required: false,
      },
      demographic: {
        type: Schema.Types.ObjectId,
        ref: 'Demographic', // link to the Demographic Schmea if made
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
  
