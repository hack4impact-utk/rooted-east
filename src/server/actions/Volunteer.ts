import VolunteerSchema from '@/server/models/Volunteer';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import dbConnect from '@/utils/db-connect';
import { mongo, isValidObjectId } from 'mongoose';
import {
  UpdateVolunteerRequest,
  CreateVolunteerRequest,
  Volunteer,
  VolunteerEntity,
} from '@/types/dataModel/volunteer';
import CMError, { CMErrorType } from '@/utils/cmerror';

export async function createVolunteer(
  request: CreateVolunteerRequest
): Promise<string> {
  if (!request || Object.keys(request).length === 0) {
    throw new CMError(
      CMErrorType.BadValue,
      'Invalid input for CreateVolunteerRequest'
    );
  }

  try {
    await dbConnect();
    const volunteer = await VolunteerSchema.create(request);
    return volunteer._id.toString();
  } catch (error) {
    if (
      error instanceof mongo.MongoError ||
      error instanceof mongo.MongoServerError
    ) {
      if (error.code === 11000) {
        throw new CMError(CMErrorType.DuplicateKey, 'Volunteer Phone/Email');
      }
    }
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function updateVolunteer(
  volunteerId: string,
  updatedVolunteer: UpdateVolunteerRequest
): Promise<void> {
  if (!isValidObjectId(volunteerId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid VolunteerId');
  }

  if (!updatedVolunteer || Object.keys(updatedVolunteer).length === 0) {
    throw new CMError(
      CMErrorType.BadValue,
      'No data provided to update Volunteer'
    );
  }

  try {
    await dbConnect();
    const res = await VolunteerSchema.findByIdAndUpdate(
      volunteerId,
      updatedVolunteer
    );

    if (!res) {
      throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
    }
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getVolunteerTotalHours(
  volunteerId: string
): Promise<number> {
  if (!isValidObjectId(volunteerId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid VolunteerId');
  }

  let totalTime = 0;
  try {
    await dbConnect();
    const events = await EventVolunteerSchema.find({
      volunteer: volunteerId,
    }).lean();

    events.forEach((ev) => {
      if (ev.checkOutTime && ev.checkInTime) {
        totalTime += ev.checkOutTime.getTime() - ev.checkInTime.getTime();
      }
    });

    if (!events.length) {
      throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
    }
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }

  return totalTime / 3600000; // Convert milliseconds to hours
}

export async function getVolunteer(
  volunteerId: string
): Promise<VolunteerEntity | null> {
  if (!isValidObjectId(volunteerId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid VolunteerId');
  }

  try {
    await dbConnect();
    const target: VolunteerEntity | null =
      await VolunteerSchema.findById(volunteerId).lean();

    if (!target) {
      throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
    }

    return target;
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getVolunteerByEmail(
  volunteerEmail: string
): Promise<VolunteerEntity | null> {
  if (!volunteerEmail) {
    throw new CMError(CMErrorType.BadValue, 'Email cannot be empty');
  }

  try {
    await dbConnect();
    const target: VolunteerEntity | null = await VolunteerSchema.findOne({
      email: volunteerEmail,
    });

    if (!target) {
      throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
    }

    return target;
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

// used to check if an email is in DB for google sign in
export async function checkExistingEmail(
  volunteerEmail: string
): Promise<VolunteerEntity | null> {
  if (!volunteerEmail) {
    throw new CMError(CMErrorType.BadValue, 'Email cannot be empty');
  }

  try {
    await dbConnect();
    const target: VolunteerEntity | null = await VolunteerSchema.findOne({
      email: volunteerEmail,
    });

    if (!target) {
      if (typeof window !== 'undefined') {
        alert('Access Denied');
      } else {
        console.log('Unauthorized email attempt:', volunteerEmail);
      }
      return null;
    }

    return target;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

export async function deleteVolunteer(volunteerId: string): Promise<void> {
  if (!isValidObjectId(volunteerId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid VolunteerId');
  }

  try {
    await dbConnect();
    await EventVolunteerSchema.deleteMany({ volunteer: volunteerId });
    const deletedVolunteer =
      await VolunteerSchema.findByIdAndDelete(volunteerId);

    if (!deletedVolunteer) {
      throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
    }
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getAllVolunteersNumbers(): Promise<string[]> {
  try {
    await dbConnect();
    const volunteersNums = await VolunteerSchema.find({})
      .select('phoneNumber')
      .lean();
    return volunteersNums.map((vol) => vol.phoneNumber);
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getAllVolunteers(): Promise<VolunteerEntity[]> {
  try {
    await dbConnect();
    return await VolunteerSchema.find({}).lean();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getAllVolunteersForEvent(
  eventId: string
): Promise<VolunteerEntity[]> {
  if (!isValidObjectId(eventId)) {
    throw new CMError(CMErrorType.BadValue, 'Invalid EventId');
  }

  const volunteers: VolunteerEntity[] = [];
  try {
    await dbConnect();
    const eventVols = await EventVolunteerSchema.find({ event: eventId });

    for (const eVol of eventVols) {
      const vol: VolunteerEntity | null = await VolunteerSchema.findById(
        eVol.volunteer
      ).lean();
      if (vol) {
        volunteers.push(vol);
      }
    }
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }

  return volunteers;
}

export async function getAdminVolunteers(): Promise<Volunteer[]> {
  try {
    await dbConnect();
    return await VolunteerSchema.find({ role: 'Admin' }).lean();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getManagerVolunteers(): Promise<VolunteerEntity[]> {
  try {
    await dbConnect();
    return await VolunteerSchema.find({ role: 'Manager' }).lean();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}

export async function getAdminAndManagerVolunteers(): Promise<
  VolunteerEntity[]
> {
  try {
    await dbConnect();
    return await VolunteerSchema.find({
      role: { $in: ['Admin', 'Manager'] },
    }).lean();
  } catch (error) {
    throw new CMError(CMErrorType.InternalError);
  }
}
