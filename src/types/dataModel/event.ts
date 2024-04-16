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

export const zCreateEventRequest = zEvent;

export interface Event extends z.infer<typeof zEvent> {}
export interface CreateEventRequest
  extends z.infer<typeof zCreateEventRequest> {}

export default zEvent;
