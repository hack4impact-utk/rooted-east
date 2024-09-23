import { z } from 'zod';
import { zObjectId } from './base';
// import dayjs from 'dayjs';
// import type { Dayjs } from 'dayjs';

export const zTime = z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
  message: 'Invalid time format',
});

// const zDayJs = z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date');

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

export const zUpdateEventRequest = zEvent.partial();

export interface Event extends z.infer<typeof zEvent> {}
export interface CreateEventRequest
  extends z.infer<typeof zCreateEventRequest> {}
export interface UpdateEventRequest
  extends z.infer<typeof zUpdateEventRequest> {}

export default zEvent;
