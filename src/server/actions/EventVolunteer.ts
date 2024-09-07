
import dbConnect from '@/utils/db-connect';
import CMError, { CMErrorType } from '@/utils/cmerror';
import EventVolunteerSchema from '@/server/models/EventVolunteer';
import { CheckInVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import { mongo } from 'mongoose';
import { CheckOutVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import EventVolunteer from '../models/EventVolunteer'
   
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
 
export async function checkInVolunteerAction(
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
    await EventVolunteer.findOneAndDelete({ _id: eventVolunteerId });
    return;
  } catch (error) {
    throw error;
  }
}
