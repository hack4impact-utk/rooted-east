import { z } from 'zod';

const zHours = z.object({
  id: z.string(),
  totalHours: z.number(),
  signedInTime: z.date(),
  signedOutTime: z.date(),
});

export interface Hours extends z.infer<typeof zHours> {}

export default zHours;
