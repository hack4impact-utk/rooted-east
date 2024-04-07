import { EventVolunteer } from '@/types/dataModel/eventVolunteer';
import { Model, Schema, model, models } from 'mongoose';

const EventVolunteerSchema = new Schema({
  volunteer: {
    type: Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  checkInTime: {
    type: Date,
  },
  checkOutTime: {
    type: Date,
  },
});

export type EventVolunteerDocument = EventVolunteer & Document;

export default (models.EventVolunteer as Model<EventVolunteerDocument>) ||
  model<EventVolunteerDocument>('EventVolunteer', EventVolunteerSchema);
