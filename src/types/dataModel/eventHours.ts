import { z } from 'zod';

const zEventHours = z.object({
  id: z.string(),
  totalHours: z.number(),
  signedInTime: z.date(),
  signedOutTime: z.date(),
});

export interface EventHours extends z.infer<typeof zEventHours> {}

export default zEventHours;
