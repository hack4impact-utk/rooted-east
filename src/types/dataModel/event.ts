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

export interface Event extends z.infer<typeof zEvent> {}

export default zEvent;
