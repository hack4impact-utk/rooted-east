import VolunteerSchema from '@/server/models/Volunteer';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import { mongo } from 'mongoose';
import {
  UpdateVolunteerRequest,
  CreateVolunteerRequest,
} from '@/types/dataModel/volunteer';
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

/**
 * Deletes a volunteer from all their events first then themselves.
 * @param volunteerId // Id of the volunteer
 * @returns // Deleted Volunteer
 */
export async function deleteVolunteer(volunteerId: string) {
  try {
    await dbConnect();

    EventVolunteerSchema.deleteMany({
      volunteer: volunteerId,
    });

    return await VolunteerSchema.findByIdAndDelete(volunteerId);
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}
