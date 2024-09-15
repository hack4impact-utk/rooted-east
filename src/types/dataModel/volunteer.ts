import { z } from 'zod';
import zDemographic from './demographic';
import zBase from './base';

export const roles = ['Volunteer', 'Manager', 'Admin'] as const;
const zRole = z.enum(roles);

const zVolunteer = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  demographic: zDemographic.optional(),
  role: zRole,
});

export const zVolunteerResponse = zVolunteer.extend({ ...zBase.shape });

export const zCreateVolunteerRequest = zVolunteer.partial();

export const zUpdateVolunteerRequest = zVolunteer.partial();

export interface Volunteer extends z.infer<typeof zVolunteer> {}
export interface UpdateVolunteerRequest
  extends z.infer<typeof zUpdateVolunteerRequest> {}
export interface CreateVolunteerRequest
  extends z.infer<typeof zCreateVolunteerRequest> {}

export default zVolunteer;
export interface VolunteerResponse extends z.infer<typeof zVolunteerResponse> {}
