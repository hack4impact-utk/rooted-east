// import {
//     //VolunteerResponse,
//     //CreateVolunteerRequest,
//     //UpdateVolunteerRequest,
//   } from '@/types/dataModel/volunteer';
//  import EventVolunteerSchema from '../models/EventVolunteer';
import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';
import VolunteerSchema from '@/server/models/Volunteer';
import dbConnect from '@/utils/db-connect';
import EventSchema from '@/server/models/Event';
//import { RoleVerificationRequest } from '@/types/dataModel/roles';
//import CMError, { CMErrorType } from '@/utils/cmerror';
//import { mongo } from 'mongoose';
EventSchema;

/**
 * Deletes a volunteer's roleverification object
 * @param volunteerId requires the id of the volunteer
 * @param role requires the id of the volunteer
 * @returns the volunteer in the DB or null for error
 */

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
