import { EventHours } from '@/types/dataModel/eventHours';
import { Model, Schema, model, models } from 'mongoose';

const EventHoursSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  signedInTime: {
    type: Date,
  },
  signedOutTime: {
    type: Date,
  },
});

export type EventHoursDocument = EventHours & Document;

export default (models.EventHours as Model<EventHoursDocument>) ||
  model<EventHoursDocument>('EventHours', EventHoursSchema);
