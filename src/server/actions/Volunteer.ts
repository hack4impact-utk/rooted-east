import VolunteerSchema from '@/server/models/Volunteer';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import { mongo } from 'mongoose';
import {
  UpdateVolunteerRequest,
  CreateVolunteerRequest,
  Volunteer,
  VolunteerEntity,
} from '@/types/dataModel/volunteer';
import { EventVolunteerResponse } from '@/types/dataModel/eventVolunteer';
import CMError, { CMErrorType } from '@/utils/cmerror';

export async function createVolunteer(
  request: CreateVolunteerRequest
): Promise<string> {
  try {
    await dbConnect();
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
): Promise<VolunteerEntity | null> {
  let target: VolunteerEntity | null;

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
export async function getVolunteerByEmail(
  volunteerEmail: string
): Promise<VolunteerEntity | null> {
  let target: VolunteerEntity | null;

  try {
    await dbConnect();
    target = await VolunteerSchema.findOne({ email: volunteerEmail });
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
  console.log(target);

  if (!target) {
    throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }
  console.log(target._id);

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
): Promise<VolunteerEntity[]> {
  let eventVols: EventVolunteerResponse[];
  const volunteers: VolunteerEntity[] = [];
  try {
    await dbConnect();
    eventVols = await EventVolunteerSchema.find({ event: eventId });
  } catch (error) {
    console.error(error);
    throw new CMError(CMErrorType.InternalError);
  }
  try {
    for (const eVol of eventVols) {
      const vol: VolunteerEntity | null = await VolunteerSchema.findById(
        eVol.volunteer
      ).lean();
      if (vol) volunteers.push(vol);
    }
  } catch (error) {
    console.error(error);
    throw new CMError(CMErrorType.InternalError);
  }
  return volunteers;
}

export async function getAdminVolunteers(): Promise<Volunteer[]> {
  try {
    await dbConnect();
    const admins = await VolunteerSchema.find({ role: 'Admin' }).lean();
    return admins;
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getManagerVolunteers(): Promise<Volunteer[]> {
  try {
    await dbConnect();
    const managers = await VolunteerSchema.find({ role: 'Manager' }).lean();
    return managers;
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}
