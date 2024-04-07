import { z } from 'zod';
import zDemographic from './demographic';

const zVolunteer = z.object({
  name: z.string(),
  userName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  demographic: zDemographic.optional(),
});

export const zCreateVolunteerRequest = zVolunteer.partial();

export const zUpdateVolunteerRequest = zVolunteer.partial();

export interface Volunteer extends z.infer<typeof zVolunteer> {}
export interface UpdateVolunteerRequest
  extends z.infer<typeof zUpdateVolunteerRequest> {}
export interface CreateVolunteerRequest
  extends z.infer<typeof zCreateVolunteerRequest> {}

export default zVolunteer;
