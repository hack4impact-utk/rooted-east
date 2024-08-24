import { z } from 'zod';
import zVolunteer from './volunteer';

const zEvent = z.object({
  title: z.string(),
  location: z.string(),
  day: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  volsNeeded: z.number(),
  description: z.string(),
  manager: zVolunteer,
});

export const zCreateEventRequest = zEvent;

export const zUpdateEventRequest = zEvent.partial();

export interface Event extends z.infer<typeof zEvent> {}
export interface CreateEventRequest
  extends z.infer<typeof zCreateEventRequest> {}
export interface UpdateEventRequest
  extends z.infer<typeof zUpdateEventRequest> {}

export default zEvent;
