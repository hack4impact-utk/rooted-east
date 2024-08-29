import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import { mongo } from 'mongoose';
import { CheckOutVolunteerRequest } from '@/types/dataModel/eventVolunteer';

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
        throw new CMError(CMErrorType.DuplicateKey, 'Event Volunteer');
      }
    }
    throw new CMError(CMErrorType.InternalError);
  }
}
