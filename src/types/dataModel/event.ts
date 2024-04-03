import { z } from 'zod';
import zVolunteer from './volunteer';

const zEvent = z.object({
  title: z.string(),
  location: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  volsNeeded: z.number(),
  signedUp: zVolunteer.optional(),
  recurring: z.boolean(),
});

export interface Event extends z.infer<typeof zEvent> {}

export default zEvent;
