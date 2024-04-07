import { z } from 'zod';
import zVolunteer from './volunteer';
import zEvent from './event';

const zEventVolunteer = z.object({
  volunteer: zVolunteer,
  event: zEvent,
  totalHours: z.number(),
  checkInTime: z.date().optional(),
  checkOutTime: z.date().optional(),
});

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}

export default zEventVolunteer;
