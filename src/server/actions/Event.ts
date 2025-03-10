import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import EventSchema from '@/server/models/Event';
import {
  CreateEventRequest,
  UpdateEventRequest,
} from '@/types/dataModel/event';
import { mongo, isValidObjectId } from 'mongoose';
import { EventEntity, EventVolVol } from '@/types/dataModel/event';

import EventVolunteerSchema from '@/server/models/EventVolunteer';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import VolunteerSchema from '@/server/models/Volunteer';
import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';

export async function createEvent(
  createEventRequest: CreateEventRequest
): Promise<string> {
  if (!createEventRequest || Object.keys(createEventRequest).length === 0) {
    throw new CMError(
      CMErrorType.BadValue,
      'Invalid input for CreateEventRequest'
    );
  }

  try {
    await dbConnect();

    const res = await EventSchema.create(createEventRequest);
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
  if (!isValidObjectId(eventId)) {
    throw new CMError(CMErrorType.BadValue, 'EventId');
  }

  try {
    await dbConnect();

    await EventVolunteerSchema.deleteMany({
      event: eventId,
    });

    const res = await EventSchema.findByIdAndDelete(eventId);
    if (!res) {
      throw new CMError(CMErrorType.NoSuchKey, 'Event');
    }
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getEvent(eventId: string): Promise<EventEntity | null> {
  if (!isValidObjectId(eventId)) {
    throw new CMError(CMErrorType.BadValue, 'EventId');
  }

  let target: EventEntity | null;
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

export async function updateEvent(
  eventId: string,
  updatedEvent: UpdateEventRequest
): Promise<void> {
  if (!isValidObjectId(eventId)) {
    throw new CMError(CMErrorType.BadValue, 'EventId');
  }

  if (!updatedEvent || Object.keys(updatedEvent).length === 0) {
    throw new CMError(CMErrorType.BadValue, 'UpdateEventRequest');
  }

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

export async function getUpcomingEvents(): Promise<EventEntity[] | null> {
  try {
    await dbConnect();

    const currentDate = new Date();
    const events: EventEntity[] = (await EventSchema.find({
      day: {
        $gte: currentDate,
      },
    }).lean()) as EventEntity[];

    return events;
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function updateEventAction(
  eventId: string,
  eventUpdatesRequest: UpdateEventRequest
): Promise<void> {
  if (!isValidObjectId(eventId)) {
    throw new CMError(CMErrorType.BadValue, 'EventId');
  }

  if (!eventUpdatesRequest || Object.keys(eventUpdatesRequest).length === 0) {
    throw new CMError(CMErrorType.BadValue, 'UpdateEventRequest');
  }

  let res;
  try {
    await dbConnect();
    res = await EventSchema.findByIdAndUpdate(eventId, eventUpdatesRequest);
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }

  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, 'Event');
  }
}

export async function getVolunteerEvents(
  volunteerId: string | null
): Promise<EventEntity[]> {
  if (!isValidObjectId(volunteerId)) {
    throw new CMError(CMErrorType.BadValue, 'VolunteerId');
  }

  const volEvents: EventEntity[] = [];

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

  return volEvents;
}

// Used to repopulate num of volunteers signed up for an event if needed.
export async function repopulateEventVols() {
  try {
    await dbConnect();

    const res = (await EventSchema.find().lean()) as EventEntity[];
    if (!res) {
      throw new Error('Events not found');
    }
    for (let i = 0; i < res.length; i++) {
      const eventVols = await EventVolunteerSchema.find(
        {
          event: res[i]._id,
        },
        'event'
      );
      await EventSchema.updateOne(
        { _id: res[i]._id },
        { volsSignUp: eventVols.length }
      );
    }
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

export async function getAllVolunteersAndEventVolunteersForEvent(
  eventId: string
): Promise<EventVolVol[]> {
  if (!isValidObjectId(eventId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid EventId');
  }

  const eventVolVols: EventVolVol[] = [];
  try {
    await dbConnect();
    const eventVols: EventVolunteerEntity[] | null =
      await EventVolunteerSchema.find({ event: eventId });

    for (const eVol of eventVols) {
      const vol: VolunteerEntity | null = await VolunteerSchema.findById(
        eVol.volunteer
      ).lean();
      if (vol) {
        eventVolVols.push({ vol, eVol });
      }
    }
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }

  return eventVolVols;
}
