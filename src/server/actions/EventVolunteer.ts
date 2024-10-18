import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import {} from '@/types/dataModel/eventVolunteer';
import { mongo } from 'mongoose';
import {
  EventVolunteer,
  CheckInVolunteerRequest,
  CheckOutVolunteerRequest,
} from '@/types/dataModel/eventVolunteer';

export async function checkOutVolunteer(
  CheckOutVolunteerRequest: CheckOutVolunteerRequest
): Promise<void> {
  try {
    await dbConnect();
    const res = await EventVolunteerSchema.findByIdAndUpdate(
      CheckOutVolunteerRequest.eventVolunteerId,
      { checkOutTime: CheckOutVolunteerRequest.checkOutTime }
    );

    if (!res) {
      throw new Error('Volunteer could not be checked out.');
    }
    console.log('Volunteer checked out.');
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

export async function checkInVolunteer(
  checkInVolunteerRequest: CheckInVolunteerRequest
): Promise<void> {
  try {
    await dbConnect();

    const res = await EventVolunteerSchema.findByIdAndUpdate(
      checkInVolunteerRequest.eventVolunteerId,
      { checkInTime: checkInVolunteerRequest.checkInTime }
    );

    // TODO for #58 handle a duplicate entry fail case here (duplicate event+volunteer ID combination)
    if (!res) {
      throw new Error('Volunteer could not be signed in.');
    }
    console.log('Volunteer signed in.');
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

export async function deleteEventVolunteer(
  eventVolunteerId: string
): Promise<void> {
  try {
    await dbConnect();
    await EventVolunteerSchema.findOneAndDelete({ _id: eventVolunteerId });
    return;
  } catch (error) {
    throw error;
  }
}

export async function getEventVolunteer(
  eventId: string,
  volunteerId: string
): Promise<EventVolunteer | null> {
  try {
    await dbConnect();
    const eventVol = await EventVolunteerSchema.findOne({
      event: eventId,
      volunteer: volunteerId,
    });
    if (!eventVol) {
      throw new CMError(CMErrorType.NoSuchKey, 'EventVolunteer');
    }
    return eventVol;
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

// returns true if the eventvolunteer exists and false if it does not
export async function checkIfEventVolunteerExists(
  eventId: string,
  volunteerId: string
): Promise<boolean> {
  try {
    await dbConnect();
    const eventVol = await EventVolunteerSchema.findOne({
      event: eventId,
      volunteer: volunteerId,
    });
    return !(eventVol === null);
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}
