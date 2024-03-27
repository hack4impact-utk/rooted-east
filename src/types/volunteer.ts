import { z } from 'zod';
// import zEvents from './events'; <- import if made
// import zHours from './hours'; <- import if made
// import zDemographic from './demographic'; <- import if made

const zVolunteer = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  id: z.number(),
  email: z.string().email(),
  phoneNumber: z.string(),
//   events: zEvents.optional(),
  active: z.boolean(),
//   hoursLogged: zHours.optional(),
//   demographic: zDemographic.optional(),
  admin: z.boolean(),
  softDelete: z.boolean(),
});

export interface Volunteer extends z.infer<typeof zVolunteer> {}

export default zVolunteer;