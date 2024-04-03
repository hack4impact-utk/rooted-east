import { z } from 'zod';
import zDemographic from './demographic';
//import zEventHours from './hours';

const zVolunteer = z.object({
  name: z.string(),
  userName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  active: z.boolean(),
  totalHours: z.number(),
  //   events: zEventHours.optional(),
  demographic: z.array(zDemographic),
  admin: z.boolean(),
  softDelete: z.boolean(),
});

export const zUpdateVolunteerRequest = zVolunteer
  .omit({
    softDelete: true,
  })
  .partial();

export interface Volunteer extends z.infer<typeof zVolunteer> {}
export interface UpdateVolunteerRequest
  extends z.infer<typeof zUpdateVolunteerRequest> {}

export default zVolunteer;
