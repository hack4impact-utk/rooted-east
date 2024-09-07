import VolunteerSchema from '@/server/models/Volunteer';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import { mongo } from 'mongoose';
import {
  UpdateVolunteerRequest,
  CreateVolunteerRequest,
  Volunteer,
} from '@/types/dataModel/volunteer';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import CMError, { CMErrorType } from '@/utils/cmerror';

export async function createVolunteer(
  request: CreateVolunteerRequest
): Promise<string> {
  try {
    await dbConnect();
    console.log('connected to db');
    const volunteer = await VolunteerSchema.create(request);
    return volunteer._id.toString();
  } catch (error) {
    console.log(error);

    if (
      error instanceof mongo.MongoError ||
      error instanceof mongo.MongoServerError
    ) {
      if (error.code === 11000) {
        throw new CMError(CMErrorType.DuplicateKey, 'Volunteer Phone/Email');
      }
    }
  }
  throw 'Error in create volunteer action';
}

export async function updateVolunteer(
  volunteerId: string,
  updatedVolunteer: UpdateVolunteerRequest
): Promise<void> {
  let res;
  try {
    await dbConnect();
    res = await VolunteerSchema.findByIdAndUpdate(
      volunteerId,
      updatedVolunteer
    );
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!res) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }
}

/**
 * Get total hours that a volunteer has volunteered
 * @param volunteerId // Id of the volunteer
 * @returns // Total Hours of Volunteer
 */
export async function getVolunteerTotalHours(volunteerId: string) {
  let volunteer;
  let totalTime = 0;
  try {
    await dbConnect();
    volunteer = await EventVolunteerSchema.find({
      volunteer: volunteerId,
    }).lean();

    volunteer.forEach((ev) => {
      if (ev.checkOutTime && ev.checkInTime) {
        totalTime += ev.checkOutTime.getTime() - ev.checkInTime.getTime();
      }
    });
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  if (!volunteer) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }
  // converting miliseconds to hours
  return totalTime / 3600000;
}

export async function getVolunteer(
  volunteerId: string
): Promise<Volunteer | null> {
  let target: Volunteer | null;

  try {
    await dbConnect();
    target = await VolunteerSchema.findById(volunteerId).lean();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }

  if (!target) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }

  return target;
}

/**
 * Deletes a volunteer from all their events first then themselves.
 * @param volunteerId // Id of the volunteer
 * @returns // Deleted Volunteer
 */
export async function deleteVolunteer(volunteerId: string) {
  try {
    await dbConnect();

    await EventVolunteerSchema.deleteMany({
      volunteer: volunteerId,
    });

    return await VolunteerSchema.findByIdAndDelete(volunteerId);
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

// Function to return all volunteer's phone numbers.
export async function getAllVolunteersNumbers(): Promise<string[]> {
  let volunteersNums: string[];
  try {
    await dbConnect();
    volunteersNums = await VolunteerSchema.find({}).select('phoneNumber');
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  return volunteersNums;
}

export async function getAllVolunteersForEvent(
  eventId: string
): Promise<EventVolunteerResponse[]> {
  let eventVols: EventVolunteerResponse[];
  try {
    await dbConnect();
    eventVols = await EventVolunteerSchema.find({ event: eventId });
  } catch (error) {
    console.error(error);
    throw new CMError(CMErrorType.InternalError);
  }
  return eventVols;
}
