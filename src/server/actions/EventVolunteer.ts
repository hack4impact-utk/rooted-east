import EventVolunteer from '../models/EventVolunteer';
import dbConnect from '@/utils/db-connect';

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
