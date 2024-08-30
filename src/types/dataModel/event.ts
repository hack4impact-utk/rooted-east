import { z } from 'zod';
import { zObjectId } from './base';

const zEvent = z.object({
  title: z.string(),
  location: z.string(),
  day: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  volsNeeded: z.number(),
  description: z.string(),
  manager: zObjectId,
});

export const zCreateEventRequest = zEvent;

export interface Event extends z.infer<typeof zEvent> {}
export interface CreateEventRequest
  extends z.infer<typeof zCreateEventRequest> {}

export default zEvent;
