import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import EventVolunteer from '@/server/models/EventVolunteer';
import EventSchema from '@/server/models/Event';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import { CreateEventRequest } from '@/types/dataModel/event';
import Event from '@/server/models/Event';
import { mongo } from 'mongoose';

export async function createEventVolunteer(
  createEventVolunteerRequest: CreateEventVolunteerRequest
): Promise<string> {
  try {
    await dbConnect();

    const res = await EventVolunteer.create(createEventVolunteerRequest);
    if (!res) {
      throw new Error('Event not created');
    }

    return res._id.toString();
  } catch (error) {
    if (
      error instanceof mongo.MongoError ||
      error instanceof mongo.MongoServerError
    ) {
      if (error.code === 11000) {
        throw new CMError(CMErrorType.DuplicateKey, 'EventVolunteer');
      }
    }
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function createEvent(
  createEventRequest: CreateEventRequest
): Promise<string> {
  try {
    await dbConnect();

    const res = await Event.create(createEventRequest);
    if (!res) {
      throw new Error('Event not created');
    }

    return res._id.toString();
  } catch (error) {
    if (
      error instanceof mongo.MongoError ||
      error instanceof mongo.MongoServerError
    ) {
      if (error.code === 11000) {
        throw new CMError(CMErrorType.DuplicateKey, 'Event');
      }
    }
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function deleteEvent(eventId: string): Promise<void> {
  try {
    await dbConnect();

    await EventVolunteerSchema.deleteMany({
      event: eventId,
    });

    await EventSchema.findByIdAndDelete(eventId);
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getUpcomingEvents(): Promise<Event[] | null> {
  await dbConnect();

  const currentDate = new Date();
  const events: Event[] = (await EventSchema.find({
    date: {
      $gte: currentDate,
    },
    softDelete: { $ne: true },
  }).lean()) as Event[];

  return events;
}
