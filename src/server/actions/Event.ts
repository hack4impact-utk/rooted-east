import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import EventVolunteer from '@/server/models/EventVolunteer';
import EventSchema from '@/server/models/Event';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import {
  CreateEventRequest,
  UpdateEventRequest,
} from '@/types/dataModel/event';
import Event from '@/server/models/Event';
import { mongo } from 'mongoose';
// import { get } from 'http';

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

export async function getEvent(eventId: string): Promise<Event | null> {
  let target: Event | null;
  try {
    await dbConnect();
    target = await EventSchema.findById(eventId).lean();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }

  if (!target) {
    throw new CMError(CMErrorType.NoSuchKey, 'Event');
  }

  return target;
}

/**
 * Takes in an event id and updates the corresponding event with the new data
 * @param eventId  The id of the existing event
 * @param updatedEvent The updated event
 */
export async function updateEvent(
  eventId: string,
  updatedEvent: UpdateEventRequest
): Promise<void> {
  let res;
  try {
    await dbConnect();
    res = await EventSchema.findByIdAndUpdate(eventId, updatedEvent);
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, 'Event');
  }
}

export async function getUpcomingEvents(): Promise<Event[] | null> {
  await dbConnect();

  const currentDate = new Date();
  const events: Event[] = (await EventSchema.find({
    date: {
      $gte: currentDate,
    },
  }).lean()) as Event[];

  return events;
}

export async function updateEventAction(
  eventId: string,
  eventUpdatesReqest: UpdateEventRequest
): Promise<void> {
  let res;
  try {
    await dbConnect();
    res = await EventVolunteerSchema.findByIdAndUpdate(
      eventId,
      eventUpdatesReqest
    );
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, 'Event');
  }
}

// get all events associated with a volunter by volunteer id
export async function getVolunteerEvents(
  volunteerId: string
): Promise<Event[] | null> {
  const volEvents: Event[] = [];

  try {
    await dbConnect();
    const eventVols = await EventVolunteerSchema.find(
      {
        volunteer: volunteerId,
      },
      'event'
    );

    for (let i = 0; i < eventVols.length; i++) {
      const event = await getEvent(eventVols[i].event);
      if (event) {
        volEvents.push(event);
      }
    }
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!volEvents) {
    throw new CMError(CMErrorType.NoSuchKey, 'Event');
  }

  return volEvents;
}
