import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';
import { mongo, isValidObjectId } from 'mongoose';
import {
  CheckInVolunteerRequest,
  CheckOutVolunteerRequest,
} from '@/types/dataModel/eventVolunteer';
import EventVolunteer from '../models/EventVolunteer';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import Event from '../models/Event';

export async function createEventVolunteer(
  createEventVolunteerRequest: CreateEventVolunteerRequest
): Promise<string> {
  if (
    !createEventVolunteerRequest ||
    Object.keys(createEventVolunteerRequest).length === 0
  ) {
    throw new CMError(
      CMErrorType.BadValue,
      'Invalid input for CreateEventVolunteerRequest'
    );
  }

  try {
    await dbConnect();

    const res = await EventVolunteer.create(createEventVolunteerRequest);
    await Event.updateOne(
      { _id: createEventVolunteerRequest.event },
      { $inc: { volsSignUp: 1 } }
    );

    if (!res) {
      throw new Error('EventVolunteer not created');
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

export async function checkOutVolunteer(
  checkOutVolunteerRequest: CheckOutVolunteerRequest
): Promise<void> {
  if (!isValidObjectId(checkOutVolunteerRequest.eventVolunteerId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid EventVolunteerId');
  }

  try {
    await dbConnect();

    const res = await EventVolunteerSchema.findByIdAndUpdate(
      checkOutVolunteerRequest.eventVolunteerId,
      { checkOutTime: checkOutVolunteerRequest.checkOutTime }
    );

    if (!res) {
      throw new CMError(CMErrorType.NoSuchKey, 'EventVolunteer');
    }

    console.log('Volunteer checked out.');
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function checkInVolunteer(
  checkInVolunteerRequest: CheckInVolunteerRequest
): Promise<void> {
  if (!isValidObjectId(checkInVolunteerRequest.eventVolunteerId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid EventVolunteerId');
  }

  try {
    await dbConnect();

    const res = await EventVolunteerSchema.findByIdAndUpdate(
      checkInVolunteerRequest.eventVolunteerId,
      { $set: { checkInTime: checkInVolunteerRequest.checkInTime } }
    );

    if (!res) {
      throw new CMError(CMErrorType.NoSuchKey, 'EventVolunteer');
    }

    console.log(
      checkInVolunteerRequest.checkInTime
        ? 'Volunteer signed in.'
        : 'Check in undone.'
    );
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function deleteEventVolunteer(
  eventVolunteerId: string
): Promise<void> {
  if (!isValidObjectId(eventVolunteerId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid EventVolunteerId');
  }

  try {
    await dbConnect();
    const eventVolRes: EventVolunteerEntity | null =
      await EventVolunteerSchema.findById({ _id: eventVolunteerId });
    if (eventVolRes) {
      await Event.updateOne(
        { _id: eventVolRes?.event },
        { $inc: { volsSignUp: -1 } }
      );
    }
    const res = await EventVolunteerSchema.findOneAndDelete({
      _id: eventVolunteerId,
    });

    if (!res) {
      throw new CMError(CMErrorType.NoSuchKey, 'EventVolunteer');
    }
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getEventVolunteer(
  eventId: string,
  volunteerId: string
): Promise<EventVolunteerEntity> {
  if (!isValidObjectId(eventId) || !isValidObjectId(volunteerId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid EventId or VolunteerId');
  }

  try {
    await dbConnect();
    const eventVol: EventVolunteerEntity | null =
      await EventVolunteerSchema.findOne({
        event: eventId,
        volunteer: volunteerId,
      });

    if (eventVol) {
      return eventVol;
    } else {
      throw new CMError(CMErrorType.NoSuchKey, 'EventVolunteer');
    }
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function checkIfEventVolunteerExists(
  eventId: string,
  volunteerId: string
): Promise<boolean> {
  if (!isValidObjectId(eventId) || !isValidObjectId(volunteerId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid EventId or VolunteerId');
  }

  try {
    await dbConnect();
    const eventVol = await EventVolunteerSchema.findOne({
      event: eventId,
      volunteer: volunteerId,
    });

    return !!eventVol;
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getAllEventVolunteersForEvent(
  eventId: string
): Promise<EventVolunteerResponse[]> {
  if (!isValidObjectId(eventId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid EventId');
  }

  try {
    await dbConnect();
    const eventVols = await EventVolunteerSchema.find({ event: eventId });

    return eventVols as EventVolunteerResponse[];
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}
