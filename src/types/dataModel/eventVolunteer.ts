import { z } from 'zod';
import zVolunteer from './volunteer';
import zEvent from './event';

const zEventVolunteer = z.object({
  volunteer: zVolunteer,
  event: zEvent,
  checkInTime: z.date().optional(),
  checkOutTime: z.date().optional(),
});

export const zCreateEventVolunteerRequest = zEventVolunteer.extend({
  volunteer: zVolunteer,
  event: zEvent,
});

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}
export interface CreateEventVolunteerRequest
  extends z.infer<typeof zCreateEventVolunteerRequest> {}

export default zEventVolunteer;
