import { z } from 'zod';
import zDemographic from './demographic';
import zEventHours from './eventHours';

const zVolunteer = z.object({
  name: z.string(),
  userName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  active: z.boolean().optional(),
  totalHours: z.number().optional(),
  events: z.array(zEventHours).optional(),
  demographic: zDemographic.optional(),
  admin: z.boolean(),
  softDelete: z.boolean().optional(),
});

export const zCreateVolunteerRequest = zVolunteer
  .omit({
    softDelete: true,
    active: true,
    totalHours: true,
  })
  .partial();

export const zUpdateVolunteerRequest = zVolunteer
  .omit({
    softDelete: true,
  })
  .partial();

export interface Volunteer extends z.infer<typeof zVolunteer> {}
export interface UpdateVolunteerRequest
  extends z.infer<typeof zUpdateVolunteerRequest> {}
export interface CreateVolunteerRequest
  extends z.infer<typeof zCreateVolunteerRequest> {}

export default zVolunteer;
