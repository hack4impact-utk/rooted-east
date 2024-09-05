
import { CheckInVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import { mongo } from 'mongoose';
import EventVolunteer from '../models/EventVolunteer';

// Check if volunteer has already been checked in by seeing if the checkin time field has been set.
export async function checkInVolunteerRequest(
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
    
export async function deleteEventVolunteer(
  eventVolunteerId: string
): Promise<void> {
  try {
    await dbConnect();
    await EventVolunteer.findOneAndDelete({ _id: eventVolunteerId });
    return;
  } catch (error) {
    throw error;
  }
}
