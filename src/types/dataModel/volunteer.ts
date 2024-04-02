import { z } from 'zod';
// import zEventHours from './hours'; <- import if made
import zDemographic from './demographic'

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

export interface Volunteer extends z.infer<typeof zVolunteer> {}

export default zVolunteer;