import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';
import VolunteerSchema from '@/server/models/Volunteer';
import dbConnect from '@/utils/db-connect';

export async function deleteVolunteerRoleVerification(
  volunteerId: string
): Promise<EventVolunteerEntity | null> {
  try {
    await dbConnect();
    const volunteer: EventVolunteerEntity | null =
      await VolunteerSchema.findByIdAndUpdate(volunteerId);

    return volunteer;
  } catch (error) {
    throw error;
  }
}
