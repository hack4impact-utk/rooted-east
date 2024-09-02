import VolunteerSchema from '@/server/models/Volunteer';
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
        // throw new CMError(CMErrorType.DuplicateKey, 'Volunteer Phone/Email');
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
