import { Event } from '@/types/dataModel/event';
import { Model, Schema, model, models } from 'mongoose';
//idk if we need the above but it was from the compassion ministries? so i left it in

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  volsNeeded: {
    type: Number,
    required: true,
  },
  signedUp: {
    type: [Schema.Types.ObjectId],
    ref: 'Volunteer', // link to the Events Schmea if made
    required: false,
  },
  recurring: {
    type: Boolean,
    required: true,
  },
});

export type EventDocument = Event & Document;

export default (models.Event as Model<EventDocument>) ||
  model<EventDocument>('Event', EventSchema);
