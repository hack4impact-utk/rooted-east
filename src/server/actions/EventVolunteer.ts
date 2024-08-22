import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import { mongo } from 'mongoose';

// Check if volunteer has already been checked in by seeing if the checkin time field has been set.
export async function checkInVolunteer(
  createEventVolunteerRequest: CreateEventVolunteerRequest
): Promise<string | null> {
  try {
    await dbConnect();

    // Check if volunteer has been signed in
    if (await EventVolunteerSchema.exists(createEventVolunteerRequest)) {
      console.log('Volunteer already signed in.');
      return null;
    }
    const res = await EventVolunteerSchema.create(createEventVolunteerRequest);
    // TODO for #58 handle a duplicate entry fail case here (duplicate event+volunteer ID combination)
    if (!res) {
      throw new Error('Volunteer could not be signed in.');
    }
    console.log(
      createEventVolunteerRequest.volunteer.firstName,
      ' has been signed in.'
    );

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
