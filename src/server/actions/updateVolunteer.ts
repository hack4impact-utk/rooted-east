import VolunteerSchema from '@/server/models/Volunteer';
import dbConnect from '@/utils/db-connect';
import UpdateVolunteerRequest from '@/types/dataModel/volunteer';

export async function updateVolunteer(
  volunteerId: string,
  updatedVolunteer: typeof UpdateVolunteerRequest
): Promise<void> {
  let res;
  try {
    await dbConnect();
    res = await VolunteerSchema.findByIdAndUpdate(
      volunteerId,
      updatedVolunteer
    );
  } catch (error) {
    //throw new CMError(CMErrorType.InternalError);
  }
  if (!res) {
    // throw new CMError(CMErrorType.NoSuchKey, 'Volunteer');
  }
}
